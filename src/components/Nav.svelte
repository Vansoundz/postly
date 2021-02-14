<script lang="ts">
  import axios from "axios";
  import Load from "./load.svelte";

  import Modal from "./modal/modal.svelte";

  export let grid: boolean;
  let open: boolean = false,
    loading: boolean = false;
  let toggle = () => (open = !open);
  let images: Blob[];
  let i = 0;

  const upload = async () => {
    loading = true;
    let body = new FormData();

    for (let image of images) {
      body.append(Math.random().toString(), image);
    }

    //@ts-ignore
    for (let key of body.keys()) console.log(key);

    let res = await axios.post("/api/images", body);
    console.log(res.data);

    loading = true;
  };
</script>

{#if loading}
  <Load />
{/if}

<Modal {open} {toggle} slots={true}>
  <div slot="header">Upload files</div>
  <div slot="body">
    {#if images?.length > 0}
      <div class="selected">
        {images?.length} Images selected
      </div>
    {:else}
      <div>
        <label for="posts">
          <div class="upload">
            <i class="material-icons">cloud_upload</i>
          </div>
        </label>
        <input
          type="file"
          on:change={async (e) => {
            if (e.currentTarget.files) {
              // @ts-ignore

              images = e.currentTarget.files;
            }
          }}
          id="posts"
          multiple
        />
      </div>
    {/if}
  </div>
  <span slot="footer">
    <button on:click={upload}>Upload</button>
  </span>
</Modal>

<nav class:grid={!grid}>
  {#if !grid}
    <div>Postly</div>
  {:else}
    <div>
      <span on:click={toggle}><i class="material-icons">file_upload</i></span>
      <span><i class="material-icons">notifications</i></span>
      <span><i class="material-icons">account_circle</i></span>
    </div>
  {/if}
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

  button {
    margin-right: 16px;
    padding: 8px 16px;
    border: 1px solid #e08f14;
    background: #fff;
    border-radius: 4px;
  }

  .upload {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    border: 1px solid #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    display: none;
  }
</style>
