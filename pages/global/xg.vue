<template>
	<view class="globalForm">
		<view v-show="statetype">
			<view class="user_family_form_radio">
				<text>劳动强度</text>
				<picker @change="PickerChanges" style="width: 70%;" id="0" value="0" range-key="name" :range="arr[0].optionList">
					<view class="picker">
						{{ datas.work_grade.name!=undefined?datas.work_grade.name:'请选择劳动强度'}}
					</view>
				</picker>
			</view>
			<view class="user_family_form_radio">
				<text>运动强度</text>
				<picker @change="PickerChanges" style="width: 70%;" id="1" value="0" range-key="name" :range="arr[1].optionList">
					<view class="picker">
						{{ datas.sports_grade.name!=undefined?datas.sports_grade.name:'请选择运动强度'}}
					</view>
				</picker>
			</view>
			<view class="user_family_form_radio">
				<text>睡眠时长</text>
				<picker @change="PickerChanges" style="width: 70%;" id="2" value="0" range-key="name" :range="arr[2].optionList">
					<view class="picker">
						{{ datas.sleep_grade.name!=undefined?datas.sleep_grade.name:'请选择睡眠时长'}}
					</view>
				</picker>
			</view>
			<view class="user_family_form_radio">
				<text>平时情绪</text>
				<picker @change="PickerChanges" style="width: 70%;" id="3" value="0" range-key="name" :range="arr[3].optionList">
					<view class="picker">
						{{ datas.mood_grade.name!=undefined?datas.mood_grade.name:'请选择平时情绪'}}
					</view>
				</picker>
			</view>
			<view class="user_family_form_radio">
				<text>饮食偏好</text>
				<picker @change="PickerChanges" style="width: 70%;" id="4" value="0" range-key="name" :range="arr[4].optionList">
					<view class="picker">
						{{ datas.food_like.name!=undefined?datas.food_like.name:'请选择饮食偏好'}}
					</view>
				</picker>
			</view>
			<view class="user_family_form_radio">
				<text>饮酒情况</text>
				<picker @change="PickerChanges" style="width: 70%;" id="5" value="0" range-key="name" :range="arr[4].optionList">
					<view class="picker">
						{{ datas.drink_status.name!=undefined?datas.drink_status.name:'请选择饮酒情况'}}
					</view>
				</picker>
			</view>
			<view class="user_family_form_radio">
				<text>吸烟情况</text>
				<picker @change="PickerChanges" style="width: 70%;" id="6" value="0" range-key="name" :range="arr[4].optionList">
					<view class="picker">
						{{ datas.smoke_status.name!=undefined?datas.smoke_status.name:'请选择吸烟情况'}}
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
				statetype: false,
				type: 2, // 1 慢性病史 2 生活习惯
				datas: {
					work_grade: {},
					d_make_date: '2020-12-07',
					sports_grade: {},
					h_make_date: '2020-12-07',
					sleep_grade: {},
					mood_grade: {},
					food_like: {},
					drink_status: {},
					smoke_status: {},
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
						this.datas.work_grade.name = this.arr[e.target.id].optionList[e.detail.value].name
						this.datas.work_grade.id = this.arr[e.target.id].optionList[e.detail.value].id
						break;
					case 1:
						this.datas.sports_grade.name = this.arr[e.target.id].optionList[e.detail.value].name
						this.datas.sports_grade.id = this.arr[e.target.id].optionList[e.detail.value].id
						break;
					case 2:
						this.datas.sleep_grade.name = this.arr[e.target.id].optionList[e.detail.value].name
						this.datas.sleep_grade.id = this.arr[e.target.id].optionList[e.detail.value].id
						break;
					case 3:
						this.datas.mood_grade.name = this.arr[e.target.id].optionList[e.detail.value].name
						this.datas.mood_grade.id = this.arr[e.target.id].optionList[e.detail.value].id
						break;
					case 4:
						this.datas.food_like.name = this.arr[e.target.id].optionList[e.detail.value].name
						this.datas.food_like.id = this.arr[e.target.id].optionList[e.detail.value].id
						break;
					case 5:
						this.datas.drink_status.name = this.arr[e.target.id].optionList[e.detail.value].name
						this.datas.drink_status.id = this.arr[e.target.id].optionList[e.detail.value].id
						break;
					case 6:
						this.datas.smoke_status.name = this.arr[e.target.id].optionList[e.detail.value].name
						this.datas.smoke_status.id = this.arr[e.target.id].optionList[e.detail.value].id
						break;
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
						type: 778,
						date: {
							liveCus_id: this.ids
						}
					}).then(res => {
						console.log(res)
						if (res.data != null) {
							let data = res.data
							this.datas = res.data
							this.arr[0].optionList.forEach(element => {
								if (this.datas.work_grade === element.id) {
									this.datas.work_grade = {
										name: element.name,
										id: element.id,
									}
								}
							})
							this.arr[1].optionList.forEach(element => {
								if (this.datas.sports_grade === element.id) {
									this.datas.sports_grade = {
										name: element.name,
										id: element.id,
									}
								}
							})
							this.arr[2].optionList.forEach(element => {
								if (this.datas.sleep_grade === element.id) {
									this.datas.sleep_grade = {
										name: element.name,
										id: element.id,
									}
								}
							})
							this.arr[3].optionList.forEach(element => {
								if (this.datas.mood_grade === element.id) {
									this.datas.mood_grade = {
										name: element.name,
										id: element.id,
									}
								}
							})
							this.arr[4].optionList.forEach(element => {
								if (this.datas.food_like === element.id) {
									this.datas.food_like = {
										name: element.name,
										id: element.id,
									}
								}
							})
							this.arr[5].optionList.forEach(element => {
								if (this.datas.drink_status === element.id) {
									this.datas.drink_status = {
										name: element.name,
										id: element.id,
									}
								}
							})
							this.arr[6].optionList.forEach(element => {
								if (this.datas.smoke_status === element.id) {
									this.datas.smoke_status = {
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
					data.work_grade = data.work_grade.id
					data.sports_grade = data.sports_grade.id
					data.sleep_grade = data.sleep_grade.id
					data.mood_grade = data.mood_grade.id
					data.food_like = data.food_like.id
					data.drink_status = data.drink_status.id
					data.smoke_status = data.smoke_status.id
					this.$api.ApiPost({
						type: 70,
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
					data.work_grade = data.work_grade.id
					data.sports_grade = data.sports_grade.id
					data.sleep_grade = data.sleep_grade.id
					data.mood_grade = data.mood_grade.id
					data.food_like = data.food_like.id
					data.drink_status = data.drink_status.id
					data.smoke_status = data.smoke_status.id
					// 修改表单
					this.$api.ApiPost({
						type: 82,
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
