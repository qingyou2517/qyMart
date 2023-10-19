<template>
	<view class="goodsView">
		<uni-forms ref="goodsForm" :model="goodsFormData" :rules="goodsRules" :label-width="100" label-align="right">
			<uni-forms-item label="商品图片">
				<uni-file-picker v-model="goodsFormData.thumb" fileMediatype="image" mode="grid"></uni-file-picker>
			</uni-forms-item>

			<uni-forms-item label="商品名称" required name="name">
				<uni-easyinput v-model="goodsFormData.name" placeholder="请输入商品名称" trim="both"></uni-easyinput>
			</uni-forms-item>

			<uni-forms-item label="产品分类" required name="category_id">
				<uni-data-select collection='qy-mall-categories' field="_id as value, name as text"
					v-model="goodsFormData.category_id"></uni-data-select>
			</uni-forms-item>

			<uni-forms-item label="商品价格" required name="price">
				<uni-easyinput type="number" v-model="goodsFormData.price" placeholder="请输入商品价格"
					trim="both"></uni-easyinput>
			</uni-forms-item>

			<uni-forms-item label="商品原价">
				<uni-easyinput type="number" v-model="goodsFormData.before_price" placeholder="请输入原价"
					trim="both"></uni-easyinput>
			</uni-forms-item>

			<uni-forms-item label="商品属性">
				<u-cell :title="skuTitle" class="skuTitle" isLink :border="false" @click="clickSelect"></u-cell>
				<view class="skuList">
					<view class="item" v-for="item in goodsFormData.sku_select" @click="clickSelect">
						<view class="left">{{item.skuName}}:</view>
						<view class="right">{{skuChildName(item.children)}}</view>
					</view>
				</view>
			</uni-forms-item>

			<uni-forms-item label="商品描述">
				<uni-easyinput type="textarea" placeholder="请输入详细的描述信息"
					v-model="goodsFormData.description"></uni-easyinput>
			</uni-forms-item>

			<view class="btnView">
				<button type="primary" @click="onSubmit">确认提交</button>
			</view>
		</uni-forms>

		<!-- 点击商品属性，触发底部弹出层 -->
		<uni-popup ref="attrWrapPop" type="bottom">
			<view class="attrWrapper">
				<view class="head">
					<view class="title">商品属性</view>
					<view class="addAttr" @click="clickAddAttr()">+ 添加属性</view>
				</view>

				<view class="body">
					<view class="item" v-for="(item,index) in skuArr">
						<view class="top">
							<checkbox :checked="item.checked" @click="changeCheckbox(index)"></checkbox>
							<view class="font">{{item.skuName}}</view>
						</view>
						<view class="btnGroup" v-if="item.checked">
							<view class="btn" :class="child.checked?'active':''" v-for="(child,cIdx) in item.children"
								@click="clickChlidBtn(index,cIdx)">
								{{child.name}}
							</view>
							<view class="btn" @click="clickAddAttr(index)">
								<u-icon name="plus"></u-icon>
							</view>
						</view>
					</view>
				</view>

				<view class="foot">
					<button type="primary" @click="clickConfirmSelect">确认选择</button>
				</view>
			</view>

			<!-- 苹果手机的底部安全区域 -->
			<view class="safe-area-bottom"></view>
		</uni-popup>

		<!-- 点击弹出层中的添加属性，弹出对话框 -->
		<uni-popup ref="addAttrPop">
			<uni-popup-dialog mode="input" title="新增" placeholder="请输入新增的内容"
				@confirm="dialogConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	const skuCloudObj = uniCloud.importObject('qy-mall-sku')
	const goodsCloudObj = uniCloud.importObject('qy-mall-goods', {
		customUI: true
	})
	export default {
		data() {
			return {
				goodsFormData: {
					thumb: [],
					name: "",
					category_id: null,
					price: null,
					before_price: null,
					description: "",
					sku_select: [],
				},
				addAttrType: "parent", //parent代表父，child代表子
				skuArr: [],
				goodsRules: {
					name: {
						rules: [{
							required: true,
							errorMessage: "请输入产品名称"
						}]
					},
					price: {
						rules: [{
							required: true,
							errorMessage: "请输入产品价格"
						}]
					},
					category_id: {
						rules: [{
							required: true,
							errorMessage: "请输入产品分类"
						}]
					}
				}
			};
		},
		onLoad() {

		},
		computed: {
			skuTitle() {
				if (this.goodsFormData.sku_select.length) {
					let arr = this.goodsFormData.sku_select.map(item => {
						return item.skuName
					})
					return arr.join("/")
				} else {
					return "点击添加属性"
				}
			}
		},
		methods: {
			// 返回子级属性的名称
			skuChildName(arr) {
				let newArr = arr.map(item => {
					return item.name
				})
				return newArr.join('/')
			},
			// 获取商品属性（即sku） 列表
			async getSkuData() {
				let res = await skuCloudObj.get()
				this.skuArr = res.data
			},
			// 点击提交表单
			onSubmit() {
				this.$refs.goodsForm.validate().then(res => {
					this.toDataBase()
				}).catch(err => {
					console.log(err);
				})
			},
			// 上传商品信息到数据库
			toDataBase() {
				this.goodsFormData.thumb = this.goodsFormData.thumb.map(item => {
					return {
						url: item.url,
						name: item.name,
						extname: item.extname
					}
				})
				let res = goodsCloudObj.add(this.goodsFormData)
				uni.showToast({
					title: "新增商品成功"
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 1500)
			},
			// 点击选择商品属性，触发底部弹出层
			clickSelect() {
				this.$refs.attrWrapPop.open(); // 打开弹出层
				if (this.skuArr.length) return; // 假如已有，则阻断 get
				this.getSkuData() // get 请求数据库
			},
			// 点击添加属性，触发对话框
			clickAddAttr(index = null) {
				if (index !== null) {
					this.addAttrType = "child"
					this.attrIndex = index
				} else {
					this.addAttrType = "parent"
					this.attrIndex = null
				}
				this.$refs.addAttrPop.open()
			},
			changeCheckbox(index) {
				this.skuArr[index].checked = !this.skuArr[index].checked
			},
			clickChlidBtn(index, cIdx) {
				this.skuArr[index].children[cIdx].checked = !this.skuArr[index].children[cIdx].checked
			},
			// 添加属性时的对话框的确认事件
			async dialogConfirm(value) {
				if (!value) return;

				if (this.addAttrType === "parent") {
					let obj = {
						skuName: value,
						checked: true,
						children: []
					}
					let res = await skuCloudObj.add(obj) // 往云数据库 add 成功返回值包含一个id
					obj._id = res.id
					this.skuArr.push(obj)
				} else if (this.addAttrType === "child") {
					let obj = {
						name: value,
						checked: true
					}
					let _id = this.skuArr[this.attrIndex]._id
					console.log(_id)
					let res = await skuCloudObj.updateChild(_id, obj)
					this.skuArr[this.attrIndex].children.push(obj)
				}
			},
			clickConfirmSelect() {
				let arr = this.skuArr.filter(item => {
					let state = item.children.some(child => child.checked)
					return item.checked && state // 获取已选择、且有选择子级属性 的一级属性列表
				}).map(item => {
					let children = item.children.filter(child => {
						return child.checked // 一级属性下已选择的二级属性列表(children)
					})
					return {
						...item,
						children
					}
				})
				this.goodsFormData.sku_select = arr
				this.$refs.attrWrapPop.close()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goodsView {
		padding: 30rpx;

		.skuTitle {
			@include ellipsis()
		}

		.skuList {
			.item {
				padding: 30rpx;
				background: $page-bg-color;
				margin: 15rpx 0;
				@include flex-box-set(start);
			}
		}
	}

	.attrWrapper {
		padding: 30rpx;
		background: #fff;
		border-radius: 20rpx 20rpx 0 0;

		.head {
			@include flex-box();
			font-size: 34rpx;
			margin-bottom: 30rpx;

			.title {
				font-weight: bold;
			}

			.addAttr {
				color: $brand-theme-color-aux;
			}
		}

		.body {
			.item {
				border-top: 1px solid $border-color-light;

				&:last-child {
					border-bottom: 1px solid $border-color-light;
				}

				.top {
					padding: 30rpx 0;
					@include flex-box-set(start);

					.font {
						padding-left: 10rpx;
						font-weight: bold;
					}
				}

				.btnGroup {
					padding: 10rpx 0 30rpx;
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

						&.active {
							border-color: $brand-theme-color;
							color: $brand-theme-color;
							background: rgba(236, 87, 79, 0.1);
						}
					}
				}
			}
		}
	}
</style>