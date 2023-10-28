<template>
	<view>
		<view class="carLayout">
			<view class="goods" v-if="carshow">
				<view class="head">
					<view class="text">已选商品</view>
					<view class="empty" @click="clickEmpty">清空</view>
				</view>
				<scroll-view scroll-y="true" class="body">
					<view class="sContent">
						<view class="caritem" v-for="item in carsList" :key="carKey(item)">
							<car-pro-item :item="item"></car-pro-item>
						</view>
					</view>
				</scroll-view>
			</view>

			<view class="content">
				<view class="left">
					<view class="icon" v-if="!type" hover-class="iconhover" hover-stay-time="50" @tap="clickCarIcon">
						<u-icon name="shopping-cart" size="34" color="#EC544F"></u-icon>
						<view class="num">{{buyNum}}</view>
					</view>
					<view class="price">合计<text class="text">¥{{priceFormat(totalPrice)}}</text></view>
				</view>
				<view class="right">
					<view class="btn" v-if="!type" @click="goPay">选好了</view>
					<view class="btn" v-else @click="confirmPay" :class="ptnState?'':'disable'">确认支付</view>
				</view>
			</view>

			<view class="safe-area-bottom"></view>
		</view>

		<u-overlay :show="carshow" z-index="9" @click="carshow=false" duration="100"></u-overlay>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import {
		priceFormat
	} from '@/utils/tools.js'

	export default {
		name: "car-layout",
		data() {
			return {
				carshow: false,
			};
		},
		props: {
			type: {
				type: String,
				default: ''
			},
			ptnState: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			...mapGetters(['carsList', 'totalPrice', 'buyNum']),

		},
		methods: {
			...mapMutations(['setCarsList']),

			priceFormat,

			// 为 v-for 的遍历绑定一个唯一 key
			carKey(item) {
				return item.goodsid + JSON.stringify(item.skuArr)
			},

			// 清空购物车
			clickEmpty() {
				this.setCarsList()
			},

			goPay() {
				uni.navigateTo({
					url: '/pages/paypage/paypage'
				})
			},
			clickCarIcon() {
				this.carshow = !this.carshow
			},
			confirmPay(e) {
				if (!this.ptnState) return;
				console.log("确认支付")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.carLayout {
		position: relative;
		z-index: 10;

		.goods {
			border-bottom: 1px solid $border-color-light;
			padding: 30rpx 30rpx 0;
			border-radius: 20rpx 20rpx 0 0;
			background: #fff;

			.head {
				@include flex-box();
				color: $text-font-color-3;
				padding: 25rpx 0;

				.empty {
					color: $brand-theme-color-aux;
				}
			}

			.body {
				height: 550rpx;
			}
		}

		.content {
			@include flex-box();
			padding: 0 30rpx;
			height: 140rpx;
			background: #fff;

			.left {
				@include flex-box();

				.icon {
					width: 80rpx;
					height: 80rpx;
					background: #EEEFEE;
					border-radius: 10rpx;
					@include flex-box-set();
					position: relative;
					margin-right: 30rpx;

					.num {
						width: 36rpx;
						height: 36rpx;
						background: $brand-theme-color;
						border-radius: 50%;
						color: #fff;
						position: absolute;
						right: -18rpx;
						top: -18rpx;
						font-size: 22rpx;
						@include flex-box-set();
					}
				}

				.iconhover {
					transform: scale(0.9);
				}

				.price {
					font-size: 28rpx;

					.text {
						font-size: 32rpx;
						font-weight: bold;
					}
				}
			}

			.right {
				.btn {
					width: 210rpx;
					height: 75rpx;
					background: $brand-theme-color;
					@include flex-box-set();
					color: #fff;
					border-radius: 10rpx;

					&.disable {
						opacity: 0.6;
					}
				}
			}
		}
	}
</style>