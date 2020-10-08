<template>
	<view class="globalForm">
		<view v-show="statetype">
			<view v-if="ids=='null'">
				<!-- 新增 -->
				<view v-if='type===1'>
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
				<view v-if='type===2'>
					<view class="user_family_form_radio" v-for="(item,keys) in arr" :key='item[0]'>
						<text>{{item.name}}:</text>
						<picker @change="PickerChange" style="width: 70%;" :id="keys" :value="key[keys]" range-key="name" :range="item.optionList">
							<view class="picker">
								{{key[keys]===-1?'请选择'+item.name:item.optionList[key[keys]].name}}
							</view>
						</picker>
					</view>
					<button type="default" class="user_family_button" form-type="submit" @click="formSubmit">保存</button>
				</view>
			</view>
			<view v-else>
				<!-- 修改 -->
				<view v-if='type===1'>
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
								{{ datas.d_make_date!=undefined?datas.d_make_date
							:'糖尿病确诊日期'}}</view>
						</picker>
					</view>
					<view class="user_family_form_radio">
						<text>高血压确诊日期:</text>
						<picker @change="DateChanges" id="1" mode="date" style="width: 70%;" :value="datas.h_make_date" start="2010-01-01">
							<view class="picker">
								{{ datas.h_make_date!=undefined?datas.h_make_date
								:'请选择'}}</view>
						</picker>
					</view>
					<button type="default" class="user_family_button" form-type="submit" @click="formSubmits">保存</button>
				</view>
			</view>
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
				datas: this.type === 1 ? {
					diabetic_type: {},
					d_make_date: '2020-12-07',
					hypertension_Type: {},
					h_make_date: '2020-12-07',
					therapy_method: {},
					blood_status: {},
					diabetic_syndrome: {}
				} : null,
				id: uni.getStorageSync('getUserInfo').data.record_id,
				ids: this.type === 1 ? uni.getStorageSync('PersonArchives').data.Chronic_id : uni.getStorageSync('PersonArchives').data
					.liveCus_id,

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
			},
			api(type) {
				let _this = this
				this.$api.ApiPost({
					type: 300,
					date: {
						type: type
					}
				}).then(res => {
					_this.arr = res.data
					if (this.type === 1) {
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
					} else {
						_this.$api.ApiPost({
							type: 778,
							date: {
								liveCus_id: this.ids
							}
						}).then(res => {
							console.log(res)
						})
					}

				})
			},
			// 新增
			formSubmit() {
				if (this.type === 1) {
					let data = this.datas
					data.record_id = this.id
					this.$api.ApiPost({
						type: 69,
						date: data
					}).then(res => {
						uni.showToast({
							title: res.msg,
							icon: "none",
							duration: 3000
						})
						setTimeout(() => {
							uni.navigateBack({
								url: '/pages/user/article'
							})
						}, 3000)
					})
				} else {
					this.$api.ApiPost({
						type: 70,
						date: {
							"record_id": this.id,
							"work_grade": this.arr[0].optionList[this.key[0]].id,
							"sports_grade": this.arr[1].optionList[this.key[1]].id,
							"sleep_grade": this.arr[2].optionList[this.key[2]].id,
							"mood_grade": this.arr[3].optionList[this.key[3]].id,
							"food_like": this.arr[4].optionList[this.key[4]].id,
							"drink_status": this.arr[5].optionList[this.key[5]].id,
							"smoke_status": this.arr[6].optionList[this.key[6]].id,
						}
					}).then(res => {
						uni.showToast({
							title: res.msg,
							icon: "none",
							duration: 3000
						})
						setTimeout(() => {
							uni.navigateBack({
								url: '/pages/user/archives'
							})
						}, 3000)
					})

				}
			},
			formSubmits() {
				if (this.type === 1) {
					this.$api.ApiPost({
						type: 81,
						date: {
							"chronic_id": this.ids,
							"diabetic_type": this.datas.diabetic_type.id,
							"d_make_date": this.datas.d_make_date,
							"hypertension_Type": this.datas.hypertension_Type.id,
							"h_make_date": this.datas.h_make_date,
							"therapy_method": this.datas.therapy_method.id,
							"blood_status": this.datas.blood_status.id,
							"diabetic_syndrome": this.datas.diabetic_syndrome.id
						}
					}).then(res => {
						uni.showToast({
							title: res.msg,
							icon: "none",
							duration: 3000
						})
						setTimeout(() => {
							uni.navigateBack({
								url: '/pages/user/article'
							})
						}, 3000)
					})

				} else {
					if (this.key.indexOf(-1) != -1) {
						uni.showToast({
							title: '请全部填写完整',
							icon: 'none',
							duration: 3000
						})

					} else {
						this.$api.ApiPost({
							type: 70,
							date: {
								"record_id": this.id,
								"work_grade": this.arr[0].optionList[this.key[0]].id,
								"sports_grade": this.arr[1].optionList[this.key[1]].id,
								"sleep_grade": this.arr[2].optionList[this.key[2]].id,
								"mood_grade": this.arr[3].optionList[this.key[3]].id,
								"food_like": this.arr[4].optionList[this.key[4]].id,
								"drink_status": this.arr[5].optionList[this.key[5]].id,
								"smoke_status": this.arr[6].optionList[this.key[6]].id,
							}
						}).then(res => {
							uni.showToast({
								title: res.msg,
								icon: "none",
								duration: 3000
							})
							setTimeout(() => {
								uni.navigateBack({
									url: '/pages/user/archives'
								})
							}, 3000)
						})
					}
				}

			}
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
