import api from '@/common/request/index'
import tools from '@/common/utils/tools'
// #ifdef H5
import wxsdk from '@/common/wechat/sdk'
import Wechat from '@/common/wechat/wechat'
// #endif
import Router from '@/common/router';

export default class ShoproPay {
	constructor(payment, order) {
		this.payment = payment;
		this.order = order;
		this.platform = uni.getStorageSync('platform');
		let payMethod = {
			'wxOfficialAccount': {
				'wechat': () => { this.wxOfficialAccountPay() },
				'alipay': () => { this.copyPayLink() },
				'wallet': () => { this.walletPay() }
			},
			'wxMiniProgram': {
				'wechat': () => { this.wxMiniProgramPay() },
				'alipay': () => { this.copyPayLink() },
				'wallet': () => { this.walletPay() }
			},
			'App': {
				'wechat': () => { this.wechatPay() },
				'alipay': () => { this.aliPay() },
				'wallet': () => { this.walletPay() },
			},
			'H5': {
				'wechat': () => { this.wechatWapPay() },
				'alipay': () => { this.goToPayLink() },
				'wallet': () => { this.walletPay() },
			},
		}
		let pay = payMethod[this.platform][this.payment];
		pay();
	}

	prepay() {
		uni.showLoading({
			title: '支付中',
			mask: true
		});
		return new Promise((resolve, reject) => {
			let that = this;
			let params = {
				order_sn: that.order.order_sn,
				payment: that.payment
			}
			if (uni.getStorageSync('openid')) {
				params.openid = uni.getStorageSync('openid');
			}
			api('pay.prepay', params).then(res => {
				if (res.code === 1) {
					if (res.data === 'no_openid') {
						uni.showModal({
							title: '微信支付',
							content: '点击确定后请再次使用微信支付',
							success: function (res) {
								if (res.confirm) {
									//静默获取openid
									let wechat = new Wechat();
									wechat.wxOfficialAccountBaseLogin();
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					} else {
						uni.hideLoading();
						resolve(res);
					}
				}
			});
		});
	}

	async wxOfficialAccountPay() {
		let that = this;
		let result = await this.prepay();
		wxsdk.wxpay(result.data.pay_data, (res) => {
			console.log('wxOfficialAccountPay', res)
			if (res.errMsg == "chooseWXPay:ok") {
			} else if (res.errMsg === 'chooseWXPay:cancel') {
			} else {
			}
		});
	}

	async wechatWapPay() {
		let result = await this.prepay();
		if (result.code === 1) {
			var url = result.data.pay_data.match(/url\=\'(\S*)\'/);
			let reg = new RegExp('&amp;', 'g') //g代表全部
			let newUrl = url[1].replace(reg, '&');
			window.location.href = newUrl
		}
	}

	async wxMiniProgramPay() {
		let result = await this.prepay();
		let payData = result.data.pay_data;
		console.log('wxMiniProgramPay', payData);
		uni.requestPayment({
			provider: 'wxpay',
			timeStamp: payData.timeStamp,
			nonceStr: payData.nonceStr,
			package: payData.package,
			signType: payData.signType,
			paySign: payData.paySign,
			success: function (res) {
				console.log('success:' + JSON.stringify(res))
				uni.showToast({ title: '支付成功', icon: 'none' })
			},
			fail: function (err) {
				console.log('fail:' + JSON.stringify(err))
				uni.showToast({ title: '支付失败', icon: 'none' })
			}
		});
	}

	async walletPay() {
		let result = await this.prepay();
		console.log('result:' + JSON.stringify(result))
	}

	async copyPayLink() {
		let that = this;
		let result = await this.prepay();
		if (result.code === 1) {
			uni.showModal({
				title: '支付宝支付',
				content: '复制链接到外部浏览器',
				confirmText: '复制链接',
				success: (res) => {
					if (res.confirm) {
						uni.setClipboardData({
							data: result.data.pay_data,
							success: function (data) {
								//#ifdef H5
								tools.toast('已复制到剪切板');
								//#endif
							},
							fail: function (err) { },
							complete: function (res) { }
						});
					} else if (res.cancel) {
					}
				}
			})
		}
	}

	async goToPayLink() {
		let that = this;
		let result = await this.prepay();
		if (result.code === 1) {
			console.log(result.data.pay_data)
			window.location = result.data.pay_data
		}
	}

	async aliPay() {
		let that = this;
		let result = await this.prepay();
		console.log(result)
		if (result.code === 1) {
			uni.requestPayment({
				provider: 'alipay',
				orderInfo: result.data.pay_data, //支付宝订单数据
				success: function (res) {
					console.log('success:' + JSON.stringify(res))
				},
				fail: function (err) {
					console.log('fail:' + JSON.stringify(err))
				}
			});
		}
	}

	async wechatPay() {
		let that = this;
		let result = await this.prepay();
		if (result.code === 1) {
			uni.requestPayment({
				provider: 'wxpay',
				orderInfo: JSON.parse(result.data.pay_data), //微信订单数据(官方说是string。实测为object)
				success: function (res) {
					console.log('success:' + JSON.stringify(res));
				},
				fail: function (err) {
					console.log(err);
				}
			});
		}
	}
}
