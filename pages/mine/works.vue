<template>
	<view class="works">
		<u-navbar title="动态作品" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view class="tabs">
			<view class="tabItem" @click="tab(1)" style="margin-right: 85rpx;"
				:style="{color:currentIndex==1?'#333':''}">
				<text style="position: relative;z-index: 9;">我的</text>
				<view class="line" v-if="currentIndex==1" style="background: #FFA000;"></view>
			</view>
			<view class="tabItem" @click="tab(2)" style="margin-left: 85rpx;"
				:style="{color:currentIndex==2?'#333':''}">
				<text style="position: relative;z-index: 9;">喜欢</text>
				<view class="line" v-if="currentIndex==2" style="background: #FFA000;"></view>
			</view>
		</view>
		<view v-if="lists.length!=0"
			style="padding: 0rpx 0rpx 0rpx 30rpx;display: flex;align-items: center;flex-wrap: wrap;">
			<block v-for="(item,index) in lists" :key="index">
				<view class="item"
					@click="$u.route('/pages/post/preview',{data:JSON.stringify({type:'work',post_id:item.post_id})})">
					<image style="width: 100%;height: 100%;position: absolute;top:0%;left: 0;z-index: 1;"
						:src="item.bg_img_url" mode="aspectFill"></image>
					<image
						style="width: 100%;position: absolute;top: 50%;left: 0;z-index: 2;transform: translateY(-50%);"
						:src="item.image_list[0]" mode="widthFix"></image>
					<view class="content" style="">
						<text>{{item.content}}</text>
					</view>
					<view class="itemFooter">
						<i class="iconfont icon-aixin1" style="margin-right: 5rpx;"></i>
						<text>{{item.commentnums}}</text>
					</view>
				</view>
			</block>
		</view>
		<u-empty v-if="!lists.length" icon="/static/iconImage/jilu.png" text="" textColor="#a1a1a1"
			marginTop="100"></u-empty>
		<feiqslsHit></feiqslsHit>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 1,
				page: 1,
				lists: []
			}
		},
		onShow() {
			this.page = 1;
			this.lists = [];
			this.getLists()
		},
		onReachBottom() {
			this.page++;
			this.getLists()
		},
		methods: {
			tab(index) {
				this.currentIndex = index;
				this.page = 1;
				this.lists = [];
				this.getLists()
			},
			getLists() {
				this.$api("user.myPostList", {
					page: this.page,
					tab: this.currentIndex
				}).then(res => {
					if (res.code == 1) {
						this.lists.push(...res.data.list);
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100vh;
		background: #f7f7f7;
	}

	.works {
		background: #f7f7f7;
		height: 100%;
		min-height: 100vh;
	}

	.tabs {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 50rpx 0rpx;

		.tabItem {
			font-size: 32rpx;
			color: #333333;
			position: relative;
			z-index: 9;

			.line {
				background: #FFA000;
				height: 16rpx;
				width: 100%;
				position: absolute;
				bottom: 5rpx;
				left: 0;
			}
		}
	}

	.item {
		width: calc(100% / 3 - 30rpx);
		height: 270rpx;
		position: relative;
		border-radius: 8rpx;
		overflow: hidden;
		margin-right: 30rpx;
		margin-bottom: 25rpx;
		position: relative;

		.itemFooter {
			position: absolute;
			left: 0;
			bottom: 0;
			height: 52rpx;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			color: #AAA8A8;
			font-size: 28rpx;
			z-index: 5;
			background: rgba(255, 255, 255, 0.5);
			padding-right: 20rpx;
			box-sizing: border-box;
		}

		.content {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 5;
			width: 100%;
			height: 100%;
			padding: 20rpx 10rpx 10rpx 10rpx;
			text-align: center;
			box-sizing: border-box;
			color: #FFFFFF;
			font-size: 20rpx;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>