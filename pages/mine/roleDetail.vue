<template>
	<view>
		<u-navbar title="" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view style="padding: 30rpx 35rpx 350rpx 35rpx;box-sizing: border-box;">
			<view style="display: flex;align-items: center;border-bottom: 1px dashed #DDDDDD;padding-bottom: 10rpx;">
				<view style="width: 8rpx;height: 35rpx;background: #BDFF00;border-radius: 25rpx;"></view>
				<view v-if="role.length!=0"
					style="color: #FFA000;font-size: 56rpx;margin-left: 10rpx;font-family: font-test !important;">
					{{role.realname}}
				</view>
			</view>
			<view style="color: #333;font-size:28rpx ;display: flex;align-items: center;margin-top: 50rpx;">
				<view v-if="role.length!=0" style="margin-right: 25rpx;">{{role.gender==1?'男':'女'}}</view>
				<view>{{role.dynasty}}</view>
			</view>
			<block v-if="role.length!=0">
				<view style="color: #333;font-size:28rpx ;margin-top: 35rpx;" v-if="role.aliasnames">
					<block v-for="(item,index) in role.aliasnames.split('，')" :key="index">
						<text style="margin-right: 15rpx;">{{item}}</text>
					</block>
				</view>
			</block>
			<block v-if="role.length!=0">
				<view style="color: #FFA000;font-size:28rpx ;margin-top: 35rpx;" v-if="role.achievements.length">
					<block v-for="(item,index) in role.achievements" :key="index">
						<text style="margin-right: 37rpx;">{{item}}</text>
					</block>
				</view>
			</block>

			<block v-if="role.length!=0">
				<view style="margin-top: 35rpx;display: flex;flex-wrap: wrap;" v-if="role.titles.length">
					<block v-for="(item,index) in role.titles" :key="index">
						<view style="display: flex;align-items: center;margin-right: 15rpx;">
							<view style="width: 10rpx;height: 10rpx;background: #BDFF00;border-radius: 50%;"></view>
							<view style="margin-left: 10rpx;color: #333;font-size:28rpx ;">{{item}}</view>
						</view>
					</block>
				</view>
			</block>

			<view style="color: #333;font-size:28rpx ;margin-top: 35rpx;" v-if="role.content">
				{{role.content}}
			</view>
			<view class="xiyou">
				<text style="color:#333 ;font-size:28rpx ;">稀有：</text>
				<text style="color: #FFA000;font-size: 32rpx;">{{role.level_str}}</text>
			</view>
		</view>
		<view class="getRoleBtn" @click="$u.route('pages/mine/getRole')">
			获取角色
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				role: []
			}
		},
		onLoad() {
			this.getUserProfile()
			this.setFontFamily();
		},
		methods: {
			getUserProfile() {
				let that = this
				// console.log(that.$Route.query.user_id);
				that.$api('role.detail', {
					role_id: that.$Route.query.role_id
				}).then(res => {
					console.log(res)
					if (res.code === 1) {
						that.role = res.data
					} else {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
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
		}
	}
</script>

<style lang="scss" scoped>
	.xiyou {
		width: 176rpx;
		height: 52rpx;
		text-align: center;
		line-height: 52rpx;
		background-image: url(/static/xiyoubg.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin-top: 35rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.getRoleBtn {
		background-image: url(@/static/iconImage/btnBg2.png);
		background-repeat: none;
		background-position: 100% 100%;
		background-size: 100% 100%;
		border-radius: 43rpx;
		color: #fff;
		text-align: center;
		width: 490rpx;
		height: 72rpx;
		line-height: 72rpx;
		font-size: 30rpx;
		position: fixed;
		left: 50%;
		bottom: 245rpx;
		transform: translateX(-50%);
	}
</style>