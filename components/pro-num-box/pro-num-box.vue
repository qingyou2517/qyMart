<template>
	<view class="pronumbox">
		<u-number-box v-model="value" min="0" max="99" @change="numChange">
			<view slot="minus" class="minus numbtn" :class="value<=0?'none':''">
				<u-icon name="minus" size="12" color="#ccc"></u-icon>
			</view>
			<text slot="input" class="input" :class="value<=0?'none':''">{{value}}</text>
			<view slot="plus" class="plus numbtn">
				<u-icon name="plus" color="#FFFFFF" size="12"></u-icon>
			</view>
		</u-number-box>
	</view>
</template>

<script>
	export default {
		name: "pro-num-box",
		data() {
			return {
				value: 0
			};
		},
		methods: {
			numChange(e) {
				console.log(e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pronumbox {
		.numbtn {
			width: 40rpx;
			height: 40rpx;
			@include flex-box-set();
		}

		.minus {
			border: 1px solid #ccc;
		}

		.plus {
			background: $brand-theme-color;
		}

		.input {
			width: 60rpx;
			height: 40rpx;
			font-size: 26rpx;
			color: #888;
			@include flex-box-set();
		}

		.none {
			display: none;
		}
	}
</style>