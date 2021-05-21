### 安装
video-component  
@easydarwin/easywasmplayer  


### 引入包
import videoComponent from 'video-component'  
import "video-component/index.css"  
Vue.use(videoComponent)  


### 提供两个组件，如下：  

###  1.direction
//事件  
direction(e:number) :点击方向返回事件(e:从正上方顺时针1、2.....8)  
###  2.more-video
//属性  
src：每次点击播放传入的视频地址 (required:true)  

equipData：每次点击播放传入的给摄像机信息  

model：1,一宫格 4,四宫格 9,九宫格 16,十六宫格    

//事件   
videoClick(e:any) ：选中视频框返回的摄像机信息(e)  