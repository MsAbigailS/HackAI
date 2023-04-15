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

with open("prompt.txt") as file:
    systemPrompt = file.read()

pastBets = [
    {
        "yesPoints": 500,
        "noPoints": 800,
        "yesPlayers": 50,
        "noPlayers": 60,
        "biggestBet": 100,
        "winner": "no",
        "timeToBet": 100
    },
    {
        "yesPoints": 1000,
        "noPoints": 900,
        "yesPlayers": 70,
        "noPlayers": 65,
        "biggestBet": 200,
        "winner": "no",
        "timeToBet": 100
    }
]

currentBet = None
currentBets = {}

currentPoints = 2189
currentPlayer = "demo"

leaderBoard = ["Player1", "Player2", "Player3", "Player4", "Player5", "DemoPlayer"]

players = {
    "Player1": 2600,
    "Player2": 2500,
    "Player3": 2400,
    "Player4": 2300,
    "Player5": 2200,
    "DemoPlayer": 2789
    }

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
    
@app.route("/setBetChoice", methods=['POST'])
def setBetChoice():
    choice = request.form['choice']
    #if choice i 

@app.route('/transcription', methods=['POST'])
def upload_file():
    file = request.files['file']
    print(file.filename)
    if file:
        filename = file.filename
        file.save(filename)
        audio_file = open(filename, 'rb')
        transcript = openai.Audio.transcribe("whisper-1", audio_file)
        print(transcript['text'])
        return transcript['text']
    else:
        return "Invalid file type."

@app.route("/getQuestions", methods=['POST'])
def getQuestions():
    transcript = request.form['transcript']
    answer = prompt_chatbot_for_bets(transcript)['content']
    print(answer)
    return answer


def prompt_chatbot_for_bets(prompt):
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": systemPrompt},
            {"role": "user", "content": prompt}
        ],
        max_tokens=200,
        temperature=0.7,
        top_p=1,
    )
    print(completion.choices)
    return completion.choices[0].message

def updateLeaderboard():
    leaderBoard = sorted(players.items(), key=lambda x: x[1], reverse=True)
    print(leaderBoard)