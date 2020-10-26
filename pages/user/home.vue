<template>
	<view class="user_home">
		<!-- 走马灯 -->
		<view class="user_home_header">
			<swiper class="swiper" :indicator-dots="indicatorDots" indicator-color="#ADB7D0" indicator-active-color="#3C74FD"
			 :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="item in bannerList" :key="item[0]">
					<image :src="item.banner_url"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 走马灯结束 -->
		<!-- 公告 -->
		<view class="user_home_noticeMain">
			<view class="user_home_notice">
				<image src="../../static/images/user/notices.png" mode=""></image>
				<swiper class="swiper" indicator-color="#ADB7D0" indicator-active-color="#3C74FD" :autoplay="autoplay" interval="3000"
				 vertical="true" :duration="duration">
					<swiper-item v-for="item in noticeList" :key="item[0]">
						<view class="user_home_notice_swiper">
							<view class="user_home_notice_item" v-for="items in item" :key='items'>
								<li @click="$store.commit('GlobalUrl','/pages/user/article?id='+items.news_id)">{{items.news_title}}</li>
							</view>
						</view>
					</swiper-item>
				</swiper>
				<view class="user_home_notice_icon">
					<image src="../../static/images/user/user_home_notice_icon_right.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 公告结束 -->
		<!-- 分类栏 -->
		<view class="user_home_classification">
			<view class="user_home_classification_main" :style="{'width':(tab.length*20)+'%'}">

				<view v-for="(item,key) in  tab" :key="item[0]" :class="key===index?'user_home_classification_item user_home_classification_item_hover':'user_home_classification_item'"
				 @click="home_Tabclick(key)">
					<text class="class_text">{{item.news_type}}</text>
				</view>
			</view>
			<view class="user_home_icon" @click="rightClick">
				<van-icon name="ellipsis" />
			</view>
		</view>
		<!-- 分类栏结束 -->
		<!-- 文章列表 -->
		<view class="user_home_content">
			<view class="user_home_content_header">
				<text class="user_home_content_header_left">健康指南</text>
				<text class="user_home_content_header_right">更多 ></text>
			</view>
			<view class="user_home_content_main">
				<view class="user_home_content_main_item" v-for="(item,key) in textList" @click="href(key)">
					<view class="user_home_content_main_item_img">
						<image :src="item.pic_url" mode=""></image>
					</view>
					<view class="user_home_content_main_item_text">
						<text class="user_home_content_main_item_text_one">{{item.news_title}}</text>
						<view class="user_home_content_main_item_text_footer">
							<text>浏览 {{item.views}}次</text>
							<text> {{item.create_at}}</text>
						</view>
					</view>
					<!-- <view class="user_home_content_main_item_right">
						<image src="../../static/images/user/user_home_content_main_item_right.png"></image>
					</view> -->
				</view>
				<view v-if="textList.length===0">
					<van-empty description="暂无内容" />
				</view>
			</view>

		</view>
		<!-- 文章列表结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 走马灯配置
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 500,
				// 走马灯配置结束
				index: 0, //导航栏索引
				tab: [],
				bannerList: [], //幻灯片数组
				noticeList: [], //公告数组
				textList: [], //文章数组
				datsd: []
			}
		},
		onShow() {
			this.init();
			//进入我的页面清空提问的全局变量（标题、详情、图片）
			getApp().globalData.form_title = ''
			getApp().globalData.form_text = ''
			getApp().globalData.form_picture = []
 			 
			
			
			
			
		},
		onShareAppMessage(){
			return{
				title:'',
				imageUrl:'',
				url:'/pages/user/home'
			}
		},
		methods: {
			rightClick() {
				uni.showToast({
					title: '右滑查看更多',
					duration: 3000,
					icon: 'none'
				})
			},
			home_Tabclick(key) { //导航栏切换
				this.$scope.setData({
					index: key
				})
				if (key === 0) {

					// 首页分类切换查询
					this.$api.ApiPost({
						type: 11,
						date: {
							page: 1
						}
					}).then(res => {
						this.$scope.setData({
							textList: uni.getStorageSync('HomeText').data.data
						})
					})
				} else {
					// 首页分类切换查询
					this.$api.ApiPost({
						type: 11,
						date: {
							news_type: uni.getStorageSync('HomeType').data[key - 1].id,
							page: 1
						}
					}).then(res => {
						this.$scope.setData({
							textList: uni.getStorageSync('HomeText').data.data
						})
					})
				}
			},
			href(key) {
				uni.navigateTo({
					url: 'article?id=' + this.$scope.data.textList[key].news_id
				})
			},

			async init() {
				// 加载全局数据
				uni.showLoading({
					title: "加载数据中..."
				})
				// 公共首页函数
				let obj = await this.$api.ApiPost({
					type: 10
				})
				// 默认执行一次分类文章选择
				let typeobj = await this.$api.ApiPost({
					type: 11,
					date: {
						page: 1
					}
				})
				let _this = this
				let noticeLists = uni.getStorageSync('HomeNotice').data
				let index = 0;
				let arr = [];
				console.log(noticeLists)
				noticeLists.forEach((element, key) => {
					if (index != 0) {
						if (noticeLists[index + 1] == undefined && noticeLists[index + 2] == undefined) {
							return false;
						}
						arr[index] = [noticeLists[index + 1], noticeLists[index + 2]]
					} else {
						arr[index] = [noticeLists[index], noticeLists[index + 1]]
					}
					index++;
				})
				// 公共首页函数
				await this.$scope.setData({
					bannerList: uni.getStorageSync('HomeBanner').data,
					noticeList: arr,
					tab: uni.getStorageSync('HomeType').data,
					textList: uni.getStorageSync('HomeText').data.data
				})
				uni.getStorageSync('HomeType').data.forEach((element, key) => {
					if (key === 0) {
						_this.tab[0] = {
							id: null,
							news_type: '全部'
						}
					}
					_this.tab[key + 1] = element
				})
				this.$scope.setData({
					tab: _this.tab
				})
			}
		},
	}
</script>

<style lang="less">
	.user_home_header {
		background: white;
		padding: 10px 0;
		swiper {
			height: 170px;
			margin: 5px 0;
			swiper-item {
				image {
					width: 90%;
					border-radius: 20px;
					height: 100%;
					position: relative;
					left: 5%;
				}
			}
		}
	}

	.user_home_noticeMain {
		background: white;

		.user_home_notice {
			display: flex;
			width: 80%;
			margin: 0 auto;

			image {
				width: 50px;
				height: 30px;
				padding-right: 10px;
			}

			swiper {
				position: relative;
				top: -5px;
				width: 250px;
				height: 50px;

				.user_home_notice_swiper {
					.user_home_notice_item {
						margin: 5px 0;
						display: flex;
						color: #333333;
						font-size: 13px;

						li {
							list-style: inherit;
							max-width: 280px;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}

						li::before {
							content: '。';
							color: black;
							position: relative;
							top: -5px;
						}

						text {
							color: #999999;
						}
					}
				}
			}

			.user_home_notice_icon {
				display: flex;
				padding-top: 8px;



				image {
					width: 20px;
					height: 15px;
				}
			}
		}
	}

	// 导航栏
	.user_home_classification {
		width: 100%;
		overflow-x: scroll;
		background: white;

		.user_home_classification_main {
			padding-right: 32px;
			display: flex;
			overflow: hidden;

			.user_home_classification_item {
				width: 15%;
				height: 50px;
				font-size: 14px;
				text-align: center;
			}
			
			.user_home_classification_item .class_text {
				padding: 0px 10px  ;
			}

			.user_home_classification_item_hover {
				background: url(../../static/images/user/user_home_classification_item_hover.png) no-repeat;
				background-size: 100%;
				padding: 0 5px; 
				color: white;
			}
		}

		.user_home_icon {
			position: absolute;
			top: 250px;
			width: 40px;
			right: 0;
			text-align: center;
			background: white;


		}
	}

	// 文章列表
	.user_home_content {
		width: 100%;
		padding: 10px 0;

		.user_home_content_header {
			display: flex;
			width: 90%;
			margin: 0 auto;
			justify-content: space-between;

			.user_home_content_header_left {
				font-size: 16px;
				font-weight: bold;
			}

			.user_home_content_header_right {
				font-size: 11px;
				padding-top: 5px;
				color: #AFB3C3;
			}
		}

		.user_home_content_main {
			width: 100%;
			counter-reset: sectioncounter;

			.user_home_content_main_item_text::before {
				// content: counter(sectioncounter);
				counter-increment: sectioncounter;
				position: relative;
				top: -5px;
				color: #989898;
				left: -20px;
				font-size: 14px;
			}

			.user_home_content_main_item {
				width: 88%;
				margin: 10px auto;
				display: flex;
				padding: 10px;
				border-radius: 10px;
				padding-left: 15px;
				background: white;

				.user_home_content_main_item_img {
					width: 20%;
					image {
						width: 85px;
						height: 75px;
						border-radius: 5px;
					}
				}

				.user_home_content_main_item_text {
					margin-top: 42rpx;
					width: 70%;
					padding-left: 12%; 
					padding-top: 5rpx;
					.user_home_content_main_item_text_one {
						font-size: 16px;
						display: -webkit-box;
						margin-top: -25px;
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						word-wrap: break-word;
						white-space: normal !important;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.user_home_content_main_item_text_footer {
						padding-top: 20px;

						text {
							padding-right: 20px;
							font-size: 11px !important;
							font-weight: 100 !important;
							color: #999999;
						}
					}
				}




			}

		}
	}
</style>
