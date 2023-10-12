<template>
	<view class="delivery">
		<view class="headNav">外送</view>

		<view class="body">
			<view class="box" @click="goAddress">
				<view class="left">收货地址</view>
				<view class="center">
					<view v-if="true">
						<view class="detail">{{deliveryInfo.address}}</view>
						<view class="userinfo">{{deliveryInfo.username}} - {{deliveryInfo.mobile}}</view>
					</view>
					<view v-else>添加收货地址</view>
				</view>
				<view class="right">
					<u-icon name="arrow-right" size="18" color="#999"></u-icon>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: "delivery-layout",
		data() {
			return {
				deliveryInfo: {
					address: "江西省吉安市吉安县永阳镇xx村xx号",
					username: "小帅",
					mobile: 13105556888,
				}
			};
		},
		methods:{
			goAddress(){
				uni.navigateTo({
					url:"/pages/address/list"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.delivery {
		.headNav {
			width: 100%;
			height: 78rpx;
			background: #fff;
			@include flex-box-set();
			color: $brand-theme-color;
			border-radius: 15rpx 15rpx 0 0;
		}

		.body {
			background: #fff;
			padding: 25rpx;

			.box {
				padding: 40rpx 20rpx;
				background: $page-bg-color;
				border-radius: 10rpx;
				@include flex-box-set();
				font-size: 30rpx;

				.center {
					flex: 1;
					padding: 0 30rpx;
					font-size: 30rpx;

					.userinfo {
						padding-top: 10rpx;
					}
				}
			}
		}
	}
</style>