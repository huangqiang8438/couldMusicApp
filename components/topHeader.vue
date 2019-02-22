<template>
	<view class="top-header">
		<view class="fa fa-navicon"></view>
		<view class="top-tab">
			<view class="top-tab__nav">
				<text class="fa fa-music "></text>
			</view>
			<view class="top-tab__nav">
				<text class="fa fa-podcast"></text>
			</view>
			<view class="top-tab__nav ">
				<text class="fa fa-youtube-play"></text>
			</view>
		</view>
		<view class="fa fa-search"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.top-header{
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	height: 80upx;
	background: $app-bg-color;
	padding: 0 20upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #fff;
}
.top-tab{
	display: flex;
	align-items: center;
	justify-content: center;
	&__nav{
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba($color: #fff, $alpha: 0.7);
		margin: 0 10upx;
		&:active{
			background: rgba($color: #000000, $alpha: 0.25);
		}
	}
}
</style>
