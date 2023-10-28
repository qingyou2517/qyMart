<template>
	<view class="selfAddress">
		<view class="headTop">
			<view class="title">地址簿</view>
			<navigator class="addressBtn" url="/pages/address/edit">
				+ 添加地址
			</navigator>
		</view>

		<view class="list">
			<view class="item" v-for="item in addressList" :key="item._id" @longpress="goUpdate(item._id)">
				<view class="head">
					<view class="user">{{item.username}} - {{item.mobile}}</view>
					<view class="select">
						<u-button v-if="item.selected" color="#EC544F" plain size="mini" text="默认地址"></u-button>
						<u-button color="#666" v-else plain size="mini" text="设为默认"
							@click="clickDefault(item._id)"></u-button>
					</view>
				</view>
				<view class="more">
					{{item.area_name}}{{item.address}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const listCloudObj = uniCloud.importObject('qy-mall-address', {
		customUI: true
	})

	export default {
		data() {
			return {
				addressList: []
			};
		},
		onShow() { // onLoad 只执行一次，onShow 从任何页面进入都会刷新加载一次，会有点浪费性能
			this.getAddressList()
		},
		methods: {
			async getAddressList() {
				let res = await listCloudObj.getList()
				this.addressList = res.data
			},

			// 设为默认地址
			async clickDefault(_id) {
				await listCloudObj.updateDefault(_id)
				this.getAddressList()
			},

			// 长按跳转编辑地址信息
			goUpdate(_id) {
				uni.navigateTo({
					url: "/pages/address/edit?id=" + _id
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: $page-bg-color;
	}

	.selfAddress {
		padding: 30rpx;

		.headTop {
			@include flex-box();
			font-size: 30rpx;
			font-weight: bold;

			.addressBtn {
				border: 1px solid #000;
				border-radius: 50rpx;
				padding: 6rpx 15rpx;
			}
		}

		.list {
			padding-top: 30rpx;

			.item {
				background: #fff;
				padding: 40rpx 20rpx;
				margin-bottom: 30rpx;
				border-radius: 15rpx;

				.head {
					@include flex-box();
					font-weight: bold;
				}

				.more {
					font-size: 28rpx;
					color: $text-font-color-3;
					padding-top: 10rpx;
				}
			}
		}
	}
</style>