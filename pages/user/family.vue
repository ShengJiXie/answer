<template>
	<!-- 家人档案 -->
	<view class="user_family">
		<view class="user_family_center" v-if="type===0">
			<view class="user_family_center_item" v-for="item in list" :key='item[0]' @click="$store.commit('GlobalUrl','/pages/user/archives?id='+item.record_id)">
				<view class="user_family_center_item_text">
					<text>{{item.name}}</text>
					<van-icon name="../../../../static/images/user/myuser.png" color="#1569E4" size="20px" />
					<text>{{item.record_id}}</text>
				</view>
			</view>

		</view>
		<view class="user_family_header" v-if="type===0">
			<van-button plain block icon="add-o" size="large" type="info" @click="AddFamily">添加家人</van-button>
		</view>

		<view class="user_family_form" v-if="type===1||type===2||type===3">
			<form @submit="" @reset="">
				<van-cell-group>
					<van-field id="key" :value='key' required label="身份证号码" @input="onChanges" maxlength='18' placeholder="请输入身份证号码"
					 bind:click-icon="onClickIcon" />
					<van-field id="name" :value="name" type="text" label="姓名" @input="onChanges" placeholder="请输入姓名" required />
					<van-field id="phone" :value="phone" type="text" label="手机号码" @input="onChanges" maxlength='11' placeholder="请输入手机号码" />
					<van-field id="code" :value="code" type="text" label="企业编号" @input="onChanges" icon="warning-o" placeholder="请输入企业编号" />
					<van-field id="company" :value="company" type="text" label="企业单位" @input="onChanges" icon="warning-o" placeholder="请输入企业单位" />
				</van-cell-group>
				<view class="user_family_form_radio">
					<text style="color: #646566;font-size: 14px;padding-left: 5px;">婚姻情况:</text>
					<view class="user_family_form_radio_item">
						<view v-for="(item,key) in ['未知','已婚','未婚']" :class="marital_status===key?'user_family_form_radio_item_li hover':'user_family_form_radio_item_li'"
						 @click="radioMarriage(key)">
							<text>{{item}}</text>
						</view>
					</view>
				</view>
				<view class="user_family_form_radio">
					<text style="color: #646566;font-size: 14px;padding-left: 5px;">过敏药物:</text>
					<view class="user_family_form_radio_item">
						<view v-for="(item,key) in ['无','有']" :class="is_drug===key?'user_family_form_radio_item_li hover':'user_family_form_radio_item_li'"
						 @click="radioAllergy(key)">
							<text>{{item}}</text>
						</view>
					</view>
				</view>
				<view class="user_family_form_text">
					<text style="color: #646566;font-size: 14px;padding-left: 5px;">病史描述:</text>
					<view class="textarea">
						<textarea id="medical_history" :value='medical_history' @input="onChanges" placeholder="请填写病史描述:"></textarea>
						<view class="textarea_footer">
							<view style="width: 100%;">
								<image :src="item" v-for="item in fileList" style="margin-right: 5px;width:60px;height:60px;" :key='item[0]'></image>
							</view>
							<van-uploader :file-list="picture" @delete="imgdelet" :deletable="true" @afterRead="afterRead" upload-icon="plus" />
							<!-- <view @click="upload">
								<view class="textarea_footer_imgupload">
									<van-icon name="photo-o" color="#1569E4" size="30px" />
									<text>图片</text>
								</view>
								<view class="textarea_footer_imgupload">
									<van-icon name="../../../../static/images/user/pz.png" color="#1569E4" size="30px" />

									<text>拍照</text>
								</view>
							</view> -->

						</view>
					</view>
					<button type="default" class="user_family_button" form-type="submit" @click="formSubmit">保存</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				key: null,
				name: null,
				phone: null,
				code: null,
				company: null,
				picture: [], //图片数组	
				marital_status: 2, //婚姻情况  0已婚 1未婚 2未知
				is_drug: 0, //过敏药物 0 无 1 有
				medical_history: null, //病史描述
				fileList: [],
				type: 0, //页面进度 0 未为家人列表 1 为新增家人 2 新增个人档案 3 修改或新增我的个人档案 
				list: [],
				id: uni.getStorageSync('getUserInfo').data.record_id
			};
		},
		methods: {
			radioMarriage(v) {
				this.marital_status = v
			},
			radioAllergy(v) {
				this.is_drug = v
			},
			imgdelet(e) {
				this.picture.splice(e.detail.index, 1)
				this.$scope.setData({
					picture: this.picture
				})
			},
			afterRead(e) {
				this.$api.ApiPost({
					type: 666,
					date: {
						file: e.target.file.path
					}
				}).then(res => {
					console.log(res)
					let data = JSON.parse(res[1].data);
					if (data.code === 0) {
						uni.showToast({
							title: data.msg,
							duration: 3000
						})
					}
					this.picture.push({
						url: data.url,
						deletable: true
					})
					this.$scope.setData({
						picture: this.picture
					})
				})
			},
			AddFamily() {
				this.type === 0 ? this.type = 1 : this.type = 0
			},
			onChanges(event) {
				if (event.target.id == "key") {
					this.key = event.detail
				} else if (event.target.id == "name") {
					this.name = event.detail
				} else if (event.target.id == "medical_history") {
					this.medical_history = event.detail.value
				} else if (event.target.id == "phone") {
					this.phone = event.detail
				} else if (event.target.id == "code") {
					this.code = event.detail
				} else if (event.target.id == "company") {
					this.company = event.detail
				}
			},
			formSubmit() {
				if (this.type === 1 || this.type === 2) {
					let da = [];
					this.picture.forEach((element, key) => {
						da.push(element.url)
					})
					this.$api.ApiPost({
						type: 60,
						date: {
							"type": this.type === 2 ? 0 : 1,
							"member_id": this.$store.state.member_id,
							"identity_id": this.key,
							"name": this.name,
							"gender": "男",
							"tel": this.phone,
							"company_id": this.code,
							"company": this.company,
							"marital_status": this.marital_status,
							"is_drug": this.is_drug,
							"medical_history": this.medical_history,
							"picture": da
						}
					}).then(res => {
						uni.showToast({
							title: res.msg,
							duration: 3000,
							icon: 'none'
						})
						if (res.code === 0) {
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/user/person'
								})
							}, 3000)
						}
					})
				} else if (this.type === 3) {
					let da = [];
					this.picture.forEach((element, key) => {
						da.push(element.url)
					})
					this.$api.ApiPost({
						type: 61,
						date: {
							"record_id": this.id,
							"identity_id": this.key,
							"name": this.name,
							"tel": this.phone,
							"company_id": this.code,
							"gender": uni.getStorageSync('getUserInfo').data.gender,
							"company": this.company,
							"marital_status": this.marital_status,
							"is_drug": this.is_drug,
							"drug_text": "",
							"medical_history": this.medical_history,
							"picture": da
						},

					}).then(res => {
						uni.showToast({
							title: res.msg,
							duration: 3000,
							icon: 'none'
						})
						if (res.code === 0) {
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/user/person'
								})
							}, 3000)
						}
					})
				}
			}
		},
		onShow() {
			this.list = uni.getStorageSync('PersonArchivesFamily').data;
		},
		onLoad(e) {
			console.log(e)
			if (e.type == 3) {
				let data = uni.getStorageSync('PersonArchives').data
				this.key = data.identity_id
				this.name = data.name
				this.phone = data.tel
				this.code = data.company_id
				this.company = data.company
				this.medical_history = data.medical_history
				if (data.picture != null) {

					data.picture.forEach(element => {
						this.picture.push({
							url: element,
							deletable: true
						})
					})
					this.$scope.setData({
						picture: this.picture
					})
				} else {
					this.picture = [];
				}
				this.radioMarriage(data.marital_status)
				this.radioAllergy(data.is_drug)
			}
			if (e.type) {
				this.type = Number(e.type)
			}
			if (e.id) {
				this.id = Number(e.id)
			}
		}
	}
</script>

<style lang="less">
	page {
		background: white;
	}

	.user_family {
		.user_family_center {
			padding: 20px 0;
			width: 100%;

			.user_family_center_item {
				width: 90%;
				margin: 10px auto;
				border-radius: 10px;
				background: #f3f8ff;
				height: 80px;

				.user_family_center_item_text {
					width: 40%;
					margin: 0 auto;
					display: flex;
					text-align: center;
					font-size: 18px;
					line-height: 70px;

					justify-content: space-around;
				}
			}
		}

		.user_family_header {
			width: 80%;
			margin: 20px auto;

			.van-button__icon {
				padding-top: 2px;
			}
		}

		.van-field__icon-root {
			color: #1569E4 !important;
		}

		.user_family_form {
			padding: 0 2.5%;
			width: 95%;
			background: white;

			.user_family_form_text {
				display: grid;
				background: white !important;
				border-radius: 1px;
				color: #9A9A9A;
				padding: 10px;

				text {
					padding-bottom: 10px;
				}

				.textarea {
					padding: 10px;
					width: 95%;
					margin: 0 auto;
					font-size: 13px;
					border: 1px solid #EDEDED;

					textarea {
						width: 100%;
					}

					.textarea_footer {
						padding: 10px 10px;
						border-top: 1px solid #EDEDED;

						.textarea_footer_imgupload {
							display: grid;
							margin: 10px 20px 5px 20px;
							float: left;

							text {
								padding: 1px 0;
								text-align: center;
							}

							color: #070707;
						}
					}
				}
			}
		}

		.user_family_button {
			width: 80%;
			margin: 20px auto;
			color: white !important;
			background: #5480FF !important;
			border-radius: 20px !important;
		}

		.user_family_form_radio {
			padding: 10px 10px;
			display: flex;
			background: white;
			border-bottom: 1px solid #EDEDED;
			border-radius: 5px;

			.user_family_form_radio_item {
				display: flex;
				padding-left: 30px;

				.user_family_form_radio_item_li {
					width: 58px;
					height: 24px;
					background: #F9F9F9;
					border-radius: 1px;
					margin: 0 5px;
					text-align: center;
					color: #9A9A9A;

					text {
						font-size: 14px;
					}
				}

				.hover {
					background: #E7F1FF;
					color: #006CFF;
				}
			}
		}
	}
</style>
