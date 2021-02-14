<script lang="ts">
  // import {} from "module"
  let posts = Array(10).fill(Math.random(), 0, 10);
</script>

<svelte:head>
  <title>Upload</title>
</svelte:head>

<main>
  <div class="header">
    <h1>Hi, What would you like to do today</h1>
  </div>
  <div class="posts">
    {#each posts as item (Math.random())}
      <div
        class="post"
        style="background: {'#' + Math.random().toString().slice(4, 10)}"
      >
        <div class="actions">
          <i class="material-icons">edit</i>
          <i class="material-icons">delete</i>
        </div>
      </div>
    {/each}
  </div>
</main>

<style>
  main {
    padding: 16px;
  }
  h1 {
    font-size: 32px;
    font-weight: 100;
  }
  .posts {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  .post {
    height: 250px;
    border: 1px solid #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 0.9;
  }

  .actions {
    display: none;
  }

  .post:hover .actions {
    display: block;
  }
</style>
