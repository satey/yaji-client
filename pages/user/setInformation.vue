<template>
	<view class="setInformation">
		<u-navbar :title="title" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;" @click="back"></i>
			</view>
			<!-- 	<view slot="right" v-if="isSet">
				<view @click="set" class="text-right" style="color: #666;font-size: 23rpx;">重置
				</view>
			</view> -->
		</u-navbar>
		<view v-if="isSet==1"
			style="display: flex;align-items: center;justify-content: center;font-size: 23rpx;color: #333;background: #F5F5F5;padding: 35rpx 0rpx;box-sizing: border-box;">
			<text>设置其他人查阅条件：</text>
			<block v-if="title =='我的性格'">
				<block v-if="userData.is_set_character !=0">
					<block v-if="userData.character_gift_image !=''">
						<text>送我</text>
						<image style='width: 50rpx;height: 50rpx;' :src="userData.character_gift_image"
							mode="aspectFill">
						</image>
					</block>
					<block v-else>
						<text style="margin-right: 10rpx;">免费</text>
					</block>
				</block>
				<text style="color: #FFA000;" @click="showCondition=true">
					{{userData.is_set_character==0?'去设置':'修改'}}
				</text>
			</block>
			<block v-if="title =='我的爱好'">
				<block v-if="userData.is_set_hobby !=0">
					<block v-if="userData.hobby_gift_image !=''">
						<text>送我</text>
						<image style='width: 50rpx;height: 50rpx;' :src="userData.hobby_gift_image" mode="aspectFill">
						</image>
					</block>
					<block v-else>
						<text style="margin-right: 10rpx;">免费</text>
					</block>
				</block>
				<text style="color: #FFA000;" @click="showCondition=true">
					{{userData.is_set_hobby==0?'去设置':'修改'}}
				</text>
			</block>
		</view>
		<view v-else style="height: 107rpx;background: #F5F5F5;">

		</view>

		<view class="box">
			<view style="text-align: center;">
				<image style="width: 158rpx;height: 90rpx;margin-top:-30rpx" src="@/static/iconImage/qian.png" mode="">
				</image>
			</view>
			<block v-if="title =='我的性格'">
				<view class="boxContent">
					<block v-if="userData.length !=0">
						<view style="display: flex;height: 400rpx;" v-for="(item,index) in userData.character_content"
							:key="index">
							<view style="height:100%;display: flex;flex-direction: column;align-items: center;">
								<view style="position: relative;">
									<image src="../../static/iconImage/shanzi.png" style="width: 70rpx;height: 50rpx;"
										mode="widthFix">
									</image>
									<view
										style="position: absolute;top: 0;left: 0;width: 70rpx;height: 50rpx;z-index:1 ;text-align: center;color: #fff;font-size: 30rpx;">
										{{index+1}}
									</view>
								</view>
								<view style="height: 100%;width: 1rpx;border-left: 1px dashed #FFDDA4;height: 100%;">
								</view>
							</view>
							<view class="content">
								<view class="contentTitle">
									{{item.title}}
								</view>
								<textarea style="width: 100%;margin-top: 20rpx;color: #FFA000;font-size: 30rpx;flex: 1;"
									placeholder="请输入..." v-model="item.answer" placeholder-style="color:#999999" name=""
									id="" cols="30" rows="10"></textarea>
							</view>
						</view>
					</block>
					<view class="btns" v-if="isSet==1">
						<view class="btn" @click="showa=true"
							style="background: #FFDDA4;color: #FFA000;margin-right: 40rpx;">取消
						</view>
						<view class="btn" style="background: #FFA000;color: #fff;" @click="charactersubmit">确定</view>
					</view>
				</view>
			</block>
			<block v-if="title =='我的爱好'">
				<view class="boxContent">
					<block v-if="userData.length !=0">
						<view style="display: flex;height: 400rpx;" v-for="(item,index) in userData.hobby_content"
							:key="index">
							<view style="height:100%;display: flex;flex-direction: column;align-items: center;">
								<view style="position: relative;">
									<image src="../../static/iconImage/shanzi.png" style="width: 70rpx;height: 50rpx;"
										mode="widthFix">
									</image>
									<view
										style="position: absolute;top: 0;left: 0;width: 70rpx;height: 50rpx;z-index:1 ;text-align: center;color: #fff;font-size: 30rpx;">
										{{index+1}}
									</view>
								</view>
								<view style="height: 100%;width: 1rpx;border-left: 1px dashed #FFDDA4;height: 100%;">
								</view>
							</view>
							<view class="content">
								<view class="contentTitle">
									{{item.title}}
								</view>
								<textarea style="width: 100%;margin-top: 20rpx;color: #FFA000;font-size: 30rpx;flex: 1;"
									placeholder="请输入..." v-model="item.answer" placeholder-style="color:#999999" name=""
									id="" cols="30" rows="10"></textarea>
							</view>
						</view>
					</block>
					<view class="btns" v-if="isSet==1">
						<view class="btn" @click="showa=true"
							style="background: #FFDDA4;color: #FFA000;margin-right: 40rpx;">取消
						</view>
						<view class="btn" style="background: #FFA000;color: #fff;" @click="hobbysubmit">确定</view>
					</view>
				</view>
			</block>
		</view>
		<u-popup :show="showa" @close="showa = false" mode="center" :closeable="false" :round="20">
			<view class="log">
				<view style="text-align: center;font-size: 30rpx;color: #333;">取消设置</view>
				<view style="font-size: 28rpx;color: #333;margin-top: 89rpx;">确定要取消填写吗？当前已填写的内容将 不会保存。</view>
				<view style="display: flex;align-items: center;justify-content: center;margin-top: 137rpx;">
					<view @click="$u.route({ type: 'navigateBack', delta: 1 })"
						style="margin-right: 21rpx;width: 210rpx;height: 68rpx;background: #FFDDA4;border-radius: 8rpx;text-align: center;line-height: 68rpx;color: #FFA000;font-size: 30rpx;">
						确定</view>
					<view @click="showa = false"
						style="margin-left: 21rpx;width: 210rpx;height: 68rpx;background: #FFA000;border-radius: 8rpx;text-align: center;line-height: 68rpx;color: #fff;font-size: 30rpx;">
						取消</view>
				</view>
			</view>
		</u-popup>
		<u-popup :show="showCondition" @close="showCondition = false" mode="bottom" :closeable="false" :round="20">
			<view class="conditionPopup">
				<view style="margin: 0 auto;width: 100%;display: flex;align-items: center;justify-content: center;">
					<view style="position: relative;text-align: center;margin: 0 auto;">
						<text
							style="color: #333;font-size:32rpx ;position: relative;z-index: 1;font-family: font-test !important;">查阅条件</text>
						<text
							style="width: 100%;height: 13rpx;background: #FFA000;position: absolute;left: 0;bottom: 0;"></text>
					</view>
				</view>
				<scroll-view scroll-y="true" class="giftBox" style="padding-top: 50rpx;">
					<view>
						<view
							style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 18rpx;">
							<view style="width: 150rpx;color:#333 ;font-size: 32rpx;">免费查看</view>
							<image v-if="selectIndex==0" @click="selectIndex=0;giftCurrentIndex = -1;"
								style="width: 35rpx;height: 35rpx;" src="../../static/iconImage/radio.png" mode="">
							</image>
							<view v-else @click="selectIndex=0;giftCurrentIndex = -1;"
								style="width: 30rpx;height: 30rpx;border-radius: 50%;border: 1px solid #666666;">
							</view>
						</view>
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<view style="width: 150rpx;color:#333 ;font-size: 32rpx;">送我礼物</view>
							<image v-if="selectIndex==1" @click="selectIndex=1" style="width: 35rpx;height: 35rpx;"
								src="../../static/iconImage/radio.png" mode="">
							</image>
							<view v-else @click="selectIndex=1"
								style="width: 30rpx;height: 30rpx;border-radius: 50%;border: 1px solid #666666;">
							</view>
						</view>
						<view class="giftList">
							<block v-for="(item,index) in giftList" :key="index">
								<view class="giftItem" v-if="item.status=='normal'" @click="selectGift(index)"
									:class="giftCurrentIndex == index?'giftItemActive':''">
									<view>
										<image :src="item.image" style="width: 140rpx;height: 140rpx;"
											mode="aspectFill">
										</image>
									</view>
									<view style="color:#323232;font-size: 23rpx;">{{item.title}}</view>
									<view>
										<image src="../../static/qian.png" style="width:20rpx ;height: 20rpx;" mode="">
										</image>
										<text
											style="color:#808080;font-size: 20rpx;margin-left: 5rpx;">{{item.price}}</text>
									</view>
								</view>
							</block>
						</view>
					</view>
				</scroll-view>
				<view class="btnBox">
					<view class="btn" @click="setGift">确定</view>
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
				showa: false,
				showCondition: false,
				userData: [],
				title: "",
				isSet: 1,
				selectIndex: 0,
				giftList: [],
				giftCurrentIndex: -1,
				content: [],
				selectGiftId: [],
				selectGiftImg: ''
			}
		},
		onLoad(e) {
			console.log(this.$Route.query.user_id)
			this.setFontFamily()
			this.isSet = e.set;
			switch (e.type) {
				case 'character':
					this.title = '我的性格'
					break;
				case 'hobby':
					this.title = '我的爱好'
					break;
			}
			this.getInfo()
			this.getGiftList()
		},
		onBeforeBack(args) {
			if (this.isSet == 1) {
				this.showa = true;
			} else {
				this.$u.route({
					type: 'navigateBack',
					delta: 1
				})
			}
			return this.isSet == 1 ? true : false //阻止页面关闭
		},
		methods: {
			back() {
				if (this.isSet == 1) {
					this.showa = true;
				} else {
					this.$u.route({
						type: 'navigateBack',
						delta: 1
					})
				}
			},
			//性格提交
			charactersubmit() {
				var giftParment = []
				if (this.giftCurrentIndex != -1) {
					giftParment = [{
						gift_id: this.giftList[this
							.giftCurrentIndex].id,
						num: 1
					}]
				}
				var arr = this.userData.character_content.filter((item, index) => {
					return item.answer == ''
				})
				if (arr.length >= 1) {
					uni.showToast({
						icon: "none",
						title: "内容未完整填写"
					})
					return;
				}
				this.userData.character_content.forEach((item, index) => {
					delete item.title
					delete item.type_str
				})
				this.infoSave({
					character: {
						condition: giftParment,
						content: this.userData.character_content
					}
				})
			},
			//爱好提交
			hobbysubmit() {
				var giftParment = []
				if (this.giftCurrentIndex != -1) {
					giftParment = [{
						gift_id: this.giftList[this
							.giftCurrentIndex].id,
						num: 1
					}]
				}
				var arr = this.userData.hobby_content.filter((item, index) => {
					return item.answer == ''
				})
				if (arr.length >= 1) {
					uni.showToast({
						icon: "none",
						title: "内容未完整填写"
					})
					return;
				}
				this.userData.hobby_content.forEach((item, index) => {
					delete item.title
					delete item.type_str
				})
				this.infoSave({
					hobby: {
						condition: giftParment,
						content: this.userData.hobby_content
					}
				})
			},
			//选择礼物
			selectGift(index) {
				this.giftCurrentIndex = index;
				this.selectIndex = 1;
				// if (this.selectIndex == 1) {

				// } else {
				// 	uni.showToast({
				// 		icon: "none",
				// 		title: "请勾选送我礼物"
				// 	})
				// }
			},
			setGift() {
				if (this.selectIndex == 0) {
					this.showCondition = false;
					this.selectIndex = -1
					this.giftCurrentIndex = -1;
					this.selectGiftId = ''
					this.selectGiftImg = ''
					this.userData.character_gift_image = ''
					this.userData.hobby_gift_image = ''
					this.userData.is_set_character = 1
					this.userData.is_set_hobby = 1
				} else if (this.selectIndex == 1) {
					if (this.giftCurrentIndex == -1) {
						uni.showToast({
							title: "请选择礼物",
							icon: "none"
						})
					} else {
						this.showCondition = false;
						this.selectGiftId = this.giftList[this.giftCurrentIndex].id;
						this.selectGiftImg = this.giftList[this.giftCurrentIndex].image
						switch (this.title) {
							case '我的性格':
								this.userData.character_gift_image = this.selectGiftImg
								this.userData.is_set_character = 1
								break;
							case '我的爱好':
								this.userData.hobby_gift_image = this.selectGiftImg
								this.userData.is_set_hobby = 1
								break;
						}
					}
				} else {
					this.showCondition = false;
					this.selectIndex = -1
					this.giftCurrentIndex = -1
				}
			},
			//
			infoSave(pament) {
				console.log(pament)
				this.$api("user.infoSave", pament).then(res => {
					if (res.code == 1) {
						uni.showToast({
							icon: "success",
							title: res.msg
						})
						let tiem = setTimeout(() => {
							this.$u.route({
								type: 'navigateBack',
								delta: 1
							})
							clearTimeout(tiem)
						}, 800)
					} else {
						this.showCondition = false;
						this.getInfo()
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				})
			},
			//获取礼物列表
			getGiftList() {
				var that = this;
				that.$api('gift.lists').then(res => {
					if (res.code === 1) {
						that.giftList = res.data;
					}
				})
			},
			getInfo() {
				if (this.$Route.query.user_id != undefined) {
					this.$api("user.moreInfo", {
						user_id: this.$Route.query.user_id
					}).then(res => {
						if (res.code == 1) {
							switch (this.title) {
								case '我的性格':
									this.selectIndex = res.data.character_gift_image == '' ? 0 : 1;
									break;
								case '我的爱好':
									this.selectIndex = res.data.hobby_gift_image == '' ? 0 : 1;
									break;
							}
							this.userData = res.data;
						}
					})
				} else {
					this.$api("user.myInfo").then(res => {
						console.log(res)
						if (res.code == 1) {
							switch (this.title) {
								case '我的性格':
									this.selectIndex = res.data.character_gift_image == '' ? 0 : 1;
									break;
								case '我的爱好':
									this.selectIndex = res.data.hobby_gift_image == '' ? 0 : 1;
									break;
							}
							this.userData = res.data;
						}
					})
				}

			},
			//重置
			set() {
				this.userData.character_content.forEach((item, index) => {
					item.answer = ''
				})
				this.userData.hobby_content.forEach((item, index) => {
					item.answer = ''
				})
			},
			//
			submit() {

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
		background: #fff;
	}

	.log {
		width: 578rpx;
		height: 525rpx;
		border-radius: 16rpx;
		padding: 50rpx 27rpx 62rpx 37rpx;
		background: #fff;
		box-sizing: border-box;
	}

	.boxContent {
		padding: 0rpx 32rpx;
		box-sizing: border-box;
		margin-top: 50rpx;
	}

	.content {
		background-image: url(@/static/iconImage/blockBg.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		height: 366rpx;
		flex: 1;
		margin-left: 20rpx;
		padding: 50rpx 50rpx 0rpx 50rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		padding-bottom: 20rpx;
		box-sizing: border-box;
	}

	.contentTitle {
		color: #FFA000;
		font-size: 30rpx;
		font-family: font-test !important;
	}

	.btns {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		width: 100%;
		left: 0;
		height: 139rpx;
		background: #fff;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		bottom: 0rpx;
		z-index: 5;

		.btn {
			width: 211rpx;
			height: 68rpx;
			text-align: center;
			line-height: 68rpx;
			border-radius: 8rpx;
		}
	}

	.conditionPopup {
		width: 100vw;
		height: 739rpx;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		background: linear-gradient(#FFE6BD, #FFF3E0, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF);
		padding: 50rpx 33rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		position: relative;

		.giftBox {
			height: 0;
			flex: 1;
		}

		.btnBox {
			height: 171rpx;
			width: 100vw;
			background-image: url(@/static/iconImage/bg111.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-position: 100% 100%;
			position: absolute;
			left: 0%;
			bottom: 0rpx;
			display: flex;
			justify-content: center;
		}

		.btn {
			width: 312rpx;
			height: 86rpx;
			text-align: center;
			line-height: 86rpx;
			border-radius: 50rpx;
			color: #fff;
			font-size: 32rpx;
			background: #FFA000;
			margin-top: 28rpx;
			// margin-top: 135rpx;
		}
	}

	.giftList {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin-top: 23rpx;
		margin-right: 35rpx;
		padding-bottom: 150rpx;

		.giftItem {
			width: calc(100% / 4);
			height: 223rpx;
			border-radius: 12rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border: 1px solid transparent;
			box-sizing: border-box;
		}

		.giftItemActive {
			background: #FFEAC7;
			border: 1px solid #FFA000;
			box-sizing: border-box;
		}
	}
</style>