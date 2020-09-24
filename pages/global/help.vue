<template>
	<view class="user_form" >
		<form @submit="" @reset="">
			<view class="user_form_main">
				<view class="user_form_title">
					<input type="text" value="" placeholder="请输入问题" />
				</view>
				<view class="user_form_content">
					<textarea @blur="bindTextAreaBlur"  placeholder="写输入您的问题,保持文字简练,表达清晰"></textarea>
				</view>
				<view class="user_form_img">
					<van-uploader :file-list="fileList" :deletable="true" @afterRead="afterRead" upload-icon="plus" />
				</view>
			</view>
			<button type="default" class="user_article_button" form-type="submit" v-if="store.type==2">提交</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList: [],
				store: this.$store.state,
				active: 0,
				type: 0,
				arr: [],
				person_store: this.$store.state,
			};
		},
		methods: {
			bindTextAreaBlur: function(e) {
				console.log(e.detail.value)
			}
		},onLoad(v) {
			console.log(v)
		}

	}
</script>

<style lang="less">
	.user_form {
		width: 90%;
		margin: 10px auto;

		.user_form_main {
			box-shadow: 33px 57px 188px 0px rgba(21, 21, 21, 0.1);
			display: block;
			background: white;
			width: 90%;
			height: 95%;
			border-radius: 5px;
			padding: 2.5% 5%;

			.user_form_title {
				border-bottom: 1px solid #dcdcdc;
				padding: 10px;

				input {
					font-size: 16px;
					font-weight: bold;
				}
			}

			.user_form_content {
				padding: 20px 10px;
			}
		}

		.user_article_button {
			width: 80%;
			margin: 20px auto;
			color: white !important;
			background: #5480FF !important;
			border-radius: 15px !important;
		}
	}
</style>
