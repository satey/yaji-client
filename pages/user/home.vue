<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="">
		<u-navbar bgColor="rgba(255,255,255,0)">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-block text-4xl"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
			<view slot="center">
				<!-- <view style="color: #323232;" v-if="headColor=='#fff'">
					{{ role.realname || '无名氏' }}·{{role.dynasty || '未知朝代' }}
				</view> -->
			</view>
			<view slot="right">
				<view v-if="userInfo.id!=$Route.query.user_id" @click="topOperate"
					style="width: 60rpx;height: 60rpx;border-radius: 50rpx;text-align: center;line-height: 60rpx;">
					<i class="ri-more-line " style="font-size: 38rpx;color: #333;"></i>
				</view>
			</view>
		</u-navbar>
		<view class="homeHead" style="position: relative;">
			<block v-if="user!=null">
				<block v-if="user.profile_type==1">
					<view style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;text-align: center;">
						<image :src="user.profile_bg_url" mode="heightFix" style="width: 100%;height: 100%;z-index: 1;">
						</image>
					</view>
					<view style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;text-align: center;">
						<image :src="user.profile_url" mode="heightFix" style="width: 100%;height: 100%;z-index: 2;">
						</image>
					</view>
				</block>
				<block v-else>
					<view style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;text-align: center;">
						<image :src="user.bgimg_url" mode="aspectFill" style="width: 100%;height: 100%;z-index: -1;">
						</image>
					</view>
				</block>
			</block>

		</view>
		<view class="userContainer" v-if="user!=null">
			<view style="display: flex;justify-content: space-between;">
				<view style="display: flex;align-items: center;">
					<image style="width: 150rpx;height: 150rpx;border-radius: 50%;margin-right: 25rpx;"
						:src="user.avatar" @click="viewUserImg(user.avatar)" mode="aspectFill"></image>
					<view
						style="height: 150rpx;display: flex;flex-direction: column;justify-content: space-between;flex: 1;">
						<view style="color: #333;font-size: 36rpx;font-weight: bold;">
							{{ user.role_realname || '无名氏' }}·{{user.role_dynasty || '未知朝代' }}
						</view>
						<view style="display: flex;align-items: center;color: #333;font-size: 23rpx">
							<text>雅集号：{{ user.uid || '********' }}</text>
							<i @click="copy" class="iconfont icon-fuzhi"
								style="color:#333 ;font-size: 28rpx;margin-left: 20rpx;"></i>
						</view>
						<view style="display: flex;align-items: center;">
							<view style="position: relative;margin-right: 30rpx;">
								<text style="position: relative;z-index: 2;">名望：{{ user.total_mw || 0 }}</text>
								<view
									style="height: 16rpx;background: #8FFF00;width: 100%;position: absolute;left: 0;top: 50%;transform: translateY(-50%);">
								</view>
							</view>
							<!-- <block v-for="(item,index) in user.achievements" :key="index">
								<view style="position: relative;">
									<text style="position: relative;z-index: 2;">{{item}}</text>
									<view
										style="height: 16rpx;background: #FFA000;width: 100%;position: absolute;left: 0;top: 50%;transform: translateY(-50%);">
									</view>
								</view>
							</block> -->
						</view>
					</view>
				</view>
				<view style="display: flex;" v-if="user.user_id!=userInfo.id">
					<view v-if="user.is_follewed==0" @click="interest(1)"
						style="background: #FFDDA4;border: 1px solid #FFA000;color: #FFA000;font-size: 26rpx;width: 125rpx;height: 46rpx;text-align: center;line-height: 46rpx;border-radius: 10rpx;">
						<i class="iconfont icon-wodeguanzhu"></i>
						<text style="margin-left: 5rpx;">关注</text>
					</view>
					<view @click="$u.route(`pages/chat/single`,{user_id:user.user_id})"
						style="border:1px solid #FFA000;border-radius: 10rpx;width: 68rpx;height: 46rpx;text-align: center;line-height: 46rpx;color:#FFA000 ;margin-left: 21rpx;">
						<i class="iconfontcolor icon-xinxi"></i>
					</view>
				</view>
			</view>
			<view style="margin-top: 25rpx;color: #333;font-size: 26rpx;" v-if="user.length !=0">
				{{user.role_info.content.slice(0,70)}} <text v-if="user.role_info.content.length >70">……</text> <text
					v-if="user.role_info.content!='暂无简介'" style="color:#FFA000;"
					@click="showUserDetails=true;">查看全部</text>
			</view>
		</view>
		<view class="character">
			<view style="color: #333;font-size: 30rpx;">性格</view>
			<view style="display: flex;align-items: center;margin-top: 25rpx;" v-if="user.length!=0">
				<view class="characterItem" v-if="user.age_group_str!=''">{{user.age_group_str}}</view>
				<view class="characterItem" v-if="user.animal_branche_str!=''">生肖{{user.animal_branche_str}}</view>
				<view class="characterItem" v-if="user.stellar_period_str!=''">{{user.stellar_period_str}}</view>
				<text @click="$u.route('/pages/user/userMore',{user_id:$Route.query.user_id})">了解更多...</text>
			</view>
		</view>
		<view class="flair">
			<view style="color: #333;font-size: 30rpx;">才华</view>
			<view style="display: flex;align-items: center;margin-top: 25rpx;" v-if="user.length!=0">
				<block v-if="user.achievements.length!=0">
					<block v-for="(item,index) in user.achievements" :key="index">
						<!-- <view class="flairItem">{{item}}</view> -->
						<image :src="item" class="flairItem" style="width: 118rpx;height: 125rpx;" mode="aspectFill">
						</image>
					</block>
				</block>
				<view v-else style="text-align: center;margin-top: 50rpx;width: 100%;">
					暂未获得才华勋章
					<!-- <u-empty icon="" text="暂未获得才华勋章" textColor="#a1a1a1"
						marginTop="0"></u-empty> -->
				</view>

			</view>
		</view>
		<view class="trends">
			<view style="color: #333;font-size: 30rpx;">动态</view>
			<view style="display: flex;align-items: center;margin-top: 25rpx;flex-wrap: wrap;" v-if="user.length!=0">
				<block v-for="(item,index) in userPostList" :key="index">
					<view class="item"
						@click="$u.route('/pages/post/preview2',{data:JSON.stringify({type:'work',post_id:item.post_id})})">
						<image style="width: 100%;height: 100%;position: absolute;top:0%;left: 0;z-index: 1;"
							:src="item.bg_img_url" mode="aspectFill"></image>
						<image
							style="width: 100%;position: absolute;top: 50%;left: 0;z-index: 2;transform: translateY(-50%);"
							:src="item.image_list[0]" mode="aspectFill"></image>
						<view class="content">
							<text class="textLine">{{item.content}}</text>
						</view>
						<view class="itemFooter">
							<i class="iconfont icon-aixin1" style="margin-right: 5rpx;"></i>
							<text>{{item.diggnums}}</text>
						</view>
					</view>
				</block>
				<view v-if="userPostList.length ==0" style="width: 100%;">
					<u-empty icon="/static/iconImage/jilu.png" text="" textColor="#a1a1a1" marginTop="100"></u-empty>
				</view>
			</view>
		</view>
		<view style="text-align: center;color: #999999;font-size: 28rpx;">~没有更多了~</view>
		<u-modal :show="followModule" :showConfirmButton="true" :showCancelButton="true" confirmColor="#FE4373"
			confirmText="确定" cancelText="取消" @cancel="followModule=false" @confirm="unfollow">
			<view style="display: flex;flex-direction: column;">
				<view style="text-align: center;font-size: 32rpx;color: #323232;font-weight: bold;">提示</view>
				<view style="color:#999;font-size: 26rpx;margin-top: 30rpx;">
					<text>是否取消关注？</text>
				</view>
			</view>
		</u-modal>
		<u-popup :show="showUserDetails" @close="showUserDetails = false" mode="bottom" :closeable="false" :round="20">
			<view class="userDetails" v-if="user.length!=0"
				style="background: #fff;border-radius: 20rpx 20rpx 0rpx 0rpx;padding: 40rpx 30rpx;box-sizing: border-box;">
				<view style="display: flex;align-items: center;justify-content: center;">
					<view style="position: relative;display: inline;">
						<text class="userDetailsTitle"
							style="color: #333;font-size: 32rpx;position: relative;z-index: 1;">查看全部</text>
						<text
							style="width: 100%;height: 16rpx;position: absolute;left: 0;bottom: 0;background: #FFA000;"></text>
					</view>
				</view>
				<scroll-view scroll-y="true" class="userDetailsScroll">
					<view style="display: flex;align-items: center;flex-wrap: wrap;font-size: 32rpx;color: #666;">
						<view style="width: 50%;box-sizing: border-box;margin-bottom: 18rpx;">
							<text>姓名：</text>
							<text>{{ user.role_realname||"" }}</text>
						</view>
						<view style="width: 50%;box-sizing: border-box;margin-bottom: 18rpx;">
							<text>拼音：</text>
							<text>{{ user.role_info.chnname||"?" }}</text>
						</view>
						<view style="width: 50%;box-sizing: border-box;margin-bottom: 18rpx;">
							<text>性别：</text>
							<text>{{ user.role_info.gender_str}}</text>
						</view>
						<view style="width: 50%;box-sizing: border-box;margin-bottom: 18rpx;">
							<text>朝代：</text>
							<text>{{ user.role_info.dynasty||"" }}</text>
						</view>
						<view style="width: 50%;box-sizing: border-box;margin-bottom: 18rpx;">
							<text>生年：</text>
							<text>{{ user.role_info.birthyear||'?'}}</text>
						</view>
						<view style="width: 50%;box-sizing: border-box;margin-bottom: 18rpx;">
							<text>卒年：</text>
							<text>{{ user.role_info.deathyear||'?'}}</text>
						</view>
					</view>
					<view style="box-sizing: border-box;margin-bottom: 18rpx;font-size: 32rpx;color: #666;">
						<text>别称：</text>
						<text>{{user.role_info.aliasnames}}</text>
					</view>
					<view style="box-sizing: border-box;margin-bottom: 18rpx;font-size: 32rpx;color: #666;">
						<text>身份：</text>
						<block v-for="(item,index) in user.role_info.identity" ;key='index'>
							<text style="margin-right: 10rpx;">
								{{item}}
							</text>
						</block>
					</view>
					<view style="color: #333;font-size: 32rpx;margin-top: 35rpx;">
						<text style="color: #666;">简介：{{user.role_info.content}}
						</text>
					</view>
				</scroll-view>
			</view>
		</u-popup>
		<feiOperate :showReport='true' :showBlack="true" @black="black" @report='report' ref="feiOperate">
		</feiOperate>
		<feiqslsHit></feiqslsHit>
	</view>
</template>
<script>
	import feiOperate from "@/components/fei-operate/fei-operate.vue";
	import loginVue from '../auth/login.vue'
	export default {
		name: 'mine',
		components: {
			feiOperate,
		},
		data() {
			return {
				showUserDetails: false,
				type: 'role',
				tablist: [{
					name: '角色',
					type: 'role',
					count: 0
				}, {
					name: '动态',
					type: 'post',
					count: 0
				}],
				user: [],
				role: {},
				userData: {},
				postList: [],
				params: {
					type: 'all',
					page: 1,
				},
				paginator: {
					total: 0,
					last_page: 0,
				},
				loadmore: false,
				user_id: '',
				is_follow: '',
				followModule: false,
				headColor: "rgba(0,0,0,0)",
				userInfo: uni.getStorageSync("userInfo"),
				page: 1,
				userPostList: []
			}
		},
		onLoad() {
			let that = this
			that.getUserProfile()
			that.look_user_home()
			that.setFontFamily()
			that.getPost()
		},
		onPageScroll(e) {
			if (parseInt(e.scrollTop) >= 50) {
				this.headColor = "#fff"
			} else {
				this.headColor = "rgba(0,0,0,0)"
			}
		},
		onReachBottom() {
			// let that = this
			// if (that.loadmore === 'nomore') return false
			// that.loadmore = 'loading'
			// that.params.page = ++that.params.page
			// that.getUserPost();
			this.page++;
			this.getPost()
		},
		mounted() {
			let that = this
			that.user_id = that.$Route.query.user_id
		},
		methods: {
			getPost() {
				this.$api("user.post", {
					user_id: this.$Route.query.user_id,
					page: this.page
				}).then(res => {
					if (res.code == 1) {
						this.userPostList.push(...res.data.list)
					}
				})
			},
			//复制雅集号
			copy() {
				var that = this;
				uni.setClipboardData({
					data: String(this.user.uid),
					success: function() {
						//调用方法成功
						console.log('success');
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			//举报
			report() {
				var that = this;
				that.$u.route('/pages/public/report', {
					user_id: that.$Route.query.user_id,
					type: '用户',
					selectId: that.$Route.query.archeryId
				})
			},
			black() {
				let that = this;
				that.$api("user_black.add", {
					black_user_id: that.$Route.query.user_id
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				})
			},
			topOperate() {
				this.$refs.feiOperate.show();
			},
			viewUserImg(item) {
				uni.previewImage({
					current: 1,
					urls: [item]
				})
			},
			look_user_home() {
				var that = this;
				that.$api('user.look_user_home', {
					user_id: that.$Route.query.user_id
				})
			},
			//取消关注
			unfollow() {
				var that = this;
				that.$api('user_follow.follow', {
					user_id: that.$Route.query.user_id
				}).then(res => {
					if (res.code === 1) {
						console.log('取消成功');
						that.is_follow == 0;
						that.followModule = false;
						that.getUserProfile()
					} else {
						console.log('25');
					}
				})
			},
			interest(type) {
				let that = this;
				if (type == 1) {
					if (this.userInfo.id == this.user.user_id) {
						uni.showToast({
							icon: "none",
							title: "不能关注自己"
						})
					} else {
						that.$api('user_follow.follow', {
							user_id: that.$Route.query.user_id
						}).then(res => {
							uni.showToast({
								icon: "none",
								title: res.msg
							})
							that.getUserProfile()
						})
					}
				}
				if (type == 2) {
					that.followModule = true;
					// uni.showModal({
					// 	title: '提示',
					// 	content: '确定要取消关注用户？',
					// 	confirmText: "确定", //这块是确定按钮的文字
					// 	cancelText: "取消", //这块是取消的文字
					// 	success: function(res) {
					// 		if (res.confirm) {
					// 			console.log(that.$Route.query.user_id);
					// 			that.$api('user_follow.follow', {
					// 				user_id: that.$Route.query.user_id
					// 			}).then(res => {
					// 				if (res.code === 1) {
					// 					// that.user = res.data
					// 					console.log('取消成功');
					// 					that.is_follow == 0
					// 					// that.isInterest=!that.isInterest
					// 					that.getUserProfile()
					// 				} else {
					// 					console.log('25');
					// 				}
					// 			})
					// 		} else if (res.cancel) {
					// 			console.log('用户点击取消');
					// 		}
					// 	}
					// });
				}
			},
			getUserProfile() {
				let that = this
				// console.log(that.$Route.query.user_id);
				that.$api('user.index', {
					user_id: that.$Route.query.user_id
				}).then(res => {
					if (res.code === 1) {
						that.user = res.data
						that.is_follow = res.data.is_follow
					} else {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
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
	.homeHead {
		height: 622rpx;
		box-sizing: border-box;
		padding: 140rpx 30rpx 0rpx 30rpx;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.45) 100%);
	}

	.userContainer {
		width: 100vw;
		background: #fff;
		box-sizing: border-box;
		margin-top: -25rpx;
		position: relative;
		z-index: 5;
		border-radius: 25rpx 25rpx 0rpx 0rpx;
		padding: 50rpx 30rpx 0rpx 30rpx;
	}

	.character {
		margin-top: 45rpx;
		padding: 0rpx 30rpx 45rpx 30rpx;
		box-sizing: border-box;

		.characterItem {
			padding: 5rpx 15rpx;
			border-radius: 50rpx;
			color: #333;
			border: 1px solid #FFA000;
			margin-right: 50rpx;
		}
	}

	.flair {
		padding: 0rpx 10rpx 45rpx 30rpx;
		box-sizing: border-box;

		.flairItem {
			border-radius: 15rpx;
			margin-right: 50rpx;
			font-size: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-family: font-test !important;
			overflow: hidden;
		}
	}

	.trends {
		padding: 0rpx 0rpx 30rpx 30rpx;
		box-sizing: border-box;

		.flairItem {
			padding: 25rpx 30rpx;
			border-radius: 15rpx;
			border: 1px solid #FFA000;
			margin-right: 50rpx;
			font-size: 30rpx;
			color: #FFA000;
			display: flex;
			align-items: center;
			justify-content: center;
			font-family: font-test !important;
		}

		.item {
			width: calc(100% / 3 - 30rpx);
			height: 270rpx;
			position: relative;
			border-radius: 8rpx;
			overflow: hidden;
			margin-right: 30rpx;
			margin-bottom: 25rpx;

			.itemFooter {
				position: absolute;
				left: 0;
				bottom: 0;
				height: 52rpx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				color: #fff;
				font-size: 28rpx;
				z-index: 5;
				background: rgba(255, 255, 255, 0.5);
				padding-right: 20rpx;
				box-sizing: border-box;
			}
		}
	}

	.userDetailsTitle {
		font-family: font-test !important;
	}

	.userDetails {
		display: flex;
		flex-direction: column;
		height: 808rpx;
	}

	.userDetailsScroll {
		flex: 1;
		height: 0;
		margin-top: 45rpx;
	}

	.content {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 5;
		width: 100%;
		height: 100%;
		padding: 20rpx 10rpx 10rpx 10rpx;
		text-align: center;
		box-sizing: border-box;
		color: #FFFFFF;
		font-size: 20rpx;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;

	}

	.textLine {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>