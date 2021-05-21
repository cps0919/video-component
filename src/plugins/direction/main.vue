<template>
  <div class="direction">
    <div
      class="item"
      v-for="(item, index) in 8"
      :key="index"
      :style="{ 'background-image': `url${item.img}` }"
      alt=""
      @mousedown="controlClick('down', index + 1)"
      @mouseup="controlClick('up', index + 1)"
    />
  </div>
</template>
<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  name: "direction",
  methods: {
    controlClick(type: string, e: number) {
      this.$emit("direction", { mouse: type, direction: e });
    },
  },
});
</script>
<style scoped>
.direction {
  margin: 0 auto;
  width: 25rem;
  height: 25rem;
  background-image: url("./../../assets/img/yuntai_btn_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.item {
  height: 3.5rem;
  width: 3.5rem;
  position: absolute;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.item:hover {
  cursor: pointer;
}

.item:nth-child(1) {
  top: 5%;
  left: 44%;
  background-image: url("./../../assets/img/yuntai_btn_up.png");
}
.item:nth-child(1):active {
  background-image: url("./../../assets/img/yuntai_btn_up_s.png");
}
.item:nth-child(2) {
  top: 16%;
  right: 17%;
  background-image: url("./../../assets/img/yuntai_btn_right1.png");
}
.item:nth-child(2):active {
  background-image: url("./../../assets/img/yuntai_btn_right1_s.png");
}
.item:nth-child(3) {
  bottom: 40%;
  right: 6%;
  background-image: url("./../../assets/img/yuntai_btn_right.png");
}
.item:nth-child(3):active {
  background-image: url("./../../assets/img/yuntai_btn_right_s.png");
}
.item:nth-child(4) {
  bottom: 17%;
  right: 18%;
  background-image: url("./../../assets/img/yuntai_btn_right2.png");
}
.item:nth-child(4):active {
  background-image: url("./../../assets/img/yuntai_btn_right2_s.png");
}
.item:nth-child(5) {
  bottom: 5%;
  left: 44%;
  background-image: url("./../../assets/img/yuntai_btn_down.png");
}
.item:nth-child(5):active {
  background-image: url("./../../assets/img/yuntai_btn_down_s.png");
}
.item:nth-child(6) {
  bottom: 16%;
  left: 17%;
  background-image: url("./../../assets/img/yuntai_btn_left2.png");
}
.item:nth-child(6):active {
  background-image: url("./../../assets/img/yuntai_btn_left2_s.png");
}
.item:nth-child(7) {
  bottom: 40%;
  left: 6%;
  background-image: url("./../../assets/img/yuntai_btn_left.png");
}
.item:nth-child(7):active {
  background-image: url("./../../assets/img/yuntai_btn_left_s.png");
}
.item:hover {
  cursor: pointer;
}
.item:nth-child(8) {
  top: 16%;
  left: 18%;
  background-image: url("./../../assets/img/yuntai_btn_left1.png");
}
.item:nth-child(8):active {
  background-image: url("./../../assets/img/yuntai_btn_left1_s.png");
}
</style>