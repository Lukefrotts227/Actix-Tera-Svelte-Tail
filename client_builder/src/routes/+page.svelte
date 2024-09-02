<script>
    let counter = 0;

    function countUp() {
        counter += 1;
    }
    function countDown() {
        counter -= 1;
    }
    function navigateToAnotherPage() {
        window.location.href = "/"; // Replace with your desired route
    }
</script>

<main class="">
    <h1>Page</h1>
    <p>This is a page.</p>
    <div class="">
        <button on:click={countUp} class="rounded-lg bg-gradient-to-r from-red-200 to-red-400 via-red-300 hover:bg-gradient-to-l hover:from-red-200 hover:to-red-400 hover:via-red-300">Count up</button>
        <button on:click={countDown} class="">Count Down</button>
        <button on:click={navigateToAnotherPage} class="">Go to Another Page</button>
    </div>
    <p class="">Counter: {counter}</p>
</main>

<style>

</style>
