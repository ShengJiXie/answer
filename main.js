import Vue from 'vue'
import App from './App'
//引入vuex
import store from './store'
// 引入封装的request请求
import request from 'common/request.js'
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$request = request

const app = new Vue({
	...App
})
app.$mount()
