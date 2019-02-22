<template>
	<view class="rec-contanier">
		<status-bar></status-bar>
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
	</view>
</template>
<script>
	import topHeader from "../../../components/topHeader.vue";
	import statusBar from "../../../components/statusBar.vue";
	import {
		banner
	} from "../../../api/index.js";
	export default {
		components: {
			topHeader,
			statusBar
		},

		data() {
			return {
				bannerItem: []
			};
		},
		methods: {
			//获取轮播图
			getBanner() {
				banner().then(res => {		
					console.log(res.banners)
					this.bannerItem=res.banners
				});
			}
		},
		created() {
			this.getBanner();
		}
	};
</script>

<style scoped lang="scss">
	.rec-contanier {}
	
	.rec-tabs {
		width: 100%;
		height: 30px;
		background: $app-bg-color;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20upx 20%;
	}
	.rec-body {
		padding: 0 0 70px 0;
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
