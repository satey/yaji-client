<script>
import Vue from 'vue';
import { mapMutations, mapActions, mapState } from 'vuex';
import Wechat from './common/wechat/wechat.js';

export default {
	methods: {
		...mapActions(['getAppInit', 'getRoutes', 'getUserInfo']),
		async setAppInfo() {
			let that = this;
			let platform = '';
			return new Promise((resolve, reject) => {
				uni.getSystemInfo({
					success: function(e) {
						Vue.prototype.StatusBar = e.statusBarHeight;
						// #ifdef H5
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
						if (that.$wxsdk.isWechat()) {
							platform = 'wxOfficialAccount';
						} else {
							platform = 'H5';
						}
						// #endif

						// #ifdef APP-PLUS
						platform = 'App';
						if (e.platform == 'android') {
							uni.setStorageSync('isAndroid', true);
							Vue.prototype.CustomBar = e.statusBarHeight + 50;
						} else {
							Vue.prototype.CustomBar = e.statusBarHeight + 45;
							uni.setStorageSync('isAndroid', false);
						}
						// #endif

						// #ifdef MP-WEIXIN
						platform = 'wxMiniProgram';
						new Wechat().getWxMiniProgramSessionKey();
						let custom = wx.getMenuButtonBoundingClientRect();
						Vue.prototype.Custom = custom;
						Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
						// #endif
						uni.setStorageSync('platform', platform);
						resolve(platform);
					}
				});
			});
		},
		async autoLogin(data) {
			let initData = data;
			let wechat = new Wechat();
			// #ifdef MP-WEIXIN
			wechat.checkMiniProgramUpdate();
			// #endif
			// #ifdef H5
			uni.setStorageSync('appid', initData.wechat.appid);
			// #endif
		}
	},
	onLaunch: async function(options) {
		await this.setAppInfo();
		try {
			let init = await this.getAppInit(options);
			await this.autoLogin(init.data);
			if (process.env.NODE_ENV === 'development') {
				await this.getRoutes();
			}
		} catch (e) {
			console.log(e);
		}
	},
	onShow: function() {
	let token= Boolean(uni.getStorageSync('token'))
	if(!token){
		uni.reLaunch({
			url:'/pages/auth/login',
			success: (res) => {
				console.log('cg');
			},
			fail: (err) => {
				console.log(err);
			}
		})
	}
	},
	onHide: function() {
	}
};
</script>

<style lang="scss">
// @import 'static/style/color.scss';
// @import 'static/style/main.scss';
@import "static/tailwindcss/tailwind.css";
@import 'static/remixicon/remixicon.css';
</style>