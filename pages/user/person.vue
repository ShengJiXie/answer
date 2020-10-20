<template>
	<view class="user_person" v-show="stats">
		<!-- 头部 -->
		<view class="user_person_header">
			<view class="user_person_header_main">
				<view class="user_person_header_main_item">
					<view class="user_person_header_main_left">
						<image :src="person_store.type!=-1?userInfo.avatar:'../../static/images/user/avater.png'" style="width:60px;height: 60px;background: transparent;"></image>
					</view>
					<view class="user_person_header_main_center">
						<view style="display: grid;padding-left: 5px;">
							<view style="display: flex;" v-if="person_store.type!=-1&&person_store.type!=0">
								<text style="font-size: 19px;letter-spacing:3px;color: white;padding:5px 0;padding-top: 5px;">{{person_store.roleName}}</text>
								<text style="font-size: 14px;color: white;padding:5px 0;padding-top: 13px;padding-left: 5px;">{{person_store.name}}</text>
							</view>
							<text v-else-if="person_store.type===-1" @click="$store.commit('GlobalUrl','login')" style="font-size: 22px;letter-spacing:3px;color: white;padding:5px 0;">未登录</text>
							<text v-else="person_store.type===0" style="font-size: 22px;letter-spacing:3px;color: white;padding:5px 0;">{{person_store.name}}</text>
							<view v-if="person_store.type!=-1">
								<text style="color: #FFBA87;font-size: 12px;" @click="$store.commit('GlobalUrl','info')">查看并编辑个人资料</text>
							</view>
							<view v-else>
								<text style="color: #FFBA87;font-size: 12px;">查看并编辑个人资料</text>
							</view>
						</view>
					</view>
					<view class="user_person_header_main_right" v-if="person_store.type===0||person_store.type===-1">
						<view @click="$store.commit('GlobalUrl','/pages/global/login?type=1')">专家登录</view>
						<view @click="$store.commit('GlobalUrl','/pages/global/login?type=2')">管理员登录</view>
					</view>
				</view>
			</view>
			<view class="user_person_header_footer" v-if="person_store.type==-1">
				<view class="user_person_header_footer_left">
					<image src="../../static/images/global/person_img.png" style="width: 25px;height:25px;"></image>
				</view>
				<view class="user_person_header_footer_center">
					<text>升级为VIP会员 提问全部免费</text>
				</view>
				<view class="user_person_header_footer_right">
					<view class="user_person_header_footer_right_button">
						立即升级
					</view>
				</view>
			</view>
			<view v-if="person_store.type!=2&&person_store.type!=-1">
				<!-- grid -->
				<view class="user_person_header_footer_two" v-if="person_store.type!=1">
					<van-row gutter="20">
						<van-col span="5">
							<view style="background:#756BFF" @click="$store.commit('GlobalUrl','order')">
								<image src="../../static/images/user/yyue.png" style="width: 23px;height: 20px;"></image>
								<text>我的预约</text>
							</view>
						</van-col>
						<van-col span="5">
							<view style="background:#FFBF79" @click="$store.commit('GlobalUrl','/pages/global/myhelp')">
								<image src="../../static/images/user/edit.png" style="width: 23px;height: 20px;"></image>
								<text>我的提问</text>
							</view>
						</van-col>
						<van-col span="5">
							<view style="background:#8DC8FF" @click="$store.commit('GlobalUrl','/pages/global/star')">
								<image src="../../static/images/user/star.png" style="width: 23px;height: 21px;"></image>
								<text>我的收藏</text>
							</view>
						</van-col>
						<van-col span="5">
							<view style="background:#28D682" @click="$store.commit('GlobalUrl','/pages/global/souch')">
								<image src="../../static/images/user/souch.png" style="width: 20px;height: 20px;"></image>
								<text>最近浏览</text>
							</view>
						</van-col>
					</van-row>
				</view>
				<view class="user_person_header_footer_two" v-else>
					<van-row gutter="21">
						<van-col span="7" style="width:31%">
							<view style="background:#756BFF" @click='$store.commit("TabUrl","/pages/global/form")'>
								<image src="../../static/images/user/yyue.png" style="width: 23px;height: 20px;"></image>
								<text>我的回答</text>
							</view>
						</van-col>
						<van-col span="7" style="width:31%">
							<view style="background:#FFBF79" @click="$store.commit('GlobalUrl','/pages/global/star')">
								<image src="../../static/images/user/edit.png" style="width: 23px;height: 20px;"></image>
								<text>我的收藏</text>
							</view>
						</van-col>
						<van-col span="7" style="width:31%">
							<view style="background:#8DC8FF" @click="$store.commit('GlobalUrl','/pages/global/souch')">
								<image src="../../static/images/user/souch.png" style="width: 20px;height: 20px;"></image>
								<text>最近浏览</text>
							</view>
						</van-col>

					</van-row>
				</view>
			</view>
			<!-- grid 结束 -->

			<!-- Tab标签页 -->
			<view class="user_person_Tab" v-if="person_store.type===2||person_store.type===-1">
				<van-tabs :active="active" color="#0084FF" border="true">
					<van-tab :title=" person_store.type===2?'未回答('+list.length+')':'我的提问'">
						<view class="user_person_Tab_frist_button">
							<view class="user_person_Tab_view" v-if="person_store.type===-1">
								<view :class="type===0?'user_person_Tab_frist_button_item user_person_Tab_frist_button_item_hover':'user_person_Tab_frist_button_item'"
								 @click="tabClick(0)">
									<text>未回复({{list.length}})</text>
								</view>
								<view :class="type===1?'user_person_Tab_frist_button_item user_person_Tab_frist_button_item_hover':'user_person_Tab_frist_button_item'"
								 @click="tabClick(1)">
									<text>已回复({{lists.length}})</text>
								</view>
							</view>
						</view>
						<!-- 文章列表 -->
						<view v-if="person_store.type===2">
							<view class="user_person_center" v-for="(item,key) in list" :key='item[0]'>
								<view class="user_person_center_item">
									<view class="user_person_center_item_header">
										<image :src="item.avatar=='null'?'../../static/images/user/avater.png':item.avatar" style="width:20px;height:20px;border-radius: 50%;"
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
						<view v-else>
							<view class="user_person_center" v-for="item in list" :key='item[0]'>
								<view class="user_person_center_item">
									<text class="user_person_center_item_h1">{{item.title}}</text>
									<text class="user_person_center_item_p">{{item.create_at}}</text>
								</view>
							</view>
						</view>
						<view class="null_state" v-if="list.length==0">
							<image src="../../static/images/global/null.png"></image>
							<text>目前还没有任何问题...</text>
						</view>
						<!-- 文章列表结束 -->
					</van-tab>

					<van-tab :title=" person_store.type===2?'已回答('+lists.length+')':'收藏夹'">
						<view class="user_person_Tab_frist_button"></view>
						<!-- 文章列表 -->

						<view v-if="person_store.type===2">
							<view class="user_person_center" v-for="(item,key) in lists" :key='item[0]'>
								<view class="user_person_center_item">
									<view class="user_person_center_item_header">
										<image :src="item.avatar=='null'?'../../static/images/user/avater.png':item.avatar" style="width:20px;height:20px;border-radius: 50%;"
										 mode="aspectFit"></image>
										<text class="h1">{{item.name}}</text>
										<text class="p">提出了问题</text>
									</view>
									<text class="user_person_center_item_h1" @click="$store.commit('GlobalUrl','/pages/user/helpArticle?id='+item.id)">{{item.title}}</text>
									<view class="user_person_center_item_footer_icon" v-if="person_store.type==2||person_store.type==1">
										<van-button size="small" color="#0084FF" v-if="item.question_status!=2" custom-style="color:white;border-radius: 8px;font-size:14px;"
										 icon="../../../../static/images/user/edit_white.png" type="info">
											回答
										</van-button>
										<van-button size='small' color="#dddce6" v-else>已回答</van-button>
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
		<!-- 头部结束 -->
		<!-- 档案 -->
		<view class="user_person_cell" v-if="person_store.type==0">
			<van-cell title="我的档案" url="/pages/user/archives" icon="../../../../static/images/user/person_my.png" is-link />
			<van-cell title="家人档案" url="/pages/user/family" icon="../../../../static/images/user/person_here.png" is-link />
		</view>
		<view class="user_person_cell_help" v-if="person_store.type==1||person_store.type==0">
			<van-cell title="最新问题" icon="../../../../static/images/user/helps.png" v-if='person_store.type==1' link-type='switchTab'
			 url="/pages/global/form" value="更多问题" is-link />
			<van-cell title="最新问题" icon="../../../../static/images/user/helps.png" v-if='person_store.type==0' link-type='navigateTo'
			 url="/pages/global/myhelp" value="更多问题" is-link />
			<!-- 部分文章 -->
			<view class="user_person_center" v-for="(item,key) in list" :key='item[0]'>
				<view class="user_person_center_item" v-if="key===0">
					<text class="user_person_center_item_h1">
						{{item.title}}</text>
					<view class="user_person_center_item_footer">
						<text class="user_person_center_item_footer_p">{{item.question_status==1?'待解答':item.question_status==0?'待分配专家':item.question_status==2?'已解答':''}}</text>
						<view class="user_person_center_item_footer_icon" v-if="person_store.type==2||person_store.type==1">
							<!-- <van-button size="small" color="#F7F7F7" custom-style="color:#979797;border-radius: 8px;margin-right:5px;font-size:14px;"
							 icon="../../../../static/images/user/look_false.png" type="info">
								忽略
							</van-button> -->
							<van-button size="small" color="#DBEAFF" custom-style="color:#3A8AFC;border-radius: 8px;font-size:14px;" icon="../../../../static/images/user/edit_true.png"
							 type="info" @click="$store.commit('GlobalUrl','/pages/global/help?id='+item.id)">
								回答
							</van-button>
						</view>
						<view class="user_person_center_item_footer_icon" v-else>
							<van-button size="small" color="#F7F7F7" @click="$store.commit('GlobalUrl','/pages/user/helpArticle?id='+item.id)"
							 custom-style="color:#979797;border-radius: 8px;letter-spacing: 2px;font-size:14px;" icon="../../../../static/images/user/look_true.png"
							 type="info">
								查看
							</van-button>
						</view>
					</view>
				</view>
			</view>
			<view class="null_state" v-if="list.length==0">
				<image src="../../static/images/global/null.png"></image>
				<text>目前还没有任何问题...</text>
			</view>
			<!-- 部分文章结束 -->
		</view>
		<!-- 档案结束 -->
		<!-- 退出登录 -->
		<view class="user_person_footer" v-if="person_store.type===1||person_store.type===2">
			<van-button type="primary" color="#ececec" block custom-style="color:#666666;width:90%;margin:50px auto;" @click='logout'
			 size="large">退出登录</van-button>
		</view>
		<!-- 退出登录结束 -->

		<!-- 转接专家窗口 -->
		<van-popup :show="show" round position="bottom" safe-area-inset-top safe-area-inset-bottom custom-style="height: 60%;background:#F3F3F5;"
		 @close="showClick">
			<view class="user_person_zj" v-for="item in expert" :key="item[0]">
				<view class="user_person_zj_header">
					<text>可转接</text>
				</view>
				<view class="user_person_zj_center">
					<view class="img">
						<image :src="item.avatar"></image>
					</view>
					<view class="text">
						<view class="text_header">
							<text class="h1">{{item.name}}</text>
							<text class="p">{{item.tab===null?'':item.tab}}</text>
						</view>
						<text class="p">{{item.longevity===null?'':item.longevity}}</text>
					</view>
				</view>
				<!-- 				<view class="user_person_zj_center_footer">
					<text>24小时回复率 <text>96.8%</text></text>
					<text>24小时回复率 <text>96.8%</text></text>
					<text>24小时回复率 <text>96.8%</text></text>
				</view> -->
				<view class="user_person_zj_footer">
					<view class="user_person_zj_footer_main">
						<van-button type="primary" color="#0083FF" block custom-style="color:white;width:100px;border-radius:4px" size="small"
						 @click='helpClick(item.id)'>立即转接</van-button>
					</view>
				</view>
			</view>
		</van-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 0,
				type: 0,
				person_store: this.$store.state,
				show: false,
				list: [], //未回答
				lists: [], //已回答 ,收藏夹
				help: null, //当前问题id
				stats: false,
				userInfo: [], //用户信息
				expert: [], //专家列表
			};
		},
		methods: {
			tabClick(v) {
				this.type = v
			},
			logout() {
				uni.clearStorage();
				uni.redirectTo({
					url: '/pages/user/login'
				})
			},
			// 问题转接
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
			showClick(type, key) {
				this.show ? this.show = false : this.show = true;
				if (type === 0) {
					this.help = this.list[key].id
					this.$scope.setData({
						help: this.help
					})
				}
			},
			api() {
				if (this.$store.state.type != -1) {
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
					// 获取详情信息
					this.$api.ApiPost({
						type: 201,
						date: {
							member_id: this.$store.state.member_id,
							role: this.$store.state.type
						}
					}).then(res => {
						this.userInfo = res.data
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

					// 获取预约列表
					this.$api.ApiPost({
						type: 20,
						date: {
							member_id: this.$store.state.member_id
						}
					})
					// 获取提问分类详情
					this.$api.ApiPost({
						type: 204
					})
					// 获取家人的档案详情
					this.$api.ApiPost({
						type: 24,
						date: {
							member_id: this.$store.state.member_id //临时数据
						}
					})
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
		},
		onShow() {
			//进入我的页面清空提问的全局变量（标题、详情、图片）
			getApp().globalData.form_title = ''
			getApp().globalData.form_text = ''
			getApp().globalData.form_picture = []
			 
			 
			
			
			
			if (uni.getStorageSync('PersonInfo')) {
				this.$store.commit('InfoStep')
				this.$api.ApiPost({
					type: 201,
					date: {
						member_id: this.$store.state.member_id,
						role: this.$store.state.type
					}
				})
			}
			this.api()
		},
		mounted() {

			this.stats = true
		}
	}
</script>

<style lang="less">
	.user_person {
		.user_person_header {
			background: white;
			padding: 10px 0;

			.user_person_header_main {
				height: 130px;
				width: 90%;
				box-shadow: 0px 25px 17px 0px rgba(51, 133, 253, 0.23);
				border-radius: 15px;
				background: linear-gradient(180deg, #1977FF, #408DFC);
				margin: 0 auto;

				.user_person_header_main_item {
					display: flex;
					padding: 0 3%;
					padding-top: 30px;

					.user_person_header_main_left {
						width: 20%;
						height: 60px;
						text-align: center;

						image {
							width: 60px;
							height: 60px;
							border-radius: 50px;
							background: white;
						}
					}

					.user_person_header_main_center {
						width: 60%;
						height: 60px;
					}

					.user_person_header_main_right {
						width: 20%;
						height: 60px;

						view {
							margin: 5px 0;
							width: 102%;
							padding: 5px;
							font-size: 11px;
							color: #5988FF;
							letter-spacing: 1px;
							text-align: center;
							background: white;
							border-top-left-radius: 10px;
							border-bottom-left-radius: 10px;
						}
					}
				}
			}

			.user_person_header_footer {
				width: 80%;
				border-radius: 20px;
				background: white;
				height: 45px;
				margin: 0 auto;
				position: relative;
				top: -20px;
				display: flex;

				.user_person_header_footer_left {
					width: 18%;
					text-align: center;
					padding-top: 10px;
				}

				.user_person_header_footer_center {
					width: 60%;
					color: #2F61F9;
					font-size: 12px;
					padding-top: 13px;
				}

				.user_person_header_footer_right {
					width: 26%;
					text-align: center;
					padding-top: 8px;
					padding-right: 5px;

					.user_person_header_footer_right_button {
						width: 80%;
						margin: 0 auto;
						border-radius: 20px;
						color: white;
						background: #4188f9;
						text-align: center;
						padding: 5px;
						font-size: 11px;

					}
				}
			}

			.user_person_header_footer_two {
				width: 90%;
				margin: 20px auto;

				.van-row {
					display: flex;

					.van-col {
						padding-left: 0 !important;
						padding-right: 0 !important;
					}

					van-col {
						width: 22%;
						margin-left: 1%;
						margin-right: 1%;

						view {
							width: 100%;
							height: 100%;
							box-shadow: 0px 10px 23px -5px rgba(21, 21, 21, 0.1);
							border-radius: 12px;
							display: grid;
							text-align: center;
							color: white;
							padding: 10px 0 5px 0px;

							image {
								margin: 0 auto;
							}

							text {
								font-size: 13px;
								font-family: SourceHanSansSC;
								font-weight: 500;
								color: #FFFFFF;
								line-height: 15px;
							}
						}
					}
				}
			}
		}

		// 档案
		.user_person_cell {
			.van-cell {
				padding: 23px;

				.van-cell__title {
					font-size: 16px;
					font-family: siyuan;
					font-weight: 500;

					color: #000000;
				}

				.van-icon--image {
					width: 24px;
					height: 18px;
					margin-right: 10px;
				}
			}
		}

		// 更多问题
		.user_person_cell_help {
			.van-cell {
				padding: 15px 20px;

				.van-cell__left-icon-wrap {
					margin-top: -3px;
				}
			}
		}

		// tab 标签页
		.user_person_Tab {
			.van-ellipsis {
				font-size: 15px;
			}

			.user_person_Tab_frist_button {
				width: 95%;
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
							padding-top: 6px;
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
			position: relative;
			left: 50%;
			margin-left: -80px;
			padding: 70px 0;
			width: 160px;
			text-align: center;

			image {
				width: 100px;
				height: 90px;
			}

			text {
				display: block;
				font-size: 14px;
				color: #8BBBFF;
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
	}
</style>
