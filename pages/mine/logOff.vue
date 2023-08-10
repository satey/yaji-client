<template>
	<view>
		<u-navbar title="账号注销" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view style="padding: 30rpx;font-size: 23rpx;">
			<view>
				在您注销您的帐号之前，请充分阅读、理解并同意下列事项：
			</view>
			<view>
				1. 注销须知</br>
				如果您申请注销雅集帐号，请在提交申请前确认以下信息，以保证您的帐号和财产安全：</br>
				1.1. 您的帐号处于正常使用状态，未发生过被盗、被停用等帐号异常情形；</br>
				1.2. 帐号内财产已结清。</br>
				1.3. 帐号未涉及任何争议纠纷。</br>
			</view>
			<view>
				2. 特别提醒</br>
				2.1 您的雅集帐号一旦被注销成功将不可恢复，您将无法再使用本帐号或找回您添加、绑定的任何本帐号内容或信息（即使您使用相同的手机号再次注册并使用雅集的），包括但不限于：
				您帐号下的个人资料（头像、性别）、与帐号有关的信息和数据（雅集号、角色、名望、动态、关注、点赞、评论、浏览记录、聊天记录等），都将无法找回。请您务必在注销之前自行备份与帐号相关的前述所有内容或信息。您理解并同意，雅集也无法协助您恢复前述内容或信息。</br>
				2.2 对于您在雅集平台已公开发布的所有内容，在您注销帐号后，该内容将转为匿名发布状态继续保留在雅集平台。如您需删除该内容的，请您务必在申请帐号注销前自行删除或做其他处理。</br>
				2.3 您知晓并同意，如雅集帐号存在权属争议的，雅集有权禁用该帐号，直至争议双方通过和解或司法途径解决并向雅集提供有效证明。在此期间雅集有权拒绝帐号注销操作。</br>
				2.4 在您的帐号注销期间，如您的雅集帐号被他人举报、被投诉、被国家机关调查或正处于诉讼、仲裁程序中，雅集有权自行终止您的雅集帐号注销流程而无需另行获得您的同意。</br>
				2.5 注销雅集帐号并不代表帐号注销前的行为和相关责任得到任何形式的豁免或减轻。</br>
				2.6 注销成功后，我们将删除您的个人信息或对其进行匿名化处理。请您知悉并理解，根据相关法律法规规定，雅集将就相关日志记录保留不少于 6 个月的时间。</br>
			</view>
			<view
				style="background: #FE4373;color: #fff;text-align: center;border-radius: 20rpx;height: 80rpx;line-height: 80rpx;margin-top: 50rpx;"
				@click="off">
				确定注销账号</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			//注销
			off() {
				var that = this;
				uni.showModal({
					title: "提示",
					content: "请务必确认您已明确了解注销账号的后果。若您已了解并确认，请点击确认按钮，系统将执行注销操作。确定要立即注销当前账号吗？",
					confirmColor: "#FE4373",
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							that.$api('user.off').then(res => {
								console.log(res)
								if (res.code === 1) {
									that.$u.toast(res.msg)
									getApp().globalData.socketTask.close();
									var userInfo = uni.getStorageSync("userInfo");
									that.$store.commit("setIslogout", true);
									that.$nextTick(() => {
										uni.removeStorageSync('token')
										uni.removeStorageSync('userInfo')
										uni.removeStorageSync('msgCount')
										uni.removeStorageSync('pageCount')
										that.$store.commit("setMessageList", []);
										that.$store.commit("setMsgCount", 0);
										that.$store.commit("setMsgCount2");
										that.$store.commit("messageListTotal", [])
										that.$nextTick(() => {
											uni.reLaunch({
												url: '/pages/auth/login'
											})
										})
									})
								} else {
									that.$u.toast(res.msg)
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}

				})
			}
		}
	}
</script>

<style lang="scss">

</style>