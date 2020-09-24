<template>
	<view class="user_login">
		<view class="user_login_header">
			<h1>您好</h1>
			<text>欢迎使用健康问答</text>
		</view>
		<view class="user_login_center">
			<image class="user_login_img" src="/static/images/user/user_login_img.png"></image>
		</view>
		<button type="default" class="user_login_button"  @click="$store.commit('TabUrl','person')">
			<image class="user_login_button_img" src="../../static/images/user/user_login_button.png" ></image>
			微信一键登陆
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
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		},mounted() {
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
		margin-top: 50px;
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
	.user_login_footer{
		position: absolute;
		bottom: 20px;
		width: 100%;
		text-align: center;
		left: 0;
	}
	.user_login_footer text{
		color: #B8C4CE;
		font-size: 12px;
	}
	.user_login_footer .user_login_footer_span{
		color: black;
	}
</style>
