<template>
	<view class="proSpecs">
		<u-popup :show="proSpecsState" @close="onClose" closeable round="10">
			<view class="proSpecsWrapper">
				<view class="top"></view>

				<view class="body">
					<scroll-view class="scrollView" scroll-y>
						<view class="proItem">
							<product-item :item="detailData" :btnState="false"></product-item>
						</view>
						<view class="selectWrapper">
							<view class="list" v-for="(item,itemIndex) in detailData.sku_select">
								<view class="title">{{ item.skuName }}</view>
								<view class="group">
									<view class="btn" v-for="child in item.children">{{ child.name }}</view>
								</view>
							</view>
						</view>

						<view class="numSelect">
							<view class="title">购买数量</view>
							<u-number-box v-model="numValue" @change="valChange"></u-number-box>
						</view>
					</scroll-view>
				</view>

				<view class="footer">
					<u-button color="#EC544F" icon="shopping-cart" iconColor="#fff" @click="clickConfirm">确认</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'

	export default {
		name: "pro-select-specs",
		data() {
			return {
				numValue: 1,
			};
		},
		computed: {
			...mapGetters(['proSpecsState', 'detailData']),
		},
		methods: {
			...mapMutations(['setProSpecsState']),

			// 点击关闭弹窗
			onClose() {
				this.setProSpecsState(false)
				this.numValue = 1
			},

			// 确认购买
			clickConfirm() {
				this.onClose()
			},

			// 修改步进器的值
			valChange() {

			},
		},
	}
</script>

<style lang="scss" scoped>
	.proSpecsWrapper {
		height: 70vh;

		.top {
			height: 80rpx;
			width: 100%;
		}

		.body {
			height: calc(100% - 220rpx);

			.scrollView {
				height: 100%;
				padding: 0 30rpx;

				.proItem {
					border-bottom: 1px solid $border-color-light;
				}

				.selectWrapper {
					border-bottom: 1px solid $border-color-light;
					padding: 10rpx 0;

					.list {
						padding: 20rpx 0;

						.title {
							font-size: 32rpx;
							font-weight: bold;
							padding-bottom: 20rpx;
						}

						.group {
							@include flex-box-set(start);
							flex-wrap: wrap;

							.btn {
								padding: 0rpx 25rpx;
								height: 60rpx;
								border: 1rpx solid $border-color-light;
								margin-right: 20rpx;
								border-radius: 10rpx;
								color: $text-font-color-2;
								margin-bottom: 20rpx;
								@include flex-box-set();
								background: $page-bg-color;

								&.active {
									border-color: $brand-theme-color;
									color: $brand-theme-color;
									background: rgba(236, 87, 79, 0.1);
								}
							}
						}
					}
				}

				.numSelect {
					display: flex;
					align-items: center;
					padding: 30rpx 0;
					border-bottom: 1px solid $border-color-light;

					.title {
						font-size: 32rpx;
						font-weight: bold;
						padding-right: 30rpx;
					}
				}
			}
		}


		.footer {
			height: 140rpx;
			border-top: 1px solid $border-color-light;
			@include flex-box-set();
			padding: 0 200rpx;
		}
	}
</style>