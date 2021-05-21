<template>
  <div>
    <div style="height: 500px; width: 1000px">
      <more-video :src="src" equipData="equipData" :model="model"> </more-video>
    </div>
    <div style="height: 500px; width: 1000px;margin:50px">
      <direction></direction>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    let state = reactive({
      src:
        "http://cyberplayer.bcelive.com/videoworks/mda-kbuhu4wqdi08dwix/cyberplayer/flv/cyberplayer-demo.flv",
      equipData: {
        id: "",
        name: "",
        ip: "",
        port: "",
      },
      model: 4,
    });
    return {
      ...toRefs(state),
    };
  },
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
