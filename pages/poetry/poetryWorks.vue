<template>
	<view>
		<image style="position: absolute;top: 0;left: 0;width: 100%;height: 404rpx;" src="@/static/yinshiBg.png"
			mode="">
		</image>
		<view class="seach">
			<u-navbar :safeAreaInsetTop="true" :placeholder="true" bgColor="transparent">
				<view slot="left">
					<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
				</view>
			</u-navbar>
		</view>
		<view style="height: 404rpx;"></view>
		<view
			style="padding: 30rpx 12rpx 30rpx 34rpx;box-sizing: border-box;display: flex;flex-wrap: wrap;align-items: center;">
			<view class="items" v-for="(item,index) in list" :key="index">
				<view
					style="width:140rpx ;height: 140rpx;border-radius: 50%;position: relative;overflow: hidden;margin: 0 auto;"
					@click="clickAvatar(item,index)">
					<image :src="item.user_info.avatar" :class="item.ispause?'imgRotate':''"
						style="width: 100%;height: 100%;" mode="aspectFill"></image>
					<image v-if="item.ispause" src="@/static/bbb.png"
						style="width:60rpx ;height: 60rpx;position: absolute;top: 50%;left: 50%;transform: translate(-50% ,-50%);"
						mode=""></image>
					<image v-else src="@/static/aaa.png"
						style="width:60rpx ;height: 60rpx;position: absolute;top: 50%;left: 50%;transform: translate(-50% ,-50%);"
						mode=""></image>
				</view>
				<view style="display: flex;align-items: center;justify-content: center;margin-top: 15rpx;">
					<view @click="$u.route('/pages/user/home',{user_id:item.user_info.user_id})"
						style="font-size: 26rpx;color:#666666 ;margin-right: 9rpx;">{{item.user_info.role_name_str}}
					</view>
					<block v-if="item.user_info.gender ==1">
						<i class="iconfont icon-nan1" style="font-size: 22rpx;color: #00C2FF;"></i>
					</block>
					<block v-else>
						<i class="iconfont icon-nv" style="font-size: 22rpx;color: #FFA000;"></i>
					</block>
				</view>
				<view class="title">
					<block v-if="item.title.length >=17">
						《{{item.title.slice(0,17)}}...》
					</block>
					<block v-else>
						《{{item.title}}》
					</block>
				</view>
				<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 10rpx;">
					<view :style="{opacity:item.post_id==0?'0':'1'}" style="display: flex;align-items: center;">
						<image src="../../static/xin.png" @click="zan(item,index)" v-if="item.is_dig ==0"
							style="width: 35rpx;height: 35rpx;">
						</image>
						<image v-else @click="zan(item,index)" src="../../static/iconImage/hongxin.png"
							style="width: 35rpx;height: 35rpx;" mode="widthFix"></image>
						<text style="color: #666;font-size: 26rpx;margin-left: 10rpx;">{{item.dig_num}}</text>
					</view>
					<view class="btn" @click="callCall(item)">
						打招呼
					</view>
				</view>
			</view>
			<view v-if="!list.length" style="margin: 0 auto;">
				<u-empty icon="/static/iconImage/jilu.png" text="暂无数据" textColor="#a1a1a1" marginTop="100"></u-empty>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				page: 1,
				audio: uni.createInnerAudioContext(),
				ispause: false,
				userInfo: uni.getStorageSync("userInfo"),
			}
		},
		onLoad() {
			this.init()
		},
		onReachBottom() {
			this.page++;
			this.init()
		},
		beforeDestroy() {
			this.audio.stop();
			this.list.forEach((item, index) => {
				item.isPlay = false;
				item.ispause = false;
			})
		},
		onUnload() {
			this.audio.stop();
			this.list.forEach((item, index) => {
				item.isPlay = false;
				item.ispause = false;
			})
		},
		onHide() {
			this.audio.stop();
			this.list.forEach((item, index) => {
				item.isPlay = false;
				item.ispause = false;
			})
		},
		methods: {
			callCall(item) {
				if (item.user_info.user_id == this.userInfo.id) {
					uni.showToast({
						title: "这是您自己",
						icon: "none"
					})
					return;
				}
				this.$api("call.sayHello", {
					to_user_id: item.user_info.user_id,
					module: 'recite'
				}).then(res => {
					this.$u.route('/pages/chat/single', {
						user_id: item.user_info.user_id
					})
				})
			},
			zan(item, index) {
				this.list[index].is_dig = this.list[index].is_dig == 0 ? 1 : 0;
				this.$api("activity.dig", {
					post_id: item.post_id
				}).then(res => {
					if (this.list[index].is_dig == 1) {
						this.list[index].dig_num++;
					} else {
						this.list[index].dig_num--;
					}
				})
			},
			init() {
				this.$api("activity.getReciteOpusList", {
					page: this.page
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						res.data.list.forEach((item, index) => {
							item.isPlay = false;
							item.ispause = false;
						})
						this.list = [...this.list, ...res.data.list]
					}
				})
			},
			clickAvatar(item, index) {
				if (this.list[index].isPlay == false) {
					this.list.forEach((item, index) => {
						item.isPlay = false;
						item.ispause = false;
					})
					this.handlePlayAudio(item.audio, index)
				} else {
					console.log(this.list[index].ispause)
					if (this.list[index].ispause == true) {
						this.audio.pause()
						this.list[index].ispause = false;
					} else {
						this.audio.play()
						this.list[index].ispause = true;
					}
				}
			},
			handlePlayAudio(audio, index) {
				let that = this
				if (!audio) {
					that.$u.toast('语音不能为空')
					return false
				}
				that.$nextTick(function() {
					that.list[index].isPlay = true;
					that.list[index].ispause = true;
					that.audio.src = audio;
					that.audio.play();
					that.audio.onEnded((e) => {
						that.audio.stop();
						that.list[index].isPlay = false;
						that.list[index].ispause = false;
						that.audio.src = '';
					})
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		color: #333333;
		font-size: 30rpx;
		text-align: center;
		margin-top: 9rpx;
		height: 85rpx;
		display: -webkit-box;
		/* Webkit内核支持该属性 */
		-webkit-line-clamp: 2;
		/* 最多显示三行文字 */
		-webkit-box-orient: vertical;
		/* 垂直布局 */
		overflow: hidden;
		/* 隐藏溢出部分 */
		text-overflow: ellipsis;
		/* 显示省略号 */
	}

	.seach {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		box-sizing: border-box;
		height: 404rpx;
	}

	.items {
		width: 330rpx;
		height: 430rpx;
		background: linear-gradient(rgba(255, 221, 164, 1), rgba(255, 255, 255, 1));
		margin-right: 22rpx;
		border-radius: 8rpx;
		padding: 32rpx 15rpx 51rpx 30rpx;
		box-sizing: border-box;
	}

	.btn {
		background-image: url(@/static/btnLinBg.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		width: 110rpx;
		height: 43rpx;
		text-align: center;
		line-height: 43rpx;
		color: #fff;
		font-size: 28rpx;
	}

	.imgRotate {
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		animation-delay: 0;
		animation-duration: 3s;
		animation-name: rotate;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>