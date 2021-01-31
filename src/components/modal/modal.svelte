<script lang="ts">
  export let open: boolean;
  export let toggle: () => void;
  import { fade, scale } from "svelte/transition";
</script>

{#if open}
  <main in:fade={{ duration: 200 }} out:scale={{ duration: 500 }}>
    <div>
      <div class="header">Header</div>
      <div class="body">Body</div>
      <div class="footer" on:click={() => toggle()}>Footer</div>
    </div>
  </main>
{/if}

<style>
  main {
    position: fixed;
    width: 100vw;
    height: 100%;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #00000067;
    top: 0;
    left: 0;
  }

  main > div {
    width: 850px;
    height: 500px;
    background: #fff;
    border-radius: 4px;
  }
</style>
