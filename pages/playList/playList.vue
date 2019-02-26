<template>
	<view>
		<statusBar></statusBar>
		<!-- 固定头 -->
		<view class="play-bar">
			<view class="fa fa-arrow-left" @click="back"></view>
			<view class="play-bar__title">
				<view class="play-bar__title--name">歌单</view>
				<view class="play-bar__title--desc">编辑推荐:奥斯卡获奖提名</view>
			</view>
			<view class="fa fa-search"></view>
			<view class="fa fa-ellipsis-v"></view>
		</view>
			<!-- 歌单简介 -->
			<view class="transition" :style="{backgroundColor:playBgColor}" >
				<view class="play-body" >
					<view class="play-body__cover">
						<!-- #ifdef APP-PLUS -->
						<canvas class="play-cover__img" canvas-id="cover"></canvas>
						<!-- #endif -->
						<!-- #ifdef H5-->
						<image class="play-cover__img"  :src="playData.coverImgUrl"></image>
						<!-- #endif -->				
					</view>
					<view class="play-body__desc">
						<view class="desc__title">{{playData.name}}</view>
						<view class="desc__creator">
							<image class="desc__avatar" :src="playData.creator.avatarUrl" :lazy-load="true"></image>
							<view class="desc__nickname">
								{{playData.creator.nickname}}
								<text class="fa fa-angle-right"></text>
							</view>
						</view>
					</view>
				 </view>
				 <view class="play-toolbar">
						<view class="play-toolbar__item">
							<view class="fa fa-commenting-o"></view>
							<view class="toolbar__title">60</view>
						</view>
						<view class="play-toolbar__item">
							<view class="fa fa-share-alt"></view>
							<view class="toolbar__title">60</view>
						</view>		
						<view class="play-toolbar__item">
							<view class="fa fa-cloud-download"></view>
							<view class="toolbar__title">下载</view>
						</view>		
						<view class="play-toolbar__item">
							<view class="fa fa-check-square-o"></view>
							<view class="toolbar__title">多选</view>
						</view>		
						
				 </view>
			</view>		
			<toast ref="toast"></toast>
	</view>
</template>

<script>
	import getImageColor from "@/utils/bgColor.js"
	import { mapState } from 'vuex'
	import {
		playerDetail,
		songDetails
	} from '@/api/index.js'
	export default {
		data() {
			return {
				load:false,			
				playData: {},
				songs: [],				
			};
		},
		computed: {
			...mapState([
				'playBgColor'
			])
		},
		onLoad(opt) {
			this.getPlayDetail(opt.id)
		},
		methods: {	
			back(){
				uni.navigateBack({
					delta: 1
				});
			},
	  async getPlayDetail(id) {//获取歌单详情
				try {
					let {playlist,privileges} = await playerDetail({id: id})
					this.playData = playlist
					this.load=true
					//根据图片修改主题色
					getImageColor(playlist.coverImgUrl,'cover',{width:120,height:120}).then(color=>{					
							this.$store.dispatch('setPlayColor',color[color.length-5].color)		
					})			
				} catch (e) {
					this.$toast(e)
				}
			},
		}
	}
</script>

<style lang="scss">
	.play-bar {
		position: fixed;
		width: 100%;
		top: var(--status-bar-height);
		color: #fff;
		display: flex;
		align-items: center;
		background:transparent;
		height: 60px;
		&__title {
			flex: 1;
			&--name {
				font-size: 18px;
			}
			&--desc {
				font-size: 10px;
			}
		}
		.fa {
			width: 60px;
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 20px;
		}
	}
	.play-body {
		color: #fff;
		display: flex;
		align-items: center;
		padding: 0px 15px 10px 15px;
		padding-top:calc(var(--status-bar-height) + 60px + 10px);
		/*#ifdef H5*/
		padding-top:calc(60px + 10px);
		/*#endif*/	
		
		&__cover {
			width: 120px;
			height: 120px;
			border-radius: 4px;
			overflow: hidden;
			background: #faf5f6;
		}
		&__desc {
			flex: 1;
			height:120px;
			padding-left:15px;
			overflow: hidden;
		}
	}
	.play-cover__img{
		width: 120px;
		height: 120px;
		border-radius: 4px;
		overflow: hidden;
	}

	.desc__creator {
		margin-top: 20px;
		display: flex;
		align-items: center;
	}

	.desc__avatar {
		width: 25px;
		height: 25px;
		border-radius: 50%;
		margin-right: 8px;
	}

	.desc__title {
		font-size: 16px;
		font-weight: bold;
	}

	.desc__nickname {
		font-size: 12px;
		display: flex;
		align-items: center;
		.fa{
			margin-left: 5px;
			margin-bottom: 3px;
		}
	}
	.play-toolbar{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:0 10%;
		color: #fff;
		&__item{
			display: flex;
			align-items: center;
			flex-direction: column;
			padding: 5px 10px;
			.fa{
				font-size: 20px;
			}
		}
	}
	.toolbar__title{
		font-size: 12px;
	}
</style>
