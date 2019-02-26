<template>
	<view>
		<!-- 固定头 -->
		<view class="play-bar" :style="{backgroundColor:headerBgColor}">
			<view class="fa fa-arrow-left" @click="back"></view>
			<view class="play-bar__title">
				<view class="play-bar__title--name">{{title}}</view>
			</view>
			<view class="fa fa-search"></view>
			<view class="fa fa-ellipsis-v"></view>
		</view>
		<!-- 歌单简介 -->
		<view class="transition" :style="{backgroundColor:playBgColor}">
			<view class="play-body">
				<view class="play-body__cover">
					<!-- #ifdef APP-PLUS -->
					<canvas class="play-cover__img" canvas-id="cover"></canvas>
					<!-- #endif -->
					<!-- #ifdef H5-->
					<image class="play-cover__img" :src="playData.coverImgUrl"></image>
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
					<view class="toolbar__title">{{palyInfo.commentCount}}</view>
				</view>
				<view class="play-toolbar__item">
					<view class="fa fa-share-alt"></view>
					<view class="toolbar__title">{{palyInfo.shareCount}}</view>
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
		<song-menu :songItems="songItems" :palyInfo="palyInfo"></song-menu>
		<toast ref="toast"></toast>
	</view>
</template>

<script>
	import songMenu from '@/components/songMenu.vue'
	import getImageColor from "@/utils/bgColor.js"
	import {
		mapState
	} from 'vuex'
	import {
		playerDetail,
		songDetails
	} from '@/api/index.js'
	export default {
		components: {
			songMenu
		},
		data() {
			return {
				load: false,
				headerBgColor: 'rgba(0,0,0,0)',
				rgbString: null,
				title: '歌单',
				playData: {
					creator: {},
					subscribedCount: 0,
					shareCount: 0,
					commentCount: 0
				},
				songItems: [],
			};
		},
		computed: {
			palyInfo() {
				let {
					subscribedCount,
					shareCount,
					commentCount
				} = this.playData
				return {
					subscribedCount: this.formatString(subscribedCount),
					shareCount: this.formatString(shareCount),
					commentCount: this.formatString(commentCount),
				}
			},
			...mapState([
				'playBgColor'
			])
		},
		onLoad(opt) {
			this.getPlayDetail(opt.id)
		},
		onPageScroll(e) {
			if (!this.rgbString) {
				let str = this.playBgColor.replace('rgb(', '')
				this.rgbString = str.replace(')', '')
			}
			let top = 0
			//#ifdef H5
			top = 10
			//#endif
			//#ifdef APP-PLUS
			top = plus.navigator.getStatusbarHeight() * plus.screen.scale
			//#endif
			if (e.scrollTop >= top) {
				this.$nextTick(()=>{
					this.title = this.playData.name
				this.headerBgColor = `rgba(${this.rgbString},1)`
			})
			
			
			} else {
				this.$nextTick(()=>{
					this.title = "歌单"
					this.headerBgColor = `rgba(${this.rgbString},0)`
				})
				
			}
		},
		methods: {
			formatString(num) {
				if (num >= 10000) {
					let str = num / 10000
					return str + '万'
				} else {
					return num
				}
			},
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			async getPlayDetail(id) { //获取歌单详情
				try {
					let {
						playlist,
						privileges
					} = await playerDetail({
						id: id
					})
					const {
						tracks
					} = playlist
					this.playData = playlist
					this.songItems = tracks
					this.load = true
					//根据图片修改主题色
					getImageColor(playlist.coverImgUrl, 'cover', {
						width: 120,
						height: 120
					}).then(color => {
						this.$store.dispatch('setPlayColor', color[color.length - 5].color)
					})

				} catch (e) {
					this.$toast(e)
				}
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.play-bar {
		position: fixed;
		width: 100%;
		top: 0 ;
		color: #fff;
		display: flex;
		align-items: center;
		z-index: 9999;
		/*#ifdef APP-PLUS*/
		padding-top: var(--status-bar-height);
		height:calc(var(--status-bar-height) + 60px);
		/*#endif*/
		/*#ifdef H5*/
		padding-top: 0;
		height:60px;
		/*#endif*/
		&__title {
			flex: 1;
			&--name {
				font-size: 18px;
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
		padding-top: calc(var(--status-bar-height) + 60px + 10px);
		/*#ifdef H5*/
		padding-top: calc(60px + 10px);
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
			height: 120px;
			padding-left: 15px;
			overflow: hidden;
		}
	}

	.play-cover__img {
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

		.fa {
			margin-left: 5px;
			margin-bottom: 3px;
		}
	}

	.play-toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10% 30px 10%;
		color: #fff;

		&__item {
			display: flex;
			align-items: center;
			flex-direction: column;
			padding: 5px 10px;

			.fa {
				display: block;
				font-size: 20px;
				margin-bottom: 10px;
			}
		}
	}

	.toolbar__title {
		font-size: 12px;
	}
</style>
