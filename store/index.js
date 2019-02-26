import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		playBgColor:'#d23023',//歌单背景色

	},
	mutations: {
		SET_PLAY_COLOR(state,color){//修改歌单背景色
			state.playBgColor=color
			return state.playBgColor
		}

	},
	actions: {
		// lazy loading openid
		async setPlayColor({commit,state},color){
			return await commit('SET_PLAY_COLOR',color)
		}	
	}
})

export default store
