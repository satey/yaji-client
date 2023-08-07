<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="">
		<u-navbar title="系统设置" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view class="bg-white">
			<u-cell-group>
				<u-cell title="用户协议" :isLink="true" @click="$u.route('/pages/public/page', { id: 1 })">
					<i slot="icon" class="ri-file-user-fill text-white p-2 bg-blue-500 rounded-lg mr-2"></i>
				</u-cell>
				<u-cell title="隐私政策" :isLink="true" @click="$u.route('/pages/public/page', { id: 2 })">
					<i slot="icon" class="ri-lock-2-fill text-white p-2 bg-orange-500 rounded-lg mr-2"></i>
				</u-cell>
			</u-cell-group>
		</view>
		<view class="bg-white mt-4">
			<u-cell-group>
				<u-cell title="帮助" :isLink="true" @click="$u.route('/pages/public/page', { id: 3 })">
					<i slot="icon" class="ri-question-fill text-white p-2 bg-orange-500 rounded-lg mr-2"></i>
				</u-cell>
				<u-cell title="注销账号" :isLink="true" @click="$u.route('/pages/mine/logOff', { id: 3 })">
					<i slot="icon" class="ri-shut-down-line text-white p-2 rounded-lg mr-2"
						style="background: #CD853F;"></i>
				</u-cell>
			</u-cell-group>
		</view>
		<view class="bg-white mt-4">
			<u-cell-group>
				<!-- 	<u-cell title="隐私设置" :isLink="true" @click="$u.route('/pages/public/privacySet')">
					<i slot="icon" class="ri-edit-box-fill text-white p-2 rounded-lg mr-2"
						style="background: #2E8B57;"></i>
				</u-cell> -->
				<!-- <u-cell title="意见反馈" :isLink="true" @click="$u.toast('功能开发中，敬请期待')"> -->
				<u-cell title="意见反馈" :isLink="true" @click="$u.route('/pages/public/feedback')">
					<i slot="icon" class="ri-edit-box-fill text-white p-2 bg-blue-500 rounded-lg mr-2"></i>
				</u-cell>
				<!--                <u-cell title="青少年模式" :isLink="true" @click="$u.toast('功能开发中，敬请期待')">
                    <i slot="icon" class="ri-leaf-fill text-white p-2 bg-green-500 rounded-lg mr-2"></i>
                </u-cell>
                <u-cell title="消息通知" :isLink="true" @click="$u.toast('功能开发中，敬请期待')">
                    <i slot="icon" class="ri-alarm-warning-fill text-white p-2 bg-purple-500 rounded-lg mr-2"></i>
                </u-cell> -->
				<u-cell title="当前版本" :isLink="true" @click="onVersion()">
					<i slot="icon" class="ri-emotion-fill text-white p-2 bg-purple-500 rounded-lg mr-2"></i>
				</u-cell>
			</u-cell-group>
		</view>
		<!--        <view class="bg-white mt-4">
            <u-cell-group>
                <u-cell title="清理缓存" :isLink="true" @click="onClear()">
                    <i slot="icon" class="ri-database-2-fill text-white p-2 bg-purple-500 rounded-lg mr-2"></i>
                </u-cell>

            </u-cell-group>
        </view> -->
		<!-- 	<view class="bg-white mt-4">
			<u-cell-group>
				<u-cell title="退出登录" :isLink="true" @click="onLogout()">
					<i slot="icon" class="ri-login-box-fill text-white p-2 bg-red-500 rounded-lg mr-2"></i>
				</u-cell>
			</u-cell-group>
		</view> -->
		<view class="logout">
			<view class="logoutBtn" @click="onLogout()">
				退出登录
			</view>
		</view>
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
					var userInfo = uni.getStorageSync("userInfo");
					that.$store.commit("setIslogout", true);
					that.$nextTick(() => {
						uni.removeStorageSync('token')
						uni.removeStorageSync('userInfo')
						uni.removeStorageSync('msgCount')
						uni.removeStorageSync('pageCount')
						uni.removeStorageSync('gender')
						that.$store.commit("setMessageList", []);
						that.$store.commit("setMsgCount", 0);
						that.$store.commit("setMsgCount2");
						that.$store.commit("messageListTotal", [])
						that.$nextTick(() => {
							uni.reLaunch({
								url: '/pages/auth/login'
							})
						})
					})
				})
				// uni.request({
				// 	url: 'https://yaji.suoeryoude.cn/api/user/logout',
				// 	method: 'POST',
				// 	headers: {
				// 		'token': that.tokens,
				// 	},
				// 	success(res) {
				// 		console.log(res)
				// 		that.isClick == true;
				// 		getApp().globalData.socketTask.close();
				// 		var userInfo = uni.getStorageSync("userInfo");
				// 		that.$store.commit("setIslogout", true);
				// 		that.$nextTick(() => {
				// 			uni.removeStorageSync('token')
				// 			uni.removeStorageSync('userInfo')
				// 			uni.removeStorageSync('msgCount')
				// 			uni.removeStorageSync('pageCount')
				// 			uni.removeStorageSync('gender')
				// 			that.$store.commit("setMessageList", []);
				// 			that.$store.commit("setMsgCount", 0);
				// 			that.$store.commit("setMsgCount2");
				// 			that.$store.commit("messageListTotal", [])
				// 			that.$nextTick(() => {
				// 				uni.reLaunch({
				// 					url: '/pages/auth/login'
				// 				})
				// 			})
				// 		})
				// 	},
				// 	fail(err) {
				// 		console.log('err', err);
				// 	}
				// })

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
				that.$api("versions.index").then(res => {
					console.log(res.data.newversion);
					that.$u.toast('当前版本为' + res.data.newversion)
				})
			}
		}
	}
</script>
<style>
	page {
		background: #f2f2f2;
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
		border-radius: 43rpx;
		background: #FE4373;
		color: #fff;
		text-align: center;
		line-height: 85rpx;
		margin: 0 auto;
		height: 85rpx;
	}
</style>