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
	position: fixed;
	top: 0;
	z-index: 9999;
	width: 100%;
	height: 40px;
	background: $app-bg-color;
	padding: 0  20px 20px 20px;
	/*#ifdef APP-PLUS*/
	padding-top:calc(var(--status-bar-height) + 20px);
	/*#endif*/
	/*#ifdef H5*/
	padding-top:20px;
	/*#endif*/
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #fff;
}
.top-tab{
	display: flex;
	align-items: center;
	justify-content: center;
	.fa{
		font-size: 24px;
	}
	&__nav{
		width: 40px;
		height: 40px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba($color: #fff, $alpha: 0.7);
		margin: 0 10px;
		&:active{
			background: rgba($color: #000000, $alpha: 0.25);
		}
	}
}
</style>
