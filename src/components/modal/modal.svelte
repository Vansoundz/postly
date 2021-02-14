<script lang="ts">
  export let open: boolean;
  export let slots: boolean = false;
  export let toggle: () => void;
  import { fade, scale } from "svelte/transition";
</script>

{#if open}
  <main in:fade={{ duration: 200 }} out:scale={{ duration: 500 }}>
    {#if slots}
      <div class="modal">
        <div class="header">
          <slot name="header" />
        </div>
        <div class="body">
          <slot name="body" />
        </div>
        <div class="footer">
          <span>
            <slot name="footer" />
          </span>
          <span>
            <button on:click={() => toggle()}>Close</button>
          </span>
        </div>
      </div>
    {:else}
      <div>
        <slot />
      </div>
    {/if}
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

  .modal {
    justify-content: space-between;
    flex-direction: column;
    overflow: hidden;
  }

  .modal,
  .body,
  .footer {
    display: flex;
  }

  .body {
    justify-content: center;
  }

  .footer {
    justify-content: flex-end;
    padding: 8px;
    box-shadow: -1px -1px 8px #ddd;
  }

  button {
    padding: 8px 16px;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 4px;
  }

  .header {
    padding: 8px;
    box-shadow: 0 0 8px #ddd;
  }
</style>
