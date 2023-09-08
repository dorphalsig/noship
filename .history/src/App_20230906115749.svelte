<script>
		import 'bootswatch/dist/spacelab/bootstrap.min.css';
		import Game from './Game.svelte'
		import Slider from './Slider.svelte'
		import {Navbar,NavbarBrand,Nav,NavItem,Input, Button, Offcanvas, Card} from 'sveltestrap'
		import { onDestroy } from "svelte";
		import { decodeArrayStream } from "@msgpack/msgpack";
		
	
		async function getData() {
			try{
				const response = await fetch(url)
				if (!response.ok) {
					throw new Error(`${response.status}  ${response.statusText}`)
				}
				for await (const item of decodeArrayStream(response.body)) {
					data.push(item)
					if(data%10==0)
						data=data
				}
				data=data
				
			}
			catch(e){
				console.error(e)
				throw e
			} 
		}	

		function doSort(event){
			const key = event.target.getAttribute("key") 
			const direction = event.target.value

			for(const slider of Object.values(sorters)){
				if (slider === event.target) 
					continue
				slider.value=0
				slider.value=0
			}
			const sorter = function(a,b){	
				const val0 = typeof(a[key])=="number"?parseFloat(a[key]):a[key]
				const val1=	typeof(a[key])=="number"?parseFloat(b[key]):b[key]
				if(val0==val1) return 0
				if(val0 > val1) return 1*direction
				else return -1*direction
			}

			if (event.target.value !==0)
			debugger
				data= data.sort(sorter)
		}

		function watchGame(){

		}

		let filter="", data=[], filtersOpen, watchOpen;
		const toggle =()=> filtersOpen=!filtersOpen
		const url= "319184.mpk"	

		const interval = 30*60000 //half hour
		const sorters={}
		
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
			<Button id="sort" on:click={()=>filtersOpen=!filtersOpen}>Sort</Button>
		</NavItem>	
		<!-- <NavItem>
			<Button id="watch" on:click={()=>watchOpen=!watchOpen}>Stake Out</Button>
		</NavItem> -->
	</Nav>	
</Navbar>

<Offcanvas end isOpen={filtersOpen} toggle={()=>filtersOpen=!filtersOpen} header="Sort Menu">
	{@const slider={min:-1,max:1,step:1,ticks:['Desc','None','Asc']}}
	<Slider {...slider} label="Name" key="name" on:input={doSort} bind:input={sorters.name} />
	<Slider {...slider} label="Last Active" key="updated" on:input={doSort} bind:input={sorters.updated}/>
	<Slider {...slider} label="BGG Rank" on:input={doSort} key="rank" bind:input={sorters.rank}/>
</Offcanvas>
<!-- 
<Offcanvas start isOpen{watchOpen} toggle={()=>filtersOpen=!filtersOpen} header="Stake Out a Game">
<Card>
	This will keep an eye on new games 
</Card>
</Offcanvas> -->
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


