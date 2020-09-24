<template>
	<!-- 家人档案 -->
	<view class="user_family">
		<view class="user_family_center" v-if="type===0">
			<view class="user_family_center_item">
				<view class="user_family_center_item_text">
					<text>邱天</text>
					<van-icon name="../../../../static/images/user/myuser.png" color="#1569E4" size="20px" />
					<text>23</text>
				</view>
			</view>
			
		</view>
		<view class="user_family_header" v-if="type===0">
			<van-button plain block icon="add-o" size="large" type="info" @click="AddFamily">添加家人</van-button>
		</view>
		
		<view class="user_family_form" v-if="type===1">
			<form @submit="" @reset="">
				<van-cell-group>
					<van-field :value="key" required label="身份证号码" placeholder="请输入身份证号码" bind:click-icon="onClickIcon" />
					<van-field :value="name" type="text" label="姓名" placeholder="请输入姓名" required />
					<van-field :value="phone" type="text" label="手机号码" placeholder="请输入手机号码" />
					<van-field :value="code" type="text" label="企业编号" icon="warning-o" placeholder="请输入手机号码" />
				</van-cell-group>
				<view class="user_family_form_radio">
					<text style="color: #646566;font-size: 14px;padding-left: 5px;">婚姻情况:</text>
					<view class="user_family_form_radio_item">
						<view v-for="(item,key) in ['已婚','未婚','未知']" :class="marriage===key?'user_family_form_radio_item_li hover':'user_family_form_radio_item_li'"
						 @click="radioMarriage(key)">
							<text>{{item}}</text>
						</view>
					</view>
				</view>
				<view class="user_family_form_radio">
					<text style="color: #646566;font-size: 14px;padding-left: 5px;">过敏药物:</text>
					<view class="user_family_form_radio_item">
						<view v-for="(item,key) in ['无','有']" :class="allergy===key?'user_family_form_radio_item_li hover':'user_family_form_radio_item_li'"
						 @click="radioAllergy(key)">
							<text>{{item}}</text>
						</view>
					</view>
				</view>
				<view class="user_family_form_text">
					<text style="color: #646566;font-size: 14px;padding-left: 5px;">病史描述:</text>
					<view class="textarea">
						<textarea :value="desc" placeholder="请填写病史描述:"></textarea>
						<view class="textarea_footer">
							<van-uploader :file-list="fileList" @afterRead="afterRead">
								<view class="textarea_footer_imgupload">
									<van-icon name="photo-o" color="#1569E4" size="30px" />
									<text>图片</text>
								</view>
								<view class="textarea_footer_imgupload">
									<van-icon name="../../../../static/images/user/pz.png" color="#1569E4" size="30px" />

									<text>拍照</text>
								</view>
							</van-uploader>
						</view>
					</view>
					<button type="default" class="user_family_button" form-type="submit">保存</button>
						</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				key: null,
				name: null,
				phone: null,
				code: null,
				marriage: 2, //婚姻情况  0已婚 1未婚 2未知
				allergy: 0, //过敏药物 0 无 1 有
				desc: null, //病史描述
				fileList: [],
				type: 0, //页面进度 0 未为家人列表 1 为新增家人
			};
		},
		methods: {
			radioMarriage(v) {
				this.marriage = v
			},
			radioAllergy(v) {
				this.allergy = v
			},
			afterRead(event) {
				const {
					file
				} = event.detail;
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				this.fileList.push(event.detail.file.path)
			},
			AddFamily() {
				this.type === 0 ? this.type = 1 : this.type = 0
			}
		}
	}
</script>

<style lang="less">
	page{
		background: white;
	}
	.user_family {
		.user_family_center{
			padding: 20px 0;
			width: 100%;
			.user_family_center_item{
				width: 90%;
				margin: 0 auto;
				border-radius: 10px;
				background: #f3f8ff;
				height: 80px;
				.user_family_center_item_text{
					width: 40%;
					margin: 0 auto;
					display: flex;
					text-align: center;
					font-size: 18px;
					line-height: 70px;
					
					justify-content: space-around;
				}
			}
		}
		.user_family_header {
			width: 80%;
			margin: 20px auto;

			.van-button__icon {
				padding-top: 2px;
			}
		}

		.van-field__icon-root {
			color: #1569E4 !important;
		}

		.user_family_form {
			padding: 0 2.5%;
			width: 95%;
			background: white;
			.user_family_form_text {
				display: grid;
				background: white !important;
				border-radius: 1px;
				color: #9A9A9A;
				padding: 10px;

				text {
					padding-bottom: 10px;
				}

				.textarea {
					padding: 10px;
					width: 95%;
					margin: 0 auto;
					font-size: 13px;
					border: 1px solid #EDEDED;

					textarea {
						width: 100%;
					}

					.textarea_footer {
						padding: 10px 10px;
						border-top: 1px solid #EDEDED;

						.textarea_footer_imgupload {
							display: grid;
							margin: 10px 20px 5px 20px;
							float: left;

							text {
								padding: 1px 0;
								text-align: center;
							}

							color: #070707;
						}
					}
				}
			}
		}

		.user_family_button {
			width: 80%;
			margin: 20px auto;
			color: white !important;
			background: #5480FF !important;
			border-radius: 20px !important;
		}

		.user_family_form_radio {
			padding: 10px 10px;
			display: flex;
			background: white;
			border-bottom: 1px solid #EDEDED;
			border-radius: 5px;

			.user_family_form_radio_item {
				display: flex;
				padding-left: 30px;

				.user_family_form_radio_item_li {
					width: 58px;
					height: 24px;
					background: #F9F9F9;
					border-radius: 1px;
					margin: 0 5px;
					text-align: center;
					color: #9A9A9A;

					text {
						font-size: 14px;
					}
				}

				.hover {
					background: #E7F1FF;
					color: #006CFF;
				}
			}
		}
	}
</style>
