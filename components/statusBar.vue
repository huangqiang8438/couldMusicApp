<template>
	<view class="status-bar">
		
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
.status-bar{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: var(--status-bar-height);
	background: $app-bg-color;
	z-index: 9999;
}
</style>
