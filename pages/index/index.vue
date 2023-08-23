<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view>
		<image src="@/static/embed/sexBg.png"
			style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: -1;">
		</image>
		<view class="flex justify-between items-center" :style="{background:headBarBgColor}"
			style="z-index:9999;box-sizing: border-box;width:100%;align-items:center;justify-content: center;position: fixed;top:0;left: 0;padding-top:var(--status-bar-height);padding-bottom: 20rpx;">
			<view class="text-2xl " style="text-align: center;">雅集</view>
		</view>
		<!-- 搜索人物 -->
		<view class="searchContainer" :style="`padding-top: 150rpx;`">
			<view class="searchBar" @click="$u.route('pages/user/newSearch')">
				<text class="ri-search-line" style="font-size: 35rpx;"></text>
				<text style="margin-left: 20rpx;">搜索人物</text>
			</view>
			<!-- <view class="searchList">
				<view class="searchItem" v-for="(item,index) in searchList.slice(0,3)" :key="index"
					@click="handleSearchTitle(item)">
					{{item.title}}
				</view>
			</view> -->
		</view>
		<swiper v-if="bannerData.length !=0" class="bannerBox" :circular="true" :indicator-dots="false" :autoplay="true"
			:interval="3000" :duration="1000">
			<swiper-item>
				<block v-for="(item,index) in bannerData" :key="index">
					<view class="swiper-item" v-if="item.status == 'normal'">
						<image class="banner" :src="item.image" mode="scaleToFill" @click="jumpBanner(item)"></image>
					</view>
				</block>
			</swiper-item>
		</swiper>
		<view class="px-4  bg-gradient-to-b to-black">
			<view class="grid gap-4" style="display: flex;align-items: center;margin-top: 30rpx;">
				<view class="activity" @click="$u.route('pages/joy/poetryStart')">
					<image src="../../static/activity1.png" mode="widthFix"></image>
				</view>
				<view class=" activity" @click="openWine">
					<image src="../../static/activity2.gif" mode="widthFix"></image>
				</view>
			</view>
		</view>

		<view style="padding: 30rpx 30rpx 30rpx 30rpx;box-sizing: border-box;">
			<u-tabs :list="tablist" lineColor="#FE4373" lineWidth="120rpx" lineHeight="16rpx" itemStyle="height: 72rpx;"
				inactiveStyle="color: #808080; transform: scale(1);font-weight:normal;transition:all 0.3s;"
				activeStyle="color: #323232 ; font-weight: blod; transform: scale(1.2);transition:all 0.3s;"
				@change="changeTab">
			</u-tabs>
			<block v-if="type === 'user'">
				<uc-user v-for="(item, index) in listUserRecommend2" :key="index" :item="item"></uc-user>
				<u-loadmore v-if="listUserRecommend.length" :status="loadmore" nomoreText="" color="#a1a1a1"
					marginTop="20" />
				<u-empty v-if="!listUserRecommend.length" icon="/static/empty2.png" text="数据为空" textColor="#a1a1a1"
					marginTop="100"></u-empty>
			</block>
			<block v-if="type === 'post'">
				<!-- <uc-post v-for="(item, index) in listPostRecommend" :key="index" :item="item"></uc-post> -->
				<takequestion v-for="(item, index) in listPostRecommend" :key="index" :index="index" :item="item">
				</takequestion>
				<u-loadmore v-if="listPostRecommend.length" :status="loadmore" nomoreText="" color="#a1a1a1"
					marginTop="20" />
				<u-empty v-if="!listPostRecommend.length" icon="/static/empty2.png" text="数据为空" textColor="#a1a1a1"
					marginTop="100"></u-empty>
			</block>
			<block v-if="type === 'group'">
				<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 25rpx;">
					<view
						style="display: flex;align-items: center;white-space: nowrap;color: #808080;padding-left: 22rpx;">
						<text style="font-size:30rpx ;">全部</text>
						<text class="ri-arrow-down-s-line" style="font-size: 40rpx;"></text>
					</view>
					<view class="loveRoom" style="white-space: nowrap;" @click="loveRoom">
						没喜欢的房间?
					</view>
				</view>

				<uc-group v-for="(item, index) in listGroupRecommend" :key="index" :index="index"
					:item="item"></uc-group>
				<u-loadmore v-if="listGroupRecommend.length" :status="loadmore" nomoreText="" color="#a1a1a1"
					marginTop="20" />
				<u-empty v-if="!listGroupRecommend.length" icon="/static/empty2.png" text="数据为空" textColor="#a1a1a1"
					marginTop="100"></u-empty>
			</block>
		</view>
		<!-- 	<u-popup :show="true" @close="showAction = false" mode="center" :closeable="true" :round="30">
			<view class="renew">
				<view class="container">
					<view class="renewTitle">版本更新</view>
				</view>
			</view>
		</u-popup> -->
		<!-- 充值 -->
		<view v-if="authority">
			<u-modal :show="authority" :showConfirmButton="true" :showCancelButton="true" confirmColor="#FE4373"
				confirmText="去开启" cancelText="取消" @cancel="authority=false" @confirm="openSet">
				<view style="display: flex;flex-direction: column;">
					<view style="text-align: center;font-size: 32rpx;color: #323232;font-weight: bold;">权限未开启</view>
					<view style="color:#999;font-size: 26rpx;margin-top: 30rpx;">
						<text>将无法获得聊天的消息通知。
							请在手机的 “设置” — ”通知与控制中心“ — “通知管理” — “雅集” 中打开“允许通知”。
						</text>
					</view>
				</view>
			</u-modal>
		</view>
		<u-modal :show="$store.state.renew.isRenew" :showConfirmButton="true"
			:showCancelButton="$store.state.renew.isEnforce==1?false:true" confirmColor="#FE4373" @confirm="download"
			@cancel="renewCancel">
			<view>
				<view class="renewTitle">更新内容</view>
				<scroll-view scroll-y="true" class="myScroll" style="margin-top: 30rpx;" v-if="progress">
					<view v-html="$store.state.renew.renewContent"></view>
				</scroll-view>
				<view v-if="!progress" style="margin-top: 30rpx;">
					<progress :percent="progressNum" show-info style="width: 500rpx;" />
				</view>
			</view>
		</u-modal>
		<!-- <uc-auth></uc-auth> -->
		<!-- <uc-tabbar></uc-tabbar> -->
	</view>
</template>
<script>
	import permision from "@/js_sdk/wa-permission/permission.js";
	import {
		mapMutations,
		mapActions,
		mapState
	} from 'vuex'
	export default {
		name: 'index',
		components: {},
		data() {
			return {
				tablist: [{
						name: '每日邂逅',
						type: 'user',
						count: 0
					},
					{
						name: '话题速配',
						type: 'post',
						count: 0
					},
				],
				// tablist: [{
				// 	name: '每日邂逅',
				// 	type: 'user',
				// 	count: 0
				// }],
				type: 'user',
				listUserRecommend: [],
				listUserRecommend2: [],
				listPostRecommend: [],
				listGroupRecommend: [],
				params: {
					page: 1,
				},
				paginator: {
					total: 0,
					last_page: 0,
				},
				loadmore: false,
				searchList: [],
				paginator: {
					total: 0,
					last_page: 0,
				},
				loadmore: false,
				listUserSearch: [],
				limit: 3,
				count: 0,
				// -------
				renewText: "",
				isEnforce: "",
				renewPopup: false,
				downloadUrl: "",
				progress: true,
				progressNum: 0,
				headBarBgColor: "",
				downloadFlag: true,
				authority: false,
				bannerData: []
			}
		},
		watch: {
			listUserRecommend: {
				handler(newVal, oldVal) {
					if (oldVal.length == 0) {
						this.listUserRecommend2 = newVal
					} else {
						this.listUserRecommend2 = [...newVal, ...oldVal]
					}
				},
				deep: true,
			}
		},
		onPageScroll(e) {
			if (parseInt(e.scrollTop) > 30) {
				this.headBarBgColor = "#fff"
			} else {
				this.headBarBgColor = ""
			}
		},
		onReachBottom() {
			let that = this;
			// if (that.loadmore === 'nomore') return false
			that.loadmore = 'loading'
			that.params.page = ++that.params.page;
			switch (that.type) {
				case 'user':
					that.loadmore = 'nomore'
					break
				case 'post':
					that.getPostRecommend()
					break
				case 'group':
					that.getGroupRecommend()
					break
				default:
					break
			}
		},
		mounted() {
			uni.removeStorageSync('titleItem')
		},
		onLoad(option) {
			let that = this;
			that.searchName()
			that.getUserRecommend();
			that.isPush();
			that.getAd()
			var count = uni.getStorageSync('pageCount') || 0;
			count++;
			uni.setStorageSync('pageCount', count);
			if (count < 1) {
				that.$api("versions.index").then(res => {
					var latestVersion = res.data.oldversion;
					var currentVersion = res.data.newversion;
					// console.log('currentVersion',currentVersion);
					// console.log('latestVersion',latestVersion);
					// 比较版本号
					if (compareVersion(currentVersion, latestVersion) > 0) {
						// 提示用户更新
						uni.showModal({
							title: '版本更新',
							content: '有新版本可用，是否更新？',
							success: function(res) {
								if (res.confirm) {
									// 下载最新版本
									uni.downloadFile({
										url: 'http://example.com/latestVersion.apk',
										success: function(res) {
											// 安装新版本
											uni.showModal({
												title: '安装新版本',
												content: '新版本已下载完成，是否安装？',
												success: function(res) {
													if (res.confirm) {
														uni.install({
															filePath: res
																.tempFilePath
														});
													}
												}
											});
										}
									});
								}
							}
						});
					}
				})
				// 比较版本号
				function compareVersion(v1, v2) {
					v1 = v1.split('.');
					v2 = v2.split('.');
					var len = Math.max(v1.length, v2.length);
					while (v1.length < len) {
						v1.push('0');
					}
					while (v2.length < len) {
						v2.push('0');
					}
					for (var i = 0; i < len; i++) {
						var num1 = parseInt(v1[i]);
						var num2 = parseInt(v2[i]);
						if (num1 > num2) {
							return 1;
						} else if (num1 < num2) {
							return -1;
						}
					}
					return 0;
				}
			}
		},
		onShow: function() {
			this.getUserInfo()
			var lastVisitTime = uni.getStorageSync('lastVisitTime') || 0;
			var now = Date.now();
			if (now - lastVisitTime > 24 * 60 * 60 * 1000) {
				uni.setStorageSync('pageCount', 0);
			}
			uni.setStorageSync('lastVisitTime', now);
		},
		created() {
			uni.removeStorageSync('titleItem')
		},
		methods: {
			...mapActions(['getUserInfo']),
			//广告
			getAd() {
				var that = this;
				that.$api("ad.lists", {
					type: 4
				}).then(res => {
					if (res.code == 1) {
						if (res.data.length != 0) {
							that.bannerData = res.data;
						}
					}
				})
			},
			jumpBanner(item) {
				this.$u.route(item.url)
			},
			//打开诗词结缘
			openWine() {
				var that = this;
				var userInfo = uni.getStorageSync("userInfo");
				if (userInfo.role_id > 0) {
					that.$api("poetry.isRelease").then(res => {
						if (res.code == 1) {
							if (res.data == 0) {
								that.$u.route('pages/joy/wine')
							} else {
								uni.navigateTo({
									url: '/pages/joy/wineContent'
								})
							}
						}
					})
				} else {
					that.$u.toast("无名氏无法进入哦")
				}
			},
			//打开手机设置
			openSet() {
				// #ifdef APP-PLUS
				permision.gotoAppPermissionSetting()
				// #endif
			},
			//查看push权限
			async isPush() {
				// #ifdef APP-PLUS
				// var flag = push.isOn();
				// if (flag) {
				// 	push.on();
				// } else {
				// 	push.off();
				// }
				var main = plus.android.runtimeMainActivity();
				var NotificationManagerCompat = plus.android.importClass(
					"androidx.core.app.NotificationManagerCompat");
				let pkName = main.getPackageName();
				let packageNames = NotificationManagerCompat.from(main);
				console.log('通知权限', packageNames.areNotificationsEnabled())
				if (packageNames.areNotificationsEnabled()) {
					push.on();
				} else {
					this.authority = true;
					// uni.showModal({
					// 	title: "请开启通知权限",
					// 	content: "请去设置里面开启通知权限！",
					// 	success(push) {
					// 		if (push.confirm) {
					// 			permision.gotoAppPermissionSetting()
					// 		}
					// 	}
					// })
				}
				// #endif
			},
			//关闭更新弹窗
			renewCancel() {
				this.$store.commit("setisRenew", false)
			},
			//下载新版本
			download() {
				var that = this;
				if (that.downloadFlag) {
					this.progress = false;
					that.downloadFlag = false;
					var downloadTask = uni.downloadFile({
						url: that.$store.state.renew.downloadUrl,
						success: function(res) {
							uni.hideLoading()
							// 安装新版本
							uni.showModal({
								title: '安装新版本',
								content: '新版本已下载完成，是否安装？',
								success: function(msg) {
									if (msg.confirm) {
										console.log(that.downloadFlag)
										if (that.downloadFlag) {
											// #ifdef APP-PLUS

											plus.runtime.install(res.tempFilePath);
											// #endif
										}
									}
								}
							});
						}
					});
					downloadTask.onProgressUpdate((res) => {
						that.progressNum = res.progress;
						if (parseInt(res.progress) == 100) {
							that.downloadFlag = true;
						}
					})
				} else {
					that.$u.toast("正在下载中")
				}

			},
			// 搜索中的角色称号
			searchName() {
				let that = this
				that.$api('role_title.lists').then(res => {
					if (res.code === 1) {
						that.searchList.push(res.data[0], res.data[1], res.data[2]);
					}
				})
			},

			// 搜索
			handleSearchTitle(item) {
				let that = this;
				uni.navigateTo({
					url: '/pages/index/indexSearch?titleItem=' + JSON.stringify(item),
				})
			},
			async getUserSearch() {
				let that = this
				that.loadmore = 'loading'
				that.$api('user.recommend', that.params).then(res => {
					if (res.code === 1) {
						that.paginator.total = res.data.total
						that.paginator.last_page = res.data.last_page
						that.listUserSearch = [...that.listUserSearch, ...res.data.data]
						uni.navigateTo({
							url: '/pages/index/indexSearch',
							success: () => {
								// console.log('s');
								that.$emit('item', item)
							},
							fail: (err) => {
								console.log(err);
							}
						})
						if (that.params.page < res.data.last_page) {
							that.loadmore = 'loadmore'
						} else {
							that.loadmore = 'nomore'
						}
					}
				})
			},
			// 没喜欢的房间
			loveRoom() {
				uni.showModal({
					title: '提示',
					content: '您可通过个人中心的反馈功能,告诉我们您想要创建的房间主题',
					confirmText: "确定",
					cancelText: '取消'
				})
			},
			changeTab(e) {
				// console.log(e)
				let that = this
				that.type = e.type
				switch (that.type) {
					case 'user':
						that.params.page = 1
						that.listUserRecommend = []
						that.getUserRecommend()
						break
					case 'post':
						that.params.page = 1
						that.listPostRecommend = [];
						that.getPostRecommend()
						break
					case 'group':
						that.params.page = 1
						that.litGroupRecommend = []
						that.getGroupRecommend()
						break
					default:
						break
				}
			},
			async getUserRecommend() {
				let that = this
				that.loadmore = 'loading'
				that.$api('user.recommend_user', that.params).then(res => {
					if (res.code === 1) {
						that.listUserRecommend = res.data
						if (that.params.page < res.data.last_page) {
							that.loadmore = 'loadmore'
						} else {
							that.loadmore = 'nomore'
						}
					}
				})
			},
			async getPostRecommend() {
				let that = this
				that.loadmore = 'loading'
				that.params.limit = 10
				that.$api('post_cate.lst', that.params).then(res => {
					if (res.code === 1) {
						// that.paginator.total = res.data.total
						// // that.paginator.last_page = res.data.last_page
						// that.listPostRecommend.concat(res.data);
						that.listPostRecommend = [...that.listPostRecommend, ...res.data];
						if (that.params.page < res.data.last_page) {
							that.loadmore = 'loadmore'
						} else {
							that.loadmore = 'nomore'
						}
					}
				})
			},
			async getGroupRecommend() {
				let that = this
				that.loadmore = 'loading'
				that.$api('group.lists', that.params).then(res => {
					if (res.code === 1) {
						console.log('今日雅集', res.data);
						that.paginator.total = res.data.total
						that.paginator.last_page = res.data.last_page
						that.listGroupRecommend = [...that.listGroupRecommend, ...res.data.data]
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
	.hoverClass {
		opacity: 0.9;
	}

	.activity {
		width: calc(100% / 2);
		height: 150rpx;

		& image {
			width: 100%;
			height: 100%;
		}
	}

	.searchContainer {
		padding: 20rpx 30rpx 0rpx 30rpx;
	}

	.searchBar {
		height: 72rpx;
		border-radius: 50rpx;
		border: 2rpx solid #FE4373;
		font-size: 28rpx;
		color: #808080;
		display: flex;
		align-items: center;
		padding-left: 25rpx;
	}

	.searchList {
		display: flex;
		align-items: center;
		flex-wrap: wrap;

		.searchItem {
			width: calc(100% / 4 - 10rpx);
			background: #F7F7F7;
			padding: 20rpx;
			box-sizing: border-box;
			display: inline-block;
			white-space: nowrap;
			margin-right: 20rpx;
			margin-top: 15rpx;
			border-radius: 15rpx;
			color: #808080;
		}
	}


	// --------------------
	.search-people {
		width: 688rpx;
		height: 220rpx;
		background-color: rgb(242, 242, 242);
		margin: 0 auto;
		margin-top: 25rpx;
		position: relative;

	}

	.search-people-small {
		width: 625rpx;
		height: 88rpx;
		border: 3rpx solid rgb(152, 206, 230);
		border-radius: 25rpx;
		position: absolute;
		left: 50%;
		top: 35rpx;
		transform: translate(-50%);

	}

	.search-people-small text {
		color: rgb(170, 170, 170);
		// position: absolute;
		left: 20rpx;
		line-height: 88rpx;
		font-size: 32rpx;
	}

	.search-example-bottom {
		width: 640rpx;
		margin: 0 auto;
		height: 60rpx;
		position: relative;
		bottom: 20rpx;
		top: 150rpx;
		// border: 1px solid #000;
	}

	.search-example-item {
		width: 144rpx;
		height: 48rpx;
		background-color: rgb(170, 170, 170);
		color: white;
		line-height: 48rpx;
		text-align: center;
		margin-left: 20rpx;
		border-radius: 5rpx;
		float: left;
	}

	.loveRoom {
		color: #FE4373;
		font-size: 28rpx;
	}

	.u-modal__content {
		padding-top: 0rpx !important;
	}

	.renewTitle {
		font-size: 32rpx;
		color: #333;
		text-align: center;
		font-weight: bold;
	}

	.myScroll {
		max-height: 200rpx;
	}

	.bannerBox {
		width: 100%;
		height: 140rpx;
		margin: 0 auto;
		overflow: hidden;
		border-radius: 10rpx;
		padding: 0 30rpx;
		margin-top: 30rpx;
		box-sizing: border-box;

		.banner {
			width: 100%;
			height: 140rpx;
			border-radius: 10rpx;
		}
	}
</style>