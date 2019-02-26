<template>
	<view class="song-warp">
		<view v-if="loadStatus">
			<view class="song-warp__header">
				<view class="play-all app-border--bottom">
					<text class="fa fa-play-circle-o"></text>
					播放全部
					<text class="play-count">(共{{songItems.length}}首)</text>
				</view>
				<view class="play-collect app-border--bottom">
					+ 收藏 ({{palyInfo.subscribedCount}})
				</view>
			</view>
			<!-- 歌曲列表 -->
			<view class="song-items">
				<view class="song-item" v-for="(item,index) in songItems" :key="item.id">
					<view class="song-item__index">
						{{index+1}}
					</view>
					<view class="song-item__info app-border--bottom">
						<view class="song-item__inner">
							<text class="song-name">{{item.name}}
							<text class="song-name__sub" v-if="item.alia.length>0"> ({{item.alia[0]}})</text>
							</text>
							<text class="song-author">
							 {{articles[index]}}-{{item.al.name}}</text>
						</view>
						<view class="fa fa-youtube-play"></view>
						<view class="fa fa-ellipsis-v"></view>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="app-loading">
			努力加载中...
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			songItems: {
				type: [Array],
				default: function() {
					return []
				}
			},
			palyInfo:{
				type: [Object],
				default: function() {
					return {
						subscribedCount:0,
						shareCount:0,
						commentCount:0
					}
				}
			}
		},
	
		watch: {
			songItems(newValue, oldValue) {//监听传入的歌单
				if(newValue.length>0){
					this.loadStatus=true
				}
			}
		},
		data() {
			return {
				loadStatus: false
			}
		},
		computed:{
			articles(){
				if(this.songItems.length>0){
				 let articles=[]
				 let songItems=this.songItems		
					songItems.forEach(v=>{
						let arts=v.ar
					let str=arts.map(data=>data.name).join('/')
					 articles.push(str)
					})
					return articles
					
				}else{
					return []
				}
			}
		},
		methods:{
			getArticleNames(nameArrays){//h5可以这么处理
				let nameStr=nameArrays.map(v=>v.name).join('/')
				return nameStr
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	

	.song-warp {
		width: 100%;
		background: #fff;
		border-radius: 12px 12px 0 0;
		position: relative;
		top: -20px;
		padding-bottom: 40px;

		&__header {
			display: flex;
			align-items: center;
			height: 90upx;
			box-sizing: border-box;
		}
	}

	.play-all {
		display: flex;
		align-items: center;
		flex: 1;
		height: 100%;
		padding: 0 15px;
		border-radius: 12px 0px 0 0;
		color: #000;

		&:active {
			background: rgba(0, 0, 0, .1)
		}

		.fa {
			font-size: 24px;
			margin-right: 15px;
			color: #4d4d4d;
		}

		.play-count {
			margin-left: 1px;
			font-size: 12px;
			color: #999;
		}
	}

	.play-collect {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		min-width: 35%;
		height: 100%;
		font-size: 14px;
		background: $app-bg-color;
		color: #fff;
		border-radius: 0 12px 0 0;
		position: relative;

		&::after {
			border-color: $app-bg-color;
		}

	}

	.song-item {
		align-items: center;
		height: 100upx;
		overflow: hidden;
		&__index {
			float: left;
			width: 90upx;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #999;
		}

		&__info {
			margin-left: 90upx;
			flex: 1;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.fa {
				display: flex;
				align-items: center;
				justify-content: center;
				color: #999;
				height: 100%;
				width: 30px;

				&:active {
					background: rgba(0, 0, 0, .1)
				}
			}
		}

		&__inner {
			height: 100%;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			overflow: hidden;
		}
	}

	.song-name {
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		font-size: 14px;
		color: #333;
		margin-bottom: 5px;
		&__sub{
			color: #999;
		}
	}
	.song-author {
		width: 100%;
		overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		font-size: 10px;
		color: #999;
	}
</style>
