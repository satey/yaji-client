<template>
	<view class="talentResult">
		<u-navbar title="完成测试" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view style="padding: 50rpx 35rpx;box-sizing: border-box;">
			<view style="color:#666666 ;font-size: 28rpx;margin-bottom: 30rpx;">恭喜您完成本轮测试，不同的题目，可能触发隐藏成就哦!欢迎下次测试~
			</view>
			<view style="border: 1px solid #999999;">
				<view
					style="height: 58rpx;text-align: center;font-size: 28rpx;color: #FFA000;border-bottom: 1px solid #999999;line-height: 58rpx;font-family: font-test !important;">
					成功率：{{resultData.correct_rate}}
				</view>
				<view style="display: flex;">
					<view
						style="flex: 1;text-align: center;height: 80rpx;line-height: 80rpx;color: #000;font-size: 28rpx;border-right: 1px solid #999;border-bottom: 1px solid #999;">
						总计</view>
					<view
						style="flex: 1;text-align: center;height: 80rpx;line-height: 80rpx;color: #000;font-size: 28rpx;border-right: 1px solid #999;border-bottom: 1px solid #999;">
						正确</view>
					<view
						style="flex: 1;text-align: center;height: 80rpx;line-height: 80rpx;color: #000;font-size: 28rpx;border-bottom: 1px solid #999;">
						错误</view>
				</view>
				<view style="display: flex;">
					<view
						style="flex: 1;text-align: center;height: 80rpx;line-height: 80rpx;color: #000;font-size: 28rpx;border-right: 1px solid #999;">
						{{resultData.total}}
					</view>
					<view
						style="flex: 1;text-align: center;height: 80rpx;line-height: 80rpx;color: #000;font-size: 28rpx;border-right: 1px solid #999;">
						{{resultData.correct_num}}
					</view>
					<view
						style="flex: 1;text-align: center;height: 80rpx;line-height: 80rpx;color: #000;font-size: 28rpx;">
						{{resultData.error_num}}
					</view>
				</view>
			</view>
			<view style="color:#333333 ;font-size: 28rpx;margin-bottom: 30rpx;margin-top: 50rpx;">获得成就</view>
			<view v-if="resultData.length !=0">
				<block v-for="(item,index) in resultData.glory_list" :key="index">
					<image :src="item.img" style="width: 120rpx;height: 120rpx;margin-right: 20rpx;" mode="aspectFill">
					</image>
				</block>
			</view>
			<view style="display: flex;align-items: center;justify-content: center;width: 100%;margin-top: 100rpx;">
				<view @click="$u.route({ type: 'navigateBack', delta: 1 })"
					style="width: 210rpx;height: 68rpx;background: #FFDDA4;border-radius: 8rpx;text-align: center;list-style: none;68rpx;color: #FFA000;line-height: 68rpx;margin-right: 21rpx;">
					退出</view>
				<view @click="next"
					style="width: 210rpx;height: 68rpx;background: #FFA000;border-radius: 8rpx;text-align: center;list-style: none;68rpx;color: #fff;line-height: 68rpx;margin-left:21rpx ;">
					下一组</view>
			</view>
		</view>
		<feiqslsHit></feiqslsHit>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				resultData: []
			}
		},
		onLoad() {
			this.setFontFamily()
			this.getTalentResult()
		},
		methods: {
			getTalentResult() {
				this.$api("talent.getTalentResult", {
					batch_id: this.$Route.query.batchId
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.resultData = res.data;
					}
				})
			},
			//
			next() {
				this.$api("talent.getQuestionList", {
					category_id: this.$Route.query.key
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						if (res.data.list.length != 10) {
							uni.showToast({
								icon: "none",
								title: "暂无可用题目"
							})
						} else {
							uni.redirectTo({
								url: `/pages/talent/startTalent?key=${this.$Route.query.key}&title=${this.$Route.query.title}`
							});
						}
					} else if (res.code == 2001) {
						uni.showToast({
							icon: "none",
							title: "暂无可用题目"
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
					success() {},
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
	page {
		height: 100vh;
		background: #F7F7F7;
	}

	.talentResult {
		min-height: 100vh;
		height: 100%;
		background: #F7F7F7;
	}
</style>