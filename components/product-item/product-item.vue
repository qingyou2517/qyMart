<template>
	<view class="pro-item">
		<view class="pic">
			<image class="img" src="../../static/images/pinkpic.jpg" mode="aspectFill"></image>
		</view>
		<view class="text">
			<view class="title">产品标题产品标题产品标题产品标题</view>
			<view class="price">
				<view class="big">￥10.5</view>
				<view class="small">￥22.3</view>
			</view>
			<view class="discount">3折</view>
			<view class="numbox">
				<view class="skuSelect" v-if="true">选规格</view>
				<view class="uNum" v-else>
					<u-number-box v-model="value" min="0" max="99" @change="numChange">
						<view
							slot="minus"
							class="minus numbtn"
							:class="value<=0?'none':''"
						>
							<u-icon
								name="minus"	
								size="12"
								color="#ccc"
							></u-icon>
						</view>
						<text
							slot="input"					           
							class="input"
							:class="value<=0?'none':''"
						>{{value}}</text>
						<view
							slot="plus"
							class="plus numbtn"
						>
							<u-icon
								name="plus"
								color="#FFFFFF"
								size="12"
							></u-icon>
						</view>
					</u-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"product-item",
		data() {
			return {
				value: 0,
			};
		},
		methods:{
			numChange(e){
				console.log(e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pro-item{
		width: 100%;
		padding: 25rpx 0;
		@include flex-box();
		.pic{
			width: 180rpx;
			height: 180rpx;
			border-radius: 20rpx;
			overflow: hidden;
			.img{
				width: 100%;
				height: 100%;
			}
		}
		.text{
			flex:1;
			padding-left:20rpx;
			position: relative;
			.title{
				font-size: 34rpx;
				font-weight: bold;
				@include ellipsis();			
			}
			.price{
				@include flex-box-set(start,end);
				font-weight: bold;
				padding:25rpx 0;
				.big{
					font-size: 34rpx;
					color:$brand-theme-color;
				}
				.small{
					font-size: 26rpx;
					opacity: 0.4;
					text-decoration: line-through;
					padding-left:10rpx;
				}
			}
			.discount{
				font-size: 22rpx;
				color:$brand-theme-color;
				padding:3rpx 8rpx;
				border:1rpx solid $brand-theme-color;
				display: inline-block;
				border-radius: 6rpx;
			}
			.numbox{
				position: absolute;
				right: 0;
				bottom: 0;
				.skuSelect{
					height: 40rpx;
					padding:0 10rpx;
					background: $brand-theme-color;
					font-size: 28rpx;
					color:#fff;
				}
				
				.numbtn{
					width: 40rpx;
					height: 40rpx;
					@include flex-box-set();
				}
				.minus{
					border:1px solid #ccc;
				}
				.plus{
					background: $brand-theme-color;
				}
				.input{
					width: 60rpx;
					height: 40rpx;
					font-size: 26rpx;
					color:#888;
					@include flex-box-set();
				}
				.none{
					display: none;
				}
			}
		}
		
	}
</style>