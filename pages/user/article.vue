<template>
	<view class="user_article" v-if="state">
		<view class="user_article_h1_main">

			<text class="user_article_h1">
				{{arr.newsInfo.news_title}}
			</text>
		</view>
		<!-- 发布人 -->
		<view class="user_article_avatar">
			<view class="user_article_avatar_center">
				<text class="user_article_avatar_center_p">阅读{{arr.newsInfo.views}}万</text>
			</view>

			<view class="user_article_avatar_right">
				<image @click="statrClick" :src="arr.isCollect===0?'../../static/images/user/start.png':'../../static/images/user/start_hover.png'"></image>
			</view>
		</view>
		<!-- 内容 -->
		<view class="user_article_center">
			<rich-text :nodes="arr.newsInfo.news_content"></rich-text>
		</view>
		<!-- 底部 -->
		<view class="user_article_footer">
			<text>编辑于{{arr.newsInfo.create_at}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arr: [],
				state: false,
				textId: 0
			};
		},
		onShow() {
			uni.showLoading({
				title: '加载中...'
			})
		},
		methods: {
			async init(option) {
				let _this = this
				await this.$api.ApiPost({
					type: 12,
					date: {
						news_id: option.id,
						member_id: _this.$store.state.member_id //临时用户id
					}
				});
				this.arr = uni.getStorageSync('HomeContent').data;

				this.state = true

			},
			// 收藏事件
			statrClick() {
				let _this = this
				this.$api.ApiPost({
					type: 13,
					date: {
						news_id: _this.textId,
						member_id: _this.$store.state.member_id
					}
				}).then(res => {
					console.log(res)
					_this.arr.isCollect = Number(res.data)
					uni.setStorageSync('HomeContent', {
						data: _this.arr
					});
					if (res.data === 1) {
						uni.showToast({
							title: '收藏成功',
							icon: 'success',
							duration: 2000
						})
					}
				})
			}
		},
		onLoad(option) {
			this.textId = option.id
			this.init(option)
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



			.user_article_avatar_center {
				width: 90%;
				display: grid;

				.user_article_avatar_center_p {
					color: #6B6969;
					font-size: 15px;
					line-height: 45px;
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
