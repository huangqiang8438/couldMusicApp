<template>
	<view class="play-list">
		<navigator :url="url">
		<view class="play-list__warp">
			<image :src="imageUrl" mode="aspectFit" class="play-list__cover" lazy-load="true" ></image>
			
		</view>
		<view class="play-list__name">{{name}}</view>
		</navigator>
	</view>
</template>
<script>
	import lazyImage from '../lazyImage/index.vue'
	export default{
		name:'songItem',
		components:{
			lazyImage
		},
		props:{
			imageUrl:{
				type:[String],
				default:''
			},
			name:{
				type:[String],
				default:''
			},
			id:{
				type:[Number],
				default:0
			}
		},
		computed:{
			url(){
				return`/pages/playList/playList?id=${this.id}`
			}
		},
		data(){
			return {
				load:false
			}
		},
		methods:{
			
		}

	}
</script>

<style scoped lang="scss">
	
	.play-list{
		width: 32.5%;
		&__warp{
			border-radius: 3px;
			overflow: hidden;
			width: 100%;
			padding-bottom:100%;
			height:0px;
			background:#faf5f6;		
			position:relative;
		}
		&__cover{
			position:absolute;
			width: 100%;
			height: 100%;
			top:0;
			left: 0;
		}
		&__name{
			width: 100%;
			height:70upx;
			font-size: 12px;
			overflow:hidden;
			margin-bottom:36upx;
		}
	}
	
</style>
