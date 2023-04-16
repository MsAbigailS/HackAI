# Backend
Since the backend is ridiculously convoluted at this point, I'll try to explain it here.

## Commands
First start the backend with `flask run --host=0.0.0.0`.

### Getting Current Player Points
POST
`/getCurrentPoints`
Form Body
player=player
Will return amount of coins for player

### Getting Current Bet
GET
`/getCurrentBet`
No Body
Will return either:
- "There is no current Bet"
- The Current Bet

### Getting Past Bets
POST
`/getPastBets`
Optional Form:
number = number
Will return either:
- Most x recent Bets
- All previous bets
Most recent bet will be at index 0

### Setting a Current Bet
POST
`/setCurrentBet`
Form Body:
bet = bet (text of bet)
Will return 1 of 3 results:
- "There is already a current bet"
- "Success"
- "Please attach a bet"

### Set Current Bet Winner
POST
`/setCurrentBetWinner`
Form body:
winner = "yes" or "no"
Will return 1 of 3 results:
- "There is no current bet"
- "Success"
- "Winner was not yes or no"

### Set Bet Choice
POST
`/setBetChoice`
Form Body:
choice=choice (yes or no)
player=player
amount=amount (numeric please)
Will return 1 of 5 results:
- "There is no current Bet"
- "Not enough points for bet"
- "Success"
- "Not a valid choice for player"
- "Missing Form Values"

### Cancel Betting
GET
`/cancelBet`
No body
returns "Success"

### Disable Betting
GET
`/disableBetting`
No Body
Will disallow betting

### Making a Transcription
POST
`/transcription`
with the form body
file = file

### Getting Example Bets
POST
`/getQuestions`
with the form body:
transcript = transcript
