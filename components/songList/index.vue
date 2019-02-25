<template>
	<view class="song-list">
		<view class="song-list__title">{{title}}
		<span class="fa fa-angle-right"></span>
		</view>
		<view class="song-list__warp">
			<slot></slot>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:'songList',
		props:{
			title:{
				type:[String],
				default:'默认歌单'
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
 .song-list{
	padding:0 2%;
	&__title{
		font-size: 16px;
		font-weight: bold;
		margin: 10px 5px 5px 0;
		.fa{
			padding-left:5px;
			font-size: 20px;
			color: $app-bg-gary;
		}
	}
	&__warp{
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;	
	}
 }
 
</style>
