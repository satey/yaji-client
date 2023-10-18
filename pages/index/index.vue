<template>
	<view style=" background-image: linear-gradient(#D8EEF7, #F5FCFF);height: 100%;min-height: 100vh;">
		<view style="width: 100%;height: 550rpx;position: relative;">
			<image style="width: 100%;height: 100%;" :src="indexTopData.homeTopBgImage" mode=""></image>
			<view style="position: absolute;right: 20rpx;bottom: -25rpx;display: flex;align-items: center;">
				<view
					style="width: 409rpx;background: rgba(255,255,255,0.6);border-radius: 6rpx 6rpx 6rpx 6rpx;padding: 15rpx 15rpx 10rpx 15rpx;box-sizing: border-box;font-size: 26rpx;color: #807D7D;margin-bottom: 120rpx;">
					<view class="swiper-item indexTopText" style="overflow: hidden;">
						匏有苦叶，济有深涉。我的意中人是一位精神小伙，他一定会驾一叶扁舟前来娶我…</view>
					<!-- <swiper style="width: 100%;height: 120rpx;" :indicator-dots="false" :autoplay="true"
						:interval="3000" :duration="1000" :circular='true'>
						<swiper-item v-for="(item,index) in indexTopData.word">
							<view class="swiper-item indexTopText" style="overflow: hidden;">{{item}}</view>
						</swiper-item>
					</swiper> -->
				</view>
				<image style="width: 150rpx;height: 246rpx;" :src="indexTopData.homeTopRImage" mode="">
				</image>
			</view>
		</view>
		<!-- 充值 -->
		<view v-if="recharge">
			<u-modal :show="recharge" :showConfirmButton="false" :showCancelButton="false" confirmColor="#FE4373"
				confirmText="充值" cancelText="放弃" @cancel="recharge=false">
				<view>
					<view style="display: flex;flex-direction: column;">
						<view style="text-align: center;font-size: 32rpx;color: #323232;font-weight: bold;">铜钱不足</view>
						<view style="color:#999;font-size: 26rpx;margin-top: 30rpx;">
							<text>当前没有足够的铜钱，需要前往购买吗？</text>
						</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 125rpx;">
						<view @click="recharge=false"
							style="margin-right: 20rpx;width: 228rpx;height: 65rpx;opacity: 1;border: 1rpx solid #C7C7C7;text-align: center;line-height: 65rpx;color: #808080;border-radius: 10rpx;font-size: 28rpx;">
							取消</view>
						<view @click="recharge=false;$refs.feiRecharge.show()"
							style="margin-left: 20rpx;width: 228rpx;height: 65rpx;opacity: 1;background:#F97698;text-align: center;line-height: 65rpx;color: #FFFFFF;border-radius: 10rpx;font-size: 28rpx;">
							小额充值</view>
					</view>
				</view>
			</u-modal>
		</view>
		<!-- 每日邂逅 -->
		<view class="encounter">
			<view class="encounterContainer">
				<view class="encounterTitle">每日邂逅</view>
				<scroll-view scroll-x="true" style="white-space: nowrap;width: 100%;margin: 25rpx 0rpx;">
					<block v-for="(item,index) in encounterList" :key="index">
						<view class="encounterItem" @click="encounter(index)">
							<image :src="item.avatar" mode="aspectFill" style="width: 100%;height: 100%;">
							</image>
						</view>
					</block>
					<view class="encountermore" style="margin-right: 40rpx;" @click="moreClick">
						<image src="@/static/poetry.jpg" mode=""
							style="width: 100%;height: 100%;border-radius: 50%;visibility: hidden;">
						</image>
						<text class="moreText">更多</text>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- gengduo -->
		<view class="two">
			<view class="twoLeft" @click="openPoetry">
				<view
					style="margin-top: 26rpx;text-align: right;margin-right: 19rpx;font-size: 32rpx;color: #323232;letter-spacing: 3px;">
					兰亭清溪</view>
				<image style="width: 210rpx;height: 210rpx;position: absolute;left: 20rpx;bottom: 0rpx;"
					src="https://yaji-1318192409.cos.ap-shanghai.myqcloud.com/app_file/index/lanting.png"
					mode="widthFix"></image>
			</view>
			<view class="twoRight">
				<view class="twoRightTop" @click="openWine">
					<image style="width: 96rpx;height: 96rpx;"
						src="https://yaji-1318192409.cos.ap-shanghai.myqcloud.com/app_file/index/ci.png" mode="">
					</image>
					<view style="font-size: 32rpx;color: #323232;letter-spacing: 3px;margin-left: 27rpx;">
						诗词结缘</view>
				</view>
				<view class="twoRightBottom" @click="$u.route('pages/joy/archeryStart')">
					<image style="width: 96rpx;height: 96rpx;"
						src="https://yaji-1318192409.cos.ap-shanghai.myqcloud.com/app_file/index/xuan.png" mode="">
					</image>
					<view style="font-size: 32rpx;color: #323232;letter-spacing: 3px;margin-left: 27rpx;">
						品铭轩</view>
				</view>
			</view>
		</view>
		<!-- banner -->
		<view style="padding: 0 30rpx;margin-top: 30rpx;" v-if="bannerData.length !=0">
			<swiper v-if="bannerData.length !=0" class="bannerBox" :circular="true" :indicator-dots="false"
				:autoplay="true" :interval="3000" :duration="1000">
				<swiper-item>
					<block v-for="(item,index) in bannerData" :key="index">
						<view class="swiper-item" v-if="item.status == 'normal'">
							<image class="banner" :src="item.image" mode="scaleToFill" @click="jumpBanner(item)">
							</image>
						</view>
					</block>
				</swiper-item>
			</swiper>
		</view>
		<!-- 陌上桑林 -->
		<view class="celebrity" @click="$u.route('pages/song/songStart')">
			<view class="celebrityContainer">
				<image style="width: 130rpx;height: 130rpx;"
					src="https://yaji-1318192409.cos.ap-shanghai.myqcloud.com/app_file/duiGe/moshangsang.png" mode="">
				</image>
				<view style="margin-left: 27rpx;">
					<view style="font-size: 32rpx;color: #323232;letter-spacing: 3px;">
						陌上桑</view>
					<view style="font-size: 28rpx;color: #323232;letter-spacing: 3px;opacity: 0.8;margin-top: 16rpx;">
						跨越三千年的浪漫场景。
					</view>
				</view>
			</view>
		</view>
		<!-- 名人堂 -->
		<view class="celebrity" @click="$u.route('pages/user/famousRole')" style="padding-bottom: 30rpx;">
			<view class="celebrityContainer">
				<image style="width: 130rpx;height: 130rpx;"
					src="https://yaji-1318192409.cos.ap-shanghai.myqcloud.com/app_file/index/tang.png" mode=""></image>
				<view style="margin-left: 27rpx;">
					<view style="font-size: 32rpx;color: #323232;letter-spacing: 3px;">
						名人堂</view>
					<view style="font-size: 28rpx;color: #323232;letter-spacing: 3px;opacity: 0.8;margin-top: 16rpx;">
						{{mingrentangTitle}}
					</view>
				</view>
			</view>
		</view>
		<view class="module" v-if="moduleShow">
			<swiper class="moduleSwiper" :indicator-dots="false" :current="currentIndex" @change="encounterChange"
				:autoplay="false" :circular="false" :interval="500" :duration="200" v-if="encounterFlag">
				<swiper-item v-for="(item,index) in encounterList" :key="index" class="swiper-item">
					<view class="swiperBox">
						<image class="userBg" :src="item.background_image||'../../static/userBg.png'" mode="aspectFill">
						</image>
						<view class="userBox">
							<view style="margin-left: 30rpx;">
								<image class="userImg" @click="viewUserImg(item.original_avatar|| '/static/avatar.png')"
									:src="item.avatar" mode="aspectFill">
								</image>
							</view>
							<view class="userNameContainer"
								style="margin-top: 21rpx;padding: 0rpx 30rpx;background-size: 100% 100%;">
								<view style="display: flex;align-items: center;justify-content: space-between;">
									<view style="font-size: 32rpx;color: #323232;">{{item.realname}}·{{item.dynasty}}
									</view>
									<view @click="$u.route(`pages/user/home?user_id=${item.id}`)"
										style="font-size: 26rpx;width: 135rpx;height: 50rpx;text-align: center;line-height: 50rpx;color: #FFFFFF;background: #F97698;border-radius: 10rpx;font-size: 10rpx !important;">
										<text style="font-size: 26rpx;">查看主页</text>
									</view>
								</view>
								<view :style="{visibility:item.achievements==''?'hidden':''}"
									style="margin-top: 10rpx;color: #808080;font-size: 26rpx;">{{item.achievements}}
								</view>
								<view
									style="margin-top: 10rpx;color: #808080;font-size: 26rpx;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
									{{item.content||'暂无简介。'}}
								</view>
							</view>
						</view>
						<view class="trends">
							<view style="color: #3D3D3D;font-size: 30rpx;">最新动态</view>
							<block v-if="item.post_data !=null?true:false">
								<view v-if="item.post_data.content != ''"
									@click="$u.route(`pages/post/detail?post_id=${item.post_data.id}`)"
									style="margin-top: 23rpx;color: #6A6A6A;font-size: 26rpx;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
									{{item.post_data.content}}
								</view>
								<view v-if="item.post_data.images !=''?true:false"
									@click="$u.route(`pages/post/detail?post_id=${item.post_data.id}`)"
									style="display: flex;align-items: center;margin-top: 17rpx;"
									:style='item.post_data.images.split(",").length>=3?"justify-content:space-between":""'>
									<block v-for="(imgItem,imgIndex) in item.post_data.images.split(',')"
										:key="imgIndex">
										<view class="trendsImgBox">
											<image class="trendsImgs" :src="imgItem" mode="aspectFill"></image>
										</view>
									</block>
								</view>
							</block>
							<block v-else>
								<view
									style="width: 100%;height: 160rpx;text-align: center;line-height: 200rpx;color: #3D3D3D;opacity: 0.7;font-size: 28rpx;">
									最近没有更新动态</view>
							</block>
						</view>
						<view class="footer">
							<view @click="close"
								style="width: 80rpx;height: 80rpx;text-align: center;line-height: 80rpx;border-radius: 50%;border: 1px solid #C7C7C7;">
								<text class="ri-close-line" style="font-size: 39rpx;color: #767676;"></text>
							</view>
							<block v-if="item.is_love ==0">
								<view @click="help(item,index)"
									style="width: 175rpx;height: 80rpx;text-align: center;line-height: 80rpx;border-radius: 40rpx;border: 1px solid #FE4373;">
									<text class="ri-heart-line" style="font-size: 39rpx;color: #FE4373;"></text>
								</view>
							</block>
							<block v-else>
								<view @click="help2"
									style="background: #FE4373;width: 175rpx;height: 80rpx;text-align: center;line-height: 80rpx;border-radius: 40rpx;border: 1px solid #FE4373;">
									<text class="ri-heart-line" style="font-size: 39rpx;color: #fff;"></text>
								</view>
							</block>
						</view>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<view style="padding: 30rpx;box-sizing: border-box;">
						<view class="notHave">
							<view style="height: 25rpx;"></view>
							<view style="display: flex;align-items: center;justify-content: space-between;">
								<view></view>
								<view @click="close"
									style="width: 80rpx;height: 80rpx;text-align: center;line-height: 80rpx;border-radius: 50%;border: 1px solid #C7C7C7;margin-right: 25rpx;">
									<text class="ri-close-line" style="font-size: 39rpx;color: #767676;"></text>
								</view>
							</view>
							<view style="text-align: center;margin-top: 50rpx;">
								<image style="width: 296rpx;height: 296rpx;"
									src="https://yaji-1318192409.cos.ap-shanghai.myqcloud.com/app_file/index/child.png"
									mode="">
								</image>
								<view style="color: #3D3D3D;opacity: 0.6;font-size: 30rpx;">没有更多啦，明天再来吧</view>
							</view>
							<view @click="forceEncounter"
								style="width: 228rpx;height: 65rpx;border-radius: 10rpx;line-height: 65rpx;color:#FFFFFF ;background-color: #F97698;text-align: center;margin: 0 auto;margin-top: 58rpx;">
								强行邂逅</view>
							<view style="display: flex;padding: 0rpx 65rpx;margin-top: 50rpx;">
								<text class="ri-error-warning-fill"
									style="font-size: 35rpx;color: #999999;margin-right: 5rpx;"></text>
								<view style="color: #808080;font-size: 28rpx;">
									名望等级3以下，每天可邂逅7位异性用 户，每升一级增加3位。
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view style="padding: 30rpx;box-sizing: border-box;" v-if="usePropFlag">
				<view
					style="width: 100%;height: 100%;display: flex;flex-direction: column;align-items: center;justify-content: center;">
					<view class="propBox">
						<view style="font-style: 32rpx;text-align: center;color: #3D3D3D;">使用道具</view>
						<view style="margin-top: 50rpx;color: #3D3D3D;opacity: 0.6;font-size: 30rpx;">
							花费【铜钱x2】可额外邂逅3位异性。仅当次有效，不影响每天的等级限额。</view>
						<view style="display:flex;align-items: center;justify-content: space-around;margin-top: 80rpx;">
							<view @click="close"
								style="width: 228rpx;height: 65rpx;line-height: 65rpx;text-align: center;color: #808080;border: 1px solid #C7C7C7;border-radius: 10rpx;">
								取消
							</view>
							<view @click="useProp"
								style="width: 228rpx;height: 65rpx;line-height: 65rpx;text-align: center;color: #fff;;border-radius: 10rpx;background: #F97698;">
								使用
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view v-if="authority">
			<u-modal :show="authority" :showConfirmButton="true" :showCancelButton="true" confirmColor="#FE4373"
				confirmText="去开启" cancelText="取消" @cancel="authority=false" @confirm="openSet">
				<view style="display: flex;flex-direction: column;">
					<view style="text-align: center;font-size: 32rpx;color: #323232;font-weight: bold;">权限未开启</view>
					<view style="color:#999;font-size: 26rpx;margin-top: 30rpx;">
						<text>将无法获得聊天的消息通知。
							请在手机的 “设置” — ”通知与控制中心“ — “通知管理” — “雅集” 中打开“允许通知”。
						</text>
					</view>
				</view>
			</u-modal>
		</view>
		<u-modal :show="$store.state.renew.isRenew" :showConfirmButton="true"
			:showCancelButton="$store.state.renew.isEnforce==1?false:true" confirmColor="#FE4373" @confirm="download"
			@cancel="renewCancel">
			<view>
				<view class="renewTitle">更新内容</view>
				<scroll-view scroll-y="true" class="myScroll" style="margin-top: 30rpx;" v-if="progress">
					<view v-html="$store.state.renew.renewContent"></view>
				</scroll-view>
				<view v-if="!progress" style="margin-top: 30rpx;">
					<progress :percent="progressNum" show-info style="width: 500rpx;" />
				</view>
			</view>
		</u-modal>
		<!-- <uc-auth></uc-auth> -->
		<!-- <uc-tabbar></uc-tabbar> -->
		<feiRecharge ref="feiRecharge"></feiRecharge>
		<topPrompt></topPrompt>
	</view>
</template>
<!-- git -->
<script>
	import feiRecharge from "@/components/fei-recharge/fei-recharge.vue"
	import permision from "@/js_sdk/wa-permission/permission.js";
	import {
		mapMutations,
		mapActions,
		mapState
	} from 'vuex'
	export default {
		name: 'index',
		components: {
			feiRecharge
		},
		data() {
			return {
				tablist: [{
						name: '每日邂逅',
						type: 'user',
						count: 0
					},
					{
						name: '话题速配',
						type: 'post',
						count: 0
					},
				],
				// tablist: [{
				// 	name: '每日邂逅',
				// 	type: 'user',
				// 	count: 0
				// }],
				type: 'user',
				listUserRecommend: [],
				listUserRecommend2: [],
				listPostRecommend: [],
				listGroupRecommend: [],
				params: {
					page: 1,
				},
				paginator: {
					total: 0,
					last_page: 0,
				},
				loadmore: false,
				searchList: [],
				paginator: {
					total: 0,
					last_page: 0,
				},
				loadmore: false,
				listUserSearch: [],
				limit: 3,
				count: 0,
				// -------
				renewText: "",
				isEnforce: "",
				renewPopup: false,
				downloadUrl: "",
				progress: true,
				progressNum: 0,
				headBarBgColor: "",
				downloadFlag: true,
				authority: false,
				bannerData: [],
				currentIndex: 0,
				moduleShow: false,
				encounterList: [],
				encounterFlag: true,
				usePropFlag: false,
				encounterListLength: 0,
				recharge: false,
				mingrentangTitle: "",
				indexTopData: []
			}
		},
		watch: {
			listUserRecommend: {
				handler(newVal, oldVal) {
					if (oldVal.length == 0) {
						this.listUserRecommend2 = newVal
					} else {
						this.listUserRecommend2 = [...newVal, ...oldVal]
					}
				},
				deep: true,
			}
		},
		onPageScroll(e) {
			if (parseInt(e.scrollTop) > 30) {
				this.headBarBgColor = "#fff"
			} else {
				this.headBarBgColor = ""
			}
		},
		onReachBottom() {
			let that = this;
			// if (that.loadmore === 'nomore') return false
			that.loadmore = 'loading'
			that.params.page = ++that.params.page;
			switch (that.type) {
				case 'user':
					that.loadmore = 'nomore'
					break
				case 'post':
					that.getPostRecommend()
					break
				case 'group':
					that.getGroupRecommend()
					break
				default:
					break
			}
		},
		mounted() {
			uni.removeStorageSync('titleItem')
		},
		onLoad(option) {
			let that = this;
			that.searchName()
			that.getUserRecommend();
			that.isPush();
			that.getAd()
			that.getEncounter();
			that.getTopImg()
			var count = uni.getStorageSync('pageCount') || 0;
			count++;
			uni.setStorageSync('pageCount', count);
			if (count < 1) {
				that.$api("versions.index").then(res => {
					console.log(res)
					var latestVersion = res.data.oldversion;
					var currentVersion = res.data.newversion;
					// console.log('currentVersion',currentVersion);
					// console.log('latestVersion',latestVersion);
					// 比较版本号
					if (compareVersion(currentVersion, latestVersion) > 0) {
						// 提示用户更新
						uni.showModal({
							title: '版本更新',
							content: '有新版本可用，是否更新？',
							success: function(res) {
								if (res.confirm) {
									// 下载最新版本
									uni.downloadFile({
										url: 'http://example.com/latestVersion.apk',
										success: function(res) {
											// 安装新版本
											uni.showModal({
												title: '安装新版本',
												content: '新版本已下载完成，是否安装？',
												success: function(res) {
													if (res.confirm) {
														uni.install({
															filePath: res
																.tempFilePath
														});
													}
												}
											});
										}
									});
								}
							}
						});
					}
				})
				// 比较版本号
				function compareVersion(v1, v2) {
					v1 = v1.split('.');
					v2 = v2.split('.');
					var len = Math.max(v1.length, v2.length);
					while (v1.length < len) {
						v1.push('0');
					}
					while (v2.length < len) {
						v2.push('0');
					}
					for (var i = 0; i < len; i++) {
						var num1 = parseInt(v1[i]);
						var num2 = parseInt(v2[i]);
						if (num1 > num2) {
							return 1;
						} else if (num1 < num2) {
							return -1;
						}
					}
					return 0;
				}
			}
		},
		onShow: function() {
			this.getUserInfo()
			this.gethall_of_fame_new_role()
			var lastVisitTime = uni.getStorageSync('lastVisitTime') || 0;
			var now = Date.now();
			if (now - lastVisitTime > 24 * 60 * 60 * 1000) {
				uni.setStorageSync('pageCount', 0);
			}
			uni.setStorageSync('lastVisitTime', now);
		},
		created() {
			uni.removeStorageSync('titleItem')
		},
		methods: {
			...mapActions(['getUserInfo']),
			viewUserImg(item) {
				uni.previewImage({
					current: 1,
					urls: [item]
				})
			},
			getTopImg() {
				let that = this;
				that.$api("index.index_top_image").then(res => {
					if (res.code == 1) {
						that.indexTopData = res.data;
					}
				})
			},
			//名人堂提示
			gethall_of_fame_new_role() {
				let that = this;
				that.$api("role_title.hall_of_fame_new_role").then(res => {
					if (res.code == 1) {
						that.mingrentangTitle = res.data
					}
				})
			},
			//点击更多
			moreClick() {
				this.$forceUpdate();
				this.moduleShow = true;
				this.encounterFlag = true;
				this.currentIndex = this.encounterList.length;
			},
			//使用道具
			useProp() {
				var that = this;
				that.$api("encounter.add_recommend_user").then(res => {
					if (res.code == 1) {
						that.getEncounter()
						that.usePropFlag = false;
						that.encounterFlag = true;
						that.currentIndex = that.encounterList.length;
						uni.showToast({
							icon: "success",
							title: "使用成功"
						})
					} else {
						if (res.msg != '未查询到数据') {
							that.recharge = true;
						}
						that.usePropFlag = false;
						that.moduleShow = false;
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				})
			},
			//每日邂逅
			getEncounter() {
				var that = this;
				that.$api("encounter.recommend_user").then(res => {
					if (res.code == 1) {
						that.encounterList = []
						that.encounterList = res.data;
					}
				})
			},
			//强制邂逅
			forceEncounter() {
				this.encounterFlag = false;
				this.usePropFlag = true;
			},
			//邂逅滚动
			encounterChange(e) {
				let index = e.detail.current;
				this.currentIndex = index;
			},
			//打开
			encounter(index) {
				this.currentIndex = index;
				this.moduleShow = true;
				this.encounterFlag = true;
			},
			//关闭
			close() {
				this.moduleShow = false;
				this.encounterFlag = true;
				this.usePropFlag = false;
			},
			//点赞
			help(item, index) {
				var that = this;
				that.$api("encounter.everyday_meet_love", {
					user_id: item.id
				}).then(res => {
					if (res.code == 1) {
						that.currentIndex++;
						that.encounterList[index].is_love = 1;
					}
				})
			},
			help2() {
				this.currentIndex++;
			},
			openPoetry() {
				var gameRoomData = this.$store.state.game.gameRoomData;
				if (gameRoomData.game_room_id != undefined) {
					this.$u.route('pages/joy/poetry?roomId=' + gameRoomData.game_room_id)
				} else {
					this.$u.route('pages/joy/poetryStart')
				}
			},
			//广告
			getAd() {
				var that = this;
				that.$api("ad.lists", {
					type: 4
				}).then(res => {
					if (res.code == 1) {
						if (res.data.length != 0) {
							that.bannerData = res.data;
						}
					}
				})
			},
			jumpBanner(item) {
				if (item.is_external_links == 0) {
					this.$u.route(item.url)
				} else {
					this.$u.route('/pages/joy/activity', {
						url: item.url,
						title: item.title
					})
				}
			},
			//打开诗词结缘
			openWine() {
				var that = this;
				var userInfo = uni.getStorageSync("userInfo");
				if (userInfo.role_id > 0) {
					that.$u.route('pages/joy/poem')
					// that.$api("poetry.isRelease").then(res => {
					// 	if (res.code == 1) {
					// 		if (res.data == 0) {
					// 			that.$u.route('pages/joy/wine')
					// 		} else {
					// 			uni.navigateTo({
					// 				url: '/pages/joy/wineContent'
					// 			})
					// 		}
					// 	}
					// })
				} else {
					that.$u.toast("无名氏无法进入哦")
				}
			},
			//打开手机设置
			openSet() {
				// #ifdef APP-PLUS
				permision.gotoAppPermissionSetting()
				// #endif
			},
			//查看push权限
			async isPush() {
				// #ifdef APP-PLUS
				// var flag = push.isOn();
				// if (flag) {
				// 	push.on();
				// } else {
				// 	push.off();
				// }
				var main = plus.android.runtimeMainActivity();
				var NotificationManagerCompat = plus.android.importClass(
					"androidx.core.app.NotificationManagerCompat");
				let pkName = main.getPackageName();
				let packageNames = NotificationManagerCompat.from(main);
				console.log('通知权限', packageNames.areNotificationsEnabled())
				if (packageNames.areNotificationsEnabled()) {
					push.on();
				} else {
					this.authority = true;
					// uni.showModal({
					// 	title: "请开启通知权限",
					// 	content: "请去设置里面开启通知权限！",
					// 	success(push) {
					// 		if (push.confirm) {
					// 			permision.gotoAppPermissionSetting()
					// 		}
					// 	}
					// })
				}
				// #endif
			},
			//关闭更新弹窗
			renewCancel() {
				this.$store.commit("setisRenew", false)
			},
			//下载新版本
			download() {
				var that = this;
				if (that.downloadFlag) {
					this.progress = false;
					that.downloadFlag = false;
					var downloadTask = uni.downloadFile({
						url: that.$store.state.renew.downloadUrl,
						success: function(res) {
							uni.hideLoading()
							// 安装新版本
							uni.showModal({
								title: '安装新版本',
								content: '新版本已下载完成，是否安装？',
								success: function(msg) {
									if (msg.confirm) {
										console.log(that.downloadFlag)
										if (that.downloadFlag) {
											// #ifdef APP-PLUS

											plus.runtime.install(res.tempFilePath);
											// #endif
										}
									}
								}
							});
						}
					});
					downloadTask.onProgressUpdate((res) => {
						that.progressNum = res.progress;
						if (parseInt(res.progress) == 100) {
							that.downloadFlag = true;
						}
					})
				} else {
					that.$u.toast("正在下载中")
				}

			},
			// 搜索中的角色称号
			searchName() {
				let that = this
				that.$api('role_title.lists').then(res => {
					if (res.code === 1) {
						that.searchList.push(res.data[0], res.data[1], res.data[2]);
					}
				})
			},

			// 搜索
			handleSearchTitle(item) {
				let that = this;
				uni.navigateTo({
					url: '/pages/index/indexSearch?titleItem=' + JSON.stringify(item),
				})
			},
			async getUserSearch() {
				let that = this
				that.loadmore = 'loading'
				that.$api('user.recommend', that.params).then(res => {
					if (res.code === 1) {
						that.paginator.total = res.data.total
						that.paginator.last_page = res.data.last_page
						that.listUserSearch = [...that.listUserSearch, ...res.data.data]
						uni.navigateTo({
							url: '/pages/index/indexSearch',
							success: () => {
								// console.log('s');
								that.$emit('item', item)
							},
							fail: (err) => {
								console.log(err);
							}
						})
						if (that.params.page < res.data.last_page) {
							that.loadmore = 'loadmore'
						} else {
							that.loadmore = 'nomore'
						}
					}
				})
			},
			// 没喜欢的房间
			loveRoom() {
				uni.showModal({
					title: '提示',
					content: '您可通过个人中心的反馈功能,告诉我们您想要创建的房间主题',
					confirmText: "确定",
					cancelText: '取消'
				})
			},
			changeTab(e) {
				// console.log(e)
				let that = this
				that.type = e.type
				switch (that.type) {
					case 'user':
						that.params.page = 1
						that.listUserRecommend = []
						that.getUserRecommend()
						break
					case 'post':
						that.params.page = 1
						that.listPostRecommend = [];
						that.getPostRecommend()
						break
					case 'group':
						that.params.page = 1
						that.litGroupRecommend = []
						that.getGroupRecommend()
						break
					default:
						break
				}
			},
			async getUserRecommend() {
				let that = this
				that.loadmore = 'loading'
				that.$api('user.recommend_user', that.params).then(res => {
					if (res.code === 1) {
						that.listUserRecommend = res.data
						if (that.params.page < res.data.last_page) {
							that.loadmore = 'loadmore'
						} else {
							that.loadmore = 'nomore'
						}
					}
				})
			},
			async getPostRecommend() {
				let that = this
				that.loadmore = 'loading'
				that.params.limit = 10
				that.$api('post_cate.lst', that.params).then(res => {
					if (res.code === 1) {
						// that.paginator.total = res.data.total
						// // that.paginator.last_page = res.data.last_page
						// that.listPostRecommend.concat(res.data);
						that.listPostRecommend = [...that.listPostRecommend, ...res.data];
						if (that.params.page < res.data.last_page) {
							that.loadmore = 'loadmore'
						} else {
							that.loadmore = 'nomore'
						}
					}
				})
			},
			async getGroupRecommend() {
				let that = this
				that.loadmore = 'loading'
				that.$api('group.lists', that.params).then(res => {
					if (res.code === 1) {
						console.log('今日雅集', res.data);
						that.paginator.total = res.data.total
						that.paginator.last_page = res.data.last_page
						that.listGroupRecommend = [...that.listGroupRecommend, ...res.data.data]
						if (that.params.page < res.data.last_page) {
							that.loadmore = 'loadmore'
						} else {
							that.loadmore = 'nomore'
						}
					}
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.module {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.25);
		z-index: 99;
		width: 100%;
		height: 100vh;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.propBox {
			width: 100%;
			height: 443rpx;
			border-radius: 10rpx;
			background: #fff;
			padding: 60rpx 40rpx;
			box-sizing: border-box;
		}

		.notHave {
			height: 822rpx;
			width: 100%;
			background: #fff;
			border-radius: 20rpx;
		}

		.moduleSwiper {
			box-sizing: border-box;
			width: 100%;
			height: 980rpx;

			.swiper-item {
				padding: 0rpx 30rpx;
				box-sizing: border-box;
			}

			.swiperBox {
				border-radius: 10rpx;
				overflow: hidden;
				position: relative;
				background: #FFF;

				.trends {
					padding: 30rpx 30rpx 0 30rpx;
					position: relative;
					z-index: 9;
					background: #fff;

					.trendsImgBox {
						height: 180rpx;
						margin-right: 20rpx;
						border-radius: 6rpx;
						width: calc(100% / 3);
						overflow: hidden;
					}

					.trendsImgs {
						width: 100%;
						height: 100%;
					}

					.trendsImgBox:last-child {
						margin-right: 0;
					}
				}

				.userBg {
					width: 100%;
					height: 450rpx;
					position: absolute;
					top: 0;
					left: 0;
				}

				.footer {
					padding: 40rpx 30rpx 30rpx 30rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: space-between;
				}

				.userBox {
					position: relative;
					z-index: 2;
					padding-top: 170rpx;

					.userImg {
						width: 130rpx;
						height: 130rpx;
						border-radius: 50%;
					}

					.userNameContainer {
						background-image: url(@/static/whileBg.png);
					}
				}

			}
		}
	}

	.encounter {
		padding: 30rpx;
		box-sizing: border-box;

		.encounterContainer {
			background: #FAF5EA;
			box-shadow: 6rpx 8rpx 10rpx 0rpx rgba(150, 143, 143, 0.38), -6rpx -8rpx 10rpx 0rpx #FFFFFF;
			border-radius: 10rpx;
			overflow: hidden;

			.encounterTitle {
				padding: 20rpx 0rpx 15rpx 25rpx;
				background: #FCEBC9;
				font-size: 32rpx;
				color: #3D3D3D;
			}

			.encounterItem {
				width: 130rpx;
				height: 130rpx;
				border-radius: 50%;
				margin-right: 25rpx;
				display: inline-block;
				border-radius: 50%;
				overflow: hidden;
			}

			.encountermore {
				width: 130rpx;
				height: 130rpx;
				border-radius: 50%;
				text-align: center;
				line-height: 130rpx;
				background: #FFF9EC;
				border-radius: 95rpx 95rpx 95rpx 95rpx;
				border: 2rpx solid #DABB7C;
				box-sizing: border-box;
				position: relative;
				display: inline-block;
			}

			.moreText {
				color: #986A0D;
				font-size: 30rpx;
				position: absolute;
				left: 0;
				right: 0;
			}

			.encounterItem:nth-child(1) {
				margin-left: 40rpx;
			}
		}
	}

	.two {
		padding: 0rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;

		.twoLeft {
			width: calc(100% / 2 - 18rpx);
			height: 246rpx;
			background: #CFDFD0;
			box-shadow: 6rpx 8rpx 10rpx 0rpx rgba(150, 143, 143, 0.38), -6rpx -8rpx 10rpx 0rpx #FFFFFF;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			opacity: 1;
			position: relative;
		}

		.twoRight {
			height: 246rpx;
			width: calc(100% / 2 - 18rpx);
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.twoRightTop {
				width: 100%;
				height: calc(100% / 2 - 12rpx);
				background: #CFDFD0;
				box-shadow: 6rpx 8rpx 10rpx 0rpx rgba(150, 143, 143, 0.38), -4rpx -6rpx 8rpx 0rpx #FFFFFF;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				opacity: 1;
				display: flex;
				align-items: center;
				padding: 0rpx 20rpx;
				box-sizing: border-box;
			}

			.twoRightBottom {
				width: 100%;
				height: calc(100% / 2 - 12rpx);
				background: #CFDFD0;
				box-shadow: 6rpx 8rpx 10rpx 0rpx rgba(150, 143, 143, 0.38), -4rpx -6rpx 8rpx 0rpx #FFFFFF;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				opacity: 1;
				display: flex;
				align-items: center;
				padding: 0rpx 20rpx;
				box-sizing: border-box;
			}
		}
	}

	.bannerBox {
		width: 100%;
		box-sizing: border-box;
		height: 150rpx;
		border-radius: 20rpx;
		box-shadow: inset 0rpx 4rpx 10rpx 0rpx rgba(0, 0, 0, 0.302);

		.banner {
			width: 100%;
			height: 150rpx;
			border-radius: 20rpx;
		}
	}

	.celebrity {
		padding: 30rpx 30rpx 0rpx 30rpx;
		width: 100%;
		box-sizing: border-box;

		.celebrityContainer {
			width: 100%;
			background: #CFDFD0;
			box-shadow: 6rpx 8rpx 10rpx 0rpx rgba(150, 143, 143, 0.38), -6rpx -8rpx 10rpx 0rpx #FFFFFF;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			opacity: 1;
			padding: 10rpx 36rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
		}
	}

	.loveRoom {
		color: #FE4373;
		font-size: 28rpx;
	}

	.u-modal__content {
		padding-top: 0rpx !important;
	}

	.renewTitle {
		font-size: 32rpx;
		color: #333;
		text-align: center;
		font-weight: bold;
	}

	.indexTopText {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>