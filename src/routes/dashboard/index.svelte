<script lang="ts">
  import { onMount } from "svelte";
  import Modal from "../../components/modal/modal.svelte";
  let open: boolean = false;
  onMount(() => {
    // @ts-ignore
    var ctx = document.getElementById("myChart").getContext("2d");
    // @ts-ignore
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Schedule",
            backgroundColor: "transparent",
            borderColor: "rgb(255, 99, 132)",
            data: [5, 10, 5, 25, 20, 30, 45],

            scaleOptions: {
              yAxes: [
                {
                  id: "first-y-axis",
                  type: "linear",
                  ticks: {
                    beginAtZero: true,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Posts",
                  },
                },
              ],
            },
            // xAxisID: "Time",
            // yAxisID: "Posts",
          },
        ],
      },

      // Configuration options go here
      options: {},
    });
  });

  const toggle = () => {
    open = !open;
    // console.log(open);
  };
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<Modal {open} {toggle} />

<main>
  <div class="heading" on:click={() => (open = !open)}>
    <h3>Schedule your posts with postly</h3>
  </div>

  <div>
    <h4>Summary</h4>
    <div class="overview">
      <div class="item">
        <div>Posted</div>
        <div>7</div>
      </div>
      <div class="item">
        <div>Scheduled</div>
        <div>12</div>
      </div>
    </div>
  </div>
  <div>
    <div class="timeline">
      <h4>Timeline</h4>
      <canvas id="myChart" />
    </div>
  </div>
</main>

<style>
  .heading {
    text-align: center;
    padding: 24px 0;
    font-size: 24px;
    width: 100%;
  }

  main > div {
    padding: 48px 0;
    max-width: 600px;

    margin: auto;
  }

  .overview {
    display: flex;
    justify-content: space-around;
    padding: 36px 0;
  }

  .item {
    padding: 24px;
    border-radius: 16px;
    height: 128px;
    width: 128px;
    background: #4dc9;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-end;
  }

  .item > div:last-child {
    font-weight: 100;
    font-size: 48px;
  }

  #myChart {
    width: 600px !important;
    height: 310px !important;
    margin: auto;
    display: block;
    margin: 16px auto 64px;
  }
</style>
