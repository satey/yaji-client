<template>
	<view>
		<!-- 充值 -->
		<view v-if="recharge">
			<u-modal :show="recharge" :showConfirmButton="false" :showCancelButton="false" confirmColor="#FFA000"
				confirmText="充值" cancelText="放弃" @cancel="recharge=false">
				<view>
					<view style="display: flex;flex-direction: column;">
						<view style="text-align: center;font-size: 32rpx;color: #323232;font-weight: bold;">铜钱不足</view>
						<view style="color:#999;font-size: 26rpx;margin-top: 30rpx;">
							<text>当前没有足够的铜钱，需要前往购买吗？</text>
						</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 125rpx;">
						<view @click="recharge=false"
							style="margin-right: 20rpx;width: 228rpx;height: 65rpx;opacity: 1;border: 1px solid #C7C7C7;text-align: center;line-height: 65rpx;color: #808080;border-radius: 10rpx;font-size: 28rpx;">
							取消</view>
						<view v-if="platform=='ios'" @click="$u.route('/pages/mine/recharge')"
							style="margin-left: 20rpx;width: 228rpx;height: 65rpx;opacity: 1;background:#F97698;text-align: center;line-height: 65rpx;color: #FFFFFF;border-radius: 10rpx;font-size: 28rpx;">
							去充值</view>
						<view v-if="platform=='android'" @click="recharge=false;$refs.feiRecharge.show()"
							style="margin-left: 20rpx;width: 228rpx;height: 65rpx;opacity: 1;background:#F97698;text-align: center;line-height: 65rpx;color: #FFFFFF;border-radius: 10rpx;font-size: 28rpx;">
							小额充值</view>
					</view>
				</view>
			</u-modal>
		</view>
		<feiRecharge ref="feiRecharge"></feiRecharge>
		<view v-if="showSvga" id="svgaPlayer" class="fixed w-full h-screen top-0 right-0 bottom-0 left-0"
			style="z-index: 9999999999999999;">
			<l-svga ref="svgaPlayer"></l-svga>
		</view>
		<u-popup :show="showAction" @close="closePopup" :closeable="false" :round="30">
			<view style="background: #fff;border-radius: 20rpx 20rpx 0rpx 0rpx;">
				<view
					style="text-align: right;padding-top: 30rpx;padding-right: 30rpx;font-size: 39rpx;box-sizing: border-box;"
					@click="showAction = false">
					<text class="ri-close-fill"></text>
				</view>
				<view class="grid grid-cols-4 gap-4  p-4 overflow-y-scroll">
					<block v-for="(item, index) in giftList" :key="index" :item="item" v-if="item.status!='hidden'">
						<view class="flex flex-col items-center" @click="handleGiftSend(item)">
							<image class="block w-20 h-20" :src="item.image" lazy-load="false"></image>
							<text style="color: #323232;font-size: 25rpx;">{{ item.title }}</text>
							<view style="margin-top: 20rpx;display: flex;align-items: center;">
								<image style="width: 20rpx;height: 20rpx;" src="@/static/qian.png" mode=""></image>
								<text style="font-size: 20rpx;color: #808080;margin-left: 5rpx;">{{ item.price }}</text>
							</view>
						</view>
					</block>
				</view>
				<view
					style="display: flex;flex-direction: row;justify-content: end;padding-bottom: 30rpx;margin-right: 27rpx;">
					<view style="display: flex;align-items: center;margin-right: 20rpx;">
						<image style="width: 20rpx;height: 20rpx;" src="@/static/qian.png" mode=""></image>
						<text style="font-size: 20rpx;color: #808080;margin-left: 5rpx;">{{userInfoData.money}}</text>
					</view>
					<view style="display: flex;align-items: center;font-size: 23rpx;color: #FFA000;"
						@click="$u.route('/pages/mine/recharge')">
						<text>马上充值</text>
						<text class="ri-arrow-right-s-line" style="font-size: 35rpx;"></text>
					</view>
				</view>
			</view>

		</u-popup>
	</view>
</template>

<script>
	import feiRecharge from "@/components/fei-recharge/fei-recharge.vue"
	export default {
		props: ['giveId', 'channel'],
		components: {
			feiRecharge
		},
		data() {
			return {
				showAction: false,
				giftList: [],
				userInfoData: [],
				showSvga: false,
				receiver_user_id: "",
				recharge: false,
				third_id: null,
				platform: uni.getSystemInfoSync().platform,
			}
		},
		destroyed() {
			this.showSvga = false;
		},
		beforeMount() {
			this.getGiftList()
			this.getUserInfo()
		},
		methods: {
			closePopup() {
				this.showAction = false;
				this.third_id = null;
			},
			setThird_id(id) {
				this.third_id = id;
			},
			setId(id) {
				this.receiver_user_id = id;
			},
			handleGiftSend(item) {
				let that = this;
				that.gift = item;
				var userInfo = uni.getStorageSync("userInfo");
				if (that.receiver_user_id == userInfo.id) {
					uni.showToast({
						icon: "none",
						title: "不能给自己送礼物"
					})
					that.showAction = false;
					return;
				}
				that.$api("gift.giveGift", {
					"receiver_user_id": that.receiver_user_id,
					"nums": 1,
					"gift_id": item.id,
					"channel": that.channel,
					"third_id": that.third_id,
				}).then(data => {
					if (data.code == 1) {
						if (data.msg == "赠送成功") {
							that.getUserInfo();
							if (item.url != null) {
								that.showSvga = true
								that.handleGiftPlay();
							}
						}
					} else {
						that.showAction = false;
						that.recharge = true;
					}
				})
			},
			//播放礼物动画
			handleGiftPlay() {
				let that = this;
				that.showSvga = true;
				that.$nextTick(() => {
					that.$refs.svgaPlayer.render(async (parser, player) => {
						let videoItem = await parser.load(that.gift.url)
						await player.setVideoItem(videoItem)
						player.loops = 1;
						player.setContentMode(that.gift.is_full_screen == 1 ? "AspectFill" :
							"AspectFit")
						player.startAnimation()
						player.onFinished(() => {
							that.showSvga = false
						})
					})
				})
			},
			getUserInfo() {
				var that = this;
				that.$api("user.info").then(res => {
					if (res.code == 1) {
						that.userInfoData = res.data;
					}
				})
			},
			show() {
				this.showAction = true;
			},
			//礼物列表
			getGiftList() {
				let that = this;
				that.$api('gift.lists').then(res => {
					if (res.code === 1) {
						that.giftList = res.data;
					}
				})
			},
		}
	}
</script>

<style>
</style>