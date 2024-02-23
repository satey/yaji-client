<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="">
		<!-- 暂无角色 -->
		<view v-if="noRole">
			<u-modal :show="noRole" :showConfirmButton="false" :background="'#ffffff'" :showCancelButton="false"
				confirmColor="#FFA000" confirmText="确定" cancelText="取消" @cancel="noRole=false">
				<view>
					<view style="display: flex;flex-direction: column;">
						<view style="text-align: center;font-size: 32rpx;color: #323232;font-weight: bold;">提示</view>
						<view style="color:#999;font-size: 26rpx;margin-top: 30rpx;text-align: center;">
							<text>{{noRoleMsg}}</text>
						</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 125rpx;">
						<view @click="noRole=false"
							style="margin-right: 20rpx;width: 228rpx;height: 65rpx;opacity: 1;border: 1rpx solid #C7C7C7;text-align: center;line-height: 65rpx;color: #808080;border-radius: 10rpx;font-size: 28rpx;">
							取消</view>
						<view @click="noRoleClick"
							style="margin-left: 20rpx;width: 228rpx;height: 65rpx;opacity: 1;background:#FFA000;text-align: center;line-height: 65rpx;color: #FFFFFF;border-radius: 10rpx;font-size: 28rpx;">
							确定</view>
					</view>
				</view>
			</u-modal>
		</view>
		<image src='@/static/embed/sexBg.png'
			style="position: fixed; width: 100%; height: 100%; top: 0; left: 0; z-index: -1"></image>
		<view style="padding: 130rpx 30rpx;">
			<view class="sexTitle">选择您的古代身份</view>
			<view class="subSexTitle">
				性别选定后无法更改，身份以后还可更换。
			</view>
			<view class="flex mt-10" style="justify-content: center;">
				<block v-for="(item,index) in gender_data" :key="index">
					<view @click="handleChangeGender(item.gender==1?'male':'female')"
						:style="index==0?'margin-right:70rpx':'margin-left:70rpx'">
						<image :src="item.image" mode="heightFix" style="width: 90rpx;height: 160rpx;"></image>
						<view style="display: flex;margin-top: 30rpx;">
							<u-radio-group v-model="gender">
								<u-radio :name="item.gender==1?'male':'female'" size="45" shape="circle"
									inactiveColor="#CCCCCC" activeColor="#FFA000"></u-radio>
							</u-radio-group>
							<view style="color:#323232;font-size: 36rpx;">{{item.gender==1?'男':'女'}}</view>
						</view>
					</view>
				</block>
			</view>
			<view style="display: flex;flex-wrap: wrap;justify-content: space-between;margin-top: 80rpx;"
				v-if="deletion == false&&is_open==1">
				<block v-for="(item,index) in identity_data" :key="index">
					<view class="identityItem" @click="identityClick(index,item.identity_id)"
						:style="index==currentIndex?'border: 1px solid #FFA000;':'border: 1px solid #CCCCCC;'">
						<image :src="item.image"
							style="width: 96rpx;height: 128rpx;margin-right: 18rpx;transition: all 0.3s;"
							mode="heightFix" :style="index==currentIndex?'transform: scale(1.1)':'transform: scale(1)'">
						</image>
						<view
							style="height: 128rpx;display: flex;flex-direction: column;justify-content: space-around;">
							<view style="color: #323232;font-size: 36rpx;font-weight: 400;">{{item.title}}</view>
							<view style="color: #808080;font-size: 28rpx;">{{item.content}}</view>
						</view>
					</view>
				</block>
			</view>
			<view v-if="deletion == true">
				<view style="display: flex;flex-direction: column;align-items: center;">
					<image src="@/static/wurenwu.png" style="width: 388rpx;height: 388rpx;" mode="widthFix"></image>
					<view style="font-size: 28rpx;color: #808080;width: 610rpx;">
						非常抱歉！角色库中所有角色都被占用，我们正在加紧补充角色。您可以先以无名氏身份进入，稍后在个人中心获取角色。</view>
				</view>
			</view>

			<view class="grid text-center" style="margin-top: 72rpx;" v-if="deletion == true">
				<view
					class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500 btn"
					@click="skip()">
					进入首页
				</view>
			</view>
			<view class="grid text-center" style="margin-top: 72rpx;" v-if="deletion == false">
				<view
					class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500 btn"
					@click="onSubmit()">
					生成角色
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 's1',
		data() {
			return {
				form: {
					birthday: '',
					gender: 1,
				},
				gender: 'male',
				showBirthday: false,
				ismale: '',
				isFemale: '',
				//----
				gender_data: [],
				identity_data: [],
				currentIndex: -1,
				deletion: false,
				identity_id: "",
				isClick: false,
				noRole: false,
				noRoleMsg: "",
				is_open: 0,
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				var that = this;
				that.$api("role.identity_list").then(res => {
					if (res.code == 1) {
						that.gender_data = res.data.gender_data;
						that.identity_data = res.data.identity_data
						that.is_open = res.data.is_open;
						if (res.data.identity_data.length == 0) {
							that.deletion = true;
						}
					}
				})
			},
			//跳过
			noRoleClick() {
				var that = this;
				that.$api('user.only_choose_gender', {
					gender: that.form.gender
				}).then(res => {
					if (res.code === 1) {
						var userInfo = uni.getStorageSync("userInfo");
						uni.setStorageSync("skip", userInfo.id);
						that.noRole = false;
						that.$api("user.info").then((userInfo) => {
							uni.setStorageSync("userInfo", userInfo.data)
						})
						uni.reLaunch({
							url: '/pages/index/index',
							success: (res) => {},
							fail: (err) => {
								console.log(err);
							}
						})
					} else {
						that.$u.toast(res.msg)
					}
				})
			},
			skip() {
				var that = this;
				if (that.gender == 'male') {
					that.form.gender = 1
				}
				// 如果是女的就等于2
				if (that.gender == 'female') {
					that.form.gender = 2
				}
				if (!that.form.gender) {
					that.$u.toast('性别必须选择')
					return false
				}
				that.$api('user.only_choose_gender', {
					gender: that.form.gender
				}).then(res => {
					if (res.code === 1) {
						var userInfo = uni.getStorageSync("userInfo");
						uni.setStorageSync("skip", userInfo.id)
						that.$api("user.info").then((userInfo) => {
							uni.setStorageSync("userInfo", userInfo.data)
						})
						uni.reLaunch({
							url: '/pages/index/index',
							success: (res) => {},
							fail: (err) => {
								console.log(err);
							}
						})
					} else {
						that.$u.toast(res.msg)
					}
				})
			},
			identityClick(index, id) {
				this.currentIndex = index;
				this.identity_id = id;
			},
			handleChangeGender(value) {
				let that = this
				that.gender = value
				that.form.gender = that.gender === 'male' ? 1 : 2
			},
			onSubmit() {
				let that = this
				// 如果是男的就等于1
				if (that.gender == 'male') {
					that.form.gender = 1
				}
				// 如果是女的就等于2
				if (that.gender == 'female') {
					that.form.gender = 2
				}
				if (!that.form.gender) {
					that.$u.toast('性别必须选择')
					return false
				}
				if (that.is_open == 1) {
					if (that.identity_id == '') {
						that.$u.toast('身份必须选择')
						return false
					}
				}
				uni.showLoading({
					title: '获取中',
					mask: true
				})
				if (that.isClick == true) {
					return;
				}
				that.isClick = true;
				that.$api('role.match', {
					"gender": that.form.gender,
					"identity_id": that.identity_id
				}).then(matchRes => {
					if (matchRes.code == 1) {
						that.$api('user.bindrole', {
							role_id: matchRes.data.id,
							dynasty: matchRes.data.id.dynasty,
							gender: that.form.gender
						}).then(res => {
							that.isClick = false;
							if (res.code === 1) {
								uni.reLaunch({
									url: '/pages/auth/s3?role=' + JSON.stringify(matchRes.data)
								})
							} else {
								uni.showToast({
									icon: "none",
									title: res.msg
								})
							}
							uni.hideLoading()
						})
						uni.hideLoading()
					} else if (matchRes.code == 2001) {
						that.isClick = false;
						that.noRoleMsg = matchRes.msg;
						that.noRole = true;
						uni.hideLoading()
					}
				})
			},
		}
	}
</script>
<style lang="scss">
	.identityItem {
		display: flex;
		align-items: center;
		width: calc(100% / 2 - 15rpx);
		box-sizing: border-box;
		margin-top: 28rpx;
		padding: 20rpx;
		border-radius: 20rpx;
		transition: all 0.3s;
	}

	.btn {
		background-image: url(@/static/iconImage/btnBg2.png) !important;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: 100% 100%;
		width: 490rpx;
		margin: 0 auto;
	}

	.sexTitle {
		color: #323232;
		font-size: 36rpx;
	}


	.subSexTitle {
		color: #808080;
		font-size: 28rpx;
		padding-top: 20rpx;
	}

	.page {
		display: block;
		position: relative;
		width: 100%;
		height: 100vh;
		background: #ffffff;
		overflow: hidden;

		.after-dom {
			content: '';
			display: block;
			position: absolute;
			z-index: 5;
			bottom: -520rpx;
			left: 146rpx;
			width: 1200rpx;
			height: 1200rpx;
			border-radius: 100000rpx;
			opacity: 0.2;
		}

		.title {
			position: relative;
			margin-top: 84rpx;

			.text {
				position: relative;
				z-index: 10;
				padding-left: 112rpx;
				font-size: 60rpx;
				font-weight: bold;
				color: #000000;
				line-height: 66rpx;
			}

			.after {
				position: absolute;
				left: 0;
				bottom: 0;
				width: 246rpx;
				height: 16rpx;
			}
		}

		.input-group-block {
			margin-top: 126rpx;
			padding: 0 110rpx;

			.input-item {
				display: flex;
				padding-top: 46rpx;
				padding-left: 0.2em;
				border-bottom: 1px solid #c2c2c2;

				.input-dom {
					flex: 1;
					font-size: 28rpx;
					height: 70rpx;
					padding-left: 0.2em;
					padding-right: 1em;
				}

				.text {
					font-size: 30rpx;
					color: #2c2c2c;
				}
			}
		}

		.btn-dom {
			margin: 66rpx 56rpx;
			text-align: center !important;
			height: 113rpx;
			line-height: 113rpx !important;
			color: #ffffff;
			border-radius: 1000px !important;
		}

		.zIndex10 {
			position: relative;
			z-index: 10;
		}

		.login-third {
			display: flex;
			align-items: center;
			justify-content: center;

			.weixin-login-btn {
				display: flex;
				flex-direction: column;
				align-items: center;

				.icon-blcok {
					width: 80rpx;
					height: 80rpx;
					background: #28c445;
					border-radius: 1000rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.text {
					font-size: 24rpx;
					color: #848484;
					line-height: 2;
				}
			}
		}

		.reg-block {
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			z-index: 10;
			bottom: 100rpx;
			width: 100vw;

			.description-text {
				font-size: 26rpx;
				color: #686a68;

				.text {
					display: inline-block;
					text-decoration: underline;
				}
			}
		}
	}

	.active {
		display: none;
	}
</style>