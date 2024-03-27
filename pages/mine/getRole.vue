<template>
	<view>
		<u-navbar :safeAreaInsetTop="true" title='获取角色' :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view v-if="showSearchBar" style="padding: 0rpx 30rpx; box-sizing: border-box;">
			<view class="myInput" @click="$u.route('pages/user/newSearch')">
				<view class="searchIcon">
					<text class="ri-search-line " style="font-size: 35rpx;color: #999999;"></text>
					<text style="color: #999999;font-size: 23rpx;margin-left: 5rpx;">搜索</text>
				</view>
			</view>
		</view>
		<view style="padding: 55rpx 10rpx 65rpx 40rpx;box-sizing: border-box;display: flex;flex-wrap: wrap;">
			<block v-for="(item,index) in listRoleDynasty" :key="index">
				<view @click="selectIndex = index;identity_id = item.identity_id"
					:style="{border:selectIndex ==index?'1px solid #FFA000':'1px solid #CCCCCC'}"
					style="padding: 20rpx 0 20rpx 13rpx;align-items: center;display: flex;;width: calc(100% / 2 - 30rpx);border-radius: 8rpx;border: 1px solid #CCCCCC;height: 168rpx;box-sizing: border-box;margin-right: 30rpx;margin-bottom: 30rpx;">
					<image :src="item.image" style="height: 128rpx;width: 96rpx;" mode="heightFix"></image>
					<view style="margin-left: 22rpx;">
						<view style="color: #323232;font-size: 36rpx;margin-top: 23rpx;">{{item.title}}</view>
						<view style="color: #808080;font-size: 28rpx;margin-top:16rpx;">{{item.content}}</view>
					</view>
				</view>
			</block>
		</view>
		<view style="padding:0rpx 38rpx;">
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
						<view style="color: #FFFFFF;font-size: 30rpx;">普通获取</view>
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
			<view v-if="selectType==1" :style="{display:preMatchData.general_match.remark==''?'none':'block'}"
				style="margin-top: 20rpx;font-size: 23rpx;color: #333;text-align: center;color: #E4551B;">
				注意：您今天已多次抽取，继续抽取价格已更新
			</view>
			<view v-if="selectType==2" :style="{display:preMatchData.rare_match.remark==''?'none':'block'}"
				style="margin-top: 20rpx;font-size: 23rpx;color: #333;text-align: center;color: #E4551B;">
				注意：您今天已多次抽取，继续抽取价格已更新
			</view>
			<view style="font-size: 30rpx;color: #999;text-align: center;margin-top: 36rpx;"
				v-if='preMatchData.length!=0'>
				（钱包剩余铜钱×{{money}}，稀有角色卡×{{preMatchData.rare_match.rare_match_prop_count}}）</view>
		</view>
		<!-- 确认角色 showRole-->
		<u-modal :show="showRole" :showConfirmButton="true" :background="'#fff'" :showCancelButton="true"
			confirmColor="#FFA000" confirmText="使用" cancelText="放弃" @cancel="showRole=false;" @confirm="roleConfirm">
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
							<view style="display: flex;align-items: center;flex-wrap: wrap;">
								<block v-for="(item2,index2) in role_fei.achievements.split(',')" :key="index2">
									<view
										style="margin-top: 15rpx;width: 125rpx;height: 50rpx;border-radius: 50rpx;text-align: center;line-height: 50rpx;color: #333;font-size: 28rpx;border: 1px solid #FFA000;margin-right: 15rpx;">
										{{item2}}
									</view>
								</block>
							</view>
						</view>
						<view class="rolecontent"
							style="color: #808080;font-size: 28rpx;margin-top: 26rpx;text-align: left;min-height: 80rpx;">
							{{role_fei.content ||'暂无介绍'}}
						</view>
						<view
							style="color: #333333;font-size: 28rpx;margin-bottom: 18rpx;text-align: left;margin-top: 18rpx;">
							稀有等级：<text class="family"
								style="color: #FFA000;font-size: 28rpx;">{{role_fei.mw_level||'无'}}</text></view>
						<view style="color: #333333;font-size: 28rpx;margin-bottom: 18rpx;text-align: left;">初始名望：<text
								class="family"
								style="color: #FFA000;font-size: 28rpx;">{{ role_fei.role_mw || '无' }}</text></view>
					</view>
				</scroll-view>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectIndex: -1,
				identity_id: "",
				listRoleDynasty: [],
				preMatchData: [],
				money: '',
				dynastyPopup: false,
				showRole: false,
				role_fei: [],
				selectType: 0,
				recharge: false,
				showSearchBar: true,
			}
		},
		onLoad() {
			this.getRoleList()
			this.getpreMatch()
			this.getMoney()
			this.setFontFamily()
			const currentPage = getCurrentPages();
			currentPage.forEach((item, index) => {
				if (item.route == 'pages/user/newSearch') {
					this.showSearchBar = false;
					return;
				}
			})
		},
		methods: {
			getRoleList() {
				this.$api("role.identity_list").then(res => {
					if (res.code == 1) {
						this.listRoleDynasty = res.data.identity_data
					} else if (res.code == -1) {
						this.deletion = true;
					}
				})
			},
			getpreMatch() {
				this.$api("role.preMatch").then(res => {
					console.log(res)
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
			//重新匹配
			handleRematch() {
				this.selectType = 1;
				this.obtainRole()
			},
			//稀有抽取
			extractRare() {
				this.selectType = 2;
				this.obtainRole()
			},
			obtainRole() {
				var that = this;
				if (that.identity_id == '') {
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
								"identity_id": that.identity_id
							}).then(res => {
								if (res.code == 1) {
									that.role_fei = res.data;
									uni.hideLoading();
									// that.fei_num = that.fei_num - 1;
									that.showRole = true;
									that.$api("user.info").then(userData1 => {
										that.money = userData1.data.money;
									})
									that.getpreMatch()
								} else if (res.code == 3001) {
									that.recharge = true;
									that.showRole = false;
								} else if (res.code == 2001) {
									uni.showToast({
										icon: "none",
										title: res.msg
									})
									that.recharge = false;
									that.showRole = false;
								} else {
									uni.showToast({
										icon: "none",
										title: res.msg
									})
									that.recharge = false;
									that.showRole = false;
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
								"identity_id": that.identity_id
							}).then(res => {
								if (res.code == 1) {
									that.role_fei = res.data;
									uni.hideLoading();
									// that.fei_num = that.fei_num - 1;
									that.showRole = true;
									that.$api("user.info").then(userData1 => {
										that.money = userData1.data.money;
									})
									that.getpreMatch()
								} else if (res.code == 3001) {
									that.recharge = true;
									that.showRole = false;
								} else if (res.code == 2001) {
									uni.showToast({
										icon: "none",
										title: res.msg
									})
									that.recharge = false;
									that.showRole = false;
								} else {
									uni.showToast({
										icon: "none",
										title: res.msg
									})
									that.recharge = false;
									that.showRole = false;
								}
								uni.hideLoading()
							})
						}
					})
				}
			},
			roleConfirm() {
				var that = this;
				that.$api('user.bindrole', {
					"role_id": this.role_fei.id
				}).then(res => {
					if (res.code === 1) {
						this.$u.route({
							type: 'navigateBack',
							delta: 1
						})
						that.showRole = false;
						uni.setStorageSync("noRole", false);
						that.$forceUpdate()
						that.getMoney()
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				})
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
		}
	}
</script>

<style lang="scss" scoped>
	.myInput {
		width: 100%;
		height: 72rpx;
		padding-left: 10rpx;
		box-sizing: border-box;
		position: relative;
		display: flex;
		align-items: center;
		z-index: 999;
		margin-top: 30rpx;
		background-image: url(@/static/sousuoBg.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: 100% 100%;

		.searchIcon {
			display: flex;
			align-items: center;
			position: absolute;
			left: 35rpx;
			top: 0;
			height: 72rpx;
			line-height: 72rpx;
		}
	}
</style>