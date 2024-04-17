<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="px-4">
		<image src='@/static/embed/sexBg.png'
			style="position: fixed; width: 100%; height: 100%; top: 0; left: 0; z-index: -1"></image>
		<u-navbar bgColor="transparent">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-4xl text-black"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
			<!--  <view slot="right">
                <text class="text-white opacity-50" @click="skip()">跳过</text>
            </view> -->
		</u-navbar>

		<view style="padding: 200rpx 30rpx 20rpx 30rpx;" v-show="noRole_Count">
			<view class="flex text-left text-2xl" style="align-items: center;justify-content: space-between;">
				<text style="color: #323232;font-size: 36rpx;font-weight: bold;">选择朝代：</text>
				<!-- <text @click="skip()" style="color: #CCCCCC;font-size: 24rpx;">跳过</text> -->
			</view>
			<view class="flex text-left mt-4">
				<text style="color: #808080;font-size: 28rpx;">选择要穿越到的朝代，以便生成角色</text>
			</view>
			<image class="pic" src="../../static/gift/queshengye.png" mode=""></image>
			<view class=""
				style="margin-top: -40rpx;margin-left: 200rpx; font-size: 28rpx;color: #999;line-height: 40px;">暂无角色可用
			</view>
			<view class="font1">非常抱歉！角色库中所有角色都被占用，我们正在加紧补充角色。您可以先以无名氏身份进入，稍后在个人中心获取角色。</view>
			<view style="position: absolute;bottom: 30rpx;left: 30rpx;right:30rpx;">
				<!--  <view class="rounded-full p-6 text-base leading-none bg-gray-100" @click="showRead = false" v-if="isCancle">取消
                </view> -->
				<view
					class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500"
					style="text-align: center;" @click="">进入首页</view>
			</view>
		</view>


		<view
			style="padding: 200rpx 00rpx 20rpx 0rpx;display: flex;flex-direction: column;box-sizing: border-box;height: 100vh;"
			v-show="isRole_Count">
			<view>
				<view class="flex text-left text-2xl" style="align-items: center;justify-content: space-between;">
					<text style="color: #323232;font-size: 36rpx;font-weight: bold;">选择朝代：</text>
					<!-- <text @click="skip()" style="color: #CCCCCC;font-size: 24rpx;">跳过</text> -->
				</view>
				<view class="flex text-left mt-4" style="margin-bottom: 30rpx;">
					<text style="color: #808080;font-size: 28rpx;">选择要穿越到的朝代，以便生成角色</text>
				</view>
			</view>


			<scroll-view scroll-y="true" style="height: 0;flex: 1;" :show-scrollbar="false">
				<radio-group>
					<label class="dynastyItem" v-for="(item,index) in listRoleDynasty" :key="index"
						@click="handleChangeDynasty(item)">
						<view style="display: flex;align-items: center;">
							<image src="/static/logo-108.png" v-if="item.image == null" mode=""
								style="width:92rpx;height: 92rpx;border-radius: 50%;margin-right: 20rpx;"></image>
							<image :src="item.image" v-else mode=""
								style="width:92rpx;height: 92rpx;border-radius: 50%;margin-right: 20rpx;"></image>
							<view class="dynastyContent">
								<view style="color: #323232;font-size: 33rpx;font-weight: bold;">{{ item.dynasty }}
								</view>
								<view style="color: #999999;font-size: 26rpx;">
									{{$tools.erayear(item.startyear)}}-{{$tools.erayear(item.endyear)}}
								</view>
							</view>
						</view>
						<radio :value="item.dynasty" color="#ff6897" />
						<!-- <u-radio  size="45" shape="circle" inactiveColor="#CCCCCC"
							activeColor="#ff6897"></u-radio> -->
					</label>
				</radio-group>
			</scroll-view>

			<!-- <view class="flex flex-col mt-4" style="height: 600rpx; overflow-y: scroll;"> -->
			<!-- <view class="flex items-center p-2 rounded-lg mt-4" v-for="(item, index) in listRoleDynasty" :key="index" :item="item" :class="dynasty.id === item.id ? 'bg-white text-rose-500' : 'text-white'" @click="handleChangeDynasty(item)">	
					<view class="flex-1">{{ item.dynasty }}</view>
                    <view class="text-base opacity-50">{{ $tools.erayear(item.startyear) + ' - ' + $tools.erayear(item.endyear) }}</view>
                </view> -->
			<!-- <view class="flex items-center p-2 rounded-lg mt-4" v-for="(item, index) in listRoleDynasty"
					:key="index" :item="item" :class="dynasty.id === item.id ? 'bg-white text-rose-500' : 'text-white'"
					@click="handleChangeDynasty(item)">
					<view v-show="isWomen==2" class="" style="width: 1000rpx ;"
						:class="[item.role_woman_count==0?'activedis':'']">
						<text class="flex-1">{{ item.dynasty }}</text>
						<text class="text-base opacity-50"
							style="float: right;">{{ $tools.erayear(item.startyear) + ' - ' + $tools.erayear(item.endyear) }}</text>
					</view>
					<view v-show="isMan==1" class="" style="width: 1000rpx ;"
						:class="[item.role_man_count==0?'activedis':'']">
						<text class="flex-1">{{ item.dynasty }}</text>
						<text class="text-base opacity-50"
							style="float: right;">{{ $tools.erayear(item.startyear) + ' - ' + $tools.erayear(item.endyear) }}</text>
					</view>
				</view> -->
			<!-- </view> -->
			<view class="grid gap-4  text-center" style="margin-top: 30rpx;">
				<!--  <view class="rounded-full p-6 text-base leading-none bg-gray-100" @click="showRead = false" v-if="isCancle">取消
                </view> -->
				<view
					class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500"
					@click="handleMatch()" v-if='isBtnStart'>确定</view>
			</view>
		</view>

		<u-modal :show="showRole" :showConfirmButton="false" :showCancelButton="false">
			<view class="w-full text-center">
				<view class="text-4xl font-bold mt-4">获得角色</view>
				<view class="text-left text-gray-500 mt-4">恭喜，你穿越成为了：</view>
				<view class="p-4 text-left bg-gray-200 mt-4 rounded" style="height: 400rpx; overflow-y: scroll;">
					<view class="flex flex-direction-row flex-col-bottom">
						<view class="flex-1"><text class="text-xl mr-4">{{ role.realname }}</text> {{
                            role.dynasty
                        }}</view>
						<view class="text-gray-500 ml-4">名望：{{role.role_mw}}</view>
					</view>
					<view class="mt-4">
						<block v-for="(title, index) in role.titles" :key="index" :item="title">
							<text class="border p-2 rounded-full text-gray-500 mr-2">{{ title }}</text>
						</block>
						<block v-for="(achievement, index) in role.achievements" :key="index" :item="achievement">
							<text class="border p-2 rounded-full text-gray-500 mr-2">{{ achievement }}</text>
						</block>
					</view>
					<view class="mt-4">
						<view class="">{{ role.content || '暂无介绍' }}</view>
					</view>
				</view>
				<view class="text-left text-gray-500 mt-4">你有一个古代身份了，快去交朋友吧。</view>
				<view class="grid grid-cols-2 gap-4 mt-10 text-center">
					<!-- rounded-full p-4 text-base leading-none bg-gray-100" style="width: 490rpx;margin-top: -45rpx; -->
					<view
						class="rounded-full p-4 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500"
						style="background-color: #999; width: 490rpx;margin-top: -45rpx;" :disabled="!times"
						@click="handleSubmit()">开始体验</view>
					<!-- rounded-full p-4 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500 -->
					<!-- <view class="rounded-full p-4 text-base leading-none bg-gray-100" style="width: 490rpx;margin-left: -285rpx;margin-top: 60rpx;" @click="handleRematch()">重新匹配(免费{{ times }}次)</view> -->

				</view>
				<view :class="[times==0?'active':'']">
					<view v-show="isNo" class="rounded-full p-4 text-base leading-none bg-gray-100"
						style="width: 490rpx;margin-left: 0rpx;margin-top: 10rpx;" @click="handleRematch()">
						重新匹配(免费{{ times }}次)</view>
				</view>
			</view>
		</u-modal>
	</view>
	</view>
</template>
<script>
	export default {
		name: 's2',
		data() {
			return {
				form: {
					role_id: 0,
				},
				role: {},
				dynasty: {},
				times: 4,
				listRoleDynasty: [],
				showRole: false,
				isNo: true, //重新匹配
				isBtnStart: true,
				isCancle: true,
				formGender: '',
				gender: '',
				time: null,
				isRole_Count: false,
				noRole_Count: true,
				isRole: null,
				isMan: null,
				isWomen: null
			}
		},
		onLoad(option) {
			let that = this
			that.getRoleDynasty()
			console.log("fei")
		},
		created() {
			let that = this

		},
		computed: {},
		mounted() {
			let that = this
			that.gender = uni.getStorageSync('gender')
			// 如果选的男就让男判断
			if (that.gender == 1) {
				that.isMan = 1
			}
			// 如果选的女就让女判断
			if (that.gender == 2) {
				that.isWomen = 2
			}
			// 如果选者的是女性
			if (that.gender == 2) {
				that.$api('role_dynasty.lists').then(res => {
					console.log(res)
					if (res.code === 1) {
						let roleList = res.data
						for (let i = 0; i < roleList.length; i++) {
							//如果每一个朝代的角色都使用完了
							if (roleList[i].role_woman_count == 0) {
								// that.isRole=roleList[i].role_woman_count
								// console.log('that.isRole',that.isRole);

							} else {
								//否则显示朝代例表
								that.isRole_Count = true
								that.noRole_Count = false
							}
						}
					} else {
						that.$u.toast(res.msg)
					}
				})
			}

			// 如果选者的是男性
			if (that.gender == 1) {
				that.$api('role_dynasty.lists').then(res => {
					if (res.code === 1) {
						let roleList = res.data
						for (let i = 0; i < roleList.length; i++) {
							//如果每一个朝代的角色都使用完了
							if (roleList[i].role_man_count == 0) {
								// that.isRole=roleList[i].role_woman_count
								console.log('that.isRole', that.isRole);
							} else {
								//否则显示朝代例表
								that.isRole_Count = true
								that.noRole_Count = false
							}
						}
					} else {
						that.$u.toast(res.msg)
					}
				})
			}



			// // 判断是否全部朝代的角色已经使用完
			// that.$api('role_dynasty.lists').then(res => {
			//     if (res.code === 1) {
			//        let roleList = res.data
			// 		console.log('role,match',res.data);
			//       for (let i = 0; i < roleList.length; i++) {
			// 		  //如果每一个朝代的角色都使用完了
			//       	if(roleList[i].role_count==0){
			// 			//让朝代列表不显示
			// 		that.isRole_Count=false
			// 		//让朝代列表不显示
			// 		that.noRole_Count=true		
			// 		// 如果哪个角色为0 就输出哪个
			// 		if(roleList[i].role_count==0){
			// 			that.isRole==roleList[i].role_count
			// 		}
			//       	}else{
			// 			//否则显示朝代例表
			// 			that.isRole_Count=true
			// 			that.noRole_Count=false
			// 		}
			//       }
			//     } else {
			//         that.$u.toast(res.msg)
			//     }
			// })
		},
		methods: {
			async getRoleDynasty() {
				let that = this
				that.$api('role_dynasty.lists').then(res => {
					if (res.code === 1) {
						that.listRoleDynasty = res.data
					}
				})
			},
			handleChangeDynasty(obj) {
				let that = this
				that.gender = uni.getStorageSync('gender')
				// 如果选的男就让男判断
				if (that.gender == 1) {
					if (obj.role_man_count == 0) {
						that.$u.toast('该朝代暂无角色可用')
						that.dynasty = obj
						return false
					} else {
						that.dynasty = obj
					}
				}
				// 如果选的女就让女判断
				if (that.gender == 2) {
					if (obj.role_woman_count == 0) {
						that.$u.toast('该朝代暂无角色可用')
						that.dynasty = obj;
						return false
					} else {
						that.dynasty = obj;
					}
				}

			},
			handleMatch() {
				let that = this;
				if (that.dynasty.id == undefined) {
					that.$u.toast('请选择朝代')
					return false
				}

				let gender = uni.getStorageSync('gender')
				that.formGender = gender
				let data = {
					dynasty: that.dynasty.dynasty,
					gender: that.formGender
				}
				if (data.gender == 1) {
					if (that.dynasty.role_man_count == 0) {
						that.$u.toast('男性角色不足');
						that.skip();
						return;
					}
				} else {
					if (that.dynasty.role_woman_count == 0) {
						that.$u.toast('女性角色不足');
						that.skip();
						return;
					}
				}
				uni.showLoading({
					title: '读取中'
				})
				that.$api('role.match', data).then(res => {
					if (res.code === 1) {
						that.role = res.data
						that.times -= 1;
						uni.reLaunch({
							url: '/pages/auth/s3?role=' + JSON.stringify(res.data) + '&data=' + JSON
								.stringify(data)
						})
						// that.showRole = true
						uni.hideLoading()
					} else if (res.code == 2) {
						that.role = res.data;
						uni.reLaunch({
							url: '/pages/auth/s3?role=' + JSON.stringify(res.data) + '&data=' + JSON
								.stringify(data)
						})
						uni.hideLoading()
					} else {
						uni.hideLoading()
						uni.showModal({
							title: '提示',
							content: '免费获取角色次数不足，将以【无名氏】身份进入。',
							confirmText: "确定", //这块是确定按钮的文字
							cancelText: "取消", //这块是取消的文字
							confirmColor: "#FFA000",
							success: function(res) {
								if (res.confirm) {
									console.log(that.formGender)
									that.$api('user.only_choose_gender', {
										gender: that.formGender
									}).then(res => {
										if (res.code === 1) {
											var userInfo = uni.getStorageSync("userInfo");
											uni.setStorageSync("skip", userInfo.id)
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
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				})
				if (that.times == 0) {
					that.isBtnStart = false //匹配按钮
					that.isCancle = false //取消按钮
				}
			},
			// 重新匹配
			handleRematch() {
				let that = this
				that.showRole = false
				console.log('pipei', that.times);
				if (that.times < 0) {
					that.showRole = false
				}
				// that.match()
				// that.handleMatch()
			},
			// 开始体验
			handleSubmit() {
				let that = this
				if (!that.role) {
					that.$u.toast('角色必须选择')
					return false
				}

				uni.setStorageSync('times', that.times)
				let gender = uni.getStorageSync('gender')
				that.formGender = gender

				let data = {
					role_id: that.role.id,
					dynasty: that.dynasty.dynasty,
					gender: that.formGender
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

			},
			skip() {
				let that = this
				let gender = uni.getStorageSync('gender');
				var userInfo = uni.getStorageSync("userInfo");
				that.formGender = gender
				//记得清除
				let data = {
					gender: that.formGender
				}
				uni.showModal({
					title: '提示',
					content: '您所选朝代没有可用角色。若继续，将以【无名氏】身份进入。建议您选择别的朝代进入。仍然要继续吗？',
					confirmText: "确定", //这块是确定按钮的文字
					cancelText: "取消", //这块是取消的文字
					confirmColor: "#FFA000",
					success: function(res) {
						if (res.confirm) {
							that.$api('user.only_choose_gender', data).then(res => {
								if (res.code === 1) {
									uni.setStorageSync("skip", userInfo.id)
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
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
	.dynastyItem {
		padding: 20rpx;
		border: 1px solid #CCCCCC;
		border-radius: 10rpx;
		margin-bottom: 16rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		box-sizing: border-box;

		.dynastyContent {
			height: 92rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

		}

		&:last-child {
			margin-bottom: 0rpx;
		}
	}


	// --------------------
	.active {
		display: none;
	}

	.activedis {
		color: rgba(0, 0, 0, 0.5);
		cursor: not-allowed;
		// display: none;
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

	.pic {
		width: 420rpx;
		height: 420rpx;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
		top: 20rpx;
	}

	.font1 {
		width: 610rpx;
		height: 175rpx;
		font-size: 26rpx;
		color: #999;
		line-height: 40rpx;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
	}
</style>