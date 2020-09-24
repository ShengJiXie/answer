<template>
	<view class="user_info">
		<form class="forms" @submit="" @reset="">
			<view class="upload_img">
				<text class="label" style="padding-top: 10px;">头像</text>
				<van-uploader :file-list="fileList" @afterRead="afterRead" upload-icon="https://q1.qlogo.cn/g?b=qq&nk=2013143650&s=100"  preview-size="40px" />
			</view>
			<view class="user_info_item">
				<text class="label">用户名</text>
				<input type="text" value="" placeholder="请填写用户名" />
			</view>
			<view class="user_info_item">
				<text class="label">性别</text>
				<van-cell :title="user_type" is-link  border="false" @click="AlertClick"  />
				<van-action-sheet :show="show" :actions="actions" @close="onClose" @select="onSelect" >
				</van-action-sheet>	
			</view>
			<view class="user_info_item">
				<text class="label">生日</text>
				<input type="text" value="" placeholder="请填写生日" />
			</view>
			<view class="user_info_item">
				<text class="label">居住地</text>
				<input type="text" value="" placeholder="请填写居住地" />
			</view>	<view class="user_info_item">
				<text class="label">手机号</text>
				<input type="number" value="" placeholder="请填写手机号" />
			</view>
			<button form-type="submit" type="default" class="form_button">提交</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList: [],
				show: false,
				user_type:'保密',//用户性别
				actions: [{
						name: '男',
					},
					{
						name: '女',
					},{
						name: '保密',
					},
					// {
					// 	name: '选项',
					// 	subname: '副文本',
					// 	openType: 'share'
					// }
				]
			}
		},
		methods: {
			afterRead(event) {
				const {
					file
				} = event.detail;
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				wx.uploadFile({
					url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
					filePath: file.path,
					name: 'file',
					formData: {
						user: 'test'
					},
					success(res) {
						// 上传完成需要更新 fileList
						const {
							fileList = []
						} = this.data;
						fileList.push({ ...file,
							url: res.data
						});
						this.setData({
							fileList
						});
					},
				});
			},
			onClose() {
				this.show=false
			},
			onSelect(event) {
				this.user_type=event.detail.name;
				console.log(event.detail);
			},
			AlertClick(){
				this.show=true
			}
		}
	}
</script>

<style lang="less">
	.user_info {
		width: ceil(100%-5px);
		height: 100%;
		background: white;
		padding: 20px 10px;
		.forms {
			display: block;
			width: 90%;
			margin: 0 auto;
			padding: 10px;
			.form_button{
				color: white !important;
				background: #5480FF !important;
			}
			.label {
				font-size: 14px;
				color: #555555;
			}
			.van-cell--clickable,.van-cell{
				padding: 10px 0 10px  0 !important;	
			}
			.van-icon--image{
				width: 40px;
				height: 40px;
				image{
					border-radius: 65px;
				}
			}
			.upload_img {
				width: 100%;
				border-bottom: 1px solid #C7C7C7;
				display: flex;
				margin: 0 auto;
				padding: 10px 0px;
				justify-content: space-between;


			}

			.user_info_item {
				border: none ;
				padding: 20px 0;
				border-bottom: 1px solid #C7C7C7;

				input {
					padding: 10px 0;
				}
			}

			.van-uploader__upload {
				border-radius: 50%;
			}
		}
	}
</style>
