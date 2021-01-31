<script lang="ts">
  export let grid: boolean;
</script>

<nav class:grid={!grid}>
  {#if !grid}
    <div>Postly</div>
  {/if}
  <div>Bell</div>
</nav>

<style>
  nav {
    position: sticky;
    top: 0;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 16px;
    padding-left: 16px;
    border-bottom: 1px solid #eee;
    background: #fff;
    z-index: 100;
  }

  nav.grid {
    justify-content: space-between;
  }

  nav.grid > div:first-child {
    font-weight: bold;
    font-size: 18px;
  }
</style>
