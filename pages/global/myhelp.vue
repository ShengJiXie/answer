<template>
	<view v-if="state">
		<view class="global_help">
			<!-- Tab标签页 -->
			<view class="user_person_Tab" v-if="person_store.type===0">
				<van-tabs :active="active" color="#0084FF" border="true">
					<van-tab :title='"未回答("+list.length+")"'>
						<view class="user_person_Tab_frist_button" :style="list.length!=0?'min-height: 0;':'min-height: 480px;'">
						</view>
						<!-- 文章列表 -->
						<view class="user_person_center_main">
							<view class="user_person_center" v-for="(item,key) in list" :key='item[0]'>
								<view class="user_person_center_item">
									<view class="user_person_center_item_header">
										<image :src="avatar" style="width:20px;height:20px;border-radius: 50%;"
										 mode="aspectFit"></image>
										<text class="h1">{{item.name}}</text>
										<text class="p">提出了问题</text>
									</view>
									<text class="user_person_center_item_h1" @click="$store.commit('GlobalUrl','/pages/user/helpArticle?id='+item.id)">{{item.title}}</text>
									<view class="user_person_center_item_footer_icon" v-if="person_store.type==2||person_store.type==1">
										<van-button size="small" color="#0084FF" v-if="item.question_status===0" @click="showClick(0,key)"
										 custom-style="color:white;border-radius: 8px;margin-right:5px;font-size:14px;" icon="../../../../static/images/user/user_zj.png"
										 type="info">
											转接专家
										</van-button>
										<van-button size='small' color="#dddce6" icon="../../../../static/images/user/user_zj.png" custom-style="color:white;border-radius: 8px;margin-right:5px;font-size:14px;"
										 v-else-if="item.question_status===1">已转接</van-button>
										<van-button size="small" color="#0084FF" v-if="item.question_status!=2" custom-style="color:white;border-radius: 8px;font-size:14px;"
										 icon="../../../../static/images/user/edit_white.png" type="info" @click="$store.commit('GlobalUrl','/pages/global/help?id='+item.id)">
											回答
										</van-button>
										<van-button size='small' icon="../../../../static/images/user/edit_white.png" color="#dddce6" custom-style="color:white;border-radius: 8px;font-size:14px;"
										 v-else-if="item.question_status===2">已回答</van-button>
									</view>
								</view>
							</view>
						</view>
						<view class="null_state" v-if="list.length==0">
							<image src="../../static/images/global/null.png"></image>
							<text>目前还没有任何问题...</text>
						</view>
						<!-- 文章列表结束 -->

					</van-tab>
					<van-tab :title="'已回答('+lists.length+')'">
						<!-- 文章列表 -->
						<view class="user_person_center_main">
							<view class="user_person_center" v-for="(item,key) in lists" :key='item[0]'>
								<view class="user_person_center_item">
									<view class="user_person_center_item_header">
										<text class="h1">{{item.name}}</text>
									</view>
									<text class="user_person_center_item_h1" @click="$store.commit('GlobalUrl','/pages/user/helpArticle?id='+item.id)">{{item.title}}</text> 
									<view class="user_person_center_item_footer_icon" >
										<van-button size='small' color="#dddce6" custom-style="color:white;border-radius: 8px;font-size:14px;" >已回答</van-button>
									</view>
								</view>
							</view>
						</view>
						<view class="null_state" v-if="lists.length==0">
							<image src="../../static/images/global/null.png"></image>
							<text>目前还没有任何问题...</text>
						</view>
						<!-- 文章列表结束 -->
					</van-tab>
				</van-tabs>
			</view>
			<!-- Tab标签页结束 -->
		</view>
	</view>



</template>

<script>
	export default {
		data() {
			return {
				fileList: [],
				active: 0,
				type: 0,
				state: false,
				list: [],
				text: null,
				show: false,
				title: null,
				avatar:uni.getStorageSync('getUserInfo').data.avatar,
				expert: [],
				lists: [],
				help: null,
				picture: [], //图片数组	
				getQuestionTypes: [], //分类列表
				person_store: this.$store.state,
				rabclick: [], //点击的标签合集
			};
		},
		methods: {
			bindTextAreaBlur: function(e) {
				console.log(e.detail.value)
			},
			tabClick() {
				this.type === 0 ? this.type = 1 : this.type = 0
			},
			imgdelet(e) {
				this.picture.splice(e.detail.index, 1)
			},
			helpClick(e) {
				this.$api.ApiPost({
					type: 203,
					date: {
						member_id: this.$store.state.member_id,
						expertId: e,
						questionId: this.help,
					}
				}).then(res => {
					uni.showToast({
						title: res.msg,
						duration: 3000
					})
					this.showClick()
					this.api()
				})
			},
			api() {
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
				// 获取已回答问题
				this.$api.ApiPost({
					type: 22,
					date: {
						member_id: this.$store.state.member_id,
						question_status: 1,
						role: this.$store.state.type,
						page: 1
					}
				}).then(res => {
					this.list = uni.getStorageSync('PersonHelp0').data.data
					this.lists = uni.getStorageSync('PersonHelp1').data.data
					this.$scope.setData({
						list: this.list,
						lists: this.lists
					})
				})
			},
			showClick(type, key) {
				this.show ? this.show = false : this.show = true;
				if (type === 0) {
					this.help = this.list[key].id
					this.$scope.setData({
						help: this.help
					})
				}
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
				if (this.rabclick.length != 0 && this.title != null && this.title != "" && this.text != null && this.text != "") {
					this.$api.ApiPost({
						type: 205,
						date: {
							ids: this.rabclick,
							content: {
								member_id: this.$store.state.member_id,
								title: this.title,
								info: this.text,
								picture: this.picture
							}
						}
					})

				} else {
					uni.showToast({
						title: '请填写问题，标题，选择分类!',
						duration: 3000,
						icon: 'none'
					})
				}
			},
			tabClicks(v) {
				if (this.getQuestionTypes[v].hover) {
					this.getQuestionTypes[v].hover = false
					this.rabclick.splice(this.rabclick.lastIndexOf(this.getQuestionTypes[v].id), 1)
				} else {
					this.getQuestionTypes[v].hover = true
					this.rabclick.push(this.getQuestionTypes[v].id)
				}
				this.$scope.setData({
					getQuestionTypes: this.getQuestionTypes
				})
			}
		},
		onShow() {
			if (uni.getStorageSync('PersonInfo')) {
				this.$store.commit('InfoStep')
			}
			if (this.$store.state.type === -1) {
				uni.navigateTo({
					url: '/pages/user/login'
				})
			} else {
				this.getQuestionTypes = uni.getStorageSync('getQuestionTypes').data
				let _this = this
				this.getQuestionTypes.forEach((element, key) => {
					this.getQuestionTypes[key].hover = false
				})
				this.api()
				this.state = true
			}
			if (this.$store.state.type === 2) {
				// 获取专家列表
				this.$api.ApiPost({
					type: 202
				}).then(res => {
					this.expert = res.data;
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
			justify-content: flex-end;

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
