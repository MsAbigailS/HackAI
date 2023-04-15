<script lang='ts'>
	import { onMount } from "svelte";
	import toWav from 'audiobuffer-to-wav';

	let media: any[] = [];
	let mediaRecorder: any = null;
	let url = 'http://10.169.162.154:5000'
	let questions: string[] = [];

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
			const response = await fetch(`${url}/transcription`, {
				method: 'POST',
				body: formData
			});
			const data = await response.text();
			// do a POST request to /getQuestions with the form body: transcript = transcript
			const secondFormData = new FormData();
			secondFormData.append('transcript', data);
			const secondResponse = await fetch(`${url}/getQuestions`, {
				method: 'POST',
				body: secondFormData
			});
			const secondData = await secondResponse.json();
			for(let i = 0; i < secondData.length; i++) {
				const question = secondData[i];
				console.log(question);
				questions[i] = question;
			}
			transcription = secondData;
		} // end of event listeners



	});  // end of onmount
	async function startRecording(){ 
		console.log('starting recording...')
		media.length = 0;
		mediaRecorder.start()
	}
	async function stopRecording() { 
		mediaRecorder.stop() 
		console.log('stopping recording...')
	}

	let transcription: undefined | string = undefined;
	let currentBet: undefined | string = 'Who will win the game between the Mavericks and the Miami Heat?';
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
				<h2>Next Bet</h2>
				<div id="audio-controls">
					{#if questions.length > 0}
						<article id="question-cards">
							{#each questions as question, index}
								<!-- <button>{question}</button> -->
								{#if index === 0}
									<button class="question-button">{question}</button>
									{:else}
									<hr>
									<button class="question-button">{question}</button>
								{/if}
							{/each}
						</article>
					{/if}
					<div id="audio-controls-buttons">
						<button on:click={startRecording}>Record</button>
						<button on:click={stopRecording}>Stop</button>
					</div>
				</div>
			</div>
			<div class="halfsection">
				<h2>Current Bet</h2>
				<article id="current-bet-card">
					<h5>{currentBet}</h5>
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
	}
	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		align-content: center;
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

	h3 {
		text-align: center;
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

</style>