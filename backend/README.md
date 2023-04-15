# Backend
Since the backend is ridiculously convoluted at this point, I'll try to explain it here.

## Commands
First start the backend with `flask run --host=0.0.0.0`.

### Getting Current Player Points
GET
`/getCurrentPoints`
No Body

### Getting Current Bet
GET
`/getCurrentBet`
No Body
Will return either:
- "There is no current Bet"
- The Current Bet

### Getting Past Bets
GET
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
bet = bet
Will return 1 of 3 results:
- "There is already a current bet"
- "Success"
- "Please attach a bet"

### Set Current Bet Winner
POST
`/SetCurrentBetWinner`
Form body:
winner = "side1" or "side2"
Will return 1 of 3 results:
- "There is no current bet"
- "Success"
- "Winner was not side1 or side2"

### Making a Transcription
POST
`/transcription`
with the form body
file = file

### Getting Example Bets
GET
`/getQuestions`
with the form body:
transcript = transcript
