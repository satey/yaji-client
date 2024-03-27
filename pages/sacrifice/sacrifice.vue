<template>
	<view>
		<image style="position: absolute;top: 0;left: 0;width: 100%;height: 375rpx;" src="@/static/jisibg.png" mode="">
		</image>
		<view class="seach">
			<u-navbar :safeAreaInsetTop="true" :placeholder="true" bgColor="transparent">
				<view slot="left">
					<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
				</view>
			</u-navbar>
		</view>
		<view style="display: flex;align-items: center;justify-content: center;margin-top: 83rpx;">
			<block v-for="(item,index) in ancestorList" :key="index">
				<view :style="{marginRight:index==2?'0':'32rpx'}"
					style="display: flex;flex-direction: column;align-items: center;">
					<view @click="$u.route('/pages/mine/roleDetail', {role_id: item.ancestor_id})"
						style="width: 212rpx;height: 288rpx;border-radius: 12rpx;position: relative;z-index: 5;display: flex;align-items: center;justify-content: center;background: linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));">
						<image :src="item.profile_img" style="width: 190rpx;height: 262rpx;" mode="aspectFill"></image>
					</view>
					<view style="color:#333333 ;font-size:32rpx ;">{{item.name}}</view>
					<view style="color:#000 ;font-size:32rpx ;display: flex;align-items: center;">
						<image src="../../static/yan.png" style="width: 41rpx;height: 41rpx;" mode=""></image>
						{{item.value}}
					</view>
					<view @click="deliver(item)"
						style="margin-top: 5rpx;width: 112rpx;height: 59rpx;text-align: center;line-height: 59rpx;background: #FFA000;border-radius: 6rpx;color: #fff;font-size: 28rpx;">
						祭扫</view>
				</view>
			</block>
		</view>
		<view style="padding: 32rpx 34rpx;box-sizing: border-box;display: flex;align-items: center;">
			<view class="blcok blcok1">
				<view style="color: #333;font-size: 30rpx;margin-top: 35rpx;">
					曲水岸边，果品摊新启，首页可领取青团供祭祀用。
				</view>
				<view class="btn" @click="jumpIndex">前往领取</view>
			</view>
			<view class="blcok blcok2">
				<view style="color: #333;font-size: 30rpx;margin-top: 35rpx;">
					激活三祖角色，可得当前受祭点等值名望，和当前专属形象
				</view>
				<view class="btn" @click="$u.route('/pages/mine/getRole')">前往获取</view>
			</view>
		</view>
		<view style="padding: 0rpx 34rpx;box-sizing: border-box;">
			<view style="color: #333;font-size: 34rpx;margin-bottom: 25rpx;">贡献榜</view>
			<view>
				<view class="items" v-for="(item,index) in list" :key="index">
					<view style="display: flex;align-items: center;"
						@click="$u.route('/pages/user/home',{user_id:item.user_id})">
						<image :src="item.user_info.avatar" style="width: 95rpx;height: 95rpx;border-radius: 50%;"
							mode="aspectFill"></image>
						<view
							style="height: 95rpx;display: flex;flex-direction: column;justify-content: space-around;margin-left: 20rpx;">
							<view style="color: #333;font-size:30rpx ;">{{item.user_info.role_name_str}}</view>
							<view style="color: #666;font-size:25rpx ;">
								<block v-for="(item2,index2) in item.user_info.achievements" :key="index2">
									<text style="margin-right: 10rpx;">{{item2}}</text>
								</block>
							</view>
						</view>
					</view>
					<view style="height: 95rpx;display: flex;flex-direction: column;justify-content: space-around;">
						<view style="color: #333;font-size:25rpx ;">贡献</view>
						<view style="color: #FFA000;font-size:25rpx ;font-family: font-test !important;">
							{{item.sacrifice_value}}
						</view>
					</view>
				</view>
				<u-empty v-if="!list.length" icon="/static/iconImage/jilu.png" text="暂无数据" textColor="#a1a1a1"
					marginTop="100"></u-empty>
			</view>
		</view>
		<u-popup :show="deliverShow" @close="deliverShow = false,giftIndex = -1" mode="center" :overlayOpacity="0.5"
			:closeable="false" :round="20" :customStyle="{background:'#fff'}">
			<view class="popupContainer">
				<view style="display: flex;align-items: center;justify-content: center;">
					<view class="title">
						<text style="position: relative;z-index: 5;">添加供品</text>
						<view class="line"></view>
					</view>
				</view>
				<view style="color: #666666;font-size:25rpx ;text-align: center;margin-top: 25rpx;">点击青团或鲜花添加</view>

				<view style="margin-top: 135rpx;display: flex;justify-content: center;align-items: center;">
					<view v-for="(item,index) in giftList" :key="index" @click="clickGiftItem(item,index)"
						:style="{marginRight:index==giftList.length-1?'0':'30rpx'}"
						:class="giftIndex==index?'active':''"
						style="border: 1px solid transparent;border-radius: 5rpx;width: 216rpx;height: 290rpx;display: flex;flex-direction: column;align-items: center;">
						<image :src="item.img" style="width: 158rpx;height: 158rpx;" mode="widthFix"></image>
						<view style="color: #333333;font-size:35rpx ;text-align: center;margin-top: 15rpx;">
							{{item.title}}
						</view>
						<block v-if="item.user_remain!=0">
							<view style="color: #666;font-size:28rpx ;text-align: center;margin-top: 5rpx;">拥有
								×{{item.user_remain}}</view>
						</block>
						<block v-else>
							<view
								style="color: #666;font-size:28rpx ;text-align: center;margin-top: 5rpx;display: flex;align-items: center;">
								<image src="../../static/qian.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
								<text style="margin-left: 10rpx;">x{{item.price}}</text>
							</view>
						</block>

					</view>
				</view>
				<view @click="deliverShow = false,giftIndex = -1"
					style="width:190rpx ;height:85rpx ;background:#FFDDA4 ;color: #FFA000;font-size: 36rpx;border-radius: 50rpx;line-height: 85rpx;text-align: center;border: 1px solid FFA000;margin: 0 auto;margin-top: 91rpx;">
					关闭</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ancestorList: [],
				list: [],
				page: 1,
				deliverShow: false,
				giftList: [],
				giftIndex: -1,
				deliverData: []
			}
		},
		onLoad() {
			this.getSacrificeAncestorList()
			this.setFontFamily()
			this.getList()
			this.getGift()
		},
		onReachBottom() {
			this.page++;
			this.getList()
		},
		methods: {
			deliver(item) {
				this.deliverData = item;
				this.deliverShow = true;
			},
			clickGiftItem(item, index) {
				this.giftIndex = index;
				this.$api("sacrifice.addSacrifice", {
					prop_id: item.prop_id,
					ancestor_id: this.deliverData.ancestor_id
				}).then(res => {
					this.getSacrificeAncestorList()
					this.getGift()
					this.giftIndex = -1;
					this.deliverShow = false;
					uni.showToast({
						icon: "none",
						title: res.msg
					})
					// if (res.code != 1) {
					// 	this.giftIndex = -1;
					// 	this.deliverShow = false;
					// 	uni.showToast({
					// 		icon: "none",
					// 		title: res.msg
					// 	})
					// } else if (res.code == 1) {
					// 	this.giftIndex = -1;
					// 	this.deliverShow = false;
					// }
				})
			},
			getGift() {
				this.$api("sacrifice.getSacrificePropList").then(res => {
					if (res.code == 1) {
						this.giftList = res.data;
					}
				})
			},
			getSacrificeAncestorList() {
				this.$api("sacrifice.getSacrificeAncestorList").then(res => {
					if (res.code == 1) {
						this.ancestorList = res.data;
					}
				})
			},
			getList() {
				this.$api("sacrifice.getSacrificeRankingList", {
					page: this.page
				}).then(res => {
					if (res.code == 1) {
						this.list = [...this.list, ...res.data.list]
					}
				})
			},
			jumpIndex() {
				uni.reLaunch({
					url: `/pages/index/index`
				});
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
	.blcok {
		width: 327rpx;
		height: 306rpx;
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		padding: 13rpx 25rpx;
		box-sizing: border-box;
	}

	.blcok1 {
		background-image: url(@/static/jisiBg1.png);
		margin-right: 28rpx;
	}

	.blcok2 {
		background-image: url(@/static/jisibg2.png);
	}

	.btn {
		width: 215rpx;
		height: 80rpx;
		background-image: url(@/static/btnBg22.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		color: #FF8A00;
		font-size: 32rpx;
		text-align: center;
		line-height: 80rpx;
		margin: 0 auto;
		margin-top: 22rpx;
	}

	.items {
		margin-bottom: 15rpx;
		height: 143rpx;
		background: linear-gradient(rgba(255, 246, 232, 1), rgba(255, 246, 232, 0));
		border-radius: 20rpx;
		border: 1px solid #FFA000;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 25rpx 32rpx;
		box-sizing: border-box;
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
	}

	.active {
		background: #FFDDA4;
		border: 1px solid #FFA000 !important;
	}
</style>