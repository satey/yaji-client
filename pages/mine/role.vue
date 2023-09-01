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
			<view
				style="padding: 50rpx 30rpx 0rpx 30rpx;display: flex;flex-direction: column;height: 80vh;box-sizing: border-box;">
				<view class="container">
					<view class="contentHead">
						<view class="text-2xl name">{{ userRole.realname||"无名氏" }}</view>
						<view class="headDetails text-xl">
							<view style="margin-right: 30rpx;">{{userRole.dynasty||"未知朝代"}}</view>
							<view style="margin-right: 30rpx;">
								{{userRole.gender == 1?'男':"女"}}
							</view>
							<view>名望：<text style="color: #FE4373;">{{userRole.total_mw|| '无'}}</text></view>
						</view>
					</view>
					<view class="contentBody">
						<view class="types flex" style="display: flex;flex-wrap: wrap;align-items: center;">
							<!-- {{userRole.achievements.indexOf(",")}} -->
							<view v-if="typeof(tags) == 'string'">
								<text class="ri-price-tag-3-line lable" :style="'color:'+colors[0]"></text>
								<text>{{tags}}</text>
							</view>
							<view style="margin-right: 40rpx;" v-else v-for="(item,index) in tags" :key="index">
								<text class="ri-price-tag-3-line lable" :style="'color:'+colors[index % 5]"></text>
								<text>{{item}}</text>
							</view>
						</view>
						<view class="contentText text-xl">{{ userRole.content || '暂无介绍' }} </view>
						<view style="padding:0rpx 38rpx;margin-top: 120rpx;">
							<!-- 后续开放 -->
							<view v-if="fei_num <= 0"
								class="rounded-full p-6  leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500"
								style="text-align: center;font-size: 32rpx;" @click="handleHuoQu()">重新获取({{ price }}铜钱)
							</view>
							<view v-if="fei_num > 0"
								class="rounded-full p-6  leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500"
								style="text-align: center;font-size: 32rpx;" @click="handleRematch()">重新穿越
								免费({{fei_num}}次)
							</view>
							<view style="font-size: 28rpx;color: #808080;text-align: center;margin-top: 20rpx;">
								（钱包剩余{{money}}铜钱）</view>
							<!-- <view class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r"
								style="text-align: center;color: #323232;border: 1px solid #CCCCCC;margin-top: 30rpx;"
								@click="handleRematch()" v-if="choose_num!==0">重新穿越（免费{{choose_num}}次）</view> -->
						</view>
						<view class="tips text-base" style="margin-top: 60rpx;">
							<text class="ri-error-warning-fill" style="font-size: 35rpx;color: #999999;"></text>
							<text style="font-size: 28rpx;color: #808080;">每个角色都是全服唯一。</text>
						</view>
						<view class="tips text-base" style="margin-top: 20rpx;">
							<text class="ri-error-warning-fill" style="font-size: 35rpx;color: #999999;"></text>
							<text style="font-size: 28rpx;color: #808080;">若长时间未登录使用，角色可能被回收。</text>
						</view>
					</view>
				</view>
			</view>

			<!-- <u-modal v-if="!showUserRole" style="padding: 200rpx 50rpx 20rpx 50rpx;" :showConfirmButton="false" :showCancelButton="false">

				<view class="flex text-left text-2xl text-white">选择角色</view>
				<view class="flex text-left mt-4">
					<text class="text-white opacity-50">选择穿越到的朝代，以便给你创建角色。</text>
				</view>
				<view class="flex flex-col mt-4" style="height: 600rpx; overflow-y: scroll;">
					<view class="flex items-center p-2 rounded-lg mt-4" v-for="(item, index) in listRoleDynasty"
						:key="index" :item="item"
						:class="dynasty.id === item.id ? 'bg-white text-rose-500' : 'text-white'"
						@click="handleChangeDynasty(item)">
						<view class="flex-1">{{ item.dynasty }}</view>
						<view class="text-base opacity-50">
							{{ $tools.erayear(item.startyear) + ' - ' + $tools.erayear(item.endyear) }}
						</view>
					</view>
				</view>
				<view class="grid gap-4 mt-10 text-center">
				</view>
				<view
					class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500"
					@click="handleMatch()">匹配</view>
			</u-modal> -->
		</view>
		<!-- 选择朝代 -->
		<u-modal :show="dynastyPopup" :showConfirmButton="true" :showCancelButton="true" confirmColor="#FE4373"
			@cancel="dynastyPopup=false" @confirm="dynastyConfirm">
			<view>
				<view style="text-align: center;font-size: 32rpx;color: #323232;font-weight: bold;">选择朝代</view>
				<scroll-view scroll-y="true" class="myScroll">
					<view class="dynastyBox">
						<view class="dynastyItem" :class="index==selectIndex?'dynastyItemActive':'dynastyItem'"
							@click="selectDynasty(index,item.id,item.dynasty)" v-for="(item, index) in listRoleDynasty"
							:key="index">
							{{ item.dynasty }}
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
		<!-- 确认角色 -->
		<u-modal :show="showRole" :showConfirmButton="true" :showCancelButton="true" confirmColor="#FE4373"
			confirmText="使用" cancelText="放弃" @cancel="showRole=false" @confirm="roleConfirm">
			<view class="w-full text-center">
				<view style="text-align: center;font-size: 32rpx;color: #323232;font-weight: bold;">获得角色</view>
				<scroll-view scroll-y="true" class="myScroll2"
					style="background: #FFF7F9;border-radius: 20rpx;margin-top: 10rpx;padding: 30rpx;box-sizing: border-box;">
					<view>
						<view style="display: flex;align-items: flex-end;flex-wrap: wrap;">
							<text
								style="font-size: 36rpx;color: #323232;font-weight: bold;">{{role_fei.realname}}</text>
							<text
								style="font-size: 28rpx;color: #808080;margin-left: 20rpx">{{role_fei.birthplace}}</text>
							<text style="font-size: 28rpx;color: #808080;margin: 0 20rpx;">{{role_fei.dynasty}}</text>
							<view style="display: flex;align-items: center;">
								<text style="font-size: 28rpx;color: #808080;">名望：</text>
								<text style="font-size: 28rpx;color: #FE4373;">{{role_fei.role_mw}}</text>
							</view>
						</view>
						<view style="display: flex;align-items: center;margin-top: 20rpx;">
							<view
								style="display: flex;align-items: center;color:#999;font-size: 26rpx;margin-right: 20rpx;"
								v-for="(item,index) in role_fei.achievements">
								<text class="ri-price-tag-3-line lable"
									style="font-size: 35rpx;margin-right: 10rpx;"></text>
								<text>{{item}}</text>
							</view>
						</view>
						<view style="color: #808080;font-size: 28rpx;margin-top: 20rpx;text-align: left;">
							{{role_fei.content}}
						</view>
					</view>
				</scroll-view>
			</view>
		</u-modal>
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
					console.log(res)
					if (res.code === 1) {
						that.showRole = false;
						uni.setStorageSync("noRole", false);
						that.getUserRole()
						that.$forceUpdate()
						that.getMoney()
						// uni.reLaunch({
						// 	url: '/pages/index/mine'
						// });
					}
				})
			},
			//确认朝代
			dynastyConfirm() {
				var that = this;
				that.$api("user.info").then(userData => {
					var gender = userData.data.gender;
					if (that.selectIndex == null) {
						uni.showToast({
							icon: "none",
							title: "请选择朝代"
						})
						return;
					}
					if (gender == 1) {
						if (that.listRoleDynasty[that.selectIndex].role_man_count == 0) {
							uni.showToast({
								icon: "none",
								title: "男性角色不足"
							})
							return;
						}
					} else if (gender == 2) {
						if (that.listRoleDynasty[that.selectIndex].role_woman_count == 0) {
							uni.showToast({
								icon: "none",
								title: "女性角色不足"
							})
							return;
						}
					}
					// uni.showLoading()
					this.dynastyPopup = false;
					uni.showLoading()
					that.$api('role.match', {
						"dynasty": this.selectDynastyName
					}).then(res => {
						console.log(res);
						that.role_fei = res.data;
						uni.hideLoading();
						that.fei_num = that.fei_num - 1;
						that.showRole = true;
					})
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
				let that = this
				that.$api('role_dynasty.lists').then(res => {
					if (res.code === 1) {
						that.listRoleDynasty = res.data
					}
				})
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
		background: red;
		margin-top: 30rpx;
		background: url(/static/embed/s3Bg.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;

		.contentHead {
			text-align: center;
			height: 14%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.name {
				color: #323232;
				font-weight: bold;
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
			height: calc(100% - 14%);
			padding-top: 30rpx;

			.types {
				display: flex;
				align-items: center;
				justify-content: center;

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
				overflow: hidden;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 5;
				overflow: hidden;
				white-space: no-wrap;
				text-overflow: ellipsis;
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

	.myScroll {}

	.dynastyBox {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.u-modal__content {
		padding: 0 !important;
	}

	.dynastyItem {
		margin-top: 20rpx;
		margin-right: 20rpx;
		width: calc(100% / 3 - 20rpx);
		border: 1px solid #CCCCCC;
		border-radius: 30rpx;
		box-sizing: border-box;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		font-size: 28rpx;
		color: #323232;
		white-space: nowrap;
		text-overflow: ellipsis;
		transition: all 0.3s;
	}

	.dynastyItemActive {
		background: #FE4373 !important;
		color: #fff !important;
		border: none !important;
	}

	.myScroll2 {
		max-height: 600rpx;
	}
</style>