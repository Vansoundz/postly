<script lang="ts">
  import Load from "../../components/load.svelte";
  import axios from "axios";
  import { auth } from "../../store/auth.store";
  import { goto } from "@sapper/app";
  import { redirect } from "../../middleware/redirect";
  import { onMount } from "svelte";

  onMount(() => {
    redirect({ to: "dashboard", auth: $auth.isLoggedIn });
  });

  let loading = false;
  let user: { username?: string; email?: string; password?: string } = {};
  let errors = [];
  let password = "";

  const submit = async () => {
    if (password !== user.password) {
      errors = [{ param: "pass", msg: "passwords do not match" }];
      return;
    }

    errors = [];

    try {
      loading = true;
      let resp = await axios.post(
        "https://postl.herokuapp.com/api/users/register",
        user,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      loading = false;
      if (resp.data.errors) {
        errors = resp.data.errors;
      }

      if (resp.data.user) {
        localStorage.setItem("__postly", resp.data.token);
        auth.login(resp.data.user);
        goto("dashboard");
      }
    } catch (error) {
      console.log(error.response);
      loading = false;
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
        <h5>Register</h5>
      </div>
      <div>
        <div>
          <label for="username">Username:</label>
        </div>
        <div>
          <input
            bind:value={user.username}
            type="text"
            id="username"
            placeholder="John Doe"
          />
        </div>
        {#if errors.find((err) => err.param === "username")}
          <div class="error username">
            {errors.find((err) => err.param === "username").msg}
          </div>
        {/if}
      </div>
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
        <div>
          <label for="pass">Confirm:</label>
        </div>
        <div>
          <input bind:value={password} type="password" id="pass" />
        </div>
        {#if errors.find((err) => err.param === "pass")}
          <div class="error pass">
            {errors.find((err) => err.param === "pass").msg}
          </div>
        {/if}
      </div>
      <div>
        <button>Register</button>
      </div>
      <div>
        <div>
          <span>Have an account? </span><a href="auth/login">Login</a>
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
