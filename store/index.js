import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		name: '登录',
		type: 2, //-1 未登录 0 会员 1专家 2 管理员
		roleName: '管理员', //角色标识
		avatar: '../../static/images/user/avater.png', //头像
	},
	mutations: {
		GlobalUrl: function(v, e) {
			console.log(v,e)
			uni.navigateTo({
				url: e
			});
		},
		TabUrl: function(v, e) {
			uni.switchTab({
				url: e
			});
		}

	},
	actions: {}
})
export default store
