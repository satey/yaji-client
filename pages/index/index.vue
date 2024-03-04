<template>
	<view class="home">
		<view style="height: 1033rpx;position: fixed;top: 0;left: 0;">
			<view style="position: relative;" @click="homeJump">
				<feiQsls :fromTo="'index'" :roomId="roomId" :qslsUserList="homeDate.profile_list"
					v-if="homeDate!=null&&roomId!=null"></feiQsls>
			</view>
			<block v-if="homeDate!=null">
				<image v-if="homeDate.activeity.is_show==1" :src="homeDate.activeity.draw_img"
					@click="$u.route(homeDate.activeity.path)"
					style="position: absolute;top:718rpx;right:0;z-index: 9;width: 108rpx;height: 158rpx;"
					mode="heightFix"></image>
			</block>
		</view>
		<view style="height: 1033rpx;"></view>
		<view style="position: relative;z-index: 5;margin-top: 0rpx;">
			<view class="headContainerFooter" @click="homeJump">
				<view style="display: flex;align-items: center;justify-content: center;height: 100%;">
					<view class="fabei">
						发杯
					</view>
				</view>
			</view>
			<view style="background: #fff;margin-top: -5rpx;">
				<view class="nav" v-if="homeDate !=null">
					<image class="navImage" @click="$u.route('/pages/index/qslsList',{type:'qsls'})"
						src="../../static/iconImage/qushui.png" mode="widthFix"></image>
					<image class="navImage" @click="$u.route('/pages/index/lists',{type:'fhl'})"
						src="../../static/iconImage/feihua.png" mode="widthFix"></image>
					<image class="navImage" @click="$u.route('/pages/index/lists',{type:'jl'})"
						src="../../static/iconImage/jielong.png" mode="widthFix"></image>
				</view>
				<view class="notice">
					<image src="../../static/iconImage/qi.png" style="width: 36rpx;height: 36rpx;" mode=""></image>
					<swiper style="line-height: 51rpx;flex: 1;height: 51rpx;" :vertical='true' :circular="true"
						:disable-touch="true" :indicator-dots="false" :autoplay="true" :interval="3000"
						:duration="1000">
						<swiper-item v-for="(item,index) in mingrentangArr" :key="index"
							@click="$u.route('pages/user/famousRole')">
							<view class="swiper-item"><text
									style="color: #FFA000;font-size: 26rpx;padding-left: 16rpx;">{{item}}</text>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view style="padding: 20rpx 15rpx 5rpx 15rpx;box-sizing: border-box;">
					<view class="blackBox" style="display: flex;align-items: center;">
						<image @click="$u.route('pages/user/famousRole')" src="../../static/mingrentang.png"
							style="height: 127rpx;" mode="widthFix"></image>
						<image @click="$u.route('pages/talent/talent')" src="../../static/caihuaceshi.png"
							style="height: 127rpx;" mode="widthFix"></image>
					</view>
				</view>
				<view class="recommend">
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<view class="qushui" @click="jump(homeDate.recommend_room_list[0])">
							<image class="qushuiBg" src="../../static/iconImage/bg1.png" mode=""></image>
							<view>
								<view style="display: flex;align-items: center;">
									<text class="fontFamily" style="color: #123329;font-size: 30rpx;"
										v-if="homeDate != null">{{homeDate.recommend_room_list[0].type_str}}</text>
									<text v-if="homeDate != null"
										style="font-size: 20rpx;padding-left: 10rpx;border-left: 1px solid #9DA9A5;margin-left: 10rpx;color: #9DA9A5;">{{homeDate.recommend_room_list[0].public_type_str}}</text>
								</view>
								<view class="qushuiSubTitle">
									<image style="width: 40rpx;height: 40rpx;border-radius: 50%;" v-if="homeDate !=null"
										:src="homeDate.recommend_room_list[0].room_image" mode=""></image>
									<view class="subText" style="color: #000;" v-if="homeDate !=null">
										{{homeDate.recommend_room_list[0].room_name}}
									</view>
								</view>
							</view>
							<block v-if="homeDate !=null">
								<view class="userImages" v-if="homeDate.recommend_room_list[0].nums !=0">
									<block v-for="(imgItem,imgIndex) in homeDate.recommend_room_list[0].user_list"
										:key="imgIndex">
										<image class="userImageItem" :src="imgItem.avatar" mode="aspectFill"></image>
									</block>
									<text style="margin-left: 5rpx;"> <text
											v-if="homeDate !=null">{{homeDate.recommend_room_list[0].nums}}</text>
										人在线</text>
								</view>
							</block>
						</view>
						<view class="right">
							<!-- 飞花令 -->
							<view class="rightBox" style="background: linear-gradient(to right, #EEF6D1, #FFB2A9);"
								@click="jump(homeDate.recommend_room_list[1])">
								<view style="display: flex;align-items: center;">
									<text class="fontFamily" style="color: #501812;font-size: 30rpx;"
										v-if="homeDate != null">{{homeDate.recommend_room_list[1].type_str}}</text>
									<text
										style="font-size: 20rpx;padding-left: 10rpx;border-left: 1px solid #9DA9A5;margin-left: 10rpx;color: #9DA9A5;"
										v-if="homeDate != null">{{homeDate.recommend_room_list[1].public_type_str}}</text>
								</view>
								<view style="display: flex;align-items: center;justify-content: space-between;">
									<text style="font-size: 25rpx;color: #501812;"
										v-if="homeDate != null">{{homeDate.recommend_room_list[1].room_name}}</text>
									<block v-if="homeDate !=null">
										<view class="userImages" v-if="homeDate.recommend_room_list[1].nums !=0">
											<block
												v-for="(imgItem,imgIndex) in homeDate.recommend_room_list[1].user_list"
												:key="imgIndex">
												<image class="userImageItem" :src="imgItem.avatar" mode="aspectFill">
												</image>
											</block>
											<text style="margin-left: 5rpx;"> <text
													v-if="homeDate !=null">{{homeDate.recommend_room_list[1].nums}}</text>
												人在线</text>
										</view>
									</block>
								</view>
							</view>
							<!-- 诗词接龙 -->
							<view class="rightBox" style="background: linear-gradient(to right, #FFE8BE, #FDC582);"
								@click="jump(homeDate.recommend_room_list[3])">
								<view style="display: flex;align-items: center;">
									<text class="fontFamily" style="color: #543A1D;font-size: 30rpx;"
										v-if="homeDate != null">{{homeDate.recommend_room_list[3].type_str}}</text>
									<text
										style="font-size: 20rpx;padding-left: 10rpx;border-left: 1px solid #9DA9A5;margin-left: 10rpx;color: #9DA9A5;"
										v-if="homeDate != null">{{homeDate.recommend_room_list[3].public_type_str}}</text>
								</view>
								<view style="display: flex;align-items: center;justify-content: space-between;">
									<text style="font-size: 25rpx;color: #543A1D;"
										v-if="homeDate != null">{{homeDate.recommend_room_list[3].room_name}}</text>
									<block v-if="homeDate !=null">
										<view class="userImages" v-if="homeDate.recommend_room_list[3].nums !=0">
											<block
												v-for="(imgItem,imgIndex) in homeDate.recommend_room_list[3].user_list"
												:key="imgIndex">
												<image class="userImageItem" :src="imgItem.avatar" mode="aspectFill">
												</image>
											</block>
											<text style="margin-left: 5rpx;"> <text
													v-if="homeDate !=null">{{homeDate.recommend_room_list[3].nums}}</text>
												人在线</text>
										</view>
									</block>
								</view>
							</view>
						</view>
					</view>
					<!-- 成语接龙 -->
					<view class="chengyu" style="background: linear-gradient(30deg, #BEF8D5, #99E1C6, #99E1C6);"
						@click="jump(homeDate.recommend_room_list[2])">
						<image class="chengyuBg" src="../../static/iconImage/bg2.png" mode=""></image>
						<view>
							<view style="display: flex;align-items: center;">
								<text class="fontFamily" style="color: #123329;font-size: 30rpx;"
									v-if="homeDate !=null">{{homeDate.recommend_room_list[2].type_str}}</text>
								<text
									style="font-size: 23rpx;padding-left: 10rpx;border-left: 1px solid #9DA9A5;margin-left: 10rpx;color: #9DA9A5;"
									v-if="homeDate !=null">{{homeDate.recommend_room_list[2].public_type_str}}</text>
							</view>
							<view
								style="display: flex;align-items: center;justify-content: space-between;margin-top: 30rpx;">
								<view style="font-size:23rpx ;color: #000;" v-if="homeDate !=null">
									{{homeDate.recommend_room_list[2].room_name}}
								</view>
								<block v-if="homeDate !=null">
									<view class="userImages" v-if="homeDate.recommend_room_list[2].nums !=0">
										<block v-for="(imgItem,imgIndex) in homeDate.recommend_room_list[2].user_list"
											:key="imgIndex">
											<image class="userImageItem" :src="imgItem.avatar" mode="aspectFill">
											</image>
										</block>
										<text style="margin-left: 5rpx;"> <text
												v-if="homeDate !=null">{{homeDate.recommend_room_list[2].nums}}</text>
											人在线</text>
									</view>
								</block>
							</view>
						</view>
					</view>
					<!-- 更多 -->
					<block v-if="homeDate!=null">
						<view class="chengyu" v-for="(item,index) in homeDate.comm_room_list"
							:style="{background:item.background}" @click="jump(item)">
							<image v-if="item.type == 'scjl'" class="chengyuBg" src="../../static/iconImage/bg2.png"
								mode="">
							</image>
							<view>
								<view style="display: flex;align-items: center;">
									<text class="fontFamily"
										style="color: #123329;font-size: 30rpx;">{{item.type_str}}</text>
									<text
										style="font-size: 23rpx;padding-left: 10rpx;border-left: 1px solid #9DA9A5;margin-left: 10rpx;color: #9DA9A5;">{{item.public_type_str}}</text>
								</view>
								<view
									style="display: flex;align-items: center;justify-content: space-between;margin-top: 30rpx;">
									<view style="font-size:23rpx ;color: #000;">
										{{item.room_name}}
									</view>
									<block>
										<view class="userImages" v-if="item.nums !=0">
											<block v-for="(imgItem,imgIndex) in item.user_list" :key="imgIndex">
												<image class="userImageItem" :src="imgItem.avatar" mode="aspectFill">
												</image>
											</block>
											<text style="margin-left: 5rpx;"> <text>{{item.nums}}</text>
												人在线</text>
										</view>
									</block>
								</view>
							</view>
						</view>
					</block>
					<block v-if="homeDate!=null">
						<view class="items" :style="{background:index%2==0?'#fff':'#FDF8ED'}"
							v-for="(item,index) in homeDate.user_room_list" :key="index" @click="jump(item)">
							<view style="display: flex;">
								<image style="width: 93rpx;height: 93rpx;border-radius: 50%;" :src="item.room_image"
									mode="aspectFill"></image>
								<view
									style="height: 93rpx;display: flex;flex-direction: column;justify-content: space-around;margin-left: 16rpx;flex: 1;">
									<view style="display: flex;align-items: center;">
										<text
											style="color: 25rpx;color: #000;font-weight: bold;">{{item.type_str}}</text>
										<text
											style="font-size: 20rpx;color: #666;margin-left: 12rpx;">{{item.room_owner.role_realname}}·{{item.room_owner.role_dynasty}}</text>
									</view>
									<view style="display: flex;justify-content: space-between;align-items: center;">
										<text
											style="font-size: 20rpx;color: #000;font-weight: 500;">{{item.room_name}}</text>
										<view class="userImages" v-if="item.nums !=0">
											<block v-for="(imgItem,imgIndex) in item.user_list" :key="imgIndex">
												<image class="userImageItem" :src="imgItem.avatar" mode=""></image>
											</block>
											<text style="margin-left: 5rpx;">{{item.nums}}人在线</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>
		<feiqslsHit></feiqslsHit>
		<feiRenew></feiRenew>
		<feiauthority></feiauthority>
	</view>
</template>
<script>
	import feiRenew from "@/components/fei-renew/fei-renew.vue"
	import feiQsls from "@/components/fei-qsls/fei-qsls.vue"
	export default {
		name: 'index',
		components: {
			feiRenew,
			feiQsls,
		},
		data() {
			return {
				homeDate: null,
				roomId: null,
				mingrentangArr: []
			}
		},

		onLoad(option) {
			var that = this;
			that.setFontFamily();
			that.room()
			uni.$on("changeRoom", (data) => {
				if (data.msg == 'index') {
					that.room()
					that.init()
				}
			})
		},
		onShow() {
			uni.showTabBar()
			this.init()
			this.gethall_of_fame_new_role()
			this.onRoomData()
		},
		methods: {
			init() {
				var that = this;
				that.$api("home.index").then(res => {
					if (res.code == 1) {
						res.data.comm_room_list.forEach((item, index) => {
							switch (item.type) {
								case 'qsls':
									item.background = "linear-gradient(30deg, #F0FED3, #AEF2E0, #AEF2E0)"
									break;
								case 'fhl':
									item.background = "linear-gradient(to right, #EEF6D1, #FFB2A9)"
									break;
								case 'scjl':
									item.background = "linear-gradient(to right, #FFE8BE, #FDC582)"
									break;
								case 'cyjl':
									item.background = "linear-gradient(30deg, #BEF8D5, #99E1C6, #99E1C6)"
									break;
							}
						})
						that.homeDate = res.data;
					}
				})
			},
			room() {
				this.$api("qsls.matchroom").then(res => {
					if (res.code == 1) {
						uni.setStorageSync("roomData", res.data)
						this.roomId = res.data.room_info.room_id;
					}
				})
			},
			//名人堂提示
			gethall_of_fame_new_role() {
				let that = this;
				that.mingrentangArr = [];
				that.$api("role_title.hall_of_fame_new_role").then(res => {
					if (res.code == 1) {
						that.mingrentangArr = res.data
					}
				})
			},
			//跳转
			jump(item) {
				switch (item.type) {
					case 'qsls':
						this.$u.route("/pages/qsls/qsls", {
							roomId: item.room_id,
						})
						break;
					case 'fhl':
						this.$u.route("/pages/chat/chatRoom", {
							roomId: item.room_id,
							type: item.type
						})
						break;
					case 'scjl':
						this.$u.route("/pages/chat/chatRoom", {
							roomId: item.room_id,
							type: item.type
						})
						break;
					case 'cyjl':
						this.$u.route("/pages/chat/chatRoom", {
							roomId: item.room_id,
							type: item.type
						})
						break;
				}
			},
			onRoomData() {
				uni.$on('roomRemoveUser', function(data) {
					let time = setTimeout(() => {
						uni.showToast({
							icon: "none",
							title: "您被踢出房间"
						})
						clearTimeout(time)
					}, 800)
				})
				uni.$on('closeRoom', function(data) {
					let time = setTimeout(() => {
						uni.showToast({
							icon: "none",
							title: "房间已解散"
						})
						clearTimeout(time)
					}, 800)
				})
			},
			//首页的跳转
			homeJump() {
				uni.navigateTo({
					url: '/pages/qsls/qsls?roomId=' + this.roomId,
					animationType: 'fade-in',
					animationDuration: 200
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
	page {
		background: #F8F8F8;
	}

	.home {
		background: #F8F8F8;
	}

	.blackBox {
		width: 100%;
		background-image: url(@/static/blackBg.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		padding: 30rpx 25rpx;
		box-sizing: border-box;
	}

	.userImages {
		display: flex;
		align-items: center;
		font-size: 20rpx;
		color: #333;

		.userImageItem {
			width: 25rpx;
			height: 25rpx;
			border-radius: 50%;
			margin-left: -15rpx;

			&:first-child {
				margin: 0;
			}
		}
	}

	.nav {
		padding: 0rpx 46rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;

		.navImage {
			width: 195rpx;
			height: 181rpx;
		}
	}

	.recommend {
		padding: 15rpx 18rpx 30rpx 18rpx;
		box-sizing: border-box;

		.fontFamily {
			font-family: font-test !important;
		}

		.items {
			padding: 33rpx 20rpx 18rpx 32rpx;
			border-radius: 20rpx;
			margin-top: 25rpx;
			display: flex;
			flex-direction: column;
		}

		.chengyu {
			width: 100%;
			height: 153rpx;
			border-radius: 20rpx;
			position: relative;
			padding: 41rpx 16rpx 16rpx 32rpx;
			box-sizing: border-box;
			margin-top: 20rpx;

			.qushuiSubTitle {
				display: flex;
				align-items: center;
				height: 35rpx;
				background: red;
				background: linear-gradient(30deg, #BEF8D5, #99E1C6, #99E1C6);
				width: 30%;
				border-radius: 50rpx;

				.subText {
					font-size: 23rpx;
					color: #333;
					font-weight: bold;
					line-height: 35rpx;
					padding-left: 25rpx;
				}
			}

			.chengyuBg {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				right: 0;
			}
		}

		.qushui {
			width: 332rpx;
			height: 260rpx;
			position: relative;
			overflow: hidden;
			border-radius: 20rpx;
			padding: 41rpx 16rpx 16rpx 32rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.qushuiSubTitle {
				display: flex;
				align-items: center;
				height: 35rpx;
				background: red;
				background: linear-gradient(30deg, #BEF8D5, #99E1C6, #99E1C6);
				width: 70%;
				border-radius: 50rpx;
				margin-top: 30rpx;

				.subText {
					font-size: 26rpx;
					color: #333;
					font-weight: bold;
					line-height: 35rpx;
					padding-left: 25rpx;
				}
			}

			.qushuiBg {
				width: 100%;
				height: 180rpx;
				position: absolute;
				left: 0;
				bottom: 0;
			}

			background: linear-gradient(30deg, #F0FED3, #AEF2E0, #AEF2E0);
		}

		.right {
			height: 260rpx;
			width: 366rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.rightBox {
				height: calc(100% / 2 - 10rpx);
				border-radius: 20rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				padding: 23rpx 20rpx 16rpx 32rpx;
				justify-content: space-between;

			}
		}
	}

	.headContainerFooter {
		height: 165rpx;
		width: 100%;
		background-image: url(/static/qslsCupBg.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		// position: absolute;
		// left: 0;
		// bottom: -5rpx;
		z-index: 1;
		margin-top: -165rpx;

		.fabei {
			background-image: url(@/static/iconImage/fabeiBg.png);
			width: 198rpx;
			height: 58rpx;
			text-align: center;
			line-height: 58rpx;
			font-size: 30rpx;
			color: #fff;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			background-position: 100% 100%;
		}
	}

	.notice {
		background-image: url(/static/iconImage/lin.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		width: 100vw;
		height: 51rpx;
		line-height: 51rpx;
		padding-left: 25rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		margin-top: 30rpx;
	}
</style>