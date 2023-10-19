<template>
	<view>
		<view class="customHead" :style="{height:totalHeight + 'px'}" v-if="brandData.name">
			<view class="bg">
				<image class="bgImg" src="../../static/images/testlogo.jpg" mode="aspectFill"></image>
			</view>

			<view class="container">
				<view class="statusBar" :style="{height: statusBarHeight + 'px'}"></view>
				<view class="service" :style="{height: titleBarHeight + 'px'}" v-if="!foldState">
					<view class="kefu">
						<u-icon name="server-fill" size="22" color="#fff"></u-icon>
					</view>
					<navigator class="manage" url="/pages_manage/index/index">
						<u-icon name="bag-fill" size="22" color="#fff"></u-icon>
						后台管理
					</navigator>
				</view>
				<view class="body" :class="foldState?'fold':''" :style="{height:bodyBarHeight + 'px'}">
					<view class="brand" @click="clickBrand">
						<view class="pic">
							<image class="img" :src="brandData.thumb[0].url" mode="aspectFill	"></image>
						</view>
						<view class="text">
							<view class="title">
								<text class="font">{{brandData.name}}</text>
								<u-icon class="icon" name="more-circle" size="22" color="#fff"></u-icon>
							</view>
							<view class="des">{{brandData.about}}</view>
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

		<view v-if="brandData.name">
			<uni-popup ref="brandPopup" type="bottom">
				<view class="brandWrapper">
					<view class="close" @click="closeBrandPop">
						<u-icon name="arrow-down" color="#666"></u-icon>
					</view>

					<view class="brand">
						<view class="pic">
							<image class="img" :src="brandData.thumb[0].url" mode="aspectFill"></image>
						</view>
						<view class="title">{{brandData.name}}</view>
						<view class="des">{{brandData.about}}</view>
					</view>

					<view class="cell">
						<u-cell-group>
							<u-cell icon="phone" :title="brandData.mobile" isLink
								@click="clickMobile(brandData.mobile)"></u-cell>
							<u-cell icon="map" :title="brandData.address" isLink @click="clickMap(brandData.address)">
							</u-cell>
						</u-cell-group>
					</view>

				</view>

				<!-- 安全区域 -->
				<view class="safe-area-bottom"></view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex'

	const brandCloudObj = uniCloud.importObject('qy-mall-brand')
	export default {
		name: "custom-head-bar",
		data() {
			return {

			};
		},
		props: {

		},
		computed: {
			...mapGetters(['statusBarHeight', 'titleBarHeight', 'totalHeight', 'bodyBarHeight', 'foldState', 'brandData']),
		},
		created() {
			this.getBrandData()
		},
		methods: {
			// ...mapMutations(['setBrand'])
			...mapActions(['getBrandData']),

			// 点击头部 brand 区域，触发弹出层展示品牌信息
			clickBrand() {
				this.$refs.brandPopup.open()
			},

			// 关闭弹出层
			closeBrandPop() {
				this.$refs.brandPopup.close()
			},

			// 点击弹出层里的地图
			clickMap(address) {
				uni.request({
					url: "https://restapi.amap.com/v3/geocode/geo",
					data: {
						key: "01534dc3856ee74996fd84d4fe15ed57",
						address,
					},
					success: res => {
						// console.log(res)
						let location = res.data.geocodes[0].location // 字符串：经度,纬度
						let arr = location.split(',').map(item => Number(item))
						uni.openLocation({
							latitude: arr[1], // 纬度：数字
							longitude: arr[0], // 经度：数字
						})
					}
				})
			},

			// 点击弹出层里的手机号 
			clickMobile(mobile) {
				uni.makePhoneCall({
					phoneNumber: mobile
				});
			},
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
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
				transition: 0.3s;

				.brand {
					width: 580rpx;
					@include flex-box-set(start);

					.pic {
						width: 110rpx;
						height: 110rpx;
						border-radius: 50%;
						overflow: hidden;
						transition: 0.3s;

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

				&.fold {
					padding: 0 30rpx;

					.brand {
						.pic {
							width: 60rpx;
							height: 60rpx;
						}

						.text {
							padding-left: 15rpx;

							.title {
								font-size: 28rpx;

								.icon {
									transform: scale(0.9);
								}
							}

							.des {
								display: none;
							}
						}

					}

					.code {
						display: none;
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

	.brandWrapper {
		padding: 30rpx;
		border-radius: 20rpx 20rpx 0 0;
		background: #fff;
		@include flex-box();
		flex-direction: column;

		.close {
			background: $page-bg-color;
			padding: 5rpx 20rpx;
			border-radius: 30rpx;
		}

		.brand {
			@include flex-box();
			flex-direction: column;
			padding: 30rpx 0;

			.pic {
				width: 100rpx;
				height: 100rpx;
				border: 1px solid $border-color-light;
				border-radius: 50%;
				overflow: hidden;

				.img {
					width: 100%;
					height: 100%;
				}
			}

			.title {
				font-size: 34rpx;
				color: $text-font-color-1;
				padding: 10rpx 0;
			}

			.des {
				font-size: 28rpx;
				color: $text-font-color-2;
			}

		}

		.cell {
			width: 100%;
			padding: 30rpx 0 100rpx;
		}
	}
</style>