(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/global/form"],{"0f2a":function(t,e,i){"use strict";var s;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){return s}));var a=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e,i){var s=arguments[arguments.length-1].currentTarget.dataset,a=s.eventParams||s["event-params"];i=a.item;return t.$store.commit("GlobalUrl","/pages/user/helpArticle?id="+i.id)},t.e1=function(e,i){var s=arguments[arguments.length-1].currentTarget.dataset,a=s.eventParams||s["event-params"];i=a.item;return t.$store.commit("GlobalUrl","/pages/global/help?id="+i.id)},t.e2=function(e,i){var s=arguments[arguments.length-1].currentTarget.dataset,a=s.eventParams||s["event-params"];i=a.item;return t.$store.commit("GlobalUrl","/pages/user/helpArticle?id="+i.id)},t.e3=function(e,i){var s=arguments[arguments.length-1].currentTarget.dataset,a=s.eventParams||s["event-params"];i=a.item;return t.$store.commit("GlobalUrl","/pages/user/helpArticle?id="+i.id)},t.e4=function(e,i){var s=arguments[arguments.length-1].currentTarget.dataset,a=s.eventParams||s["event-params"];i=a.item;return t.$store.commit("GlobalUrl","/pages/user/helpArticle?id="+i.id)})},n=[]},"676a":function(t,e,i){},"98e6":function(t,e,i){"use strict";(function(t){i("c632");s(i("66fd"));var e=s(i("c03d"));function s(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},c03d:function(t,e,i){"use strict";i.r(e);var s=i("0f2a"),a=i("dfb0");for(var n in a)"default"!==n&&function(t){i.d(e,t,(function(){return a[t]}))}(n);i("cf07");var o,r=i("f0c5"),l=Object(r["a"])(a["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],o);e["default"]=l.exports},cf07:function(t,e,i){"use strict";var s=i("676a"),a=i.n(s);a.a},dfb0:function(t,e,i){"use strict";i.r(e);var s=i("ebc2"),a=i.n(s);for(var n in s)"default"!==n&&function(t){i.d(e,t,(function(){return s[t]}))}(n);e["default"]=a.a},ebc2:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=getApp().globalData,s={data:function(){return{fileList:[],active:0,type:0,state:!1,list:[],text:i.form_text,show:!1,title:i.form_title,scout:0,expert:[],lists:[],help:null,picture:i.form_picture,getQuestionTypes:[],person_store:this.$store.state,rabclick:[]}},methods:{textChange:function(t){this.text=t.detail},tabClick:function(){0===this.type?this.type=1:this.type=0},imgdelet:function(t){this.picture.splice(t.detail.index,1)},helpClick:function(e){var i=this;this.$api.ApiPost({type:203,date:{member_id:this.$store.state.member_id,expertId:e,questionId:this.help}}).then((function(e){t.showToast({title:e.msg,duration:3e3}),i.showClick(),i.api()}))},api:function(){var e=this;this.$api.ApiPost({type:22,date:{member_id:this.$store.state.member_id,question_status:0,role:this.$store.state.type,page:1}}),this.$api.ApiPost({type:22,date:{member_id:this.$store.state.member_id,question_status:1,role:this.$store.state.type,page:1}}).then((function(i){e.list=t.getStorageSync("PersonHelp0").data.data,e.lists=t.getStorageSync("PersonHelp1").data.data,e.$scope.setData({list:e.list,lists:e.lists})}))},showClick:function(t,e){this.show?this.show=!1:this.show=!0,0===t&&(this.help=this.list[e].id,this.$scope.setData({help:this.help}))},afterRead:function(e){var i=this;this.$api.ApiPost({type:666,date:{file:e.target.file.path}}).then((function(e){console.log(e);var s=JSON.parse(e[1].data);0===s.code&&t.showToast({title:s.msg,duration:3e3}),i.picture.push({url:s.url,deletable:!0})}))},submitform:function(){null!=this.title&&""!=this.title&&null!=this.text&&""!=this.text?(t.showLoading({title:"发起支付中"}),this.$api.ApiPost({type:205,date:{ids:this.rabclick,content:{member_id:this.$store.state.member_id,title:this.title,info:this.text,picture:this.picture}}}).then((function(e){t.requestPayment({provider:"wxpay",timeStamp:e.data.timeStamp,nonceStr:e.data.nonceStr,package:e.data.package,signType:"MD5",paySign:e.data.paySign,success:function(e){t.switchTab({url:"/pages/user/home"})},fail:function(e){t.switchTab({url:"/pages/user/home"})},complete:function(e){t.hideLoading()}})}))):t.showToast({title:"请填写问题标题和内容!",duration:3e3,icon:"none"})},tabClicks:function(t){this.getQuestionTypes[t].hover?(this.getQuestionTypes[t].hover=!1,this.rabclick.splice(this.rabclick.lastIndexOf(this.getQuestionTypes[t].id),1)):(this.getQuestionTypes[t].hover=!0,this.rabclick.push(this.getQuestionTypes[t].id)),this.$scope.setData({getQuestionTypes:this.getQuestionTypes})}},watch:{text:function(t){getApp().globalData.form_text=t},title:function(t){getApp().globalData.form_title=t},picture:function(t){getApp().globalData.form_picture=t}},onShareAppMessage:function(){return console.log(),{title:"",imageUrl:"",url:"/pages/global/form"}},onShow:function(){var e=this,i=getApp().globalData;this.title=i.form_title,this.text=i.form_text,this.picture=i.form_picture,t.getStorageSync("PersonInfo")&&this.$store.commit("InfoStep");var s=this;if(this.$api.ApiPost({type:113}).then((function(t){s.scout=t.data.pay_money})),-1===this.$store.state.type)t.redirectTo({url:"/pages/user/login"});else{this.getQuestionTypes=t.getStorageSync("getQuestionTypes").data;this.getQuestionTypes.forEach((function(t,i){e.getQuestionTypes[i].hover=!1})),this.api(),this.state=!0}2===this.$store.state.type&&this.$api.ApiPost({type:202}).then((function(t){e.expert=t.data}))}};e.default=s}).call(this,i("543d")["default"])}},[["98e6","common/runtime","common/vendor"]]]);