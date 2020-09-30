<template>
	<view class="user_login">
		<view class="user_login_header">
			<h1>您好</h1>
			<text>欢迎使用健康问答</text>
		</view>
		<view class="user_login_center">
			<image class="user_login_img" src="/static/images/user/user_login_img.png"></image>
		</view>
		<button :type="state==0?'default':'primary'" :open-type="state===0?'getUserInfo':'getPhoneNumber'" @getphonenumber="userPhone"
		 class="user_login_button" @click="login()">
			<image class="user_login_button_img" src="../../static/images/user/user_login_button.png"></image>
			{{state==0?'微信一键登陆':'绑定手机号'}}
		</button>
		<view class="user_login_footer">
			<text>注册即表示您已阅读并同意<text class="user_login_footer_span">《版权声明》</text>和<text class="user_login_footer_span">《隐私保护》</text></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				state: 0, //0 登录 1 绑定手机号
				code: null
			}
		},
		onLoad() {

		},
		methods: {
			userPhone(e) {
				this.$api.ApiPost({
					type: 100,
					date: {
						encryptedData: e.detail.encryptedData,
						iv: e.detail.iv,
						code: this.code,
						member_id: this.$store.state.member_id
					}
				}).then(res => {
					if (res.code === 0 && res.data === 1) {
						uni.showToast({
							title: res.msg,
							duration:3000
						})
						uni.switchTab({
							url: '/pages/user/person'
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration:3000
						})
					}
				})
			},
			login(e) {
				let _this = this
				if (this.state === 0) {
					wx.login({
						success(loginres) {
							// 已经授权，可以直接调用 getUserInfo 获取头像昵称
							wx.getUserInfo({
								success: function(ress) {
									_this.code = loginres.code

									let arr = {
										code: loginres.code,
										nickName: ress.userInfo.nickName,
										avatarUrl: ress.userInfo.avatarUrl,
										gender: ress.userInfo.gender,
										city: ress.userInfo.city
									};
									_this.$api.ApiPost({
										type: 200,
										date: arr
									}).then((suc) => {
										console.log(suc)
										_this.$store.commit('InfoStep')
										_this.$api.ApiPost({
											type: 99,
											date: {
												member_id: _this.$store.state.member_id
											}
										}).then(res => {
											console.log(res)
											if (res.data == 0) {
												uni.showToast({
													title: '您还未绑定手机号',
													icon: 'none',
													duration: 2000
												})
												_this.$scope.setData({
													state: 1
												})
											} else {
												uni.switchTab({
													url: '/pages/user/person'
												})
											}
										})
									})
								}
							})
						}
					})
				} else {
					_this.$api.ApiPost({
						type: 99,
						date: {
							member_id: _this.$store.state.member_id
						}
					})
				}
			}
		},
		mounted() {

		}
	}
</script>

<style>
	.user_login_header {
		color: #547FFF;
	}

	.user_login_header h1 {
		font-size: 45px;
		margin: 10px 0;
	}

	.user_login_header text {
		font-size: 22px;
	}

	.user_login_header {
		width: 80%;
		padding-top: 50px;
		margin: 0 auto;
	}

	.user_login_center {
		margin-top: 80px;
		text-align: center;
	}

	.user_login_img {
		width: 250px;
		height: 200px;
	}

	.user_login_button {
		width: 90%;
		margin-top: 30px;
		background: #547FFF !important;
		color: white !important;
	}

	.user_login_button_img {
		width: 25px;
		height: 20px;
		padding-right: 20px;
		position: relative;
		top: 3px;
	}

	.user_login_footer {
		position: absolute;
		bottom: 20px;
		width: 100%;
		text-align: center;
		left: 0;
	}

	.user_login_footer text {
		color: #B8C4CE;
		font-size: 12px;
	}

	.user_login_footer .user_login_footer_span {
		color: black;
	}
</style>
