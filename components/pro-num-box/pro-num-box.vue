<template>
	<view class="pronumbox">
		<u-number-box v-model="dataItem.numValue" min="0" max="99" @change="numChange">
			<view slot="minus" class="minus numbtn" :class="dataItem.numValue<=0?'none':''">
				<u-icon name="minus" size="12" color="#ccc"></u-icon>
			</view>
			<text slot="input" class="input" :class="dataItem.numValue<=0?'none':''">{{dataItem.numValue}}</text>
			<view slot="plus" class="plus numbtn">
				<u-icon name="plus" color="#FFFFFF" size="12"></u-icon>
			</view>
		</u-number-box>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'

	export default {
		name: "pro-num-box",
		data() {
			return {
				dataItem: this.item, // 暂时先使用 dataItem，后续连接了数据库再用.sync改
			};
		},
		props: {
			item: {
				type: Object,
				default: () => {}
			}
		},
		methods: {
			...mapMutations(['setCarsList', 'setProSpecsState']),

			numChange(e) {
				this.item.add = false
				this.setCarsList({
					item: this.item,
					num: e.value
				})
			},
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