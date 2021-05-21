<template>
  <div class="content">
    <div class="video">
      <div class="row">
        <div
          class="col"
          v-for="(item, index) in videoNum.num"
          :key="index"
          :style="{ height: videoNum.span, flex: `0 0 ${videoNum.span}` }"
          :class="{
            ac_video: index == acVideo,
          }"
        >
          <div
            :ref="`videoElement${index}`"
            :id="`videoElement${index}`"
            class="video"
            @click.prevent="videoClick(index)"
          ></div>
        </div>
      </div>
    </div>
    <div class="btm">
      <span class="el-icon-camera-solid" @click="capture(acVideo)">
        <slot name="capture">截屏</slot>
      </span>

      <span class="el-icon-delete" @click="videoPuse(acVideo)">
        <slot name="puse"><span>停止播放</span></slot>
      </span>
      <span
        v-for="(item, index) in btnList"
        :key="index"
        :class="{
          acIcon: videoNum.num == item.num,
        }"
        @click="numClick(item.num)"
      >
        <slot :name="`num${item.num}`">{{ item.icon }}</slot>
      </span>
    </div>
  </div>
</template>

<script>
import WasmPlayer from "@easydarwin/easywasmplayer";
export default {
  name: "more-video",
  props: {
    //播放地址
    src: {
      type: String,
      default: "",
    },
    //传入摄像机信息
    equipData: {
      type: Object,
      default: () => null,
    },
    //窗口个数
    model: {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {
      flvPlyer: null,
      myClearInterval: null,
      acVideo: 0,
      videoSrcList: [], //播放得src
      equipList: [], //摄像机信息
      btnList: [
        { num: 1, icon: "一宫格" },
        { num: 4, icon: "四宫格" },
        { num: 9, icon: "九宫格" },
        { num: 16, icon: "十六宫格" },
        // { num: 16, icon: "icon-tubiaozhizuomoban1" },
      ],
      videoNum: {
        num: 4,
        span: "50%",
        height: "50%",
      },
    };
  },
  mounted() {
    if (this.src) {
      this.player(this.acVideo, this.src, this.equipData);

    }
    //初始化窗口个数
    if (this.model == 1) {
      this.videoNum = {
        num: 1,
        span: "100%",
        height: "100%",
      };
    } else if (this.model == 4) {
      this.videoNum = {
        num: 4,
        span: "50%",
        height: "50%",
      };
    } else if (this.model == 9) {
      this.videoNum = {
        num: 9,
        span: "33.3%",
        height: "33.3%",
      };
    } else if (this.model == 16) {
      this.videoNum = {
        num: 16,
        span: "25%",
        height: "25%",
      };
    }
  },
  watch: {
    src: {
      handler() {
        this.player(this.acVideo, this.src, this.equipData);

        if (this.videoNum.num == 4) {
          if (this.acVideo < 3) {
            this.acVideo = this.acVideo + 1;
          }
        } else if (this.videoNum.num == 9) {
          if (this.acVideo < 8) {
            this.acVideo = this.acVideo + 1;
          }
        } else if (this.videoNum.num == 16) {
          if (this.acVideo < 15) {
            this.acVideo = this.acVideo + 1;
          }
        }
      },
    },
  },
  methods: {
    destroyPlayer(i) {
      for (let index = 0; index < i; index++) {
        try {
          if (this.videoSrcList[index]) {
            this.videoSrcList[index].destroy();
            this.videoSrcList[index] = null;
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    player(acVideo, src, equipData) {
      this.equipList[acVideo] = equipData;
      try {
        if (this.equipList[acVideo]) {
          this.videoSrcList[acVideo].destroy();
        }
      } catch (error) {
        console.log(error);
      }
      // this.videoSrcList[acVideo].destroy();
      this.$nextTick(() => {
        try {
          this.videoSrcList[acVideo] = new WasmPlayer(
            null,
            `videoElement${acVideo}`,
            (e) => {
              this.callbackfun(e, acVideo);
            },
            {
              cbUserPtr: this,
              Height: true,
              logo: false,
              openAudio: false,
              live: true,
              timeout: 2,
            }
          );
          this.videoSrcList[acVideo].play(src, 1);
        } catch (error) {
          console.log(error);
        }
      });
    },
    callbackfun(e) {
      try {
        console.log(e);
      } catch (error) {
        console.log(error);
      }
    },
    // //回调函数
    // callbackfun(e, type) {
    //   console.log(e, type);
    //   if (e == "stop") {
    //     // this.videoSrcList[this.acVideo] = null;
    //     // console.log(this.videoSrcList[this.acVideo]);
    //   }
    // },
    videoClick(i) {
      this.acVideo = i;
      this.$emit("videoClick", this.equipList[this.acVideo]);
    },

    numClick(i) {
      this.videoClick(0);
      // this.destroyPlayer(this.videoNum.num);
      if (i == 1) {
        this.videoNum = {
          num: i,
          span: "100%",
          height: "100%",
        };
      } else if (i == 4) {
        this.videoNum = {
          num: i,
          span: "50%",
          height: "50%",
        };
      } else if (i == 9) {
        this.videoNum = {
          num: i,
          span: "33.3%",
          height: "33.3%",
        };
      } else if (i == 16) {
        this.videoNum = {
          num: i,
          span: "25%",
          height: "25%",
        };
      }
    },
    capture(acVideo) {
      let el = document.createElement("img");
      let elvideo = document.getElementById(`videoElement${acVideo}`)
        .childNodes[3];
      if (elvideo == "undefined") {
        //无视频播放
        el = document.getElementById(`videoElement${acVideo}`);
      } else {
        el = elvideo;
      }
      console.log(el, elvideo);

      var canvas = document.createElement("canvas"); //创建一个canvas
      canvas.width = 1920; //设置canvas的宽度为视频的宽度
      canvas.height = 1080; //设置canvas的高度为视频的高度
      canvas.getContext("2d").drawImage(el, 0, 0, canvas.width, canvas.height); //绘制图像
      var img = document.createElement("a");
      img.href = canvas
        .toDataURL("image/jpeg")
        .replace("image/jpeg", "image/octet-stream");
      let name = "截图";
      if (this.equipList.length != 0) {
        if (this.equipList[acVideo]) {
          name = this.equipList[acVideo]["name"];
        }
      }
      img.download = `${name}.jpg`;
      img.click();
    },
    videoPuse(acVideo) {
      try {
        if (this.videoSrcList[acVideo]) {
          this.videoSrcList[acVideo].destroy();
          this.equipList[acVideo] = null;
          this.videoSrcList[acVideo] = null;
          this.$emit("videoClick", this.equipList[acVideo]);
        } else {
          this.$message({
            message: "该窗口不存在视频播放",
            type: "warning",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  beforeUnmount() {
    for (let index = 0; index < this.videoNum.num; index++) {
      try {
        if (this.videoSrcList[index]) {
          this.videoSrcList[index].destroy();
          this.videoSrcList[index] = null;
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>

<style  scoped>
.content {
  height: 100%;
  width: 100%;
}
.video {
  height: calc(100% - 30px);
  width: 100%;
  box-sizing: border-box;
}
.btm {
  font-size: 10px;
  text-align: right;
  padding: 0 10px;
  line-height: 26px;
  background-color: rgba(69, 162, 255, 0.15);
  box-shadow: 0 0 10px 1px rgb(69 162 255 / 80%) inset;
  border-bottom: 1px solid rgba(69, 162, 255, 0.7) !important;
  border-right: 1px solid rgba(69, 162, 255, 0.7) !important;
  border-left: 1px solid rgba(69, 162, 255, 0.7) !important;
}
.btm span {
  margin: 0 5px;
  color: #ccc;
  font-size: 15px;
}
.btm span:hover {
  cursor: pointer;
  color: rgba(69, 162, 255, 1) !important;
}

.row {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid rgba(69, 162, 255, 0.7) !important;
  border-left: 1px solid rgba(69, 162, 255, 0.7) !important;
}
.col {
  box-sizing: border-box;
  overflow: hidden;
  padding: 1px;
  border-right: 1px solid rgba(69, 162, 255, 0.7) !important;
  border-bottom: 1px solid rgba(69, 162, 255, 0.7) !important;
}
.video {
  height: 100%;
  width: 100%;
  background: black;
}
.acIcon {
  color: rgba(69, 162, 255, 1) !important;
}
.ac_video {
  box-shadow: inset 0px 0px 0px 1px #ffe100;
}

video::-webkit-media-controls-play-button {
  display: none;
}
video::-webkit-media-controls-timeline {
  display: none;
}
video::-webkit-media-controls-current-time-display {
  display: none;
}
video::-webkit-media-controls-time-remaining-display {
  display: none;
}
video::-webkit-media-controls-mute-button {
  display: none;
}
video::-webkit-media-controls-toggle-closed-captions-button {
  display: none;
}
video::-webkit-media-controls-volume-slider {
  display: none;
}
video::focus {
  border: none !important;
  outline: none !important;
}
video::active {
  border: none;
  outline: none !important;
}
</style>