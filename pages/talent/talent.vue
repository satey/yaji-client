<template>
	<view>
		<u-navbar title="知识测试" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view>
			<view style="font-size:28rpx ;color: #333333;margin-top: 32rpx;margin-left: 35rpx;margin-bottom: 65rpx;">
				请选择一个分类：</view>
			<view style="display: flex;align-items: center;flex-wrap: wrap;">
				<block v-for="(item,index) in lists" :key="index">
					<view @click="openStartTalent(item)"
						style="width: 50%;box-sizing: border-box;display: flex;align-items: center;justify-content: center;margin-bottom: 100rpx;">
						<view class="item">
							<image style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;"
								src="../../static/iconImage/shanzi.png" mode=""></image>
							<view class="itemText">{{item.value}}</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<feiqslsHit></feiqslsHit>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists: []
			}
		},
		onLoad() {
			this.setFontFamily()
			this.getList()
		},
		methods: {
			getList() {
				this.$api("talent.getQuestionType").then(res => {
					console.log(res)
					if (res.code == 1) {
						this.lists = res.data;
					}
				})
			},
			openStartTalent(item) {
				this.$api("talent.getQuestionList", {
					category_id: item.key
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						if (res.data.list.length != 10) {
							uni.showToast({
								icon: "none",
								title: "暂无可用题目"
							})
						} else {
							this.$u.route('/pages/talent/startTalent', {
								key: item.key,
								title: item.value
							})
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
	.item {
		width: 172rpx;
		height: 126rpx;
		position: relative;
		text-align: center;
		line-height: 126rpx;
	}

	.itemText {
		font-size: 46rpx;
		color: #fff;
		font-family: font-test !important;
		position: relative;
		z-index: inherit;
	}
</style>