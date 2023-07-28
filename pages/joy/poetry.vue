<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="poetry">
		<u-navbar title="曲水流觞" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;" @click="backClick"></i>
			</view>
		</u-navbar>
		<view v-if="showSvga" id="svgaPlayer" class="fixed w-full h-screen top-0 right-0 bottom-0"
			style="z-index: 9999999;height:55%;width: 55%;left: 170rpx;">
			<l-svga ref="svgaPlayer"></l-svga>
		</view>
		<view class="poetryBox">
			<!-- 流水 -->
			<view class="position" v-for="(item,index) in gameUserArr" :key="index">
				<view style="display: flex;align-items: center;justify-content: center;">
					<image v-if="item!=''" class="positionImg" style="border: 1rpx solid #FE4373;" :src="item.avatar"
						@click="openUserHome(item.user_id)">
					</image>
					<image v-else class="positionImg" src="@/static/noUser.png">
					</image>
				</view>
				<view class="positionText" :style="{color:item.user_id == userInfo.id?'#FE4373':''}">
					{{item == ''?'空位':item.role.realname+'·'+item.role.dynasty}}
				</view>
			</view>
			<image src="/static/beizi.png" :class="fei_AnimationName" class="cup"></image>
			<view class="selectedBox" v-if="activeUser.user_id == userInfo.id">
				<view class="selectedBtn" @click="start">
					<view>发杯</view>
					<view v-if="interValNum!=100">{{interValNum}}s</view>
				</view>
			</view>
			<view class="tipsBox" v-else>
				<block v-if="taskUser.user_id != userInfo.id">
					<text class="ri-cup-fill" style="font-size: 50rpx;"></text>
					<text style="margin-left: 10rpx;">{{gameTip}}</text>
				</block>
				<block v-else>
					<view class="selectedBtn" @click="okTask">
						<view>完成任务</view>
						<view>{{interValTaskNum}}s</view>
					</view>
					<view style="padding-left:15rpx ;" @click="taskModul = true">放弃</view>
				</block>
			</view>
		</view>
		<!-- 底部 -->
		<view class="poetryFooter"
			:style="{background:activeUser.user_id == userInfo.id?'linear-gradient(180deg, rgba(140, 201, 82, 1) 0%, rgba(61, 134, 119, 1) 100%)':'rgb(247, 247, 247)'}">
			<scroll-view scroll-y="true" class="msgScroll" :scroll-into-view="scrollInto" :scroll-with-animation="true">
				<view class="msgList">
					<view v-for="(item,index) in msgList">
						<block v-if="item.type=='taskAudio'">
							<view v-if="item.type=='taskAudio'" style="display: flex;margin-top: 20rpx;">
								<image :src="item.avatar"
									style="width: 60rpx;height: 60rpx;border-radius: 50%;margin-right:10rpx ;">
								</image>
								<view>
									<view>{{item.role_realname}}·{{item.role_dynasty}}</view>
									<view style="display: flex;align-items: center;margin-top: 10rpx;">
										<view class="recording" @click="openRecord1(item.content,index)">
											<view style="display: flex;align-items: center;font-size: 35rpx;"
												v-if="item.isPlay==false">
												<view class="ri-voiceprint-line" v-for="(item,index) in 3" :key="index">
												</view>
											</view>
											<image src="../../static/bofang.gif" style="width: 90rpx;height: 25rpx;"
												v-if="item.isPlay">
											</image>
										</view>
										<text v-if="item.isZan ==0" class="ri-thumb-up-line" @click="zan(item,index)"
											style="font-size: 40rpx;color: #333;margin-left: 30rpx;"></text>
										<text v-if="item.isZan ==0" class="ri-thumb-down-line" @click="cai(item,index)"
											style="font-size: 40rpx;color: #333;margin-left: 30rpx;"></text>
										<text @click="openUserHome(item.user_id)" class="ri-gift-fill"
											style="font-size: 40rpx;margin-left: 30rpx;color:#FE4373"></text>
									</view>
								</view>
							</view>
						</block>
						<!-- 系统提示 -->
						<block v-if="item.type == 'system'">
							{{item.msg}}
						</block>
						<!-- 加入房间提示 -->
						<view v-if="item.type == 'game_room'">
							系统提示：<text style="color: #FE4373;">{{item.user.realname}}·{{item.user.dynasty}}</text>
							<text v-if="item.selectType =='add_game_room'">加入房间！</text>
							<text v-if="item.selectType =='leave_game_room'">离开房间！</text>
						</view>
						<!-- 命中 -->
						<view v-if="item.type == 'hit'">
							系统提示：本轮命中<text
								style="color: #FE4373;">{{item.user.role.realname}}·{{item.user.role.dynasty}}</text>，请在120秒内完成
							<text v-if="item.taskType ==1">【唱歌】</text>
							<text v-if="item.taskType ==2">【吟诗】</text>
							<text v-if="item.taskType ==3">【读口令】</text>
						</view>
						<!-- 开始 -->
						<view v-if="item.type == 'start'">
							系统提示：本轮由 <text
								style="color: #FE4373;">{{item.user.role.realname}}·{{item.user.role.dynasty}}</text>{{item.msg}}
						</view>
						<!-- 礼物 -->
						<view v-if="item.type == 'gift'" style="display: flex;align-items: center;flex-wrap: wrap;">
							<text>系统提示：</text><text
								style="color: #FE4373;">{{item.data.sender_role_realname}}·{{item.data.sender_role_dynasty}}</text><text>送给</text>
							<text
								style="color: #FE4373;">{{item.data.recipient_role_realname}}·{{item.data.recipient_role_dynasty}}</text><text>礼物【{{item.data.gift_title}}】</text>
							<image :src='item.data.gift_image' style="width: 50rpx;height: 50rpx;" mode="aspectFill">
							</image>
						</view>
						<!-- 完成任务 -->
						<view v-if="item.type == 'ok'">
							<text>系统提示：恭喜</text>
							<text
								style="color: #FE4373;">{{item.role_realname}}·{{item.role_dynasty}}</text>完成了任务！任务口令为：【{{item.content}}】
						</view>
						<!-- zan -->
						<view v-if="item.type == 'zan'">
							<text>系统提示：</text>
							<text
								style="color: #FE4373;">{{item.data.user_role_realname}}·{{item.data.user_role_dynasty}}</text>
							<text>给</text>
							<text
								style="color: #FE4373;">{{item.data.to_user_role_realname}}·{{item.data.to_user_role_dynasty}}</text>
							<text>点赞了！</text>
						</view>
						<!-- cai -->
						<view v-if="item.type == 'cai'">
							<text>系统提示：</text>
							<text
								style="color: #FE4373;">{{item.data.user_role_realname}}·{{item.data.user_role_dynasty}}</text>
							<text>给</text>
							<text
								style="color: #FE4373;">{{item.data.to_user_role_realname}}·{{item.data.to_user_role_dynasty}}</text>
							<text>点踩了！</text>
						</view>
						<view v-if="item.type == 'overtime_penalty'">
							<text>系统提示：</text>
							<text style="color: #FE4373;">{{item.user_role_realname}}·{{item.user_role_dynasty}}</text>
							<text>{{item.msg}}</text>
						</view>
						<!-- 聊天文字 -->
						<view v-if="item.type == 'text'" style="display: flex;margin-top: 20rpx;">
							<image :src="item.data.avatar"
								style="width: 60rpx;height: 60rpx;border-radius: 50%;margin-right:30rpx ;"></image>
							<view v-if=""
								:class="item.data.user_id == userInfo.id?'rounded-3xl rounded-tl-none':'rounded-3xl rounded-tl-none'"
								:style="{background:item.data.user_id == userInfo.id?'rgb(254, 67, 115)':'#fff',color:item.data.user_id == userInfo.id?'#fff':'rgb(51, 51, 51)'}"
								style="padding: 0rpx 20rpx;display: flex;align-items: center;justify-items: center;">
								<view style="font-size: 28rpx;">{{item.data.content}}</view>
							</view>
						</view>
						<!--聊天图片 -->
						<view v-if="item.type == 'image'" style="display: flex;margin-top: 20rpx;">
							<image :src="item.data.avatar"
								style="width: 60rpx;height: 60rpx;border-radius: 50%;margin-right:30rpx ;"></image>
							<view>
								<image :src="item.data.content" mode=""
									style="width: 200rpx;height: 100rpx;border-radius:10rpx ;" mode="widthFix"></image>
							</view>
						</view>
						<!--聊天语音 -->
						<view v-if="item.type == 'audio'" style="display: flex;margin-top: 20rpx;">
							<image :src="item.data.avatar"
								style="width: 60rpx;height: 60rpx;border-radius: 50%;margin-right:30rpx ;"></image>
							<view>
								<view class="recording" @click="openRecord1(item.data.content,index)">
									<view style="display: flex;align-items: center;font-size: 35rpx;"
										v-if="item.isPlay==false">
										<view class="ri-voiceprint-line" v-for="(item,index) in 3" :key="index">
										</view>
									</view>
									<image src="../../static/bofang.gif" style="width: 90rpx;height: 25rpx;"
										v-if="item.isPlay">
									</image>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view id="scrollBottom"></view>
			</scroll-view>
			<!-- 底部 -->
			<view class="bottom-0  left-0 right-0  border-gray-100 bg-white"
				style="position: absolute;bottom: 0;left: 0;z-index: 9999;background: rgb(247, 247, 247);">
				<view class="flex p-4">
					<view class="mr-4 flex items-center" @click="handleVoice">
						<i class="ri-mic-2-fill block text-4xl leading-none text-gray-400"></i>
					</view>
					<textarea class="flex-1 mr-4 flex items-center bg-gray-100" :auto-height="true" @blur="blur"
						:auto-blur="false" @focus="focus" @confirm="handleTextSend" :adjustPosition="false"
						style="padding: 20rpx;border-radius: 10rpx;font-size:28rpx;color: rgb(48, 49, 51);"
						placeholder="说点什么吧" v-model="text"
						placeholder-style="color: rgb(192, 196, 204);font-size:30rpx"></textarea>
					<!-- <view class="flex-1 mr-4 rounded-full h-10 flex items-center px-4 bg-gray-100">
						<u-input v-model="text" @focus="focus" @blur="blur" :adjustPosition="false"
							@confirm="handleTextSend" type="text" placeholder="说点什么吧" :clearable="true"
							customStyle="border: none; background: none; padding: 0;">
						</u-input>
					</view> -->
					<view class="mr-4 flex items-center" @click="handleEmoji">
						<i class="ri-emotion-fill block text-4xl leading-none text-gray-400"></i>
					</view>
					<view class="flex items-center" v-if="!text">
						<block v-if="isShowDown ==false">
							<i v-if="showPlus ==false" @click="handlePlus"
								class="ri-add-circle-fill text-4xl leading-none text-gray-400"></i>
						</block>
						<block v-if="isShowDown ==true">
							<i v-if="isShowDown ==true" @click="hideBtmTab"
								class="ri-arrow-down-line text-4xl leading-none text-gray-400"></i>
						</block>
					</view>
					<view class="flex items-center" v-if="text" @click="handleTextSend">
						<text class="rounded-full p-2 px-3 text-base text-white bg-gradient-to-r to-fuchsia-500"
							style="background: rgb(254, 67, 115);">发送</text>
					</view>
				</view>
				<view class="sdasdas" :style="{height:pageHeight+'px'}"></view>
				<!-- 语音 -->
				<view class="flex flex-col items-center bg-gray-100 p-4 h-60 overflow-y-scroll" v-if="showRecord">
					<view class="text-xs leading-none text-gray-500">{{ recordTip }}</view>
					<view class="flex justify-center items-center mt-16" @touchstart="handleRecordStart"
						@touchmove.stop.prevent="handleRecordDoing" @touchend="handleRecordStop(2)">
						<view class="relative flex justify-center items-center rounded-full">
							<view class="flex justify-center items-center rounded-full w-20 h-20 bg-fuchsia-500 z-10"
								style="background: #FE4373 !important;">
								<i class="ri-mic-fill text-4xl leading-none text-white"></i>
							</view>
							<view v-if="recording"
								class="animate-ping absolute rounded-full p-2 bg-fuchsia-200 opacity-50"
								style="background: #FE4373 !important;">
								<view class="rounded-full w-20 h-20 p-2 bg-fuchsia-500 opacity-50">
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 表情 -->
				<view class="grid grid-cols-8 gap-4 bg-gray-100 p-4 h-60 overflow-y-scroll" v-if="showEmoji">
					<view class="flex" v-for="(item, index) in emojiList" :key="index" :item="item"
						@click="handleEmojiSend(item)">
						<text class="leading-none" style="font-size: 1.8rem;">{{ item }}</text>
					</view>
				</view>
				<!-- 操作 -->
				<view class="grid grid-cols-4 gap-4 bg-gray-100 p-4 h-60 overflow-y-scroll" v-if="showPlus">
					<view class="flex flex-col justify-center text-center" @tap="handleImage">
						<view class="rounded-lg bg-white p-4 mx-auto">
							<i class="ri-image-fill block text-2xl leading-none text-black"></i>
						</view>
						<view class="text-base leading-none mt-2">相册</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 任务 -->
		<!-- taskPopup -->
		<u-popup :show="taskPopup" :closeable="true" :closeOnClickOverlay="false" @close="taskPopup = false" :round="30"
			style="position: absolute;top: 0;left: 0;">
			<view class="taskBox">
				<view class="title1">酒杯顺流而下，停在了你的面前，请：</view>
				<view class="title2">{{taskData.type == 1?'唱一首歌':''}}
					{{taskData.type == 2?'吟一首诗':''}}
					{{taskData.type == 3?'读出下面的话':''}}
				</view>
				<view class="title3" v-if="taskData.length!=0">{{taskData.content}}</view>
				<view
					style="display: flex;align-items: center;margin-top: 50rpx;justify-content: center;position: relative;"
					:style="{visibility:Isrecord?'visible':'hidden'}">
					<view class="recording" @click="openRecord(recordUrl)">
						<text style="margin-right: 10rpx;">{{recordLength}}s</text>
						<view style="display: flex;align-items: center;font-size: 35rpx;" v-if="isPlay==false">
							<view class="ri-voiceprint-line" v-for="(item,index) in 3" :key="index"></view>
						</view>
						<image src="../../static/bofang.gif" style="width: 90rpx;height: 25rpx;" v-if="isPlay">
						</image>
					</view>
					<view v-if="Isrecord" @click="delectRecord"
						style="width: 95rpx;height: 70rpx;background: #ECECEC;border-radius: 35rpx;text-align: center;line-height: 70rpx;position: absolute;top: 0;right: 0;">
						<text class="ri-delete-bin-5-line" style="font-size: 35rpx;"></text>
					</view>
				</view>

				<view style="display: flex;align-items: center;justify-content: center;" class="mt-16">
					<view class="flex justify-center items-center" @touchstart="handleRecordStart"
						@touchmove.stop.prevent="handleRecordDoing" @touchend="handleRecordStop(1)">
						<view class="relative flex justify-center items-center rounded-full">
							<view class="flex justify-center items-center rounded-full w-20 h-20  z-10"
								style="background: #FE4373;">
								<i class="ri-mic-fill text-4xl leading-none text-white"></i>
							</view>
							<view v-if="recording" class="animate-ping absolute rounded-full p-2 opacity-50"
								style="background: #FE4373;">
								<view class="rounded-full w-20 h-20 p-2 bg-fuchsia-500 opacity-50">
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="sendBtn" @click="sendTask">发送</view>
			</view>
		</u-popup>
		<!-- 弹窗 -->
		<u-modal :show="animationsModule" :showConfirmButton="true" :showCancelButton="false" confirmColor="#FE4373"
			confirmText="好的" @confirm="animationsModule=false" style="z-index: 9999999;">
			<view style="display: flex;flex-direction: column;">
				<view style="text-align: center;font-size: 32rpx;color: #323232;font-weight: bold;">提示</view>
				<view style="color:#999;font-size: 26rpx;margin-top: 30rpx;">
					<text>发杯中，请勿离开房间哦。</text>
				</view>
			</view>
		</u-modal>
		<u-modal :show="disconnect" :showConfirmButton="true" :showCancelButton="false" confirmColor="#FE4373"
			confirmText="好的" @confirm="$u.route({type: 'navigateBack',delta: 1})" style="z-index: 9999999;">
			<view style="display: flex;flex-direction: column;">
				<view style="text-align: center;font-size: 32rpx;color: #323232;font-weight: bold;">提示</view>
				<view style="color:#999;font-size: 26rpx;margin-top: 30rpx;">
					<text>您已掉线，请重新进入。</text>
				</view>
			</view>
		</u-modal>
		<u-modal :show="exitModul" :showConfirmButton="true" :showCancelButton="true" confirmColor="#FE4373"
			confirmText="离开" cancelText="取消" @cancel="exitModul=false" @confirm="exit" style="z-index: 9999999;">
			<view style="display: flex;flex-direction: column;">
				<view style="text-align: center;font-size: 32rpx;color: #323232;font-weight: bold;">提示</view>
				<view style="color:#999;font-size: 26rpx;margin-top: 30rpx;">
					<text>确定要离开房间吗？^.^</text>
				</view>
			</view>
		</u-modal>
		<u-modal :show="taskModul" :showConfirmButton="true" :showCancelButton="true" confirmColor="#FE4373"
			confirmText="放弃" cancelText="取消" @cancel="taskModul=false" @confirm="closeTask" style="z-index: 9999999;">
			<view style="display: flex;flex-direction: column;">
				<view style="text-align: center;font-size: 32rpx;color: #323232;font-weight: bold;">提示</view>
				<view style="color:#999;font-size: 26rpx;margin-top: 30rpx;">
					<text>放弃任务，将会降低5名望。确定要放弃任务吗？这会影响大家的体验哦^.^</text>
				</view>
			</view>
		</u-modal>
		<u-modal :show="followModule" :showConfirmButton="true" :showCancelButton="true" confirmColor="#FE4373"
			confirmText="确定" cancelText="取消" @cancel="followModule=false" @confirm="unfollow" style="z-index: 9999999;">
			<view style="display: flex;flex-direction: column;">
				<view style="text-align: center;font-size: 32rpx;color: #323232;font-weight: bold;">提示</view>
				<view style="color:#999;font-size: 26rpx;margin-top: 30rpx;">
					<text>是否取消关注？</text>
				</view>
			</view>
		</u-modal>
		<u-popup :show="showUser" :closeable="false" @close="showUser = false" :round="30"
			style="position: absolute;top: 0;left: 0;" v-if="userItem.length != 0">
			<view class="userBox">
				<view class="userTop">
					<view style="display: flex;align-items: center;">
						<image :src="userItem.avatar" @click="$u.route('pages/user/home?user_id='+userItem.id)"
							style="height: 80rpx;width: 80rpx;border-radius: 50%;">
						</image>
						<!-- 女 -->
						<text class="ri-women-line" v-if="userItem.gender == 2"
							style="color: pink;font-size: 30rpx;margin-left: 30rpx;"></text>
						<!-- 男 -->
						<text class="ri-men-line" v-if="userItem.gender == 1"
							style="color: blue;font-size: 30rpx;margin-left: 30rpx;"></text>
						<view style="display: flex;align-items: center;margin-left: 15rpx;">
							<text
								style=" display: inline-block; width: 40rpx; text-align: center;height: 40rpx; border-radius: 50%; line-height: 40rpx; background-color: cornsilk; color: rgb(255, 180, 31);">望</text>
							<text style="color: rgb(255, 180, 31);">{{userItem.total_mw}}</text>
						</view>
					</view>
					<view>
						<view style="display: flex;align-items: center;">
							<view v-if="userItem.is_follow==0"
								style="display: flex;align-items: center;color: #fff;background: rgba(227, 77, 89, 1);width: 160rpx;height: 66rpx;border-radius: 12rpx;justify-content: center;">
								<text class="ri-star-line" style="font-size: 28rpx;"></text>
								<text style="margin-left: 10rpx;" @click="interest(1)">关注</text>
							</view>
							<view v-else
								style="display: flex;align-items: center;color: #fff;background: #999;width: 160rpx;height: 66rpx;border-radius: 12rpx;justify-content: center;">
								<text class="ri-star-line" style="font-size: 28rpx;"></text>
								<text style="margin-left: 10rpx;" @click="interest(2)">关注</text>
							</view>
							<view class="ri-alert-line"
								style="font-size: 35rpx;margin-left: 20rpx;color: #999;opacity: 0.8;"
								@click="$u.route('pages/public/report?user_id='+userItem.id)"></view>
						</view>
					</view>
				</view>
				<view>
					<view style="color: #323232;font-size: 28rpx;margin-top: 20rpx;">{{userItem.role.realname}} ·
						{{userItem.role.dynasty}}
					</view>
					<view style="font-size: 24rpx;color: #999999;margin-top: 15rpx;">
						<text class="achievements" style="margin-left: 10rpx;"
							v-for="(item,index) in userItem.role.achievements">{{item}}</text>
					</view>
				</view>
				<view style="margin-top: 30rpx;">
					<view>送Ta礼物</view>
					<view style="margin-top: 30rpx;display: flex;align-items: center;flex-wrap: wrap;">
						<view
							style="display: flex;flex-direction: column;text-align: center;justify-content: center;width: calc(100% / 4);box-sizing: border-box;align-items: center;"
							v-for="(item,index) in giftList" :key="index" v-if="item.status=='normal'"
							@click="handleGiftSend(item)">
							<image style="width: 130rpx;height: 130rpx;" :src="item.image" mode=""></image>
							<view style="color: #333;">{{item.title}}</view>
							<view style="display: flex;align-items: center;justify-content: center;">
								<image style="width: 30rpx;height:30rpx;margin-right: 10rpx;" src="@/static/qian.png"
									mode=""></image>
								<text>{{item.price}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
	import permision from "@/js_sdk/wa-permission/permission.js"
	export default {
		data() {
			return {
				isShowDown: false,
				fei_AnimationName: "",
				gameUserArr: ["", "", "", "", "", ""],
				userInfo: [],
				showUser: false,
				showEmoji: false,
				emojiList: [],
				giftList: [],
				showSvga: false,
				showPlus: false,
				showImage: false,
				showCamera: false,
				showRecord: false,
				showGift: false,
				text: '',
				recordTip: "按住说话",
				recording: false,
				recordStoping: false,
				recordTimer: null,
				recordLength: 0,
				recorder: uni.getRecorderManager(),
				pageHeight: 0,
				recordPoint: {
					identifier: 0,
					Y: 0
				},
				Isrecord: false,
				taskPopup: false,
				msgList: [{
					type: "system",
					msg: "系统提示：正在匹配其他用户，人满后开始发杯。"
				}],
				userItem: [],
				followModule: false,
				giftList: [],
				scrollInto: "",
				form: {
					content: '',
					tags: [],
					images: [],
					audio: '',
					video: '',
					ischat: false,
					privacy: 'all',
					timer: 0
				},
				recordUrl: "",
				isPlay: false,
				activeUser: [],
				interVal: null,
				interValNum: 30,
				gameTip: "",
				gameData: [],
				gameTime: null,
				hitUser: [],
				taskUser: [],
				taskModul: false,
				taskData: [],
				recorderCurrentIndex: 0,
				interValTaskNum: 120,
				interValTask: null,
				exitModul: false,
				historyTaskData: [],
				disconnect: false,
				ainimationFlag: false,
				animationsModule: false,
			}
		},
		onBeforeBack(args) {
			if (this.ainimationFlag == true) {
				this.animationsModule = true;
			} else {
				this.exitModul = true
			}
			//or
			return true //阻止页面关闭
		},
		onLoad() {
			var that = this;
			this.userInfo = uni.getStorageSync("userInfo");
			that.initSocket();
			that.sendMsg("add_game_room");
			that.getEmojiList();
			that.watchKeyboard();
			that.getGiftList();
			// 监听录音
			that.recorder.onStart((e) => {
				that.recordStart(e)
			})
			that.recorder.onStop((e) => {
				that.recordStop(e)
			})
			// #ifdef APP-PLUS
			// 保持屏幕常亮
			uni.setKeepScreenOn({
				keepScreenOn: true
			});
			plus.device.setWakelock(true);
			// #endif
		},
		onUnload() {
			var that = this;
			clearInterval(that.interVal);
			that.sendMsg("");
			let params = {
				type: "leave_game_room",
				cate: 2,
				user_punished_code: that.gameData.punished_code
			}
			getApp().globalData.socketTask.send({
				data: JSON.stringify(params),
				success() {
					console.log("离开房间消息成功");
				},
				fail() {
					console.log("离开房间消息失败");
				}
			});
			getApp().globalData.socketTask.close();
			if (that.audio != null) {
				that.audio.destroy();
				that.audio = null;
			}
			// #ifdef APP-PLUS
			// 保持屏幕常亮
			uni.setKeepScreenOn({
				keepScreenOn: false
			});
			plus.device.setWakelock(false);
			// #endif
		},
		onShow() {
			var that = this;
			that.gameUserArr.forEach((val, index) => {
				if (val.user_id == that.userInfo.id) {
					that.$api("game.is_in_game_room", {
						"game_room_id": val.game_room_id,
						"game_room_place_num": val.game_room_place_num
					}).then(res => {
						if (res.code == 0) {
							that.disconnect = true;
						}
					})
				}
			})
		},
		methods: {
			backClick() {
				if (this.ainimationFlag == true) {
					this.animationsModule = true;
				} else {
					this.exitModul = true
				}
			},
			hideBtmTab() {
				var that = this;
				that.showRecord = false;
				that.showEmoji = false;
				that.showPlus = false;
				that.isShowDown = false;
			},
			//退出房间
			exit() {
				this.$u.route({
					type: 'navigateBack',
					delta: 1
				})
			},
			//语音点踩
			cai(item, index) {
				console.log(item)
				var that = this;
				let params = {
					type: "cai",
					cate: 2,
					to_user_id: item.user_id
				}
				getApp().globalData.socketTask.send({
					data: JSON.stringify(params),
					success() {
						console.log("游戏发送消息成功");
						that.msgList[index].isZan = 1;
					},
					fail() {
						console.log("游戏发送消息失败");
					}
				});
			},
			//语音点赞
			zan(item, index) {
				var that = this;
				let params = {
					type: "zan",
					cate: 2,
					to_user_id: item.user_id
				}
				getApp().globalData.socketTask.send({
					data: JSON.stringify(params),
					success() {
						console.log("游戏发送消息成功");
						that.msgList[index].isZan = 1;
					},
					fail() {
						console.log("游戏发送消息失败");
					}
				});
			},
			//任务发送
			sendTask() {
				var that = this;
				if (that.recordUrl == '') {
					that.$u.toast("请添加语句")
				} else {
					let params = {
						type: "game_task_audio",
						data: that.recordUrl,
						user_punished_code: that.gameData.punished_code,
						cate: 2
					}
					console.log(params)
					getApp().globalData.socketTask.send({
						data: JSON.stringify(params),
						success() {
							console.log("游戏webscoket后台标记已读");
						},
						fail() {
							console.log("游戏webscoket后台标记已读");
						}
					});
				}
			},
			//确定任务
			async okTask() {
				var that = this;
				// #ifdef APP-PLUS
				var result = await permision.requestAndroidPermission('android.permission.RECORD_AUDIO');
				if (result == 1) {
					that.taskPopup = true;
					that.recordUrl = '';
					that.recordLength = 0;
					that.Isrecord = false;
					return
				} else {
					uni.showModal({
						title: "请开启录音权限",
						content: "请去设置里面开启录音权限！",
						success(res1) {
							if (res1.confirm) {
								permision.gotoAppPermissionSetting()
							}
						}
					})
				}
				// #endif
				// #ifdef H5
				that.taskPopup = true;
				// that.sendMsg("game_task")
				// #endif
			},
			//关闭任务
			closeTask() {
				var that = this;
				that.taskPopup = false;
				that.taskModul = false;
				that.taskData = [];
				that.taskUser = [];
				let params = {
					type: "overtime_penalty",
					user_punished_code: that.gameData.punished_code,
					cate: 2
				}
				console.log(params)
				getApp().globalData.socketTask.send({
					data: JSON.stringify(params),
					success() {
						console.log("放弃任务成功");
					},
					fail() {
						console.log("放弃任务失败");
					}
				});
			},
			//试听2
			openRecord1(audio, index) {
				var that = this;
				if (!audio) {
					that.$u.toast('语音不能为空')
					return false
				}
				console.log(audio)
				if (!that.audio) {
					that.audio = uni.createInnerAudioContext()
					that.audio.src = audio;
					that.msgList[index].isPlay = true;
				}
				that.$nextTick(function() {
					that.audio.play();
					that.audio.onEnded((e) => {
						that.audio.destroy();
						that.msgList[index].isPlay = false;
						that.audio = null;
						clearInterval(that.inter)
					})
				})
			},
			//试听
			openRecord(video) {
				if (this.isPlay == true) {
					return;
				}
				this.handlePlayAudio(video, -10);
			},
			handlePlayAudio(audio, index) {
				console.log(index)
				let that = this;
				if (!audio) {
					that.$u.toast('语音不能为空')
					return false
				}
				if (!that.audio) {
					if (index == -10) {
						that.audio = uni.createInnerAudioContext()
						that.audio.src = audio;
						that.isPlay = true;
					} else {
						that.audio = uni.createInnerAudioContext()
						that.audio.src = audio;
						that.msgList[index].isPlay = true;
					}
				}
				if (index == -10) {
					that.$nextTick(function() {
						that.audio.play();
						that.audio.onEnded((e) => {
							that.audioStatus = false;
							that.audio.destroy();
							that.isPlay = false;
							that.audio = null;
							clearInterval(that.inter)
						})
					})
				} else {
					that.$nextTick(function() {
						that.audio.play();
						that.audio.onEnded((e) => {
							that.audioStatus = false;
							that.audio.destroy();
							that.msgList[index].isPlay = false;
							that.audio = null;
							clearInterval(that.inter)
						})
					})
				}
			},
			//取消录音
			delectRecord() {
				var that = this;
				this.form.audio = '';
				this.recordUrl = "";
				this.timer = 0;
				this.Isrecord = false;
				if (that.audio) {
					this.audio.destroy();
				}
				this.audio = null;
				this.isPlay = false;
			},
			//送礼物
			handleGiftSend(item) {
				let that = this;
				that.$api("gift.giveGift", {
					"receiver_user_id": that.userItem.id,
					"nums": 1,
					"gift_id": item.id
				}).then(data => {
					if (data.code == 1) {
						if (data.msg == "赠送成功") {
							let params = {
								type: "gift",
								cate: 2,
								data: item.url,
								gift_id: item.id,
								to_user_id: that.userItem.id
							}
							getApp().globalData.socketTask.send({
								data: JSON.stringify(params),
								success() {
									console.log("发送礼物成功");
								},
								fail() {
									console.log("发送礼物失败");
								}
							});
						}
					} else {
						that.$u.toast(data.msg)
					}
				})
			},
			//礼物动画
			handleGiftPlay(giftUrl) {
				let that = this;
				that.showSvga = true;
				that.$nextTick(() => {
					that.$refs.svgaPlayer.render(async (parser, player) => {
						let videoItem = await parser.load(giftUrl)
						await player.setVideoItem(videoItem)
						player.loops = 1
						player.startAnimation()
						player.onFinished(() => {
							that.showSvga = false
						})
					})
				})
			},
			//礼物列表
			getGiftList() {
				var that = this;
				that.$api("gift.lists").then(res => {
					if (res.code == 1) {
						that.giftList = res.data;
					}
				})
			},
			//取消关注
			unfollow() {
				var that = this;
				that.$api('user_follow.follow', {
					user_id: that.userItem.id
				}).then(res => {
					if (res.code == 1) {
						if (res.msg == "取消关注") {
							that.userItem.is_follow = 0;
							that.followModule = false;
						}
					}
				})
			},
			//关注
			interest(type) {
				var that = this;
				if (type == 1) {
					that.$api('user_follow.follow', {
						user_id: that.userItem.id
					}).then(res => {
						that.userItem.is_follow = 1
					})
				}
				if (type == 2) {
					that.followModule = true;
				}
			},
			//上传图片
			handleImage() {
				let that = this
				var token = uni.getStorageSync("token");
				getApp().globalData.isSelectImage = true;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: (res) => {
						res.tempFilePaths.forEach(item => {
							uni.uploadFile({
								url: that.$API_URL + 'index/upload',
								filePath: item,
								name: 'file',
								formData: {
									"token": token
								},
								success: res => {
									res = JSON.parse(res.data)
									that.isShowDown = false;
									if (res.code === 1) {
										getApp().globalData.isSelectImage = false;
										that.sendMsg2("image", res.data.fullurl)
									} else {
										that.$u.toast(res.msg);
									}
								},
								complete: e => {}
							})
						})
					}
				})
			},
			recordStart(e) {
				let that = this
				console.log('recorder start' + JSON.stringify(e));
				if (that.recordUrl != '') {
					uni.showToast({
						icon: "none",
						title: "已经添加过语音"
					})
					return;
				}
				that.recordLength = 0
				that.recordTimer = setInterval(() => {
					that.recordLength++
				}, 1000)
			},
			scrollBottom() {
				let that = this
				let timeout = null
				that.scrollInto = ''
				clearTimeout(timeout)
				timeout = setTimeout(() => {
					that.scrollInto = 'scrollBottom'
				}, 300)
			},
			handlePlus() {
				let that = this;
				that.scrollBottom()
				that.showPlus = !that.showPlus;
				that.isShowDown = that.showPlus;
				that.showRecord = false
				that.showEmoji = false
				that.showGift = false
			},
			//发送文本消息
			handleTextSend() {
				let that = this;
				if (that.text === '') {
					return
				} else {
					that.showEmoji = false;
					that.isShowDown = false;
					that.sendMsg2("text", that.text);
					that.text = '';
				}
			},
			// 失去焦点后
			blur() {
				this.isShowDown = false;
				this.pageHeight = 0
			},
			//监听键盘
			watchKeyboard() {
				var that = this;
				uni.onKeyboardHeightChange(res => {
					that.pageHeight = res.height;
				})
			},
			// 获得焦点后
			focus(e) {
				this.scrollBottom();
				this.watchKeyboard()
				this.isShowDown = false;
				this.showRecord = false;
				this.showEmoji = false;
				this.showGift = false;
				this.showPlus = false;
				// 可用区域高度减去软键盘高度，最后加上px转为字符串
			},
			recordStop(e) {
				let that = this;
				if (that.recordUrl != '') {
					uni.showToast({
						icon: "none",
						title: "已经添加过语音"
					})
					clearInterval(that.recordTimer)
					return;
				}
				var token = uni.getStorageSync("token");
				that.recording = false;
				uni.showLoading()
				clearInterval(that.recordTimer)
				uni.uploadFile({
					url: that.$API_URL + 'index/upload',
					filePath: e.tempFilePath,
					name: 'file',
					formData: {
						"token": token
					},
					success: res => {
						res = JSON.parse(res.data)
						uni.hideLoading()
						if (res.code === 1) {
							if (that.recorderCurrentIndex == 2) {
								that.sendMsg2("audio", res.data.fullurl)
							} else {
								that.Isrecord = true;
								that.recordUrl = res.data.fullurl
							}

						} else {
							that.$u.toast(res.msg)
						}
					},
					complete: e => {}
				})
			},
			handleRecordStart(e) {
				let that = this
				// #ifdef APP-PLUS || MP-WEIXIN
				if (e.touches.length > 1) {
					return
				}
				that.recording = true
				that.recordStoping = false
				that.recordTip = '正在录制…'
				that.recordPoint.Y = e.touches[0].clientY
				that.recordPoint.identifier = e.touches[0].identifier
				that.recorder.start({
					format: "mp3"
				})
				// #endif
			},
			handleRecordStop(index, e) {
				let that = this;
				that.recorderCurrentIndex = index;
				console.log('touch stop')
				if (!that.recording) {
					return
				}
				that.recording = false
				that.recordTip = '按住说话'
				that.recorder.stop();
				that.isShowDown = false;
			},
			handleRecordDoing(e) {
				let that = this
				console.log('touch move')
				if (that.recordPoint.Y - e.touches[0].clientY >= uni.upx2px(100)) {
					that.recordStoping = true
					that.recordTip = '松开手指，取消发送'
				}
			},
			//录音
			async handleVoice() {
				let that = this;
				var result = await permision.requestAndroidPermission('android.permission.RECORD_AUDIO');
				if (result == 1) {
					// this.scrollBottom();
					that.showRecord = !that.showRecord
					that.showEmoji = false
					that.showPlus = false
					that.showGift = false;
					that.isShowDown = that.showRecord;
					return
				} else {
					uni.showModal({
						title: "请开启录音权限",
						content: "请去设置里面开启录音权限！",
						success(res1) {
							if (res1.confirm) {
								permision.gotoAppPermissionSetting()
							}
						}
					})
				}
			},
			//点击表情
			handleEmojiSend(item) {
				let that = this
				that.text += item
			},
			//表情
			handleEmoji() {
				// this.scrollBottom()
				let that = this;
				that.showEmoji = !that.showEmoji;
				that.showRecord = false;
				that.showPlus = false;
				that.showGift = false;
				that.isShowDown = that.showEmoji;
			},
			async getEmojiList() {
				let that = this
				if (uni.getStorageSync('EMOJILIST')) {
					that.emojiList = uni.getStorageSync('EMOJILIST')
				} else {
					that.emojiList = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍',
						'😘', '🥰', '😗', '😙', '🥲', '😚', '🙂', '🤗', '🤩', '🤔', '🫡', '🤨', '😐', '😑', '😶',
						'🫥', '😶‍🌫️', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '🥱', '😴', '😌',
						'😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🫤', '🙃', '🫠', '🤑', '😲', '☹️', '🙁',
						'😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😮‍💨', '😰',
						'😱', '🥵', '🥶', '😳', '🤪', '😵', '😵‍💫', '🥴', '😠', '😡', '🤬', '😷', '🤒', '🤕',
						'🤢', '🤮', '🤧', '😇', '🥳', '🥸', '🥺', '🥹', '🤠', '🤡', '🤥', '🤫', '🤭', '🫢', '🫣',
						'🧐', '🤓', '😈', '👿', '👹', '👺', '💀', '☠️', '👻', '👽', '👾', '🤖', '💩', '😺', '😸',
						'😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🙈', '🙉', '🙊', '🐵', '🐶', '🐺', '🐱', '🦁',
						'🐯', '🦒', '🦊', '🦝', '🐮', '🐷', '🐗', '🐭', '🐹', '🐰', '🐻', '🐻‍❄️', '🐨', '🐼',
						'🐸', '🦓', '🐴', '🦄', '🐔', '🐲', '🐽', '🐾', '🐒', '🦍', '🦧', '🦮', '🐕‍🦺', '🐩',
						'🐕', '🐈', '🐈‍⬛', '🐅', '🐆', '🐎', '🦌', '🦬', '🦏', '🦛', '🐂', '🐃', '🐄', '🐖', '🐏',
						'🐑', '🐐', '🐪', '🐫', '🦙', '🦘', '🦥', '🦨', '🦡', '🐘', '🦣', '🐁', '🐀', '🦔', '🐇',
						'🐿️', '🦫', '🦎', '🐊', '🐢', '🐍', '🐉', '🦕', '🦖', '🦦', '🦈', '🐬', '🦭', '🐳', '🐋',
						'🐟', '🐠', '🐡', '🦐', '🦑', '🐙', '🦞', '🦀', '🐚', '🪸', '🦆', '🐓', '🦃', '🦅', '🕊️',
						'🦢', '🦜', '🦩', '🦚', '🦉', '🦤', '🪶', '🐦', '🐧', '🐥', '🐤', '🐣', '🦇', '🦋', '🐌',
						'🐛', '🦟', '🪰', '🪱', '🦗', '🐜', '🪳', '🐝', '🪲', '🐞', '🦂', '🕷️', '🕸️', '🦠',
						'🧞‍♀️', '🧞‍♂️', '🧞', '🧟‍♀️', '🧟‍♂️', '🧟', '🧌', '🗣️', '👤', '👥', '🫂', '👁️', '👀',
						'🦴', '🦷', '👅', '👄', '🫦', '🧠', '🫀', '🫁', '🦾', '🦿', '👣', '🤺', '⛷️'
					]
					uni.setStorageSync('EMOJILIST', that.emojiList)

				}
			},
			//头像点击
			openUserHome(id) {
				var that = this;
				if (id == this.userInfo.id) {
					that.$u.toast("这是您自己！")
				} else {
					that.$api("user.profile", {
						user_id: id
					}).then(res => {
						if (res.code == 1) {
							that.showUser = true;
							that.userItem = res.data;
						}
					})
				}
			},
			//发送游戏内聊天消息
			sendMsg2(type, data, cate = 2) {
				let params = {
					type: type,
					cate: cate,
					data: data
				}
				getApp().globalData.socketTask.send({
					data: JSON.stringify(params),
					success() {},
					fail() {}
				});
			},
			//发送游戏消息
			sendMsg(type, cate = 2) {
				let params = {
					type: type,
					cate: cate,
				}
				console.log("游戏发送消息成功")
				getApp().globalData.socketTask.send({
					data: JSON.stringify(params),
					success() {
						console.log("游戏webscoket后台标记已读");
					},
					fail() {
						console.log("游戏webscoket后台标记已读");
					}
				});
			},
			//initSocket
			initSocket() {
				var that = this;
				getApp().globalData.socketTask.onMessage((res) => {
					var socketDate = JSON.parse(res.data);
					console.log(socketDate)
					console.log(new Date());
					if (socketDate.cate != 2) {
						return;
					}
					if (socketDate.type == "add_game_room") {
						var userArr = ["", "", "", "", "", ""];
						socketDate.data.list.forEach((val, index) => {
							userArr[val.game_room_place_num] = val
						})
						that.gameUserArr = userArr;
						// 人满
						that.scrollBottom()
						that.msgList.push({
							type: "game_room",
							selectType: "add_game_room",
							user: socketDate.data.new_user_data.role
						})
						if (socketDate.game_task_is_over == '1') {
							that.interValNum = 30;
							that.openGame(socketDate, 1);
						} else if (socketDate.game_task_is_over == '0') {
							that.msgList[0].msg = '';
							that.gameTip =
								`命中 ${socketDate.punished_user_data.role.realname}·${socketDate.punished_user_data.role.dynasty}`;
							that.historyTaskData = socketDate.punished_user_data.game_task;
						}

					} else if (socketDate.type == "leave_game_room") {
						if (socketDate.cate != 2) {
							return;
						}
						var userArr = ["", "", "", "", "", ""];
						socketDate.data.list.forEach((val, index) => {
							userArr[val.game_room_place_num] = val
						})
						that.gameUserArr = userArr;
						that.scrollBottom()
						that.msgList.push({
							type: "game_room",
							selectType: "leave_game_room",
							user: socketDate.data.leave_user_data.role
						})
						if (socketDate.game_task_is_over == 1) {
							that.activeUser = [];
							that.interValNum = 30;
							that.gameTip = "等待人满开始游戏";
							that.gameData = [];
							that.fei_AnimationName = ''
							clearInterval(that.interVal);
						}
					} else if (socketDate.type == 'hair_cup') {
						that.animations();
						that.gameTip = "发杯中";
						that.activeUser = [];
					} else if (socketDate.type == "game_task") {
						that.taskData = socketDate.data;
						clearInterval(that.interValTask);
						that.interValTask = setInterval(() => {
							that.interValTaskNum--;
							if (that.interValTaskNum <= 0) {
								clearInterval(that.interValTask);
								that.closeTask();
							}
						}, 1000)
					} else if (socketDate.type == "game_task_audio") {
						that.new_user_data = []
						clearInterval(that.interValTask);
						that.interValTaskNum = 120;
						that.taskPopup = false;
						that.msgList.push({
							type: "taskAudio",
							content: socketDate.data.content,
							isZan: 0,
							role_dynasty: socketDate.data.role_dynasty,
							role_realname: socketDate.data.role_realname,
							avatar: socketDate.data.avatar,
							user_id: socketDate.data.user_id,
							data: that.taskData,
							isPlay: false,
						})
						that.msgList.push({
							type: "ok",
							role_dynasty: socketDate.data.role_dynasty,
							role_realname: socketDate.data.role_realname,
							content: that.historyTaskData.length == 0 ? that.taskData.content : that
								.historyTaskData.content
						})
						that.scrollBottom();
						that.historyTaskData = [];
						that.taskUser = [];
						that.recordUrl = ''
						that.circulate();
					} else if (socketDate.type == 'zan') {
						that.msgList.push({
							type: "zan",
							data: socketDate.data
						})
						that.scrollBottom();
					} else if (socketDate.type == 'cai') {
						that.msgList.push({
							type: "cai",
							data: socketDate.data
						})
						that.scrollBottom();
					} else if (socketDate.type == 'gift') {
						that.showGift = false;
						that.showSvga = true;
						that.handleGiftPlay(socketDate.data.content);
						that.msgList.push({
							type: "gift",
							data: socketDate.data
						})
						that.scrollBottom();
					} else if (socketDate.type == 'overtime_penalty') {
						that.new_user_data = []
						clearInterval(that.interValTask);
						that.interValTaskNum = 120;
						that.msgList.push({
							type: "overtime_penalty",
							user_role_dynasty: socketDate.data.user_role_dynasty,
							user_role_realname: socketDate.data.user_role_realname,
							msg: socketDate.data.system_message
						})
						that.scrollBottom();
						that.circulate()
					} else if (socketDate.type == "choose_cupbearer") {
						that.openGame(socketDate, 2);
						that.fei_AnimationName = "";
						that.interValNum = 100;
						that.interValTaskNum = 120;
					} else if (socketDate.type == "text") {
						that.msgList.push({
							type: "text",
							data: socketDate.data,
						})
						that.showRecord = false;
						that.showEmoji = false;
						that.showPlus = false;
						that.scrollBottom();
					} else if (socketDate.type == "image") {
						that.msgList.push({
							type: "image",
							data: socketDate.data,
						})
						that.showRecord = false;
						that.showEmoji = false;
						that.showPlus = false;
						that.scrollBottom();
					} else if (socketDate.type == "audio") {
						that.msgList.push({
							type: "audio",
							data: socketDate.data,
							isPlay: false,
						})
						that.showRecord = false;
						that.showEmoji = false;
						that.showPlus = false;
						that.scrollBottom();
					}
				})
			},
			//重新开始
			circulate() {
				var that = this;
				if (that.gameUserArr.length < 6) {
					that.gameTip = "等待人满开始游戏";
					return;
				}
				if (that.hitUser.user_id == that.userInfo.id) {
					console.log("重新开始！")
					that.sendMsg('choose_cupbearer');
					that.hitUser = [];
				}
			},
			//开始游戏
			openGame(data, count) {
				var that = this;
				if (data.room_count >= 6) {
					that.gameData = data;
					that.activeUser = that.gameUserArr[data.cupbearer_key];
					that.hitUser = that.gameUserArr[data.punished_key];
					that.gameTip = `等待${that.activeUser.role.realname}·${that.activeUser.role.dynasty}发杯`;
					if (count == 1) {
						that.interVal = setInterval(() => {
							that.interValNum = --that.interValNum;
							if (that.interValNum <= 0) {
								clearInterval(that.interVal)
								that.sendMsg("hair_cup");
							}
						}, 1000)
						that.msgList.push({
							type: "start",
							user: that.activeUser,
							msg: `发杯，30秒后系统将自动发杯。`
						});
					} else {
						that.msgList.push({
							type: "start",
							user: that.activeUser,
							msg: `发杯。`
						});
					}
				} else {
					// this.activeUser = [];
					that.interValNum = 30;
					that.gameTip = "等待人满开始游戏";
					// that.gameData = [];
					that.fei_AnimationName = ''
					// that.taskUser = [];
					clearInterval(that.interVal);
				}
			},
			//开始
			start() {
				var that = this;
				clearInterval(that.interVal)
				that.sendMsg("hair_cup");
				that.activeUser = [];
			},
			//动画
			animations() {
				var that = this;
				var punished_key = that.gameData.punished_key;
				var indexKey;
				that.ainimationFlag = true;
				clearInterval(that.interVal);
				// 
				that.gameUserArr.forEach((val, index) => {
					if (val.game_room_place_num == punished_key) {
						indexKey = index;
					}
				})
				switch (parseInt(indexKey)) {
					case 0:
						that.fei_AnimationName = "cup5";
						that.sendMsg("game_task")
						that.gameTime = setTimeout(() => {
							console.log("cup5");
							that.taskUser = that.hitUser;
							that.gameTip = `命中 ${that.hitUser.role.realname}·${that.hitUser.role.dynasty}`;
							that.msgList.push({
								type: "hit",
								user: that.hitUser,
								taskType: that.taskData.type
							})
							that.ainimationFlag = false;
							that.scrollBottom();
							that.interValTaskNum = 120;
							clearTimeout(that.gameTime);
						}, 5200)
						break;
					case 1:
						that.fei_AnimationName = "cup6";
						that.sendMsg("game_task")
						that.gameTime = setTimeout(() => {
							console.log("cup6");
							that.taskUser = that.hitUser;
							that.gameTip = `命中 ${that.hitUser.role.realname}·${that.hitUser.role.dynasty}`;
							that.msgList.push({
								type: "hit",
								user: that.hitUser,
								taskType: that.taskData.type
							})
							that.ainimationFlag = false;
							that.scrollBottom();
							that.interValTaskNum = 120;
							clearTimeout(that.gameTime);
						}, 7200)
						break;
					case 2:
						that.fei_AnimationName = "cup3";
						that.sendMsg("game_task")
						that.gameTime = setTimeout(() => {
							console.log("cup3");
							that.taskUser = that.hitUser;
							that.gameTip = `命中 ${that.hitUser.role.realname}·${that.hitUser.role.dynasty}`;
							that.msgList.push({
								type: "hit",
								user: that.hitUser,
								taskType: that.taskData.type
							})
							that.ainimationFlag = false;
							that.scrollBottom();
							that.interValTaskNum = 120;
							clearTimeout(that.gameTime);
						}, 3200)
						break;
					case 3:
						that.fei_AnimationName = "cup4";
						that.sendMsg("game_task")
						that.gameTime = setTimeout(() => {
							console.log("cup4");
							that.taskUser = that.hitUser;
							that.gameTip = `命中 ${that.hitUser.role.realname}·${that.hitUser.role.dynasty}`;
							that.msgList.push({
								type: "hit",
								user: that.hitUser,
								taskType: that.taskData.type
							})
							that.ainimationFlag = false;
							that.scrollBottom();
							that.interValTaskNum = 120;
							clearTimeout(that.gameTime);
						}, 5200)
						break;
					case 4:
						that.fei_AnimationName = "cup1";
						that.sendMsg("game_task")
						that.gameTime = setTimeout(() => {
							console.log("cup1");
							that.taskUser = that.hitUser;
							that.gameTip = `命中 ${that.hitUser.role.realname}·${that.hitUser.role.dynasty}`;
							that.msgList.push({
								type: "hit",
								user: that.hitUser,
								taskType: that.taskData.type
							})
							that.ainimationFlag = false;
							that.scrollBottom();
							that.interValTaskNum = 120;
							clearTimeout(that.gameTime);
						}, 1200)
						break;
					case 5:
						that.fei_AnimationName = "cup2";
						that.sendMsg("game_task")
						that.gameTime = setTimeout(() => {
							console.log("cup2");
							that.taskUser = that.hitUser;
							that.gameTip = `命中 ${that.hitUser.role.realname}·${that.hitUser.role.dynasty}`;
							that.msgList.push({
								type: "hit",
								user: that.hitUser,
								taskType: that.taskData.type
							})
							that.ainimationFlag = false;
							that.scrollBottom();
							that.interValTaskNum = 120;
							clearTimeout(that.gameTime);
						}, 1700)
						break;
				}

			},
		}
	}
</script>

<style scoped lang="scss">
	// -------
	// 任务
	.taskBox {
		padding: 50rpx 50rpx 130rpx 50rpx;
		box-sizing: border-box;

		.title1 {
			color: #555555;
			font-size: 28rpx;
		}

		.title2 {
			opacity: 0.7;
			font-size: 56rpx;
			color: #454344;
			text-align: center;
			margin-top: 50rpx;
		}

		.title3 {
			font-size: 28rpx;
			color: #555555;
			text-align: center;
			margin-top: 30rpx;
		}

		.sendBtn {
			height: 80rpx;
			background: #FE4373;
			border-radius: 10rpx;
			text-align: center;
			line-height: 80rpx;
			color: #fff;
			margin-top: 70rpx;
		}
	}

	.recording {
		width: 320rpx;
		height: 65rpx;
		background: #FE4373;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 28rpx;
	}

	// --------------
	// 用户
	.userBox {
		padding: 50rpx 30rpx 50rpx 50rpx;
		box-sizing: border-box;

		.userTop {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

	}

	.achievements:nth-child(1) {
		margin: 0 !important;
	}

	.poetryFooter {
		height: calc(100% - 60% - 80rpx);
		box-sizing: border-box;

		.msgScroll {
			height: 76.5%;
			box-sizing: border-box;

			.msgList {
				padding: 30rpx;
				box-sizing: border-box;
				line-height: 50rpx;

				.msgItem {
					color: #555555;
					font-size: 26rpx;
					height: 50rpx;
					line-height: 50rpx;
				}
			}
		}

		.poetryBoxFlutter {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0rpx 20rpx;
			height: calc(100% - 75%);
			box-sizing: border-box;

			.inputBox {
				flex: 1;
				height: 70rpx;
				border-radius: 100rpx;
				background: rgba(242, 242, 242, 1);
				display: flex;
				align-items: center;
				padding: 0rpx 20rpx;
				margin: 0rpx 20rpx;
			}

			.sendMsgBtn {
				width: 160rpx;
				height: 66rpx;
				text-align: center;
				line-height: 66rpx;
				border-radius: 10rpx;
				background: #FE4373;
				color: #fff;
			}
		}

	}

	.poetry {
		height: 100vh;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.poetryBox {
		height: 60%;
		background: url(@/static/poetry.jpg);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		position: relative;
	}

	.position {
		display: flex;
		flex-direction: column;
		text-align: center;
	}

	.position:nth-child(1) {
		position: absolute;
		left: 3%;
		top: 10%;
		width: 150rpx;
		z-index: 99;
	}

	.position:nth-child(2) {
		position: absolute;
		right: 3%;
		top: 10%;
		width: 150rpx;
		z-index: 99;
	}

	.position:nth-child(3) {
		position: absolute;
		left: 3%;
		top: 35%;
		width: 150rpx;
		z-index: 99;
	}

	.position:nth-child(4) {
		position: absolute;
		right: 3%;
		top: 35%;
		width: 150rpx;
		z-index: 99;
	}

	.position:nth-child(5) {
		position: absolute;
		left: 3%;
		top: 60%;
		width: 150rpx;
		z-index: 99;
	}

	.position:nth-child(6) {
		position: absolute;
		right: 3%;
		top: 60%;
		width: 150rpx;
		z-index: 99;
	}

	.positionImg {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.positionText {
		font-size: 28rpx;
		color: #fff;
	}

	.selectedBox {
		height: 13%;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 10;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.selectedBtn {
		width: 280rpx;
		height: 80rpx;
		background: #FE4373;
		border: 1rpx solid rgba(255, 255, 0, 1);
		color: #fff;
		border-radius: 10rpx;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.tipsBox {
		height: 13%;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 10;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FE4373;
		background: rgba(255, 255, 255, 0.5);
	}

	.cup {
		position: absolute;
		width: 110rpx;
		height: 80rpx;
		left: 0;
		bottom: 0;
		z-index: 5;
		transition: all 0.3s;
		animation-direction: normal;
		animation-timing-function: linear;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	}

	.cup1 {
		animation-duration: 1s;
		animation-name: cup1;
	}

	.cup2 {
		animation-duration: 1.5s;
		animation-name: cup2;
	}

	.cup3 {
		animation-duration: 3s;
		animation-name: cup3;
	}

	.cup4 {
		animation-duration: 5s;
		animation-name: cup4;
	}

	.cup5 {
		animation-duration: 5s;
		animation-name: cup5;
	}

	.cup6 {
		animation-duration: 7s;
		animation-name: cup6;
	}

	@keyframes cup1 {
		form {
			left: 0%;
			bottom: 0%;
		}

		to {
			left: 28%;
			bottom: 14%;
		}
	}

	@keyframes cup2 {
		form {
			left: 0%;
			bottom: 0%;
		}

		to {
			left: 65%;
			bottom: 28%;
		}
	}

	@keyframes cup3 {
		0% {
			left: 0%;
			bottom: 0%;
		}

		50% {
			left: 65%;
			bottom: 28%;
			transform: scale(1);
		}

		90% {
			transform: scale(0.5);
		}

		97% {
			transform: scale(1);
		}

		100% {
			left: 16%;
			bottom: 45%;
		}
	}

	@keyframes cup4 {
		0% {
			left: 0%;
			bottom: 0%;
		}

		25% {
			left: 65%;
			bottom: 28%;
			transform: scale(1);
		}

		75% {
			left: 16%;
			bottom: 45%;
		}

		95% {
			bottom: 50%;
			transform: scale(0.7);
		}

		98% {
			transform: scale(0.8);
		}

		100% {
			transform: scale(0.8);
			left: 65%;
			bottom: 57%;
		}
	}

	@keyframes cup5 {
		0% {
			left: 0%;
			bottom: 0%;
		}

		25% {
			left: 65%;
			bottom: 28%;
			transform: scale(0.7);
		}

		50% {
			transform: scale(0.8);
			left: 16%;
			bottom: 45%;
		}

		60% {
			transform: scale(0.7);
			bottom: 50%;
		}

		75% {
			transform: scale(0.8);
			left: 65%;
			bottom: 55%;
		}

		80% {
			left: 60%;
			bottom: 57%;
		}

		97% {
			transform: scale(0.6);
		}

		98% {
			transform: scale(0.8);
		}

		100% {
			transform: scale(0.8);
			left: 17%;
			bottom: 75%;
		}
	}

	@keyframes cup6 {

		20% {
			left: 65%;
			bottom: 28%;

		}

		40% {
			left: 16%;
			bottom: 45%;
		}

		60% {
			left: 65%;
			bottom: 57%;
		}

		80% {
			left: 17%;
			bottom: 75%;
		}

		100% {
			left: 64%;
			bottom: 82%;
		}
	}
</style>