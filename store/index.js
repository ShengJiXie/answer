import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 引入封装的request请求
import request from 'common/request.js'
const store = new Vuex.Store({
	state: {
		name: '登录',
		type: -1, //-1 未登录 0 会员 1专家 2 管理员
		roleName: '管理员', //角色标识
		avatar: '../../static/images/user/avater.png', //头像
		member_id:0, //用户id
	},
	mutations: {
		GlobalUrl: function(v, e) {
			console.log(v, e)
			uni.navigateTo({
				url: e
			});
		},
		TabUrl: function(v, e) {
			uni.switchTab({
				url: e
			});
		},
		InfoStep: function(v) {
			// 修改权限
			let data = uni.getStorageSync('PersonInfo').data
			this.state.name = data.name
			data.avatar != null ? this.state.avatar = data.avatar : null;
			this.state.type=data.role;
			this.state.member_id=data.member_id;
			this.state.roleName=data.roleName
		}

	},
	actions: {}
})
export default store
