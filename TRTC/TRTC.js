// #ifdef APP
import TrtcCloud from '@/TrtcCloud/lib/index';
import permision from "@/TrtcCloud/permission.js";
import genTestUserSig from '@/debug/GenerateTestUserSig';
import {
	TRTCAppScene,
	TRTCRoleType
} from '@/TrtcCloud/lib/TrtcDefines';

class TRTC {
	trtcCloud = null;
	userId = `user_${uni.getStorageSync("userInfo").id}`;
	userSig = null;
	constructor() {
		if (uni.getSystemInfoSync().platform === 'android') {
			permision.requestAndroidPermission('android.permission.RECORD_AUDIO');
			permision.requestAndroidPermission('android.permission.CAMERA');
		}
		const {
			sdkAppId,
			userSig
		} = genTestUserSig(this.userId);
		this.sdkAppId = sdkAppId;
		this.userSig = userSig;
		if (!sdkAppId || !userSig) {
			uni.showToast({
				title: '请填写 sdkAppId、userSig',
				icon: 'none'
			});
		}
		uni.showToast({
			title: '创建实例 ',
			icon: 'none',
		});
		this.trtcCloud = TrtcCloud.createInstance();
	}
	createRoom(roomId) {
		const params = {
			sdkAppId: this.sdkAppId, // Please replace with your own sdkAppId
			userId: this.userId, // Please replace with your own userid
			roomId: this.roomId, // Please replace with your own room number 
			userSig: this.userSig, // Please replace with your own userSig
			role: TRTCRoleType.TRTCRoleAnchor,
		};
		this.trtcCloud.enterRoom(params, TRTCAppScene.TRTCAppSceneAudioCall);
		this.startLocalAudio()
	}
}
export default TRTC
// #endif