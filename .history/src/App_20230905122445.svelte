<script>
		import 'bootswatch/dist/spacelab/bootstrap.min.css';
		import Game from './Game.svelte'
		import Slider from './Slider.svelte'
		import {Navbar,NavbarBrand,Nav,NavItem,Input, Button, Offcanvas} from 'sveltestrap'
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

		function doSort(event){
			for(const slider of sorters){
				let key;
				if (slider === event.target){
					key = 
				}
					continue
				slider.disabled=true
			}
			
		}

		let filter="", data=[], isOpen;
		const toggle =()=> isOpen=!isOpen
		const url= "319184.json"	

		const interval = 30*60000 //half hour
		const sorters={"name":"","rank":"","latest":""}
		
		const geeklist="319184"
	   const base_url = "//www.boardgamegeek.com";

		const intervalId=setInterval(()=>getData(),interval)
		onDestroy(clearInterval(intervalId));
		//document.documentElement.setAttribute('data-bs-theme', 'dark')
		getData()
 
</script>
<!-- -->
<Navbar color="primary" class="p-2 sticky-top" container>
	<NavbarBrand/>
	<Nav>
		<NavItem class="me-3 my-auto"><Input bind:value={filter} bsSize="sm" placeholder="Search Game Name" color="secondary" /></NavItem>
		<NavItem>
			<Button id="sort" on:click={()=>isOpen=!isOpen}>Sort</Button>
		</NavItem>	
	</Nav>	
</Navbar>

<Offcanvas end {isOpen} toggle={()=>isOpen=!isOpen} header="Sort Menu">
	{@const slider={min:-1,max:1,step:1,ticks:['Desc','None','Asc']}}
	<Slider {...slider} label="Name", key="name" on:input={doSort} bind:input={sorters.name} />
	<Slider {...slider} label="Last Active", key="updated" on:input={doSort} bind:input={sorters.updated}/>
	<Slider {...slider} label="BGG Rank" on:input={doSort} key="rank" bind:input={sorters.rank}/>
</Offcanvas>

<div class="wrapper m-3">
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
  grid-template-columns: repeat(auto-fill, 573px);
  grid-auto-flow: dense;
  width: 95vw;
  box-sizing: border-box;
  column-gap: 15px;
  row-gap: 20px;
  justify-content: space-evenly;
  justify-items: space-evenly;
}

@media (max-width: 580px) {
	.wrapper{
		grid-template-columns: 1fr;
		column-gap: 0px;
		row-gap: 10px;
	}
}

</style>


