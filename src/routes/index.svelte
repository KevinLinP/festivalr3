<script>
  import artists from '../lib/artists.json'
  import Artist from '../lib/Artist.svelte'
</script>

<div class="container px-0">
  <header class="pt-2 pb-4">
    <h1 class="display-4 font-weight-thin">Movement 2022</h1>
  </header>

  {#each artists as artist}
    <div class="mb-4">
      <Artist
        key={artist.name}
        artist={artist}
      />
    </div>
  {/each}
</div>