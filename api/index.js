import fetch from './fetch.js'
//首页轮播图
export const banner= params=>{return fetch.get('/banner',params)}
//推荐歌单列表不需要登录 order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
//cat:cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
export const recommedPlayerData= params=>{return fetch.get('/top/playlist',params)}