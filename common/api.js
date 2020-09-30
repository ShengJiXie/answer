import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 引入封装的request请求
import request from 'common/request.js'
const ApiPost = obj => {
	//10 首页 11首页分类 12 文章详情
	return new Promise((resolve, reject) => {
		try {
			let dataObj = {}
			if (obj.type === 10) {
				// 首页banner
				request('api/getBannerInfoByType', 'HomeBanner', {
					type: 0
				}, 'GET').then(respone => {
					uni.setStorageSync('HomeBanner', respone);
				})
				// 首页新闻公告
				request('api/getAdvertising', 'HomeNotice').then(respone => {
					uni.setStorageSync('HomeNotice', respone);
				})
				// 首页资讯分类
				request('api/getNewsType', 'HomeType').then(respone => {
					uni.setStorageSync('HomeType', respone);
					dataObj = respone.data[0].id
					resolve(dataObj)
				})
			} else if (obj.type === 11) {
				// 首页资讯分类文章列表
				request('api/getNewsByType', 'HomeText', obj.date, 'GET').then(respone => {
					let arr = respone;
					arr.code = 1;
					uni.setStorageSync('HomeText', arr);
					resolve(arr)
				})
			} else if (obj.type === 12) {
				// 文章资讯详情页
				request('api/getNewsById', 'HomeContent', obj.date, 'GET').then(respone => {
					let arr = respone;
					arr.code = 1;
					uni.setStorageSync('HomeContent', arr);
					resolve(arr)
				})
			} else if (obj.type === 13) {
				// 文章收藏功能
				request('api/collectNews', 'textStar', obj.date, 'GET').then(respone => {
					resolve(respone)
				})
			} else if (obj.type === 14) {
				// 修改个人信息
				request('api/updateUserInfo', 'PersonInfo_handle', obj.date, 'POST').then(respone => {
					resolve(respone)
				})

			} else if (obj.type === 201) {
				// 获取个人信息
				request('api/getUserInfo', 'getUserInfo', obj.date, 'GET').then(respone => {
					let arr = respone;
					arr.code = 1;
					uni.setStorageSync('getUserInfo', arr);
					resolve(arr)
				})

			} else if (obj.type === 200) {
				// 微信登录
				request('api/weChatAuthLogin', 'PersonInfo', obj.date, 'POST').then(respone => {
					uni.setStorageSync('PersonInfo', respone);
					resolve(respone)

				})
			} else if (obj.type === 666) {
				// 图片上传
				request('api/uploadImage', 'img', obj.date, 'POST').then(respone => {

					resolve(respone)
				})
			} else if (obj.type === 20) {
				// 获取预约信息
				request('api/getSubscribeList', 'SubscrList', obj.date).then(respone => {
					uni.setStorageSync('SubscrList', respone);
					let arr = respone;
					arr.code = 1;
					uni.setStorageSync('SubscrList', arr);
					resolve(arr)
				})
			} else if (obj.type === 21) {
				// 新增预约表单提交
				request('api/addSubscribe', 'SubscrForm', obj.date, 'POST').then(respone => {
					resolve(respone)
				})
			} else if (obj.type === 22) {
				if (obj.date.question_status === 0) {
					// 获取未回答问题
					request('api/getMyQuestion', 'PersonHelp0', obj.date, 'GET').then(respone => {
						let arr = respone;
						arr.code = 1;
						uni.setStorageSync('PersonHelp0', arr);
						resolve(respone)
					})
				} else {
					// 获取未回答问题
					request('api/getMyQuestion', 'PersonHelp1', obj.date, 'GET').then(respone => {
						let arr = respone;
						arr.code = 1;
						uni.setStorageSync('PersonHelp1', arr);
						resolve(respone)
					})
				}

			} else if (obj.type === 62) {
				// 专家管理员登录
				request('api/accountLogin', 'accountLogin', obj.date, 'POST').then(respone => {
					resolve(respone)
				})
			} else if (obj.type === 23) {
				// 获取我的档案
				request('api/getRecordInfoById', 'PersonArchives', obj.date, 'GET').then(respone => {
					let arr = respone;
					arr.code = 1;
					uni.setStorageSync('PersonArchives', arr);
					resolve(arr)
				})
			} else if (obj.type === 202) {
				// 获取专家列表
				request('api/getAllExpert', 'getAllExpert', {}, 'GET').then(respone => {
					resolve(respone)
				})
			} else if (obj.type === 203) {
				// 问题转接列表
				request('api/transferProblem', 'transferProblem', obj.date, 'GET').then(respone => {
					resolve(respone)
				})
			} else if (obj.type === 204) {
				// 获取提问分类列表
				request('api/getQuestionTypes', 'getQuestionTypes', obj.date, 'GET').then(respone => {
					uni.setStorageSync('getQuestionTypes', respone);
					resolve(respone)
				})
			} else if (obj.type === 205) {
				// 支付提问
				request('api/addQuestion', 'addQuestion', obj.date, 'POST').then(respone => {
					resolve(respone)
				})
			} else if (obj.type === 206) {
				// 问题详情
				request('api/getQuestionInfo', 'getQuestionInfo', obj.date, 'GET').then(respone => {
					resolve(respone)
				})
			} else if (obj.type === 207) {
				// 问题详情
				request('api/answerQuestion', 'answerQuestion', obj.date, 'POST').then(respone => {
					resolve(respone)
				})
			} else if (obj.type === 24) {
				// 获取家人档案
				request('api/getFamilyRecord', 'PersonArchivesFamily', obj.date, 'GET').then(respone => {
					let arr = respone;
					arr.code = 1;
					uni.setStorageSync('PersonArchivesFamily', arr);
					resolve(arr)
				})
			} else if (obj.type === 60) {
				// 提交家人档案表单 
				request('api/addMyRecordInfo', 'addMyRecordInfo', obj.date, 'POST').then(respone => {
					resolve(respone)
				})
			} else if (obj.type === 40) {
				// 管理员登录
				request('api/addMyRecordInfo', 'AdminInfo', obj.date, 'POST').then(respone => {
					resolve(respone)
				})
			} else if (obj.type === 99) {
				// 判断手机号是否已绑定
				request('api/checkUserTel', 'checkUserTel', obj.date).then(respone => {
					resolve(respone)
				})
			} else if (obj.type === 100) {
				// 绑定手机号
				request('api/updateTel', 'updateTel', obj.date, 'POST').then(respone => {
					resolve(respone)
				})
			}

			setTimeout(function() {
				uni.hideLoading();
			}, 200);
		} catch (e) {
			//TODO handle the exception
			console.error(e)
			uni.showToast({
				title: '系统繁忙!',
				duration: 3000
			})
		}
	})
}
module.exports = {
	ApiPost
}
