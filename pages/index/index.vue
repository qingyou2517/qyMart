<template>
	<view class="home">
		<custom-head-bar></custom-head-bar>
		<view class="wrapper">
			<view class="infoModel">
				<view class="left">免费配送</view>
				<view class="right">
					<u-icon name="order" color="#576b95" size="24"></u-icon>
					我的订单
				</view>
			</view>
			<view class="scrollLayout">
				<view class="leftScroll">
					<scroll-view scroll-y class="sContent">
						<view class="navitem" :class="item==1? 'active':''" v-for="item in 50">{{item}}</view>
					</scroll-view>
				</view>
				<view class="rightScroll">
					<view class="searchView">
						<u-icon name="search" size="22" color="#576b95"></u-icon>
						搜索
					</view>
					<scroll-view scroll-y class="sContent">
						<view class="productView" v-for="item in 5">
							<!-- 吸顶组件：内部只能有一个根元素 -->
							<u-sticky custom-nav-height="0" zIndex="2">
								<view class="proTitle">产品名称{{item}}</view>
							</u-sticky>
							<view class="proContent">
								<view class="proitem" v-for="pro in 3">
									<product-item></product-item>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<view style="height: 100rpx; background: green;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.home{
		height: 100vh;
		display: flex;
		flex-direction: column;
		.wrapper{
			border-radius: 20rpx 20rpx 0 0;
			margin-top: -20rpx;
			position: relative;
			z-index: 2;
			overflow: hidden;
			flex: 1;
			background: #fff;
			.infoModel{
				color:$text-font-color-1;
				border-bottom: 1px solid $border-color;
				@include flex-box();
				height: 100rpx;
				background: #fff;
				padding: 0 30rpx;
				font-size: 32rpx;
				.right{
					@include flex-box();
					color: $brand-theme-color-aux;
				}
			}
			.scrollLayout{
				height: calc(100% - 100rpx);
				@include flex-box();
				.leftScroll{
					height: 100%;
					width: 190rpx;
					border-right: 1px solid $border-color;
					background: $page-bg-color;
					.navitem{
						font-size: 30rpx;
						padding-left:30rpx;
						line-height: 100rpx;
						color:$text-font-color-2;
						position: relative;
						&.active{
							color:$text-font-color-1;
							background:#fff;
							&::after{
								content: "";
								width: 6rpx;
								height: 30rpx;
								background: $brand-theme-color;
								position: absolute;
								left:0;
								top:50%;
								transform: translateY(-50%);
							}
						}
					}
				}
				.rightScroll{
					height: 100%;
					flex: 1;
					position: relative;
					.searchView{
						position: absolute;
						top:0;
						right:30rpx;
						z-index: 3;
						@include flex-box-set();					
						height: 90rpx;
						color:$brand-theme-color-aux;
					}
					.productView{
						padding:0 30rpx;
						.proTitle{
							line-height: 90rpx;
							font-size: 30rpx;
							background: #fff;
						}
					}
				}
				// 负责滚动条
				.sContent{
					height: 100%;
				}
			}
		}
	}
</style>
