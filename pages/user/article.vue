<template>
	<view class="user_article">
		<view class="user_article_h1_main">

			<text class="user_article_h1">
				如何看待宠物狗跑下楼被保安当无证犬 虐杀？
			</text>
		</view>
		<!-- 发布人 -->
		<view class="user_article_avatar">
			<view class="user_article_avatar_img">
				<image src="../../static/images/user/avater.png"></image>
			</view>
			<view class="user_article_avatar_center">
				<text class="user_article_avatar_center_h1">不知名网友</text>
				<text class="user_article_avatar_center_p">阅读13.1万</text>
			</view>

			<view class="user_article_avatar_right">
				<image src="../../static/images/user/start.png"></image>
			</view>
		</view>
		<!-- 内容 -->
		<view class="user_article_center">
			<text>
				先上观点: 养犬人为他的不负责任付出了代价。 保安做的不合法，需要依法赔偿，并交纳罚款。
			</text>
		</view>
		<!-- 底部 -->
		<view class="user_article_footer">
			<text>编辑于09-09</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		onLoad(option) {
			console.log(option)
		}
	}
</script>

<style lang="less">
	page {
		background: white;
		font-family: 'SourceHanSansSC-Regular';
	}

	.user_article {
		width: 90%;
		margin: 0px auto;
		padding: 20px 0;
		border-bottom: 1px solid #E5E5E5;

		.user_article_h1_main {
			.user_article_h1 {
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

		// 发布者
		.user_article_avatar {
			display: flex;

			.user_article_avatar_img {
				width: 15%;

				image {
					width: 40px;
					height: 40px;
					border-radius: 50%;
				}
			}

			.user_article_avatar_center {
				width: 75%;
				display: grid;

				.user_article_avatar_center_h1 {
					font-weight: 600;
				}

				.user_article_avatar_center_p {
					color: #6B6969;
					font-size: 12px;
				}
			}

			.user_article_avatar_right {
				width: 10%;

				image {
					padding-top: 10px;
					width: 20px;
					height: 20px;
				}
			}
		}

		// 内容
		.user_article_center {
			width: 100%;
			margin: 30px 0;
			line-height: 30px;
		}

		// 底部
		.user_article_footer {
			width: 100%;
			color: #9A9A9A;

			text {
				font-size: 13px;
			}
		}
	}
</style>
