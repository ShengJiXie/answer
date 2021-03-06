const baseUrl = 'https://ask.gzysk.net/'
const request = (url = '', StorName = '', date = {}, type = 'GET', header = {}) => {
	if (uni.getStorageSync(StorName).code != 0) {
		return new Promise((resolve, reject) => {
			if (StorName == 'img') {
				uni.uploadFile({
					url: baseUrl + url,
					header: {
						'content-type': 'multipart/form-data'
					},
					filePath: date.file,
					name: 'img'
				}).then(res => {
					resolve(res)
				})
			} else {
				uni.request({
					method: type,
					url: baseUrl + url,
					data: date,
					header: header,
					dataType: 'json',
				}).then((response) => {
					if (response[1].data.code === 0) {
						let [error, res] = response;
						resolve(res.data);
					} else
					if (StorName == 'accountLogin') {
						let [error, res] = response;
						resolve(res.data);
					} else {
						uni.showToast({
							title: response[1].data.msg,
							icon: 'none',
							duration: 5000
						})
					}
				}).catch(error => {
					let [err, res] = error;
					reject(err)
				})
			}
		});
	} else {
		return new Promise((resolve, reject) => {
			resolve(uni.getStorageSync(StorName))
		})
	}
}
export default request
