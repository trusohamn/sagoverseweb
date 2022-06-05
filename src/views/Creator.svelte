<script lang="ts">
  import CreatorMap from "../components/CreatorMap.svelte";
  import type { Place } from "../types";

  let places: Place[];
  $: console.log(JSON.stringify(places));
</script>

<container>
  <div class="header"><h2>SagoWalk creator</h2></div>
  <CreatorMap bind:places />
  <div class="underMap">
    <div class="message">
      We are still developing this creator, but soon you will be able to submit
      your walks to Sagoverse
    </div>
  </div>
</container>

<style>
  container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: flex-start;
    background-color: #009d9d;
    overflow: hidden;
    flex-direction: column;
  }

  .header {
    height: 80px;
    display: flex;
    align-items: center;
    margin-left: 20px;
    color: white;
  }
  .underMap {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px auto 30px auto;
  }
  .message {
    max-width: 400px;
    margin-top: 20px;
    color: black;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 10px;
    border-radius: 10px;
  }
</style>
