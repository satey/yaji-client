<template>
	<view style="background: #F8F8F7;min-height: 100%;height: 100vh;">
		<u-navbar title="" :bgColor="'#F8F8F7'" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view>
			<view style="color: #333333;font-size: 36rpx;text-align: center;">
				确认密码
			</view>
			<view style="color: #666666;font-size: 30rpx;text-align: center;margin-top: 25rpx;">
				请再次输入密码
			</view>
			<view
				style="display: flex;margin-top: 35rpx;position: relative;box-sizing: border-box;align-items: center;justify-content: center;">
				<view style="display: flex;position: relative;">
					<block v-for="(item,index) in 4" :key="index">
						<view @touchend.prevent="onTap" class="kuang" @click="passwordValue = '';passwordFocus = true;"
							:style="{border:passwordValue.length ==index?'1px solid #FFA000':'1px solid transparent',marginRight:index==3?'0':'30rpx'}"
							style="width: 92rpx;height: 92rpx;border-radius: 8rpx;background: #D9D9D9;text-align: center;display: flex;align-items: center;justify-content: center;">
							<view v-if="passwordValue.length >=index+1"
								style="width: 12rpx;height: 12rpx;border-radius: 50%;background: #000000;"></view>
						</view>
					</block>
					<input type="number" v-model="passwordValue" @input="changePassword" @focus="passwordValue = ''"
						:focus='passwordFocus'
						style="opacity: 0;border-radius: 8rpx;background: #D9D9D9;text-align: center;margin-right: 30rpx;width: 100%;height: 100%;position: absolute;top: 0;left: 0;border: 1px solid red;box-sizing: border-box;">
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				passwordFocus: true,
				passwordValue: "",
			}
		},
		methods: {
			onTap() {

			},
			changePassword(e) {
				this.passwordValue = e.detail.value;
				if (e.detail.value.length >= 4) {
					this.$API_URL
					if (this.$Route.query.password == this.passwordValue) {
						console.log("正确")
						this.$api("teenageMode.youngModelSetPwd", {
							password: this.passwordValue
						}).then(res => {
							uni.showToast({
								title: res.msg,
								icon: "none"
							})
							let timeOut = setTimeout(() => {
								this.$u.route({
									type: 'navigateBack',
									delta: 1
								})
								clearTimeout(timeOut)
							}, 1000)
						})
					} else {
						console.log("错误")
						uni.showToast({
							title: "密码不一致",
							icon: "none"
						})
					}
				}
			}
		}
	}
</script>

<style>
</style>