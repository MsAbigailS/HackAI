<script lang='ts'>
	import { onMount } from "svelte";
	import toWav from 'audiobuffer-to-wav';
	import { API_URL } from './secrets'

	let media: any[] = [];
	let mediaRecorder: MediaRecorder | null = null;
	let url = API_URL;
	let questions: string[] = [];
	let timer: number;
	const secondsToBet = 30;
	let progressValue = 0;
	let progressTick = 60;
	let interval: number;
	let leaderboardTimer: number;

	onMount(async () => {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

		mediaRecorder = new MediaRecorder(stream);

		mediaRecorder.ondataavailable = (e: any) => media.push(e.data)

		mediaRecorder.onstop = async function(){
			const blob = new Blob(media, {
				'type': 'audio/wav'
				});
			media = []
			let audio = window.URL.createObjectURL(blob);
			const arrayBuffer = await blob.arrayBuffer();
			const audioContext = new AudioContext();
			const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
			const wavBuffer = toWav(audioBuffer);
			const wavBlob = new Blob([wavBuffer], { type: 'audio/wav' });
			const formData = new FormData();
			formData.append('file', wavBlob, 'audio.wav');
			console.log('sending request to: ' + `${url}/transcription`);
			const response = await fetch(`${url}/transcription`, {
				method: 'POST',
				body: formData
			});
			console.log(response);
			const data = await response.text();
			console.log('transcription response: ' + data);
			// do a POST request to /getQuestions with the form body: transcript = transcript
			const secondFormData = new FormData();
			secondFormData.append('transcript', data);
			const secondResponse = await fetch(`${url}/getQuestions`, {
				method: 'POST',
				body: secondFormData
			});
			console.log(secondResponse);
			const secondData = await secondResponse.json();
			for(let i = 0; i < secondData.length; i++) {
				const question = secondData[i];
				console.log(question);
				questions[i] = question;
			}
			transcription = secondData;
		} // end of event listeners

		// TODO: uncomment this when the backend is ready
		// set interval for leaderboard / past bets
		leaderboardTimer = setInterval(async () => {
			const formData = new FormData();
			formData.append('number', '5');
			const response = await fetch(`${url}/getPastBets`, {
				method: 'POST',
				body: formData
			});
			const data = await response.text();
			console.log(data);
			// do a GET request to /getLeaderboard
			const leaderboardResponse = await fetch(`${url}/getLeaderboard`);
			const leaderboardData = await leaderboardResponse.text();	
			console.log(leaderboardData);
		}, 10 * 1000);

	});  // end of onmount

	async function handleRecording() {
		if(!mediaRecorder) {
			console.log('media recorder is null');
			return;
		}
		if (mediaRecorder.state === 'inactive') {
			startRecording();
		} else {
			stopRecording();
		}
	}

	async function startRecording(){ 
		if(!mediaRecorder) {
			console.log('media recorder is null');
			return;
		}
		console.log('starting recording...')
		media.length = 0;
		mediaRecorder.start()
	}

	async function stopRecording() { 
		if(!mediaRecorder) {
			console.log('media recorder is null');
			return;
		}
		mediaRecorder.stop() 
		console.log('stopping recording...')
	}

	async function questionClicked(event: { target: any }) {
		// question id will be in the form "question_0"
		// need to split to get the index
		const questionId = event.target.id;
		const questionIndex = questionId.split('_')[1];

		// set the current bet to the question at the index
		currentBet = questions[questionIndex];

		// POST /setCurrentBet Form Body: bet = bet (text of bet) Will return 1 of 3 results:
		// "There is already a current bet"
		// "Success"
		// "Please attach a bet"

		const formData = new FormData();
		formData.append('bet', currentBet);
		const response = await fetch(`${url}/setCurrentBet`, {
			method: 'POST',
			body: formData
		});
		const data = await response.text();
		console.log(data);

		timer = setInterval(async () => {
			console.log('pinging to check for bet');
			if (currentBet === undefined) {
			} else {
				const response = await fetch(`${url}/getCurrentBet`);
				const data = await response.json();
				currentBetObject = data;
			}
		}, 2000);

		// delay everything after this point by 1000 seconds
		await new Promise(resolve => setTimeout(resolve, 1000));
		
		progressValue = 0;
		console.log('starting a timer for ' + secondsToBet + ' seconds')
		console.log('the progress tick is ' + progressTick + ' milliseconds/progress')
		interval = setInterval(async () => {
			progressValue += progressTick;
			if (progressValue > secondsToBet * 1000) {
				clearInterval(interval);
				clearInterval(timer);
				// GET /disableBetting No Body Will disallow betting
				const response = await fetch(`${url}/disableBetting`);
				console.log(await response.text());
			}
		}, progressTick);

	}

	async function cancelButtonClicked() {
		// use GET /cancelBet No body returns "Success"
		const response = await fetch(`${url}/cancelBet`);
		console.log(await response.text());
		clearInterval(timer);
		clearInterval(interval);
		currentBetObject = undefined;
		currentBet = undefined;
		progressValue = 0;
	}

	async function clearObjects() {
		clearInterval(timer);
		clearInterval(interval);
		currentBetObject = undefined;
		currentBet = undefined;
		progressValue = 0;
	}

	async function yesButtonClicked() {
		// use POST /SetCurrentBetWinner Form body: winner = "yes" or "no"
		const formData = new FormData();
		formData.append('winner', 'yes');
		const response = await fetch(`${url}/setCurrentBetWinner`, {
			method: 'POST',
			body: formData
		});
		console.log(await response.text());
		await clearObjects();
	}

	async function noButtonClicked() {
		// use POST /SetCurrentBetWinner Form body: winner = "yes" or "no"
		const formData = new FormData();
		formData.append('winner', 'no');
		const response = await fetch(`${url}/setCurrentBetWinner`, {
			method: 'POST',
			body: formData
		});
		console.log(await response.text());
		await clearObjects();
	}

	let transcription: undefined | string = undefined;
	// let currentBet: undefined | string = 'Who will win the game between the Mavericks and the Miami Heat?';
	let currentBet: undefined | string = undefined;

	interface BetObject {
		bet: string,
		biggestBet: number,
		noPlayers: number,
		noPoints: number,
		winner: string,
		yesPlayers: number,
		yesPoints: number
	}

	let currentBetObject: undefined | BetObject = undefined;
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css">
</svelte:head>

<main>
	<div class="fullpage" id="homescreen">
		<div class='headings'>
			<h1>Admin Dashboard</h1>
			<h2>For all your administrative needs!</h2>
		</div>
		<div class="row">
			<div class="halfsection">
				{#if questions.length === 0}
					<div class="headings" style='margin-bottom: 0;'>
						<h2>Next Bet</h2>
						<h6>It looks like there isn't a next bet. Record a new one now!</h6>
					</div>
				{:else}
					<h2>Select a bet from the list below!</h2>
				{/if}
				<div id="audio-controls">
					{#if questions.length > 0}
						<article id="question-cards">
							{#each questions as question, index}
								{#if index === 0}
									<button class="question-button"
											id="question_{index}"
											on:click={questionClicked}
									>{question}</button>
									{:else}
									<hr>
									<button class="question-button"
											id="question_{index}"
											on:click={questionClicked}
									>{question}</button>
								{/if}
							{/each}
						</article>
					{:else}
						<article id="question-cards">
						</article>
					{/if}
					<div id="audio-controls-buttons">
						<button id="record-button" on:click={handleRecording}>Record</button>
					</div>
				</div>
			</div>
			<div class="halfsection">
				<h2>Current Bet</h2>
				<article id="current-bet-card">
					{#if currentBet !== undefined}
						{#if progressValue >= 0 && progressValue <= secondsToBet*1000}
							<h6>Time remaining: {Math.floor((secondsToBet*1000 - progressValue)/1000)} seconds</h6>
							<progress id="progress-bar" max="{secondsToBet*1000}" value = "{progressValue}" />
						{/if}
						{#if currentBetObject !== undefined}
							<!-- <h6>{currentBetObject.noPlayers}</h6> -->
						{/if}
						<div class='headings'>
							<h6>{currentBet}</h6>
							{#if currentBetObject !== undefined && progressValue <= secondsToBet*1000}
								<h5 id="yes-stats">Yes: {currentBetObject.yesPlayers} players, {currentBetObject.yesPoints} points</h5>
								<h5 id="no-stats">No: {currentBetObject.noPlayers} players, {currentBetObject.noPoints} points</h5>
								<div />
							{:else}
								<h6>Select the winner below!</h6>
							{/if}
						</div>
						<div class="row">
							{#if progressValue >= secondsToBet*1000}
								<button id="yes-button" on:click={yesButtonClicked}>Yes</button>
								<button id="no-button" on:click={noButtonClicked}>No</button>
							{/if}
						</div>
						{#if progressValue >= secondsToBet*1000}
							<button id="cancel-button" on:click={cancelButtonClicked}>Cancel the current bet</button>
						{:else}
							<button id="big-cancel-button" on:click={cancelButtonClicked}>Cancel the current bet</button>
						{/if}
					{:else}
						<h6>It looks like there isn't a current bet. Start one now!</h6>
					{/if}
				</article>
			</div>
		</div>
	</div>
	<div class="fullpage" id="past-bet-screen">
		<div class="row">
			<div class="halfsection">
				<h2>Past Bets</h2>
				<div id="pastbet-cards">
					<article id="pastbet-card">Here is one bet!</article>
					<article id="pastbet-card">Here is a second bet!</article>
					<article id="pastbet-card">Here is one bet!</article>
					<article id="pastbet-card">Here is one bet!</article>
					<article id="pastbet-card">Here is a second bet!</article>
					<article id="pastbet-card">Here is a second bet!</article>
				</div>
			</div>
			<div class="halfsection">
				<h2>Leaderboard</h2>
				<div id="leaderboard-cards">
					<article id="leaderboard-card">
						Here is one person!
						<hr>
						Here is another person!
						<hr>
						And another!
					</article>
				</div>
			</div>
		</div>
	</div>
</main>

<style lang='scss'>

	button {
		width: 10vw;
		height: 40px;
		margin: 0;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	#audio-controls-buttons {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 100%;
		/* background-color: aliceblue; */
		align-items: center;
	}

	#audio-controls {
		display: flex;
		flex-direction: column;
		align-items: center;
		align-content: center;
		width: 100%;
		height: 80%;
		padding: 0px;
	}

	#leaderboard-card {
		width: 80%;
	}

	#leaderboard-cards {
		display: flex;
		flex-direction: column;
		align-items: center;
		align-content: center;
		overflow-y: auto;
		width: 100%;
		height: 100%;
	}

	#pastbet-cards {
		display: flex;
		flex-direction: column;
		align-items: center;
		align-content: center;
		overflow-y: auto;
		width: 100%;
		height: 100%;
	}

	#pastbet-card {
		width: 80%;
	}

	h1 {
		margin-bottom: 0;
		text-align: center;
	}

	h2 {
		margin-top: 0;
		text-align: center;
	}
	.headings {
		display: flex;
		flex-direction: column;
		align-items: center;
		align-content: center;
		margin-bottom: 10px;
	}
	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		align-content: center;
		justify-content: center;
		justify-items: center;
		height: 100%;
		width: 100%;
	}
	.halfsection {
		width: 50vw;
		height: 100%;
		margin: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		align-content: center;
		background-color: inherit;
	}

	.fullpage {
		width: 100vw;
		height: 100vh;
		margin: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		align-content: center;
	}

	/* h1 is overall 100px */
	main {
		width: 100%;
		height: 100%;
		margin: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		align-content: center;
	}

	#past-bet-screen {
		background-color: aliceblue;
	}

	#homescreen {
		background-color: rgb(255, 255, 255);
		// change this linear gradient to be white
		background-image: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Dallas_Mavericks_logo.svg/800px-Dallas_Mavericks_logo.svg.png");
		background-position: center center;
		background-repeat: no-repeat;
		// make the background smaller
		background-size: 32%;
	}

	#current-bet-card {
		width: 60%;
		height: 60%;
		display: flex;
		flex-direction: column;
		align-items: center;
		align-content: center;
	}

	h2 {
		margin-bottom: 0;
	}

	#question-cards {
		width: 75%;
		height: 80%;
		display: flex;
		flex-direction: column;
		align-items: left;
		align-content: center;
		overflow-y: auto;
		padding-top: 50px;
		padding-bottom: 50px;
		text-align: left;
	}

	hr {
	width: 96%;               
	}

	.question-button {
		all: revert;
		// make the stylings for this button basically just text
		width: 100%;
		height: 50px;
		margin: 0;
		text-align: left;
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: center;

		// remove the border and background color
		border: none;
		background-color: inherit;
		border-radius: 5px;
		
		// inherit all the text stylings
		font-family: inherit;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		text-decoration: inherit;
		text-align: inherit;
		transition: 0.5s;

		// add a little padding
		padding: 10px;

		// shrink the text a little bit
		transform: scale(0.95);
		
		// make the padding larger
		&:hover {
			transform: scale(1);
		}
	}

	h6 {
		text-align: center;
	}

	#yes-stats {
		color: #7abd7e;
	}

	#no-stats {
		color: #ff6961;
	}

	#yes-button {
		background-color: #7abd7e;
		color: white;
		border: none;
		width: 100%;
		height: 100%;
		transform: scale(0.95);
		transition: 0.5s;

		&:hover {
			transform: scale(1);
		}
	}

	#no-button {
		background-color: #ff6961;
		border: none;
		color: white;
		width: 100%;
		height: 100%;
		transform: scale(0.95);
		transition: 0.5s;

		&:hover {
			transform: scale(1);
		}
	}

	#big-cancel-button {
		border: none;
		color: white;
		width: 100%;
		height: 100%;
		transform: scale(0.95);
		transition: 0.5s;

		&:hover {
			transform: scale(1);
		}
	}

	#cancel-button {
		border: none;
		color: white;
		width: 100%;
		height: 30px;
		transform: scale(0.95);
		transition: 0.5s;

		&:hover {
			transform: scale(1);
		}
	}

	#progress-bar {
		height: 50px;
	}

	h5 {
		// make this slightly smaller than h6
		font-size: 0.8em;
	}

	#record-button {
		height: 80px;
	}

</style>