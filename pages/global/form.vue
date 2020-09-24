<template>
	<view class="user_form" v-if="store.type==-1||store.type==0">
		<form @submit="" @reset="">
			<view class="user_form_main">
				<view class="user_form_title">
					<input type="text" value="" placeholder="请输入问题" />
				</view>
				<view class="user_form_content">
					<textarea @blur="bindTextAreaBlur" v-if="store.type==0" placeholder="写输入您的问题,保持文字简练,表达清晰"></textarea>
					<textarea @blur="bindTextAreaBlur" v-else placeholder="写输入您的问题,保持文字简练,表达清晰"></textarea>
				</view>
				<view class="user_form_img">
					<van-uploader :file-list="fileList" :deletable="true" @afterRead="afterRead" upload-icon="plus" />
				</view>
			</view>
		<van-divider contentPosition="center" customStyle="font-size:13px" v-if="store.type==0">问题价值<text style="color:#E3BA3D">￥50.00</text></van-divider>
			<button type="default" class="user_article_button" form-type="submit" v-if="store.type==0">支付提问</button>
			<button type="default" class="user_article_button" form-type="submit" v-if="store.type==2">提交</button>
<van-divider contentPosition="center" customStyle="font-size:11px" v-if="store.type==0">成为VIP会员即可<text style="color:#547FFF">免费提问></text></van-divider>
		</form>
	</view>
	
	<view class="global_help" v-else>
		<!-- Tab标签页 -->
		<view class="user_person_Tab">
			<view class="user_person_Tab_frist_button">
				<view class="user_person_Tab_view">
					<view :class="type===0?'user_person_Tab_frist_button_item user_person_Tab_frist_button_item_hover':'user_person_Tab_frist_button_item'"
					 @click="tabClick(0)">
						<text>未回答(3)</text>
					</view>
					<view :class="type===1?'user_person_Tab_frist_button_item user_person_Tab_frist_button_item_hover':'user_person_Tab_frist_button_item'"
					 @click="tabClick(1)">
						<text>已回答(3)</text>
					</view>
				</view>
			</view>

			<!-- 文章列表 -->
			<view v-if="person_store.type===1">
				<view class="user_person_center" v-for="item in arr">
					<view class="user_person_center_item">
						<view class="user_person_center_item_header">
							<image src="../../static/images/user/avater.png" style="width:20px;height:20px;border-radius: 50%;" mode="aspectFit"></image>
							<text class="h1">不知名网友</text>
							<text class="p">提出了问题</text>
						</view>
						<text class="user_person_center_item_h1">开学后如何才能迅速脱单开学后如何才能迅速脱单？</text>
						<view class="user_person_center_item_footer_icon" v-if="person_store.type==2||person_store.type==1">
							<van-button size="small" color="#0084FF" @click="showClick" custom-style="color:white;border-radius: 8px;margin-right:5px;font-size:14px;"
							 icon="../../../../static/images/user/user_zj.png" type="info">
								转接专家
							</van-button>
							<van-button size="small" color="#0084FF" custom-style="color:white;border-radius: 8px;font-size:14px;" icon="../../../../static/images/user/edit_white.png"
							 type="info">
								回答
							</van-button>
						</view>
					</view>
				</view>
				<view class="null_state" v-if="arr.length==0">
					<image src="../../static/images/global/null.png"></image>
					<text>目前还没有任何问题...</text>
				</view>
			</view>

			<!-- 文章列表结束 -->
			<!-- 文章列表 -->

			<view v-if="person_store.type===2">
				<view class="user_person_center" v-for="item in arr">
					<view class="user_person_center_item">
						<view class="user_person_center_item_header">
							<image src="../../static/images/user/avater.png" style="width:20px;height:20px;border-radius: 50%;" mode="aspectFit"></image>
							<text class="h1">不知名网友</text>
							<text class="p">提出了问题</text>
						</view>
						<text class="user_person_center_item_h1">开学后如何才能迅速脱单开学后如何才能迅速脱单？</text>
						<view class="user_person_center_item_footer_icon" v-if="person_store.type==2||person_store.type==1">
							<van-button size="small" color="#0084FF" @click="showClick" custom-style="color:white;border-radius: 8px;margin-right:5px;font-size:14px;"
							 icon="../../../../static/images/user/user_zj.png" type="info">
								转接专家
							</van-button>
							<van-button size="small" color="#0084FF" custom-style="color:white;border-radius: 8px;font-size:14px;" icon="../../../../static/images/user/edit_white.png"
							 type="info">
								回答
							</van-button>
						</view>
					</view>
				</view>
				<view class="null_state" v-if="arr.length==0">
					<image src="../../static/images/global/null.png"></image>
					<text>目前还没有任何问题...</text>
				</view>
			</view>

			<!-- 文章列表结束 -->
		</view>
		<!-- Tab标签页结束 -->
	</view>



</template>

<script>
	export default {
		data() {
			return {
				fileList: [],
				store: this.$store.state,
				active: 0,
				type: 0,
				arr: [],
				person_store: this.$store.state,
			};
		},
		methods: {
			bindTextAreaBlur: function(e) {
				console.log(e.detail.value)
			},
			tabClick() {
				this.type === 0 ? this.type = 1 : this.type = 0
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
	// tab 标签页
	.user_person_Tab {
		.van-ellipsis {
			font-size: 18px;
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
				font-size: 17px;
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
