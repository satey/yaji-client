<template>
	<view style="background: #f7f7f7;min-height: 100vh;">
		<view class="header" style="">
			<u-navbar :fixed="true" :title="topTitle" :safeAreaInsetTop="true" :placeholder="true" :bgColor="bgColor">
				<view slot="left">
					<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
				</view>
			</u-navbar>
			<image style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;" src="@/static/topcipBg.png"
				mode="aspectFill">
			</image>
			<view style="position: relative;z-index: 9;width: 100%;">
				<view style="color: #333333;font-size:32rpx ;font-family: font-test !important;">#{{title}}
				</view>
				<view style="color: #333333;font-size:26rpx ;margin-top: 12rpx;">
					{{desc}}
				</view>
			</view>
		</view>
		<view style="height: 403rpx;"></view>
		<view @click="openAddPost"
			style="position: fixed;left: 0;bottom: 120rpx;z-index: 10;left: 50%;transform: translate(-50%,-0%);">
			<image style="width: 306rpx;height: 85rpx;" src="@/static/canyuhuati.png" mode="widthFix"></image>
		</view>
		<view>
			<uc-post @clickDetails="clickDetails" v-for="(item, index) in topicspeedList" :key="index"
				:item="item"></uc-post>
			<!-- <feiWaterfall :lists="list" :from="'topic'" @waterfallClick="waterfallClick"></feiWaterfall> -->
			<view v-if="!topicspeedList.length" style="text-align: center;margin-top: 50rpx;">
				<u-empty icon="/static/iconImage/jilu.png" text="" textColor="#a1a1a1" marginTop="100"></u-empty>
			</view>
		</view>
		<u-popup :show="releaseShow" @close="releaseShow = false" mode="bottom" :overlayOpacity="0.5" :closeable="false"
			:round="20" :customStyle="{background:'transparent'}">
			<view class="releaseBox">
				<view class="releaseBlack">
					<view style="color:#333 ;font-size: 30rpx;">话题创建成功，若没有关联的动态，不会被推荐 呦！接下来发布一则动态吧。</view>
					<view @click="openAddPost" style="margin-top: 67rpx;text-align: center;">
						<image style="width: 306rpx;height: 85rpx;" src="@/static/canyuhuati.png" mode="widthFix">
						</image>
					</view>
					<view @click="releaseShow=false"
						style="color:#666 ;font-size: 32rpx;text-align: center;margin-top: 20rpx;">不了</view>
				</view>
			</view>
		</u-popup>
		<feiqslsHit></feiqslsHit>
	</view>
</template>

<script>
	import feiWaterfall from "@/components/fei-waterfall/fei-waterfall"
	export default {
		name: 'topicspeed',
		components: {
			feiWaterfall
		},
		data() {
			return {
				page: 1,
				list: [],
				title: '',
				desc: "",
				releaseShow: false,
				topicspeedList: [],
				bgColor: "transparent",
				topTitle: '',
				post_cate_id:''
			}
		},
		onLoad(options) {
			if (this.$Route.query.is_create_post != undefined) {
				if (this.$Route.query.is_create_post == 0) {
					this.releaseShow = true;
				}
			}
			this.post_cate_id = this.$Route.query.post_cate_id
			this.setFontFamily()
			this.getLists()
			this.topicspeedList = [];
			this.getLists2()
			uni.$on("addPostOk", () => {
				this.topicspeedList = [];
				this.page = 1;
				this.getLists2()
			})
		},
		onShow() {

		},
		onReachBottom() {
			this.page++;
			this.getLists2()
		},
		onPageScroll(e) {

		},
		onPageScroll(e) {
			if (e.scrollTop >= 80) {
				this.bgColor = "#fff"
				this.topTitle = this.title
			} else {
				this.bgColor = "transparent"
				this.topTitle = ""
			}
		},
		methods: {
			getLists() {
				this.$api("post_cate.getPostByFall", {
					page: this.page,
					post_cate_id: this.post_cate_id ,
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.title = res.data.header.title
						this.desc = res.data.header.desc
						this.list = [...this.list, ...res.data.list]
					}
				})
			},
			clickDetails() {

			},
			//获取数据
			getLists2() {
				var that = this;
				that.loadmore = 'loading'
				that.$api('post.recommend', {
					"page": that.page,
					"post_cate_id": this.post_cate_id 
				}).then(res => {
					if (res.code === 1) {
						that.topicspeedList = [...that.topicspeedList, ...res.data.data];
						that.last_page = res.data.last_page;
						if (that.page < res.data.last_page) {
							that.loadmore = 'loadmore'
						} else {
							that.loadmore = 'nomore';
							that.nomoreText = "没有更多了"
						}
					}
				})
				that.$api('post.search', {
					"id": that.$Route.query.post_cate_id
				}).then(res => {
					if (res.code == 1) {
						that.title = res.data.title;
						that.hot = res.data.hot_num;
					}
				})
			},
			//设置字体
			setFontFamily() {
				// #ifdef APP-PLUS
				uni.loadFontFace({
					family: 'font-test',
					// 本地字体路径需转换为平台绝对路径
					source: `url(${plus.io.convertLocalFileSystemURL('_www/static/AaHouDiHei.ttf')})`,
					success() {
						console.log('success')
					},
					fail(e) {
						console.log('fail')
					}
				})
				// #endif
			},
			openAddPost() {
				let that = this;
				var obj = {
					title: that.title,
					post_cate_id: this.$Route.query.post_cate_id
				}
				this.releaseShow = false;
				uni.navigateTo({
					url: '/pages/post/add?postData=' + JSON.stringify(obj)
				})
			},
			waterfallClick(e) {
				if (e.from == 'topic') {
					this.$u.route('/pages/post/detail', {
						post_id: e.item.post_id,
						from: 'topic',
						post_cate_id: this.$Route.query.post_cate_id
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f7f7f7;
		min-height: 100vh;
	}

	.header {
		width: 100vw;
		height: 403rpx;
		position: absolute;
		top: 0;
		left: 0;
		padding: 0rpx 39rpx 12rpx 39rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: flex-end;
		box-sizing: border-box;
		color: #333;
		font-size: 28rpx;
	}

	.list {
		flex-direction: row;
		justify-content: space-between;
		box-sizing: border-box;
		display: flex;
		padding-top: 25rpx;
		padding: 25rpx 10rpx 10rpx 10rpx;
		box-sizing: border-box;

		.itemBox {
			flex: 1;
			flex-basis: 49%;
			box-sizing: border-box;
			overflow: hidden;


			.container {
				background: #fff;
				border-radius: 8rpx;
				padding: 12rpx;
				box-sizing: border-box;
				margin-bottom: 10rpx;
			}
		}
	}

	// -------------
	.face {
		display: inline-block;
		font-size: 32rpx;
		color: #6F93BD;
		line-height: 45rpx;
	}

	.hot {
		width: 40rpx;
		height: 40rpx;
	}

	.topicItem {
		padding: 30rpx;
		display: flex;
		border-bottom: 0.5px solid rgba(238, 238, 238, 0.5);
	}

	.userBox {
		height: 80rpx;
		display: flex;
		flex-direction: column;
	}

	.topicItemRight {
		flex: 1;
		margin-left: 20rpx;
	}

	.content {
		margin-top: 20rpx;
	}

	.releaseBox {
		padding: 30rpx 30rpx 135rpx 30rpx;
		box-sizing: border-box;
		color: transparent;
	}

	.releaseBlack {
		background: #fff;
		height: 416rpx;
		border-radius: 12rpx;
		padding: 62rpx 32rpx 46rpx 32rpx;
		box-sizing: border-box;
	}
</style>