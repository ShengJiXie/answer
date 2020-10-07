<template>
	<view class="globalForm">
		<view v-if='type===1'>
			<view class="user_family_form_radio">
				<text>糖尿病类型</text>
				<picker @change="PickerChange" style="width: 70%;" id="0" value="0" range-key="name" :range="arr[0].optionList">
					<view class="picker">
						{{arr[0].optionList[0].name}}
					</view>
				</picker>
			</view>



			<view class="user_family_form_radio">
				<text>糖尿病确诊日期:</text>
				<picker @change="DateChange" id="0" mode="date" style="width: 70%;" :value="date" start="2010-01-01">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="user_family_form_radio">
				<text>高血压确诊日期:</text>
				<picker @change="DateChange" id="1" mode="date" style="width: 70%;" :value="dates" start="2010-01-01">
					<view class="picker">
						{{dates}}
					</view>
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
</template>

<script>
	export default {
		data() {
			return {
				arr: [],
				key: [],
				date: '请选择确诊日期',
				dates: '请选择确诊日期',
				datas: [],
				type: 1, // 1 慢性病史 2 生活习惯
				id: uni.getStorageSync('getUserInfo').data.record_id,
				ids: this.type === 1 ? uni.getStorageSync('PersonArchives').data.Chronic_id : uni.getStorageSync('PersonArchives').data
					.liveCus_id,

			};
		},
		computed: {
			diabetic_type: function() {
				this.arr[0].optionList.forEach(element => {
					if (element.id == this.datas.diabetic_type) {
						return element.name
					}
				})
			}
		},
		methods: {
			PickerChange(e) {
				console.log(e)
				console.log(this.diabetic_type)
			},
			DateChange(e) { //确诊日期
				if (e.target.id == 0) {
					this.date = e.detail.value
				} else {
					this.dates = e.detail.value
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
							}
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
			formSubmit() {
				if (this.type === 1) {
					if (this.key.indexOf(-1) != -1 || this.date == '请选择确诊日期' || this.dates == '请选择确诊日期') {
						uni.showToast({
							title: '请全部填写完整',
							icon: 'none',
							duration: 3000
						})
					} else {
						this.$api.ApiPost({
							type: 69,
							date: {
								"record_id": this.id,
								"diabetic_type": this.arr[0].optionList[this.key[0]].id,
								"d_make_date": this.date,
								"hypertension_Type": this.arr[1].optionList[this.key[1]].id,
								"h_make_date": this.dates,
								"therapy_method": this.arr[2].optionList[this.key[2]].id,
								"blood_status": this.arr[3].optionList[this.key[3]].id,
								"diabetic_syndrome": this.arr[4].optionList[this.key[4]].id
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
					}
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
