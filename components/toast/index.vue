<template>
	<view class="app-toast" v-if="status">
		{{message}}
	</view>
</template>

<script>
	export default {
		name:"toast",
		data() {
			return {
				message:'测试内容',
				status:false,
			}
		},
		methods:{
			showToast(){
				this.status=true
				setTimeout(()=>{
					this.status=false
				},1500)
			}
		}
	}
</script>

<style lang="scss">
.app-toast{
	position: fixed;
	z-index: 999999;
	bottom: 0;
    left: 50%;
	max-width: 90%;
   background: rgba(0,0,0,0.5);
   font-size: 14px;
   color: #fff;
  padding: 10px 15px; 
  border-radius: 30px;
 transform: translate3d(-50%, -50%, 0);
}
</style>
