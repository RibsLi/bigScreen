import { createApp } from 'vue'
import App from './App.vue'
import * as echarts from 'echarts'
import 'amfe-flexible/index.js'
import "assets/css/index.styl"

const app = createApp(App)
app.use(echarts)
app.mount('#app')
