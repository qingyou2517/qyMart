<template>
	<view class="category">
		<button class="add" type="primary" size="mini" hover-class="buttonhover" hover-stay-time="50" @click="clickAdd">
			<view class="left">
				<u-icon name="plus" color="#576b95" size="12"></u-icon>
				<text class="text">新增分类</text>
			</view>
		</button>

		<view class="row" v-for="(item,index) in categoryList" :key="item._id">
			<view class="left">
				<view class="name">{{item.name}}</view>
			</view>
			<view class="right">
				<u-icon name="edit-pen" size="26" color="#576b95" @click="updateData(index,item.name)"></u-icon>
				<u-icon name="trash" size="26" color="#EC544F" @click="deleteDate(index)"></u-icon>
			</view>
		</view>

		<uni-popup ref="inputDialog">
			<uni-popup-dialog mode="input" :value="iptValue" placeholder="请输入分类名称" title="分类名称"
				@confirm="dialogConfirm"></uni-popup-dialog>
		</uni-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				categoryList: [{
					_id: 1,
					name: "干果"
				}, {
					_id: 2,
					name: "饮料"
				}, {
					_id: 3,
					name: "酒类"
				}],
				iptValue: "", // 输入框的默认值
				functionType: "", // 对话框的触发场景，分为 "add"、"update"
				index: -1, // 编辑类名时需要知道是 categoryList 的哪一项
			};
		},
		methods: {
			//添加分类
			clickAdd() {
				this.functionType = "add"
				this.$refs.inputDialog.open();
			},
			updateData(index, name) {
				this.functionType = "update"
				this.iptValue = name;
				this.index = index
				this.$refs.inputDialog.open()
			},
			deleteDate(index) {
				uni.showModal({
					content: "是否删除该分类?",
					success: res => {
						if (res.confirm) {
							this.categoryList.splice(index, 1)
						}
					},
					fail: err => {
						console.log(err);
					}
				})
			},
			dialogConfirm(value) {
				if (this.functionType === "add") {
					this.iptValue = ""; // 新增类名时，输入框不应该有默认值
					this.categoryList.push({
						name: value,
						_id: Date.now()
					})
				} else if (this.functionType === "update") {
					this.categoryList[this.index].name = value
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.category {
		padding: 30rpx;

		.row {
			@include flex-box();
			border-bottom: 1px solid $border-color-light;
			padding: 26rpx 0;

			.left {
				font-size: 30rpx;
				color: #576b95
			}

			.right {
				@include flex-box();

				.u-icon {
					margin-left: 30rpx;
				}
			}
		}

		.add {
			background: #fff;

			&.buttonhover {
				transform: scale(0.9);
			}

			.left {
				@include flex-box();

				.text {
					color: #576b95;
					font-size: 28rpx;
					padding-left: 12rpx;
				}
			}
		}
	}
</style>