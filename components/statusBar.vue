<template>
	<view class="status-bar" :style="{background:backgroundColor}">
		
	</view>
</template>

<script>
	export default {
		props:{
			backgroundColor:{
				type:[String],
				default:"transparent"
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.status-bar{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: var(--status-bar-height);
	background: transparent;
	z-index: 9999;
}
</style>
