<template>
	<view>
		<u-navbar title="动态消息" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view class="lists">
			<view class="item" v-for="(item,index) in trendsMsgList" :key="index">
				<image @click="$u.route('/pages/user/home',{user_id:item.user_id})"
					style="width: 96rpx;height: 96rpx;border-radius: 50%;" :src="item.avatar" mode="aspectFill">
				</image>
				<view @click="openDetail(item)"
					style="height: 96rpx;flex: 1;display: flex;flex-direction: column;justify-content: space-around;padding-left:20rpx;border-bottom: 1px solid #ECECEC;padding-bottom: 38rpx;">
					<view style="color:#323232 ;font-size: 30rpx;">{{item.realname}}·{{item.dynasty}}</view>
					<view style="color:#999999 ;font-size: 26rpx;display: flex;align-items: center;flex-wrap: wrap;">
						<text v-if="item.cate == 1">给您评论了！</text>
						<text v-if="item.cate == 2">给您动态点赞了！</text>
						<text v-if="item.cate == 3">给您评论点赞了！</text>
						<text v-if="item.cate == 4">回复您的评论了！</text>
						<text v-if="item.cate == 5">查看您的主页了！</text>
						<text v-if="item.cate == 6">
							<block v-if="item.top_poetry_id == 0">
								给您的诗词点赞！
							</block>
							<block v-if="item.top_poetry_id > 0">
								给您的评论点赞！
							</block>
						</text>
						<text v-if="item.cate == 7">在今日邂逅喜欢了你！</text>
						<view v-if="item.cate == 8" style="display: flex;align-items: center;">
							<text>通过{{item.channel_text}}</text>
							<text>给你送了</text>
							<image :src="item.gift_image" style="width: 55rpx;height: 55rpx;" mode=""></image>
							<text>x{{item.nums}}</text>
						</view>
						<text v-if="item.cate == 9">射猜了您的覆题</text>
						<text v-if="item.cate == 10">评论了您的射覆</text>
						<text v-if="item.cate == 11">回复了您的评论</text>
						<text v-if="item.cate == 12">给您的射覆点赞了</text>
						<text v-if="item.cate == 13">给您的射覆答案点赞了</text>
						<text v-if="item.cate == 14">给您的评论点赞了</text>
						<text v-if="item.cate == 15">给您的诗词评论了</text>
						<text v-if="item.cate == 16">回复了您的评论</text>
						<text v-if="item.cate == 17">给您的对歌点赞了</text>
						<text v-if="item.cate == 18">给您的对歌点赞了</text>
						<text v-if="item.cate == 19">接了您的对歌</text>
						<text v-if="item.cate == 20">接了您的对歌</text>
						<text style="padding-left: 20rpx;">{{ $u.timeFormat(item.createtime, 'mm-dd hh:MM') }}</text>
					</view>
				</view>
			</view>
			<u-empty v-if="trendsMsgList.length==0" icon="/static/iconImage/jilu.png" text="暂无消息" textColor="#a1a1a1"
				marginTop="100"></u-empty>
		</view>
		<feiqslsHit></feiqslsHit>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				trendsMsgList: []
			}
		},
		onLoad() {
			this.trendsLists()
		},
		methods: {
			trendsLists() {
				var that = this;
				that.$api('message.trendsMsgLists').then(res => {
					console.log(res)
					if (res.code === 1) {
						that.trendsMsgList = res.data;
					}
				})
			},
			openDetail(item) {
				switch (item.cate) {
					case 1:
						this.$u.route('/pages/post/preview', {
							data: JSON.stringify({
								type: 'work',
								post_id: item.post_id
							})
						})
						break;
					case 2:
						console.log(item.post_id)
						this.$u.route('/pages/post/preview', {
							data: JSON.stringify({
								type: 'work',
								post_id: item.post_id
							})
						})
						break;
					case 3:
						this.$u.route('/pages/post/preview', {
							data: JSON.stringify({
								type: 'work',
								post_id: item.post_id
							})
						})
						break;
					case 4:
						this.$u.route('/pages/post/preview', {
							data: JSON.stringify({
								type: 'work',
								post_id: item.post_id
							})
						})
						break;
					case 5:
						this.$u.route('/pages/user/home', {
							user_id: item.user_id
						});
						break;
					case 6:
						var data = {
							id: item.poetry_id
						}
						if (item.top_poetry_id == 0) {
							this.$u.route('/pages/joy/wineDetails', {
								data: JSON.stringify(data)
							});
						}
						break;
					case 7:
						this.$u.route('/pages/user/home', {
							user_id: item.user_id
						});
						break;
					case 8:
						switch (item.channel) {
							case 1:
								this.$u.route('/pages/joy/archeryDetail', {
									archeryId: item.third_id
								});
								break;
							case 2:
								var data = {
									id: item.third_id
								}
								this.$u.route('/pages/joy/wineDetails', {
									data: JSON.stringify(data)
								});
								break;
							case 3:
								this.$u.route('/pages/post/detail', {
									post_id: item.third_id
								});
								break;
							case 4:
								this.$u.route('/pages/song/songDetails', {
									songId: item.third_id
								});
								break;
						}
						break;
					case 9:
						this.$u.route('/pages/joy/archeryDetail', {
							archeryId: item.shot_cover_id
						});
						break;
					case 10:
						this.$u.route('/pages/joy/archeryDetail', {
							archeryId: item.shot_cover_id
						});
						break;
					case 11:
						this.$u.route('/pages/joy/archeryDetail', {
							archeryId: item.shot_cover_id
						});
						break;
					case 12:
						this.$u.route('/pages/joy/archeryDetail', {
							archeryId: item.shot_cover_or_comment_id
						});
						break;
					case 13:
						this.$u.route('/pages/joy/archeryDetail', {
							archeryId: item.shot_cover_id
						});
						break;
					case 14:
						this.$u.route('/pages/joy/archeryDetail', {
							archeryId: item.shot_cover_id
						});
						break;
					case 15:
						var data = {
							id: item.top_poetry_id
						}
						this.$u.route('/pages/joy/wineDetails', {
							data: JSON.stringify(data)
						});
						break;
					case 16:
						var data = {
							id: item.top_poetry_id
						}
						var userInfo = uni.getStorageSync("userInfo");
						if (item.user_id == userInfo.id) {
							this.$u.route('/pages/joy/wineDetails', {
								data: JSON.stringify(data)
							});
						}
						break;
					case 17:
						this.$u.route('/pages/song/songDetails', {
							songId: item.duet_song_or_reply_id
						});
						break;
					case 18:
						this.$u.route('/pages/song/songDetails', {
							songId: item.duet_song_id
						});
						break;
					case 19:
						this.$u.route('/pages/song/songDetails', {
							songId: item.duet_song_id
						});
						break;
					case 20:
						this.$u.route('/pages/song/songDetails', {
							songId: item.duet_song_id
						});
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lists {
		padding: 50rpx 0rpx 50rpx 33rpx;
		box-sizing: border-box;
	}

	.item {
		display: flex;
		padding-top: 20rpx;
	}
</style>