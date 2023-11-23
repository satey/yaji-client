<template>
	<view>
		<view class="trtc-video-area">
			<view class="trtc-video-view" id='root'>
				<trtc-remote-view v-if="remoteUserId" :userId="remoteUserId" :viewId="remoteUserId"
					style="height: 400rpx; flex: 1"></trtc-remote-view>
			</view>
		</view>
		<button @click="start" style="margin-top: 50rpx;">创建聊天室</button>
		<view class="">
			<view>
				房间id:{{roomId}}
			</view>
			<view>
				用户id:{{userId}}
			</view>
		</view>
		<button @click="closeTrtcCloud" style="margin-top: 50rpx;">关闭聊天室</button>
		<view class="aaaaa">
			<input type="text" placeholder="房间号" v-model="inputRoomId" style="border: 1px solid #ccc;padding: 10rpx;" />
			<input type="text" placeholder="用户id" v-model="inputUserId"
				style="border: 1px solid #ccc;padding: 10rpx;margin-top: 10rpx;" />
			<button @click="addUserRoom">加入房间</button>
		</view>
	</view>
</template>

<script>
	import TrtcCloud from '@/TrtcCloud/lib/index';
	import permision from "@/TrtcCloud/permission.js";
	import genTestUserSig from '@/debug/GenerateTestUserSig';
	import TrtcLocalView from '@/TrtcCloud/view/TrtcLocalView';
	import TrtcRemoteView from '@/TrtcCloud/view/TrtcRemoteView';
	import {
		TRTCAudioQuality
	} from '@/TrtcCloud/lib/TrtcDefines';
	import {
		TRTCAppScene,
		TRTCRoleType
	} from '@/TrtcCloud/lib/TrtcDefines';

	export default {
		components: {
			TrtcLocalView: TrtcLocalView,
			TrtcRemoteView: TrtcRemoteView,
		},
		data() {
			return {
				trtcCloud: null,
				sdkAppId: 0,
				userSig: '',
				roomId: Math.floor(Math.random() * 100000),
				userId: 'user_' + Math.floor(Math.random() * 100000).toString(),
				inputRoomId: "",
				inputUserId: "",
				remoteUserId: ""
			};
		},
		onLoad() {
			this.init()
		},
		onUnload() {
			this.closeTrtcCloud()
		},
		methods: {
			//初始化
			init() {
				if (uni.getSystemInfoSync().platform === 'android') {
					permision.requestAndroidPermission('android.permission.RECORD_AUDIO');
				}
				const {
					sdkAppId,
					userSig
				} = genTestUserSig(this.userId);
				if (!sdkAppId || !userSig) {
					uni.showToast({
						title: '请填写 sdkAppId、userSig',
						icon: 'none'
					});
				}
				this.sdkAppId = sdkAppId;
				this.userSig = userSig;
				uni.showToast({
					title: '创建实例 ',
					icon: 'none',
				});
				this.trtcCloud = TrtcCloud.createInstance();
				this.handleEvents();
			},
			//开启聊天室
			start() {
				this.addRoom(this.userId, this.roomId, TRTCRoleType.TRTCRoleAnchor)
			},
			addUserRoom() {
				if (this.inputUserId == "") {
					uni.showToast({
						title: "请输入用户id"
					})
					return;
				}
				if (this.inputRoomId == "") {
					uni.showToast({
						title: "请输入房间id"
					})
					return;
				}
				this.addRoom(this.inputUserId, this.inputRoomId, TRTCRoleType.TRTCRoleAudience)
				this.remoteUserId = this.inputUserId;
				this.trtcCloud.startRemoteView(this.remoteUserId, TRTCVideoStreamType.TRTCVideoStreamTypeBig, this
					.remoteUserId)
			},
			//加入房间
			addRoom(userId, roomId, type) {
				const params = {
					sdkAppId: this.sdkAppId, // Please replace with your own sdkAppId
					userId: userId, // Please replace with your own userid
					roomId: roomId, // Please replace with your own room number 
					userSig: this.userSig, // Please replace with your own userSig
					role: type,
				};
				this.trtcCloud.enterRoom(params, TRTCAppScene.TRTCAppSceneVoiceChatRoom);
				this.startLocalAudio(TRTCAudioQuality.TRTCAudioQualityDefault)
			},
			startLocalAudio() {
				this.trtcCloud.startLocalAudio();
			},
			//关闭聊天室
			closeTrtcCloud() {
				if (this.trtcCloud) {
					TrtcCloud.destroyInstance();
					this.trtcCloud = null;
					uni.showToast({
						title: '销毁实例',
						icon: 'none'
					});
				}
			},
			//聊天室监听状态事件
			handleEvents() {
				this.trtcCloud.on('onWarning', (res) => {
					console.log('- onWarning: ', JSON.stringify(res));
				});
				this.trtcCloud.on('onError', (res) => {
					console.log('- onError: ', JSON.stringify(res));
				});
				this.trtcCloud.on("onEnterRoom", (result) => {
					if (result > 0) {
						uni.showToast({
							title: `进房成功，耗时: ${result}ms`,
							icon: 'none'
						});
					}
				});
				this.trtcCloud.on("onRemoteUserEnterRoom", (result) => {
					uni.showToast({
						title: `有人加入房间`,
						icon: 'none'
					});
				});
				this.trtcCloud.on('onUserAudioAvailable', (res) => {
					const {
						userId,
						available
					} = res;
					console.log(res)
				});
			}
		}
	}
</script>

<style lang="scss">
	.aaaaa {
		border: 1px solid red;
		padding: 30rpx;
		box-sizing: border-box;
	}

	.trtc-video-view {
		width: 300rpx;
		height: 300rpx;
		border: 1px solid red;
	}
</style>