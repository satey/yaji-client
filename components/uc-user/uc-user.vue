<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="">

		<view class="flex" style="margin-top: 30rpx;">
			<view class="mr-4" @click="$u.route('/pages/user/home', { user_id: item.id })">
				<view v-if="item.gender == 1">
					<image class="block w-14 h-14 rounded-full"  mode="aspectFill" :src="item.avatar"></image>
				</view>
				<view v-if="item.gender == 2">
					<image class="block w-14 h-14 rounded-full" mode="aspectFill" :src="item.avatar">
					</image>
				</view>
			</view>
			<view class="flex-1" @click="$u.route('/pages/user/home', { user_id: item.id })">
				<text class="text-base leading-none mt-2">{{ item.realname + ' · ' + item.dynasty || '无名氏' }}</text>

				<text
					style=" display: inline-block; width: 40rpx; text-align: center; height: 40rpx;margin-left: 30rpx; border-radius: 50%; background-color: cornsilk; color:  #FFB41F;">望</text>
				<text style="color:  #FFB41F; margin-left: 10rpx;">{{item.total_mw}}</text>

				<view class="flex mt-3">
					<!-- 改在这儿 -->
					<!-- <view class="mt-4" style="margin-bottom: 10rpx; width: 460rpx; margin-top: -10rpx; color: #808080;">{{item.achievements}}</view> -->
					<view class="mt-4" style="margin-bottom: 10rpx; width: 460rpx; margin-top: -10rpx; color: #808080;">
						<view src="" style="display: inline-block;margin-left:5rpx;" v-show="achievementsList.length>0"
							v-for="items in achievementsList">{{items}}</view>
					</view>
					<!--  -->
					<view class="know">了解他</view>
				</view>
				<view class="mt-4 content" v-if='isInterduce' style="margin-top: 40rpx;">暂无简介</view>
				<view class="mt-4 content" v-else style="margin-top: 40rpx;">{{ item.content}}</view>
				<view class=""
					style="margin-top: 30rpx; margin-left: -140rpx; height: 1rpx;background: rgb(238, 238, 238,0.5);">
				</view>
			</view>

		</view>

	</view>


</template>

<script>
	export default {
		components: {},
		data() {
			return {
				a: [],
				achievementsList: [], //新数组
				isInterduce: false
			}
		},
		props: {
			item: {}
		},
		mounted() {
			let that = this
			if (that.item.content == null) {
				that.isInterduce = true
			}
			that.a = that.item.achievements
			if (that.a != null) {
				that.achievementsList = that.a.split(',')
			}
		},
		computed: {},
		methods: {}
	}
</script>

<style lang="scss">
	.content {
		width: 690rpx;
		height: 120rpx;
		font-size: 28rpx;
		overflow: hidden;
		color: #808080;
		line-height: 40rpx;
		margin-left: -100rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}

	.know {
		width: 106rpx;
		height: 44rpx;
		background: #FE4373;
		border-radius: 22px;
		text-align: center;
		font-size: 24rpx;
		color: #FFFFFF;
		line-height: 44rpx;
		position: absolute;
		right: 30rpx;
		margin-top: -28rpx;
	}
</style>