<script lang="ts">
  export let segment;
  let links = ["dashboard", "uploads", "account", "settings"];
</script>

<main>
  <div class="logo">
    <h4>Postly</h4>
  </div>
  <ul>
    {#each links as link (link)}
      <li class:active={link === segment}>
        <a href={link}>{link}</a>
      </li>
    {/each}
  </ul>
</main>

<style>
  main {
    position: fixed;
    width: calc(100vw / 6.02);
    height: 100%;
    display: grid;
    grid-template-rows: 2fr 5fr;
    border-right: 1px solid #eee;
    z-index: 1000;
  }

  .logo {
    padding: 16px;
  }

  li {
    padding: 6px 16px;
    cursor: pointer;
    text-transform: capitalize;
  }

  .active {
    background: #e08f14;
    border-radius: 0 24px 24px 0;
    width: 96%;
  }

  a {
    color: #000;
  }

  .active > a {
    color: #fff;
  }

  h4 {
    color: #e08f14;
    letter-spacing: 3px;
  }
</style>
