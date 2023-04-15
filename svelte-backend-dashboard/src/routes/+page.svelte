<script lang='ts'>
	import { onMount } from "svelte";

	let media: any[] = [];
	let mediaRecorder: any = null;
	onMount(async () => {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

		mediaRecorder = new MediaRecorder(stream);

		mediaRecorder.ondataavailable = (e: any) => media.push(e.data)

		mediaRecorder.onstop = function(){
			const audio = document.querySelector('audio');

			const blob = new Blob(media, {'type' : 'audio/wav; codecs=MS_PCM' });

			media = []; 
			if(audio) {
				audio.src = window.URL.createObjectURL(blob);
			}
		}

	});  
	function startRecording(){ mediaRecorder.start() }
	function stopRecording() { mediaRecorder.stop() }

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
		<audio controls />
		<button on:click={startRecording}>Record</button>
		<button on:click={stopRecording}>Stop</button>
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

<style>

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
		background-color: aliceblue;
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

</style>