<template>
	<view>
		<view>
			<view style="height: var(--status-bar-height);background:#F4FFE7 ;"></view>
			<view class="top">
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view style="width: 206rpx;">
						<view style="font-family: font-test !important;font-size: 28rpx;color: #333;">今日雅令：</view>
						<view style="display: flex;align-items: center;margin-top: 20rpx;">
							<view class="reputation">{{yaling.title}}
							</view>
						</view>
					</view>
					<view class="fabuRight">
						<block v-if="yaling.desc.length<55">
							{{yaling.desc}}
						</block>
						<block v-else>
							{{yaling.desc.slice(0,55)}}...
						</block>
					</view>
				</view>
				<view style="display: flex;align-items: center;justify-content: center;margin-top:15rpx;">
					<view class="canyu" @click="$u.route('/pages/post/add',{
						yaling:yaling.title,
						yalingId:yaling.yaling_id
					})"></view>
				</view>
			</view>
		</view>
		<view style="padding: 0rpx 23rpx;box-sizing: border-box;margin-top: 500rpx;">
			<view class="item" @click="$u.route('/pages/post/addTopic')"></view>
			<view class="item2" @click="$u.route('/pages/post/add',{yaling:''})"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yaling: {
					title: "",
					yaling_id: "",
					desc: ""
				}
			}
		},
		onLoad() {
			this.setFontFamily();
			this.getYaLing()
		},
		methods: {
			getYaLing() {
				this.$api("yaling.getTodayPostYaling").then(res => {
					if (res.code == 1) {
						this.yaling = res.data;
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
	.top {
		height: 455rpx;
		background-image: url(@/static/fabutopBg2.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		padding: 43rpx 25rpx 88rpx 33rpx;
		box-sizing: border-box;
	}

	.canyu {
		background-image: url(@/static/canyu2.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		width: 206rpx;
		height: 85rpx;
	}

	.fabuRight {
		background-image: url(@/static/fabu222.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		width: 450rpx;
		height: 295rpx;
		color: rgba(0, 0, 0, 0.6);
		font-size: 28rpx;
		padding: 65rpx 10rpx 0rpx 105rpx;
		box-sizing: border-box;
		overflow: hidden;
	}

	.reputation {
		position: relative;
		z-index: 11;
		font-family: font-test !important;
		font-size: 32rpx;
		color: #333;


		&::after {
			content: " ";
			width: 100%;
			background: #9EFF00;
			height: 16rpx;
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			z-index: -1;
		}
	}

	.item {
		background-image: url(@/static/fahuati2.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		height: 151rpx;
		box-sizing: border-box;
	}

	.item2 {
		background-image: url(@/static/fadongtai.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		height: 151rpx;
		box-sizing: border-box;
		margin-top: 25rpx;
	}

	.textLine {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 7;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>