<script>
  import { currentArtistName } from './store.js'
  import Tracks from './Tracks.svelte'

  export let artist

  function nameClicked() {
    currentArtistName.set(artist.name)
  }

  $: isCurrentArtist = ($currentArtistName == artist.name)
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
      class:active={isCurrentArtist}
      href="javascript:void(0);"
    >
      { artist.name }
    </a>
  </div>

  {#if isCurrentArtist}
  <div class="ms-md-4">
    <Tracks tracks={artist.tracks} />
  </div>
  {/if}
</div>
