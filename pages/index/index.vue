<template>
	<view class="home">
		<custom-head-bar id="customHeadBar"></custom-head-bar>
		<view class="wrapper">
			<view class="infoModel">
				<view class="left">免费配送</view>
				<navigator url="/pages/order/order" class="right">
					<u-icon name="order" color="#576b95" size="24"></u-icon>
					我的订单
				</navigator>
			</view>
			<view class="scrollLayout">
				<view class="leftScroll">
					<scroll-view :scroll-top="leftScrollValue" scroll-with-animation scroll-y class="sContent">
						<view class="navitem" :class="index==navIdx? 'active':''" v-for="(item,index) in dataList"
							@click="clickNav(index)">{{item.name}}</view>
					</scroll-view>
				</view>
				<view class="rightScroll">
					<navigator class="searchView" url="/pages/search/search">
						<u-icon name="search" size="22" color="#576b95"></u-icon>
						搜索
					</navigator>
					<scroll-view :scroll-top="rightScrollValue" scroll-with-animation scroll-y class="sContent"
						@scroll="rightScrollEnt">
						<view class="productView" v-for="item in dataList">
							<!-- 吸顶组件：内部只能有一个根元素 -->
							<u-sticky customNavHeight="0" zIndex="2">
								<view class="proTitle">{{item.name}}</view>
							</u-sticky>
							<view class="proContent">
								<view class="proitem" v-for="pro in item.proGroup">
									<product-item :item="pro"></product-item>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>

		<car-layout v-if="buyNum > 0"></car-layout>

		<pro-detail-popup></pro-detail-popup>

		<pro-select-specs></pro-select-specs>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations,
	} from 'vuex'

	const goodsCloudObj = uniCloud.importObject('qy-mall-goods', {
		customUI: true
	})

	export default {
		data() {
			return {
				navIdx: 0,
				leftScrollValue: 0,
				rightScrollValue: 0,
				leftHitArr: [],
				rightHitArr: [],
				dataList: [],
			}
		},
		async onLoad() {
			await this.getGoodsData()

			// DOM 渲染完毕再执行这个方法
			this.$nextTick(() => {
				this.getHeightArr();
			})
		},
		computed: {
			...mapGetters(['buyNum'])
		},
		methods: {
			...mapMutations(['setFoldState']),

			// 获取所有商品
			async getGoodsData() {
				let res = await goodsCloudObj.getList()
				res.data.forEach(item => {
					item.proGroup.forEach((child, idx) => {
						child.numValue = 0
					})
				})
				this.dataList = res.data
			},

			// 点击左侧导航菜单
			clickNav(index) {
				if (this.navIdx === index) return;
				this.navIdx = index;
				if (this.timeout) {
					clearTimeout(this.timeout);
				}
				this.timeout = setTimeout(() => {
					this.rightScrollValue = this.rightHitArr[index];
					this.leftScrollValue = this.leftHitArr[index];
				}, 200)
			},
			// 获取滚动条内容高度
			getHeightArr() {
				let selectorQuery = uni.createSelectorQuery();
				// 获取自定义头部的总高度
				let customHeadBar
				selectorQuery.select('#customHeadBar').boundingClientRect((rect) => {
					customHeadBar = rect.height
				})
				// 左侧滚动区域的节点组
				selectorQuery.selectAll(".navitem").boundingClientRect(rects => {
					this.leftHitArr = rects.map(item => item.top - customHeadBar - 40)
				}).exec()

				// 右侧滚动区域的节点组
				selectorQuery.selectAll(".productView").boundingClientRect(rects => {
					this.rightHitArr = rects.map(item => item.top - customHeadBar - 40)
				}).exec()
			},
			// 监听右侧滚动条的改变
			rightScrollEnt(e) {
				let scrolltop = Math.ceil(e.detail.scrollTop)
				let idx = this.rightHitArr.findIndex((value, index, arr) => {
					return scrolltop >= value && scrolltop < arr[index + 1]
				})
				this.navIdx = idx
				this.leftScrollValue = this.leftHitArr[idx];

				if (scrolltop <= 300) {
					this.setFoldState(false)
				}
				if (scrolltop >= 400) {
					this.setFoldState(true)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		height: 100vh;
		display: flex;
		flex-direction: column;

		.wrapper {
			border-radius: 20rpx 20rpx 0 0;
			margin-top: -20rpx;
			position: relative;
			z-index: 2;
			overflow: hidden;
			flex: 1;
			background: #fff;

			.infoModel {
				color: $text-font-color-1;
				border-bottom: 1px solid $border-color;
				@include flex-box();
				height: 100rpx;
				background: #fff;
				padding: 0 30rpx;
				font-size: 32rpx;

				.right {
					@include flex-box();
					color: $brand-theme-color-aux;
				}
			}

			.scrollLayout {
				height: calc(100% - 100rpx);
				@include flex-box();

				.leftScroll {
					height: 100%;
					width: 190rpx;
					border-right: 1px solid $border-color;
					background: $page-bg-color;

					.navitem {
						font-size: 30rpx;
						padding-left: 30rpx;
						line-height: 100rpx;
						color: $text-font-color-2;
						position: relative;

						&.active {
							color: $text-font-color-1;
							background: #fff;

							&::after {
								content: "";
								width: 6rpx;
								height: 30rpx;
								background: $brand-theme-color;
								position: absolute;
								left: 0;
								top: 50%;
								transform: translateY(-50%);
							}
						}
					}
				}

				.rightScroll {
					height: 100%;
					flex: 1;
					position: relative;

					.searchView {
						position: absolute;
						top: 0;
						right: 30rpx;
						z-index: 3;
						@include flex-box-set();
						height: 90rpx;
						color: $brand-theme-color-aux;
					}

					.productView {
						padding: 0 30rpx;

						.proTitle {
							line-height: 90rpx;
							font-size: 30rpx;
							background: #fff;
						}
					}
				}

				// 负责滚动条
				.sContent {
					height: 100%;
				}
			}
		}
	}
</style>