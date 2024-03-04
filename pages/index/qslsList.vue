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
		<view class="publicList">
			<block v-for="(item,index) in comm_room_list" :key="index">
				<view class="publicItem" :style="{background:item.background}" @click="jump(item)">
					<view style="display: flex;align-items: center;">
						<text class="fontFamily" style="color: #543A1D;font-size: 30rpx;">{{item.room_name}}</text>
						<text
							style="font-size: 20rpx;padding-left: 10rpx;border-left: 1px solid #9DA9A5;margin-left: 10rpx;color: #9DA9A5;">{{item.public_type_str}}</text>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<text style="font-size: 25rpx;color: #501812;"
							v-if="roomListType=='jl'">{{item.type_str}}</text>
						<block v-if="item.nums!=0">
							<view class="userImages">
								<block v-for="(imgItem,imgIndex) in item.user_list" :key="imgIndex">
									<image class="userImageItem" :src="imgItem.avatar" mode="aspectFill"></image>
								</block>
								<text style="margin-left: 5rpx;font-size: 23rpx;"> <text>{{item.nums}}</text>
									人在线</text>
							</view>
						</block>
					</view>
				</view>
			</block>
		</view>
		<view style="padding: 30rpx 30rpx 30rpx 30rpx ;box-sizing: border-box;">
			<view class="items" v-for="(item,index) in user_room_list" :key="index" @click="jump(item)">
				<view style="display: flex;" v-if="roomListType=='jl'">
					<image style="width: 93rpx;height: 93rpx;border-radius: 50%;" :src="item.room_image"
						mode="aspectFill"></image>
					<view
						style="height: 93rpx;display: flex;flex-direction: column;justify-content: space-around;margin-left: 16rpx;flex: 1;">
						<view style="display: flex;align-items: center;">
							<text style="color: 25rpx;color: #000;font-weight: bold;">{{item.room_name}}</text>
							<text
								style="font-size: 20rpx;color: #666;margin-left: 12rpx;">{{item.room_owner.role_realname}}·{{item.room_owner.role_dynasty}}</text>
						</view>
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<view>
								<text style="font-size: 20rpx;color: #000;font-weight: 500;">{{item.type_str}}</text>
								<text
									style="font-size: 20rpx;padding-left: 10rpx;border-left: 1px solid #9DA9A5;margin-left: 10rpx;color: #9DA9A5;">{{item.public_type_str}}</text>
							</view>
							<view class="userImages" v-if="item.nums!=0">
								<block v-for="(imgItem,imgIndex) in item.user_list" :key="imgIndex">
									<image class="userImageItem" :src="imgItem.avatar" mode="aspectFill"></image>
								</block>
								<text style="margin-left: 5rpx;font-size: 23rpx;"> <text>{{item.nums}}</text>
									人在线</text>
							</view>
						</view>
					</view>
				</view>
				<view style="display: flex;" v-else>
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
								<text style="font-size: 20rpx;color: #000;font-weight: 500;">{{item.room_name}}</text>
								<text
									style="font-size: 20rpx;padding-left: 10rpx;border-left: 1px solid #9DA9A5;margin-left: 10rpx;color: #9DA9A5;">{{item.public_type_str}}</text>
							</view>
							<view class="userImages" v-if="item.nums!=0">
								<block v-for="(imgItem,imgIndex) in item.user_list" :key="imgIndex">
									<image class="userImageItem" :src="imgItem.avatar" mode="aspectFill"></image>
								</block>
								<text style="margin-left: 5rpx;font-size: 23rpx;"> <text>{{item.nums}}</text>
									人在线</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<feiqslsHit></feiqslsHit>
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
				user_room_list: []
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

		},
		methods: {
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
		width: 100vw;
		height: 100vh;
		background: #F8F8F8;
	}

	.lists {
		width: 100vw;
		height: 100vh;
		background: #F8F8F8;
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
		display: flex;
		align-items: center;
		padding: 10rpx;
		box-sizing: border-box;
		flex-wrap: wrap;

		.publicItem {
			height: 122rpx;
			border-radius: 20rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			padding: 23rpx 20rpx 16rpx 32rpx;
			justify-content: space-between;
			width: calc(100% / 2 - 20rpx);
			margin: 10rpx;


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
</style>