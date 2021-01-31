<script lang="ts">
  import Load from "../../components/load.svelte";
  import axios from "axios";
  import { auth } from "../../store/auth.store";
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import { redirect } from "../../middleware/redirect";

  onMount(() => {
    redirect({ to: "dashboard", auth: $auth.isLoggedIn });
  });

  let loading = false;
  let user: { email?: string; password?: string } = {};
  let errors = [];

  const submit = async () => {
    errors = [];

    loading = true;
    let resp = await axios.post("auth/api/login.json", user, {
      headers: { "Content-Type": "application/json" },
    });
    loading = false;
    if (resp.data.errors) {
      errors = resp.data.errors;
    }
    if (resp.data.errors) {
      errors = resp.data.errors;
    }

    console.log(resp.data);

    if (resp.data.user) {
      auth.login(resp.data.user);
      goto("dashboard");
    }
  };
</script>

{#if loading}
  <Load />
{/if}

<main>
  <div>
    <div>Schedule your posts</div>
  </div>
  <div>
    <form on:submit|preventDefault={submit}>
      <div>
        <h5>Login</h5>
      </div>
      <div>
        <div>
          <div>
            <label for="email">Email:</label>
          </div>
          <div>
            <input
              bind:value={user.email}
              type="email"
              id="email"
              placeholder="John Doe"
            />
          </div>
          {#if errors.find((err) => err.param === "email")}
            <div class="error email">
              {errors.find((err) => err.param === "email").msg}
            </div>
          {/if}
        </div>
        <div>
          <div>
            <label for="password">Password:</label>
          </div>
          <div>
            <input bind:value={user.password} type="password" id="password" />
          </div>
          {#if errors.find((err) => err.param === "password")}
            <div class="error password">
              {errors.find((err) => err.param === "password").msg}
            </div>
          {/if}
        </div>

        <div>
          <button>Log in</button>
        </div>
      </div>
      <div>
        <div>
          <span>New user? </span><a href="auth/register">Register</a>
        </div>
      </div>
    </form>
  </div>
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    height: calc(100vh - 50px);
  }

  main > div:first-child {
    display: flex;
    margin: auto;
    justify-content: center;
    align-items: center;
    background: url(/images/schedule.jpg);
    background-color: #00000050;
    background-blend-mode: overlay;
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 48px;
    font-weight: bolder;
  }

  main > div:last-child {
    display: block;
    margin: auto;
  }

  form {
    width: 240px;
  }

  form > div {
    width: 100%;
  }

  h5 {
    text-align: center;
    margin-bottom: 8px;
  }

  label {
    font-size: 12px;
    color: #999;
  }

  input {
    padding: 8px 16px;
    border-radius: 4px;
    background: #ddd;
    width: 100%;
  }

  button {
    padding: 8px 24px;
    border-radius: 36px;
    margin: 16px auto;
    display: block;
    background: #f1a80c;
    color: #fff;
  }

  .error {
    background: #ff000047;
    padding: 1px 8px;
    border-radius: 2px;
    color: red;
    margin: 3px 0;
    font-size: 12px;
  }
</style>
