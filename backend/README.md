# Backend
Since the backend is ridiculously convoluted at this point, I'll try to explain it here.

## Commands
First start the backend with `flask run --host=0.0.0.0`.

### Making a transcription
POST
`/transcription`
with the form body
file = file

### Getting Example Bets
GET
`/getQuestions`
with the form body:
transcript = transcript
