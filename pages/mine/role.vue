<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="px-4" style="height: 100%;">
		<image src='@/static/embed/s3.png'
			style="position: fixed; width: 100%; height: 100%; top: 0; left: 0; z-index: -1"></image>
		<u-navbar bgColor="transparent" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #fff !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
			<view slot="right">
			</view>
		</u-navbar>
		<view v-if="showUserRole">
			<view style="padding: 20rpx 30rpx 0rpx 30rpx;display: flex;flex-direction: column;box-sizing: border-box;">
				<view class="container">
					<view class="contentHead">
						<view class="text-2xl name">{{ userRole.realname||"无名氏" }}</view>
						<view
							style="position: absolute;right: 66rpx;color: #808080;font-size: 28rpx;padding-top:10rpx ;">
							名望<text style="color: #FE4373;padding-left: 5rpx;">{{userRole.total_mw|| '无'}}</text></view>
					</view>
					<image src="../../static/fenge.png" style="width: 100%;margin-top: -1px;" mode="widthFix"></image>
					<view class="contentBody">
						<view class="types flex" style="display: flex;flex-wrap: wrap;align-items: center;">
							<view>{{userRole.gender == 1?'男':"女"}}</view>
							<view style="margin-left: 26rpx;">{{userRole.dynasty||"未知朝代"}}</view>
						</view>
						<view
							style="padding: 40rpx 38rpx 0rpx 38rpx;box-sizing: border-box;font-size: 28rpx;color: #808080;">
							<view>
								<text>别称：</text>
								<text>{{userRole.aliasnames || "无"}}</text>
							</view>
							<view style="margin-top: 20rpx;">
								<text>身份：</text>
								<text>{{userRole.achievements || "无"}}</text>
							</view>
							<view style="margin-top: 20rpx;">
								<text>称号：</text>
								<text>{{userRole.titles || "无"}}</text>
							</view>
						</view>
						<view class="contentText text-xl" style="min-height: 80rpx;">{{ userRole.content || '暂无介绍' }}
						</view>
						<view style="padding:0rpx 38rpx;margin-top: 42rpx;">
							<!-- 后续开放 -->
							<view v-if="fei_num <= 0"
								style="text-align: center;font-size: 28rpx;width: 100%; height: 85rpx;background: #FE4373;line-height: 85rpx;color: #FFFFFF;border-radius: 50rpx;"
								@click="handleHuoQu()">重新获取({{ price }}铜钱)
							</view>
							<view v-if="fei_num > 0"
								style="text-align: center;font-size: 28rpx;width: 100%; height: 85rpx;background: #FE4373;line-height: 85rpx;color: #FFFFFF;border-radius: 50rpx;"
								@click="handleRematch()">重新穿越
								免费({{fei_num}}次)
							</view>
							<view style="font-size: 28rpx;color: #808080;text-align: center;margin-top: 36rpx;"
								v-if="money>0">
								（钱包剩余{{money}}铜钱）</view>
						</view>
						<view class="tips text-base" style="margin-top: 60rpx;">
							<text class="ri-error-warning-fill"
								style="font-size: 35rpx;color: #999999;margin-right: 5rpx;"></text>
							<text style="font-size: 28rpx;color: #808080;">每个角色都是全服唯一。</text>
						</view>
						<view class="tips text-base" style="margin-top: 20rpx;">
							<text class="ri-error-warning-fill"
								style="font-size: 35rpx;color: #999999;margin-right: 5rpx;"></text>
							<text style="font-size: 28rpx;color: #808080;">若长时间未登录使用，角色可能被回收。</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 选择朝代 -->
		<u-modal :show="dynastyPopup" :showConfirmButton="true" :showCancelButton="true" confirmColor="#FE4373"
			@cancel="dynastyPopup=false" @confirm="dynastyConfirm">
			<view style="width: 100%;">
				<view style="text-align: center;font-size: 32rpx;color: #323232;font-weight: bold;">选择身份</view>
				<scroll-view scroll-y="true" class="myScroll">
					<view class="dynastyBox">
						<view class="dynastyItem" :class="index==selectIndex?'dynastyItemActive':'dynastyItem'"
							@click="selectDynasty(index,item.identity_id,item.title)"
							v-for="(item, index) in listRoleDynasty" :key="index">
							<view style="display: flex;align-items: center;">
								<image :src="item.image" mode="heightFix"
									style="width: 50rpx;height: 65rpx;margin-right: 22rpx;"></image>
								<view style="font-size: 36rpx;font-weight: 400;color: #323232;">{{item.title}}</view>
							</view>
							<view style="font-size: 28rpx;font-weight: 400;color: #808080;">{{item.content}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-modal>
		<!-- 充值 -->
		<u-modal :show="recharge" :showConfirmButton="true" :showCancelButton="true" confirmColor="#FE4373"
			confirmText="充值" cancelText="放弃" @cancel="recharge=false" @confirm="$u.route('/pages/mine/recharge')">
			<view style="display: flex;flex-direction: column;">
				<view style="text-align: center;font-size: 32rpx;color: #323232;font-weight: bold;">铜钱不足</view>
				<view style="color:#999;font-size: 26rpx;margin-top: 30rpx;">
					<text>铜钱不足,是否前往充值页面</text>
				</view>
			</view>
		</u-modal>
		<!-- 确认角色 showRole-->
		<u-modal :show="showRole" :showConfirmButton="true" :showCancelButton="true" confirmColor="#FE4373"
			confirmText="使用" cancelText="放弃" @cancel="showRole=false;dynastyPopup = true;" @confirm="roleConfirm">
			<view class="w-full text-center">
				<view style="text-align: center;font-size: 32rpx;color: #323232;font-weight: bold;">获得角色</view>
				<scroll-view scroll-y="true" class="myScroll2"
					style="background: #FFF7F9;border-radius: 20rpx;margin-top: 10rpx;padding: 30rpx;box-sizing: border-box;">
					<view>
						<view
							style="display: flex;align-items: flex-end;flex-wrap: wrap;justify-content: space-between;">
							<view>
								<text
									style="font-size: 36rpx;color: #323232;font-weight: bold;">{{role_fei.realname}}</text>
								<text
									style="font-size: 28rpx;color: #808080;margin-left: 20rpx">{{role_fei.gender==1?'男':'女'}}</text>
								<text
									style="font-size: 28rpx;color: #808080;margin-left: 20rpx">{{role_fei.dynasty}}</text>
							</view>

							<!-- <text
								style="font-size: 28rpx;color: #808080;margin-left: 20rpx">{{role_fei.birthplace}}</text> -->
							<view style="display: flex;align-items: center;">
								<text style="font-size: 28rpx;color: #808080;">名望：</text>
								<text style="font-size: 28rpx;color: #FE4373;">{{role_fei.role_mw}}</text>
							</view>
						</view>
						<view v-if="role_fei.length != 0"
							style="padding: 23rpx 0rpx 0rpx 0rpx;box-sizing: border-box;font-size: 28rpx;color: #808080;text-align: left;">
							<view>
								<text>别称：</text>
								<text>{{role_fei.aliasnames || "无"}}</text>
							</view>
							<view style="margin-top: 20rpx;">
								<text>身份：</text>
								<text v-if="role_fei.achievements.length == 0">无</text>
								<block v-else v-for="(item2,index2) in role_fei.achievements" :key="index2">
									<text style="margin-right: 20rpx;">{{item2}}</text>
								</block>
							</view>
							<view style="margin-top: 20rpx;">
								<text>称号：</text>
								<text v-if="role_fei.titles.length == 0">无</text>
								<block v-else v-for="(item2,index2) in role_fei.titles" :key="index2">
									<text style="margin-right: 20rpx;">{{item2}}</text>
								</block>
							</view>
						</view>
						<view class="rolecontent"
							style="color: #808080;font-size: 28rpx;margin-top: 26rpx;text-align: left;min-height: 80rpx;">
							{{role_fei.content ||'暂无介绍'}}
						</view>
					</view>
				</scroll-view>
			</view>
		</u-modal>
		<u-toast ref="uToast" />
		<uc-auth></uc-auth>
		<topPrompt></topPrompt>
	</view>
</template>
<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		name: 'role',
		components: {},
		data() {
			return {
				colors: ["red", "pink", "blue", "yellow", "#FE4373"],
				userRole: {},
				role: {},
				dynasty: {},
				times: 0,
				price: 5,
				listRoleDynasty: [],
				showRole: false,
				showUserRole: true,
				time: null,
				istime: true,
				gender: null,
				isXians: false,
				// ----------
				tags: [],
				selectIndex: null,
				selectId: '',
				selectDynastyName: '',
				dynastyPopup: false,
				role_fei: [],
				fei_num: 0,
				recharge: false,
				money: 0
			}
		},
		onLoad(option) {
			let that = this
			that.getUserRole()
			that.getRoleDynasty()
			that.getMoney()
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo,
			})
		},
		mounted() {
			let that = this
			let time = uni.getStorageSync('times')
			// console.log('ssss',time);	
			that.time = time
			if (that.time == 0) {
				that.isXians = true
				that.istime = false
			}
			that.init()
		},
		methods: {
			getMoney() {
				let that = this
				that.$api('user.info', {
					"role_id": this.role_fei.id
				}).then(res => {
					if (res.code == 1) {
						that.money = res.data.money
					}
				})
			},
			//确认角色
			roleConfirm() {
				var that = this;
				that.$api('user.bindrole', {
					"role_id": this.role_fei.id
				}).then(res => {
					if (res.code === 1) {
						that.showRole = false;
						that.dynastyPopup = true;
						uni.setStorageSync("noRole", false);
						that.getUserRole()
						that.$forceUpdate()
						that.getMoney()
					}
				})
			},
			//确认朝代
			dynastyConfirm() {
				var that = this;
				if (that.selectId == '') {
					uni.showToast({
						icon: "none",
						title: "请选择身份"
					})
					return;
				}
				uni.showLoading({
					title: '获取中'
				})
				that.$api("user.info").then(userData => {
					var gender = userData.data.gender;
					that.$forceUpdate()
					if (userData.code == 1) {
						that.$api('role.match', {
							"gender": userData.data.gender,
							"identity_id": that.selectId
						}).then(res => {
							if (res.code == 1) {
								that.role_fei = res.data;
								uni.hideLoading();
								that.fei_num = that.fei_num - 1;
								that.showRole = true;
								that.dynastyPopup = false;
								that.$api("user.info").then(userData1 => {
									that.money = userData1.data.money;
								})
							} else if (res.code == 0) {
								that.recharge = true;
								that.showRole = false;
								that.dynastyPopup = false;
							}
							uni.hideLoading()
						})
					}
				})
			},
			//选择朝代
			selectDynasty(index, id, name) {
				this.selectIndex = index;
				this.selectId = id;
				this.selectDynastyName = name;
			},
			//重新匹配
			handleRematch() {
				this.dynastyPopup = true;
			},
			init() {
				// let that = this
				// let time = uni.getStorageSync('times')
				// // console.log('ssss',time);	
				// that.time = time
				// if (that.time < 1) {
				// 	that.istime = f
				// }
				// console.log(that.time);

			},
			...mapActions(['getUserInfo']),
			async getUserRole() {
				let that = this
				that.$api('user.info', {
					user_id: that.userInfo.id
				}).then(res => {
					if (res.code === 1) {
						if (res.data.achievements != null) {
							if (res.data.achievements.indexOf(",") == -1) {
								that.tags = res.data.achievements
							} else {
								that.tags = res.data.achievements.split(",")
							}
						}
						that.userRole = res.data;
						that.fei_num = res.data.choose_num
						that.showUserRole = true
					} else {
						that.showUserRole = false
					}
				})
			},
			async getRoleDynasty() {
				let that = this;
				that.$api("role.identity_list").then(res => {
					console.log(res)
					if (res.code == 1) {
						that.listRoleDynasty = res.data.identity_data
					} else if (res.code == -1) {
						that.deletion = true;
					}
				})
				// that.$api('role_dynasty.lists').then(res => {
				// 	if (res.code === 1) {
				// 		that.listRoleDynasty = res.data
				// 	}
				// })
			},
			// 重新获取
			handleHuoQu() {
				let that = this;
				that.$api('user.info', {
					user_id: that.userInfo.id
				}).then(res => {
					if (res.code === 1) {
						if (res.data.money <= 4) {
							that.recharge = true;
						} else {
							that.handleRematch()
						}
					}
				})
			},
			handleReborn() {
				let that = this
				that.showRole = false
				let time = uni.getStorageSync('times')
				that.times = time
				// that.times-=1
				if (that.times < 1) {
					that.istime = false
					// return false
				} else {
					that.showUserRole = false
					that.showDynasty = true
					let time = uni.getStorageSync('times')
					that.times = time
					// that.times-=1
				}

			},
			// 放弃
			handleReborn1() {

				let that = this
				let time = uni.getStorageSync('times')
				that.times = time
				that.times -= 1
				that.showRole = false
				// that.role = res.data
				// 将本地存储的次数移除
				uni.removeStorageSync('times')
				// 将新的剩余次数存储进去
				uni.setStorageSync('times', that.times)
			},
			handleChangeDynasty(obj) {
				let that = this
				that.dynasty = obj
			},
			handleMatch() {
				let that = this
				if (!that.dynasty) {
					that.$u.toast('请选择朝代')
					return false
				}
				if (that.times <= 0) {
					that.$u.toast('次数不够了')
					return false
				}

				let data = {
					dynasty: that.dynasty.dynasty,
					gender: uni.getStorageSync('gender')
				}
				that.$api('role.match', data).then(res => {
					if (res.code === 1) {
						if (that.times == 0) {
							that.$u.toast('没有免费次数了')
						}
						that.role = res.data
						that.times -= 1
						that.showRole = true
					}
					if (res.code == 2) {
						if (that.times == 1) {
							that.role = res.data
						}
						// that.role = res.data
						that.times -= 1
						that.showRole = true
					}
					// if(res.msg=='匹配失败'){
					// 	that.$u.toast('该朝所有角色已被用完')
					// }
					else {
						that.$u.toast(res.msg)
					}

				})
			},
			handleSubmit() {
				let that = this
				if (!that.role) {
					that.$u.toast('角色必须选择')
					return false
				}
				let data = {
					role_id: that.role.id
				}
				that.showRole = false
				that.$api('user.bindrole', data).then(res => {
					if (res.code === 1) {
						that.$u.route('/pages/index/index')
					} else {
						that.$u.toast(res.msg)
						that.$u.route('/pages/index/index')
					}
				})
				uni.removeStorageSync('times')
				uni.setStorageSync('times', that.times)
			},
		}
	}
</script>
<style lang="scss" scoped>
	page {
		height: 100%;
		width: 100%;
	}

	.container {
		flex: 1;
		height: 0;
		// background: #fff;
		border-radius: 25rpx;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		// padding: 50rpx 0rpx 160rpx 0rpx;

		.contentHead {
			text-align: center;
			display: flex;
			text-align: center;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			position: relative;
			padding-bottom: 50rpx;
			background: #fff;
			padding-top: 55rpx;
			border-top-left-radius: 25rpx;
			border-top-right-radius: 25rpx;
			border-bottom-left-radius: 5rpx;
			border-bottom-right-radius: 5rpx;

			.name {
				color: #5F5D5D;
				font-weight: bold;
				font-size: 56rpx;
			}

			.headDetails {
				margin-top: 10rpx;
				color: #808080;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.contentBody {
			// height: calc(100% - 14%);
			padding-top: 10rpx;
			box-sizing: border-box;
			background: #fff;
			margin-top: -4px;
			padding-bottom: 50rpx;
			border-bottom-left-radius: 25rpx;
			border-bottom-right-radius: 25rpx;
			border-top-left-radius: 5rpx;
			border-top-right-radius: 5rpx;

			.types {
				display: flex;
				align-items: center;
				justify-content: center;
				color: #808080;
				font-size: 28rpx;

				.lable {
					width: 35rpx;
					height: 35rpx;
					margin-right: 6rpx;
				}
			}

			.contentText {
				padding: 40rpx 38rpx 0rpx 38rpx;
				color: #808080;
				font-size: 28rpx;
				position: relative;
				box-sizing: border-box;

				.more {
					position: absolute;
					bottom: -5rpx;
					right: 38rpx;
					background: #fff;
					padding-left: 20rpx;
					color: #FE4373;
				}
			}

			.tips {
				padding: 0rpx 30rpx;
				color: #999999;
			}
		}
	}

	.myScroll {
		width: 100%;
	}

	.dynastyBox {
		width: 100%;
		box-sizing: border-box;
	}

	.u-modal__content {
		padding: 0 !important;
	}

	.u-modal__content {
		padding: 0 !important;
	}

	.dynastyItem {
		margin-top: 20rpx;
		width: 100%;
		border: 1px solid #CCCCCC;
		border-radius: 20rpx;
		box-sizing: border-box;
		transition: all 0.3s;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.dynastyItemActive {
		border: 1px solid #FE4373;
	}

	.rolecontent {
		color: #808080;
		font-size: 28rpx;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 5;
		overflow: hidden;
		white-space: no-wrap;
		text-overflow: ellipsis;
		position: relative;
		box-sizing: border-box;
	}
</style>