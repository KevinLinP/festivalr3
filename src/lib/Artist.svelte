<script>
  import ArtistMusic from './ArtistMusic.svelte'

  export let artist
  let open = false

  function nameClicked() {
    open = !open
  }
</script>

<style>
  .artist-name {
    text-decoration: none;
  }

  .artist-name.active {
    color: inherit;
  }
</style>

<div>
  <div class="d-flex align-items-end mb-3">
    <a
      on:click={nameClicked}
      class="artist-name display-3"
      style="width: 100%; line-height: 1.0;"
      href="javascript:void(0);"
    >
      { artist.name }
    </a>
  </div>

  {#if open}
  <div class="ms-md-4">
    <ArtistMusic tracks={artist.tracks} />
  </div>
  {/if}
</div>
