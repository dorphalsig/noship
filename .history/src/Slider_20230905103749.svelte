<script>
	import {Input, Label} from 'sveltestrap'
	function createId(){
		let id=""
		for (let i=0;i<10;i++) {
			const char = Math.floor(Math.random()*42)+48
			id+=String.fromCharCode(char)
		}
		console.log(id)
		return id;
	}

	export const id = createId()
	console.log(createId())
	export const getId=() => id
	export let min,max,step,ticks,value=0,label,disabled=false
</script>

<div class="ps-3 pe-3 mb-3">
	<Label for={id} >{label}</Label>
	<Input class="p-0" {id} type="range" {min} {max} {step} {disabled}  bind:this={wtf} bind:value={value} on:input/>
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
