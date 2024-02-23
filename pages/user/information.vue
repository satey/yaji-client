<template>
	<view class="information">
		<u-navbar title="资料" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view style="padding: 35rpx 27rpx;box-sizing: border-box;">
			<view class="boxContent">
				<view class="block1"></view>
				<view class="block2"></view>
				<view class="appName">雅集</view>
				<view>
					<view style="text-align: center;margin-top: 50rpx;">
						<image style="width: 160rpx;height:160rpx ;border-radius: 50%;" :src="userInfo.avatar"
							mode="aspectFill"></image>
					</view>
					<view
						style="margin: 0 auto;width: 100%;display: flex;align-items: center;justify-content: center;margin-top: 20rpx;">
						<view style="position: absolute;text-align: center;margin: 0 auto;">
							<text
								style="color: #333;font-size:26rpx ;position: relative;z-index: 1;">{{userInfo.realname}}·{{userInfo.dynasty}}</text>
							<text
								style="width: 100%;height: 13rpx;background: #FFA000;position: absolute;left: 0;bottom: 0;"></text>
						</view>
					</view>
				</view>
				<view style="display: flex;align-items: center;padding: 0rpx 122rpx;" v-if="userData.length !=0">
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
								@click="$u.route('/pages/user/setInformation',{type:'character',set:1})">
								设置
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
								@click="$u.route('/pages/user/setInformation',{type:'hobby',set:1})">
								设置
							</view>
						</view>
					</view>
				</view>
				<!-- ------------------- -->
				<view style="display: flex;align-items: center;padding: 0rpx 0rpx;justify-content: space-between;">
					<view class="box " :class="userData.age_group==0?'boxTwo':''" @click="showAge = true;">
						<view class="box-block">
							<view class="boxTitle" :style="{color:userData.age_group==0?'#BDE2A5':'#FFBC4B'}"
								style="font-size: 28rpx;">年龄</view>
							<view style="display: flex;align-items: center;margin-top: 20rpx;justify-content: center;">
								<!-- <text style="font-size: 26rpx;">解锁</text>
								<image style="width: 36rpx;height: 36rpx;" src="../../static/hua.png" mode="aspectFill">
								</image> -->
								<text style="font-size: 36rpx;color: #333;font-family: font-test !important;">
									？
								</text>
							</view>
							<view class="boxText">
								我的年龄
							</view>
							<view
								style="display: flex;align-items: center;justify-content: center;font-size: 23rpx;color: #333;">
								<text>{{userData.age_group==0?'请选择':userData.age_group_str}}</text>
								<i class="iconfont icon-right" style="font-size: 18rpx;"></i>
							</view>
							<!-- <view class="boxBtn" style="background: #9EFF00;color: #333;" @click="showMore=true">
								查看
							</view> -->
						</view>
					</view>
					<view class="box " :class="userData.animal_branche==0?'boxTwo':''" @click="showAttribute = true;">
						<view class="box-block">
							<view class="boxTitle" :style="{color:userData.animal_branche==0?'#BDE2A5':'#FFBC4B'}"
								style="font-size: 28rpx;">生肖</view>
							<view style="display: flex;align-items: center;margin-top: 20rpx;justify-content: center;">
								<!-- <text style="font-size: 26rpx;">解锁</text>
								<image style="width: 36rpx;height: 36rpx;" src="../../static/hua.png" mode="aspectFill">
								</image> -->
								<text style="font-size: 36rpx;color: #333;font-family: font-test !important;">？</text>
							</view>
							<view class="boxText">
								我的生肖
							</view>
							<view
								style="display: flex;align-items: center;justify-content: center;font-size: 23rpx;color: #333;">
								<text>{{userData.animal_branche==0?'请选择':userData.animal_branche_str}}</text>
								<i class="iconfont icon-right" style="font-size: 18rpx;"></i>
							</view>
							<!-- <view class="boxBtn" style="background: #9EFF00;color: #333;" @click="showMore=true">
								查看
							</view> -->
						</view>
					</view>
					<view class="box" :class="userData.stellar_period==0?'boxTwo':''" @click="showStar = true;">
						<view class="box-block">
							<view class="boxTitle" :style="{color:userData.stellar_period==0?'#BDE2A5':'#FFBC4B'}"
								style="font-size: 28rpx;">星纪</view>
							<view style="display: flex;align-items: center;margin-top: 20rpx;justify-content: center;">
								<!-- <text style="font-size: 26rpx;">解锁</text>
								<image style="width: 36rpx;height: 36rpx;" src="../../static/hua.png" mode="aspectFill">
								</image> -->
								<text style="font-size: 36rpx;color: #333;font-family: font-test !important;">
									？
								</text>
							</view>
							<view class="boxText">
								我的星纪
							</view>
							<view
								style="display: flex;align-items: center;justify-content: center;font-size: 23rpx;color: #333;">
								<text>{{userData.stellar_period==0?'请选择':userData.stellar_period_str}}</text>
								<i class="iconfont icon-right" style="font-size: 18rpx;"></i>
							</view>
							<!-- 	<view class="boxBtn" style="background: #9EFF00;color: #333;" @click="showMore=true">
								查看
							</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- popup -->
		<!-- 年龄 -->
		<u-popup :show="showAge" @close="showAge = false" mode="bottom" :closeable="false" :round="20">
			<view class="agePopup">
				<view style="display: flex;align-items: center;justify-content: center;">
					<view style="position: relative;text-align: center;display: inline;margin: 0 auto;">
						<text
							style="color: #333;font-size:32rpx ;position: relative;z-index: 1;font-family: font-test !important;">年龄</text>
						<text
							style="width: 100%;height: 13rpx;background: #FFA000;position: absolute;left: 0;bottom: 0;"></text>
					</view>
				</view>
				<view style="display: flex;align-items: center;flex-wrap: wrap;margin-top: 80rpx;">
					<block v-for="(item,index) in ageArr" :key="index">
						<view style="display: flex;align-items: center;width: 50%;margin-bottom: 50rpx;"
							:class="index%2==1?'rightActive':''" @click="ageIndex=index">
							<block v-if='index==ageIndex'>
								<image style="width: 35rpx;height: 35rpx;margin-right: 10rpx;"
									src="../../static/iconImage/radio.png" mode="">
								</image>
							</block>
							<block v-else>
								<view
									style="width: 30rpx;height: 30rpx;border: 1px solid #666666;border-radius: 50%;margin-right: 10rpx;">
								</view>
							</block>
							<text :style="{color:ageIndex == index?'#FFA000':'#333'}"
								style="font-size: 32rpx;">{{item.value}}</text>
						</view>
					</block>
				</view>
				<view class="btn" @click="saveAge(ageIndex)">确定</view>
			</view>
		</u-popup>
		<u-popup :show="showAttribute" @close="showAttribute = false" mode="bottom" :closeable="false" :round="20">
			<view class="attributePopup">
				<view style="display: flex;align-items: center;justify-content: center;">
					<view style="position: relative;text-align: center;display: inline;margin: 0 auto;">
						<text
							style="color: #333;font-size:32rpx ;position: relative;z-index: 1;font-family: font-test !important;">生肖</text>
						<text
							style="width: 100%;height: 13rpx;background: #FFA000;position: absolute;left: 0;bottom: 0;"></text>
					</view>
				</view>
				<view style="display: flex;align-items: center;flex-wrap: wrap;margin-top: 80rpx;padding: 0rpx 50rpx;">
					<block v-for="(item,index) in attributeList" :key="index">
						<view style="display: flex;align-items: center;width: 50%;margin-bottom: 35rpx;"
							:class="index%2==1?'rightActive':''" @click="attributeIndex =index">
							<block v-if="attributeIndex == index">
								<image style="width: 35rpx;height: 35rpx;margin-right: 10rpx;"
									src="../../static/iconImage/radio.png" mode="">
								</image>
							</block>
							<block v-else>
								<view
									style="width: 30rpx;height: 30rpx;border: 1px solid #666666;border-radius: 50%;margin-right: 10rpx;">
								</view>
							</block>

							<text :style="{color:attributeIndex == index?'#FFA000':'#333'}"
								style="font-size: 32rpx;">{{item.value}}</text>
						</view>
					</block>
				</view>
				<view class="btn" @click="saveAttribute(attributeIndex)">确定</view>
			</view>
		</u-popup>
		<u-popup :show="showStar" @close="showStar = false" mode="bottom" :closeable="false" :round="20">
			<view class="attributePopup">
				<view style="display: flex;align-items: center;justify-content: center;">
					<view style="position: relative;text-align: center;display: inline;margin: 0 auto;">
						<text
							style="color: #333;font-size:32rpx ;position: relative;z-index: 1;font-family: font-test !important;">星次</text>
						<text
							style="width: 100%;height: 13rpx;background: #FFA000;position: absolute;left: 0;bottom: 0;"></text>
					</view>
				</view>
				<view style="display: flex;align-items: center;flex-wrap: wrap;margin-top: 80rpx;padding: 0rpx 50rpx;">
					<block v-for="(item,index) in starList" :key="index">
						<view style="display: flex;align-items: center;width: 50%;margin-bottom: 35rpx;"
							:class="index%2==1?'rightActive':''" @click="starIndex =index">
							<block v-if="starIndex == index">
								<image style="width: 35rpx;height: 35rpx;margin-right: 10rpx;"
									src="../../static/iconImage/radio.png" mode="">
								</image>
							</block>
							<block v-else>
								<view
									style="width: 30rpx;height: 30rpx;border: 1px solid #666666;border-radius: 50%;margin-right: 10rpx;">
								</view>
							</block>

							<text :style="{color:starIndex == index?'#FFA000':'#333'}"
								style="font-size: 32rpx;">{{item.value}}</text>
						</view>
					</block>
				</view>
				<view class="btn" @click="saveStar(starIndex)">确定</view>
			</view>
		</u-popup>
		<feiqslsHit></feiqslsHit>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showAge: false,
				showAttribute: false,
				showStar: false,
				attributeList: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
				attributeIndex: -1,
				starIndex: -1,
				ageIndex: -1,
				ageArr: [],
				starList: ["星纪", "玄枵", "娵訾", "降娄", "大梁", "实沈", "鹑首", "鹑火", "鹑尾", "寿星", "大火", "析木"],
				userData: [],
				userInfo: uni.getStorageSync("userInfo")
			}
		},
		onLoad() {
			this.setFontFamily()
		},
		onShow() {
			this.getInfo()
		},
		methods: {
			getInfo() {
				this.$api("user.myInfo").then(res => {
					console.log(res)
					if (res.code == 1) {
						this.starList = res.data.stellar_period_option;
						this.attributeList = res.data.animal_branche_option;
						this.ageArr = res.data.age_group_option;
						this.userData = res.data;
					}
				})
			},
			//设置星
			saveStar(index) {
				this.infoSave({
					stellar_period: this.starList[index].key
				})
			},
			//设置生肖
			saveAttribute(index) {
				this.infoSave({
					animal_branche: this.attributeList[index].key
				})
			},
			//设置年龄
			saveAge(index) {
				this.infoSave({
					age_group: this.ageArr[index].key
				})
			},
			//
			infoSave(pament) {
				this.$api("user.infoSave", pament).then(res => {
					if (res.code == 1) {
						this.showAge = false;
						this.showAttribute = false;
						this.showStar = false;
						this.attributeIndex = -1;
						this.starIndex = -1;
						this.ageIndex = -1;
						this.getInfo()
					}
				})
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
	.boxContent {
		width: 100%;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;
		border-radius: 20rpx;
	}

	.block1 {
		width: 330rpx;
		height: 151rpx;
		background: linear-gradient(147deg, #61FF00 0%, rgba(97, 255, 0, 0) 100%);
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		opacity: 1;
		filter: blur(200rpx);
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.block2 {
		width: 362rpx;
		height: 151rpx;
		background: linear-gradient(200deg, #FF9900 0%, rgba(255, 184, 0, 0) 100%);
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		opacity: 1;
		filter: blur(100rpx);
		position: absolute;
		top: 50rpx;
		right: -30rpx;
		z-index: -1;
	}

	.appName {
		font-size: 100rpx;
		color: #FFDDA4;
		font-family: font-test !important;
		position: absolute;
		top: 30%;
		right: 38rpx;
		z-index: -1;
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

	.box {
		width: 192rpx;
		height: 252rpx;
		box-sizing: border-box;
		margin-top: 120rpx;
		background-image: url(@/static/iconImage/111.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;


		.box-block {
			padding: 16rpx 16rpx;
		}


		.boxTitle {
			text-align: right;
			font-size: 28rpx;
			font-family: font-test !important;
		}

		.boxText {
			font-size: 32rpx;
			margin-top: 13rpx;
			margin-bottom: 30rpx;
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

	// -------------
	.agePopup {
		width: 100vw;
		height: 568rpx;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		background: linear-gradient(#FFE6BD, #FFF3E0, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF);
		padding: 32rpx 100rpx;
		box-sizing: border-box;
	}

	.btn {
		width: 312rpx;
		height: 86rpx;
		background: #FFA000;
		border-radius: 50rpx;
		text-align: center;
		line-height: 86rpx;
		color: #fff;
		font-size: 32rpx;
		margin: 0 auto;
	}

	.attributePopup {
		width: 100vw;
		height: 739rpx;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		background: linear-gradient(#FFE6BD, #FFF3E0, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF);
		padding: 32rpx 100rpx;
		box-sizing: border-box;
	}

	.rightActive {
		align-items: flex-end;
		justify-content: flex-end;
	}
</style>