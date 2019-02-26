
import config from '../config.js'
import Fly from 'flyio/dist/npm/wx'
var fly=new Fly;

//配置请求基地址
fly.config.baseURL = config.baseUrl

fly.interceptors.request.use((config, promise) => {
	
  //全局api拦截，需要做什么在这里处理
  return config;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(response => {
   //这里拦截响应，根据具体业务定

    return response.data
  },
  err => {
	uni.showToast({
		title:'服务加载异常'
	})
    return Promise.resolve(err)
  }
)

export default fly
