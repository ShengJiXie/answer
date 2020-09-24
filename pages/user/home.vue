<template>
	<view class="user_home">
		<!-- 走马灯 -->
		<view class="user_home_header">
			<swiper class="swiper" :indicator-dots="indicatorDots" indicator-color="#ADB7D0" indicator-active-color="#3C74FD"
			 :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item>
					<image src="../../static/images/user/user_home_banner.png"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/images/user/user_home_banner.png"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/images/user/user_home_banner.png"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 走马灯结束 -->
		<!-- 公告 -->
		<view class="user_home_noticeMain">
			<view class="user_home_notice">
				<image src="../../static/images/user/组%203(3).png" mode=""></image>
				<swiper class="swiper" indicator-color="#ADB7D0" indicator-active-color="#3C74FD" :autoplay="autoplay" :interval="interval"
				 vertical="true" :duration="duration">
					<swiper-item>
						<view class="user_home_notice_swiper">
							<view class="user_home_notice_item">
								<li>2020年失业了怎么办？ ...</li>
								<text>11小时前</text>
							</view>
							<view class="user_home_notice_item">
								<li>2020年失业了怎么办？ ...</li>
								<text>11小时前</text>
							</view>


						</view>
					</swiper-item>
					<swiper-item>
						<view class="user_home_notice_swiper">
							<view class="user_home_notice_item">
								<li>2020年失业了怎么办？...</li>
								<text>11小时前</text>
							</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="user_home_notice_swiper">
							<view class="user_home_notice_item">
								<li>2020年失业了怎么办？...</li>
								<text>11小时前</text>
							</view>
						</view>
					</swiper-item>
				</swiper>
				<view class="user_home_notice_icon">
					<view class="user_home_notice_icon_radius"></view>
					<image src="../../static/images/user/user_home_notice_icon_right.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 公告结束 -->
		<!-- 分类栏 -->
		<view class="user_home_classification">
			<view v-for="(item,key) in  tab" :key="item[0]" :class="key==index?'user_home_classification_item user_home_classification_item_hover':'user_home_classification_item'"
			 @click="home_Tabclick(key)">
				<text>{{item}}</text>
			</view>
		</view>
		<!-- 分类栏结束 -->
		<!-- 文章列表 -->
		<view class="user_home_content">
			<view class="user_home_content_header">
				<text class="user_home_content_header_left">推荐文章</text>
				<text class="user_home_content_header_right">更多 ></text>
			</view>
			<view class="user_home_content_main">
				<view class="user_home_content_main_item" v-for="(item,key) in 10" @click="href(key)">
					<view class="user_home_content_main_item_img">
						<image src="../../static/images/user/图层%206.png" mode=""></image>
					</view>
					<view class="user_home_content_main_item_text">
						<text class="user_home_content_main_item_text_one">开学后如何才能寻思脱单？开学后如何才能寻思脱单</text>
						<view class="user_home_content_main_item_text_footer">
							<text>浏览 17.9w</text>
							<text>回答 563</text>
						</view>
					</view>
					<view class="user_home_content_main_item_right">
						<image src="../../static/images/user/user_home_content_main_item_right.png"></image>
					</view>
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
				tab: ['全站', '科学', '数码', '体育', '时尚'],
			}
		},
		methods: {
			home_Tabclick(key) { //导航栏切换
				this.index = key
			},
			href(key) {
				uni.navigateTo({
					url: 'article?id=' + key
				})
			}
		},
		mounted() {
			this.$request('/api/getBannerInfoByType', {
				type: 0
			}).then(respone=>{
				console.log(respone)
			})
		}
	}
</script>

<style lang="less">
	.user_home_header {
		background: white;
		padding: 10px 0;

		swiper {
			height: 200px;

			image {
				width: 100%;
				height: 100%;
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
				height: 35px;
				padding-right: 10px;
			}

			swiper {
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
							max-width: 180px;
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

				.user_home_notice_icon_radius {
					width: 9px;
					margin-top: 3px;
					height: 9px;
					background: red;
					border-radius: 20px;

				}

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
		display: flex;
		background: white;

		.user_home_classification_item {
			width: 20%;
			height: 40px;
			font-size: 13px;
			padding: 2px 5px;
			text-align: center;
		}

		.user_home_classification_item_hover {
			background: url(../../static/images/user/user_home_classification_item_hover.png) no-repeat;
			background-size: 100%;
			color: white;
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
				content: counter(sectioncounter);
				counter-increment: sectioncounter;
				position: relative;
				top: -5px;
				color: #989898;
				left: -20px;
			}

			.user_home_content_main_item {
				width: 83%;
				margin: 10px auto;
				margin-right: 7%;
				display: flex;
				padding: 20px 10px;
				border-radius: 10px;
				background: white;

				.user_home_content_main_item_img {
					width: 20%;

					image {
						width: 60px;
						height: 60px;
					}
				}

				.user_home_content_main_item_text {
					width: 60%;
					padding-left: 10%;

					.user_home_content_main_item_text_one {
						font-weight: bold;
						font-size: 14px;
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
						padding: 10px 0;

						text {
							padding-right: 20px;
							font-size: 12px !important;
							font-weight: 100 !important;
							color: #999999;
						}
					}
				}

				.user_home_content_main_item_right {
					width: 10%;

					image {
						position: relative;
						top: 20px;
						left: 30px;
						background: #1246FF;
						width: 15px;
						height: 15px;
						padding: 5px;
						border-radius: 5px;
					}
				}


			}

		}
	}
</style>
