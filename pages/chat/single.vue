<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="single">
		<u-navbar id="navbar" title="qwe" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({type: 'navigateBack',delta: 1})"></i>
			</view>
			<view slot="center" style="display: flex;align-items: center;">
				<image mode="aspectFill" :src="toUserData.avatar"
					style="width:50rpx;height:50rpx;border-radius:50%;margin-right: 10rpx;">
				</image>
				<text style="color: #323232;font-size: 36rpx;">{{toUserData.name}}</text>
			</view>
			<view slot="right">
				<i class="ri-more-fill text-3xl"
					@click="$u.route('/pages/chat/chatSeting',{user_id:$Route.query.user_id})"></i>
			</view>
		</u-navbar>

		<!-- 充值 -->
		<view v-if="recharge">
			<u-modal :show="recharge" :showConfirmButton="true" :showCancelButton="true" confirmColor="#FFA000"
				confirmText="充值" cancelText="放弃" @cancel="recharge=false" :background="'#fff'"
				@confirm="$u.route('/pages/mine/recharge')">
				<view style="display: flex;flex-direction: column;">
					<view style="text-align: center;font-size: 32rpx;color: #323232;font-weight: bold;">铜钱不足</view>
					<view style="color:#999;font-size: 26rpx;margin-top: 30rpx;">
						<text>铜钱不足,是否前往充值页面</text>
					</view>
				</view>
			</u-modal>
		</view>
		<scroll-view class="chatContainer" id="chatContainer" :scroll-into-view="scrollTop" @click="boxClick"
			scroll-y="true" show-scrollbar="false" :scroll-with-animation="false" v-show="slideShow"
			:refresher-enabled="isScrollDown" :refresher-triggered="scrollFlag" @refresherrefresh="refresher"
			refresher-background="#F7F7F7">
			<view v-show="showSvga" id="svgaPlayer"
				style="z-index: 99999;box-sizing: border-box;position: fixed;top:0;left: 0;width: 100%;height: 100%;">
				<l-svga ref="svgaPlayer" style="width: 100%;height: 100%;box-sizing: border-box;"></l-svga>
			</view>
			<view style="padding: 0rpx 30rpx;box-sizing: border-box;padding-bottom: 100rpx;">
				<block v-for="(item,index) in chatMsgList" :key="index">
					<!-- 时间 -->
					<view class="text-center" style="padding-top: 10rpx;">
						<text
							class="p-1 px-2 rounded text-xs leading-none text-gray-400 bg-gray-50">{{ $u.timeFormat(item.message.createtime, 'yyyy-mm-dd hh:MM') }}</text>
					</view>
					<!-- 左边 -->
					<view class="chatLeft mt-6" :id="index==0?'scrollLeftTop':''"
						v-if="item.from_user_id == $Route.query.user_id">
						<view class="flex" v-if="item.message.type != 'gift'">
							<image mode="aspectFill" class="block rounded-full w-10 h-10 mr-3" sty
								:src="item.from_user_info.avatar"
								@click="$u.route('/pages/user/home',{user_id:item.from_user_id})">
							</image>
						</view>
						<view>
							<view v-if="item.message.type === 'text'"
								class="rounded-3xl rounded-tl-none p-3  bg-gradient-to-r to-fuchsia-500 whitespace-pre-wrap"
								style="background: #fff;color: #323232;margin-right: 90rpx;font-size: 32rpx;">
								{{ item.message.content }}
							</view>
							<view v-if="item.message.type === 'image'" @click="openImg">
								<u-album :urls="item.message.content.split(',')" singleSize="390" @imgLoad="imgLoad"
									rowCount="1"></u-album>
								<!-- <image :src="item.message.content" style="width: 150rpx;height: 150rpx;"
									mode="aspectFill"></image> -->
							</view>
							<view v-if="item.message.type === 'gift'" style="display: flex;align-items: center;">
								<view class="flex">
									<image mode="aspectFill" style="margin-right: 20rpx;"
										class="block rounded-full w-10 h-10"
										@click="$u.route('/pages/user/home',{user_id:item.from_user_id})"
										:src="item.from_user_info.avatar">
									</image>
								</view>
								<u-album @click="openImg" :urls="item.message.content.split(',')" multipleSize="150"
									@imgLoad="imgLoad" rowCount="1"></u-album>
								<!-- <image :src="item.message.content" style="width: 150rpx;height: 150rpx;"
									mode="aspectFill"></image> -->
							</view>
							<view v-if="item.message.type === 'audio'" @click="handlePlayAudio(item,index)"
								class="flex items-center justify-center rounded-full w-32 h-12 bg-gradient-to-r to-rose-400"
								style="background: #fff;">
								<block v-if="item.message.isPlay==false">
									<view class="ri-voiceprint-line" style="color: #333;font-size: 39rpx;"
										v-for="(item,index) in 2" :key="index">
									</view>
								</block>
								<block v-else>
									<image src="../../static/heiyinpin.gif" style="width: 70rpx;height: 33rpx;">
									</image>
								</block>
							</view>
							<view v-if="item.message.type === 'play'" class="playBox" @click="jumpRoom(item)"
								:style="{background:item.message.background }">
								<image src="../../static/iconImage/pai.png"
									style="width: 19rpx;height: 23rpx;position: absolute;top: 8rpx;right: 16rpx;"
									mode=""></image>
								<view style="padding: 15rpx 15rpx 15rpx 25rpx;display: flex;align-items: center;">
									<block v-if="item.message.room_type=='fhl'">
										<image src="@/static/iconImage/fhl1.png"
											style="width: 96rpx;height: 89rpx;margin-right: 18rpx;" mode="widthFix">
										</image>
									</block>
									<block v-if="item.message.room_type=='scjl'">
										<image src="@/static/iconImage/scjl1.png"
											style="width: 96rpx;height: 89rpx;margin-right: 18rpx;" mode="widthFix">
										</image>
									</block>
									<block v-if="item.message.room_type=='cyjl'">
										<image src="@/static/iconImage/cyjl1.png"
											style="width: 96rpx;height: 89rpx;margin-right: 18rpx;" mode="widthFix">
										</image>
									</block>
									<view style="position: relative;">
										<text
											style="position: relative;font-size: 23rpx;color: #000;z-index: 5;">{{item.message.room_name}}</text>
										<view
											style="height: 6rpx;width: 100%;position: absolute;left: 0;bottom: 0;background: #FFA000;">
										</view>
									</view>
								</view>
								<view style="height: 39rpx;display: flex;align-items: center;justify-content: center;"
									:style="{background:item.message.footerColor }">
									<text style="font-size: 25rpx;color: #fff;">点击进入</text>
									<i class="iconfont icon-right" style="font-size: 25rpx;color: #fff;"></i>
								</view>
							</view>
						</view>
					</view>
					<!-- 右边 -->
					<view class="chatRight mt-6" :id="index==0?'scrollRightTop':''" v-else>
						<view>
							<view v-if="item.message.type === 'text'"
								class="rounded-3xl rounded-tr-none p-3  text-white bg-gradient-to-r  to-fuchsia-500 whitespace-pre-wrap"
								style="background: #FFA000;max-width:80%;margin-left: 90rpx;font-size: 32rpx;">
								{{ item.message.content }}
							</view>
							<view v-if="item.message.type === 'image'" @click="openImg">
								<!-- <image :src="item.message.content" style="width: 150rpx;height: 150rpx;"
									mode="aspectFill"></image> -->
								<u-album :urls="item.message.content.split(',')" multipleSize="390" @imgLoad="imgLoad"
									rowCount="1"></u-album>
							</view>
							<view v-if="item.message.type === 'gift'" style="display: flex;align-items: center;">
								<u-album @click="openImg" :urls="item.message.content.split(',')" multipleSize="150"
									@imgLoad="imgLoad" rowCount="1"></u-album>
								<view class="flex">
									<image mode="aspectFill" style="margin-left: 20rpx;"
										class="block rounded-full w-10 h-10 ml-3" :src="item.from_user_info.avatar">
									</image>
								</view>
								<!-- <image :src="item.message.content" style="width: 150rpx;height: 150rpx;"
									mode="aspectFill"></image> -->
							</view>
							<view v-if="item.message.type === 'audio'" @click="handlePlayAudio(item,index)"
								class="flex items-center justify-center rounded-full w-32 h-12 bg-gradient-to-r to-rose-400"
								style="background: #FFA000;">
								<block v-if="item.message.isPlay==false">
									<view class="ri-voiceprint-line" style="color: #fff;font-size: 39rpx;"
										v-for="(item,index) in 2" :key="index">
									</view>
								</block>
								<block v-else>
									<image src="../../static/baiyinpin.gif" style="width: 70rpx;height: 33rpx;">
									</image>
								</block>
							</view>
							<view v-if="item.message.type === 'play'" class="playBox" @click="jumpRoom(item)"
								:style="{background:item.message.background }">
								<image src="../../static/iconImage/pai.png"
									style="width: 19rpx;height: 23rpx;position: absolute;top: 8rpx;right: 16rpx;"
									mode=""></image>
								<view style="padding: 15rpx 15rpx 15rpx 25rpx;display: flex;align-items: center;">
									<block v-if="item.message.room_type=='fhl'">
										<image src="@/static/iconImage/fhl1.png"
											style="width: 96rpx;height: 89rpx;margin-right: 18rpx;" mode="widthFix">
										</image>
									</block>
									<block v-if="item.message.room_type=='scjl'">
										<image src="@/static/iconImage/scjl1.png"
											style="width: 96rpx;height: 89rpx;margin-right: 18rpx;" mode="widthFix">
										</image>
									</block>
									<block v-if="item.message.room_type=='cyjl'">
										<image src="@/static/iconImage/cyjl1.png"
											style="width: 96rpx;height: 89rpx;margin-right: 18rpx;" mode="widthFix">
										</image>
									</block>
									<view style="position: relative;">
										<text
											style="position: relative;font-size: 23rpx;color: #000;z-index: 5;">{{item.message.room_name}}</text>
										<view
											style="height: 6rpx;width: 100%;position: absolute;left: 0;bottom: 0;background: #FFA000;">
										</view>
									</view>
								</view>
								<view style="height: 39rpx;display: flex;align-items: center;justify-content: center;"
									:style="{background:item.message.footerColor }">
									<text style="font-size: 25rpx;color: #fff;">点击进入</text>
									<i class="iconfont icon-right" style="font-size: 25rpx;color: #fff;"></i>
								</view>
							</view>
						</view>
						<view class="flex" v-if="item.message.type != 'gift'">
							<image mode="aspectFill" style="margin-left: 20rpx;" class="block rounded-full w-10 h-10"
								:src="item.from_user_info.avatar">
							</image>
						</view>
					</view>
				</block>
			</view>
			<view id="scrollBottom" style="height: 20rpx;"></view>
		</scroll-view>
		<!-- 创建房间 -->
		<view style="width: 100%;height: 100vh;position: absolute;top: 0;left: 0;" v-if="showCreate">
			<u-popup :show="showCreate" @close="showCreate = false;createTypeIndex=-1" mode="bottom" :closeable="false"
				:round="20">
				<view class="createRoom" style="position: relative;">
					<text class="ri-close-fill"
						style="font-size: 32rpx;color: #000;position: absolute;top: 40rpx;right: 35rpx;"
						@click="showCreate = false"></text>
					<!-- <view
						style="width: 250rpx;height: 55rpx;display: flex;align-items: center;justify-content: center;margin: 0 auto;background: #FFDDA4;border-radius: 50rpx;padding: 0rpx 25rpx;box-sizing: border-box;margin-top: 25rpx;">
						<input type="text" v-model="createRoomTitle" placeholder="请输入房间名称"
							placeholder-style="color:#666666;fontSize:28rpx;textAlign:center;fontWeight:normal"
							style="text-align: center;color: #FFA000;font-weight: bold;" />
					</view> -->
					<view
						style="display: flex;align-items: center;justify-content: space-between;padding: 50rpx 80rpx 60rpx 80rpx;box-sizing: border-box;margin-top: 25rpx;">
						<view class="createImg" @click="createTypeIndex = 0"
							:style="{border:createTypeIndex==0?'1px solid #F37B1A':'1px solid transparent'}">
							<image src="@/static/iconImage/fhl.png" style="width: 100%;height: 100%;" mode="aspectFill">
							</image>
						</view>
						<view class="createImg" @click="createTypeIndex = 1"
							:style="{border:createTypeIndex==1?'1px solid #F37B1A':'1px solid transparent'}">
							<image src="@/static/iconImage/scjl.png" style="width: 100%;height: 100%;"
								mode="aspectFill"></image>
						</view>
						<view class="createImg" @click="createTypeIndex = 2"
							:style="{border:createTypeIndex==2?'1px solid #F37B1A':'1px solid transparent'}">
							<image src="@/static/iconImage/cyjl.png" style="width: 100%;height: 100%;"
								mode="aspectFill"></image>
						</view>
					</view>
					<view class="sendLink" @click="sendLink">发送房间链接</view>
				</view>
			</u-popup>
		</view>

		<!-- 底部 -->
		<view class="singleFooter" style="position: relative;background: #F7F7F7;">
			<view
				style="margin-bottom: 30rpx;width: 100%;justify-content: space-between;display: flex;align-items: center;padding-right: 30rpx;box-sizing: border-box;">
				<view @click="roomCreate"
					style="width: 175rpx;height: 60rpx;border-radius: 0rpx 36rpx 36rpx 0rpx;background: #FFA000;text-align: center;display: flex;align-items: center;justify-content: center;">
					<view style="color: #fff;font-size: 30rpx;">一起玩</view>
					<i class="iconfont icon-right" style="font-size: 26rpx;color: #fff;"></i>
				</view>
				<view style="position: relative;" :style="{opacity:flower.nums!=0?'1':'0'}" @click="floatClick">
					<image style="width: 100rpx;height: 100rpx;" :src="flower.image" mode="heightFix"></image>
					<text style="color: #F37B1A;;">x{{flower.nums}}</text>
				</view>
			</view>
			<view class="flex p-4" style="width: 100%;box-sizing: border-box;background: #fff;">
				<view class="mr-4 flex items-center" @click="handleVoice">
					<image src="@/static/laba.png" style="width: 49rpx;height: 49rpx;" mode=""></image>
				</view>
				<view style="flex: 1;position: relative;display: flex;background: #F8F8F7;border-radius: 5rpx;"
					class="mr-4">
					<textarea class="" :auto-height="true" @blur="blur" :auto-blur="false" @focus="focus"
						@confirm="handleTextSend" :adjustPosition="false"
						style="padding:20rpx;border-radius: 10rpx;font-size:28rpx;color: rgb(48, 49, 51);width: 100%;box-sizing: border-box;"
						placeholder="说点什么吧" v-model="text"
						placeholder-style="color: rgb(192, 196, 204);font-size:30rpx"></textarea>
					<!-- <view class="mr-4 flex items-center" @click="handleEmoji">
						<image src="@/static/biaoqing.png" style="width: 46rpx;height: 46rpx;" mode=""></image>
					</view> -->
				</view>
				<view class="flex items-center mr-4 " @click="handleImage">
					<image src="@/static/tupian.png" style="width: 44rpx;height: 44rpx;" mode=""></image>
					<!-- <i class="ri-image-fill text-4xl leading-none text-gray-400"></i> -->
				</view>
				<view class="flex items-center" v-if="!text" @click="showGiftClick">
					<image src="@/static/liwu3.png" style="width: 56rpx;height: 56rpx;" mode=""></image>
				</view>
				<view class="flex items-center" v-if="text" @touchend.prevent="handleTextSend">
					<text class="rounded-full p-2 px-3 text-base text-white bg-gradient-to-r to-fuchsia-500"
						style="background: #FFA000;">发送</text>
				</view>
			</view>
			<!-- 语音 -->
			<view class="flex flex-col items-center bg-gray-100 p-4 h-60 overflow-y-scroll" v-if="showRecord">
				<view class="text-xs leading-none text-gray-500">{{ recordTip }}</view>
				<view class="flex justify-center items-center mt-16" @touchstart="handleRecordStart"
					@touchmove.stop.prevent="handleRecordDoing" @touchend="handleRecordStop">
					<view class="relative flex justify-center items-center rounded-full">
						<view class="flex justify-center items-center rounded-full w-20 h-20  z-10"
							style="background: #FFA000 !important;">
							<i class="ri-mic-fill text-4xl leading-none text-white"></i>
						</view>
						<view v-if="recording" class="animate-ping absolute rounded-full p-2 bg-fuchsia-200 opacity-50"
							style="background: #FFA000 !important;">
							<view class="rounded-full w-20 h-20 p-2 opacity-50">
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 表情 -->
			<view class="grid grid-cols-8 gap-4 bg-gray-100 p-4 h-60 overflow-y-scroll" v-if="showEmoji">
				<view class="flex" v-for="(item, index) in emojiList" :key="index" :item="item"
					@click="handleEmojiSend(item)">
					<text class="leading-none" style="font-size: 55rpx;">{{ item }}</text>
				</view>
			</view>
			<!-- 礼物 -->
			<view v-if="showGift" class="bg-gray-100 h-60 overflow-y-scroll">
				<view class="grid grid-cols-4 gap-4 bg-gray-100 p-4 " style="padding-bottom: 100rpx;">
					<view v-for="(item, index) in giftList" :key="index" :item="item" v-if="item.status!='hidden'">
						<view class="flex flex-col items-center" @click="handleGiftSend(item)">
							<view style="overflow: hidden;" class="w-20 h-20">
								<image class="block" style="width: 100%;height: 100%;" :src="item.image"
									lazy-load="false"></image>
							</view>

							<text class="mt-1">{{ item.title }}</text>
							<view style="margin-top: 20rpx;display: flex;align-items: center;">
								<image style="width: 20rpx;height: 20rpx;" src="@/static/qian.png" mode=""></image>
								<text style="font-size: 20rpx;color: #808080;margin-left: 5rpx;">{{ item.price }}</text>
							</view>
						</view>
					</view>
				</view>
				<view
					style="display: flex;flex-direction: row;justify-content: end;padding-top: 30rpx;margin-right: 27rpx;position: fixed;bottom: 0;left: 0;width: 100%;background: linear-gradient(rgba(255,255,255,0), #FFFFFF);height: 125rpx;align-items: center;padding-right: 30rpx;box-sizing: border-box;">
					<view style="display: flex;align-items: center;margin-right: 20rpx;">
						<image style="width: 38rpx;height: 38rpx;" src="@/static/qian.png" mode=""></image>
						<text
							style="font-size: 20rpx;color: #FFA000;margin-left: 10rpx;">余额{{userInfoData.money}}</text>
					</view>
					<view
						style="width: 140rpx;height: 66rpx;text-align: center;line-height: 66rpx;border-radius: 50rpx;border-radius: 50rpx;font-size: 30rpx;color: #fff;background: #FFA000;"
						@click="$u.route('/pages/mine/recharge')">
						充值
					</view>
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
				<view class="flex flex-col justify-center text-center" @click="handleGift">
					<view class="rounded-lg bg-white p-4 mx-auto">
						<i class="ri-gift-fill block text-2xl leading-none text-black"></i>
					</view>
					<view class="text-base leading-none mt-2">礼物</view>
				</view>
			</view>
		</view>
		<view class="sdasdas" :style="{height:pageHeight+'px'}"></view>
		<reward :giftIsShow="giftIsShow"></reward>
		<feiqslsHit></feiqslsHit>
		<feiauthority ref="authority" @imageEmpower='imageEmpower' @audioEmpower="audioEmpower"></feiauthority>
	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex'
	import permision from "@/js_sdk/wa-permission/permission.js"
	import reward from "@/components/fei-reward/fei-reward.vue"
	export default {
		name: 'single',
		components: {
			reward
		},
		data() {
			return {
				createTypeIndex: -1,
				createRoomTitle: "",
				showCreate: false,
				platform: uni.getSystemInfoSync().platform,
				scrollAnimation: false,
				toUserData: {
					"avatar": "",
					"name": ""
				},
				chatMsgList: null,
				giftList: [],
				scrollTop: "",
				slideShow: true,
				showRecord: false,
				showEmoji: false,
				showPlus: false,
				showGift: false,
				showSvga: false,
				text: '',
				pageHeight: 0,
				recordTip: "按住说话",
				recorder: uni.getRecorderManager(),
				recording: false,
				recordStoping: false,
				recordTip: "按住说话",
				recordTimer: null,
				recordLength: 0,
				recordPoint: {
					identifier: 0,
					Y: 0
				},
				audio: uni.createInnerAudioContext(),
				giftIsShow: false,
				recharge: false,
				isScrollDown: true,
				scrollFlag: true,
				historyPage: 1,
				emojiList: ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍',
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
				],
				floatHeight: "15",
				userInfoData: [],
				flower: [],
				showMsg: false,
				is_in_black: 0,
				userInfo: uni.getStorageSync("userInfo")
			}
		},
		onLoad() {
			var that = this;
			this.getChatMessageList()
			this.getGiftList()
			this.getUserProfile();
			this.watchKeyboard();
			this.watchRecorder()
			this.getUserInfo()
			this.getflower()
			this.initSocKet()
		},
		onHide() {
			this.showSvga = false;
		},
		created() {
			var that = this;
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
		},
		onUnload() {
			var that = this;
			this.audio.destroy()
			this.showSvga = false;
			if (Boolean(uni.getStorageSync("roomData")) == false) {
				getApp().globalData.socketTask._callbacks.message.splice(1)
			}
		},
		methods: {
			imgLoad() {
				this.scrollBottom()
			},
			//创建房间
			roomCreate() {
				this.showCreate = true
			},
			sendLink() {
				let type = "";
				let background = '';
				let footerColor = ''
				switch (this.createTypeIndex) {
					case 0:
						type = "fhl"
						background = 'linear-gradient(#FFDBCC, #FFFFFF)';
						footerColor = '#F7B793'
						break;
					case 1:
						type = "scjl"
						background = 'linear-gradient(#E9FFC6, #FFFFFF)'
						footerColor = '#CEEDB6'
						break;
					case 2:
						type = "cyjl"
						background = 'linear-gradient(#DBFCD3, #FFFFFF)'
						footerColor = '#C1EDB6'
						break;
				}
				if (type == '') {
					uni.showToast({
						icon: "none",
						title: "请选择类型"
					})
					return;
				}
				this.$api("chat.playTogether", {
					to_user_id: this.$Route.query.user_id,
					type: type,
				}).then((res) => {
					if (res.code == 1) {
						var obj = {
							from_user_id: this.userInfo.id,
							from_user_info: {
								user_id: this.userInfo.id,
								avatar: this.userInfo.avatar,
							},
							message: {
								content: ``,
								room_id: res.data.message.room_id,
								room_name: res.data.message.room_name,
								room_type: type,
								type: 'play',
								background: background,
								footerColor: footerColor
							},
						}
						this.chatMsgList.push(obj);
						this.createTypeIndex = -1;
						this.showCreate = false;
						this.createRoomTitle = '';
						this.scrollBottom()
					}
				})
			},
			getflower() {
				let that = this;
				that.$api("gift.is_flower").then(res => {
					if (res.code == 1) {
						that.flower = res.data;
					} else {
						that.flower = [];
					}
				})
			},
			jumpRoom(item) {
				console.log(item.message.room_type)
				switch (item.message.room_type) {
					case 'qsls':

						break;
					case 'fhl':
						this.$u.route("/pages/chat/chatRoom", {
							roomId: item.message.room_id,
							type: item.message.room_type
						})
						break;
					case 'cyjl':
						this.$u.route("/pages/chat/chatRoom", {
							roomId: item.message.room_id,
							type: item.message.room_type
						})
						break;
					case 'scjl':
						this.$u.route("/pages/chat/chatRoom", {
							roomId: item.message.room_id,
							type: item.message.room_type
						})
						break;
				}
			},
			getUserInfo() {
				var that = this;
				that.$api("user.info").then(res => {
					if (res.code == 1) {
						that.userInfoData = res.data;
					}
				})
			},
			floatClick() {
				var that = this;
				that.showPlus = false;
				that.showRecord = false;
				that.showEmoji = false;
				that.floatHeight = "40"
				if (that.is_in_black == 1) {
					uni.showToast({
						icon: "none",
						title: "您已被拉黑"
					})
					return;
				}
				that.$api("gift.giveGift", {
					"receiver_user_id": that.$Route.query.user_id,
					"nums": 1,
					"gift_id": that.flower.gift_id
				}).then(res => {
					if (res.code == 1) {

						var obj = {
							from_user_id: that.userInfo.id,
							from_user_info: {
								user_id: that.userInfo.id,
								avatar: that.userInfo.avatar,
							},
							message: {
								content: that.flower.only_flower_image,
								gift_id: that.flower.gift_id,
								gift_svga: that.flower.only_flower_image,
								type: 'gift',
								gift_image: that.flower.only_flower_image
							},
						}
						that.sendMessage({
							content: that.flower.only_flower_image,
							gift_id: that.flower.gift_id,
							gift_svga: that.flower.only_flower_image,
							type: 'gift',
						})
						that.chatMsgList.push(obj);
						that.scrollBottom()
						that.getflower()
					}
				})
				that.scrollBottom();
			},
			openImg() {
				uni.setStorageSync("openImg", true);
			},
			single() {
				let that = this
				that.$api('chat.single', {
					user_id: that.$Route.query.user_id
				}).then(res => {
					if (res.code === 1) {
						if (res.data.send_message != '') {
							var poetryItem = uni.getStorageSync("poetryItem");
							if (poetryItem == '') {
								var obj = {
									avatar: that.userInfo.avatar,
									content: res.data.send_message,
									createtime: that.getDate(),
									type: "text",
									user_id: that.userInfo.id,
								};
								that.chatMsgList.push(obj);
								that.sendMessage(res.data.send_message, 'text');
								that.scrollBottom()
							} else {}
						}
						uni.setStorageSync('CHATSESSIONID', res.data.session_id)
					} else {
						that.$u.toast(res.msg)
					}
				})
			},
			boxClick() {
				this.showRecord = false;
				this.showEmoji = false;
				this.showPlus = false;
				this.showGift = false;
				this.floatHeight = "15"
			},
			//下拉刷新
			refresher() {
				var that = this;
				that.scrollFlag = true;
				that.historyPage++;
				that.$nextTick(() => {
					that.getChatMessageList()
				})
			},

			//获取聊天历史记录
			getChatMessageList() {
				var that = this;
				that.$api("chat.getChatMessageList", {
					to_user_id: that.$Route.query.user_id,
					page: that.historyPage
				}).then(res => {
					if (res.code == 1) {
						that.is_in_black = res.data.is_in_black;
						res.data.list.forEach((val, index) => {
							if (val.message.type == 'play') {
								switch (val.message.room_type) {
									case "fhl":
										val.message.background = 'linear-gradient(#FFDBCC, #FFFFFF)';
										val.message.footerColor = '#F7B793'
										break;
									case "scjl":
										val.message.background = 'linear-gradient(#E9FFC6, #FFFFFF)'
										val.message.footerColor = '#CEEDB6'
										break;
									case "cyjl":
										val.message.background = 'linear-gradient(#DBFCD3, #FFFFFF)'
										val.message.footerColor = '#C1EDB6'
										break;
								}
							}
							val.message.isPlay = false
						})
						if (that.historyPage == 1) {
							that.chatMsgList = res.data.list.reverse()
						} else {
							that.chatMsgList.unshift(...res.data.list.reverse())
						}
						that.$nextTick(() => {
							that.scrollFlag = false;
							if (that.historyPage == res.data.page_data.total_page) {
								that.isScrollDown = false
							}
							if (that.historyPage == 1) {
								that.scrollBottom();
							} else {
								that.scrollLeftTop()
								that.scrollRightTop()
							}
						})
					}
				})
			},
			//初始化socket
			initSocKet() {
				var that = this;
				getApp().globalData.socketTask.onMessage((res) => {
					if (JSON.parse(res.data).cate == 'chat') {
						var socketData = JSON.parse(res.data);
						console.log(socketData)
						switch (JSON.parse(res.data).data.message.type) {
							case "gift":
								if (socketData.data.from_user_id == that.$Route.query.user_id) {
									that.giftList.forEach((val, index) => {
										if (val.id == socketData.data.message.gift_id) {
											that.gift = val;
											that.handleGiftPlay()
										}
									})
								}
								break;
						}
						if (socketData.data.from_user_id == that.$Route.query.user_id) {
							var item = JSON.parse(res.data).data;
							if (item.message.type == 'play') {
								switch (item.message.room_type) {
									case "fhl":
										item.message.background = 'linear-gradient(#FFDBCC, #FFFFFF)';
										item.message.footerColor = '#F7B793'
										break;
									case "scjl":
										item.message.background = 'linear-gradient(#E9FFC6, #FFFFFF)'
										item.message.footerColor = '#CEEDB6'
										break;
									case "cyjl":
										item.message.background = 'linear-gradient(#DBFCD3, #FFFFFF)'
										item.message.footerColor = '#C1EDB6'
										break;
								}
							}
							item.message.isPlay = false
							that.scrollAnimation = true;
							that.chatMsgList.push(item);
							that.scrollBottom();
						}
					}
				})
			},

			//发送文本消息
			handleTextSend() {
				let that = this;
				if (that.is_in_black == 1) {
					uni.showToast({
						icon: "none",
						title: "您已被拉黑"
					})
					return;
				}
				if (that.text === '') {
					return
				} else {
					that.scrollAnimation = true;
					var obj = {
						from_user_id: that.userInfo.id,
						from_user_info: {
							user_id: that.userInfo.id,
							avatar: that.userInfo.avatar,

						},
						message: {
							content: that.text,
							type: 'text'
						},
						to_user_id: "",
						to_user_info: {},
					}
					that.sendMessage({
						content: that.text,
						type: "text",
					})
					that.chatMsgList.push(obj);
					that.text = '';
					that.scrollBottom()
				}
			},
			//发送socket信息
			sendMessage(data) {
				let that = this;
				let params = {
					cate: "chat",
					code: 1,
					msg: "success",
					data: {
						from_user_id: that.userInfo.id,
						to_user_id: that.$Route.query.user_id,
						message: data
					}
				}
				console.log("-------发送消息----------")
				getApp().globalData.socketTask.send({
					data: JSON.stringify(params),
					success() {
						console.log("webscoket发送信息成功");
						that.sendStr = "";
					},
					fail() {
						console.log("webscoket发送信息失败");
					}
				});
			},
			//播放语音
			handlePlayAudio(item, index) {
				let that = this;
				if (!item.message.content) {
					that.$u.toast('语音不能为空');
					return false
				} else {
					that.audio.destroy();
					that.chatMsgList.forEach((val, index) => {
						if (val.message.type == 'audio') {
							val.message.isPlay = false;
						}
					})
					that.audio = uni.createInnerAudioContext();
					that.audio.src = item.message.content;
					that.chatMsgList[index].message.isPlay = true;
					that.audio.play()
					that.audio.onEnded((e) => {
						that.chatMsgList[index].message.isPlay = false;
					})
				}
			},
			//监听录音
			watchRecorder() {
				var that = this;
				that.recorder.onStart((e) => {
					that.recordStart(e)
				})
				that.recorder.onStop((e) => {
					that.recordStop(e)
				})
			},
			showGiftClick() {
				var that = this;
				if (that.is_in_black == 1) {
					uni.showToast({
						icon: "none",
						title: "您已被拉黑"
					})
					return;
				}
				that.showGift = !that.showGift;
				that.showEmoji = false;
				that.showPlus = false;
				that.showRecord = false;
			},
			//表情
			handleEmoji() {
				var that = this;
				that.showRecord = false;
				that.showEmoji = !that.showEmoji;
				that.showPlus = false
				that.showGift = false;
				that.floatHeight = that.showEmoji == true ? '40' : "15"
				that.scrollBottom()
			},
			handleEmojiSend(item) {
				let that = this
				that.text += item
			},
			//礼物
			handleGift() {
				let that = this
				that.showGift = !that.showGift
				that.showPlus = false
			},
			//礼物列表
			getGiftList() {
				let that = this
				that.$api('gift.lists').then(res => {
					if (res.code === 1) {
						that.giftList = res.data;
					}
				})
			},
			handleGiftSend(item) {
				let that = this;
				that.gift = item;
				that.$api("gift.giveGift", {
					"receiver_user_id": that.$Route.query.user_id,
					"nums": 1,
					"gift_id": item.id
				}).then(data => {
					if (data.code == 1) {
						that.getUserInfo()
						var obj = {
							from_user_id: that.userInfo.id,
							from_user_info: {
								user_id: that.userInfo.id,
								avatar: that.userInfo.avatar,
							},
							message: {
								content: that.gift.image,
								gift_id: that.gift.id,
								gift_svga: that.gift.url,
								type: 'gift',
								gift_image: that.gift.image
							},
						}
						that.chatMsgList.push(obj);
						that.sendMessage({
							content: that.gift.image,
							gift_id: that.gift.id,
							gift_svga: that.gift.url,
							type: 'gift',
						})
						that.scrollBottom()
						if (item.url != null) {
							that.handleGiftPlay();
						}
					} else if (data.code == 3001) {
						that.recharge = true;
					} else if (data.code == 2001) {
						that.showGift = false;
						uni.showToast({
							icon: "none",
							title: data.msg,
						})
					} else if (data.code == 0) {
						that.showGift = false;
						uni.showToast({
							icon: "none",
							title: data.msg,
						})
					}
				})
			},
			//播放礼物动画
			handleGiftPlay() {
				let that = this;
				that.showSvga = true;
				that.$refs.svgaPlayer.render(async (parser, player) => {
					let videoItem = await parser.load(that.gift.url);
					await player.setVideoItem(videoItem)
					player.loops = 1;
					player.setContentMode(that.gift.is_full_screen == 1 ? "AspectFill" : "AspectFit")
					player.startAnimation();

					player.onFinished(() => {
						that.showSvga = false
					})
				})
			},
			//录音授权
			audioEmpower() {
				this.scrollBottom();
				this.showRecord = !this.showRecord
				this.showEmoji = false;
				this.showPlus = false;
				this.showGift = false;
				this.floatHeight = this.showRecord == true ? '40' : "15"
			},
			//图片授权
			imageEmpower() {
				var that = this;
				var token = uni.getStorageSync("token")
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: (res) => {
						res.tempFilePaths.forEach(item => {
							uni.uploadFile({
								url: uni.getStorageSync("hostData").host + "/api/hey/" +
									'index/upload',
								filePath: item,
								name: 'file',
								formData: {
									"token": token
								},
								success: res => {
									res = JSON.parse(res.data)
									if (res.code === 1) {
										var obj = {
											from_user_id: that.userInfo.id,
											from_user_info: {
												user_id: that.userInfo.id,
												avatar: that.userInfo.avatar,

											},
											message: {
												content: res.data.fullurl,
												type: 'image'
											},
										}
										that.chatMsgList.push(obj);
										that.sendMessage({
											content: res.data.fullurl,
											type: "image",
										})
										that.scrollBottom()
									} else {
										that.$u.toast(res.msg)
									}
								},
								complete: e => {}
							})
						})
					}
				})
			},
			//录音
			handleVoice() {
				let that = this;
				if (that.is_in_black == 1) {
					uni.showToast({
						icon: "none",
						title: "您已被拉黑"
					})
					return;
				}
				// #ifdef APP
				this.$refs.authority.show('recorde')
				// #endif
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
			handleRecordStop(e) {
				let that = this
				console.log('touch stop')
				if (!that.recording) {
					return
				}
				that.recording = false
				that.recordTip = '按住说话'
				that.recorder.stop()
			},
			handleRecordDoing(e) {
				let that = this
				console.log('touch move')
				if (that.recordPoint.Y - e.touches[0].clientY >= uni.upx2px(100)) {
					that.recordStoping = true
					that.recordTip = '松开手指，取消发送'
				}
			},
			recordStart(e) {
				let that = this
				console.log('recorder start' + JSON.stringify(e));
				that.recordLength = 0
				that.recordTimer = setInterval(() => {
					that.recordLength++
				}, 1000)
			},
			recordStop(e) {
				let that = this
				console.log('recorder stop' + JSON.stringify(e))
				var token = uni.getStorageSync("token");
				that.recording = false
				clearInterval(that.recordTimer)
				uni.uploadFile({
					url: uni.getStorageSync("hostData").host + "/api/hey/" + 'index/upload',
					filePath: e.tempFilePath,
					name: 'file',
					formData: {
						"token": token
					},
					success: res => {
						res = JSON.parse(res.data)
						if (res.code === 1) {
							var obj = {
								from_user_id: that.userInfo.id,
								from_user_info: {
									user_id: that.userInfo.id,
									avatar: that.userInfo.avatar,
								},
								message: {
									content: res.data.fullurl,
									type: 'audio',
									isPlay: false
								},
							}
							that.chatMsgList.push(obj);
							that.sendMessage({
								content: res.data.fullurl,
								type: "audio",
							})
							that.scrollBottom()
						} else {
							that.$u.toast(res.msg)
						}
					},
					complete: e => {}
				})
			},
			//发送图片
			handleImage() {
				let that = this
				var token = uni.getStorageSync("token");
				getApp().globalData.isSelectImage = true;
				if (that.is_in_black == 1) {
					uni.showToast({
						icon: "none",
						title: "您已被拉黑"
					})
					return;
				}
				// #ifdef APP
				this.$refs.authority.show('image')
				// #endif
				// #ifdef H5
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: (res) => {
						res.tempFilePaths.forEach(item => {
							uni.uploadFile({
								url: uni.getStorageSync("hostData").host + "/api/hey/" +
									'index/upload',
								filePath: item,
								name: 'file',
								formData: {
									"token": token
								},
								success: res => {
									res = JSON.parse(res.data)
									if (res.code === 1) {
										var obj = {
											from_user_id: that.userInfo.id,
											from_user_info: {
												user_id: that.userInfo.id,
												avatar: that.userInfo.avatar,

											},
											message: {
												content: res.data.fullurl,
												type: 'image'
											},
										}
										that.chatMsgList.push(obj);
										that.sendMessage({
											content: res.data.fullurl,
											type: "image",
										})
										that.scrollBottom()
									} else {
										that.$u.toast(res.msg)
									}
								},
								complete: e => {}
							})
						})
					}
				})
				// #endif
			},
			//更多
			handlePlus() {
				let that = this
				that.scrollBottom()
				that.showPlus = !that.showPlus
				that.showRecord = false
				that.showEmoji = false;
				that.showGift = false;
				that.floatHeight = that.showPlus == true ? '40' : "15"
				// that.showGift = false
			},
			// 获得焦点后
			focus(e) {
				this.scrollBottom();
				this.showRecord = false;
				this.showEmoji = false;
				this.showGift = false;
				this.showPlus = false;
				// 可用区域高度减去软键盘高度，最后加上px转为字符串
			},
			// 失去焦点后
			blur() {
				this.pageHeight = 0;
			},
			//监听键盘
			watchKeyboard() {
				var that = this;
				uni.onKeyboardHeightChange(res => {
					that.pageHeight = res.height;
					if (res.height == 0) {
						that.floatHeight = "15";
					} else {
						that.floatHeight = "50";
					}
				})
			},
			//获取聊天对象信息
			getUserProfile() {
				let that = this
				that.$api('user.profile', {
					user_id: that.$Route.query.user_id
				}).then(res => {
					if (res.code === 1) {
						if (res.data == null) {
							uni.showToast({
								icon: "none",
								title: "用户已注销"
							})
							return;
						}
						if (res.data.role.realname != null && res.data.role.realname != '') {
							that.toUserData.name = res.data.role.realname + "·" + res.data.role.dynasty
						} else {
							that.toUserData.name = "无名氏"
						}
						that.toUserData.avatar = res.data.avatar
					}
				})
			},
			scrollBottom() {
				let that = this
				let timeout = null
				that.scrollTop = ''
				clearTimeout(timeout)
				timeout = setTimeout(() => {
					that.scrollTop = 'scrollBottom';
				}, 100)
			},
			scrollLeftTop() {
				let that = this
				let timeout = null
				that.scrollTop = ''
				clearTimeout(timeout)
				timeout = setTimeout(() => {
					that.scrollTop = 'scrollLeftTop';
				}, 50)
			},
			scrollRightTop() {
				let that = this
				let timeout = null
				that.scrollTop = ''
				clearTimeout(timeout)
				timeout = setTimeout(() => {
					that.scrollTop = 'scrollRightTop';
				}, 300)
			},
			//获取时间戳
			getDate() {
				var tmp = Date.parse(new Date()).toString();
				tmp = tmp.substr(0, 10);
				return tmp;
			}
		}
	}
</script>
<style lang="scss" scoped>
	.playBox {
		width: 320rpx;
		height: 156rpx;
		border-radius: 18rpx;
		overflow: hidden;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		overflow: hidden;
		// background: linear-gradient(#FFDBCC, #FFFFFF);
	}

	.createRoom {
		width: 100vw;
		height: 568rpx;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		background: linear-gradient(#FFE6BD, #FFF3E0, #FFFFFF, #FFFFFF);

		.createImg {
			width: 120rpx;
			height: 225rpx;
			border-radius: 65rpx;
		}

		.sendLink {
			width: 236rpx;
			height: 68rpx;
			text-align: center;
			line-height: 68rpx;
			color: #fff;
			font-size: 28rpx;
			border-radius: 10rpx;
			margin: 0 auto;
			background: #FFA000;
		}
	}

	/* ---------- */
	.single {
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100vw;
		box-sizing: border-box;
	}

	.chatContainer {
		height: 0;
		flex: 1;
		background: #F7F7F7;
		box-sizing: border-box;
		position: relative;
	}

	.chatContainer::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	}

	.chatLeft {
		display: flex;
	}

	.chatRight {
		display: flex;
		justify-content: flex-end;
	}
</style>