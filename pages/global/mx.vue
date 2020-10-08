<template>
	<view class="globalForm">
		<view v-show="statetype">
			<view class="user_family_form_radio">
				<text>糖尿病类型</text>
				<picker @change="PickerChanges" style="width: 70%;" id="0" value="0" range-key="name" :range="arr[0].optionList">
					<view class="picker">
						{{ datas.diabetic_type.name!=undefined?datas.diabetic_type.name:'请选择糖尿病类型'}}
					</view>
				</picker>
			</view>
			<view class="user_family_form_radio">
				<text>高血压类型</text>
				<picker @change="PickerChanges" style="width: 70%;" id="1" value="0" range-key="name" :range="arr[1].optionList">
					<view class="picker">
						{{ datas.hypertension_Type.name!=undefined?datas.hypertension_Type.name:'请选择高血压类型'}}
					</view>
				</picker>
			</view>
			<view class="user_family_form_radio">
				<text>治疗方式</text>
				<picker @change="PickerChanges" style="width: 70%;" id="2" value="0" range-key="name" :range="arr[2].optionList">
					<view class="picker">
						{{ datas.therapy_method.name!=undefined?datas.therapy_method.name:'请选择治疗方式'}}
					</view>
				</picker>
			</view>
			<view class="user_family_form_radio">
				<text>血糖状况</text>
				<picker @change="PickerChanges" style="width: 70%;" id="3" value="0" range-key="name" :range="arr[3].optionList">
					<view class="picker">
						{{ datas.blood_status.name!=undefined?datas.blood_status.name:'请选择血糖状况'}}
					</view>
				</picker>
			</view>
			<view class="user_family_form_radio">
				<text>糖尿病并发症</text>
				<picker @change="PickerChanges" style="width: 70%;" id="4" value="0" range-key="name" :range="arr[4].optionList">
					<view class="picker">
						{{ datas.diabetic_syndrome.name!=undefined?datas.diabetic_syndrome.name:'请选择糖尿病并发症'}}
					</view>
				</picker>
			</view>

			<view class="user_family_form_radio">
				<text>糖尿病确诊日期:</text>
				<picker @change="DateChanges" id="0" mode="date" style="width: 70%;" :value="datas.d_make_date" start="2010-01-01">
					<view class="picker">
						{{ datas.d_make_date!=undefined?datas.d_make_date:'糖尿病确诊日期'}}</view>
				</picker>
			</view>
			<view class="user_family_form_radio">
				<text>高血压确诊日期:</text>
				<picker @change="DateChanges" id="1" mode="date" style="width: 70%;" :value="datas.h_make_date" start="2010-01-01">
					<view class="picker">
						{{ datas.h_make_date!=undefined?datas.h_make_date:'请选择高血压确诊日期'}}</view>
				</picker>
			</view>
			<button type="default" class="user_family_button" form-type="submit" @click="formSubmit">保存</button>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				arr: [],
				key: [],
				date: '请选择确诊日期',
				statetype: false,
				dates: '请选择确诊日期',
				type: 1, // 1 慢性病史 2 生活习惯
				datas: {
					diabetic_type: {},
					d_make_date: '2020-12-07',
					hypertension_Type: {},
					h_make_date: '2020-12-07',
					therapy_method: {},
					blood_status: {},
					diabetic_syndrome: {}
				},
				id: uni.getStorageSync('getUserInfo').data.record_id,
				ids: uni.getStorageSync('PersonArchives').data.Chronic_id
			};
		},
		methods: {
			// 修改
			PickerChanges(e) {
				console.log(e)
				switch (Number(e.target.id)) {
					case 0:
						this.datas.diabetic_type.name = this.arr[e.target.id].optionList[e.detail.value].name
						this.datas.diabetic_type.id = this.arr[e.target.id].optionList[e.detail.value].id
						break;
					case 1:
						this.datas.hypertension_Type.name = this.arr[e.target.id].optionList[e.detail.value].name
						this.datas.hypertension_Type.id = this.arr[e.target.id].optionList[e.detail.value].id
						break;
					case 2:
						this.datas.therapy_method.name = this.arr[e.target.id].optionList[e.detail.value].name
						this.datas.therapy_method.id = this.arr[e.target.id].optionList[e.detail.value].id
						break;
					case 3:
						this.datas.blood_status.name = this.arr[e.target.id].optionList[e.detail.value].name
						this.datas.blood_status.id = this.arr[e.target.id].optionList[e.detail.value].id
						break;
					case 4:
						this.datas.diabetic_syndrome.name = this.arr[e.target.id].optionList[e.detail.value].name
						this.datas.diabetic_syndrome.id = this.arr[e.target.id].optionList[e.detail.value].id
						break;
				}
				this.$scope.setData({
					datas: this.datas
				})
			},
			DateChanges(e) { //确诊日期
				if (e.target.id == 0) {
					this.datas.d_make_date = e.detail.value
				} else {
					this.datas.h_make_date = e.detail.value
				}
				this.$scope.setData({
					datas: this.datas
				})
			},
			api(type) {
				let _this = this
				// 查询是否为修改状态
				this.$api.ApiPost({
					type: 300,
					date: {
						type: type
					}
				}).then(res => {
					_this.arr = res.data
					_this.$api.ApiPost({
						type: 777,
						date: {
							chronic_id: this.ids
						}
					}).then(res => {
						console.log(res)
						if (res.data != null) {
							let data = res.data
							this.datas = res.data
							this.arr[0].optionList.forEach(element => {
								if (this.datas.diabetic_type === element.id) {
									this.datas.diabetic_type = {
										name: element.name,
										id: element.id,
									}
								}
							})
							this.arr[1].optionList.forEach(element => {
								if (this.datas.hypertension_Type === element.id) {
									this.datas.hypertension_Type = {
										name: element.name,
										id: element.id,
									}
								}
							})
							this.arr[2].optionList.forEach(element => {
								if (this.datas.therapy_method === element.id) {
									this.datas.therapy_method = {
										name: element.name,
										id: element.id,
									}
								}
							})
							this.arr[3].optionList.forEach(element => {
								if (this.datas.blood_status === element.id) {
									this.datas.blood_status = {
										name: element.name,
										id: element.id,
									}
								}
							})
							this.arr[4].optionList.forEach(element => {
								if (this.datas.diabetic_syndrome === element.id) {
									this.datas.diabetic_syndrome = {
										name: element.name,
										id: element.id,
									}
								}
							})
						}
						this.statetype = true;
					})

				})
			},
			formSubmit() {
				if (this.ids == "null") {
					// 新增表单
					let data = this.datas
					data.record_id = this.id
					data.diabetic_type = data.diabetic_type.id
					data.hypertension_Type = data.hypertension_Type.id
					data.therapy_method = data.therapy_method.id
					data.blood_status = data.blood_status.id
					data.diabetic_syndrome = data.diabetic_syndrome.id
					this.$api.ApiPost({
						type: 69,
						date: data
					}).then(res => {
						uni.showToast({
							title: res.msg,
							icon: "none",
							duration: 3000
						})
						uni.navigateBack({
							url: '/pages/user/article'
						})
					})
				} else {
					let data = this.datas
					data.chronic_id = data.chronic_id
					data.diabetic_type = data.diabetic_type.id
					data.hypertension_Type = data.hypertension_Type.id
					data.therapy_method = data.therapy_method.id
					data.blood_status = data.blood_status.id
					data.diabetic_syndrome = data.diabetic_syndrome.id
					// 修改表单
					this.$api.ApiPost({
						type: 81,
						date: data
					}).then(res => {
						uni.showToast({
							title: res.msg,
							icon: "none",
							duration: 3000
						})
						uni.navigateBack({
							url: '/pages/user/article'
						})
					})
				}
			},
		},
		onLoad(e) {
			this.api(e.type);
			this.type = Number(e.type)
			if (e.id) {
				this.id = e.id
				this.ids = e.ids
				this.$scope.setData({
					id: this.id,
					ids: this.ids
				})
			}
		}
	}
</script>

<style lang="less">
	.globalForm {
		.user_family_form_radio {
			padding: 10px 10px;
			display: flex;
			background: white;
			border-bottom: 1px solid #EDEDED;
			border-radius: 5px;

			text {
				color: #646566;
				font-size: 14px;
				width: 40%;
				padding-left: 5px;
				padding-top: 2px;
			}

			.van-cell {
				padding: 0;
			}

			.van-cell:after {
				border-bottom: 0 !important;
			}
		}

		.user_family_button {
			width: 80%;
			margin: 20px auto;
			color: white !important;
			background: #5480FF !important;
			border-radius: 20px !important;
		}

		.picker {
			color: gray;
			font-size: 15px;
			padding-top: 2px;
		}
	}
</style>
