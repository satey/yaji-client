<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="px-4" style="height: 100%;">
		<u-navbar bgColor="transparent" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view class="content" style="position: relative;">
			<view v-if="userRole.role_lock!=0"
				style="width: 100rpx;height: 111rpx;position: absolute;right: 22rpx;top: 18rpx;z-index: 1;">
				<image style="width:100% ;height: 100%;" src="@/static/iconImage/block.png" mode=""></image>
				<view
					style="position: absolute;top:0;left:0;width: 100%;height: 100%;text-align: center;line-height: 111rpx;font-size: 30rpx;color: #fff;font-family: font-test !important;">
					永久</view>
			</view>
			<scroll-view v-if="userRole.role_id !=''"
				style="height: 808rpx;padding-bottom: 150rpx;box-sizing: border-box;position: relative;"
				scroll-y="true">
				<view class="roleName">{{userRole.realname}}</view>
				<view style="color: #333333;font-size: 28rpx;margin-bottom: 18rpx;">{{userRole.gender == 1?'男':"女"}}
					{{userRole.dynasty||"未知朝代"}}
				</view>
				<view style="color: #333333;font-size: 28rpx;margin-bottom: 18rpx;">别称：{{userRole.aliasnames || "无"}}
				</view>
				<view style="color: #333333;font-size: 28rpx;margin-bottom: 18rpx;">身份：{{userRole.achievements || "无"}}
				</view>
				<view style="color: #333333;font-size: 28rpx;margin-bottom: 18rpx;">称号：{{userRole.titles || "无"}}</view>
				<view style="color: #333333;font-size: 28rpx;margin-bottom: 18rpx;">
					{{ userRole.content || '暂无介绍' }}
				</view>
				<view style="color: #333333;font-size: 28rpx;margin-bottom: 18rpx;">稀有等级：<text class="family"
						style="color: #FFA000;font-size: 28rpx;">{{userRole.mw_level}}</text></view>
				<view style="color: #333333;font-size: 28rpx;margin-bottom: 18rpx;">初始名望：<text class="family"
						style="color: #FFA000;font-size: 28rpx;">{{ userRole.role_mw || '无' }}</text></view>
				<view style="color: #333333;font-size: 28rpx;margin-bottom: 18rpx;">获得时间：<text
						style="color: #FFA000;font-size: 28rpx;">{{userRole.role_time}}</text></view>
			</scroll-view>
			<view v-else
				style="width: 100%;height: 100%;display: flex;flex-direction: column;align-items: center;justify-content: center;">
				<view class="family" style="font-size: 46rpx;color: #FFA000;">没有角色</view>
				<view style="font-size: 30rpx;color: #FFA000;margin-top: 28rpx;">您还没有角色，请获取角色</view>
			</view>
		</view>
		<view style="padding:0rpx 38rpx;margin-top: 42rpx;">
			<view style="display: flex;align-items: center;justify-content: center;" v-if="preMatchData.length !=0">
				<block v-if="preMatchData.general_match.free_match_count > 0">
					<view @click="handleHuoQu()"
						style="margin-right: 28rpx;width: 260rpx;height: 102rpx;border-radius: 16rpx;background: #FFA000;display: flex;flex-direction: column;align-items: center;justify-content: center;">
						<view style="color: #FFFFFF;font-size: 30rpx;">重新穿越</view>
						<view style="color: #FFFFFF;font-size: 30rpx;">
							免费{{preMatchData.general_match.free_match_count}}次</view>
					</view>
				</block>
				<block v-else>
					<view @click="handleRematch()"
						style="margin-right: 28rpx;width: 260rpx;height: 102rpx;border-radius: 16rpx;background: #FFA000;display: flex;flex-direction: column;align-items: center;justify-content: center;">
						<view style="color: #FFFFFF;font-size: 30rpx;">重新穿越</view>
						<view style="display: flex;align-items: center;">
							<image src="../../static/qian.png" style="width: 33rpx;height: 33rpx;" mode=""></image>
							<text
								style="color: #FFFFFF;font-size: 30rpx;margin-left: 10rpx;">×{{preMatchData.general_match.next_price}}</text>
						</view>
					</view>
				</block>
				<view @click="extractRare()"
					style="position: relative;;margin-left: 28rpx;width: 260rpx;height: 102rpx;border-radius: 16rpx;background: #FF7A00;display: flex;flex-direction: column;align-items: center;justify-content: center;">
					<image src="../../static/iconImage/xianshi.png"
						style="position: absolute;top: 0;left: 0;width: 70rpx;height: 70rpx;z-index: 1;" mode="">
					</image>
					<view style="color: #FFFFFF;font-size: 30rpx;font-family: font-test !important;">获取稀有角色</view>
					<view style="display: flex;align-items: center;">
						<image src="../../static/qian.png" style="width: 33rpx;height: 33rpx;" mode=""></image>
						<text
							style="color: #FFFFFF;font-size: 30rpx;margin-left: 10rpx;">×{{preMatchData.rare_match.next_price}}</text>
					</view>
				</view>
			</view>
			<!-- 后续开放 -->
			<!-- <view v-if="fei_num <= 0" class="selectBtn" @click="handleHuoQu()">重新获取({{ price }}铜钱)
			</view>
			<view v-if="fei_num > 0" class="selectBtn" @click="handleRematch()">重新穿越
				免费({{fei_num}}次)
			</view> -->
			<view style="font-size: 30rpx;color: #999;text-align: center;margin-top: 36rpx;"
				v-if='preMatchData.length!=0'>
				（钱包剩余铜钱×{{money}}，稀有角色卡×{{preMatchData.rare_match.rare_match_prop_count}}）</view>
		</view>
		<view class="tips text-base" style="margin-top: 36rpx;">
			<!-- <text class="ri-error-warning-fill" style="font-size: 35rpx;color: #999999;margin-right: 5rpx;"></text> -->
			<text style="font-size: 28rpx;color: #666666;">*每个角色都是全服唯一，稀有度4级以上为稀有角色。</text>
		</view>
		<view class="tips text-base" style="margin-top: 20rpx;" v-if="userRole.role_lock==0">
			<!-- <text class="ri-error-warning-fill" style="font-size: 35rpx;color: #999999;margin-right: 5rpx;"></text> -->
			<text style="font-size: 28rpx;color: #666666;">*连续90天未登录使用，角色将被回收。<text style="color: #FFA000;"
					@click="showCard=true">使用永久卡</text></text>
		</view>
		<!-- 选择朝代 -->
		<u-modal :show="dynastyPopup" :showConfirmButton="true" :background="'#fff'" :showCancelButton="true"
			confirmColor="#FFA000" @cancel="dynastyPopup=false" @confirm="dynastyConfirm">
			<view style="width: 100%;">
				<view style="display: flex;align-items: center;justify-content: center;">
					<view style="position: relative;text-align: center;display: inline;margin: 0 auto;">
						<text
							style="color: #333;font-size:32rpx ;position: relative;z-index: 1;font-family: font-test !important;">选择身份</text>
						<text
							style="width: 100%;height: 13rpx;background: #FFA000;position: absolute;left: 0;bottom: 0;"></text>
					</view>
				</view>
				<scroll-view scroll-y="true" class="myScroll">
					<view class="dynastyBox">
						<view class="dynastyItem" :class="index==selectIndex?'dynastyItemActive':'dynastyItem'"
							@click="selectDynasty(index,item.identity_id,item.title)"
							v-for="(item, index) in listRoleDynasty" :key="index">
							<view style="display: flex;align-items: center;">
								<image :src="item.image" mode="heightFix"
									style="width: 50rpx;height: 65rpx;margin-right: 22rpx;"></image>
								<view style="font-size: 36rpx;font-weight: 400;color: #323232;">{{item.title}}</view>
							</view>
							<view style="font-size: 28rpx;font-weight: 400;color: #808080;">{{item.content}}</view>
						</view>
					</view>
				</scroll-view>
				<view v-if="selectType==1" :style="{display:preMatchData.general_match.remark==''?'none':'block'}"
					style="margin-top: 20rpx;font-size: 23rpx;color: #333;">
					您今天已多次抽取，继续抽取需花费<text style="color: #FFA000;">{{preMatchData.general_match.next_price}}</text>铜钱/次
				</view>
				<view v-if="selectType==2" :style="{display:preMatchData.rare_match.remark==''?'none':'block'}"
					style="margin-top: 20rpx;font-size: 23rpx;color: #333;">
					您今天已多次抽取，继续抽取需花费<text style="color: #FFA000;">{{preMatchData.rare_match.next_price}}</text>铜钱/次
				</view>
			</view>
		</u-modal>
		<!-- 充值 -->
		<u-modal :show="recharge" :showConfirmButton="true" :background="'#fff'" :showCancelButton="true"
			confirmColor="#FFA000" confirmText="充值" cancelText="放弃" @cancel="recharge=false"
			@confirm="$u.route('/pages/mine/recharge')">
			<view style="display: flex;flex-direction: column;">
				<view style="text-align: center;font-size: 32rpx;color: #323232;font-weight: bold;">铜钱不足</view>
				<view style="color:#999;font-size: 26rpx;margin-top: 30rpx;">
					<text>铜钱不足,是否前往充值页面</text>
				</view>
			</view>
		</u-modal>
		<!-- 确认角色 showRole-->
		<u-modal :show="showRole" :showConfirmButton="true" :background="'#fff'" :showCancelButton="true"
			confirmColor="#FFA000" confirmText="使用" cancelText="放弃" @cancel="showRole=false;dynastyPopup = true;"
			@confirm="roleConfirm">
			<view class="w-full text-center" style="background: #fff;">
				<view style="display: flex;align-items: center;justify-content: center;">
					<view style="position: relative;text-align: center;display: inline;margin: 0 auto;">
						<text
							style="color: #333;font-size:32rpx ;position: relative;z-index: 1;font-family: font-test !important;">获得角色</text>
						<text
							style="width: 100%;height: 13rpx;background: #FFA000;position: absolute;left: 0;bottom: 0;"></text>
					</view>
				</view>
				<scroll-view scroll-y="true" class="myScroll2"
					style="background: rgba(255, 221, 164, 0.40);border-radius: 20rpx;margin-top: 20rpx;padding: 30rpx;box-sizing: border-box;height: 669rpx;">
					<view>
						<view style="display: flex;align-items: center;flex-wrap: wrap;">
							<view>
								<text
									style="font-size: 36rpx;color: #323232;margin-right: 10rpx;">{{role_fei.realname}}</text>
								<!-- <text
									style="font-size: 28rpx;color: #808080;margin-left: 20rpx">{{role_fei.gender==1?'男':'女'}}</text>
								<text
									style="font-size: 28rpx;color: #808080;margin-left: 20rpx">{{role_fei.dynasty}}</text> -->
							</view>

							<!-- <view style="display: flex;align-items: center;">
								<text style="font-size: 28rpx;color: #808080;">名望：</text>
								<text style="font-size: 28rpx;color: #FFA000;">{{role_fei.role_mw}}</text>
							</view> -->
						</view>
						<view v-if="role_fei.length != 0"
							style="padding: 23rpx 0rpx 0rpx 0rpx;box-sizing: border-box;font-size: 28rpx;color: #808080;text-align: left;">
							<view style="font-size: 28rpx;color: #808080;">
								<text style="margin-right: 20rpx;">{{role_fei.dynasty}}</text>
								<text>{{role_fei.birthyear||'?'}}年-{{role_fei.deathyear||'?'}}年</text>
							</view>
							<view style="margin-top: 15rpx;display: flex;align-items: center;flex-wrap: wrap;">
								<block v-for="(item2,index2) in role_fei.achievements.split(',')" :key="index2">
									<view
										style="width: 125rpx;height: 50rpx;border-radius: 50rpx;text-align: center;line-height: 50rpx;color: #333;font-size: 28rpx;border: 1px solid #FFA000;margin-right: 15rpx;">
										{{item2}}
									</view>
								</block>

							</view>
						</view>
						<view class="rolecontent"
							style="color: #808080;font-size: 28rpx;margin-top: 26rpx;text-align: left;min-height: 80rpx;">
							{{role_fei.content ||'暂无介绍'}}
						</view>
						<view style="color: #333333;font-size: 28rpx;margin-bottom: 18rpx;text-align: left;margin-top: 18rpx;">稀有等级：<text class="family"
								style="color: #FFA000;font-size: 28rpx;">{{role_fei.mw_level||'无'}}</text></view>
						<view style="color: #333333;font-size: 28rpx;margin-bottom: 18rpx;text-align: left;">初始名望：<text class="family"
								style="color: #FFA000;font-size: 28rpx;">{{ role_fei.role_mw || '无' }}</text></view>
					</view>
				</scroll-view>
			</view>
		</u-modal>
		<u-popup :show="showCard" @close="showCard = false" mode="center" :closeable="false" :round="20">
			<view class="report">
				<view class="reportBgBox">
					<view style="text-align: center;font-size: 32rpx;color: #FFA000;font-family: font-test !important;">
						使用永久卡</view>
					<view style="margin-top: 30rpx;">确定要使用一张永久卡吗？使用后当 前角色不会因为自动回收机制被回收。</view>
				</view>
				<view
					style="display: flex;align-items: center;padding: 0rpx 52rpx;box-sizing: border-box;justify-content: space-between;margin-top: 33rpx;">
					<view class="reportBtn" @click="showCard = false">取消</view>
					<view class="reportBtn" @click="roleLock">确定</view>
				</view>
			</view>
		</u-popup>
		<u-popup :show="showNone" @close="showNone = false" mode="center" :closeable="false" :round="20">
			<view class="report">
				<view class="reportBgBox">
					<view style="text-align: center;font-size: 32rpx;color: #FFA000;font-family: font-test !important;">
						道具不足</view>
					<view style="margin-top: 30rpx;">{{noneText}}</view>
				</view>
				<view
					style="display: flex;align-items: center;padding: 0rpx 52rpx;box-sizing: border-box;justify-content:center;margin-top: 33rpx;">
					<view class="reportBtn" @click="showNone = false">知道了</view>
				</view>
			</view>
		</u-popup>
		<feiqslsHit></feiqslsHit>
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
				money: 0,
				showCard: false,
				showNone: false,
				noneText: "",
				preMatchData: [],
				selectType: 0,
			}
		},
		onLoad(option) {
			let that = this
			that.getUserRole()
			that.getRoleDynasty()
			that.getMoney()
			that.setFontFamily();
			that.getpreMatch()
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo,
			})
		},
		mounted() {
			let that = this
			let time = uni.getStorageSync('times')
			that.time = time
			if (that.time == 0) {
				that.isXians = true
				that.istime = false
			}
			that.init()
		},
		methods: {
			getpreMatch() {
				this.$api("role.preMatch").then(res => {
					if (res.code == 1) {
						this.preMatchData = res.data
					}
				})
			},
			getMoney() {
				let that = this
				that.$api('user.info').then(res => {
					if (res.code == 1) {
						that.money = res.data.money;
						uni.setStorageSync("userInfo", res.data)
					}
				})
			},
			//永久卡
			roleLock() {
				this.$api("role.roleLock").then(res => {
					if (res.code == 1) {
						this.showCard = false;
						this.getUserRole()
						this.$forceUpdate()
						this.getMoney()
					} else if (res.code == 0) {
						this.showCard = false;
						this.noneText = res.msg;
						this.showNone = true;
					}
				})
			},
			//确认角色
			roleConfirm() {
				var that = this;
				that.$api('user.bindrole', {
					"role_id": this.role_fei.id
				}).then(res => {
					if (res.code === 1) {
						that.showRole = false;
						that.dynastyPopup = true;
						uni.setStorageSync("noRole", false);
						that.getUserRole()
						that.$forceUpdate()
						that.getMoney()
					}
				})
			},
			//确认朝代
			dynastyConfirm() {
				var that = this;
				if (that.selectId == '') {
					uni.showToast({
						icon: "none",
						title: "请选择身份"
					})
					return;
				}
				uni.showLoading({
					title: '获取中'
				})
				if (that.selectType == 1) {
					that.$api("user.info").then(userData => {
						var gender = userData.data.gender;
						that.$forceUpdate()
						if (userData.code == 1) {
							that.$api('role.match', {
								"gender": userData.data.gender,
								"identity_id": that.selectId
							}).then(res => {
								if (res.code == 1) {
									that.role_fei = res.data;
									that.getpreMatch()
									uni.hideLoading();
									// that.fei_num = that.fei_num - 1;
									that.showRole = true;
									that.dynastyPopup = false;
									that.$api("user.info").then(userData1 => {
										that.money = userData1.data.money;
									})
								} else if (res.code == 3001) {
									that.recharge = true;
									that.showRole = false;
									that.dynastyPopup = false;
								} else if (res.code == 2001) {
									uni.showToast({
										icon: "none",
										title: res.msg
									})
									that.recharge = false;
									that.showRole = false;
									that.dynastyPopup = false;
								} else{
									uni.showToast({
										icon: "none",
										title: res.msg
									})
									that.recharge = false;
									that.showRole = false;
									that.dynastyPopup = false;
								}
								uni.hideLoading()
							})
						}
					})
				} else {
					that.$api("user.info").then(userData => {
						var gender = userData.data.gender;
						that.$forceUpdate()
						if (userData.code == 1) {
							that.$api('role.rareMatch', {
								"gender": userData.data.gender,
								"identity_id": that.selectId
							}).then(res => {
								if (res.code == 1) {
									that.role_fei = res.data;
									that.getpreMatch()
									uni.hideLoading();
									// that.fei_num = that.fei_num - 1;
									that.showRole = true;
									that.dynastyPopup = false;
									that.$api("user.info").then(userData1 => {
										that.money = userData1.data.money;
									})
								} else if (res.code == 3001) {
									that.recharge = true;
									that.showRole = false;
									that.dynastyPopup = false;
								} else if (res.code == 2001) {
									uni.showToast({
										icon: "none",
										title: res.msg
									})
									that.recharge = false;
									that.showRole = false;
									that.dynastyPopup = false;
								} else{
									uni.showToast({
										icon: "none",
										title: res.msg
									})
									that.recharge = false;
									that.showRole = false;
									that.dynastyPopup = false;
								}
								uni.hideLoading()
							})
						}
					})
				}

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
				this.selectType = 1;
			},
			//稀有抽取
			extractRare() {
				this.dynastyPopup = true;
				this.selectType = 2;
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
				that.$api('user.info').then(res => {
					if (res.code === 1) {
						if (res.data.achievements != null) {
							if (res.data.achievements.indexOf(",") == -1) {
								that.tags = res.data.achievements
							} else {
								that.tags = res.data.achievements.split(",")
							}
						}
						that.userRole = res.data;
						// that.fei_num = res.data.choose_num
						that.showUserRole = true
					} else {
						that.showUserRole = false
					}
				})
			},
			async getRoleDynasty() {
				let that = this;
				that.$api("role.identity_list").then(res => {
					console.log(res)
					if (res.code == 1) {
						that.listRoleDynasty = res.data.identity_data
					} else if (res.code == -1) {
						that.deletion = true;
					}
				})
				// that.$api('role_dynasty.lists').then(res => {
				// 	if (res.code === 1) {
				// 		that.listRoleDynasty = res.data
				// 	}
				// })
			},
			// 重新获取
			handleHuoQu() {
				let that = this;
				if (this.preMatchData.general_match.free_match_count <= 0) {
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
				} else {
					that.handleRematch()
				}
			},
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

	.content {
		background-image: url(@/static/iconImage/jiaoseBg.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		padding: 65rpx 53rpx;
		box-sizing: border-box;
		position: relative;
		height: 808rpx;
		overflow: hidden;

		.contentBg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}

		.roleName {
			font-size: 36rpx;
			color: #FFA000;
			font-family: font-test !important;
			margin-bottom: 18rpx;
		}


	}

	.selectBtn {
		background-image: url(@/static/iconImage/btnBg2.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: 100% 100%;
		margin: 0 auto;
		width: 490rpx;
		height: 72rpx;
		line-height: 72rpx;
		color: #fff;
		text-align: center;
		line-height: 72rpx;
	}

	.family {
		font-family: font-test !important;
	}

	// -------------------
	.container {
		flex: 1;
		height: 0;
		// background: #fff;
		border-radius: 25rpx;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		// padding: 50rpx 0rpx 160rpx 0rpx;

		.contentHead {
			text-align: center;
			display: flex;
			text-align: center;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			position: relative;
			padding-bottom: 50rpx;
			background: #fff;
			padding-top: 55rpx;
			border-top-left-radius: 25rpx;
			border-top-right-radius: 25rpx;
			border-bottom-left-radius: 5rpx;
			border-bottom-right-radius: 5rpx;

			.name {
				color: #5F5D5D;
				font-weight: bold;
				font-size: 56rpx;
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
			// height: calc(100% - 14%);
			padding-top: 10rpx;
			box-sizing: border-box;
			background: #fff;
			margin-top: -4px;
			padding-bottom: 50rpx;
			border-bottom-left-radius: 25rpx;
			border-bottom-right-radius: 25rpx;
			border-top-left-radius: 5rpx;
			border-top-right-radius: 5rpx;

			.types {
				display: flex;
				align-items: center;
				justify-content: center;
				color: #808080;
				font-size: 28rpx;

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

	.myScroll {
		width: 100%;
	}

	.dynastyBox {
		width: 100%;
		box-sizing: border-box;
	}

	.u-modal__content {
		padding: 0 !important;
	}

	.u-modal__content {
		padding: 0 !important;
	}

	.dynastyItem {
		margin-top: 20rpx;
		width: 100%;
		border: 1px solid #CCCCCC;
		border-radius: 20rpx;
		box-sizing: border-box;
		transition: all 0.3s;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.dynastyItemActive {
		border: 1px solid #FFA000;
	}

	.rolecontent {
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
	}

	.reportBgBox {
		width: 526rpx;
		height: 315rpx;
		background-image: url(@/static/iconImage/bgimg.png);
		background-position: 100% 100%;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		padding: 50rpx 30rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		color: #FFA000;
		line-height: 40rpx;
	}

	.reportBtn {
		width: 190rpx;
		height: 85rpx;
		background: #FFDDA4;
		border-radius: 48px 48px 48px 48px;
		opacity: 1;
		border: 1px solid #FFA000;
		line-height: 85rpx;
		text-align: center;
		font-size: 36rpx;
		font-weight: bold;
		color: #FFA000;
	}
</style>