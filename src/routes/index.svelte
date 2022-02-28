<script>
  import artists from '../lib/artists.json'
  import Artist from '../lib/Artist.svelte'
</script>

<div class="container">
  <header class="pt-2 pb-4 d-flex align-items-baseline flex-wrap">
    <h1 class="display-4 font-weight-thin me-3">Movement 2022</h1>
    <h2 class="display-5 font-weight-thin text-muted">Teaser Lineup</h2>
  </header>

  {#each artists as artist (artist.name)}
    <div class="mb-4">
      <Artist
        artist={artist}
      />
    </div>
  {/each}
</div>