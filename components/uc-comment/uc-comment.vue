<template>
	<view>
		<view class="commentItem" style="margin-top: 30rpx;display: flex;" v-if="item.status != 'hidden'">
			<u-avatar size="85" :src="item.avatar || '/static/avatar.png'"
				@click="$u.route('/pages/user/home', { user_id: item.user_id })"></u-avatar>
			<view style="flex: 1;margin-left: 16rpx;">
				<view style="display: flex;align-items: center;justify-content: space-between;height: 65rpx;">
					<view style="color: #323232;font-size: 24rpx;">
						{{ name}}
					</view>
					<view style="display: flex;" @click="handlePostDigComment()">
						<text v-show='item.is_zan==0' class="ri-heart-line"
							style="font-size: 32rpx;margin-right: 10rpx;color: #999999;"></text>
						<text v-show='item.is_zan==1' class="ri-heart-fill"
							style="font-size: 40rpx;margin-right: 10rpx;color: #fe4373;"></text>
						<text <text style="font-size: 22rpx;color: #999;">{{ item.diggnums }}</text>
					</view>
				</view>
				<view class="commentItemContent">
					<view style="color: #323232;font-size: 28rpx;">{{ item.content }}</view>
					<view>
						<text style="color: #999;font-size: 22rpx;margin-right: 10rpx;">{{item.createdate}}</text>
						<!-- <text style="color: #808080;font-size: 22rpx;">回复</text> -->
					</view>
				</view>
			</view>
		</view>
		<!-- <view  class="flex mt-6">
		    <view class="mr-4">
		        <u-avatar size="72" :src="item.avatar || '/static/avatar.png'" @click="$u.route('/pages/user/home', { user_id: item.user_id })"></u-avatar>
		    </view>
		    <view class="flex-1">
		        <view class="text-base leading-none mt-1">{{ item.role_realname + ' · ' + item.role_dynasty || '无名氏' }}</view>
		        <view class="mt-4">{{ item.content }}</view>
		        <view class="mt-2">
		            <text class="text-xs leading-none text-gray-400">{{item.createdate}}</text>
		            <text class="text-xs text-gray-400 ml-4" @click="addComment(item)">回复</text>
		        </view>
		    </view>
		   <view class="ml-4 flex items-center" @click="handlePostDigComment()">
			   <i v-show='item.is_zan==0'  class="ri-heart-3-fill text-xl bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
			   <i v-show='item.is_zan==1' class="ri-heart-3-fill text-xl bg-gradient-to-b from-red-400 to-red-400 bg-clip-text text-transparent"></i>
		       <text class="text-gray-500 ml-2">{{ item.diggnums }}</text>
		    </view>
		</view> -->
	</view>
</template>

<script>
	export default {
		props: {
			item: {},
			id: Number
		},
		data() {
			return {
				id1: null,
				is_commentZan: 0,
				comment_diggnums: null,
				post_id: null,
				name: ""
			}
		},
		created() {
			if (this.item.role_realname == null) {
				this.name = '无名氏'
			} else {
				this.name = this.item.role_realname + ' · ' + this.item.role_dynasty
			}
		},
		methods: {
			// 点赞评论
			handlePostDigComment() {
				let that = this
				that.$api('post_comment.dig', {
					id: that.item.id
				}).then(res => {
					if (res.code === 1) {
						that.$u.toast('点赞成功')
						that.isDigComment()
					} else {
						that.$u.toast(res.msg)
					}
				})

			},
			isDigComment() {
				let that = this

				that.$api('post_comment.lists', {
					post_id: that.id
				}).then(res => {
					if (res.code === 1) {
						let reslist = res.data
						for (let i = 0; i < reslist.length; i++) {
							if (reslist[i].id === that.item.id) {
								that.item.is_zan = reslist[i].is_zan
								that.item.diggnums = reslist[i].diggnums
							}
						}
					} else {
						that.$u.toast(res.msg)
					}
				})
			}

		}
	}
</script>

<style>

</style>