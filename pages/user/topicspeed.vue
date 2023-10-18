<template>
	<view class="">
		<image src="@/static/embed/sexBg.png"
			style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: -1;">
		</image>
		<u-navbar title="话题详情" :safeAreaInsetTop="true" :placeholder="true" :bgColor="headColor">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="pageBack"></i>
			</view>
		</u-navbar>
		<view style="display: flex;justify-content: space-between;padding: 20rpx 30rpx;">
			<view class="face" style="display: flex;align-items: center;">
				<view>
					<i class="ri-hashtag"></i>{{title}}
				</view>
				<view style="display: flex;">
					<text class="ri-fire-fill" style="color: #FE4373;font-size: 40rpx;"></text>
					<view class="mw" style="color: #FE4373;">{{hot}}</view>
				</view>
			</view>
			<view style="display: flex;">
				<view @click="is_ok()"
					style="color:#fff;width: 118rpx;height: 60rpx;background: #FE4373;border-radius: 10rpx;text-align: center;line-height: 60rpx;">
					发动态</view>
			</view>
		</view>
		<view class="topic">
			<uc-post @clickDetails="clickDetails" v-for="(item, index) in topicspeedList" :key="index"
				:item="item"></uc-post>
			<u-loadmore v-if="topicspeedList.length" :loadmoreText="nomoreText" color="#a1a1a1" marginTop="20" />
			<u-empty v-if="!topicspeedList.length" icon="/static/null.png" text="数据为空" textColor="#a1a1a1"
				marginTop="100"></u-empty>
		</view>
		<topPrompt></topPrompt>
	</view>
</template>

<script>
	export default {
		name: 'topicspeed',
		data() {
			return {
				page: 1,
				last_page: 0,
				topicspeedList: [],
				hot: '',
				title: '',
				audioStatus: false,
				nomoreText: "加载更多",
				headColor: "rgba(0,0,0,0)",
				path: "",
				isClick: false,
			}
		},
		onLoad(options) {
			this.path = options.type == 'index' ? 'index' : 'square'
		},
		onShow(options) {
			console.log(this.isClick)
			if (this.isClick == false) {
				this.page = 1;
				this.topicspeedList = [];
				this.getLists();
			} else {
				this.isClick = false;
			}
		},
		onReachBottom() {
			if (this.page < this.last_page) {
				this.page++;
				this.getLists()
			} else {
				this.nomoreText = "没有更多了"
			}
		},
		onPageScroll(e) {
			if (parseInt(e.scrollTop) >= 30) {
				this.headColor = "#fff"
			} else {
				this.headColor = "rgba(0,0,0,0)"
			}
		},
		methods: {
			//是否点跳转内容页
			clickDetails() {
				this.isClick = true;
			},
			pageBack() {
				if (this.path == 'index') {
					this.$u.route({
						type: 'navigateBack',
						delta: 1
					})
				} else {
					uni.reLaunch({
						url: '/pages/index/square',
					});
				}
			},
			is_ok() {
				let that = this;
				that.$api('post.is_add').then(res => {
					console.log('ii', res);
					if (res.data === 0) {
						that.$u.toast('无角色暂不能发布动态')
						return
					} else {
						var obj = {
							title: that.title,
							post_cate_id: this.$Route.query.post_cate_id
						}
						uni.navigateTo({
							url: '/pages/post/add?postData=' + JSON.stringify(obj)
						})
					}
				})
			},
			openUrl(id) {
				var userInfo = uni.getStorageSync("userInfo");
				if (id == userInfo.id) {
					this.$u.route('/pages/index/mine')
				} else {
					this.$u.route('/pages/user/home', {
						user_id: id
					})
				}
			},
			// 点踩
			handleConcleDig(id, index, userId) {
				let that = this;
				that.topicspeedList = []
				that.$api('user.info').then(res => {
					if (res.code === 1) {
						if (userId != res.data.id) {
							that.$api('post.cai', {
								post_id: id,
							}).then(res => {
								if (res.code === 1) {
									if (that.topicspeedList[index].cai == 0) {
										that.topicspeedList[index].cai = 1
									} else {
										that.topicspeedList[index].cai = 0
									}
									that.getLists()
								}
							})
						} else {
							that.$u.toast('不能给自己点踩哦')
						}
					} else {
						that.$u.toast(res.msg)
						return
					}
				})
			},
			// 点赞红心
			handlePostDig(id, index) {
				let that = this;
				that.$api('post.dig', {
					post_id: id,
				}).then(res => {
					if (res.code === 1) {
						if (that.topicspeedList[index].zan == 0) {
							that.topicspeedList[index].zan = 1
						} else {
							that.topicspeedList[index].zan = 0
						}
						that.topicspeedList = []
						that.getLists()
					} else {
						that.$u.toast(res.msg)
					}
				})
			},
			//听语音
			handlePlayAudio(audio) {
				let that = this
				if (!audio) {
					that.$u.toast('语音不能为空')
					return false
				}
				if (!that.audio) {
					that.audio = uni.createInnerAudioContext()
					that.audio.src = audio
				}
				that.audioStatus = !that.audioStatus
				if (that.audioStatus) {
					that.$nextTick(function() {
						that.audio.play()
						that.audio.onEnded((e) => {
							that.audioStatus = false
						})
					})
				} else {
					that.$nextTick(function() {
						that.audio.pause()
					})
				}
			},
			//查看图片
			onPreviewTap(imgs, num) {
				var that = this;
				uni.previewImage({
					current: num,
					urls: imgs
				})
			},
			//获取数据
			getLists() {
				var that = this;
				that.loadmore = 'loading'
				that.$api('post.recommend', {
					"page": that.page,
					"post_cate_id": this.$Route.query.post_cate_id
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
		},
	}
</script>

<style lang="scss" scoped>
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
</style>