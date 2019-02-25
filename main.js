import Vue from 'vue'
import App from './App'
import statusBar from '@/components/statusBar.vue'

Vue.config.productionTip = false
App.mpType = 'app'
//app组件
Vue.component('statusBar',statusBar)
const app = new Vue({
	...App
})
app.$mount()
