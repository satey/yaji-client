<template>
	<view>
		<u-navbar title="实名认证" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view class="notice">
			<i class="iconfontcolor icon-idcard-fill" style="font-size: 30rpx;"></i>
			<text>为维持良好的群聊环境，首次创建房间请先实名认证哦~</text>
		</view>
		<view style="padding: 0rpx 35rpx;box-sizing: border-box;">
			<view style="display: flex;align-items: center;margin-top: 50rpx;">
				<text style="color:#333 ;font-size:30rpx ;width: 200rpx;">姓名</text>
				<input type="text" v-model="userName" placeholder="请填写" style="color:#333 ;font-size: 26rpx;"
					placeholder-style="color:#999;fontSize:26rpx" />
			</view>
			<view style="display: flex;align-items: center;margin-top: 50rpx;">
				<text style="color:#333 ;font-size:30rpx ;width: 200rpx;">身份证号</text>
				<input type="idcard" v-model="userId" style="color:#333 ;font-size: 26rpx;" placeholder="仅支持二代身份证"
					placeholder-style="color:#999;fontSize:26rpx" />
			</view>
			<!-- 	<view style="color:#333 ;font-size: 28rpx;margin-top: 78rpx;">注意事项：</view>
			<view style="color:#FF7070 ;font-size: 28rpx;margin-top: 30rpx;">1.每个证件最多支持绑定三个账号</view>
			<view style="color:#333 ;font-size: 28rpx;margin-top: 30rpx;">2.目前仅支持通过二代身份证认证</view>
			<view style="color:#333 ;font-size: 28rpx;margin-top: 30rpx;">3.若您是未成年人，请通知您的监护人提供并确认同意我们 收集您的实名信息</view> -->
		</view>
		<view class="footer">
			<view class="btn" @click="submit" :class="isBtnClick?'btnOk':'btnNo'"
				:style="{color:isBtnClick?'#fff':'#999'}">确认</view>
			<view
				style="display: flex;align-items: center;justify-content: center;font-size: 23rpx;color: #333;margin-top: 50rpx;">
				<view v-if="isBtnClick==false" @click="isBtnClick=!isBtnClick"
					style="width: 20rpx;height: 20rpx;border-radius: 50%;border: 1px solid #333333;box-sizing: border-box;">
				</view>
				<image v-else src="@/static/iconImage/radio.png" @click="isBtnClick=!isBtnClick"
					style="width: 20rpx;height: 20rpx;" mode=""></image>
				<text style="margin-left: 10rpx;" @click="isBtnClick=!isBtnClick">已阅读并同意</text>
				<text style="color: #FFA000;" @click="$u.route('/pages/public/page', { id: 1 })">《用户协议》</text>
				<text @click="isBtnClick=!isBtnClick">和</text>
				<text style="color: #FFA000;" @click="$u.route('/pages/public/page', { id: 2 })">《隐私政策》</text>
			</view>
		</view>
		<u-popup :show="showPopup" mode="center" :closeable="false">
			<view class="popupContainer">
				<view style="color: #000;font-size: 36rpx;text-align: center;">授权提醒</view>
				<view style="color: #000;font-size: 26rpx;margin-top: 35rpx;">
					<view>提示您注意，为实现核实您真实身份并完成实名认证的目的，您需要向我们提供您的真实姓名、<text
							style="color: #FFA000;">身份证号码</text>我们承诺此类信息将不会用 任何其他您未授权的场景，并且会对此类信息采取加密等安全保护技术措施。</view>
					<view style="margin-top: 35rpx;">
						请您理解，为实现上述目的，我们将您的上述实名信息共享至第三方合作伙伴【腾讯云】，我们会与对方签署严格的保密协议保障您的信息安全，在实名认证场景完成后，我们会对在本场景下收集的上述信息做删除或匿名化处理。
					</view>
					<view style="margin-top: 35rpx;">您点击“同意”即视为您同意向我们提供上述信息，并同意我们将您的实名信息传输给第三方。</view>
				</view>
				<view style="display: flex;align-items: center;justify-content: center;margin-top: 63rpx;">
					<view @click="showPopup=false"
						style="width: 190rpx;height: 85rpx;text-align: center;line-height: 85rpx;color: #999999;font-size: 36rpx;border-radius: 50rpx;background: #F7F7F7;margin-right: 16rpx;">
						拒绝</view>
					<view @click="ok"
						style="width: 190rpx;height: 85rpx;text-align: center;line-height: 85rpx;color: #FFFFFF;font-size: 36rpx;border-radius: 50rpx;background: #FFA000;margin-left: 16rpx;">
						同意</view>
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
				showPopup: false,
				isBtnClick: false,
				userName: '',
				userId: ''
			}
		},
		methods: {
			ok() {
				this.$api('realAuth.realAuth', {
					name: this.userName,
					id_card: this.userId
				}).then(res => {
					if (res.code == 1) {
						this.$u.route({
							type: 'navigateBack',
							delta: 1
						})
					}
					this.showPopup = false;
					this.userName = '';
					this.userId = '';
					uni.showToast({
						icon: "none",
						title: res.msg
					})
				})
			},
			submit() {
				if (this.isBtnClick == false) {
					uni.showToast({
						icon: "none",
						title: "请同意协议"
					})
				} else {
					this.showPopup = true;
				}
			}
		}
	}
</script>

<style lang="scss">
	.notice {
		height: 95rpx;
		background: #FFE5B9;
		color: #FF7F00;
		font-size: 26rpx;
		padding: 30rpx 40rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.footer {
		width: 100vw;
		padding: 0rpx 30rpx;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 190rpx;
	}

	.btn {
		width: 100%;
		height: 85rpx;
		text-align: center;
		line-height: 85rpx;
		font-size: 36rpx;
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.btnOk {
		background-image: url(@/static/iconImage/btnBg2.png);
	}

	.btnNo {
		background-image: url(@/static/iconImage/nobtn.png);
	}

	.popupContainer {
		width: 581rpx;
		height: 912rpx;
		padding: 36rpx 33rpx 50rpx 33rpx;
		box-sizing: border-box;
		background: #fff;
		border-radius: 20rpx;
	}
</style>