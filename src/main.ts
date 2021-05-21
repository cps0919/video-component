import { createApp } from 'vue'
import App from './App.vue'

import videoComponent from 'video-component'
import "video-component/index.css"

const app = createApp(App)
app.use(videoComponent)
app.mount('#app')