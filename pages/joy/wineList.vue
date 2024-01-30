<template>
	<view>
		<u-navbar title="每日诗缘" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view style="padding: 0rpx 30rpx;box-sizing: border-box;">
			<view class="item" v-for="(item,index) in myLists" :key="index" @click="openCentet(item)">
				<view
					style="font-family: font-test;width: 82rpx;height: 82rpx;background: #FFFFFF;opacity: 1;border-radius: 50%;box-shadow: inset 0rpx 4rpx 10rpx 0rpx rgba(0,0,0,0.302);text-align: center;line-height: 82rpx;font-size: 36rpx;color: #3D3D3D;">
					{{item.word}}
				</view>
				<view style="color: #3D3D3D;font-size: 36rpx;margin-left: 26rpx;flex: 1;">{{item.poetry}}</view>
			</view>
			<u-loadmore v-if="myLists.length" :loadmoreText="loadmoreText" color="#a1a1a1" marginTop="20" />
			<u-empty v-if="!myLists.length" icon="/static/empty2.png" text="数据为空" textColor="#a1a1a1"
				marginTop="100"></u-empty>
		</view>
		<!-- <view style="padding:0rpx 30rpx 30rpx 30rpx;">
			<view class="listItem" v-for="(item,index) in myLists" :key="index" @click="openCentet(item)">
				<view>{{ $u.timeFormat(item.createtime, 'yyyy-mm-dd hh:MM')}}</view>
				<view style="margin-top: 30rpx;display: flex;align-items: center;">
					<view class="ball" :style="'background: linear-gradient(to bottom, '+randomColor()+', #ffffff);'">
						<text>{{item.word}}</text>
					</view>
					<view>{{item.poetry}}</view>
				</view>
			</view>
			<u-loadmore v-if="myLists.length" :loadmoreText="loadmoreText" color="#a1a1a1" marginTop="20" />
			<u-empty v-if="!myLists.length" icon="/static/empty2.png" text="数据为空" textColor="#a1a1a1"
				marginTop="100"></u-empty>
		</view> -->
		<topPrompt></topPrompt>
		<feiqslsHit></feiqslsHit>
	</view>
</template>

<script>
	export default {
		name: "wineList",
		data() {
			return {
				page: 1,
				myLists: [],
				loadmoreText: "加载更多"
			}
		},
		onLoad() {
			this.getList();
			this.setFontFamily()
		},
		onReachBottom() {
			var that = this;
			if (that.loadmoreText == "加载更多") {
				that.page++;
				that.getList();
			}
		},
		methods: {
			//设置字体
			setFontFamily() {
				// #ifdef APP-PLUS
				uni.loadFontFace({
					family: 'font-test',
					// 本地字体路径需转换为平台绝对路径
					source: `url(${plus.io.convertLocalFileSystemURL('_www/static/regular.ttf')})`,
					success() {
						console.log('success')
					},
					fail(e) {
						console.log('fail')
					}
				})
				// #endif
			},
			isDate(timer) {
				// 创建一个表示当前时间的 Date 对象
				const currentDate = new Date();

				// 获取当前年份、月份、日期
				const currentYear = currentDate.getFullYear();
				const currentMonth = currentDate.getMonth() + 1; // 注意月份是从 0 开始计算的，所以要加 1
				const currentDay = currentDate.getDate();

				// 创建一个表示要判断的时间的 Date 对象
				const targetDate = new Date(timer); // 这里假设要判断的时间是 2023 年 2 月 25 日

				// 获取要判断的时间的年份、月份、日期
				const targetYear = targetDate.getFullYear();
				const targetMonth = targetDate.getMonth() + 1;
				const targetDay = targetDate.getDate();

				// 判断年份、月份、日期是否都相等
				if (currentYear === targetYear && currentMonth === targetMonth && currentDay === targetDay) {
					console.log('要判断的时间是今天');
					return true;
				} else {
					console.log('要判断的时间不是今天');
					return false;
				}
			},
			openCentet(item) {
				var that = this;
				var obj = {
					id: item.id,
					poetry_word_id: item.poetry_word_id,
					createtime: item.createtime
				}
				that.$u.route(`/pages/joy/wineDetails?data=${JSON.stringify(obj)}`);
			},
			randomColor() {
				// 生成随机颜色  
				const letters = '0123456789ABCDEF';
				let color = '#';
				for (let i = 0; i < 6; i++) {
					color += letters[Math.floor(Math.random() * 16)];
				}
				return color;
			},
			getList() {
				var that = this;
				that.$api("poetry.myList", {
					page: that.page,
					limit: 10,
					cate:1
				}).then(res => {
					if (res.code == 1) {
						if (res.data.length != 0) {
							that.myLists.push(...res.data);
							if (res.data.length < 10) {
								that.loadmoreText = "没有更多了"
							}
						} else {
							that.loadmoreText = "没有更多了"
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		background: #FFF9EC;
		padding: 30rpx 26rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
		border: 1rpx solid #FCEBC5;
	}

	.listItem {
		padding: 20rpx;
		border: 1px solid #ccc;
		border-radius: 20rpx;
		margin-top: 30rpx;
	}

	.ball {
		width: 65rpx;
		height: 65rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 65rpx;
		color: #fff;
		font-size: 30rpx;

		margin-right: 30rpx;
	}
</style>