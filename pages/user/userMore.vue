<template>
	<view>
		<u-navbar>
			<view slot="left">
				<i class="ri-arrow-left-s-line text-block text-4xl"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view style="height: var(--status-bar-height);"></view>
		<view
			style="margin-top: 180rpx;display: flex;align-items: center;justify-content: center;flex-direction: column;">
			<view style="width: 160rpx;height: 160rpx;overflow: hidden;border-radius: 50%;">
				<image style="width: 100%;height: 100%;" :src="userData.avatar" mode="aspectFill"></image>
			</view>
			<view style="color: #333;font-size:26rpx ;margin-top: 8rpx;">
				{{userData.role_realname}}·{{userData.role_dynasty}}
			</view>
		</view>
		<view style="padding: 65rpx 0rpx 35rpx 0rpx;">
			<view style="display: flex;align-items: center;font-size: 28rpx;color: #666;justify-content: center;">
				<view style="width: 260rpx;margin-right: 50rpx;padding-left: 37rpx;">
					<view style="box-sizing: border-box;margin-bottom: 37rpx;">
						<text>我的性别：</text>
						<text style="color: #333;">{{userData.gender_str}}</text>
					</view>
					<view style="box-sizing: border-box;margin-bottom: 37rpx;">
						<text>我的年龄：</text>
						<text style="color: #333;">{{userData.age_group_str}}</text>
					</view>
				</view>
				<view style="width: 260rpx;padding-left: 20rpx;">
					<view style="box-sizing: border-box;margin-bottom: 37rpx;">
						<text>我的生肖：</text>
						<text style="color: #333;">{{userData.animal_branche_str}}</text>
					</view>

					<view style="box-sizing: border-box;margin-bottom: 37rpx;">
						<text>我的星纪：</text>
						<text style="color: #333;">{{userData.stellar_period_str}}</text>
					</view>
				</view>
			</view>
		</view>
		<view style="display: flex;align-items: center;padding: 0rpx 91rpx;">
			<view class="box" :class="userData.is_set_character==0?'boxTwo':''" style="margin-right: 50rpx;">
				<view class="box-block">
					<view class="boxTitle" :style="{color:userData.is_set_character==0?'#BDE2A5':'#FFBC4B'}">性格
					</view>
					<view :style="{opacity:userData.is_set_character==0?'0':'1'}"
						style="display: flex;align-items: center;margin-top: 20rpx;justify-content: center;">
						<block v-if="userData.character_gift_image!=''">
							<text style="font-size: 20rpx;">解锁</text>
							<image style="width: 36rpx;height: 36rpx;" :src="userData.character_gift_image"
								mode="aspectFill">
							</image>
						</block>
						<block v-else>
							<text style="font-size: 20rpx;">免费</text>
						</block>
					</view>
					<view class="boxText">
						我的性格
					</view>
					<view class="boxBtn"
						:style="{background:userData.is_set_character==0?'#9EFF00':'#FFBC4B',color:userData.is_set_character==0?'#333':'#fff'}"
						@click="probe('性格')">
						查看
					</view>
				</view>
			</view>
			<view class="box" :class="userData.is_set_hobby==0?'boxTwo':''" v-if="userData.length !=0">
				<view class="box-block">
					<view class="boxTitle" :style="{color:userData.is_set_hobby==0?'#BDE2A5':'#FFBC4B'}">爱好
					</view>
					<view :style="{opacity:userData.is_set_hobby==0?'0':'1'}"
						style="display: flex;align-items: center;margin-top: 20rpx;justify-content: center;">
						<block v-if="userData.hobby_gift_image!=''">
							<text style="font-size: 20rpx;">解锁</text>
							<image style="width: 36rpx;height: 36rpx;" :src="userData.hobby_gift_image"
								mode="aspectFill">
							</image>
						</block>
						<block v-else>
							<text style="font-size: 20rpx;">免费</text>
						</block>
					</view>
					<view class="boxText">
						我的爱好
					</view>
					<view class="boxBtn" v-if="userData.length !=0"
						:style="{background:userData.is_set_hobby==0?'#9EFF00':'#FFBC4B',color:userData.is_set_hobby==0?'#333':'#fff'}"
						@click="probe('爱好')">
						查看
					</view>
				</view>
			</view>
		</view>
		<u-popup :show="showMore" @close="showMore = false" mode="center" :round="20">
			<view class="popupContainer">
				<view style="display: flex;align-items: center;justify-content: center;">
					<view class="title">
						<text style="position: relative;z-index: 5;">{{sendGift.title}}</text>
						<view class="line"></view>
					</view>
				</view>
				<view class="prop">
					<view style="text-align: center;margin-top: 20rpx;">
						<image style="width:200rpx ;height: 200rpx;" :src="sendGift.image" mode=""></image>
					</view>
					<view style="color:#333 ;font-size: 26rpx;padding: 0rpx 15rpx;margin-top: 50rpx;">
						对方设置了需要送其{{sendGift.giftName}}×{{sendGift.giftNum}}才可查看，需花费 铜钱×{{sendGift.money}}，要赠送并查看吗？
					</view>
					<view
						style="display: flex;align-items: center;justify-content: space-between;padding: 0rpx 110rpx;box-sizing: border-box;">
						<view @click="showMore = false;" class="hitBtn"
							style="background: #FFDDA4;color: #FFA000;margin-right: 25rpx;">取消
						</view>
						<view class="hitBtn" @click="sendGiftClick"
							style="background: #FFA000;color: #fff;margin-right: 25rpx;">使用
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<recharge ref="recharge"></recharge>
		<feiqslsHit></feiqslsHit>
	</view>
</template>

<script>
	import recharge from "@/components/fei-recharge/fei-recharge.vue"
	export default {
		components: {
			recharge
		},
		data() {
			return {
				showMore: false,
				userData: [],
				sendGift: {
					title: '',
					giftName: "",
					giftNum: 1,
					money: "",
					image: "",
					giftId: ""
				}
			}
		},
		onLoad(e) {
			this.setFontFamily()
			this.getDate()
		},
		methods: {
			getDate() {
				this.$api("user.moreInfo", {
					user_id: this.$Route.query.user_id
				}).then(res => {
					if (res.code == 1) {
						this.userData = res.data;
					}
				})
			},
			sendGiftClick() {
				this.$api("gift.giveGift", {
					"receiver_user_id": this.$Route.query.user_id,
					"nums": 1,
					"gift_id": this.sendGift.giftId,
					"channel": this.sendGift.title == '我的性格' ? 6 : 7
				}).then(res => {
					if (res.code == 1) {
						if (this.sendGift.title == '我的性格') {
							this.$u.route('/pages/user/setInformation', {
								type: 'character',
								set: 2,
								user_id: this.$Route.query.user_id
							})
						} else {
							this.$u.route('/pages/user/setInformation', {
								type: 'hobby',
								set: 2,
								user_id: this.$Route.query.user_id
							})
						}
						this.getDate()
						this.showMore = false;
					} else if (res.code == 3001) {
						this.showMore = false;
						this.$refs.recharge.show()
					}
				})
			},
			probe(type) {
				switch (type) {
					case '爱好':
						if (this.userData.is_set_hobby == 1) {
							if (this.userData.hobby_condition.length != 0) {
								if (this.userData.is_pay_hobby == 1) {
									this.$u.route('/pages/user/setInformation', {
										type: 'hobby',
										set: 2,
										user_id: this.$Route.query.user_id
									})
								} else {
									this.sendGift = {
										title: '我的爱好',
										giftName: this.userData.hobby_condition[0].title,
										giftNum: this.userData.hobby_condition[0].num,
										money: this.userData.hobby_condition[0].price,
										image: this.userData.hobby_condition[0].image,
										giftId: this.userData.hobby_condition[0].gift_id
									}
									this.showMore = true;
								}
								this.getDate()
							} else {
								this.$u.route('/pages/user/setInformation', {
									type: 'hobby',
									set: 2,
									user_id: this.$Route.query.user_id
								})
								this.getDate()
							}
						} else {
							uni.showToast({
								icon: "none",
								title: "未设置"
							})
						}
						break;
					case "性格":
						if (this.userData.is_set_character == 1) {
							if (this.userData.is_set_character.length != 0) {
								if (this.userData.is_pay_character == 1) {
									this.$u.route('/pages/user/setInformation', {
										type: 'character',
										set: 2,
										user_id: this.$Route.query.user_id
									})
								} else {
									this.sendGift = {
										title: '我的性格',
										giftName: this.userData.character_condition[0].title,
										giftNum: this.userData.character_condition[0].num,
										money: this.userData.character_condition[0].price,
										image: this.userData.character_condition[0].image,
										giftId: this.userData.character_condition[0].gift_id
									}
									this.showMore = true;
								}
							} else {
								this.$u.route('/pages/user/setInformation', {
									type: 'character',
									set: 2,
									user_id: this.$Route.query.user_id
								})
								this.getDate()
							}
						} else {
							uni.showToast({
								icon: "none",
								title: "未设置"
							})
						}
						break;
				}
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
	.box {
		width: 260rpx;
		height: 340rpx;
		box-sizing: border-box;
		overflow: hidden;
		background-image: url(@/static/iconImage/111.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;

		// &:nth-child(2) {
		// 	background-image: url(@/static/iconImage/222.png);
		// 	background-position: 100% 100%;
		// 	background-size: 100% 100%;
		// 	background-repeat: no-repeat;
		// }

		.box-block {
			padding: 30rpx 26rpx;
		}


		.boxTitle {
			text-align: right;
			font-size: 28rpx;
			font-family: font-test !important;
		}

		.boxText {
			font-size: 32rpx;
			margin-top: 30rpx;
			margin-bottom: 50rpx;
			text-align: center;
			font-family: font-test !important;
		}

		.boxBtn {
			border: 15rpx;
			width: 123rpx;
			height: 55rpx;
			text-align: center;
			line-height: 55rpx;
			font-size: 26rpx;
			border-radius: 15rpx;
			margin: 0 auto;
		}
	}

	.popupContainer {
		width: 655rpx;
		height: 828rpx;
		background-image: url(@/static/iconImage/bg.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;

		.title {
			position: relative;
			text-align: center;
			font-size: 32rpx;
			color: #333333;
			font-family: font-test !important;
			display: inline;
			margin-top: 50rpx;

			.line {
				width: 100%;
				height: 16rpx;
				background: #FFA000;
				position: absolute;
				left: 0;
				bottom: 0;
			}
		}

		.prop {
			height: 665rpx;
			padding: 105rpx 30rpx 89rpx 30rpx;
			box-sizing: border-box;

			.hitBtn {
				width: 190rpx;
				height: 85rpx;
				border: 1px solid #FFA000;
				text-align: center;
				line-height: 85rpx;
				border-radius: 50rpx;
				font-size: 36rpx;
				margin-top: 89rpx;
			}
		}
	}

	.boxTwo {
		background-image: url(@/static/iconImage/222.png) !important;
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.boxTwo {
		background-image: url(@/static/iconImage/222.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
</style>