<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="login">
		<!-- 弹窗 -->
		<u-popup :show="showAction" @close="showAction = false" :closeable="false" :round="30">
			<view style="padding: 50rpx 30rpx;background: #fff;border-radius: 30rpx 30rpx 0rpx 0rpx;">
				<view style="font-size: 32rpx;">请先同意以下协议条款：</view>
				<view style="margin-top: 50rpx;margin-bottom: 30rpx;">
					<text style="color:#C4A486 ;" @click="$u.route('/pages/public/page', { id: 1 })">《用户协议》</text>和<text
						@click="$u.route('/pages/public/page', { id: 2 })" style="color:#C4A486 ;">《隐私政策》</text>
				</view>
				<view style="display: flex;align-items: center;">
					<view @click="showAction = false"
						style="margin: 0 auto;width: 300rpx;color: #808080;text-align: center;height: 80rpx;line-height: 80rpx;border:1px solid #C7C7C7 ;border-radius: 10rpx;">
						拒绝
					</view>
					<view @click="yes"
						style="margin: 0 auto;width: 300rpx;color: #fff;text-align: center;height: 80rpx;line-height: 80rpx;background:#C4A486 ;border-radius: 10rpx;">
						同意并继续</view>

				</view>
			</view>
		</u-popup>
		<!-- 主题 -->
		<view class="loginContainer">
			<view class="loginText">
				<image style="width: 100%;height: 100%;" src="../../static/embed/loginText.png"></image>
			</view>
			<!-- 账号 -->
			<view class="inputBox" style="margin-top: 20%;">
				<i class="iconfont  icon-shouji" style="color: #C4A486;font-size: 40rpx;margin-right: 5rpx;"></i>
				<input type="number" v-model="mobile" @input="handleInput('mobile')" maxlength="11" placeholder="输入手机号"
					placeholder-class="placeholderClass">
			</view>
			<!-- 密码 -->
			<view class="inputBox" style="padding-top: 66rpx;justify-content: space-between;">
				<view style="display: flex;align-items: center;flex: 1;">
					<i class="iconfont  icon-duanxin" style="color: #C4A486;font-size: 40rpx;margin-right: 5rpx;"></i>
					<input type="number" v-model="code" maxlength="6" placeholder="输入验证码"
						placeholder-class="placeholderClass">
				</view>
				<button class="codeText" @click="sendCode" :disabled="sendBtnDisabled">{{codeText}}</button>
			</view>
			<view class="loginBtn" @click="onLogin()">
				登录
			</view>
			<view class="flex flex-row-right"
				style="margin-top: 136rpx;margin-bottom: 162rpx;font-size: 23rpx;display: flex;align-items: center;">
				<u-checkbox-group>
					<u-checkbox @change="handleAgree" :checked="protocol" size="28" shape="circle"
						inactiveColor="#767676" activeColor="#C4A486"></u-checkbox>
				</u-checkbox-group>
				<view class="text-base leading-none" style="color: #333333;white-space: pre-wrap;flex: 1;">
					<text>已阅读并同意</text>
					<text style="color:#C4A486 ;" @click="$u.route('/pages/public/page', { id: 1 })">《用户协议》</text>
					<text>和</text>
					<text style="color:#C4A486 ;" @click="$u.route('/pages/public/page', { id: 2 })">《隐私政策》</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'login',
		data() {
			return {
				showAction: false,
				protocol: false,
				codeText: '获取验证码',
				sendBtnDisabled: false,
				type: "sendCode",
				mobile: '',
				code: "",
				isClick: false,
			}
		},
		methods: {
			//登录
			onLogin() {
				let that = this;
				if (!that.protocol) {
					that.$u.toast('请同意用户协议')
					that.showAction = true;
					that.type = "login"
					return false
				}
				uni.showLoading()
				if (that.isClick) {
					return;
				}
				that.isClick = true;
				try {
					uni.getSystemInfo({
						success(systemInfo) {
							that.$api('user.smslogin', {
								mobile: Number(that.mobile),
								code: Number(that.code),
								mobile_message_json: JSON.stringify(systemInfo)
							}).then(res => {
								uni.hideLoading()
								that.isClick = false;
								if (res.code == 1) {
									uni.setStorageSync('token', res.data.token);
									that.$api("user.info").then((userInfo) => {
										if (userInfo.code == 1) {
											// getApp().globalData.initFun()
											uni.setStorageSync("userInfo", userInfo.data)
											//统计
											uni.getPushClientId({
												success(res) {
													that.$api('stat.init', {
														"push_clientid": res
															.cid
													}).then(res => {})
												}
											})
											that.$nextTick(() => {
												if (userInfo.data.gender == 0) {
													uni.reLaunch({
														url: '/pages/auth/s1'
													});
													return;
												}
												if (res.msg == "登录成功") {
													getApp().globalData.initFun()
													uni.reLaunch({
														url: '/pages/index/index'
													});
												}
											})
										}
									})
								} else {
									that.$u.toast(res.msg)
								}
							})
						}
					})
				} catch (err) {
					that.$u.toast("请求服务器异常")
				}
			},
			//监听输入
			handleInput(key) {
				let that = this
				that.isMobileEnd = that.$u.test.mobile(that.mobile);
			},
			//确认协议
			yes() {
				this.showAction = false;
				this.protocol = true;
				if (this.type == 'sendCode') {
					this.sendCode()
				} else if (this.type == 'login') {
					this.onLogin()
				}
			},
			//发送验证码
			sendCode() {
				let that = this
				if (!that.protocol) {
					that.showAction = true;
					that.type = "sendCode"
					return false;
				}
				if (!that.isMobileEnd || that.disabledCode) {
					that.$u.toast('请正确填写')
					return false
				}
				try {
					that.$api('sms.send_sms', {
						mobile: Number(that.mobile),
					}).then(res => {
						if (res.code === 1) {
							that.sendBtnDisabled = true;
							let n = 60
							let run = setInterval(() => {
								n -= 1
								that.codeText = n + 's'
								if (n < 0) {
									clearInterval(run)
									that.codeText = '获取验证码'
									that.sendBtnDisabled = false;
								}
							}, 1000)
							that.$u.toast('验证码已发送，请注意查收短信')
						} else {
							that.$u.toast(res.msg)
						}
					})
				} catch (err) {
					that.$u.toast("请求服务器异常")
				}
			},
			//协议勾选
			handleAgree(e) {
				let that = this;
				that.protocol = e;
			},
		}
	}
</script>
<style lang="scss" scoped>
	.login {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		background-image: url(/static/embed/loginBgImg.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: center center;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0rpx 30rpx 0rpx 16rpx;
		box-sizing: border-box;

		.loginContainer {
			width: 100%;
			background-image: url(/static/embed/loginBoxBg.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-position: 100% 100%;
			padding: 15% 80rpx 0rpx 80rpx;
			box-sizing: border-box;

			.loginText {
				height: 98rpx;
				width: 375rpx;
				text-align: center;
				margin: 0 auto;
				margin-top: 150rpx;
			}

			.inputBox {
				display: flex;
				align-items: center;
				padding-bottom: 18rpx;
				border-bottom: 1px solid #C4A486;
			}

			.codeText {
				white-space: nowrap;
				font-size: 26rpx;
				color: #333333;
				width: 130rpx;
				height: 36rpx;
				line-height: 36rpx;
				background: none;
				border: none;
				padding: 0;
				margin: 0;

				&::after {
					border: none !important;
				}
			}

			.loginBtn {
				width: 350rpx;
				height: 100rpx;
				background-image: url(/static/embed/loginMask.png);
				background-repeat: no-repeat;
				background-size: 100% 100%;
				background-position: center center;
				text-align: center;
				line-height: 100rpx;
				margin: 0 auto;
				margin-top: 100rpx;
				font-weight: bold;
				color: #C4A486;
			}
		}
	}

	.placeholderClass {
		font-size: 32rpx;
		color: rgba(0, 0, 0, 0.36);
	}
</style>