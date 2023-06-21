<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view>
		<image src="@/static/embed/sexBg.png"
			style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: -1;">
		</image>
		<view class="px-4 py-2 bg-gradient-to-b to-black" :style="`padding-top: 100rpx;`">
			<view class="flex justify-between items-center" style="align-items:center;justify-content: center;">
				<view class="text-2xl font-bold" style="text-align: center;">雅集</view>
				<!-- <view class="">
					<i class="ri-user-search-fill text-3xl leading-none bg-gradient-to-b from-rose-500 to-rose-400 bg-clip-text text-transparent"
						@click="$u.route('/pages/user/newSearch')"></i>
				</view> -->
			</view>
			<!-- <view class="grid grid-cols-2 gap-4 mt-6">
                <view class="bg-purple-500 p-4 text-white rounded" @click="$u.route('pages/joy/poetry')">
                    <view class="text-xl">曲水流觞</view>
                    <view class="mt-4 opacity-75">美酒助兴畅玩嗨翻天</view>
                </view>
                <view class="bg-red-500 p-4 text-white rounded" @click="$u.route('pages/joy/wine')">
                    <view class="text-xl">诗词结缘</view>
                    <view class="mt-4 opacity-75">美酒助兴畅玩嗨翻天</view>
                </view>
            </view> -->
			<view class="grid gap-4 mt-6" style="display: flex;align-items: center;">
				<view class="activity" @click="$u.toast('暂未开放，敬请期待吧')">
					<image src="../../static/activity1.png" mode=""></image>
					<!-- <view class="text-xl">曲水流觞</view>
					<view class="mt-4 opacity-75">美酒助兴畅玩嗨翻天</view> -->
				</view>
				<view class=" activity" @click="$u.toast('暂未开放，敬请期待吧')">
					<image src="../../static/activity2.png" mode=""></image>
					<!-- <view class="text-xl">诗词结缘</view>
					<view class="mt-4 opacity-75">美酒助兴畅玩嗨翻天</view> -->
				</view>
			</view>
		</view>
		<!-- 搜索人物 -->
		<view class="searchContainer">
			<view class="searchBar" @click="$u.route('pages/user/newSearch')">
				<text class="ri-search-line" style="font-size: 35rpx;"></text>
				<text style="margin-left: 20rpx;">搜索人物</text>
			</view>
			<view class="searchList">
				<view class="searchItem" v-for="(item,index) in searchList.slice(0,3)" :key="index"
					@click="handleSearchTitle(item)">
					{{item.title}}
				</view>

			</view>
			<!-- <view class="search-people-small" @click="$u.route('pages/user/newSearch')"><text
					style="margin-left: 30rpx;">搜索人物</text> </view>
			<view class="search-example-bottom">
				<view class="search-example " v-for="(item,index) in searchList" :item=item>
					<view class="search-example-item" @click="handleSearchTitle(item)">{{item.title}}</view>
				</view>
			</view> -->
		</view>
		<view class="p-4">
			<u-tabs :list="tablist" lineColor="#FE4373" lineWidth="120rpx" lineHeight="16rpx" itemStyle="height: 72rpx;"
				inactiveStyle="color: #808080; transform: scale(1);font-weight:normal;transition:all 0.3s;"
				activeStyle="color: #323232 ; font-weight: blod; transform: scale(1.2);transition:all 0.3s;"
				@change="changeTab">
			</u-tabs>
			<block v-if="type === 'user'">
				<uc-user v-for="(item, index) in listUserRecommend2" :key="index" :item="item"></uc-user>
				<u-loadmore v-if="listUserRecommend.length" :status="loadmore" nomoreText="" color="#a1a1a1"
					marginTop="20" />
				<u-empty v-if="!listUserRecommend.length" icon="/static/empty.png" text="数据为空" textColor="#a1a1a1"
					marginTop="100"></u-empty>
			</block>
			<block v-if="type === 'post'">
				<!-- <uc-post v-for="(item, index) in listPostRecommend" :key="index" :item="item"></uc-post> -->
				<takequestion v-for="(item, index) in listPostRecommend" :key="index" :index="index" :item="item">
				</takequestion>
				<u-loadmore v-if="listPostRecommend.length" :status="loadmore" nomoreText="" color="#a1a1a1"
					marginTop="20" />
				<u-empty v-if="!listPostRecommend.length" icon="/static/empty.png" text="数据为空" textColor="#a1a1a1"
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
				<u-empty v-if="!listGroupRecommend.length" icon="/static/empty.png" text="数据为空" textColor="#a1a1a1"
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
		<uc-tabbar></uc-tabbar>
	</view>
</template>
<script>
	export default {
		name: 'index',
		components: {},
		data() {
			return {
				// tablist: [{
				// 		name: '每日邂逅',
				// 		type: 'user',
				// 		count: 0
				// 	},
				// 	{
				// 		name: '话题速配',
				// 		type: 'post',
				// 		count: 0
				// 	},
				// ],
				tablist: [{
					name: '每日邂逅',
					type: 'user',
					count: 0
				}],
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
				progressNum: 0
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
		onReachBottom() {
			let that = this
			if (that.loadmore === 'nomore') return false
			that.loadmore = 'loading'
			that.params.page = ++that.params.page
			switch (that.type) {
				case 'user':
					that.getUserRecommend()
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
			var count = uni.getStorageSync('pageCount') || 0;
			count++;
			uni.setStorageSync('pageCount', count);
			if (count < 1) {
				uni.request({
					url: 'https://yaji.ixiaojin.cn/api/version/index',
					success: function(res) {
						console.log(res)
						var latestVersion = res.data.data.oldversion;
						var currentVersion = res.data.data.newversion;
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
					}
				});
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
			//关闭更新弹窗
			renewCancel() {
				this.$store.commit("setisRenew", false)
			},
			//下载新版本
			download() {
				var that = this;
				console.log(that.$store.state.renew.downloadUrl)
				this.progress = false;
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
									// #ifdef APP-PLUS
									plus.runtime.install(res.tempFilePath)
									// #endif
								}
							}
						});
					}
				});
				downloadTask.onProgressUpdate((res) => {
					that.progressNum = res.progress
				})
			},
			// 搜索中的角色称号
			searchName() {
				let that = this
				that.$api('role_title.lists').then(res => {
					if (res.code === 1) {
						that.searchList.push(res.data[0], res.data[1], res.data[2])
					}
				})

			},

			// 搜索
			handleSearchTitle(item) {
				uni.setStorageSync('titleItem', item)
				let that = this
				uni.navigateTo({
					url: '/pages/index/indexSearch',
					success: () => {
						uni.setStorageSync('titleItem', item)
					},
					fail: (err) => {
						console.log(err);
					}
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
						that.listPostRecommend = []
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
						console.log(res)
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
				that.params.limit = 3
				that.$api('post_cate.lst', that.params).then(res => {
					if (res.code === 1) {
						// that.paginator.total = res.data.total
						// // that.paginator.last_page = res.data.last_page
						that.listPostRecommend = res.data
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
		margin: 20rpx 30rpx 30rpx 30rpx;
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
</style>