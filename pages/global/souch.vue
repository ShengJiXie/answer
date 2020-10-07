<template>
	<view v-if="state">
		<van-button type="info" plain size='mini' round custom-style='float:right;margin:10px 15px;' @click='close'>清除记录</van-button>

		<view class="global_help">
			<!-- Tab标签页 -->
			<view class="user_person_Tab" v-if="person_store.type===0||person_store.type===1">
				<!-- 文章列表 -->
				<view class="user_person_center_main">
					<view class="user_person_center" v-for="(item,key) in lists" :key='item[0]'>
						<view class="user_person_center_item">
							<text class="user_person_center_item_h1" @click="$store.commit('GlobalUrl','/pages/user/article?id='+item.news_id)">{{item.news_title}}</text>
							<view class="user_person_center_item_footer_icon">
								<text>分类:{{item.news_type}}</text>
								<text>日期:{{item.create_at}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="null_state" v-if="lists.length==0">
					<image src="../../static/images/global/null.png"></image>
					<text>目前还没有任何收藏...</text>
				</view>
				<!-- 文章列表结束 -->
			</view>
			<!-- Tab标签页结束 -->
		</view>
	</view>



</template>

<script>
	export default {
		data() {
			return {
				lists: [],
				state: false,
				person_store: this.$store.state,
			};
		},
		methods: {
			close() {
				this.$api.ApiPost({
					type: 406,
					date: {
						member_id: this.$store.state.member_id
					}
				}).then(res => {
					uni.showToast({
						title: res.msg,
						duration: 3000
					})
					// 获取浏览列表
					this.$api.ApiPost({
						type: 209,
						date: {
							member_id: this.$store.state.member_id,
							page: 1
						}
					}).then(res => {
						this.state = true
						if (res.code === 0) {
							this.lists = res.data.data
						}
					})
					
				})
			}
		},
		onShow() {
			if (this.$store.state.type === -1) {
				uni.navigateTo({
					url: '/pages/user/login'
				})
			} else {
				// 获取浏览列表
				this.$api.ApiPost({
					type: 209,
					date: {
						member_id: this.$store.state.member_id,
						page: 1
					}
				}).then(res => {
					this.state = true
					if (res.code === 0) {
						this.lists = res.data.data
					}
				})
			}
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

	// 转接专家窗口
	.user_person_zj {
		width: 95%;
		margin: 10px auto;
		background: url(../../static/images/user/upimg.png) no-repeat;
		background-position-x: -10px;
		background-size: 100% 100%;
		height: 200px;

		.user_person_zj_header {
			display: block;

			text {
				font-size: 11px;
				color: white;
				position: relative;
				left: 15px;
				top: 7px;
			}

			height: 40px;
		}

		.user_person_zj_center {
			width: 90%;
			padding-left: 30px;
			margin: 0 auto;
			display: flex;

			.img {
				width: 15%;

				image {
					border-radius: 50%;
					width: 50px;
					height: 50px;
				}
			}

			.text {
				width: 85%;
				padding-left: 5px;
				text-align: left;

				.text_header {
					color: #333333;

					.h1 {
						font-size: 19px;
						letter-spacing: 2px;
						display: block;
					}

					.p {
						display: block;
						font-size: 14px;
						padding: 5px 5px 0 5px;
					}
				}

				.p {
					font-size: 14px;
					padding: 5px 5px;
				}
			}

		}

		.user_person_zj_center_footer {
			font-size: 11px;
			padding: 10px 0;
			text-align: center;

			text {
				color: #999999;
				padding-right: 5px;

				text {
					color: #FF5F0F;
				}
			}
		}

		.user_person_zj_footer {
			position: relative;

			.user_person_zj_footer_main {
				width: 100px;
				position: absolute;
				top: 10px;
				right: 40px;
			}
		}
	}

	// tab 标签页
	.user_person_Tab {
		.van-ellipsis {
			font-size: 18px;
		}

		.user_person_Tab_frist_button {
			width: 95%;
			min-height: 480px;
			background: white;
			padding: 20px 2.5%;
			border-bottom-left-radius: 20px;
			border-bottom-right-radius: 20px;
			border-bottom: 1px solid white;

			.user_person_Tab_view {
				display: flex;
				padding: 0 20px;

				.user_person_Tab_frist_button_item {
					width: 100px;
					height: 30px;
					margin-right: 10px;
					text-align: center;
					background: #ECECEC;
					color: black;
					border-radius: 15px;

					text {
						font-size: 13px;
						display: block;
						padding-top: 5px;
						margin: 0 auto;
					}
				}

				.user_person_Tab_frist_button_item_hover {
					background: #0084FF;
					color: white;

				}
			}
		}
	}


	// 文章列表
	.user_person_center {
		.user_person_center_item {
			width: 80%;
			margin: 10px auto;
			box-shadow: 0px 7px 19px 0px rgba(215, 215, 215, 0.82);
			border-radius: 8px;
			background: white;
			padding: 10px 20px 20px 20px;
			display: grid;

			.user_person_center_item_header {
				display: flex;

				.h1 {
					font-size: 14px;
					font-weight: 600;
					color: #000000;
					padding: 0 5px;
				}

				.p {

					font-size: 14px;
					font-weight: 500;
					color: #999999;
				}
			}

			.user_person_center_item_h1 {
				font-size: 15px;
				font-weight: bolder;
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

			.user_person_center_item_p {
				font-size: 14px !important;
				color: #999999 !important;

			}

			.user_person_center_item_icon {
				display: flex;
				justify-content: flex-end;
			}

			.user_person_center_item_footer {
				display: flex;
				justify-content: space-between;

				.user_person_center_item_footer_p {
					font-size: 13px;
					padding: 7px 0;
					color: #999999;
				}


			}
		}

		.user_person_center_item_footer_icon {
			display: flex;
			justify-content: space-between;
			font-size: 12px;

			text {
				padding-top: 5px;
				color: #a0a0a0;
			}

			.van-button__icon {
				margin-bottom: 3px;
			}
		}
	}

	.null_state {
		position: absolute;
		left: 50%;
		margin-left: -80px;
		margin-top: -82.5px;
		top: 50%;
		width: 160px;
		text-align: center;

		image {
			width: 150px;
			height: 140px;
		}

		text {
			font-size: 14px;
			color: #8BBBFF;
		}
	}
</style>
