<script lang="ts">
</script>

<main>
  <div class="container">
    <div class="bar" />
  </div>
</main>

<style>
  main {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    position: fixed;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    width: 256px;
    height: 24px;
    border: 1px solid #ccc;
    border-radius: 16px;
    position: relative;
    overflow: hidden;
  }

  .bar {
    position: absolute;
    height: 22px;
    top: 0;
    width: 48px;
    border-radius: 16px;
    background: linear-gradient(0deg, purple, rebeccapurple);
    right: 0;
    animation: load 1s linear infinite forwards;
  }

  @keyframes load {
    0% {
      left: -24px;
    }

    50% {
      left: 50%;
    }

    100% {
      left: 100%;
    }
  }
</style>
