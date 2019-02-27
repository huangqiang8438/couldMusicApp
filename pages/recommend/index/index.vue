<template>
	<view class="rec-contanier">
		
		<top-header></top-header>
		<!--推荐切换卡 -->
		<view class="rec-tabs">
			<text class="rec-tab">推荐</text>
			<text class="rec-tab">朋友</text>
			<text class="rec-tab">电台</text>
		</view>
		<!-- 轮播图 -->
		<view class="rec-body">
			<view class="rec-swiper__inner">
				<swiper class="rec-swiper" 
						indicator-dots="true" 
						indicator-color="faf6f5" 
						indicator-active-color="rgba(210, 48, 35, 1)">
					<swiper-item class="rec-swiper__item" 
					v-for="(item,index) in bannerItem"
					:key="index"
					>
					<image class="swiper-img" :src="item.imageUrl"></image>	
					<text class="swiper-tag">{{item.typeTitle}}</text>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 每日推荐导航-->
		<view class="rec-bars">
			<view class="rec-bar">
				<view class="rec-bar__icon">
					<text class="fa fa-youtube-square"></text>
				</view>
				<text class="rec-bar__name">私人FM</text>
			</view>
			<view class="rec-bar">
				<view class="rec-bar__icon">
					<text class="fa fa-calendar-o"></text>
				</view>
				<text class="rec-bar__name">每日推荐</text>
			</view>
			<view class="rec-bar">
				<view class="rec-bar__icon">
					<text class="fa fa-music"></text>
				</view>
				<text class="rec-bar__name">歌单</text>
			</view>
			<view class="rec-bar">
				<view class="rec-bar__icon">
					<text class="fa fa-bar-chart-o"></text>
				</view>
				<text class="rec-bar__name">排行榜</text>
			</view>
		</view>
		<!-- 推荐歌单 -->
		<song-list title="推荐歌单">
		<song-item
			v-for="item in recommendItem"
			:key="item.id"
			:id="item.id"
			:imageUrl="item.picUrl"
			:name="item.name"
			></song-item>	
		</song-list>
		<!-- 最新歌曲 -->
		<song-list title="最新音乐">
		<song-item
			v-for="item in  hotItem"
			:key="item.id"
			:id="item.id"
			:imageUrl="item.coverImgUrl"
			:name="item.name"
			></song-item>	
		</song-list>
	</view>
</template>
<script>
	import topHeader from "@/components/topHeader.vue";
	import songList from '@/components/songList/index.vue'
	import songItem from '@/components/songItem/index.vue'
	import {
		banner,
		recommedPlayerData,
		newPlayerData
	} from "@/api/index.js";
let recommendData=[]
let hotData=[]
	export default {
		components: {
			topHeader,
			songList,
			songItem
		},
		data() {
			return {
				bannerItem: [],
				recommendItem:[],//推荐歌单
				hotItem:[],//最新歌单
				active:0,
			};
		},
		methods: {
			//获取轮播图
			getBanner() {
				banner().then(res => {		
					this.bannerItem=res.banners
				});
			},
			async getRecommedData(){
				if(recommendData.length>0&&hotData.length>0){
					let index=this.active===0?1:0
					this.recommendItem=recommendData[index]
					this.hotItem=hotData[index]
						this.active=index
						uni.stopPullDownRefresh()
				}else{
					let recommendPromise=recommedPlayerData()//推荐歌单
					let hotItemPromise= newPlayerData({limit:12})//热门歌单
					let {result:res1}=await recommendPromise
					let {playlists:res2}= await hotItemPromise
					recommendData=[res1.splice(0,6),res1.splice(0,6)]
					hotData=[res2.splice(0,6),res2]
					this.recommendItem=recommendData[0]
					this.hotItem=hotData[0]
					this.active=0
					uni.stopPullDownRefresh()
				}	
			}
		},
		created() {
			this.getBanner();
			uni.startPullDownRefresh()
			//#ifdef H5
				this.getRecommedData()
			//#endif
		},
		onPullDownRefresh() {
			this.getRecommedData()	
		}
		
	};
</script>

<style scoped lang="scss">
	.rec-contanier {}
	.rec-tabs {
		position: fixed;
		top:calc(40px + var(--status-bar-height));
		/*#ifdef H5*/
			top:40px;
		/*#endif*/
		width: 100%;
		height: 40px;
		background: $app-bg-color;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20upx 20%;
		z-index: 900;
	}
	.rec-body {
		padding: 0 0 70px 0;
		padding-top:calc(var(--status-bar-height) + 40px + 40px);
		/*#ifdef H5*/
		padding-top:40px+40px;
		/*#endif*/
		
	}
	.rec-swiper {
		width: 100%;
		height: 300upx;
		background:#fff;
		border-radius: 6px;
		overflow: hidden;
		position: relative;
		&__inner {
			width: 100%;
			height: 200upx;
			background: $app-bg-color;
			padding: 0 20upx;
		}
	}
	.rec-bars {
		width: 100%;
		padding: 30upx 50upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #f0f0f0;
	}
	.rec-bar {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		&__icon {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 80upx;
			height: 80upx;
			border-radius: 50%;
			color: #fff;
			background: $app-bg-color;
			box-shadow: rgba(210, 48, 35, 0.25) 2px 1px 10px;
			margin-bottom: 10upx;
		}
		&__name {
			font-size: 12px;
		}
	}
	.swiper-img{
		width: 100%;
		height: 100%;
	}
	.swiper-tag{
		position: absolute;
		bottom:-2px;
		right: 0;
		color: #fff;
		font-size: 10px;
		background: skyblue;
		display: block;
		padding: 4px;
		border-radius: 6px 0 6px 0;
	}
</style>
