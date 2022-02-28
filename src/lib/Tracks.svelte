<script>
  export let tracks;

  function formatDate(dateString) {
    const date = new Date(dateString)
    const month = date.toLocaleDateString(undefined, {month: 'short'})
    const year = date.toLocaleDateString(undefined, {year: '2-digit'})

    return `${month} '${year}`
  }
</script>

<div>
  {#each tracks as track}
    <div class="d-flex flex-column mb-3">
      <div class="align-self-end mb-1 me-2 text-muted" style="line-height: 1.0;">
        { formatDate(track.created_time) }
      </div>

      <iframe width="100%" height="60" title="{track.key}" src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed={track.key}" frameborder="0"></iframe>
    </div>
  {/each}
</div>