<template>
	<!-- 档案列表 -->
	<view class="user_archives" v-show='stateWeb'>
		<view class="user_archives_header">
			<view class="user_archives_header_top">
				<text>编号：{{list.record_id}}</text>
				<image src="../../static/images/user/edits.png" @click="$store.commit('GlobalUrl','/pages/user/family?type=3&&id='+list.record_id)"
				 style="cursor: pointer;width: 15px;height: 16px;"></image>
			</view>
			<view class="user_archives_header_two" style="display: flex;justify-content: space-between;">
				<text>创建时间：{{list.create_at}}</text>
				<van-icon name="close" size='20px' color='#9e9e9e' style='padding-left:2px;' v-if='id!=0' @click='removes' />
			</view>
		</view>
		<van-cell :title="list.name" icon="../../../../static/images/user/cells.png" title-style="font-weight:bold" is-link
		 :arrow-direction="state?'down':'up'" @click="onOpen" />
		<view class="openAlert" v-show="state">
			<view class="">
				<van-cell-group>
					<van-field :value="list.identity_id" label="身份证号码:" readonly />
				</van-cell-group>
				<van-cell-group>
					<van-field :value="list.name" label="姓名:" readonly />
				</van-cell-group>
				<van-cell-group>
					<van-field :value="list.gender" label="性别:" readonly />
				</van-cell-group>
				<van-cell-group>
					<van-field :value="list.name" label="手机号码:" readonly />
				</van-cell-group>
				<van-cell-group>
					<van-field :value="list.company_id" label="企业编号:" readonly />
				</van-cell-group>
				<van-cell-group>
					<van-field :value="list.company" label="企业单位:" readonly />
				</van-cell-group>
				<van-cell-group>
					<van-field :value="list.marital_status==0?'未知':list.marital_status==1?'已婚':'未婚'" label="婚姻状况:" readonly />
				</van-cell-group>
				<van-cell-group>
					<van-field :value="list.is_drug" label="过敏药物:" readonly />
				</van-cell-group>
				<van-cell-group>
					<van-field :value="list.medical_history?list.medical_history:'暂无内容~'" type='textarea' label="病史描述:" readonly />
				</van-cell-group>
			</view>
		</view>


		<view class="user_archives_center">
			<van-cell title="慢性病史" :value="list.Chronic_id!=null?'已完善':'未完善'" icon="../../../../static/images/user/center1.png"
			 :url='"/pages/global/mx?id="+list.record_id+"&&type=1&&ids="+list.Chronic_id' title-style="font-weight:bold"
			 is-link />
			<van-cell title="生活习惯" :value="list.liveCus_id!=null?'已完善':'未完善'" icon="../../../../static/images/user/center2.png"
			 :url='"/pages/global/xg?type=2&&id="+list.record_id+"&&ids="+list.liveCus_id' title-style="font-weight:bold"
			 is-link />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				accname: this.$store.state.member_id,
				state: false,
				stateWeb: false,
				id: 0
			};
		},
		onShow() {
			if (this.id === 0) {
				if (uni.getStorageSync('PersonInfo').data.record_id != -1) {
					// 获取我的档案详情
					this.$api.ApiPost({
						type: 23,
						date: {
							record_id: uni.getStorageSync('PersonInfo').data.record_id //临时数据
						}
					}).then(res => {
						this.stateWeb = true;
						this.list = uni.getStorageSync('PersonArchives').data
					})
				} else {
					uni.showToast({
						title: '请先创建档案',
						icon: 'none',
						duration: 2000
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/user/family?type=2'
						})
					}, 2000)
				}
			} else {
				// 获取我的档案详情
				this.$api.ApiPost({
					type: 23,
					date: {
						record_id: this.id
					}
				}).then(res => {
					this.stateWeb = true;
					this.list = res.data
				})
			}
		},
		onLoad(e) {
			if (e.id) {
				this.id = Number(e.id)
			}
		},
		methods: {
			onOpen(e) {
				this.state ? this.state = false : this.state = true
			},
			removes() {
				this.$api.ApiPost({
					type: 613,
					date: {
						record_id: this.id
					}
				}).then(res => {
					uni.showToast({
						title: res.msg,
						duration: 3000
					})
					// 获取家人的档案详情
					this.$api.ApiPost({
						type: 24,
						date: {
							member_id: this.$store.state.member_id //临时数据
						}
					})
					setTimeout(() => {
						uni.navigateBack({
							url: '/pages/user/family'
						})
					}, 2000)
				})
			}
		},

	}
</script>

<style lang="less">
	.user_archives {
		.van-cell {
			padding: 10px 20px;
		}

		.openAlert {
			width: 100%;

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

			.van-icon__image {
				width: 25px;
				height: 25px;
				padding-right: 5px;
			}

			.van-cell {
				padding: 10px 20px;
			}
		}

	}
</style>
