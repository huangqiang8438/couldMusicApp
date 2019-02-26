
<script>
	export default {
		onLaunch: function () {
			
		},
		onShow: function () {
			
		},
		onHide: function () {
			
		}
	}
</script>

<style lang="scss">
@import url('./static/fa.css');
.app-loading {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #999;
		font-size: 12px;
		padding-top: 30%;
		&::before {
			display: block;
			content: '';
			width: 16px;
			height: 16px;
			margin-right: 5px;
			 background: url('./static/img/loading.gif') no-repeat;
		background-size: contain;
		}
	}
</style>
