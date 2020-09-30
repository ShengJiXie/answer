<template>
	<view class="user_helpArticle" v-if="state">
		<view class="user_helpArticle_h1_main">
			<text class="user_helpArticle_h1">
				{{arr.questionInfo.title}}
			</text>
		</view>
		<!-- 发布人 -->
		<view class="user_helpArticle_avatar">
			<image :src="arr.questionInfo.avatar"></image>
			<text>{{arr.questionInfo.name}}</text>
		</view>

		<!-- 内容 -->
		<view class="user_helpArticle_center">
			<text>{{arr.questionInfo.info}}</text>
			<!-- <rich-text :nodes="arr.questionInfo.info"></rich-text> -->
		</view>
		<view class="user_helpArticle_img">
			<image v-for="item in arr.questionInfo.picture" :key="item[0]" :src="item"></image>
		</view>
		<!-- 底部 -->
		<view class="user_helpArticle_footer">
			<text>编辑于{{arr.questionInfo.create_at}}</text>
		</view>

		<van-divider contentPosition="center">评论区</van-divider>

		<view class="user_helpArticle" v-for="item in arr.answerInfo" :key='item[0]'>
			<!-- 发布人 -->
			<view class="user_helpArticle_avatar">
				<image :src="item.avatar"></image>
				<text style="color: #808080;">{{iten.name}}</text>
			</view>
			<!-- 内容 -->
			<view class="user_helpArticle_center">
				<text>{{item.answer}}</text>
			</view>
			<view class="user_helpArticle_img">
				<image v-for="items in item.picture" :key="items[0]" :src="items"></image>
			</view>
			<!-- 底部 -->
			<view class="user_helpArticle_footer">
				<text>编辑于{{item.create_time}}</text>
			</view>
		</view>
		<view v-if="arr.answerInfo===null" style="text-align: center;">
			<text style="color: #808080;font-size: 12px;">暂无评论</text>
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
		onLoad(option) {
			this.init(option.id)
		}
	}
</script>

<style lang="less">
	page {
		background: white;
		font-family: 'SourceHanSansSC-Regular';
	}

	.user_helpArticle {
		width: 90%;
		margin: 0px auto;
		padding: 20px 0;
		border-bottom: 1px solid #E5E5E5;

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
			margin: 30px 0;
			line-height: 30px;
		}

		// 底部
		.user_helpArticle_footer {
			width: 100%;
			color: #9A9A9A;

			text {
				font-size: 13px;
			}
		}

		.user_helpArticle_img {
			image {
				width: 80px;
				height: 80px;
			}
		}
	}
</style>
