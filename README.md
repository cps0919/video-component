### 依赖包
@easydarwin/easywasmplayer
、、、
vue2.x 或 vue3.x


###  组件

<direction /> :控制方向盘组件
<more-video :src="'ws://10.0.60.168:80/rtp/000000CE.flv'" equipData="''" :model="1"> </more-video> //多屏视频组件

###  direction
//事件
direction(e:number) :点击方向返回事件(e:从正上方顺时针1、2.....8)
###  more-video
//属性
src：每次点击播放传入的视频地址 (required:true)
、、、
equipData：每次点击播放传入的给摄像机信息
、、、
model：1,一宫格 4,四宫格 9,九宫格 16,十六宫格
、、、
//事件
videoClick(e:any) ：选中视频框返回的摄像机信息(e)