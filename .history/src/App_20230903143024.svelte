<script>
		import 'bootswatch/dist/spacelab/bootstrap.min.css';
		import Game from './Game.svelte'
		import {Navbar,NavbarBrand,Nav,NavItem,Input, Button, Popover, Label} from 'sveltestrap'
		import { onDestroy } from "svelte";
	
		async function getData() {
				try{
					const response = await fetch(url)
					if (!response.ok) {
						throw new Error(`${response.status}  ${response.statusText}`)
					}
					const json = await response.json()
					data=Object.values(json)
					return json
					
				}
				catch(e){
					console.error(e)
					throw e
				} 
			}	
		

		const url = "319184.json"	
		const interval = 30*60000 //half hour
		const sort={}
		
		const geeklist="319184"
	   const base_url = "//www.boardgamegeek.com";
		let filter="", data=[], isOpen;
		const intervalId=setInterval(()=>getData(),interval)
		onDestroy(clearInterval(intervalId));
		document.documentElement.setAttribute('data-bs-theme', 'dark')
		getData()
 
</script>
<!-- -->
<Navbar dark color="primary" container sticky>
	<NavbarBrand>blaaa</NavbarBrand>
	<Nav>
		<NavItem  class="me-3"><Input bind:value={filter} bsSize="sm" color="secondary" /></NavItem>
		<NavItem><Button id="sort">Sort</Button>
			<Popover  target="sort">
				<Label for="rank" inline>Rank</Label>
				<Input type="range" max=1 min=-1 step=1 id="rank"/>

			</Popover>
		</NavItem>	
	
	</Nav>
			
</Navbar>
<!-- 
<nav class="navbar navbar-expand-sm bg-primary mb-5 sticky-top" data-bs-theme="dark">
	<div class="container-fluid">
	  <a class="navbar-brand" href="#">Navbar</a>
	  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
		 <span class="navbar-toggler-icon"></span>
	  </button>
  </div>
</nav>
<!-- -->

<div class="wrapper">
	{#each data as game}
		<Game game={game} {base_url} {geeklist} visible={game.name.toLowerCase().indexOf(filter.toLowerCase())!=-1}  />
	{/each}				
</div>



<style>

/*
:global(body){
	background-color: rgb({0},0,0);
	color: rgb(211,211,211);
}

:global(a:link,a:visited){
	color: rgb(144, 238, 144);
}*/

.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, 510px);
  grid-auto-flow: dense;
  width: 95vw;
  box-sizing: border-box;
  column-gap: 15px;
  row-gap: 20px;
  justify-content: space-evenly;
  justify-items: space-evenly;
}

@media (max-width: 550px) {
	.wrapper{
		grid-template-columns: 1fr;
		column-gap: 0px;
		row-gap: 10px;
	}
	

}

</style>


