<template>
	<view class="user_form">
		<form @submit="" @reset="">
			<view class="user_form_main">
				<!-- <view class="user_form_title">
					<input type="text" v-model="title" placeholder="请输入问题" />
				</view> -->
				<view class="user_form_content">
					<textarea @blur="bindTextAreaBlur" v-model="textarea" placeholder="写输入您的问题,保持文字简练,表达清晰"></textarea>
				</view>
				<view class="user_form_img">
					<van-uploader :file-list="picture" :deletable="true" @delete="imgdelet" @afterRead="afterRead" upload-icon="plus" />
				</view>
			</view>
			<button type="default" class="user_article_button" form-type="submit" v-if="store.type==2" @click="submitform">提交</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				store: this.$store.state,
				active: 0,
				textarea: null,
				type: 0,
				arr: [],
				id: null,
				picture: [],
				person_store: this.$store.state,
			};
		},
		methods: {
			bindTextAreaBlur: function(e) {
				console.log(e.detail.value)
			},
			imgdelet(e) {
				this.picture.splice(e.detail.index, 1)
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
				})
			},
			submitform() {
				if (this.textarea != "" && this.textarea != null) {
					let arr = [];
					this.picture.forEach(element => {
						arr.push(element.url)
					})
					console.log(arr)
					this.$api.ApiPost({
						type: 207,
						date: {
							expertId: this.$store.state.member_id,
							questionId: this.id,
							answer: this.textarea,
							picture: arr
						}
					}).then(res => {
							uni.showToast({
								title:res.msg,
								duration:3000,
								icon:'none'
							})
						if (res.code === 0) {
							uni.switchTab({
								url:'/pages/user/person'
							})
						}
					})
				} else {
					uni.showToast({
						title: '请填写内容',
						icon: 'none',
						duration: 3000
					})
				}
			}
		},
		onLoad(v) {
			this.id = v.id
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
