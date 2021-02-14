<script lang="ts">
  import axios from "axios";
  import Nav from "../components/Nav.svelte";
  import Sidebar from "../components/sidebar.svelte";
  import { auth } from "../store/auth.store";
  import { goto, stores } from "@sapper/app";
  import { onMount } from "svelte";
  import Load from "../components/load.svelte";
  export let segment: string;

  auth.init();
  const page = stores().page;
  let path = $page.path;

  onMount(async () => {
    try {
      let resp = await axios.get("https://postl.herokuapp.com/api/users", {
        headers: { authorization: localStorage.__postly },
      });

      console.log(resp.data);

      if (resp.data.user) {
        auth.login(resp.data.user);
        if ($auth.isLoggedIn) {
          goto(path === "" ? "dashboard" : path.substr(1, path.length));
        }
      } else {
        auth.logout();
      }
    } catch (error) {
      auth.logout();
    }

    if ($auth.isLoggedIn) {
      goto(path === "" ? "dashboard" : path.substr(1, path.length));
    }
  });

  $: grid = segment && segment !== "auth";
</script>

{#if $auth.loading}
  <Load />
{:else}
  <main id={grid ? "app" : ""}>
    {#if grid}
      <div>
        <Sidebar {segment} />
      </div>
    {/if}
    <div>
      <Nav {grid} />
      <slot />
    </div>
  </main>
{/if}

<style>
  #app {
    display: grid;
    grid-template-columns: 1fr 5fr;
  }
</style>
