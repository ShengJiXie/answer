<template>
	<!-- 预约页面 -->
	<view class="user_put">
		<view class="form">
			<view class="form_header">
				<view class="form_text">
					<van-cell-group>
						<van-cell title="预约类型" :value="type" size="large" @click="typeAlert" />
						<van-field :value="name" label="预约姓名" placeholder="请输入姓名" input-align="right" />
						<van-field :value="phone" label="联系电话" placeholder="请输入联系电话" input-align="right" />
						<van-cell title="预约时间" :value="time" size="large" @click="showAlert" />
					</van-cell-group>
				</view>
				<van-popup :show="typeshow" position="bottom">
					<van-picker :columns="columns" default-index="2" @change="onChange" />
				</van-popup>
				<van-popup :show="show" position="bottom">
					<van-datetime-picker type="datetime" title="选择年份" @cancel="showAlert" @confirm="onTure" :value="currentDate"
					 :min-date="minDate " @input="onInput" :formatter="formatter" />
				</van-popup>
			</view>
			<view class="form_center">
				<view class="form_center_header">
					<text>预约内容:</text>
				</view>
				<textarea placeholder="请输入预约内容..." maxlength="200" :value="desc"></textarea>
				<text style="display: block;text-align: right;font-size: 11px;color:#2C2C2C;padding: 5px 0;">200字以内</text>
			</view>
			<button type="default" class="user_put_button" form-type="submit">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: null,
				phone: null,
				currentDate: new Date().getTime(),
				minDate: new Date().getTime(),
				time: this.happenTimeFun(new Date().getTime()), //预约时间
				show: false,
				desc: null,
				typeshow: false,
				columns: ['1', '2'],
				type: '1',
			}
		},
		methods: {
			onChange(event) {
				this.type = event.detail.value
				this.typeAlert();
			},
			typeAlert() {
				this.typeshow ? this.typeshow = false : this.typeshow = true
			},
			showAlert() {
				this.show ? this.show = false : this.show = true
			},
			onInput(event) {
				this.currentDate = event.detail
			},
			onTure(e) {
				this.showAlert();
				this.time = this.happenTimeFun(e.detail)

			},
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`;
				} else if (type === 'month') {
					return `${value}月`;
				} else if (type === 'day') {
					return `${value}日`;
				} else if (type === 'hour') {
					return `${value}时`;
				} else if (type === 'minute') {
					return `${value}分`;
				}
				return value;
			},
			happenTimeFun(num) { //时间戳处理
				let date = new Date(num);

				//时间戳为10位需*1000，时间戳为13位的话不需乘1000

				let y = date.getFullYear();

				let MM = date.getMonth() + 1;

				MM = MM < 10 ? ('0' + MM) : MM; //月补0

				let d = date.getDate();

				d = d < 10 ? ('0' + d) : d; //天补0

				let h = date.getHours();

				h = h < 10 ? ('0' + h) : h; //小时补0

				let m = date.getMinutes();

				m = m < 10 ? ('0' + m) : m; //分钟补0



				return y + '-' + MM + '-' + d + ' ' + h + ':' + m;

			},
		}
	}
</script>

<style lang="less">
	.user_put {
		.form {
			padding: 0 1%;
			width: 98%;

			.form_header {
				.form_text {
					background: white;
					padding: 20px 20px 0 20px;

					.van-cell__title {
						font-size: 14px !important;
					}
				}
			}

			.form_center {
				background: white;
				padding: 20px 20px 0 35px;

				.form_center_header {
					font-size: 14px;
					padding: 10px 0;
				}

				textarea {
					font-size: 13px;
				}
			}

			.user_put_button {
				width: 80%;
				margin: 20px auto;
				color: white !important;
				background: #5480FF !important;
				border-radius: 20px !important;
			}
		}
	}
</style>
