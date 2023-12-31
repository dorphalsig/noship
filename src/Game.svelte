<script>
  export let game, base_url, geeklist, visible;
  import { Button } from "sveltestrap";
  import PriceIndicator from "./PriceIndicator.svelte";
  import Condition from "./Condition.svelte";
  import IntersectionObserver from "svelte-intersection-observer";
  let price, rating, count, show = false, intersecting, element;
  $: {
    price = (Math.round(game.GMPrice * 100) / 100).toFixed(2);
    rating = Math.round(game.rating * 10) / 10;
    count = game.items.length;  
  }
  
</script>
{#if visible}
  <IntersectionObserver {element} bind:intersecting threshold={0}>
    {@const normalClasses="game card shadow p-3"}
    <div class={visible?normalClasses:""} bind:this={element}>
      {#if intersecting}
        <!-- HEADER -->
        <img src={game.thumbnail} class="thumbnail" alt="thumbnail" />
        <div class="name title">
          <div class="nameContent">
            <span>
              <a href="{base_url}/{game.type}/{game.id}" target="_blank" title={game.name}>{game.name}</a>
              <span>({game.items.length} items)</span>
            </span>
          </div>
        </div>
        <div class="title">Rank</div>
        <div class="title">Rating</div>
        <div class="title">BGG Store Price</div>
        <div>{game.rank}</div>
        <div>{rating}</div>
        <div>{price} €</div>
        <!-- OFFERS -->
        {#if show}
          <div class="offers">
            <div class="title">Price</div>
            <div class="title">Bids</div>
            <div class="title">Language</div> 
            <div class="title">Condition</div>

            {#each game.items as item}
            {@const consts = {
              url: `${base_url}/geeklist/${geeklist}?itemid=${item.entry_id}`,
              language: item.language == null ? "" : item.language,
            }}
            <div class="price">
              <PriceIndicator avgPrice={game.GMPrice} price={item.price} sold={item.sold} />
            </div>
            <div class:sold={item.sold}>{item.bids}</div>
            <div class:sold={item.sold} class="language" title={consts.language}>
              {consts.language}
            </div>
            <div class:sold={item.sold}>
              <Condition condition={item.condition} url={consts.url} />
            </div>
            {/each}
          </div>
        {/if}
        <div class="showhide">
          <Button color="primary" block size="sm" on:click={()=>{show=!show}}>{show ? "Hide" : "Show"} Offers</Button>
        </div>
      {/if}
      </div>
    </IntersectionObserver>
{/if}
<style>
  .sold {
    text-decoration: line-through;
    color: lightgray;
  }

  .game {
    display: grid;
    grid-template-columns: 160px repeat(3, auto);
    grid-template-rows: repeat(5, auto); 
    gap: 2px;
    margin:0px;
    padding-bottom: 5px;
    place-content: start stretch;
    place-items: start stretch;
    box-sizing: border-box;
    white-space: nowrap;
    text-align: center;
    grid-auto-flow: row dense;
    width: 100%;
  }

  .title {
    font-weight: 600;
  }

  .thumbnail {
    grid-area: 1 / 1 / -1 / 1;
    place-self: start center;
    justify-self: start center;
    width: 150px;
    filter: brightness(90%);
  }

  .showhide {
    grid-area: 5 / 2 / 5 / -1;
    place-self: start stretch;
  }

  .name {
    grid-area: 1 / 2 / 1 / -1;
  }

  .nameContent{
    display: inline-flex;
    justify-content: center; 
    text-align: left;
    white-space: normal;   
  }

  .nameContent>span>span{
    white-space: nowrap;
  }
  
  .offers {
    grid-area: 4 / 2 / 4 / -1;
    height: min-content;
    place-content: start stretch;
    place-items: start stretch;
    display: grid;
    grid-template-columns: 10ch 1fr 140px 1fr;
    grid-template-rows: min-content;
    grid-auto-rows: min-content;
    gap: 0px !important;
    width: 100%;
    padding-right: 15px;
  }

  .language {
    justify-self: stretch;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 580px) {
    .game {
      width: 580px;
      padding-left: 5px;
      padding-right: 5px;
      grid-template-columns: repeat(3, auto);
      grid-template-rows: repeat(6, auto); 
    }

    .thumbnail {
      justify-self: center;
      grid-row-end: 1;
      grid-column-end: -1;
    }

    .name {
      grid-area: 2 / 1 / 2 / -1;
    }

    .language {
      max-width: 130px;
    }

    .name {
      grid-column-start: 1 !important;
    }

    .offers {
      grid-area: 5 / 1 / 5 / -1;
    }
    .showhide {
    grid-area: 6 / 1 / 6 / -1;
    }
  }
</style>