<template>
	<view class="manage">
		<uni-section title="分类管理" type="line"></uni-section>
		<uni-list>
			<uni-list-item title="管理分类" show-arrow to="/pages_manage/category/category"></uni-list-item>
		</uni-list>

		<uni-section title="商品管理" type="line"></uni-section>
		<uni-list>
			<uni-list-item title="商品列表" show-arrow to="/pages_manage/goods/list"></uni-list-item>
			<uni-list-item title="新增商品" show-arrow to="/pages_manage/goods/add"></uni-list-item>
		</uni-list>

		<uni-section title="关于商家" type="line"></uni-section>
		<uni-list>
			<uni-list-item title="商家信息" show-arrow to="/pages_manage/brand/brand"></uni-list-item>
		</uni-list>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.manage {
		padding: 30rpx;
	}
</style>