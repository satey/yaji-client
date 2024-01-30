<template>
	<view style="display: flex;flex-direction: column;height: 100vh;">
		<u-navbar :safeAreaInsetTop="true" :placeholder="false" bgColor="transparent">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #fff !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view>
			<view class="portraitContainer" v-if="tabCurrentIndex ==0">
				<block v-if=" usedElement!=null">
					<block v-for="(item,index) in userProfile.used_element">
						<image class="portraitImg" mode="heightFix" v-if="item.type=='3'||item.type=='4'"
							:src="item.url_image" :style="{zIndex:item.type=='3'?'0':'1'}" style="z-index:0;">
						</image>

					</block>
				</block>
			</view>
			<view class="portraitContainer" v-if="tabCurrentIndex ==1">
				<image class="portraitImg" v-if="userProfile!=null" :src="userProfile.bgimg_url" mode="aspectFill"
					style="z-index: 1;">
				</image>
			</view>
		</view>

		<view class="tabs">
			<view class="tabItem" :class="tabCurrentIndex==0?'activeItem':''" @click="tabCurrentIndex = 0">使用形象</view>
			<view class="tabItem" :class="tabCurrentIndex==1?'activeItem':''" @click="tabCurrentIndex = 1">使用背景</view>
		</view>
		<template v-if="tabCurrentIndex ==0">
			<scroll-view scroll-y="true" style="flex: 1;height: 0;" @scrolltolower="profileBottom">
				<view class="selectPortrait">
					<view style="color: #333333;font-size: 30rpx;margin-bottom: 40rpx;margin-top: 15rpx;">使用中</view>
					<view class="use" style="display: flex;align-items: center;justify-content: space-around;"
						v-if="userProfile!=null">
						<block v-for="(item,index) in userProfile.used_element" :key="index">
							<view v-if="item.type=='4'">
								<view class="useBox" style="background-image: url(/static/xingxiang.png);">
									<image class="usedImg" :src="item.url_image" mode="aspectFill" style="z-index: -1;">
									</image>
								</view>
							</view>
							<view v-if="item.type=='3'">
								<view class="useBox" style="background-image: url(/static/beijing.png);">
									<image class="usedImg" :src="item.url_image" mode="aspectFill" style="z-index: -1;">
									</image>
								</view>
							</view>
						</block>
						<!-- <view>
							<view class="useBox" style="background-image: url(/static/xingxiang.png);">
								<image class="usedImg" v-if="userProfile!=null"
									:src="userProfile.used_element[1].url_image" mode="aspectFill" style="z-index: -1;">
								</image>
							</view>
						</view>
						<view>
							<view class="useBox" style="background-image: url(/static/beijing.png);">
								<image class="usedImg" v-if="userProfile!=null"
									:src="userProfile.used_element[0].url_image" mode="aspectFill" style="z-index: -1;">
								</image>
							</view>
						</view> -->
					</view>
					<view style="display: flex;align-items: center;justify-content: center;margin-top: 50rpx;">
						<view class="useCancellationBtn" style="margin-right: 23rpx;" @click="cancel">取消</view>
						<view class="useSeveBtn" style="margin-left: 23rpx;" @click="profileSave">保存</view>
					</view>
					<view style="color: #333333;font-size: 30rpx;margin-bottom: 45rpx;margin-top: 45rpx;width: 55rpx;">
						<view style="position: relative;white-space: nowrap;">
							<text style="position: relative;z-index: 5;">更多</text>
							<text
								style="width: 100%;height: 16rpx;background: #8FFF00;position: absolute;left: 0%;bottom: 0;display: block;"></text>
						</view>
					</view>
					<view>
						<view class="use">
							<view style="position: relative;margin-right: 50rpx;" @click="selectProfileElement(1)">
								<view style='position: relative;z-index: 1;font-size: 30rpx;'
									:style="{color:useIndex == 1?'#FFA000':''}">形象
								</view>
							</view>
							<view style="position: relative;" @click="selectProfileElement(2)">
								<view style='position: relative;z-index: 1;font-size: 30rpx;'
									:style="{color:useIndex == 2?'#FFA000':''}">背景
								</view>
							</view>
						</view>
						<view class="useMore" style="flex-wrap: wrap;justify-content: start;margin-top: 43rpx;">
							<block v-for="(item,index) in profileElementList" :key="index">
								<view style="width: calc(100% / 3 - 15rpx);text-align: center;box-sizing: border-box;"
									:style="{marginRight:(index+1)%3==0?'0rpx':'13rpx'}"
									@click="selectElement(item,index)">
									<view class="useBox" style="position: relative;"
										:style="{border:index==selectIndex?'1px solid #FFA000':'1px solid #DDDDDD'}">
										<image src="../../static/mianfei.png" v-if="item.price==0"
											style="width: 110rpx;height: 93rpx;position: absolute;top: 0;left: 0;z-index: 2;"
											mode=""></image>
										<image src="../../static/yongyou.png" v-if="item.is_have==1"
											style="width: 110rpx;height: 93rpx;position: absolute;top: 0;left: 0;z-index: 2;"
											mode=""></image>
										<image style="width: 100%;height: 100%;" :src="item.url_image"
											mode="aspectFill">
										</image>
									</view>
									<view
										style="display: flex;align-items: center;justify-content: center;margin: 10rpx 0rpx;">
										<text style="color: #999;font-size: 22rpx;">{{item.title}}</text>
										<image src="../../static/qian.png"
											style="width:22rpx ;height:22rpx ;margin: 0rpx 5rpx;" mode="">
										</image>
										<text style="color: #FFA000;font-size: 28rpx;">{{item.price}}</text>
									</view>
								</view>
							</block>
							<view v-if="!profileElementList.length"
								style="width: 100% ;display: flex;align-items: center;justify-content: center;">
								<u-empty icon="/static/iconImage/jilu.png" text="" textColor="#a1a1a1"
									marginTop="100"></u-empty>
							</view>
						</view>
					</view>
				</view>
				<u-popup :show="showPopup" @close="showPopup = false" mode="center" :closeable="false" :round="20">
					<view class="log">
						<view style="text-align: center;font-size: 30rpx;color: #333;">取消设置</view>
						<view style="font-size: 28rpx;color: #333;margin-top: 89rpx;">
							保存当前形象配置需要花费{{popupMoney==0?'':popupMoney}}铜钱，确定支付并保存吗？</view>
						<view style="display: flex;align-items: center;justify-content: center;margin-top: 137rpx;">
							<view @click="showPopup = false;popupMoney = 0"
								style="margin-right: 21rpx;width: 210rpx;height: 68rpx;background: #FFDDA4;border-radius: 8rpx;text-align: center;line-height: 68rpx;color: #FFA000;font-size: 30rpx;">
								取消 </view>
							<view @click="queding"
								style="margin-left: 21rpx;width: 210rpx;height: 68rpx;background: #FFA000;border-radius: 8rpx;text-align: center;line-height: 68rpx;color: #fff;font-size: 30rpx;">
								确定</view>
						</view>
					</view>
				</u-popup>
				<u-popup :show="rechargePopup" @close="rechargePopup = false" mode="center" :closeable="false"
					:round="20">
					<view class="log">
						<view style="text-align: center;font-size: 30rpx;color: #333;">铜钱不足</view>
						<view style="font-size: 28rpx;color: #333;margin-top: 89rpx;text-align: center;">
							铜钱不足，是否前往充值页面</view>
						<view style="display: flex;align-items: center;justify-content: center;margin-top: 137rpx;">
							<view @click="rechargePopup = false"
								style="margin-right: 21rpx;width: 210rpx;height: 68rpx;background: #FFDDA4;border-radius: 8rpx;text-align: center;line-height: 68rpx;color: #FFA000;font-size: 30rpx;">
								取消 </view>
							<view @click="$u.route('/pages/mine/recharge');rechargePopup = false;"
								style="margin-left: 21rpx;width: 210rpx;height: 68rpx;background: #FFA000;border-radius: 8rpx;text-align: center;line-height: 68rpx;color: #fff;font-size: 30rpx;">
								确定</view>
						</view>
					</view>
				</u-popup>
			</scroll-view>
		</template>
		<template v-if="tabCurrentIndex ==1">
			<scroll-view scroll-y="true" style="flex: 1;height: 0;">
				<view class="bgImgContainer" style="background: #FFFDFD;">
					<view class="useImgBox">
						<view class="imgBox">
							<image style="width: 100%;height: 100%;" v-if="userProfile!=null"
								:src="userProfile.bgimg_url" mode="aspectFill"></image>
							<view class="imgUseText">使用中</view>
						</view>
						<view style="display: flex;align-items: center;justify-content: center;margin-top: 50rpx;">
							<view class="useSeveBtn" style="margin-right: 23rpx;" @click="changeImage">上传</view>
							<view class="useCancellationBtn"
								:style="{color:bgImgFlag==true?'#fff':'',background:bgImgFlag==true?'#FFA000':''}"
								style="margin-left: 23rpx;" @click="saveBg">保存</view>
						</view>
					</view>
					<view class="useImgs">
						<view style="color: #666;font-size: 30rpx;margin-bottom: 15rpx;">使用过</view>
						<view>
							<block v-if="userProfile!=null">
								<block v-if="userProfile.used_bgimg.length !=0">
									<block v-for="(item,index) in userProfile.used_bgimg" :key="index">
										<image class="imagesItem" @click="selectImg(item)" :src="item.img_url"
											mode="aspectFill"></image>
									</block>
								</block>
								<block v-else>
									<u-empty icon="/static/iconImage/jilu.png" text="" textColor="#a1a1a1"
										marginTop="100"></u-empty>
								</block>
							</block>
						</view>
					</view>
				</view>
			</scroll-view>
		</template>
		<feiqslsHit></feiqslsHit>
	</view>
</template>

<script>
	import permision from "@/js_sdk/wa-permission/permission.js"
	export default {
		name: "customized",
		data() {
			return {
				profileElementList: [],
				userProfile: null,
				usedElement: null,
				tabCurrentIndex: 0,
				selectIndex: 0,
				useIndex: 1,
				odlPrefileElement: [],
				prefileUrlId: '',
				prefileBgId: "",
				page: 1,
				bgImgFlag: false,
				prefileFlag: false,
				prefileArr: [],
				showPopup: false,
				popupMoney: 0,
				rechargePopup: false
			}
		},
		onLoad() {
			this.init()
			this.getProfileElement(4)
		},
		methods: {
			//初始化
			init() {
				var that = this;
				that.$api("profile.profileDetail").then(res => {
					console.log(res)
					if (res.code == 1) {
						that.userProfile = res.data;
						that.usedElement = res.data.used_element;
						that.odlPrefileElement = res.data;
					}
				})
			},
			profileBottom() {
				if (this.tabCurrentIndex == 0) {
					this.page++;
					if (this.useIndex == 1) {
						this.getProfileElement(4)
					} else {
						this.getProfileElement(3)
					}
				}
			},
			//获取配饰
			getProfileElement(type) {
				var that = this;
				that.$api("profile.getProfileElement", {
					profile_element_type: type,
					page: that.page
				}).then(res => {
					if (res.code == 1) {
						that.profileElementList.push(...res.data.list);
					}
				})
			},
			selectProfileElement(index) {
				this.useIndex = index;
				this.page = 1;
				this.profileElementList = [];
				if (index == 1) {
					this.getProfileElement(4)
				} else if (index == 2) {
					this.getProfileElement(3)
				}
			},
			//保存背景
			saveBg() {
				if (this.bgImgFlag == false) {
					return;
				}
				this.$api("profile.saveProfile", {
					profile_type: 2,
					profile_url: this.userProfile.bgimg_url
				}).then(res => {
					if (res.code == 3001) {
						this.rechargePopup = true
					} else {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				})
			},
			//
			selectImg(item) {
				this.bgImgFlag = true;
				this.userProfile.bgimg_url = item.img_url
			},
			//切换形象
			selectElement(item, index) {
				this.selectIndex = index;
				this.prefileFlag = true;
				this.popupMoney = 0;
				if (this.useIndex == 1) {
					//形象
					this.userProfile.used_element.forEach((itemValue, index) => {
						if (itemValue.type == '4') {
							this.prefileArr[0] = item;
							itemValue.url_image = item.url_image;
							itemValue.element_id = item.element_id;
						}
					})
				} else if (this.useIndex == 2) {
					//背景
					this.userProfile.used_element.forEach((itemValue, index) => {
						if (itemValue.type == '3') {
							this.prefileArr[1] = item;
							itemValue.url_image = item.url_image;
							itemValue.element_id = item.element_id;
						}
					})
				}
			},
			//保存
			profileSave() {
				this.popupMoney = 0;
				this.prefileArr.forEach((item, index) => {
					if (item.is_have == 0) {
						if (item.price != 0) {
							this.popupMoney += item.price;
							this.showPopup = true;
							return;
						}
					}
				})
				if (this.showPopup == true) {
					return
				}
				var ids = [];
				this.userProfile.used_element.forEach((item, index) => {
					ids.push(item.element_id)
				})
				this.$api("profile.saveProfile", {
					profile_type: 1,
					element_id_list: ids
				}).then(res => {
					this.selectProfileElement(1)
					if (res.code == 3001) {
						this.rechargePopup = true
					} else {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				})
			},
			queding() {
				var ids = [];
				this.userProfile.used_element.forEach((item, index) => {
					ids.push(item.element_id)
				})
				this.$api("profile.saveProfile", {
					profile_type: 1,
					element_id_list: ids
				}).then(res => {
					this.prefileFlag = false;
					this.showPopup = false;
					this.selectProfileElement(1)
					if (res.code == 3001) {
						this.rechargePopup = true
					} else {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				})
			},
			//取消
			cancel() {
				this.prefileFlag = false;
				this.userProfile.used_element[0].url_image = this.odlPrefileElement.profile_url
				this.userProfile.used_element[1].url_image = this.odlPrefileElement.profile_bg_url
			},
			async changeImage() {
				this.upload()
			},
			//上传
			upload() {
				var that = this;
				uni.chooseImage({
					count: 1,
					sourceType: ['album'],
					sizeType: "",
					success(res) {
						var token = uni.getStorageSync("token");
						uni.showLoading()
						uni.uploadFile({
							url: uni.getStorageSync("hostData").host+"/api/hey/" + 'index/upload',
							filePath: res.tempFilePaths[0],
							name: 'file',
							formData: {
								"token": token
							},
							success: res => {
								var data = JSON.parse(res.data);
								if (data.code == 1) {
									that.bgImgFlag = true;
									that.userProfile.bgimg_url = data.data.fullurl
								} else {
									uni.hideLoading()
								}
							},
							complete: e => {
								uni.hideLoading()
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.portraitContainer {
		width: 100vw;
		height: 678rpx;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;

		.portraitImg {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.tabs {
		display: flex;
		align-items: center;
		margin-top: -90rpx;
		position: relative;
		z-index: 9;
		background: #fff;
		border-top-left-radius: 33rpx;
		border-top-right-radius: 33rpx;
		overflow: hidden;

		.tabItem {
			height: 92rpx;
			flex: 1;
			text-align: center;
			line-height: 92rpx;
			font-size: 36rpx;
			color: #666666;
			transform: all 0.3s;
		}

		.activeItem {
			border-top-left-radius: 33rpx;
			border-top-right-radius: 33rpx;
			background: linear-gradient(to bottom, #FFEDCE, rgba(255, 255, 255, 0.0));
			font-size: 36rpx;
			color: #FFA000;
			font-weight: 800;
		}
	}

	.selectPortrait {
		padding: 0rpx 33rpx 33rpx 33rpx;
		box-sizing: border-box;

		.use {
			display: flex;
			align-items: center;
			color: #666666;
			font-size: 30rpx;
			text-align: center;

			.useBox {
				width: 250rpx;
				height: 250rpx;
				margin: 20rpx 0rpx;
				border-radius: 10rpx;
				overflow: hidden;
				background-position: 100% 100%;
				background-size: 100% 100%;
				background-repeat: no-repeat;

				.usedImg {
					width: 100%;
					height: 100%;
				}
			}

			.useLine {
				width: 100%;
				height: 16rpx;
				background: #8FFF00;
				position: absolute;
				left: 0;
				bottom: 10rpx,
			}

		}
	}

	.useMore {
		display: flex;

		.useBox {
			width: 100%;
			height: 225rpx;
			border-radius: 10rpx;
			overflow: hidden;
			background-position: 100% 100%;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;

			.usedImg {
				width: 100%;
				height: 100%;
			}
		}
	}

	.useImgBox {
		padding: 50rpx 40rpx 0rpx 40rpx;
		box-sizing: border-box;

		.imgBox {
			width: 100%;
			height: 311rpx;
			border-radius: 10rpx;
			overflow: hidden;
			position: relative;

			.imgUseText {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 9;
				width: 112rpx;
				height: 50rpx;
				text-align: center;
				line-height: 50rpx;
				color: #FFA000;
				font-size: 30rpx;
				background: rgba(255, 255, 255, 0.3);
			}
		}
	}

	.useImgs {
		padding: 32rpx 15rpx 32rpx 35rpx;
		box-sizing: border-box;

		.imagesItem {
			width: calc(100% / 2 - 20rpx);
			height: 183rpx;
			margin-top: 10rpx;
			margin-right: 20rpx;
		}
	}

	.useCancellationBtn {
		width: 140rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		font-size: 33rpx;
		color: #999;
		background: #D9D9D9;
		border-radius: 8rpx;
	}

	.useSeveBtn {
		width: 140rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		font-size: 33rpx;
		color: #fff;
		background: #FFA000;
		border-radius: 8rpx;
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