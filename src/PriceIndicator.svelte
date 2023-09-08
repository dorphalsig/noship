<script>
    export let avgPrice, price, sold;
    const yellow = [0.8, 1.1]
    const ratio = Number(price) / Number(avgPrice)

    let color = "transparent"
    if (!sold) {
        color = "#00f700"
        if ((ratio >= yellow[0]) && (ratio <= yellow[1])) {
            color = "orange"
        }
        else if (ratio > yellow[1]) {
            color = "#f70000"
        }

    }
</script>
<div style="--color: {color}" class:sold={sold}>{(Math.round(price * 10) / 10).toFixed(2)} &euro;</div>
<style>
	div{
		border-left: var(--color) solid 3px;
        padding-left: 5px;
        width: min-con;
	}
    .sold {
        text-decoration: line-through;
        color: lightgray;
    }
</style>