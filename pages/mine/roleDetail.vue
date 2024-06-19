<template>
	<view>
		<u-navbar title="" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<!-- 获取角色 -->
		<u-popup :show="bindingRolePopup" @close="bindingRolePopup = false" mode="center" :closeable="false"
			:round="20">
			<view class="log">
				<view style="text-align: center;font-size: 30rpx;color: #333;">获取角色</view>
				<view style="font-size: 28rpx;color: #333;margin-top: 89rpx;">获得新角色后将替换掉原有角色，原角色将被回收。确定获取角色？</view>
				<view style="display: flex;align-items: center;justify-content: center;margin-top: 137rpx;">
					<view @click="bindingRolePopup = false"
						style="margin-right: 21rpx;width: 210rpx;height: 68rpx;background: #FFDDA4;border-radius: 8rpx;text-align: center;line-height: 68rpx;color: #FFA000;font-size: 30rpx;">
						取消</view>
					<view @click="bindingRoleShowPopup"
						style="margin-left: 21rpx;width: 210rpx;height: 68rpx;background: #FFA000;border-radius: 8rpx;text-align: center;line-height: 68rpx;color: #fff;font-size: 30rpx;">
						确认</view>
				</view>
			</view>
		</u-popup>
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
		<view class="getRoleBtn" @click="bindingRolePopup = true">
			<text>获取角色</text>
			<image src="../../static/qian.png" style="width: 20rpx;height: 20rpx;margin-left: 20rpx;" mode=""></image>
			<text>{{role.price}}</text>
		</view>
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
							style="margin-left: 20rpx;width: 228rpx;height: 65rpx;opacity: 1;background:#FFA000;text-align: center;line-height: 65rpx;color: #FFFFFF;border-radius: 10rpx;font-size: 28rpx;">
							去充值</view>
						<view v-if="platform=='android'" @click="recharge=false;$refs.feiRecharge.show()"
							style="margin-left: 20rpx;width: 228rpx;height: 65rpx;opacity: 1;background:#FFA000;text-align: center;line-height: 65rpx;color: #FFFFFF;border-radius: 10rpx;font-size: 28rpx;">
							小额充值</view>
					</view>
				</view>
			</u-modal>
		</view>
		<feiRecharge ref="feiRecharge"></feiRecharge>
	</view>
</template>

<script>
	import feiRecharge from "@/components/fei-recharge/fei-recharge.vue"
	export default {
		components: {
			feiRecharge
		},
		data() {
			return {
				role: [],
				bindingRolePopup: false,
				recharge: false,
				platform: uni.getSystemInfoSync().platform,
			}
		},
		onLoad() {
			this.getUserProfile()
			this.setFontFamily();
		},
		methods: {
			getUserProfile() {
				let that = this
				that.$api('role.detail', {
					role_id: that.$Route.query.role_id
				}).then(res => {
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
			bindingRoleShowPopup() {
				var that = this;
				that.$api("user.info").then(res => {
					if (res.code == 1) {
						if (res.data.money <= this.role.price) {
							this.bindingRole()
						} else {
							this.bindingRolePopup = false;
							this.recharge = true
						}
					}
				})
			},
			bindingRole() {
				var that = this;
				that.$api('role.payRole', {
					"role_id": this.role.id
				}).then(res => {
					this.bindingRolePopup = false;
					if (res.code === 1) {
						this.$u.route("/pages/mine/role", {
							from: "payRole"
						})
					} else {
						this.bindingRolePopup = false;
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

	.log {
		width: 578rpx;
		height: 525rpx;
		border-radius: 16rpx;
		padding: 50rpx 27rpx 62rpx 37rpx;
		background: #fff;
		box-sizing: border-box;
	}
</style>