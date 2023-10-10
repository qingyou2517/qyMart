<template>
	<view class="goodsLayout">
		<view class="wrapper">
			<view class="title">共3件商品</view>

			<view class="list">
				<view class="row" v-for="item in 3">
					<view class="left">
						<image src="../../static/images/pinkpic.jpg" mode="aspectFill" class="img"></image>
						<view class="name">卫龙小面筋</view>
					</view>
					<view class="center">×3</view>
					<view class="right">
						<view class="big">￥15.5</view>
						<view class="small">￥22.3</view>
					</view>
				</view>
			</view>

			<view class="total">
				<text>
					已优惠￥10.2，
				</text> 合计 <text class="big">￥45.8</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "goods-list",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.goodsList {
		.wrapper {
			background: #fff;
			padding: 30rpx;
			margin-bottom: 25rpx;
			border-radius: 15rpx;

			.title {
				font-size: 38rpx;
			}

			.list {
				.row {
					@include flex-box();
					padding: 25rpx 0;

					.left {
						@include flex-box();
						width: 400rpx;

						.img {
							width: 64rpx;
							height: 64rpx;
							border-radius: 10rpx;
						}

						.name {
							padding-left: 15rpx;
							flex: 1;
							font-size: 30rpx;
						}
					}

					.center {
						width: 100rpx;
						text-align: center;
					}

					.right {
						flex: 1;
						text-align: right;
						font-weight: bold;

						.big {
							font-size: 34rpx;
						}

						.small {
							font-size: 22rpx;
							color: $text-font-color-3;
							text-decoration: line-through;
						}
					}
				}
			}

			.total {
				padding: 30rpx 0;
				text-align: right;
				font-size: 30rpx;
				color: $text-font-color-3;

				.big {
					font-size: 36rpx;
					font-weight: bold;
					color: #000;
				}
			}
		}
	}
</style>