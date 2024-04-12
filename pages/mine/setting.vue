<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="">
		<u-navbar title="设置" :safeAreaInsetTop="true" :placeholder="true" bgColor="#FFF">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view class="bg-white">
			<u-cell-group :border="false">
				<u-cell style="padding: 15rpx 0rpx;" title="用户协议" :border="false" :isLink="true" @click="$u.route('/pages/public/page', { id: 1 })">

				</u-cell>
				<u-cell style="padding: 15rpx 0rpx;" title="隐私政策" :border="false" :isLink="true" @click="$u.route('/pages/public/page', { id: 2 })">

				</u-cell>
				<u-cell style="padding: 15rpx 0rpx;" title="联系我们" :border="false" :isLink="true" @click="$u.route('/pages/public/page', { id: 3 })">

				</u-cell>
				<u-cell style="padding: 15rpx 0rpx;" title="注销账号" :border="false" :isLink="true" @click="$u.route('/pages/mine/logOff', { id: 3 })">

				</u-cell>
				<u-cell style="padding: 15rpx 0rpx;" title="意见反馈" :border="false" :isLink="true" @click="$u.route('/pages/public/feedback')">

				</u-cell>
				<u-cell style="padding: 15rpx 0rpx;" title="当前版本" :border="false" :isLink="true" @click="onVersion()">

				</u-cell>
				<u-cell style="padding: 15rpx 0rpx;" title="关于未成年模式" :border="false" :isLink="true" @click="$u.route('/pages/public/teenageMode')">

				</u-cell>
			</u-cell-group>
		</view>
		<view class="logout">
			<view @click="openUrl" style="color: #FFA000;font-size:26rpx ;text-align: center;margin-bottom: 46rpx;">
				备案号：豫ICP备2022019898号-4A</view>
			<view class="logoutBtn" @click="onLogout()">
				退出登录
			</view>
		</view>
		<feiqslsHit></feiqslsHit>
	</view>
</template>
<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: 'about',
		data() {
			return {
				cache: 0,
				version: null,
				token: "",
				tokens: "",
				// ---------
				isClick: true,
			}
		},
		computed: {
			...mapState({
				initData: state => state.init.initData,
				userInfo: state => state.user.userInfo,
			})
		},
		methods: {
			getFile() {

			},
			onLogout() {
				let that = this
				// that.$store.commit('OUT_LOGIN')
				let tokens = uni.getStorageSync('token');
				if (that.isClick == false) {
					return
				}
				that.isClick == false;
				that.$api("user.logout").then(res => {
					that.isClick == true;
					getApp().globalData.socketTask.close();
					clearInterval(getApp().globalData.timmer)
					getApp().globalData.socketTask = null;
					var userInfo = uni.getStorageSync("userInfo");
					that.$nextTick(() => {
						uni.removeStorageSync('token')
						uni.removeStorageSync('userInfo')
						uni.removeStorageSync('roomData')
						that.$store.commit("setGameRoomData", [])
						that.$store.commit("setGameBarFlag", false)
						that.$store.commit("setMessageList", []);
						that.$store.commit("setMsgCount", 0);
						that.$nextTick(() => {
							uni.reLaunch({
								url: '/pages/auth/login'
							})
						})
					})
				})
			},
			onClear() {
				// #ifdef APP-PLUS
				let that = this
				plus.cache.clear(() => {
					that.cache = 0
					uni.toast('清除成功', 'none')
				})
				// #endif
			},
			onVersion() {
				let that = this;
				// #ifdef APP-PLUS
				plus.runtime.getProperty(plus.runtime.appid, (info) => {
					that.$u.toast('当前版本为' + info.version)
				})
				// #endif
				// that.$api("versions.index").then(res => {
				// 	console.log(res.data.newversion);
				// 	that.$u.toast('当前版本为' + res.data.newversion)
				// })
			},
			openUrl() {
				// #ifdef H5
				window.location.href = 'https://beian.miit.gov.cn/#/Integrated/recordQuery'
				// #endif
				// #ifdef APP
				plus.runtime.openURL('https://beian.miit.gov.cn/#/Integrated/recordQuery')
				// #endif
			}
		}
	}
</script>
<style>
	page {
		background: #FFF;
	}

	.logout {
		padding: 30rpx;
		width: 100%;
		position: absolute;
		bottom: 0rpx;
		left: 0rpx;
		box-sizing: border-box;
	}

	.logoutBtn {
		background-image: url(@/static/iconImage/btnBg2.png);
		background-repeat: none;
		background-position: 100% 100%;
		background-size: 100% 100%;
		border-radius: 43rpx;
		color: #fff;
		text-align: center;
		line-height: 85rpx;
		margin: 0 auto;
		height: 85rpx;
		font-size: 36rpx;
		font-weight: bold;
	}
</style>