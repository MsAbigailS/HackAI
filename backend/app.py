from flask import Flask, request
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import openai
import os
import math
load_dotenv()

openai.organization = os.getenv('OPENAI_ORG')
openai.api_key = os.getenv('OPENAI_API_KEY')

app = Flask(__name__)
CORS(app)

with open("prompt.txt") as file:
    systemPrompt = file.read()

pastBets = [
    {
        "bet": "Will the Mavericks win?",
        "yesPoints": 500,
        "noPoints": 800,
        "yesPlayers": 50,
        "noPlayers": 60,
        "biggestBet": 100,
        "winner": "no",
    },
    {
        "bet": "Will Luca score 10 points?",
        "yesPoints": 1000,
        "noPoints": 900,
        "yesPlayers": 70,
        "noPlayers": 65,
        "biggestBet": 200,
        "winner": "no",
    }
]

emptyBet = {
    "bet": None,
    "yesPoints": 0,
    "noPoints": 0,
    "yesPlayers": 0,
    "noPlayers": 0,
    "biggestBet": 0,
    "winner": None,
}

currentBet = None
currentBets = {}

players = {
    "Player1": 2600,
    "Player2": 2500,
    "Player3": 2400,
    "Player4": 2300,
    "Player5": 2200,
    "DemoPlayer": 2789
    }

def updateLeaderboard():
    global leaderBoard
    leaderBoard = sorted(players.items(), key=lambda x: x[1], reverse=True)

updateLeaderboard()

@app.route('/getCurrentPoints', methods=['POST'])
def getCurrentPoints():
    player = request.form['player']
    return players[player]

@app.route('/getCurrentBet', methods=['GET'])
def getCurrentBet():
    if currentBet is None:
        return "There is no current Bet"
    else:
        return currentBet

@app.route('/getPastBets', methods=['POST'])
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
        currentBet = emptyBet
        currentBet['bet'] = bet
        return "Success"
    else:
        return "Please attach the bet"

## TODO
@app.route("/setCurrentBetWinner", methods=["POST"])
def setCurrentBetWinner(): 
    winner = request.form['winner']
    if currentBet is None:
        return "There is no current Bet"
    elif winner == "yes" or winner == "no":
        currentBet["winner"] = winner
        pastBets.insert(0, currentBet)
        totalPoints = currentBet['yesPoints'] + currentBet['noPoints']
        for player, key in currentBets.items():
            if key[0] == winner:
                percentageBet = key[1] / currentBet['yesPoints']
                players[player] = players[player] + (totalPoints * percentageBet)
        updateLeaderboard()
        currentBet = None
        currentBets = {}
        return "Success"
    else:
        return "Winner was not side1 or side2"
    
@app.route("/setBetChoice", methods=['POST'])
def setBetChoice():
    choice = request.form['choice']
    player = request.form['player']
    amount = request.form['amount']
    if currentBet is None:
        return "There is no current Bet"
    if choice and player and amount:
        if players[player] < amount:
            return "Not enough points for bet"
        else:
            if choice == "yes" or choice == "no":
                players[player] = players[player] - amount
                currentBets[player] = choice
                if amount > currentBet['biggestBet']:
                    currentBet['biggestBet'] = amount
                if choice == "yes":
                    currentBet['yesPoints'] = currentBet['yesPoints'] + amount
                    currentBet['yesPlayers'] = currentBet['yesPlayers'] + 1
                else:
                    currentBet['noPoints'] = currentBet['noPoints'] + amount
                    currentBet['noPlayers'] = currentBet['noPlayers'] + 1
                return "Success"
            else:
                return "Not a valid choice for player"
    else: 
        return "Missing Form Values"

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

@app.route("/getQuestions", methods=['POST'])
def getQuestions():
    transcript = request.form['transcript']
    answer = prompt_chatbot_for_bets(transcript)['content']
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
    return completion.choices[0].message