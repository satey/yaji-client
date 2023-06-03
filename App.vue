<script>
import Vue from 'vue';
import { mapMutations, mapActions, mapState } from 'vuex';
import Wechat from './common/wechat/wechat.js';
	// import permision from "@/js_sdk/wa-permission/permission.js"
// import chat from "./common/chat.js"

import Socket from '@/common/chat.js'
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
		},
		// requestAn() {
		// 	switch (uni.getSystemInfoSync().platform) {
		// 		case 'android':
		// 			permision.requestAndroidPermission("android.permission.RECORD_AUDIO")
		// 			break;
		// 		case 'ios':
		// 			permision.judgeIosPermission("record")
		// 			break;
		// 	}
		
		// }
		
	},
	// onLaunch(options) {
	//     // 判断是否是第一次启动应用
	//     if (!options.query || !options.query.scene) {
	//       // 如果是第一次启动应用，则跳转到指定页面
	//       uni.navigateTo({
	//         url: '/pages/auth/login'
	//       })
	//     }
	//   },
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
	// onLaunch:function(){
	// 		plus.runtime.getProperty(plus.runtime.appid, (info) => {
	// 				uni.setStorageSync('version', info.version)
	// 			})

	// },
	onLaunch: function() {
		// this.requestAn()
		let token=Boolean( uni.getStorageSync('token'))
		let that=this
		that.$api('user.info').then(res => {
			
			console.log('ewxq',res.data.gender);
			if(token&&res.data.gender==0 ){
				uni.reLaunch({
					url:'/pages/auth/s1',
					success: (res) => {
					},
					fail: (err) => {
						console.log(err);
					}
				}) 
			}
			if (!Boolean(res.data.realname)&&!Boolean(res.data.dynasty)&&res.data.gender!=0&&res.data.choose_num!=4 ){
							 console.log('cs',res.data.choose_num);
							 uni.reLaunch({
							 	url:'/pages/index/index',
							 	success: (res) => {
							 	},
							 	fail: (err) => {
							 		console.log(err);
							 	}
							 }) 
							 
			}
			console.log('cs',res.data.choose_num);
			 if (!Boolean(res.data.realname)&&!Boolean(res.data.dynasty)&&res.data.gender!=0){
				 uni.reLaunch({
				 	url:'/pages/auth/s2',
				 	success: (res) => {
				 	},
				 	fail: (err) => {
				 		console.log(err);
				 	}
				 }) 
			 }
			// 如果没角色有性别的话 跳到角色页面
			 if (!Boolean(res.data.realname)&&!Boolean(res.data.dynasty)&&res.data.gender!=0&&res.data.choose_num==4 ){
				 console.log('cs',res.data.choose_num);
				 uni.reLaunch({
				 	url:'/pages/auth/s2',
				 	success: (res) => {
				 	},
				 	fail: (err) => {
				 		console.log(err);
				 	}
				 }) 
				 
			 }
			 //如果有角色有性别的话  就跳到首页
		    if (Boolean(res.data.realname)&&Boolean(res.data.dynasty)&&res.data.gender!=0 ) {
		       uni.reLaunch({
		       	url:'/pages/index/index',
		       	success: (res) => {
		       	},
		       	fail: (err) => {
		       		console.log(err);
		       	}
		       }) 
		    }
			//如果有性别的话就跳到角色
			else if(res.data.gender!=0 ){
				uni.reLaunch({
					url:'/pages/auth/s2',
					success: (res) => {
					},
					fail: (err) => {
						console.log(err);
					}
				}) 
			}else{
				uni.reLaunch({
					url:'/pages/auth/s1',
					success: (res) => {
					},
					fail: (err) => {
						console.log(err);
					}
				})
			}
		})
	
	
	// let token= Boolean(uni.getStorageSync('token'))
	// console.log(token,'token');
	// if(!token){
		
	// }
	},
	onHide: function() {
	},
	
	created() {
	
		
	},
	
};
</script>

<style lang="scss">
// @import 'static/style/color.scss';
// @import 'static/style/main.scss';
@import "static/tailwindcss/tailwind.css";
@import 'static/remixicon/remixicon.css';
</style>