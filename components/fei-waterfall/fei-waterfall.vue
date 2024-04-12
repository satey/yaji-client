<template>
	<view class="list">
		<!-- 第一个 -->
		<view class="itemBox" style="margin-right: 5rpx;">
			<block v-for="(item,index) in lists" :key="index" v-if="index%2==0">
				<view class="container" @click="openDetail(item)">
					<view class="twoBox" style="padding: 12rpx 12rpx 0 12rpx;box-sizing: border-box;">
						<view style="display: flex;align-items: center;">
							<image @click.stop="$u.route('/pages/user/home',{user_id:item.user_info.user_id})"
								:src="item.user_info.avatar" style="width: 58rpx;height: 58rpx;border-radius: 50%;"
								mode="aspectFill">
							</image>
							<view style="color:#333 ;font-size: 28rpx;margin: 0rpx 15rpx;">
								{{item.user_info.role_realname}}·{{item.user_info.role_dynasty}}
							</view>
							<block v-if="item.user_info.gender==1">
								<i class="iconfont icon-nan1" style="font-size: 22rpx;color: #00C2FF;"></i>
							</block>
							<block v-else>
								<i class="iconfont icon-nv" style="font-size: 22rpx;color: #FFA000;"></i>
							</block>
							<image :src="item.user_info.mw_img" style="width:25rpx;height: 25rpx;margin-left: 15rpx;"
								mode=""></image>
						</view>
					</view>
					<!-- 动态 -->
					<view v-if="item.show_type == 1" style="box-sizing: border-box;">
						<view v-if="item.image_list.length<=0"
							style="position: relative;border-radius: 0rpx 0rpx 10rpx 10rpx;width: 100%;margin-top: 15rpx;height: 480rpx;overflow: hidden;">
							<image :src="item.bg_img_url"
								style="border-radius: 0rpx 0rpx 10rpx 10rpx;height: 100%;width: 100%;"
								mode="aspectFill">
							</image>
							<view
								style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;display: flex;align-items: center;padding-top: 35rpx;box-sizing: border-box;">
								<text style="color: #fff;font-size: 28rpx;width: 100%;text-align: center;"
									class="text5">
									{{item.content}}
								</text>
							</view>
							<view v-if="item.audio" style="position: absolute;top: 10rpx;left: 10rpx;z-index: 5;">
								<image src="@/static/erji.png" class="erji" mode=""></image>
							</view>
						</view>
					</view>
					<block v-if="item.show_type == 1">
						<view v-if="item.image_list.length!=0"
							style="position: relative;border-radius: 0rpx 0rpx 10rpx 10rpx;width: 100%;margin-top: 15rpx;height: 540rpx;overflow: hidden;box-sizing: border-box;">
							<image :src="item.image_list[0]"
								style="border-radius: 0rpx 0rpx 10rpx 10rpx;height: 100%;width: 100%;"
								mode="aspectFill"></image>
							<view class="bottomText" v-if="item.content!=0"
								style="color: #fff;font-size: 28rpx;width: 100%;position: absolute;bottom: 0;left: 0;padding: 0rpx 0rpx;box-sizing: border-box;background: rgba(0,0,0,0.5);padding: 5rpx;box-sizing: border-box;">
								{{item.content}}
							</view>
							<view v-if="item.audio" style="position: absolute;top: 10rpx;left: 10rpx;z-index: 5;">
								<image src="@/static/erji.png" class="erji" mode=""></image>
							</view>
							<image v-if="item.image_list.length>1" src="../../static/imgMore.png"
								style="width: 52rpx;height: 40rpx;position: absolute;top: 10rpx;right: 10rpx;z-index: 5;"
								mode=""></image>
						</view>
					</block>
					<!-- audio -->
					<view v-if="item.show_type == 2"
						style="position: relative;width: 100%;margin-top: 15rpx;height: 480rpx;overflow: hidden;box-sizing: border-box;">
						<view
							style="position: absolute;top: 50%;left: 50%;z-index: 5;width: 135rpx;height: 135rpx;background: rgba(255, 255, 255, 0.7);border-radius: 50%;transform: translate(-50%,-50%);display: flex;align-items: center;justify-content: center;">
							<image src="@/static/pipa.png" style="width: 106rpx;height: 106rpx;border-radius: 50%;"
								mode="aspectFill">
							</image>
						</view>
						<image class="archeryImg" style="height:100%;border-radius: 0rpx 0rpx 10rpx 10rpx;width: 100%;"
							mode="aspectFill" :src="item.bg_img_url"></image>
					</view>
					<!-- 射覆 -->
					<!-- <view v-if="item.type=='guess'" style="position: relative;margin-top: 20rpx;">
						<image src="@/static/zhezhao.png"
							style="width: 335rpx;height: 328rpx;position: absolute;top: 0;left: 0;z-index: 5;border-radius:8rpx ;"
							mode=""></image>
						<image class="archeryImg"
							style="width: 335rpx;height: 328rpx;border-radius:8rpx ;" mode="aspectFill"
							src="@/static/qq.png"></image>
					</view> -->
				</view>
			</block>
		</view>
		<!-- 第二个 -->
		<view class="itemBox" style="margin-left: 5rpx;margin-bottom: 10rpx;">
			<block v-for="(item,index) in lists" :key="index" v-if="index%2!=0">
				<view class="container" @click="openDetail(item)">
					<view class="twoBox" style="padding: 12rpx 12rpx 0 12rpx;box-sizing: border-box;">
						<view style="display: flex;align-items: center;">
							<image @click.stop="$u.route('/pages/user/home',{user_id:item.user_info.user_id})"
								:src="item.user_info.avatar" style="width: 58rpx;height: 58rpx;border-radius: 50%;"
								mode="aspectFill">
							</image>
							<view style="color:#333 ;font-size: 28rpx;margin: 0rpx 15rpx;">
								{{item.user_info.role_realname}}·{{item.user_info.role_dynasty}}
							</view>
							<block v-if="item.user_info.gender==1">
								<i class="iconfont icon-nan1" style="font-size: 22rpx;color: #00C2FF;"></i>
							</block>
							<block v-else>
								<i class="iconfont icon-nv" style="font-size: 22rpx;color: #FFA000;"></i>
							</block>
							<image :src="item.user_info.mw_img" style="width:25rpx;height: 25rpx;margin-left: 15rpx;"
								mode=""></image>
						</view>
					</view>
					<!-- 动态 -->
					<view v-if="item.show_type == 1" style="box-sizing: border-box;">
						<view v-if="item.image_list.length<=0"
							style="position: relative;border-radius: 0rpx 0rpx 10rpx 10rpx;width: 100%;margin-top: 15rpx;height: 480rpx;overflow: hidden;">
							<image :src="item.bg_img_url"
								style="border-radius: 0rpx 0rpx 10rpx 10rpx;height: 100%;width: 100%;"
								mode="aspectFill">
							</image>
							<view
								style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;display: flex;align-items: center;padding-top: 35rpx;box-sizing: border-box;">
								<text style="color: #fff;font-size: 28rpx;width: 100%;text-align: center;"
									class="text5">
									{{item.content}}
								</text>
							</view>
							<view v-if="item.audio" style="position: absolute;top: 10rpx;left: 10rpx;z-index: 5;">
								<image src="@/static/erji.png" class="erji" mode=""></image>
							</view>
						</view>
					</view>
					<block v-if="item.show_type == 1">
						<view v-if="item.image_list.length!=0"
							style="position: relative;border-radius: 0rpx 0rpx 10rpx 10rpx;width: 100%;margin-top: 15rpx;height: 540rpx;overflow: hidden;box-sizing: border-box;">
							<image :src="item.image_list[0]"
								style="border-radius: 0rpx 0rpx 10rpx 10rpx;height: 100%;width: 100%;"
								mode="aspectFill"></image>
							<view class="bottomText" v-if="item.content!=0"
								style="color: #fff;font-size: 28rpx;width: 100%;position: absolute;bottom: 0;left: 0;padding: 0rpx 0rpx;box-sizing: border-box;background: rgba(0,0,0,0.5);padding: 5rpx;box-sizing: border-box;">
								{{item.content}}
							</view>
							<view v-if="item.audio" style="position: absolute;top: 10rpx;left: 10rpx;z-index: 5;">
								<image src="@/static/erji.png" class="erji" mode=""></image>
							</view>
							<image v-if="item.image_list.length>1" src="../../static/imgMore.png"
								style="width: 52rpx;height: 40rpx;position: absolute;top: 10rpx;right: 10rpx;z-index: 5;"
								mode=""></image>
						</view>
					</block>

					<!-- audio -->
					<view v-if="item.show_type == 2"
						style="position: relative;width: 100%;margin-top: 15rpx;height: 480rpx;overflow: hidden;box-sizing: border-box;">
						<view
							style="position: absolute;top: 50%;left: 50%;z-index: 5;width: 135rpx;height: 135rpx;background: rgba(255, 255, 255, 0.7);border-radius: 50%;transform: translate(-50%,-50%);display: flex;align-items: center;justify-content: center;">
							<image src="@/static/pipa.png" style="width: 106rpx;height: 106rpx;border-radius: 50%;"
								mode="aspectFill">
							</image>
						</view>
						<image class="archeryImg" style="height:100%;border-radius: 0rpx 0rpx 10rpx 10rpx;width: 100%;"
							mode="aspectFill" :src="item.bg_img_url"></image>
					</view>
					<!-- 射覆 -->
					<!-- <view v-if="item.type=='guess'" style="position: relative;margin-top: 20rpx;">
						<image src="@/static/zhezhao.png"
							style="width: 335rpx;height: 328rpx;position: absolute;top: 0;left: 0;z-index: 5;border-radius:8rpx ;"
							mode=""></image>
						<image class="archeryImg"
							style="width: 335rpx;height: 328rpx;border-radius:8rpx ;" mode="aspectFill"
							src="@/static/qq.png"></image>
					</view> -->
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["lists", "from"],
		data() {
			return {

			}
		},
		methods: {
			openDetail(item) {
				this.$emit("waterfallClick", {
					item: item,
					from: this.from
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// ---------
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
				// padding: 12rpx;
				box-sizing: border-box;
				margin-bottom: 10rpx;
			}
		}
	}

	.erji {
		width: 35rpx;
		height: 35rpx;
	}

	.bottomText {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.text5 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 6;
		overflow: hidden;
		text-overflow: ellipsis;
		padding: 0rpx 5rpx;
	}
</style>