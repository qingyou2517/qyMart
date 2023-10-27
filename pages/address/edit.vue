<template>
	<view class="addressForm">
		<u--form labelPosition="top" labelWidth="100" :model="addressForm" :rules="addressRule" ref="uForm">
			<u-form-item label="姓名" prop="username" ref="item1">
				<u--input v-model="addressForm.username" placeholder="请输入姓名"></u--input>
			</u-form-item>
			<u-form-item label="联系电话" prop="mobile">
				<u--input v-model="addressForm.mobile" placeholder="请输入联系电话"></u--input>
			</u-form-item>

			<u-form-item label="选择地区" prop="mobile">
				<uni-data-picker v-model="addressForm.area_code" placeholder="请选择地址" popup-title="请选择城市"
					collection="opendb-city-china" field="code as value, name as text" orderby="value asc"
					:step-searh="true" self-field="code" parent-field="parent_code" @change="pickerChange">
				</uni-data-picker>
			</u-form-item>

			<u-form-item label="详细地址" prop="address">
				<u--input v-model="addressForm.address" placeholder="请输入街道门牌号"></u--input>
			</u-form-item>

			<u-form-item label="是否默认">
				<u-switch v-model="addressForm.selected" inactiveColor="#eee"></u-switch>
			</u-form-item>

			<!-- 作为空白间距 -->
			<u-form-item></u-form-item>

			<u-form-item>
				<u-button type="primary" @click="onSubmit">提交</u-button>
			</u-form-item>
		</u--form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressForm: {
					username: '',
					mobile: "",
					address: "",
					selected: false,
					area_code: "",
					area_name: "",
				},
				addressRule: {
					username: [{
						required: true,
						message: '姓名是必填的',
						trigger: ['blur', 'change']
					}, {
						min: 2,
						max: 8,
						message: '长度在2-8个字符之间',
						trigger: ['blur', 'change']
					}],
					mobile: [{
						required: true,
						message: '电话是必填的',
						trigger: ['blur', 'change']
					}, {
						validator: (rule, value, callback) => {
							return uni.$u.test.mobile(value);
						},
						message: '手机号码不正确',
						trigger: ['change', 'blur']
					}],
					address: [{
						required: true,
						message: '地址是必填的',
						trigger: ['blur', 'change']
					}]
				},
			};
		},
		methods: {
			pickerChange(e) {
				let res = e.detail.value
				// console.log("pickerChange: ", res)
				this.addressForm.area_code = res[res.length - 1].value
				this.addressForm.area_name = res.map(item => item.text).join('')
			},

			onSubmit() {
				this.$refs.uForm.validate().then(res => {
					uni.$u.toast('校验通过')
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.addressForm {
		padding: 30rpx;
	}
</style>