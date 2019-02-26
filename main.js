import Vue from 'vue'
import App from './App'
import store from './store'
import statusBar from '@/components/statusBar.vue'
 import toast from '@/components/toast/index.vue'
Vue.config.productionTip = false
App.mpType = 'app'
//app组件
Vue.component('statusBar',statusBar)
Vue.component('toast',toast)
Vue.prototype.$store = store
Vue.prototype.$toast=function(message){
	//不同情况下调用提示信息，跨端处理
	//#ifdef H5
	this.$refs.toast.showToast(message)
	//#endif
	//#ifdef APP-PLUS
	plus.nativeUI.toast(message)
	//#endif
}


const app = new Vue({
		store,
	...App
})
app.$mount()
