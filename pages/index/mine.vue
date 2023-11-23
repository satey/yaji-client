<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="fixedHead" v-if="headFlag">
		<view style="display: flex;align-items: center;">
			<block v-if="userImg!=''">
				<image mode="aspectFill" class="rounded-full bg-gray-100" :src="userImg"
					style="width: 50rpx;height: 50rpx;margin-right: 30rpx;">
				</image>
			</block>
			<block v-else>
				<image mode="aspectFill" class="rounded-full bg-gray-100" :src="userInfo.avatar || '/static/avatar.png'"
					style="width: 50rpx;height: 50rpx;margin-right: 30rpx;">
				</image>
			</block>
			<view>
				<text style="font-size: 28rpx;color: #333;">
					{{ userInfo.realname || '无名氏' }}·{{ userInfo.dynasty || '未知朝代' }}</text>
			</view>
		</view>
		<view style="display: flex;align-items: center;">
			<view style="margin-right: 30rpx;">
				<i @click="$u.route('/pages/mine/contact')" class="ri-user-heart-fill"
					style="font-size:50rpx;color: #FE4373;"></i>
			</view>
			<view>
				<i @click="$u.route('/pages/mine/setting')" class="ri-settings-3-fill"
					style="font-size:50rpx;color: #FE4373;"></i>
			</view>
		</view>
	</view>
	<!-- ${CustomBar} -->
	<view>
		<!-- <image class="fixed w-full h-screen top-0 left-0 right-0 -z-10" src='@/static/user_background.png' /> -->
		<view class="mineHead" style="position: relative;" @click.stop.prevent="upLoadUserBg">
			<view style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;text-align: center;">
				<image :src="background_image" mode="aspectFill" style="width: 100%;height: 100%;z-index: -1;"></image>
			</view>
			<view class="flex px-4 justify-end text-white" style="position: absolute;right: 0;top: 100rpx;z-index: 99;">
				<view
					style="background: rgba(255,255,255,0.8);border-radius: 50%;width: 82rpx;height: 82rpx;text-align: center;line-height: 82rpx;margin-right: 10rpx;">
					<i @click.stop="$u.route('/pages/mine/contact')" class="ri-user-heart-fill"
						style="font-size:50rpx;color: #FE4373;"></i>
				</view>
				<view
					style="background: rgba(255,255,255,0.8);border-radius: 50%;width: 82rpx;height: 82rpx;text-align: center;line-height: 82rpx;">
					<i @click.stop="$u.route('/pages/mine/setting')" class="ri-settings-3-fill"
						style="font-size:50rpx;color: #FE4373;"></i>
				</view>
			</view>
			<view style="margin-top: 50rpx;display: flex;align-items: center;justify-content: space-between;">
				<view style="position: relative;">
					<block v-if="userImg!=''">
						<image class="rounded-full bg-gray-100" mode="aspectFill" :src="userImg || '/static/avatar.png'"
							style="width: 140rpx;height: 140rpx;" @click.stop="changeImage">
						</image>
					</block>
					<block v-else>
						<image class="rounded-full bg-gray-100" mode="aspectFill"
							:src="userInfo.avatar || '/static/avatar.png'" style="width: 140rpx;height: 140rpx;"
							@click.stop="changeImage">
						</image>
					</block>
					<view class="tips text-base text-white " v-if="userInfo.is_change_avatar!=1||is_change_avatar == 1">
						换头像加名望</view>
				</view>
			</view>

			<view class="text-xl mt-2" style="display: flex;align-items: center;">
				<text style="font-size: 36rpx;color: #fff;" class="font-bold">
					{{ userInfo.realname || '无名氏' }}·{{ userInfo.dynasty || '未知朝代' }}</text>
				<text
					style="margin-left: 35rpx;color: #fff;opacity: 0.8;font-size: 26rpx;">名望：{{ userInfo.total_mw || 0 }}</text>
			</view>
			<view
				style="color: #fff;font-size: 26rpx;margin-top: 20rpx;display: flex;align-items: center;opacity: 0.8;">
				<text>雅集号：{{ userInfo.uid || '********' }}</text>
				<text style="margin-left: 26rpx;">IP属地：{{ userInfo.province || '未知' }}</text>
			</view>
			<view style="color: #fff;font-size: 26rpx;margin-top: 20rpx;"></view>
			<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 30rpx;">
				<view style="display: flex;">
					<view style="display: flex;align-items: center;margin-right: 50rpx;"><text
							style="color: #fff;font-size: 36rpx;margin-right: 10rpx;"
							class="">{{ userData.follow_count || 0 }}</text><text <text
							style="color: #fff;font-size: 24rpx;">关注</text></view>
					<view style="display: flex;align-items: center;margin-right: 50rpx;"><text
							style="color: #fff;font-size: 36rpx;margin-right: 10rpx;"
							class="">{{ userData.fans_count || 0 }}</text><text <text
							style="color: #fff;font-size: 24rpx;">粉丝</text></view>
					<view style="display: flex;align-items: center;"><text
							style="color: #fff;font-size: 36rpx;margin-right: 10rpx;"
							class="">{{ userData.digg_count || 0 }}</text><text <text
							style="color: #fff;font-size: 24rpx;">获赞</text></view>
				</view>
				<view style="font-size: 26rpx;color: #fff;opacity: 0.8;" @click="upLoadUserBg">点击更换背景</view>
			</view>
		</view>
		<view class="containerBox">
			<view class="select" style="display: flex;align-items: center;justify-content: space-between;">
				<view @click="openPostAdd">
					<image src="@/static/dongtai.png" class="selectImg"></image>
					<view>发布动态</view>
				</view>
				<view @click="$u.route('/pages/mine/gift')">
					<image src="@/static/liwu.png" class="selectImg"></image>
					<view>我的礼物</view>
				</view>
				<view @click="skipRole">
					<image src="@/static/jiaose.png" class="selectImg"></image>
					<view>我的角色</view>
				</view>
				<!-- 后续开放 -->
				<view @click="$u.route('/pages/mine/wallet')">
					<image src="@/static/qianbao.png" class="selectImg"></image>
					<view>我的钱包</view>
				</view>
			</view>
			<!-- banner -->
			<view class="bannerBox" v-if="bannerData.length != 0">
				<swiper class="mineSwiper" :circular="true" :indicator-dots="false" :autoplay="true" :interval="3000"
					:duration="1000">
					<block v-for="(item,index) in bannerData">
						<swiper-item v-if="item.status == 'normal'">
							<image class="banner" :src="item.image" @click="jumpBanner(item)"></image>
						</swiper-item>
					</block>
				</swiper>
			</view>
			<view class="userTrends" style="border-top: 1rpx solid #ECECEC;margin-top: 40rpx;">
				<uc-mine v-for="(item,index) in listPostMine" :item="item" :key="index"></uc-mine>
				<u-loadmore v-if="listPostMine.length" :status="loadmore" nomoreText="" color="#a1a1a1"
					marginTop="20" />
				<u-empty v-if="!listPostMine.length" icon="/static/null3.png" text="数据为空" textColor="#a1a1a1"
					marginTop="100"></u-empty>
				<view style="height: 100rpx;"></view>
			</view>
		</view>
		<u-modal :show="showIp" :showConfirmButton="false" :showCancelButton="false">
			<view class="w-full">
				<view class="text-2xl mt-4 text-center">IP属地说明</view>
				<view class="mt-6">为维护网络安全，保障良好生态和社区的真实性，根据网络运营商数据，展示用户IP属地信息</view>
				<view class="grid gap-4 mt-10 text-center">
					<view
						class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500"
						@click="showIp = false">确定</view>
				</view>
			</view>
		</u-modal>
		<!-- <clipper :image-url="imgurl" v-if="imgurl" @cancel="imgCancel" @success="imgSuccess" :is-limit-move="true"
			:isReduce="true" :max-width="400" :isRound="true" /> -->
		<!-- <uc-auth></uc-auth> -->
		<!-- <uc-tabbar></uc-tabbar> -->
		<topPrompt></topPrompt>
	</view>
</template>
<script>
	import topPrompt from "@/components/fei-topPrompt/fei-topPrompt.vue"
	import permision from "@/js_sdk/wa-permission/permission.js"
	// import clipper from '@/components/lime-clipper/components/l-clipper/l-clipper.vue'
	import {
		mapMutations,
		mapActions,
		mapState
	} from 'vuex'
	export default {
		name: 'mine',
		components: {
			topPrompt
		},
		data() {
			return {
				userImg: "",
				imgurl: "",
				tablist: [{
					name: '动态',
					type: 'post',
					count: 0
				}, ],
				userData: {},
				listPostMine: [],
				params: {
					type: 'all',
					page: 1,
				},
				paginator: {
					total: 0,
					last_page: 0,
				},
				loadmore: false,
				showIp: false,
				headFlag: false,
				bannerData: [],
				is_change_avatar: 0,
				background_image: ""
			}
		},
		computed: {
			...mapState({
				initData: state => state.init.initData,
				userInfo: state => state.user.userInfo,
			})
		},
		created() {
			var that = this;
			that.getUserData()
			that.getPostMine()
			that.getAd()
		},
		onShow() {
			let that = this;
			that.imgCancel()
			that.getUserInfo()
		},
		onReachBottom() {
			let that = this
			if (that.loadmore === 'nomore') return false
			that.loadmore = 'loading'
			that.params.page = ++that.params.page
			that.getPostMine()
		},
		onPageScroll(e) {
			if (parseInt(e.scrollTop) >= 150) {
				this.headFlag = true;
			} else {
				this.headFlag = false;
			}
		},
		methods: {
			...mapActions(['getUserInfo']),
			//上传背景
			uploadBgImg() {
				var that = this;
				uni.chooseImage({
					count: 1,
					sourceType: ['album'],
					sizeType: "",
					success(imageRes) {
						var token = uni.getStorageSync("token");
						uni.showLoading()
						uni.uploadFile({
							url: that.$API_URL + 'index/upload',
							filePath: imageRes.tempFilePaths[0],
							name: 'file',
							formData: {
								"token": token
							},
							success: res => {
								var data = JSON.parse(res.data);
								if (data.code == 1) {
									that.$api("user.update_background_image", {
										background_image: data.data.fullurl
									}).then((resData) => {
										uni.hideLoading()
										if (resData.code == 1) {
											that.background_image = data.data
												.fullurl
										}
									})
								} else {
									uni.hideLoading()
								}
							}
						})
					}
				})
			},
			async upLoadUserBg() {
				var that = this;
				var result = null;
				// #ifdef APP-PLUS
				if (uni.getSystemInfoSync().platform == "ios") {
					that.uploadBgImg()
				} else {
					var result = await permision.requestAndroidPermission('android.permission.READ_EXTERNAL_STORAGE');
					if (result == 1) {
						that.uploadBgImg()
					} else {
						uni.showModal({
							title: "权限不足",
							content: "请开启相册读取权限，以便上传图片。！",
							confirmText: "前往开启",
							success(res1) {
								if (res1.confirm) {
									permision.gotoAppPermissionSetting()
								}
							}
						})
					}
				}
				// #endif

				// #ifdef H5
				that.uploadBgImg()
				// #endif
			},
			jumpBanner(item) {
				console.log(item)
				if (item.is_external_links == 0) {
					this.$u.route(item.url)
				} else {
					this.$u.route('/pages/joy/activity', {
						url: item.url,
						title: item.title
					})
				}
			},
			//广告
			getAd() {
				var that = this;
				that.$api("ad.lists", {
					type: 3
				}).then(res => {
					if (res.code == 1) {
						that.bannerData = res.data;
					}
				})
			},
			openPostAdd() {
				let that = this;
				that.$api('post.is_add').then(res => {
					console.log('ii', res);
					if (res.data === 0) {
						that.$u.toast('无角色暂不能发布动态')
						return
					} else {
						uni.navigateTo({
							url: '/pages/post/add'
						})
					}
				})
			},
			imgCancel() {
				this.imgurl = '';
			},
			imgSuccess(e) {
				var that = this;
				var token = uni.getStorageSync("token");
				uni.uploadFile({
					url: that.$API_URL + 'index/upload',
					filePath: e.url,
					name: 'file',
					formData: {
						"token": token
					},
					success: res => {
						var data = JSON.parse(res.data);
						if (data.code == 1) {
							that.$api("user.update_avatar", {
								avatar: data.data.fullurl
							}).then((resData) => {
								if (resData.code == 1) {
									that.userImg = data.data.fullurl;
									that.getUserInfo()
								}
							})
						}
					},
					complete: e => {}
				})
				this.imgurl = '';
			},
			//uploadImg
			uploadImg() {
				var that = this;
				uni.chooseImage({
					count: 1,
					sourceType: ['album'],
					sizeType: "",
					success(res) {
						var token = uni.getStorageSync("token");
						uni.showLoading()
						uni.uploadFile({
							url: that.$API_URL + 'index/upload',
							filePath: res.tempFilePaths[0],
							name: 'file',
							formData: {
								"token": token
							},
							success: res => {
								var data = JSON.parse(res.data);
								if (data.code == 1) {
									that.$api("user.update_avatar", {
										avatar: data.data.fullurl
									}).then((resData) => {
										uni.hideLoading()
										if (resData.code == 1) {
											that.userImg = data.data.fullurl +
												'?imageMogr2/thumbnail/280x280';
											that.getUserInfo()
										}
									})
								} else {
									uni.hideLoading()
								}
							},
							complete: e => {
								uni.hideLoading()
							}
						})
					}
				})
			},
			//上传头像
			async changeImage() {
				const self = this;
				const that = this;
				// #ifdef APP-PLUS
				if (uni.getSystemInfoSync().platform == "ios") {
					that.uploadImg()
				} else {
					var result = await permision.requestAndroidPermission('android.permission.READ_EXTERNAL_STORAGE');
					if (result == 1) {
						that.uploadImg()
					} else {
						uni.showModal({
							title: "权限不足",
							content: "请开启相册读取权限，以便上传图片。！",
							confirmText: "前往开启",
							success(res1) {
								if (res1.confirm) {
									permision.gotoAppPermissionSetting()
								}
							}
						})
					}
				}
				// #endif


				// #ifdef H5
				uni.chooseImage({
					count: 1,
					sourceType: ['album'],
					sizeType: "",
					success(res) {
						var token = uni.getStorageSync("token");
						uni.showLoading()
						uni.uploadFile({
							url: that.$API_URL + 'index/upload',
							filePath: res.tempFilePaths[0],
							name: 'file',
							formData: {
								"token": token
							},
							success: res => {
								var data = JSON.parse(res.data);
								if (data.code == 1) {
									that.$api("user.update_avatar", {
										avatar: data.data.fullurl
									}).then((resData) => {
										uni.hideLoading()
										if (resData.code == 1) {
											that.userImg = data.data.fullurl +
												'?imageMogr2/thumbnail/280x280';
											that.getUserInfo()
										}
									})
								} else {
									uni.hideLoading()
								}
							},
							complete: e => {
								uni.hideLoading()
							}
						})
					}
				})
				// #endif

			},
			// 跳转角色
			skipRole() {
				uni.navigateTo({
					url: '/pages/mine/role',
				})
				// uni.setStorageSync('user_id',that.userInfo.id)
			},
			changeTab(e) {
				// console.log(e)
				let that = this
			},
			async getUserData() {
				let that = this
				that.$api('user.info', {
					user_id: that.userInfo.id
				}).then(res => {
					if (res.code === 1) {
						if (res.data.background_image == null) {
							that.background_image = `../../static/userBg.png`;
						} else {
							that.background_image = res.data.background_image;
						}
						that.userData = res.data
					}
				})
			},
			async getPostMine() {
				let that = this
				that.loadmore = 'loading'
				that.$api('post.mine', that.params).then(res => {
					if (res.code === 1) {
						that.paginator.total = res.data.total
						that.paginator.last_page = res.data.last_page
						// console.log('llll',res.data);
						that.listPostMine = [...that.listPostMine, ...res.data.data]
						that.listPostMine.forEach(item => {
							item.user = that.userInfo
						})
						if (that.params.page < res.data.last_page) {
							that.loadmore = 'loadmore'
						} else {
							that.loadmore = 'nomore'
						}
					}
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.tips {
		position: absolute;
		top: -30rpx;
		left: 110rpx;
		background: rgb(254, 67, 115);
		border-bottom-left-radius: 0rpx;
		padding: 10rpx 15rpx;
		border-radius: 50rpx;
		box-sizing: border-box;
		border-bottom-left-radius: 0rpx;
		white-space: nowrap;
	}

	.fixedHead {
		padding-top: calc(var(--status-bar-height) + 20rpx);
		background: #fff;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99999;
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-bottom: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		box-sizing: border-box;
		transition: all 0.2s;
		border-bottom: 1rpx solid rgba(238, 238, 238, 0.5);
	}



	.mineHead {
		height: 622rpx;
		box-sizing: border-box;
		padding: 140rpx 30rpx 0rpx 30rpx;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.45) 100%);
	}

	.containerBox {
		border-radius: 30rpx 30rpx 0px 0px;
		margin-top: -70rpx;
		background: #fff;
		position: relative;

		.select {
			padding: 50rpx;
			color: #323232;
			font-size: 28rpx;

			.selectImg {
				width: 106rpx;
				height: 106rpx;
			}
		}

	}

	.bannerBox {
		width: 690rpx;
		height: 140rpx;
		margin: 0 auto;
		overflow: hidden;
		border-radius: 10rpx;

		.mineSwiper {
			width: 100%;
			height: 100%;

			.banner {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>