<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="" :style="`padding-top: 80rpx;`">
		<image src="@/static/embed/sexBg.png"
			style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: -1;">
		</image>
		<view class="flex justify-between px-4 py-2"
			style="padding-top: 80rpx; position: fixed;top: 0;width: 100%;box-sizing: border-box;z-index: 99;transition: all 0.3s; "
			:style="{background:headBarBgColor}">
			<u-tabs :list="tablist" lineColor="#FE4373" lineWidth="70rpx" lineHeight="16rpx" itemStyle="height: 72rpx;"
				inactiveStyle="color: #787878; transform: scale(1);"
				activeStyle="color: #333333; font-weight: blod; transform: scale(1.2);" @change="changeTab">
			</u-tabs>
			<view class="pt-2">
				<!-- <i class="ri-add-circle-fill text-3xl leading-none bg-gradient-to-b from-rose-500 to-rose-400 bg-clip-text text-transparent" @click="$u.route('/pages/post/add')"></i> -->
				<!-- <i class="ri-add-circle-fill text-3xl leading-none bg-gradient-to-b from-rose-500 to-rose-400 bg-clip-text text-transparent" @click="is_ok()"></i> -->
				<view @click="is_ok()"
					style="color:#fff;width: 118rpx;height: 60rpx;background: #FE4373;border-radius: 10rpx;text-align: center;line-height: 60rpx;">
					发动态</view>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
		<view class="bannerBox" v-if="bannerData.length != 0">
			<image class="banner" :src="bannerData.image" mode="scaleToFill" v-if="bannerData.status == 'normal'"
				@click="jumpBanner(bannerData)">
			</image>
		</view>
		<block v-if="type === 'recommend'">
			<uc-post v-for="(item, index) in postRecommendList" :key="index" :item="item"
				@openDetail="openDetail"></uc-post>
			<u-loadmore v-if="postRecommendList.length" :status="loadmore" nomoreText="" color="#a1a1a1"
				marginTop="20" />
			<u-empty v-if="!postRecommendList.length" icon="/static/null.png" text="暂无内容" textColor="#a1a1a1"
				marginTop="100"></u-empty>
		</block>
		<block v-if="type === 'port'">
			<view style="padding: 0rpx 30rpx;box-sizing: border-box;">
				<takequestion v-for="(item, index) in listPostRecommend" :key="index" :index="index" :item="item">
				</takequestion>
			</view>

			<u-loadmore v-if="listPostRecommend.length" :status="loadmore" nomoreText="" color="#a1a1a1"
				marginTop="20" />
			<u-empty v-if="!listPostRecommend.length" icon="/static/empty2.png" text="数据为空" textColor="#a1a1a1"
				marginTop="100"></u-empty>
		</block>
		<block v-if="type === 'follow'">
			<uc-post v-for="(item, index) in postFollowList" :key="index" :item="item"
				@openDetail="openDetail"></uc-post>
			<u-loadmore v-if="postFollowList.length" :status="loadmore" nomoreText="" color="#a1a1a1" marginTop="20" />
			<u-empty v-if="!postFollowList.length" icon="/static/null.png" text="暂无内容" textColor="#a1a1a1"
				marginTop="100"></u-empty>
		</block>
		<topPrompt></topPrompt>
		<!-- <uc-auth></uc-auth>/ -->
		<!-- <uc-tabbar></uc-tabbar> -->
	</view>
</template>
<script>
	export default {
		name: 'square',
		data() {
			return {
				tablist: [{
						name: '广场',
						type: 'recommend',
						count: 0
					},
					{
						name: '话题',
						type: 'port',
						count: 0
					},
					{
						name: '关注',
						type: 'follow',
						count: 0
					},
				],
				type: 'recommend',
				userList: [],
				postRecommendList: [],
				postFollowList: [],
				params: {
					page: 1,
				},
				paginator: {
					total: 0,
					last_page: 0,
				},
				loadmore: false,
				follow_user_id: null,
				// -----------
				headBarBgColor: "",
				bannerData: [],
				ispage: false,
				oldPostRecommendList: [],
				listPostRecommend: []
			}
		},
		onLoad(option) {
			let that = this
			that.getAd()
		},
		onShow() {
			let that = this;
			if (that.ispage == true) {
				that.ispage = false;
			} else {
				that.getPostRecommend1()
			}

		},
		onReachBottom() {
			let that = this;
			if (that.loadmore === 'nomore') return false
			that.loadmore = 'loading'
			that.params.page = ++that.params.page;
			switch (that.type) {
				case 'recommend':
					that.getPostRecommend()
					break
				case 'follow':
					that.getPostFollow()
					break
				case 'port':
					console.log("port")
					that.getPort()
					break
				default:
					break
			}
		},
		// onShow() {
		// 	let that = this;
		// 	this.params.page = 1;
		// 	that.postRecommendList = [];
		// 	that.getPostRecommend();
		// },
		onPageScroll(e) {
			if (parseInt(e.scrollTop) > 30) {
				this.headBarBgColor = "#fff"
			} else {
				this.headBarBgColor = ""
			}
		},
		methods: {
			openDetail() {
				this.ispage = true;
			},
			jumpBanner(item) {
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
					type: 1
				}).then(res => {
					if (res.code == 1) {
						if (res.data.length != 0) {
							that.bannerData = res.data[0];
						}
					}
				})
			},
			is_ok() {
				let that = this;
				that.$api('post.is_add').then(res => {
					console.log('ii', res);
					if (res.data === 0) {
						that.$u.toast('无角色暂不能发布动态')
						return
					} else {
						that.ispage = true;
						uni.navigateTo({
							url: '/pages/post/add'
						})
					}
				})
			},
			changeTab(e) {
				let that = this
				that.type = e.type;
				switch (that.type) {
					case 'recommend':
						that.params.page = 1
						that.postRecommendList = []
						that.getPostRecommend()
						break
					case 'follow':
						that.params.page = 1
						that.postFollowList = []
						that.getPostFollow()
						break
					case 'port':
						that.params.page = 1
						that.listPostRecommend = []
						that.getPort()
						break
					default:
						break
				}
			},
			async getPort() {
				let that = this
				that.loadmore = 'loading'
				that.params.limit = 10
				that.$api('post_cate.lst', that.params).then(res => {
					if (res.code === 1) {
						that.listPostRecommend = [...that.listPostRecommend, ...res.data];
						if (res.data.length != 0) {
							that.loadmore = 'loadmore'
						} else {
							that.loadmore = 'nomore'
						}
					}
				})
			},
			getPostRecommend1() {
				let that = this
				that.loadmore = 'loading'
				that.$api('post.recommend', {
					'page': 1
				}).then(res => {
					if (res.code === 1) {
						that.oldPostRecommendList = res.data.data;
						if (that.postRecommendList.length == 0) {
							that.getPostRecommend()
						} else {
							if (that.postRecommendList[0].id != res.data.data[0].id) {
								that.params.page = 1;
								that.postRecommendList = [];
								that.getPostRecommend()
							}
						}
					}
				})
			},
			async getPostRecommend() {
				let that = this
				that.loadmore = 'loading'
				that.$api('post.recommend', that.params).then(res => {
					if (res.code === 1) {
						that.paginator.total = res.data.total
						that.paginator.last_page = res.data.last_page;
						that.postRecommendList = [...that.postRecommendList, ...res.data.data]
						if (that.params.page < res.data.last_page) {
							that.loadmore = 'loadmore'
						} else {
							that.loadmore = 'nomore'
						}
					}
				})
			},
			async getPostFollow() {
				let that = this
				that.loadmore = 'loading'
				that.$api('post.follow_user_post_list', that.params).then(res => {
					if (res.code === 1) {
						that.paginator.total = res.data.total;
						that.paginator.last_page = res.data.last_page;
						that.postFollowList = [...that.postFollowList, ...res.data.data];
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
	.bannerBox {
		width: 690rpx;
		height: 140rpx;
		margin: 0 auto;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.banner {
		width: 100%;
		height: 100%;
	}
</style>