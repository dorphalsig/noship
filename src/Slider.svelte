<script>
	function createId(){
		let id=""
		for (let i=0;i<10;i++) {
			const char = Math.floor(Math.random()*42)+48
			id+=String.fromCharCode(char)
		}
		return id;
	}

	export const id = createId()
	const getId=() => id
	export let min,max,step,ticks,value=0,label,input,key
</script>

<div class="ps-3 pe-3 mb-3">
	<label for={id} >{label}</label>
	<input class="p-0 form-range" {id} type="range" {min} {max} {step} {key} 
		 bind:this={input} bind:value={value} on:input/>
	<div class="marks">{#each ticks as _}| {/each}</div> 
	<div class="ticks">{#each ticks as tick}{tick} {/each}</div>
</div>

<style>
	.ticks, .marks
	{
		margin: -5px 2px 0px 2px;
		font-size: 0.8em;
		line-height: 1.5em;
		text-align: justify;
		text-align-last: justify;
	}
	.marks{
		margin-top: -10px;
		font-size: 0.5em;
	}
	
</style>
