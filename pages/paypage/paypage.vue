<template>
	<view class="paypage">
		<delivery-layout :deliveryInfo="deliveryInfo"></delivery-layout>

		<view class="goodsList">
			<goods-list :goodsList="carsList" :totalPrice="totalPrice" :prePrice="preferentialPrice"></goods-list>
		</view>

		<!-- #ifndef MP-WEIXIN -->
		<view class="paytype">
			<view class="box" :class="item.value == payDefValue ? 'active':''" v-for="item in payType"
				@click="clickPayBtn(item.value)">
				<!-- 渲染支付方式的图标 -->
				<u-icon :name="item.icon" :color="item.color" class="icon" size="26"></u-icon>
				<text class="font">{{item.name}}</text>
			</view>
		</view>
		<!-- #endif -->

		<view class="payTabbar">
			<car-layout type="pay"></car-layout>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'

	const addressCloudObj = uniCloud.importObject('qy-mall-address', {
		customUI: true
	})
	export default {
		data() {
			return {
				deliveryInfo: {},
				// #ifndef MP-WEIXIN 
				payDefValue: "alipay",
				// #endif

				// #ifdef MP-WEIXIN 
				payDefValue: "wxpay",
				// #endif

				payType: [{
					name: "支付宝",
					value: "alipay",
					color: "#1578FF",
					icon: "zhifubao",
				}, {
					name: "微信",
					value: "wxpay",
					color: "#04C15F",
					icon: "weixin-fill",
				}],
			};
		},
		onLoad() {
			this.getDefaultAddress()
			uni.$on("selectAddressEvent", (e) => {
				this.deliveryInfo = e
			})
		},
		onUnload() {
			uni.$off("selectAddressEvent")
		},
		computed: {
			...mapGetters(['carsList', 'totalPrice', 'preferentialPrice']),
		},
		methods: {
			// 读取默认收货地址
			async getDefaultAddress() {
				let res = await addressCloudObj.getDefault()
				if (res.data.length) {
					this.deliveryInfo = res.data[0]
				}
			},

			//选择支付类型
			clickPayBtn(value) {
				this.payDefValue = value
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-bg-color;
	}

	.paypage {
		padding: 30rpx;

		.goodsList {
			margin-top: 30rpx;
		}

		.paytype {
			@include flex-box();

			.box {
				width: 49%;
				height: 75rpx;
				background: #fff;
				border-radius: 10rpx;
				@include flex-box-set();
				border: 1px solid #fff;
				filter: grayscale(100%); // 默认整体灰色

				.font {
					padding-left: 10rpx;
				}
			}

			.box:first-child.active {
				border-color: #1578FF;
				color: #1578FF;
				filter: grayscale(0%); // 选中，则关闭灰色滤镜

			}

			.box:last-child.active {
				border-color: #04C15F;
				color: #04C15F;
				filter: grayscale(0%); // 选中，则关闭灰色滤镜
			}
		}

		.payTabbar {
			position: fixed;
			width: 100%;
			bottom: 0;
			left: 0;
		}
	}
</style>