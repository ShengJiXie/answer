<template>
	<!-- 档案列表 -->
	<view class="user_archives">
		<view class="user_archives_header">
			<view class="user_archives_header_top">
				<text>编号：{{list.record_id}}</text>
				<image src="../../static/images/user/edits.png" style="width: 15px;height: 16px;"></image>
			</view>
			<view class="user_archives_header_two">
				<text>创建时间：{{list.create_at}}</text>
			</view>
		</view>
		<van-cell :title="list.name" icon="../../../../static/images/user/cells.png" title-style="font-weight:bold" is-link
		 :arrow-direction="state?'down':'up'" @click="onOpen" />
		<view class="openAlert" v-show="state">
			<view class="">
				<van-cell-group>
					<van-field :value="list.identity_id" label="身份证号码:"  readonly />
				</van-cell-group>
				<van-cell-group>
					<van-field :value="list.name" label="姓名:"  readonly />
				</van-cell-group>
				<van-cell-group>
					<van-field :value="list.gender" label="性别:"  readonly />
				</van-cell-group>
				<van-cell-group>
					<van-field :value="list.name" label="手机号码:"  readonly />
				</van-cell-group>
				<van-cell-group>
					<van-field :value="list.company_id" label="企业编号:"  readonly />
				</van-cell-group>
				<van-cell-group>
					<van-field :value="list.company" label="企业单位:"  readonly />
				</van-cell-group>
				<van-cell-group>
					<van-field :value="list.marital_status==0?'未知':list.marital_status==1?'已婚':'未婚'" label="婚姻状况:" 
					 readonly />
				</van-cell-group>
				<van-cell-group>
					<van-field :value="list.is_drug" label="过敏药物:"  readonly />
				</van-cell-group>
				<van-cell-group>
					<van-field :value="list.medical_history?list.medical_history:'暂无内容~'" type='textarea' label="病史描述:"  readonly />
				</van-cell-group>
			</view>
		</view>


		<view class="user_archives_center">
			<van-cell title="慢性病史" icon="../../../../static/images/user/center1.png" title-style="font-weight:bold" value="未完善"
			 is-link />
			<van-cell title="生活习惯" icon="../../../../static/images/user/center2.png" title-style="font-weight:bold" value="未完善"
			 is-link />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				accname: '1',
				state: false
			};
		},
		mounted() {
			this.list = uni.getStorageSync('PersonArchives').data
		},
		methods: {
			onOpen(e) {
				this.state ? this.state = false : this.state = true
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

			.van-cell__value {
				color: red !important;
			}
		}

	}
</style>
