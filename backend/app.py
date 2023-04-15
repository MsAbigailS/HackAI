from flask import Flask, request
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import openai
import time
import os
load_dotenv()

openai.organization = os.getenv('OPENAI_ORG')
openai.api_key = os.getenv('OPENAI_API_KEY')

app = Flask(__name__)
CORS(app)

pastBets = [
    {
        "side1": 500,
        "side2": 800,
        "side1Players": 50,
        "side2Players": 60,
        "biggestBet": 100,
        "winner": "side2",
        "timeToBet": 100
    },
    {
        "side1": 1000,
        "side2": 900,
        "side1Players": 70,
        "side2Players": 65,
        "biggestBet": 200,
        "winner": "side2",
        "timeToBet": 100
    }
    ]
currentBet = None

currentPoints = 100

@app.route('/getCurrentPoints', methods=['GET'])
def getCurrentPoints():
    return currentPoints

@app.route('/getCurrentBet', methods=['GET'])
def getCurrentBet():
    if currentBet is None:
        return "There is no current Bet"
    else:
        return currentBet

@app.route('/getPastBets', methods=['GET'])
def getPastBets():
    number = request.form['number']
    if number.isNumeric():
        return pastBets[:number]
    return pastBets
    
@app.route("/setCurrentBet", methods=["POST"])
def setCurrentBet():
    bet = request.form['bet']
    if currentBet is not None:
        return "There is already a current bet!"
    elif bet:
        "Success"
    else:
        return "Please attach the bet"

@app.route("/setCurrentBetWinner", methods=["POST"])
def setCurrentBetWinner(): 
    winner = request.form['winner']
    if currentBet is None:
        return "There is no current Bet"
    elif winner == "side1" or winner == "side2":
        currentBet["winner"] = winner
        pastBets.insert(0, currentBet)
        currentBet = None
        return "Success"
    else:
        return "Winner was not side1 or side2"

@app.route('/transcription', methods=['POST'])
def upload_file():
    file = request.files['file']
    print(file.filename)
    if file:
        filename = file.filename
        file.save(filename)
        audio_file = open(filename, 'rb')
        transcript = openai.Audio.transcribe("whisper-1", audio_file)
        return transcript['text']
    else:
        return "Invalid file type."

@app.route("/getQuestions ", methods=['GET'])
def getQuestions():
    transcript = request.form['transcript']
    return prompt_chatbot_for_bets(transcript)['content']


def prompt_chatbot_for_bets(prompt):
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": """You are an assistant that will come up with bets in the form of a question similar 
                                        to the following prompts using the information given by an announcer:
                                        ____ team will win tonight's game?
                                        Will ____ player earn a triple double playing tonight?
                                        Format 5 questions with no additional context and the questions in a json object with opening and closing parenthesis  and keys in the form question1, question2, question3, question4, question5
                                        """},
            {"role": "user", "content": prompt}
        ],
        max_tokens=200,
        temperature=0.7,
    )
    return completion.choices[0].message

