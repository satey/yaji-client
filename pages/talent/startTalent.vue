<template>
	<view class="startTalent">
		<u-navbar :title="$Route.query.title" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;" @click="showa = true"></i>
			</view>
			<view slot="right" v-if="data.length !=0">
				<text style="color: #666666;font-size: 23rpx;">{{currentIndex+1}}/{{data.list.length}}</text>
			</view>
		</u-navbar>
		<view>
			<view
				style="display: flex;align-items: center;justify-content: center;font-size: 23rpx;color: #666;background: #F5F5F5;padding: 32rpx 30rpx 7rpx 35rpx;box-sizing: border-box;">
				<text>说明：答对一道记一道，累计答对题目达到相应条件，可得到专 有称号。</text>
			</view>
		</view>
		<view>
			<view style="text-align: center;">
				<image style="width: 158rpx;height: 90rpx;margin-top:-30rpx" src="@/static/iconImage/qian.png" mode="">
				</image>
			</view>
			<view class="box">
				<view style="position: relative;">
					<image src="../../static/iconImage/shanzi.png" style="width: 70rpx;height: 50rpx;" mode="widthFix">
					</image>
					<view
						style="position: absolute;top: 0;left: 0;width: 70rpx;height: 50rpx;z-index:1 ;text-align: center;color: #fff;font-size: 30rpx;">
						{{currentIndex+1}}
					</view>
				</view>
				<view style="flex: 1;">
					<view class="content">
						<block v-for="(item,index) in data.list" :key="index">
							<view v-if="currentIndex==index">
								<view class="contentTitle">{{item.title}}</view>
								<block v-for="(answerItem,answerIndex) in item.option_list">
									<view class="answer" @click="selectAnswer(answerItem,answerIndex)"
										:style="{border:answerIndex==optionIndex?'1px solid #FFA000':'1px solid #999999',background:answerIndex==optionIndex?'#FFDDA4':'#fff'}">
										<view :style="{color: answerIndex==optionIndex?'#333333':''}">
											<text>{{answerItem.key}}:</text>
											<text style="margin-left: 20rpx;">{{answerItem.value}}</text>
										</view>
										<image :style="{opacity:answerIndex==optionIndex?'1':'0'}"
											style="width: 40rpx;height: 40rpx;" src="../../static/iconImage/radio.png"
											mode=""></image>
									</view>
								</block>
							</view>
						</block>
					</view>
					<view v-if="data.length !=0" :style="{opacity:showAnswer==false?'0':'1'}"
						style="color: #FF4D00;font-size: 28rpx;margin-top: 15rpx;margin-left: 50rpx;margin-bottom: 15rpx;">
						答错了，正确答案为{{data.list[currentIndex].correct_answer}}
					</view>
					<view class="btn" v-if="showAnswer==false" @click="topicSubmit">
						选定离手
					</view>
					<view class="btn" v-if="showAnswer==true" @click="next">
						下一题
					</view>
					<block v-if="optionUser.length !=0">
						<view
							style="margin-left: 50rpx;margin-top: 37rpx;display: flex;align-items: center;flex-wrap: wrap;"
							v-if="optionUser.user_list.length !=0">
							<block v-for="(item,index) in optionUser.user_list" :key="index">
								<view style="display: flex;align-items: center;">
									<image :src="item.avatar" style="width: 52rpx;height: 52rpx;border-radius: 50%;"
										mode="aspectFill"></image>
									<text style="color: #FFA000;font-size: 28rpx;">{{item.role_realname}}</text>
								</view>
							</block>
							<text style="color: #333333;font-size: 28rpx;">等{{optionUser.user_count}}人选择了该项</text>
						</view>
					</block>
				</view>
			</view>
		</view>
		<u-popup :show="showa" mode="center" :closeable="false" :round="20">
			<view class="log">
				<view style="text-align: center;font-size: 30rpx;color: #333;">结束测试</view>
				<view style="font-size: 28rpx;color: #333;margin-top: 89rpx;">您距离成功只有一步之遥了，确定要退出 测试吗？</view>
				<view style="display: flex;align-items: center;justify-content: center;margin-top: 137rpx;">
					<view @click="$u.route({ type: 'navigateBack', delta: 1 })"
						style="margin-right: 21rpx;width: 210rpx;height: 68rpx;background: #FFDDA4;border-radius: 8rpx;text-align: center;line-height: 68rpx;color: #FFA000;font-size: 30rpx;">
						确定</view>
					<view @click="showa = false"
						style="margin-left: 21rpx;width: 210rpx;height: 68rpx;background: #FFA000;border-radius: 8rpx;text-align: center;line-height: 68rpx;color: #fff;font-size: 30rpx;">
						取消</view>
				</view>
			</view>
		</u-popup>
		<u-popup :show="showAchieve" @close="showAchieve = false" mode="center" :closeable="false" :round="20">
			<view class="log" v-if="achieveData.length !=0">
				<view style="text-align: center;font-size: 30rpx;color: #333;">{{achieveData.title}}</view>
				<view style="display: flex;align-items: center;justify-content: center;margin-top: 50rpx;">
					<view style="position: relative;display: inline;margin: 0 auto;text-align: center;">
						<image :src="achieveData.img" style="width: 120rpx;height: 120rpx;" mode="aspectFill"></image>
						<!-- <text
							style="position: relative;z-index: 2;font-size: 46rpx;color: #000;font-family: font-test !important;">小有才气</text> -->
						<!-- 	<view
							style="height: 30rpx;background: #FFA000;position: absolute;bottom: 0;left: 0;width: 100%;">
						</view> -->
					</view>
				</view>
				<view style="font-size: 28rpx;color: #333;margin-top: 35rpx;">{{achieveData.desc}}</view>
				<view style="display: flex;align-items: center;justify-content: center;margin-top:35rpx;">
					<view @click="next"
						style="width: 190rpx;height: 85rpx;background: #FFDDA4;border-radius: 8rpx;text-align: center;line-height: 85rpx;color: #FFA000;font-size: 36rpx;border-radius: 50rpx;border: 1px solid #FFA000;">
						确定</view>
				</view>
			</view>
		</u-popup>
		<feiqslsHit></feiqslsHit>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showa: false,
				data: [],
				currentIndex: 0,
				optionIndex: -1,
				optionUser: [],
				showAnswer: false,
				showAchieve: false,
				achieveData: []
			}
		},
		onLoad() {
			this.setFontFamily()
			this.getData()
		},
		onBeforeBack() {
			this.showa = true;
			return false //阻止页面关闭
		},
		methods: {
			getData() {
				this.$api("talent.getQuestionList", {
					category_id: this.$Route.query.key
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.data = res.data;
					}
				})
			},
			topicSubmit() {
				if (this.optionIndex == -1) {
					uni.showToast({
						icon: "none",
						title: "请选择"
					})
					return;
				}
				this.$api("talent.submitQuestion", {
					batch_id: this.data.batch_id,
					question_id: this.data.list[this.currentIndex].question_id,
					answer: this.data.list[this.currentIndex].option_list[this.optionIndex].key
				}).then(res => {
					if (res.code == 1) {
						if (res.data.is_correct == 0) {
							if (this.currentIndex + 1 == this.data.list.length) {
								uni.redirectTo({
									url: `/pages/talent/talentResult?batchId=${this.data.batch_id}&title=${this.$Route.query.title}&key=${this.$Route.query.key}`
								});
							} else {
								this.showAnswer = true;
							}
						} else {
							if (res.data.glory.length == 0) {
								if (this.currentIndex + 1 == this.data.list.length) {
									uni.redirectTo({
										url: `/pages/talent/talentResult?batchId=${this.data.batch_id}&title=${this.$Route.query.title}&key=${this.$Route.query.key}`
									});
								} else {
									this.currentIndex++;
									this.optionUser = [];
									this.optionIndex = -1;
									this.showAnswer = false;
								}
							} else {
								this.showAchieve = true;
								this.achieveData = res.data.glory
							}
						}
					} else if (res.code == 2003) {
						this.currentIndex++;
						this.optionUser = [];
						this.optionIndex = -1;
						this.showAnswer = false;
					} else {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				})
			},
			selectAnswer(item, index) {
				if (this.showAnswer == true) {
					return;
				}
				this.optionIndex = index;
				this.optionUser = item;
			},
			next() {
				if (this.currentIndex + 1 == this.data.list.length) {
					uni.redirectTo({
						url: `/pages/talent/talentResult?batchId=${this.data.batch_id}&talentKey=${this.$Route.query.talentId}&title=${this.$Route.query.title}&key=${this.$Route.query.key}`
					});
				} else {
					this.currentIndex++;
					this.optionUser = [];
					this.optionIndex = -1;
					this.showAnswer = false;
					this.showAchieve = false;
				}
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
	.box {
		padding: 50rpx 35rpx 0rpx 35rpx;
		box-sizing: border-box;
		display: flex;
	}

	.content {
		background-image: url(@/static/iconImage/kk.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		flex: 1;
		margin-left: 20rpx;
		padding: 50rpx;
		box-sizing: border-box;
	}

	.contentTitle {
		font-size: 30rpx;
		color: #FFA000;
		font-family: font-test !important;
	}

	.answer {
		width: 100%;
		border-radius: 16rpx;
		margin-top: 50rpx;
		padding: 39rpx 35rpx 38rpx 16rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #666;
	}

	.btn {
		width: 490rpx;
		height: 72rpx;
		background-image: url(@/static/iconImage/btnBg2.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		text-align: center;
		line-height: 72rpx;
		color: #fff;
		font-size: 36rpx;
		margin-left: 50rpx;
	}

	.log {
		width: 578rpx;
		height: 525rpx;
		border-radius: 16rpx;
		padding: 50rpx 27rpx 62rpx 37rpx;
		background: #fff;
		box-sizing: border-box;
	}
</style>