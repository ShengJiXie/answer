<template>
	<view class="user_order">
		<view class="user_order_main">
			<view class="user_order_main_item" v-for="item in list" :key='item[0]' @click="$store.commit('GlobalUrl','/pages/user/put?id='+item.subscribe_id)">
				<view class="user_order_main_item_header">
					<van-cell :title="item.typeName" :icon="item.sub_type===0?'../../../../static/images/user/order_user.png':'../../../../static/images/user/order_order.png'"
					 is-link />
				</view>
				<view class="user_order_main_item_center">
					<view class="user_order_main_item_center_item">
						<text class="left">预约姓名：</text>
						<text class="right">{{item.name}}</text>
					</view>
					<view class="user_order_main_item_center_item">
						<text class="left">联系电话：</text>
						<text class="right">{{item.tel}}</text>
					</view>
					<view class="user_order_main_item_center_item">
						<text class="left">预约时间：</text>
						<text class="right">{{item.sub_time}}</text>
					</view>
				</view>
			</view>
			<!-- 	<view class="user_order_main_item">
				<view class="user_order_main_item_header">
					<van-cell title="预约类型：挂号预约" icon="../../../../static/images/user/order_order.png" is-link />
				</view>
				<view class="user_order_main_item_center">
					<view class="user_order_main_item_center_item">
						<text class="left">预约姓名：</text>
						<text class="right">李先生</text>
					</view>
					<view class="user_order_main_item_center_item">
						<text class="left">联系电话：</text>
						<text class="right">188888888888</text>
					</view>
					<view class="user_order_main_item_center_item">
						<text class="left">联系时间：</text>
						<text class="right">2020-09-20</text>
					</view>
				</view>
			</view> -->
		</view>
		<view class="user_order_footer" @click="$store.commit('GlobalUrl','put')">
			<van-icon name="add-o" color="#1569E4" size="30px" />
			<text>点我预约</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			};
		},
		onShow() {
			this.list = uni.getStorageSync('SubscrList').data
		}
	}
</script>

<style lang="less">
	page {
		background: white;
	}

	.user_order {
		.cell-index--van-cell__left-icon {
			font-size: 30px;
		}

		.van-cell__title {
			color: #818181;
		}

		width: 100%;

		.user_order_main {
			width: 95%;
			padding: 20px 2.5%;

			.user_order_main_item {
				width: 100%;
				background: #FFFFFF;
				border: 1px solid #C7C7C7;
				margin: 20px 0;
				opacity: 0.98;
				border-radius: 5px;

				.user_order_main_item_header {
					font-size: 15px;
					.van-cell {
						background: #F3F3F3 !important;
					}
				}

				.user_order_main_item_center {
					width: 90%;
					margin: 0 auto;
					padding: 10px 20px;

					.user_order_main_item_center_item {
						color: #9F9F9F;
						font-size: 15px;
						display: flex;
						height: 40px;
						line-height: 40px;
						justify-content: space-between;

						.left {
							width: 30%;
						}

						.right {
							width: 80%;
							padding-left: 10px;
							color: #1E1E1E;
							border-bottom: 1px solid #e5e5e5;
						}
					}

					.user_order_main_item_center_item:nth-child(3) {
						.right {
							border-bottom: 0px;
						}
					}
				}
			}
		}

		.user_order_footer {
			position: fixed;
			bottom: 60px;
			right: 30px;
			width: 80px;
			text-align: center;

			text {
				display: block;
				color: #1569E4;
				font-size: 16px;
			}
		}
	}
</style>
