const playList = {
	namespaced: true,
	state: {
		playBgColor:'rgb(210,48,35)',//歌单背景色
		playData:{},//通过歌单id 存储访问过的数据
	},
	mutations: {
		SET_PLAY_COLOR(state,data){//修改歌单背景色
		     let{color,id}=data
			state.playBgColor=color
			return state.playBgColor
		},
		SET_PLAY_DATA(state,data){//写入缓存数据,通过id作键
		  const {id}=data
		  state.playData[id]=data
		  return true
		},
		SET_CACHE_DATA_COLRO(state,data){
			let {id,color}=data
			 state.playData[id].color=color
		}
	},
	actions: {
		setPlayColor:{
			root:true,
			async handler({commit,state},data){
				 commit('SET_CACHE_DATA_COLRO',data)//把获取到的颜色写进缓存数据里
				return await commit('SET_PLAY_COLOR',data)
			}
		},
		setPlayData:{
			root:true,
			async handler({commit,state},data){
				let cacheData=state.playData					
				return await commit('SET_PLAY_DATA',data)
			}
		},
		getPlayData:{
			root:true,
			async handler({commit,state},id){
				return await Promise.resolve(state.playData[id])
				
			}
		}
	}
}

export default playList
