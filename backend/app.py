from flask import Flask, request, redirect, url_for
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import openai
import os
import math
import random
import time
import boto3
from sklearn import preprocessing
import pandas as pd
load_dotenv()

random.seed(time.time())

openai.organization = os.getenv('OPENAI_ORG')
openai.api_key = os.getenv('OPENAI_API_KEY')

app = Flask(__name__)
CORS(app)

with open("prompt.txt") as file:
    systemPrompt = file.read()

global pastBets
global emptyBet
global ourPlayer
global currentBet
global currentBets
global players

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

ourPlayer = "DemoPlayer"

currentBet = None
currentBets = {}
allowBetting = False

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

completeData = pd.read_csv('./data.csv')


@app.route('/getCurrentPoints', methods=['POST'])
def getCurrentPoints():
    player = request.form['player']
    return str(players[player])

@app.route('/getCurrentBet', methods=['GET'])
def getCurrentBet():
    if currentBet is None:
        return "There is no current Bet"
    else:
        return currentBet

@app.route('/getPastBets', methods=['POST'])
def getPastBets():
    number = request.form['number']
    if number.isnumeric():
        return pastBets[:int(number)]
    return pastBets
    
@app.route("/setCurrentBet", methods=["POST"])
def setCurrentBet():
    bet = request.form['bet']
    global currentBet
    global emptyBet
    global allowBetting
    if currentBet is not None:
        return "There is already a current bet!"
    elif bet:
        currentBet = emptyBet
        currentBet['bet'] = bet
        fillBets()
        print(currentBet)
        allowBetting = True
        return "Success"
    else:
        return "Please attach the bet"

@app.route("/setCurrentBetWinner", methods=["POST"])
def setCurrentBetWinner(): 
    global currentBet
    global emptyBet
    global currentBets
    winner = request.form['winner']
    if currentBet is None:
        return "There is no current Bet"
    elif winner == "yes" or winner == "no":
        currentBet["winner"] = winner
        pastBets.insert(0, currentBet)
        print(currentBets)
        totalPoints = currentBet['yesPoints'] + currentBet['noPoints']
        for player, key in currentBets.items():
            if key[0] == winner:
                print(player)
                percentageBet = key[1] / currentBet['yesPoints']
                players[player] = players[player] + math.ceil(totalPoints * percentageBet)
        updateLeaderboard()
        currentBet = None
        currentBets = {}
        emptyBet = {
            "bet": None,
            "yesPoints": 0,
            "noPoints": 0,
            "yesPlayers": 0,
            "noPlayers": 0,
            "biggestBet": 0,
            "winner": None,
        }
        print(players)
        return "Success"
    else:
        return "Winner was not side1 or side2"
    
@app.route("/setBetChoice", methods=['POST'])
def setBetChoice():
    choice = request.form['choice']
    player = request.form['player']
    amount = int(request.form['amount'])
    if currentBet is None:
        return "There is no current Bet"
    if not allowBetting:
        return "Betting has been disabled"
    if choice and player and amount:
        if players[player] < amount:
            return "Not enough points for bet"
        else:
            if choice == "yes" or choice == "no":
                players[player] = players[player] - amount
                currentBets[player] = (choice, amount)
                if amount > currentBet['biggestBet']:
                    currentBet['biggestBet'] = amount
                if choice == "yes":
                    currentBet['yesPoints'] = currentBet['yesPoints'] + amount
                    currentBet['yesPlayers'] = currentBet['yesPlayers'] + 1
                else:
                    currentBet['noPoints'] = currentBet['noPoints'] + amount
                    currentBet['noPlayers'] = currentBet['noPlayers'] + 1
                print(players[player])
                print(currentBet)
                return str(players[player])
            else:
                return "Not a valid choice for player"
    else: 
        return "Missing Form Values"
    
@app.route('/cancelBet', methods=['GET'])
def cancelBet():
    global currentBets
    global currentBet
    global emptyBet
    for key, item in currentBets.items():
        players[key] = players[key] + item[1]
    currentBet = None
    currentBets = {}
    emptyBet = {
        "bet": None,
        "yesPoints": 0,
        "noPoints": 0,
        "yesPlayers": 0,
        "noPlayers": 0,
        "biggestBet": 0,
        "winner": None,
    }
    return "Success"

@app.route('/disableBetting', methods=['GET'])
def disableBetting():
    global allowBetting
    allowBetting = False
    return "Betting set to False"

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
    print(answer)
    return answer

@app.route("/buyItem", methods=['POST'])
def buyItem():
    player = request.form['player']
    itemAmount = request.form['itemAmount']

    if players[player] < itemAmount:
        return "Not enough for item"
    else:
        players[player] = players[player] - itemAmount
        return "Success"
    
@app.route("/getLeaderboard", methods=["GET"])
def getLeaderboard():
    return leaderBoard

@app.route("/getUserLeaderboard", methods=["POST"])
def getUserLeaderboard():
    player = request.form['player']
    return str([i for i,v in enumerate(leaderBoard) if player in v[0]][0])


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

def fillBets():
    for key in set(players) - set([ourPlayer]):
        value = random.randint(0, math.ceil(players[key] / 3))
        players[key] = players[key] - value
        if value == 0:
            continue
        if value > currentBet["biggestBet"]:
            currentBet["biggestBet"] = value
        if random.randint(0, 100) < 50:
            currentBets[key] = ("yes", value)
            currentBet['yesPoints'] = currentBet['yesPoints'] + value
            currentBet['yesPlayers'] = currentBet['yesPlayers'] + 1
        else:
            currentBets[key] = ("no", value)
            currentBet['noPoints'] = currentBet['noPoints'] + value
            currentBet['noPlayers'] = currentBet['noPlayers'] + 1