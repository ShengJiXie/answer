<template>
	<view class="global_login">
		<view class="global_login_main">

			<!-- 表单 -->
			<view class="global_login_banner_1">
			</view>
			<view class="global_login_banner_2">
			</view>
			<form @submit="" @reset="" class="form">
				<view class="form_header">
					<text class="h1">登录</text>
					<text class="p">欢迎来到健康问答，请用账号登录</text>
				</view>
				<view class="form_center">
					<view class="form_center_item">
						<input type="text" v-model="username" placeholder="输入账号" />
					</view>
					<view class="form_center_item" style="display: flex;">
						<input :type="passwordType?'password':'text'" v-model="password" placeholder="输入密码" style="width: 90%;" />
						<view style="width:10%;padding-top: 20px;">
							<image :src="passwordType?'../../static/images/global/close.png':'../../static/images/user/look_true.png'"
							 @click="typeClick" style="width: 25px;height: 15px;"></image>
						</view>
					</view>
				</view>
				<view class="form_footer">
					<van-button type='primary' size="large" block color="#547FFF" @click='formSubmit' custom-style="color:#FFFFFF;width:80%;margin:50px auto;border-radius:30px">确定</van-button>
				</view>
			</form>
		</view>
		<!-- 表单结束 -->
		<view class="global_login_banner_3"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: null,
				password: null,
				passwordType: true
			};
		},
		methods: {
			typeClick() {
				this.passwordType ? this.passwordType = false : this.passwordType = true
			},
			formSubmit() {
				this.$api.ApiPost({
					type: 62,
					date: {
						username: this.username,
						password: this.password
					}
				}).then(res => {
					console.log(res)
					if (res.code === 0) {
						uni.showToast({
							title: res.msg,
							duration: 3000
						})
						uni.setStorageSync('PersonInfo', res);
						// 获取未回答问题
						this.$api.ApiPost({
							type: 22,
							date: {
								member_id: this.$store.state.member_id,
								question_status: 0,
								role: this.$store.state.type,
								page: 1
							}
						})
						// 获取未回答问题
						this.$api.ApiPost({
							type: 22,
							date: {
								member_id: this.$store.state.member_id,
								question_status: 1,
								role: this.$store.state.type,
								page: 1
							}
						})
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/user/person',
							})
						}, 2000)
					}else{
						uni.showToast({
							title: res.msg,
							duration: 3000,
							icon:'none'
						})
					}
				})
			}
		},
		onLoad(obj) {
			console.log(obj)
		}
	}
</script>

<style lang="less">
	page {
		background: linear-gradient(180deg, #1977FF, #408DFC);

		.global_login {
			position: absolute;
			width: 100%;
			height: 100%;
			background: url('https://www.kuadh.com/frist3.png') no-repeat;
			background-size: 150% 20%;
			background-position-y: 105%;
			background-position-x: 3%;

			.global_login_main {
				width: 100%;
				position: relative;

				.global_login_banner_1 {
					position: absolute;
					width: 72px;
					height: 72px;
					top: -30px;
					z-index: -1;
					left: 90px;
					background: url('../../static/images/global/frist1.png') no-repeat;
					background-size: 100% 100%;
				}

				.global_login_banner_2 {
					position: absolute;
					width: 90px;
					height: 90px;
					top: -50px;
					z-index: -1;
					left: 350px;
					background: url('../../static/images/global/frist2.png') no-repeat;
					background-size: 100% 100%;
				}



				.form {
					display: block;
					width: 90%;
					background: white;
					padding: 20px 0;
					margin: 20% auto;
					border-radius: 10px;

					.form_header {
						padding: 50px 20px;
						color: #333333;
						display: grid;

						.h1 {
							font-size: 27px;
							padding: 10px 0;
						}

						.p {

							font-size: 11px;
						}
					}

					.form_center {
						padding: 0 20px;

						.form_center_item {
							border: none;
							padding: 10px 0;
							border-bottom: 1px solid #C7C7C7;

							input {
								padding: 10px;
							}
						}
					}

					.form_footer {
						margin: 50px 0;
					}
				}
			}
		}

	}
</style>
