<script>
  export let game, base_url, geeklist, visible;
  import { Button } from "sveltestrap";
  import PriceIndicator from "./PriceIndicator.svelte";
  import Condition from "./Condition.svelte";
  import IntersectionObserver from "svelte-intersection-observer";

  const price = (Math.round(game.GMPrice * 100) / 100).toFixed(2);
  const rating = Math.round(game.rating * 10) / 10;
  const count = game.items.length;
  let show = false, intersecting, element;
</script>

<IntersectionObserver {element} bind:intersecting threshold={0}>
  <div class="game {intersecting?"card shadow-lg p-3":"not-visible"}"  bind:this={element}>
    {#if visible && intersecting}
      <!-- HEADER -->
      <img src={game.thumbnail} class="thumbnail" alt="thumbnail" />
      <div class="name title">
        <a href="{base_url}/{game.type}/{game.id}" target="_blank" on:click={(e)=> e.stopPropagation()} title={game.name}>
          {game.name}
        </a>
        <span>({game.items.length} items)</span>
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
<style>
  .not-visible {
    display: block;
    margin: 0px;
    padding: 0px;
    height: 0px;
    width: 0px;
    border: 0px transparent !important;
  }

  .sold {
    text-decoration: line-through;
    color: lightgray;
  }

  .game {
    display: grid;
    grid-template-columns: 160px repeat(3, auto);
    grid-template-rows: repeat(5, auto);
    grid-auto-rows: min-content;
    gap: 5px;
    padding-bottom: 5px;
    place-content: start / stretch;
    place-items: start / stretch;
    box-sizing: border-box;
    white-space: nowrap;
    text-align: center;
    grid-auto-flow: row dense;
  }

  .title {
    font-weight: 600;
  }

  .thumbnail {
    grid-area: 1 / 1 / -1 / 1;
    place-self: start/center;
    width: 150px;
    filter: brightness(90%);
  }

  .showhide {
    grid-area: 5 / 2 / 5 / -1;
    ;
    place-self: start/stretch;
  }

  .name {
    grid-area: 1 / 2 / 1 / -1;
  }

  .offers {
    grid-area: 4 / 2 / 4 / -1;
    height: min-content;
    place-content: start / stretch;
    place-items: start / stretch;
    display: grid;
    grid-template-columns: 10ch min-content 1fr min-content;
    grid-template-rows: min-content;
    grid-auto-rows: min-content;
    gap: 10px;
    width: 100%;
  }

  .language {
    justify-self: stretch;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 600px) {
    .game {
      grid-template-columns: repeat(3, auto);
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
      grid-column-start: 1 !important;
    }
  }
</style>