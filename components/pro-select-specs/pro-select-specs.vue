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
									<view class="btn" :class="skuArr.includes(child.name)?'active':''"
										@click="clickSelect(itemIndex,childIndex)"
										v-for="(child,childIndex) in item.children">{{ child.name }}</view>
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
					<u-button color="#EC544F" icon="shopping-cart" iconColor="#fff" @click="clickConfirm"
						:disabled="confirmState">确认</u-button>
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
				userSelect: [],
			};
		},
		computed: {
			...mapGetters(['proSpecsState', 'detailData']),

			// 从 userSelect 里取出二级属性的 name，再维护成一个数组，用于动态绑定class判断
			skuArr() {
				return this.userSelect.map(item => item.name)
			},

			// 确认按钮可否点击
			confirmState() {
				// detailData 初始情况下是{}，而在点击"选规格"按钮之后才会写入 vuex
				if (this.detailData?.sku_select?.length === this.skuArr.length) {
					return false
				} else {
					return true
				}
			},
		},
		methods: {
			...mapMutations(['setProSpecsState']),
			
			// 规格按钮的点击效果
			clickSelect(itemIndex, childIndex) {
			  let obj = {
			    // 一级属性的 id
			    id: this.detailData.sku_select[itemIndex]._id,
			    // 二级属性的 name
			    name: this.detailData.sku_select[itemIndex].children[childIndex].name
			  }
			  // 判断该一级属性下：是否已经点击选中了二级属性
			  let index = this.userSelect.findIndex(item => {
			    return item.id === obj.id
			  })
			  if (index < 0) {
			    this.userSelect.push(obj)
			  } else {
			    // 若已选，则替换之前选择的二级属性（一个一级属性下，同时只允许选择一个二级属性，且至少选择一个二级属性）
			    this.userSelect.splice(index, 1, obj)
			  }
			},

			// 点击关闭弹窗
			onClose() {
				this.setProSpecsState(false)
				this.numValue = 1
				this.userSelect = []
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