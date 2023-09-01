<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="px-4">
		<image src='@/static/embed/s3.png'
			style="position: fixed; width: 100%; height: 100%; top: 0; left: 0; z-index: -1"></image>
		<u-navbar bgColor="transparent" leftIcon="">
			<<!-- view slot="left" v-if="choose_num!=0">
				<i class="ri-arrow-left-s-line text-4xl text-white"
					@click="$u.route({ type: 'navigateBack', delta: 1 })" v-if="false"></i>
	</view> -->
	<!--  <view slot="right">
			        <text class="text-white opacity-50" @click="skip()">跳过</text>
			    </view> -->
	</u-navbar>
	<view
		style="padding: 200rpx 30rpx 100rpx 30rpx;display: flex;flex-direction: column;height: 100vh;box-sizing: border-box;">
		<view style="color: #FFFFFF;font-size: 36rpx;font-weight: bold;">您穿越成为了：</view>
		<view class="container">
			<view class="contentHead">
				<view class="text-2xl name">{{role.realname}}</view>
				<view class="headDetails text-xl">
					<view style="margin-right: 30rpx;">{{role.dynasty}} {{role.gender==1?'男':'女'}}</view>
					<view>名望：<text style="color: #FE4373;">{{role.role_mw}}</text></view>
				</view>
			</view>
			<view class="contentBody">
				<view class="types flex">
					<view style="margin-right: 40rpx;" v-for="(item,index) in role.achievements" :key="index">
						<text class="ri-price-tag-3-line lable" :style="'color:'+colors[index % 5]"></text>
						<text>{{item}}</text>
					</view>
				</view>
				<view class="contentText text-xl">{{ role.content || '暂无介绍' }}</view>
				<view style="padding:0rpx 38rpx;margin-top: 120rpx;">
					<!--  <view class="rounded-full p-6 text-base leading-none bg-gray-100" @click="showRead = false" v-if="isCancle">取消
					    </view> -->
					<view
						class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500"
						style="text-align: center;" @click="handleSubmit()">开始交朋友</view>
					<view class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r"
						style="text-align: center;color: #323232;border: 1px solid #CCCCCC;margin-top: 30rpx;"
						@click="handleRematch()" v-if="choose_num!==0">重新穿越（免费{{choose_num}}次）</view>
				</view>
				<view class="tips text-base">
					<text>您有一个古代身份了，去交朋友吧^.^ 每个角色都是全服维一的哦！</text>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				role: [],
				colors: ["red", "pink", "blue", "yellow", "#FE4373"],
				data: [],
				choose_num: '',
				isClick: true,
			};
		},
		onLoad(e) {
			this.data = JSON.parse(e.data)
			this.role = JSON.parse(e.role);
			this.init()
		},
		methods: {
			init() {
				var that = this;
				var token = uni.getStorageSync("token");
				this.$api('user.info', token).then(res => {
					that.choose_num = res.data.choose_num;
					uni.setStorageSync("userInfo", res.data)
				})
			},
			//重新选择
			handleRematch() {
				uni.reLaunch({
					url: '/pages/auth/s2'
				})
			},
			// 开始体验
			handleSubmit() {
				let that = this;
				if (that.isClick) {
					that.isClick = false;
					if (!that.role) {
						that.$u.toast('角色必须选择')
						return false
					}
					if (that.choose_num == 0) {
						that.isClick = true;
						uni.reLaunch({
							url: '/pages/index/index'
						});
						return;
					}
					uni.setStorageSync('times', that.times);
					let gender = uni.getStorageSync('gender')
					that.formGender = gender

					let data = {
						role_id: that.role.id,
						dynasty: that.data.dynasty,
						gender: that.formGender
					}
					that.$api('user.bindrole', data).then(res => {
						if (res.code === 1) {
							uni.reLaunch({
								url: '/pages/index/index'
							});
							// that.$u.route('/pages/index/index')
						} else {
							uni.reLaunch({
								url: '/pages/index/index'
							});
						}
						that.isClick = true;
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	.container {
		flex: 1;
		height: 0;
		background: red;
		margin-top: 30rpx;
		background: url(/static/embed/s3Bg.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;

		.contentHead {
			text-align: center;
			height: 14%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.name {
				color: #323232;
				font-weight: bold;
			}

			.headDetails {
				margin-top: 10rpx;
				color: #808080;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.contentBody {
			height: calc(100% - 14%);
			padding-top: 30rpx;

			.types {
				display: flex;
				align-items: center;
				justify-content: center;

				.lable {
					width: 35rpx;
					height: 35rpx;
					margin-right: 6rpx;
				}
			}

			.contentText {
				padding: 40rpx 38rpx 0rpx 38rpx;
				color: #808080;
				font-size: 28rpx;
				overflow: hidden;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 5;
				overflow: hidden;
				white-space: no-wrap;
				text-overflow: ellipsis;
				position: relative;
				box-sizing: border-box;

				.more {
					position: absolute;
					bottom: -5rpx;
					right: 38rpx;
					background: #fff;
					padding-left: 20rpx;
					color: #FE4373;
				}
			}

			.tips {
				padding: 30rpx 92rpx 0rpx 92rpx;
				text-align: center;
				color: #999999;
			}
		}
	}
</style>