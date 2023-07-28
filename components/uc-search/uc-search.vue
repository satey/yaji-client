<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view v-if="item.user_id != null"
		style="display: flex;align-items: center;border-bottom: 1px solid #ECECEC;padding: 25rpx 0rpx;box-sizing: border-box;"
		@click="$u.route('/pages/user/home', { user_id: item.user_id })">
		<view class="mr-4">
			<view v-if="item.gender == 1">
				<image style="" class="block w-14 h-14 rounded-full" :src="item.user_avatar || '/static/avatar.png'">
				</image>
			</view>
			<view v-if="item.gender == 2">
				<image style="" class="block w-14 h-14 rounded-full"
					:src="item.user_avatar || '/static/avatar-female.png'">
				</image>
			</view>
		</view>
		<view style="display: flex;align-items: center;justify-content: space-between;width: 100%;">
			<view class="flex-1" @click="$u.route('/pages/user/home', { user_id: item.user_id })">
				<view class="text-base leading-none mt-2">{{ item.realname + ' · ' + item.dynasty || '无名氏' }}</view>
				<view class="flex mt-3">

					<view class="text-base leading-none text-gray-500">
						{{item.achievements.replace(/,/g,"&nbsp;&nbsp;")}}
					</view>

				</view>
				<view class="mt-4">{{ item.bio }}</view>
			</view>
			<view class="ml-4" style="display: flex;align-items: center;">
				<text
					style=" display: inline-block; width: 40rpx; text-align: center; margin-right: 20rpx; height: 40rpx; border-radius: 50%; background-color: rgba(255, 180, 31, 0.3); color: #FFB41F;"
					@click="$u.route('/pages/user/home', { user_id: item.id })">望</text>
				<text style="color: #FFB41F;">{{item.user_total_mw}}</text>
			</view>
		</view>
	</view>
	<view v-else
		style="display: flex;align-items: center;border-bottom: 1px solid #ECECEC;padding: 25rpx 0rpx;box-sizing: border-box;">
		<view class="mr-4">
			<view v-if="item.gender == 1">
				<image style="" class="block w-14 h-14 rounded-full" :src="item.user_avatar || '/static/avatar.png'">
				</image>
			</view>
			<view v-if="item.gender == 2">
				<image style="" class="block w-14 h-14 rounded-full"
					:src="item.user_avatar || '/static/avatar-female.png'">
				</image>
			</view>
		</view>
		<view style="display: flex;align-items: center;justify-content: space-between;width: 100%;">
			<view class="flex-1">
				<view class="text-base leading-none mt-2">{{ item.realname + ' · ' + item.dynasty || '无名氏' }}</view>
				<view class="flex mt-3">

					<view class="text-base leading-none text-gray-500">
						{{item.achievements.replace(/,/g,"&nbsp;&nbsp;")}}
					</view>

				</view>
				<view class="mt-4">{{ item.bio }}</view>
			</view>
			<view class="ml-4">
				<text
					style=" display: inline-block; width: 120rpx; text-align: center;  height: 40rpx; color: gray;">未激活</text>
			</view>
		</view>
	</view>
	<!-- <view class="flex mt-8" v-if="item.user_id != null" style="margin-top: 80rpx;">
		<view class="mr-4" @click="$u.route('/pages/user/home', { user_id: item.user_id })">
			<view v-if="item.gender == 1">
				<image style="" class="block w-14 h-14 rounded-full" :src="item.user_avatar || '/static/avatar.png'">
				</image>
			</view>
			<view v-if="item.gender == 2">
				<image style="" class="block w-14 h-14 rounded-full"
					:src="item.user_avatar || '/static/avatar-female.png'">
				</image>
			</view>
		</view>
		<view
			style="display: flex;align-items: center;justify-content: space-between;width: 100%;border-bottom: 1px solid #ECECEC;">
			<view class="flex-1" @click="$u.route('/pages/user/home', { user_id: item.user_id })">
				<view class="text-base leading-none mt-2">{{ item.realname + ' · ' + item.dynasty || '无名氏' }}</view>
				<view class="flex mt-3">

					<view class="text-base leading-none text-gray-500">
						{{item.achievements.replace(/,/g,"&nbsp;&nbsp;")}}
					</view>
					
				</view>
				<view class="mt-4">{{ item.bio }}</view>
			</view>
			<view class="ml-4" :class="[item.user_id==null?'':'active']" style="display: flex;align-items: center;">
				<text
					style=" display: inline-block; width: 40rpx; text-align: center; margin-right: 20rpx; height: 40rpx; border-radius: 50%; background-color: rgba(255, 180, 31, 0.3); color: #FFB41F;"
					@click="$u.route('/pages/user/home', { user_id: item.id })">望</text>
				<text style="color: #FFB41F;">{{item.user_total_mw}}</text>

			</view>
		</view>
	</view>

	<view class="flex mt-8" v-else style="margin-top: 80rpx;">
		<view class="mr-4">
			<view v-if="item.gender == 1">
				<image style="" class="block w-14 h-14 rounded-full" :src="item.user_avatar || '/static/avatar.png'">
				</image>
			</view>
			<view v-if="item.gender == 2">
				<image style="" class="block w-14 h-14 rounded-full"
					:src="item.user_avatar || '/static/avatar-female.png'">
				</image>
			</view>
		</view>
		<view
			style="display: flex;align-items: center;justify-content: space-between;width: 100%;border-bottom: 1px solid #ECECEC;">
			<view class="flex-1">

				<view class="text-base leading-none mt-2">{{ item.realname + ' · ' + item.dynasty || '无名氏' }}</view>

				<view class="flex mt-3">
					<view class="text-base leading-none text-gray-500">
						{{item.achievements.replace(/,/g,"&nbsp;&nbsp;")}}
					</view>
					
				</view>
				<view class="mt-4">{{ item.bio }}</view>
			</view>

			<view class="ml-4" :class="[item.is_free==0?'active':'']">
				<text
					style=" display: inline-block; width: 120rpx; text-align: center;  height: 40rpx; color: gray;">未激活</text>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				items: {}
			}
		},
		created() {},
		props: {
			item: {},

		},
		computed: {},
		methods: {}
	}
</script>

<style lang="scss">
	.active {
		display: none;
	}
</style>