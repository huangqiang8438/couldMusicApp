<template>
	<view>
		<statusBar></statusBar>
		<!-- 固定头 -->
		<view class="play-bar">
			<view class="fa fa-arrow-left"></view>
			<view class="play-bar__title">
				<view class="play-bar__title--name">歌单</view>
				<view class="play-bar__title--desc">编辑推荐:奥斯卡获奖提名</view>
			</view>
			<view class="fa fa-search"></view>
			<view class="fa fa-ellipsis-v"></view>
		</view>
			<!-- 歌单简介 -->
			<view class="play-body" :style="{background:bgColor}">
				<view class="play-body__cover">
					<canvas class="play-cover__img" canvas-id="cover"></canvas>
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
	</view>
</template>

<script>
	import analyze from 'rgbaster'
	import {
		playerDetail,
		songDetails
	} from '@/api/index.js'
	export default {
		data() {
			return {
				id: 2679159158,
				playData: {},
				songs: [],
				bgColor: ''
			};
		},
		computed: {
			
		},
		onLoad(opt) {
			this.getPlayDetail(this.id)
		},
		methods: {
			changeBackGround(url) {
				return new Promise(resolve => {
					let context = uni.createCanvasContext('cover', this)
					context.drawImage(url, 0, 0, 100, 100)
					let self = this
					context.draw(false, () => {
						uni.canvasGetImageData({
							canvasId: 'cover',
							x: 0,
							y: 0,
							width: 100,
							height: 100,
							success: (res) => {
								let color=this.getCounts(res.data)		
												console.log(color.length)
								resolve(color)
							}
						})
					})
				})
			},
			getCounts(data, ignore) {
				var countMap = {};
				for (var i = 0; i < data.length; i += 4) {
					var alpha = data[i + 3];
					if (alpha === 0) {
						continue;
					}
					var rgbComponents = Array.from(data.subarray(i, i + 3));
					if (rgbComponents.indexOf(undefined) !== -1) {
						continue;
					}
					var color = alpha && alpha !== 255 ? ("rgba(" + (rgbComponents.concat([alpha]).join(',')) + ")") : ("rgb(" + (
						rgbComponents.join(',')) + ")");
					if (countMap[color]) {
						countMap[color].count++;
					} else {
						countMap[color] = {
							color: color,
							count: 1
						};
					}
				}
				var counts = Object.values(countMap);
				return counts.sort(function(a, b) {
					return b.count - a.count;
				});
			},
			async getPlayDetail(id) {
				try {
					let {
						playlist,
						privileges
					} = await playerDetail({
						id: id
					})
					this.playData = playlist
					this.changeBackGround(playlist.coverImgUrl).then(color=>{
						this.bgColor= `linear-gradient(to bottom right, ${color[3665].color} , ${color[0].color})`
					})
				} catch (e) {
					console.log(e)
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
		background: $app-bg-color;
		color: #fff;
		display: flex;
		align-items: center;
		padding: 0px 15px 20px 15px;
		padding-top:calc(var(--status-bar-height) + 60px + 20px);
		&__cover {
			width: 240upx;
			height: 240upx;
			border-radius: 4px;
			overflow: hidden;
		}

		&__desc {
			flex: 1;
			height: 240upx;
			padding-left: 30upx;
			overflow: hidden;
		}
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
	}
</style>
