import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import * as echarts from 'echarts'
import 'amfe-flexible/index.js'
import "assets/css/index.styl"

const app = createApp(App)
app.config.globalProperties.$echarts = echarts;
app.use(router);
app.mount('#app')
