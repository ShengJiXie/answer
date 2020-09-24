<template>
	<!-- 档案列表 -->
	<view class="user_archives">
		<view class="user_archives_header">
			<view class="user_archives_header_top">
				<text>编号：13333333333</text>
				<image src="../../static/images/user/edits.png" style="width: 15px;height: 16px;"></image>
			</view>
			<view class="user_archives_header_two">
				<text>创建时间：2020-09-20</text>
			</view>
		</view>
		<van-cell title="某某" icon="../../../../static/images/user/cells.png" title-style="font-weight:bold" is-link
		 arrow-direction="up" />
		<view class="user_archives_center">
			<van-cell title="慢性病史" icon="../../../../static/images/user/center1.png" title-style="font-weight:bold" value="未完善"
			 is-link />
			<van-cell title="生活习惯" icon="../../../../static/images/user/center2.png" title-style="font-weight:bold" value="未完善"
			 is-link />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="less">
	.user_archives {
		.van-cell {
			padding: 23px;
		}

		.van-icon--image {
			padding-bottom: 8px;
			padding-right: 10px;
		}

		.user_archives_header {
			padding: 30px 30px 20px 20px;
			border-bottom: 1px solid #C7C7C7;
			background: white;
			color: #070707;
			font-size: 14px;

			.user_archives_header_top {
				display: flex;
				padding: 10px 0;
				justify-content: space-between;
			}
		}

		.user_archives_center {
			width: 100%;
			margin-top: 10px;
			background: white;
			min-height: 480px;
			.van-icon__image{
				width: 25px;
				height: 25px;
				padding-right: 5px;
				}
			.van-cell {
				padding: 10px 20px;
			}

			.van-cell__value {
				color: red !important;
			}
		}

	}
</style>
