<template>
	<view class="customHead">
		<view class="bg">
			<image class="bgImg" src="../../static/images/testlogo.jpg" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name:"custom-head-bar",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.customHead{
		height: 200rpx;
		.bg{
			width: 100%;
			height: 100%;
			overflow: hidden;
			background: #000;
			.bgImg{
				width: 100%;
				height: 100%;
				// 背景模糊
				filter: blur(30rpx);
				transform: scale(2);
			}
		}
	}
</style>