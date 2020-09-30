<template>
	<view class="user_info">
		<form class="forms" @submit="" @reset="">
			<view class="upload_img">
				<text class="label" style="padding-top: 10px;">头像</text>
				<image :src="user_info.avatar===null?this.avatar:user_info.avatar" @click="afterRead"></image>
			</view>
			<view class="user_info_item">
				<text class="label">用户名</text>
				<input type="text" v-model="user_info.name" placeholder="请填写用户名" />
			</view>
			<view class="user_info_item">
				<text class="label">性别</text>
				<van-cell :title="user_type" is-link border="false" @click="AlertClick" />
				<van-action-sheet :show="show" :actions="actions" @close="onClose" @select="onSelect">
				</van-action-sheet>
			</view>
			<view class="user_info_item">
				<text class="label">生日</text>
				<input type="text" v-model="user_info.birthday" placeholder="请填写生日" />
			</view>
			<view class="user_info_item">
				<text class="label">居住地</text>
				<input type="text" v-model="user_info.addr" placeholder="请填写居住地" />
			</view>
			<view class="user_info_item">
				<text class="label">手机号</text>
				<input type="number" maxlength="11" v-model="user_info.tel" placeholder="请填写手机号" />
			</view>
			<button form-type="submit" type="default" class="form_button" @click="formSubmit">提交</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList: [],
				show: false,
				user_type: '保密', //用户性别
				user_info: {},
				avatar: 'https://q1.qlogo.cn/g?b=qq&nk=2013143650&s=100',
				actions: [{
						name: '男',
					},
					{
						name: '女',
					}, {
						name: '保密',
					}
				]
			}
		},
		methods: {
			// 图片上传
			afterRead() {
				var _this = this
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					success: function(res) {
						_this.$api.ApiPost({
							type: 666,
							date: {
								file: res.tempFilePaths[0]
							}
						}).then(res => {
							let data = JSON.parse(res[1].data);
							if (data.code === 0) {
								uni.showToast({
									title: data.msg,
									duration: 3000
								})
								_this.user_info.avatar = data.url
								_this.avatar = data.url
							}
						})
					}
				})

			},
			formSubmit() {
				if (
					this.user_info.name &&
					this.user_info.avatar &&
					this.user_info.birthday &&
					this.user_info.addr &&
					this.user_info.tel
				) {
					this.$api.ApiPost({
						type: 14,
						date: {
							member_id: this.$store.state.member_id,
							role: this.$store.state.type, //临时测试
							name: this.user_info.name,
							avatar: this.user_info.avatar,
							gender: this.user_type,
							birthday: this.user_info.birthday,
							addr: this.user_info.addr,
							tel: this.user_info.tel
						}
					}).then(res => {
						uni.showToast({
							title: res.msg,
							duration: 3000
						})
						if (res.code === 0) {
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/user/person'
								})
							}, 2000)
						} else {
							uni.showToast({
								title: '修改失败',
								icon: 'none',
								duration: 3000
							})
						}
					})
				} else {
					uni.showToast({
						title: '请填写完整',
						icon: 'none',
						duration: 3000
					})
				}
			},
			onClose() {
				this.show = false
			},
			onSelect(event) {
				this.user_type = event.detail.name;
				console.log(event.detail);
			},
			AlertClick() {
				this.show = true
			}
		},
		onShow() {
			this.user_info = uni.getStorageSync('getUserInfo').data
			this.user_type = this.user_info.gender
		}
	}
</script>

<style lang="less">
	.user_info {
		width: ceil(100%-5px);
		height: 100%;
		background: white;
		padding: 20px 10px;

		.forms {
			display: block;
			width: 90%;
			margin: 0 auto;
			padding: 10px;

			.form_button {
				color: white !important;
				background: #5480FF !important;
			}

			.label {
				font-size: 14px;
				color: #555555;
			}

			.van-cell--clickable,
			.van-cell {
				padding: 10px 0 10px 0 !important;
			}

			.van-cell:after {
				border-bottom: 0 !important;
			}

			.van-icon--image {
				width: 40px;
				height: 40px;

				image {
					border-radius: 65px;
				}
			}

			.upload_img {
				width: 100%;
				border-bottom: 1px solid #C7C7C7;
				display: flex;
				margin: 0 auto;
				padding: 10px 0px;
				justify-content: space-between;

				image {
					width: 40px;
					height: 40px;
					border-radius: 50%;

				}
			}

			.user_info_item {
				border: none;
				padding: 20px 0;
				border-bottom: 1px solid #C7C7C7;

				input {
					font-size: 14px;
					padding: 10px 0;
				}
			}

			.van-uploader__upload {
				border-radius: 50%;
			}
		}
	}
</style>
