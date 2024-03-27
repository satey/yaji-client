<template>
	<view class="lists">
		<view class="header" style="">
			<u-navbar :title="title" :fixed="true" :safeAreaInsetTop="true" :placeholder="true" bgColor="transparent">
				<view slot="left">
					<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
				</view>
			</u-navbar>
			<block v-if="roomListType=='qsls'">
				<image style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;" src="@/static/qslsBg.png"
					mode="aspectFill">
				</image>
				<view style="position: relative;z-index: 9;">古代三月初三上巳节的传统习俗，最早可最追溯到周代 后发展成为一种聚会雅事，著名的有王羲之的兰亭集会
				</view>
			</block>
			<block v-if="roomListType=='jl'">
				<image style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;" src="@/static/jl.png"
					mode="aspectFill">
				</image>
				<view style="position: relative;z-index: 9;">诗词接龙是古代雅士常见的娱乐活动，后来更是成为雅 集活动中的固定节目。据传最早起源于汉代的成语接龙 亦有异曲同工之妙。
				</view>
			</block>
			<block v-if="roomListType=='fhl'">
				<image style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;" src="@/static/bgImg.png"
					mode="aspectFill">
				</image>
				<view style="position: relative;z-index: 9;">飞花令源于唐代，兴盛至今。选完令牌之后，轮流答含
					有令牌的古诗词，一般不超过7字，答不上为输。
				</view>
			</block>
		</view>
		<view style="height: 403rpx;"></view>
		<view style="text-align: center;" v-if="roomListType!='qsls'" @click="createRoom">
			<image src="../../static/chuangjian.png" style="width: 200rpx;height: 100rpx;" mode=""></image>
		</view>
		<view style="padding: 0rpx 20rpx;box-sizing: border-box;display: flex;flex: 1;">
			<view style="height: calc(100vh - 403rpx - 115rpx);width: 100%;display: flex;">
				<scroll-view style="width: 57%;margin-right: 20rpx;height: 100%;" scroll-y>
					<view class="publicList">
						<view class="publicItem lianxi" v-if="roomListType!='qsls'" @click="enterLianxi">
						</view>
						<block v-for="(item,index) in comm_room_list" :key="index">
							<view class="publicItem" :style="{background:item.background}" @click="jump(item)">
								<view style="display: flex;align-items: center;">
									<text class="fontFamily"
										style="color: #543A1D;font-size: 30rpx;">{{item.room_name}}</text>
									<text
										style="font-size: 20rpx;padding-left: 10rpx;border-left: 1px solid #9DA9A5;margin-left: 10rpx;color: #9DA9A5;">{{item.public_type_str}}</text>
								</view>
								<view style="display: flex;align-items: center;justify-content: space-between;">
									<text style="font-size: 25rpx;color: #501812;">
										<text v-if="item.type=='fhl'">飞花令</text>
										<text v-if="item.type=='cyjl'">成语接龙</text>
										<text v-if="item.type=='scjl'">诗词接龙</text>
									</text>
									<block v-if="item.nums!=0">
										<view class="userImages">
											<block v-for="(imgItem,imgIndex) in item.user_list" :key="imgIndex">
												<image class="userImageItem" :src="imgItem.avatar" mode="aspectFill">
												</image>
											</block>
											<text style="margin-left: 5rpx;font-size: 23rpx;">
												<text>{{item.nums}}</text>
												人在线</text>
										</view>
									</block>
								</view>
							</view>
						</block>
					</view>
					<view style="box-sizing: border-box;">
						<view class="items" v-for="(item,index) in user_room_list" :key="index" @click="jump(item)">
							<view>
								<view style="display: flex;">
									<image style="width: 93rpx;height: 93rpx;border-radius: 50%;" :src="item.room_image"
										mode="aspectFill"></image>
									<view
										style="height: 93rpx;display: flex;flex-direction: column;justify-content: space-around;margin-left: 16rpx;flex: 1;">
										<view style="display: flex;align-items: center;">
											<text style="color: 25rpx;color: #333;">{{item.room_name.slice(0,4)}}</text>
											<text
												style="font-size: 20rpx;color: #666;margin-left: 12rpx;">{{item.room_owner.name_str.slice(0,4)}}</text>
										</view>
										<view style="display: flex;justify-content: space-between;align-items: center;">
											<view>
												<text
													style="font-size: 20rpx;color: #000;font-weight: 500;">{{item.type_str}}</text>
												<text
													style="font-size: 20rpx;padding-left: 10rpx;border-left: 1px solid #9DA9A5;margin-left: 10rpx;color: #9DA9A5;">{{item.public_type_str}}</text>
											</view>

										</view>
									</view>
								</view>
								<view v-if="item.nums!=0"
									style="display: flex;align-items: center;justify-content: space-between;margin-top: 15rpx;">
									<view></view>
									<view class="userImages">
										<block v-for="(imgItem,imgIndex) in item.user_list" :key="imgIndex">
											<image class="userImageItem" :src="imgItem.avatar" mode="aspectFill">
											</image>
										</block>
										<text style="margin-left: 5rpx;font-size: 23rpx;"> <text>{{item.nums}}</text>
											人在线</text>
									</view>
								</view>
							</view>
							<view style="display: flex;" v-if="false">
								<image style="width: 93rpx;height: 93rpx;border-radius: 50%;" :src="item.room_image"
									mode="aspectFill"></image>
								<view
									style="height: 93rpx;display: flex;flex-direction: column;justify-content: space-around;margin-left: 16rpx;flex: 1;">
									<view style="display: flex;align-items: center;">
										<text
											style="color: 25rpx;color: #000;font-weight: bold;">{{item.room_owner.role_realname}}·{{item.room_owner.role_dynasty}}</text>
										<text style="font-size: 20rpx;color: #666;margin-left: 12rpx;"></text>
									</view>
									<view style="display: flex;justify-content: space-between;align-items: center;">
										<view>
											<text
												style="font-size: 20rpx;color: #000;font-weight: 500;">{{item.room_name}}</text>
											<text
												style="font-size: 20rpx;padding-left: 10rpx;border-left: 1px solid #9DA9A5;margin-left: 10rpx;color: #9DA9A5;">{{item.public_type_str}}</text>
										</view>
										<view class="userImages" v-if="item.nums!=0">
											<block v-for="(imgItem,imgIndex) in item.user_list" :key="imgIndex">
												<image class="userImageItem" :src="imgItem.avatar" mode="aspectFill">
												</image>
											</block>
											<text style="margin-left: 5rpx;font-size: 23rpx;">
												<text>{{item.nums}}</text>
												人在线</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<scroll-view class="rightInvite" scroll-y @scrolltolower="inviteChange">
					<block v-for="(item,index) in inviteList" :key="index">
						<view style="display: flex;margin-top: 15rpx;align-items: center;">
							<view style="width:52rpx ;height:52rpx ;border-radius: 50%;margin-right: 15rpx;">
								<image :src="item.avatar" style="width:100% ;height:100% ;border-radius: 50%;"
									mode="aspectFill" @click="$u.route('/pages/user/home',{user_id:item.id})"></image>
							</view>
							<view style="display: flex;align-items: center;width: calc(100% - 76rpx - 15rpx);">
								<view>
									<view
										style="font-size: 23rpx;color: #333;white-space: nowrap;width: 110rpx;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
										{{item.name_str}}
									</view>
									<view style="font-size: 20rpx;color: #333;margin-top: 15rpx;">胜：{{item.win_rate}}
									</view>
								</view>
								<view>
									<image @click="inviteClick(item)" src="../../static/yaoqingBtnBg.png"
										style="width: 90rpx;height: 36rpx;" mode="">
									</image>
								</view>
							</view>
						</view>
					</block>
					<u-empty v-if="!inviteList.length" icon="/static/iconImage/jilu.png" text="暂无数据" textColor="#a1a1a1"
						marginTop="100"></u-empty>
				</scroll-view>
			</view>
		</view>
		<feiqslsHit></feiqslsHit>
		<u-popup :show="lianxiShow" @close="lianxiShow = false" mode="center" :closeable="false" :round="20"
			:customStyle="{background:'transparent'}">
			<view class="report">
				<view style="display: flex;align-items: center;width: 100%;justify-content: center;margin-top: 25rpx;">
					<view class="reputation " style="font-family: font-test !important;">请选择
					</view>
				</view>
				<view style="display: flex;align-items: center;flex-direction: column;margin-top: 50rpx;">
					<view class="roomBtn" style="margin-bottom: 20rpx;" @click="typeClick('scjl')">诗词接龙</view>
					<view class="roomBtn" @click="typeClick('cyjl')">成语接龙</view>
				</view>

			</view>
		</u-popup>
		<!-- 创建房间 -->
		<u-popup :show="showCreateRoom" @close="showCreateRoom = false" mode="bottom" :closeable="false" :round="20"
			:customStyle="{background:'transparent'}">
			<view class="createRoomContainer">
				<view style="display: flex;">
					<text style="font-size: 32rpx;color: #666666;white-space: nowrap;">房间名称：</text>
					<view style="border-bottom: 1px solid #333333;padding-bottom:10rpx ;">
						<input type="text" v-model="createRoomName" placeholder="请输入房间名称" style="padding-bottom: 0;">
					</view>
				</view>
				<view class="roomType" style="display: flex;align-items: center;margin-top: 85rpx;"
					v-if="roomListType=='jl'">
					<text style="font-size: 32rpx;color: #666666;">房间内容：</text>
					<view style="display: flex;align-items: center;">
						<block v-for="(item,index) in createRoomDate.type" :key="index">
							<view style="display: flex;align-items: center;margin-left: 35rpx;"
								@click="createRoomType(item,index)">
								<block v-if="createRoomTypeIndex==index">
									<image src="../../static/iconImage/dian.png" style="width: 26rpx;height: 26rpx;"
										mode=""></image>
								</block>
								<block v-else>
									<view style="width: 26rpx;height: 26rpx;background: #D9D9D9;border-radius: 50rpx;">
									</view>
								</block>
								<text style="font-size: 32rpx;color: #FFA000;margin-left: 10rpx;font-weight: bold;"
									:style="{color:createRoomTypeIndex==index?'#FFA000':'',fontWeight:createRoomTypeIndex==index?'bold':'',}">{{item.value}}</text>
							</view>
						</block>
					</view>
				</view>
				<view class="roomType" style="display: flex;align-items: center;margin-top: 85rpx;">
					<text style="font-size: 32rpx;color: #666666;">房间类型：</text>
					<view style="display: flex;align-items: center;">
						<block v-for="(item,index) in createRoomDate.public_type" :key="index">
							<view style="display: flex;align-items: center;margin-left: 35rpx;"
								@click="createRoomIndex=index">
								<block v-if="createRoomIndex==index">
									<image src="../../static/iconImage/dian.png" style="width: 26rpx;height: 26rpx;"
										mode=""></image>
								</block>
								<block v-else>
									<view style="width: 26rpx;height: 26rpx;background: #D9D9D9;border-radius: 50rpx;">
									</view>
								</block>
								<text style="font-size: 32rpx;color: #FFA000;margin-left: 10rpx;font-weight: bold;"
									:style="{color:createRoomIndex==index?'#FFA000':'',fontWeight:createRoomIndex==index?'bold':'',}">{{item.value}}</text>
							</view>
						</block>
					</view>
				</view>
				<view style="color:#666666 ;font-size: 26rpx;margin-top: 50rpx;">
					开放房间将在公开列表中显示，其他用户可进入并参与互动。私密房将不在公开列表中展示，其他人仅可通过你的 邀请链接进入。
				</view>
				<view class="createBtn" @click="createRoom2">
					<block v-if="createRoomIndex==0">
						<text v-if="createRoomDate.need_pay ==1">花费{{createRoomDate.room_price}}铜钱创建</text>
						<text v-if="createRoomDate.need_pay ==0">免费创建</text>
					</block>
					<block v-else>
						<text>免费创建</text>
					</block>
				</view>
				<view style="color:#666666 ;font-size: 26rpx;margin-top: 50rpx;">
					注：如果已创建过1个同类型房间，再次创建需花费铜钱哦~
				</view>
			</view>
		</u-popup>
		<!-- 邀请提醒 -->
		<u-popup :show="inviteShow" @close="inviteShow = false" mode="center" :closeable="false" :round="20"
			:customStyle="{background:'transparent'}">
			<view class="report1" v-if="inviteReturnData.user_info!=undefined">
				<view class="reportBgBox">
					<view style="color: #FFA000;font-size: 30rpx;text-align: center;font-family: font-test !important;">
						提醒</view>
					<view style="margin-top: 30rpx;">
						{{inviteReturnData.user_info.role_realname}}·{{inviteReturnData.user_info.role_dynasty}}已接受您的邀请并进入房间
					</view>
				</view>
				<view
					style="display: flex;align-items: center;padding: 0rpx 52rpx;box-sizing: border-box;justify-content: space-between;margin-top: 33rpx;">
					<view class="reportBtn" @click="inviteShow = false;inviteReturnData=[]">等等再说</view>
					<view class="reportBtn" style="" @click="inviteEnterRoom">前往房间</view>
				</view>
			</view>
		</u-popup>
		<!-- 实名认证 -->
		<u-popup :show="empower" @close="empower = false" mode="center" :closeable="false" :round="20">
			<view class="log">
				<view style="text-align: center;font-size: 30rpx;color: #333;">实名认证</view>
				<view style="font-size: 28rpx;color: #333;margin-top: 89rpx;">首次创建公开房间需要完成实名认证。</view>
				<view style="display: flex;align-items: center;justify-content: center;margin-top: 137rpx;">
					<view @click="$u.route('/pages/authentication/authentication');empower = false"
						style="margin-right: 21rpx;width: 210rpx;height: 68rpx;background: #FFDDA4;border-radius: 8rpx;text-align: center;line-height: 68rpx;color: #FFA000;font-size: 30rpx;">
						去认证</view>
					<view @click="empower = false"
						style="margin-left: 21rpx;width: 210rpx;height: 68rpx;background: #FFA000;border-radius: 8rpx;text-align: center;line-height: 68rpx;color: #fff;font-size: 30rpx;">
						取消</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "lists",
		data() {
			return {
				title: "",
				roomListType: "",
				comm_room_list: [],
				user_room_list: [],
				inviteList: [],
				lianxiShow: false,
				empower: false,
				showCreateRoom: false,
				createRoomDate: [],
				createRoomIndex: 0,
				createRoomTypeIndex: 0,
				createRoomName: '',
				inviteShow: false,
				invitePage: 1,
				typeCode: 0,
				inviteItemData: [],
				inviteReturnData: []
			}
		},
		onLoad(option) {
			this.roomListType = option.type;
			switch (option.type) {
				case 'fhl':
					this.title = '飞花令'
					break;
				case 'jl':
					this.title = '接龙'
					break;
			}
			this.getList(option.type)
			this.setFontFamily()
			this.onRoomData()
			this.getInvite()
			this.setFontFamily()
			uni.$on("invite_accept", (inviteData) => {
				console.log(inviteData)
				this.inviteShow = true;
				this.inviteReturnData = inviteData.data;
			})
		},
		methods: {
			enterLianxi() {
				if (this.roomListType == 'fhl') {
					this.$u.route('pages/practice/practice', {
						roomType: 'fhl'
					})
				} else {
					this.lianxiShow = true;
					this.typeCode = 0
				}
			},
			inviteEnterRoom() {
				this.$u.route('pages/chat/chatRoom', {
					roomId: this.inviteReturnData.room_id,
					type: this.inviteReturnData.room_type
				})
				this.inviteShow = false;
				this.inviteReturnData = [];
			},
			createRoomType(item, index) {
				this.createRoomTypeIndex = index;
				this.$api("room.createRoomOption", {
					type: item.key
				}).then(res => {
					if (res.code == 1) {
						console.log(res)
						this.createRoomDate = res.data;
					}
				})
			},
			typeClick(type) {
				console.log(this.typeCode)
				switch (this.typeCode) {
					case 0:
						console.log("跳转")
						if (type == 'scjl') {
							this.$u.route('pages/practice/practice', {
								roomType: 'scjl'
							})
						} else {
							this.$u.route('pages/practice/practice', {
								roomType: 'cyjl'
							})
						}
						break;
					case 1:
						console.log("创建")
						this.yuCreateRoom(type)
						break;
					case 2:
						console.log("邀请")
						if (type == 'scjl') {
							this.$api("room.inviteUser", {
								to_user_id: this.inviteItemData.id,
								invite_type: "scjl"
							}).then(res => {
								this.inviteItemData = [];
								uni.showToast({
									icon: "none",
									title: res.msg
								})
							})
						} else {
							this.$api("room.inviteUser", {
								to_user_id: this.inviteItemData.id,
								invite_type: "cyjl"
							}).then(res => {
								this.inviteItemData = [];
								uni.showToast({
									icon: "none",
									title: res.msg
								})
							})
						}
						break;
				}
				this.lianxiShow = false;
			},
			inviteChange() {
				this.invitePage++;
				this.getInvite()
			},
			getList(type) {
				var that = this;
				that.$api("lists.roomList", {
					type: type
				}).then(res => {
					if (res.code == 1) {
						res.data.comm_room_list.forEach((item, index) => {
							switch (index % 3) {
								case 0:
									item.background = "linear-gradient(30deg, #EDFAD3, #FEC0B2, #FFADA5)"
									break;
								case 1:
									item.background = "linear-gradient(to right, #FFE8BE, #FFB665)"
									break;
								case 2:
									item.background = "linear-gradient(to right, #F1FFD4, #AFF3E0)"
									break;
							}
						})
						that.comm_room_list = res.data.comm_room_list;
						that.user_room_list = res.data.user_room_list;
					}
				})
			},
			createRoom2() {
				var that = this;
				var paremt = {};
				if (that.roomListType == 'fhl') {
					paremt = {
						type: 'fhl',
						room_name: that.createRoomName,
						public_type: that.createRoomDate.public_type[that.createRoomIndex].key
					}
				} else {
					paremt = {
						type: that.createRoomDate.type[that.createRoomTypeIndex].key,
						room_name: that.createRoomName,
						public_type: that.createRoomDate.public_type[that.createRoomIndex].key
					}
				}
				that.$api("room.createRoom", paremt).then(res => {
					that.showCreateRoom = false;
					if (res.code == 1) {
						that.createRoomName = '';
						if (res.data.room_info.public_type == 'private') {
							this.$u.route('pages/chat/chatRoom', {
								roomId: res.data.room_info.room_id,
								type: res.data.room_info.room_type
							})
						} else {
							this.getList(this.roomListType)
						}

					} else {
						that.createRoomName = '';
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				})
			},
			createRoom() {
				if (this.roomListType == 'jl') {
					// this.typeCode = 1;
					// this.lianxiShow = true;
					this.yuCreateRoom("jl")

				} else {
					this.yuCreateRoom('fhl')
				}
			},
			// 预创建
			yuCreateRoom(type) {
				this.$api("room.createRoomOption", {
					type: type
				}).then(res => {
					if (res.code == 1) {
						console.log(res)
						this.createRoomDate = res.data;
						console.log(this.createRoomDate)
						if (res.data.is_real_auth == 0) {
							this.empower = true;
						} else if (res.data.is_real_auth == 1) {
							this.showCreateRoom = true;
						}
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
			inviteClick(item) {
				if (this.roomListType == 'jl') {
					this.typeCode = 2;
					this.lianxiShow = true;
					this.inviteItemData = item;
				} else {
					this.$api("room.inviteUser", {
						to_user_id: item.id,
						invite_type: "fhl"
					}).then(res => {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					})
				}
			},
			getInvite() {
				this.$api("room.getStrangerInviteList", {
					page: this.invitePage,
					type: this.roomListType,
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.inviteList = [...this.inviteList, ...res.data.list];
					}
				})
			},
			//跳转
			jump(item) {
				console.log(item)
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
				var that = this;
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
						that.getList(that.roomListType)
						clearTimeout(time)
					}, 800)
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
		width: 100%;
		height: 100%;
		background: #F8F8F8;
	}

	.roomBtn {
		width: 312rpx;
		height: 85rpx;
		text-align: center;
		line-height: 85rpx;
		color: #333;
		font-size: 32rpx;
		background-image: url(@/static/btnimg.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
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

	.report {
		width: 540rpx;
		height: 363rpx;
		border-radius: 10rpx;
		background-image: url(/static/lianxiShowBg.png);
		background-size: 100% 100%;
		background-position: 100% 100%;
		background-repeat: no-repeat;
	}

	.reputation {
		font-size: 35rpx;
		color: #333333;
		position: relative;
		z-index: 11;
		text-align: center;
		font-family: font-test !important;

		&::after {
			content: " ";
			width: 100%;
			background: #8FFF00;
			height: 16rpx;
			position: absolute;
			left: 0;
			bottom: 0%;
			transform: translateY(-10%);
			z-index: -1;
		}
	}

	.lists {
		min-width: 100%;
		min-height: 100vh;
		height: 100%;
		background: #F8F8F8;
		display: flex;
		flex-direction: column;
	}

	.rightInvite {
		padding: 0rpx 15rpx 0 15rpx;
		box-sizing: border-box;
		border-radius: 20rpx;
		border: 1px solid #FFA000;
		width: calc(100% - 57% - 20rpx);
		background: linear-gradient(rgba(255, 221, 164, 1), rgba(255, 221, 164, 0));
	}

	.lianxi {
		background-image: url(/static/lianxibg.png);
		background-repeat: no-repeat;
		background-position: 100% 100%;
		background-size: 100% 100%;
	}

	.header {
		width: 100vw;
		height: 403rpx;
		position: absolute;
		top: 0;
		left: 0;
		padding: 0rpx 39rpx 67rpx 39rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: flex-end;
		box-sizing: border-box;
		color: #333;
		font-size: 28rpx;
	}

	.fontFamily {
		font-family: font-test !important;
	}

	.userImages {
		display: flex;
		align-items: center;
		font-size: 23rpx;
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

	.publicList {
		box-sizing: border-box;

		.publicItem {
			height: 122rpx;
			border-radius: 20rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			padding: 23rpx 20rpx 16rpx 32rpx;
			justify-content: space-between;
			width: 100%;
			margin-bottom: 15rpx;


		}
	}

	.items {
		padding: 33rpx 20rpx 18rpx 32rpx;
		border-radius: 20rpx;
		margin-bottom: 25rpx;
		display: flex;
		flex-direction: column;
		background: #fff;
	}

	// 创建
	.createRoomContainer {
		width: 100vw;
		background: #fff;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		padding: 85rpx 25rpx;
		box-sizing: border-box;

		.createBtn {
			width: 490rpx;
			height: 85rpx;
			line-height: 85rpx;
			text-align: center;
			color: #fff;
			font-size: 36rpx;
			border-radius: 43rpx;
			background-image: url(@/static/iconImage/btnBg2.png);
			background-position: 100% 100%;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			margin: 0 auto;
			margin-top: 97rpx;
		}
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