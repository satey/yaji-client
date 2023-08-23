<template>
	<view>
		<u-navbar :title="title" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view style="padding: 30rpx;box-sizing: border-box;">
			<block v-for="(item,index) in roleList" :key="index">
				<view style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 30rpx;"
					@click="openUserDetail(item)">
					<view style="display: flex;width: 80%;">
						<view style="margin-right: 20rpx;">
							<image v-if="item.user_avatar != null" :src="item.user_avatar"
								style="width: 100rpx;height: 100rpx;border-radius: 50%;" mode=""></image>
							<block v-else>
								<image v-if="item.gender == 2" src="@/static/avatar-female.png"
									style="width: 100rpx;height: 100rpx;border-radius: 50%;" mode=""></image>
								<image v-if="item.gender == 1" src="@/static/avatar.png"
									style="width: 100rpx;height: 100rpx;border-radius: 50%;" mode=""></image>
							</block>
						</view>
						<view
							style="height: 100rpx;display: flex;flex-direction: column;justify-content: space-around;">
							<view>{{item.realname}}·{{item.dynasty}}</view>
							<view style="color: #555555;font-size: 25rpx;">
								<text v-if="item.achievements != null">{{item.achievements.replace(/,/g, '  ')}}</text>
							</view>
						</view>
					</view>
					<view style="display: flex;align-items: center;color:rgba(245, 154, 35) ;"
						v-if="item.user_total_mw != null">
						<view
							style="width: 40rpx;height:40rpx;border-radius:50% ;background:rgba(245, 154, 35,0.5);text-align: center;line-height: 36rpx;font-size: 25rpx;">
							望</view>
						<view style="margin-left: 10rpx;">{{item.user_total_mw}}</view>
					</view>
					<view v-if="item.user_total_mw == null">
						未激活
					</view>
				</view>
			</block>
			<u-empty v-if="!roleList.length" icon="/static/null.png" text="暂无内容" textColor="#a1a1a1"
				marginTop="100"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "",
				page: 1,
				role_title_id: "",
				roleList: []
			}
		},
		onLoad(e) {
			console.log(e)
			this.title = e.title;
			this.role_title_id = e.id;
			this.getData()
		},
		onReachBottom() {
			this.page++;
			this.getData()
		},
		methods: {
			getData() {
				let that = this
				that.$api('user.recommend', {
					page: that.page,
					keywords: "",
					role_title_id: that.role_title_id
				}).then(res => {
					console.log(res)
					if (res.code === 1) {
						that.roleList = [...that.roleList, ...res.data.data]
					}
				})
			},
			openUserDetail(item) {
				if (item.user_id != null) {
					this.$u.route('/pages/user/home', {
						user_id: item.user_id
					})
				}
			}
		}
	}
</script>

<style>
</style>