<!--
<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
</svelte:head> <!-- -->
<script>
	export let condition,url;
	const conditions =['unacceptable','acceptable','good','very good','like new','new']
	const number = Math.max(0,conditions.indexOf(condition.toLowerCase()))
</script>

<div>
{#if number == 0}
	Unknown
{:else}
	{#each Array(number) as _}⭐{/each}
{/if}
</div>
<a href="{url}" title="Visit Auction" target="blank"><i class="bi bi-box-arrow-up-right"></i></a>
<style>

	div{
		margin: 0.2em;
		text-align: left;
		width: 7em;
		display: inline-block;
	}
</style>