<template>
	<view class="pro-item" @click="showDetail">
		<view class="pic">
			<image class="img" :src="item.thumb[0].url" mode="aspectFill"></image>
		</view>
		<view class="text">
			<view class="title">{{item.name}}</view>
			<view class="price">
				<view class="big">{{priceFormat(item.price)}}</view>
				<view class="small" v-if="item.before_price">{{priceFormat(item.before_price)}}</view>
			</view>
			<view class="discount" v-if="item.before_price && discount(item.price,item.before_price)">
				{{discount(item.price,item.before_price)}}折
			</view>
			<view class="numbox" v-if="btnState">
				<view class="skuSelect" v-if="item.sku_select.length" @click.stop="selectSpecs">选规格</view>
				<view class="uNum" v-else>
					<pro-num-box :item="item"></pro-num-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		priceFormat,
		discount,
	} from "@/utils/tools.js"

	import {
		mapGetters,
		mapMutations
	} from 'vuex'

	export default {
		name: "product-item",
		data() {
			return {

			};
		},
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			},
			btnState: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			...mapMutations(['setDetailState', 'setDetailData', 'setProSpecsState']),

			priceFormat,
			discount,

			// 展开商品详情
			showDetail() {
				if (!this.btnState) return;
				this.setDetailState(true)
				this.setDetailData(this.item) // item 是 props
			},

			// 点击选中规格，展开规格详情
			selectSpecs() {
				this.setProSpecsState(true)
				this.setDetailData(this.item) // item 是 props
			},
		}
	}
</script>

<style lang="scss" scoped>
	.pro-item {
		width: 100%;
		padding: 25rpx 0;
		display: flex;

		.pic {
			width: 180rpx;
			height: 180rpx;
			border-radius: 20rpx;
			overflow: hidden;

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.text {
			flex: 1;
			padding-left: 20rpx;
			position: relative;

			.title {
				font-size: 34rpx;
				font-weight: bold;
				@include ellipsis();
			}

			.price {
				@include flex-box-set(start, end);
				font-weight: bold;
				padding: 20rpx 0;

				.big {
					font-size: 34rpx;
					color: $brand-theme-color;
				}

				.small {
					font-size: 26rpx;
					opacity: 0.4;
					text-decoration: line-through;
					padding-left: 10rpx;
				}
			}

			.discount {
				font-size: 22rpx;
				color: $brand-theme-color;
				padding: 3rpx 8rpx;
				border: 1rpx solid $brand-theme-color;
				display: inline-block;
				border-radius: 6rpx;
			}

			.numbox {
				position: absolute;
				right: 0;
				bottom: 0;

				.skuSelect {
					height: 40rpx;
					padding: 0 10rpx;
					background: $brand-theme-color;
					font-size: 28rpx;
					color: #fff;
				}
			}
		}

	}
</style>