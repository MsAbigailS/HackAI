<script lang='ts'>

</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css">
</svelte:head>

<main>
	<h1>Admin Dashboard</h1>
	<!-- make four different boxes that each separate the page below the header into four equal parts -->
	<div class="row">
		<div class="box">
			<h2>Box 1</h2>
		</div>
		<div class="box">
			<h2>Box 2</h2>
		</div>
	</div>	
	<div class="row">
		<div class="box">
			<h2>Box 3</h2>
		</div>
		<div class="box">
			<h2>Box 4</h2>
		</div>
	</div>
</main>

<style>
	h1 {
		text-align: center;
		margin: 10px;	/*20 px overall*/
		height: 80px;
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

	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		align-content: center;
		width: 100vw;
		height: calc(50vh - 50px);
	}

	.box {
		width: 50%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		align-content: center;
		background-color: lightgray;
		border: 1px solid black;
	}
</style>