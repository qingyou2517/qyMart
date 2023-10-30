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
			<car-layout type="pay" :ptnState="ptnState" @confirmPay="onConfirmPay"></car-layout>
		</view>

		<uni-pay ref="uniPay" return-url="/pages/order/order" @success="paySuccess" @cancel="payCancel"
			@create="payCreate"></uni-pay>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'

	const addressCloudObj = uniCloud.importObject('qy-mall-address', {
		customUI: true
	})
	const orderCloudObj = uniCloud.importObject('qy-mall-order', {
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

			ptnState() {
				let bool = Object.keys(this.deliveryInfo).every(key => {
					return this.deliveryInfo[key] !== ""
				})
				return this.carsList.length > 0 && this.totalPrice > 0 && bool
			}
		},
		methods: {
			// 读取默认收货地址
			async getDefaultAddress() {
				let res = await addressCloudObj.getDefault()
				if (res.data.length) {
					this.deliveryInfo = res.data[0]
				}
			},

			// 点击了支付按钮
			async onConfirmPay() {
				let obj = {		// 前端需要上传的支付信息
					deliveryInfo: this.deliveryInfo,
					carsList: this.carsList,
					createTime: Date.now(),
					payType: this.payDefValue,
					status: 0,					// 支付状态，默认0表示未支付
					total_fee: this.totalPrice,
					done: false					// 默认未处理
				}
				// 拿到后台生成的订单号，同时上传支付信息
				let order_no = await orderCloudObj.createOrder(obj)
				console.log('order_no: ',order_no)
				let out_trade_no = order_no + '_' + String(Math.random()).substring(3, 9)
				
				// 前端调用支付功能
				this.$refs.uniPay.createOrder({
					provider: this.payDefValue, // 支付方式
					total_fee: this.totalPrice, // 支付金额，单位分 100 = 1元
					type: "goods", // 支付回调类型
					order_no, // 业务系统订单号
					out_trade_no, // 插件支付单号
					description: "商品购买支付", // 支付描述
				});
			},

			//选择支付类型
			clickPayBtn(value) {
				this.payDefValue = value
			},

			// 支付成功
			paySuccess(e) {
				console.log("支付成功: ", e)
			},

			// 取消支付
			payCancel(e) {
				console.log("取消支付: ", e)
			},

			// 创建支付订单(此时用户还未支付)
			payCreate(e) {
				console.log("创建支付订单: ", e)
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