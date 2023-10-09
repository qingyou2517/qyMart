<template>
	<view class="customHead" :style="{height:totalHeight + 'px'}">
		<view class="bg">
			<image class="bgImg" src="../../static/images/testlogo.jpg" mode="aspectFill"></image>
		</view>

		<view class="container">
			<view class="statusBar" :style="{height: statusBarHeight + 'px'}"></view>
			<view class="service" :style="{height: titleBarHeight + 'px'}">
				<view class="kefu">
					<u-icon name="server-fill" size="22" color="#fff"></u-icon>
				</view>
				<navigator class="manage">
					<u-icon name="bag-fill" size="22" color="#fff"></u-icon>
					后台管理
				</navigator>
			</view>
			<view class="body">
				<view class="brand">
					<view class="pic">
						<image class="img" src="../../static/images/pinkpic.jpg" mode="aspectFill"></image>
					</view>
					<view class="text">
						<view class="title">
							<text class="font">青游商铺</text>
							<u-icon name="more-circle" size="22" color="#fff"></u-icon>
						</view>
						<view class="des">一大堆的品牌介绍一大堆的品牌介绍一大堆的品牌介绍一大堆的品牌介绍一大堆的品牌介绍</view>
					</view>
				</view>
				<view class="code">
					<view class="pic">
						<image class="img" src="../../static/images/qrcode.png" mode="aspectFill"></image>
					</view>
					<text class="pay">付款</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "custom-head-bar",
		data() {
			return {
				statusBarHeight: 0,
				titleBarHeight: 0,
			};
		},
		computed: {
			totalHeight() {
				return this.statusBarHeight + this.titleBarHeight + 100 + 10
			}
		},
		mounted() {
			let systemInfo = uni.getSystemInfoSync();
			this.statusBarHeight = systemInfo.statusBarHeight || 20;

			// #ifdef MP-WEIXIN
			// 计算胶囊按钮所在父盒子的高度
			let menuBtnInfo = uni.getMenuButtonBoundingClientRect();
			this.titleBarHeight = menuBtnInfo.height + (menuBtnInfo.top - this.statusBarHeight) * 2
			// #endif

			// #ifndef MP-WEIXIN
			this.titleBarHeight = 40
			// #endif
		}
	}
</script>

<style lang="scss">
	.customHead {
		height: 400rpx;

		.bg {
			width: 100%;
			height: 100%;
			overflow: hidden;
			background: #000;

			.bgImg {
				width: 100%;
				height: 100%;
				// 背景模糊
				filter: blur(30rpx);
				transform: scale(2);
			}
		}

		.container {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.statusBar {
				// border: 1px solid green;
			}

			.service {
				// border: 1px solid blue;
				padding-left: 30rpx;
				@include flex-box-set(start);
				color: #fff;

				.manage {
					margin-left: 20rpx;
					@include flex-box-set(start);
				}
			}

			.body {
				@include flex-box();
				padding: 0 45rpx;
				height: 100px;
				// border: 1px solid yellow;

				.brand {
					width: 580rpx;
					@include flex-box-set(start);

					.pic {
						width: 110rpx;
						height: 110rpx;
						border-radius: 50%;
						overflow: hidden;

						.img {
							width: 100%;
							height: 100%;
						}
					}

					.text {
						flex: 1;
						padding: 0 30rpx;
						color: #fff;

						.title {
							font-size: 36rpx;
							font-weight: 800;
							display: flex;
							align-items: center;

							.font {
								margin-right: 10rpx;
							}
						}

						.des {
							font-size: 26rpx;
							width: 100%;
							opacity: 0.8;
							padding-top: 5rpx;
							@include ellipsis()
						}
					}
				}

				.code {
					width: 80rpx;
					height: 80rpx;
					border-left: 1px solid rgba(255, 255, 255, 0.6);
					@include flex-box-set(between);
					flex-direction: column;

					.pic {
						width: 40rpx;
						height: 40rpx;

						.img {
							width: 100%;
							height: 100%;
						}
					}

					.pay {
						font-size: 22rpx;
						color: #fff;
						text-align: center;
					}
				}
			}
		}
	}
</style>