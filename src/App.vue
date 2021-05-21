<template>
  <div>
    <direction />

    <div style="height: 500px; width: 1000px">
      <more-video :src="'ws://10.0.60.168:80/rtp/000000CE.flv'" equipData="''" :model="1"> </more-video>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
