<template>
	<view class="user_form">
		<form @submit="" @reset="">
			<view class="user_form_main">
				<view class="user_helpArticle" v-if="state">
					<view class="user_helpArticle_h1_main">
						<text class="user_helpArticle_h1">
							{{arr.questionInfo.title}}
						</text>
					</view>
					<!-- 发布人 -->
				<!-- 	<view class="user_helpArticle_avatar">
						<image :src="arr.questionInfo.avatar"></image>
						<text>{{arr.questionInfo.name}}</text>
					</view> -->

					<!-- 内容 -->
					<view class="user_helpArticle_center">
						<text>{{arr.questionInfo.info}}</text>
						<!-- <rich-text :nodes="arr.questionInfo.info"></rich-text> -->
					</view>
					<view class="user_helpArticle_img">
						<image v-for="item in arr.questionInfo.picture" :key="item[0]" :src="item.url"></image>
					</view>
					<!-- 底部 -->
					<view class="user_helpArticle_footer">
						<text>最后编辑于{{arr.questionInfo.create_at}}</text>
					</view>

					<van-divider></van-divider>


				</view>

				<view class="user_form_content">
					<textarea @blur="bindTextAreaBlur" v-model="textarea" placeholder="写输入您的问答"></textarea>
				</view>
				<view class="user_form_img">
					<van-uploader :file-list="picture" :deletable="true" @delete="imgdelet" @afterRead="afterRead" upload-icon="plus" />
				</view>
			</view>
			<button type="default" class="user_article_button" form-type="submit" @click="submitform">提交</button>
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
				state:false,
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
							title: res.msg,
							duration: 3000,
							icon: 'none'
						})
						if (res.code === 0) {
							uni.switchTab({
								url: '/pages/user/person'
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
			},
			async init(option) {
				let _this = this
				await this.$api.ApiPost({
					type: 206,
					date: {
						questionId: option
					}
				}).then(res => {
					console.log(res)
					this.arr = res.data
					this.state = true
				})
			}
		},
		onLoad(v) {
			this.id = v.id
			this.init(v.id)
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

			.user_helpArticle {
				width: 95%;
				margin: 0px auto;
				padding: 5px 0;

				.user_helpArticle_avatar {
					display: flex;

					image {
						width: 30px;
						height: 30px;
						border-radius: 50%;
						margin-right: 5px;
					}

					text {
						padding-top: 5px;
						font-size: 13px;
					}

					width: 100%;
				}

				.user_helpArticle_h1_main {
					.user_helpArticle_h1 {
						font-size: 19px;
						font-weight: bold;
						margin: 15px 0;
						display: -webkit-box;
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						word-wrap: break-word;
						white-space: normal !important;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
				}

				// 内容
				.user_helpArticle_center {
					width: 100%;
					margin: 10px 0;
					line-height: 30px;
				}

				// 底部
				.user_helpArticle_footer {
					width: 100%;
					color: #9A9A9A;
					margin: 5px 0;

					text {
						font-size: 13px;
					}
				}

				.user_helpArticle_img {
					image {
						width: 80px;
						height: 80px;
						margin-right: 5px;
					}
				}
			}

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
