<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="">
		<u-navbar :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left" @click="">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
			<view slot="right" style="display: flex;align-items: center;">
				<text style="color: #333;font-size: 33rpx;margin-right: 50rpx;" @click="openPreview">预览</text>
				<view class="fabu" @click="doPublish()">发布</view>
			</view>
		</u-navbar>
		<view style="height: 25rpx;background: #f7f7f7;"></view>
		<view class="contentOne">
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<view style="display: flex;align-items: center;">
					<text style="color: #333;font-size: 35rpx;margin-right: 20rpx;">正文</text>
					<text style="color: #666666;font-size: 28rpx;">（将显示在窗口正中）</text>
				</view>
				<view style="display: flex;align-items: center;" @click="originalClick">
					<block v-if="isoriginal==false">
						<image style="width: 30rpx;height: 30rpx;" src="../../static/iconImage/radio2.png" mode="">
						</image>
					</block>
					<block v-else>
						<image style="width: 30rpx;height: 30rpx;" src="../../static/iconImage/radio.png" mode="">
						</image>
					</block>
					<text style="color:#333 ;font-size: 28rpx;margin-left: 15rpx;">原创作品</text>
				</view>
			</view>
			<textarea v-model="form.content" name="" id="" cols="30" rows="10"
				style="height: 300rpx;font-size: 32rpx;color: #606266;margin-top: 26rpx;width: 100%;"
				placeholder="发布内容，打造历史人物这一世风采" placeholder-style="font-size:32rpx;color:#999999;"></textarea>
		</view>
		<!-- <view style="height: 25rpx;background: #f7f7f7;"></view> -->
		<!-- <view class="bgImgs">
			<view style="display: flex;align-items: center;">
				<text style="color: #333;font-size: 35rpx;margin-right: 20rpx;">背景</text>
			</view>
			<view style="display: flex;align-items: center;">
				<block v-for="(item,index) in bgImg" :key="index">
					<view class="bgImgItem" @click="bgIndex = index"
						:style="{border:bgIndex==index?'1px solid #FFA000':'1px solid transparent '}">
						<image style="width: 100% ;height: 100%;" :src="item.image" mode="aspectFill"></image>
					</view>
				</block>
			</view>
		</view> -->
		<view style="height: 25rpx;background: #f7f7f7;"></view>
		<view class="contentTwo">
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<view style="display: flex;align-items: center;">
					<text style="color: #333;font-size: 35rpx;margin-right: 20rpx;">故事</text>
					<text style="color: #666666;font-size: 28rpx;">（将显示在窗口底部）</text>
				</view>
			</view>
			<textarea v-model="form.story" maxlength="300" name="" id="" cols="30" rows="10"
				style="height: 300rpx;font-size: 32rpx;color: #606266;margin-top: 26rpx;width: 100%;"
				placeholder="内容相关的故事背景，例如诗词的创作背景" placeholder-style="font-size:32rpx;color:#999999;"></textarea>
			<view class="flex flex-wrap" v-if="fei_cate.length">
				<view class="flex items-center rounded-full text-orange-500" style="color: #FFA000;font-size: 28rpx;"
					@click="delGroup()" v-for="(item,index) in fei_cate">
					<view class="text-base">#{{item.content}}</view>
					<i class="ri-close-line ml-2" style="font-size: 30rpx;color: #000000;" @click="delTag(index)"></i>
				</view>
			</view>
			<view class="rounded-lg">
				<view class="mt-4" v-if="form.audio" style="display: flex;align-items: center;">
					<view @click="handlePlayAudio(form.audio)"
						style="width: 328rpx;background: #FFA000;justify-content: space-around;padding: 0rpx 10rpx;"
						class="flex items-center  rounded-full w-32 h-10 bg-gradient-to-r  to-rose-400">
						<i class="iconfont" :class="isPlay==false?'icon-bofang1':'icon-bofang'"
							style="font-size: 50rpx;color: #FFFFFF;"></i>
						<block>
							<view v-if="isPlay==false"
								style="display: flex;align-items: center;justify-content: center;flex: 1;">
								<view class="ri-voiceprint-line" style="color: #fff;font-size: 39rpx;"
									v-for="(item,index) in 4" :key="index">
								</view>
							</view>
							<view v-if="isPlay"
								style="display: flex;align-items: center;justify-content: center;flex: 1;">
								<image src="../../static/bofang.gif" style="width:90rpx;height: 25rpx;">
								</image>
							</view>
						</block>
						<!-- <image src="/static/bofang.gif" style="width: 80rpx;height: 45rpx;" v-else mode="heightFix"></image> -->
						<!-- <i class="ri-voiceprint-line text-2xl text-white" style="flex: 1;" :class="audioStatus ? 'animate-pulse' : ''"></i> -->
						<text style="color: #FFFFFF;font-size: 28rpx;margin-left: 20rpx;"
							v-if="form.timer !=0">{{form.timer}}s</text>
					</view>
					<view class="ri-close-line" @click="clearAudio"
						style="padding: 0rpx;background: rgba(0,0,0,0.5);margin-left: 30rpx;color: #fff;font-size: 40rpx;border-radius: 50%;box-sizing: border-box;">
					</view>
				</view>
				<view v-if="form.video" class="mt-4">
					<view @click="handlePlayVideo(form.video)"
						class="mt-4 flex items-center justify-center rounded w-60 bg-gray-200">
						<video class="z-0" :src="form.video" id="video" direction="0" object-fit="fill"
							page-gesture="true" controls="false"></video>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 25rpx;background: #f7f7f7;"></view>
		<!-- 工具栏 -->
		<view class="">
			<view class="flex flex-row-center p-4 bg-white" style="border-top: 1px solid #ECECEC;">
				<view class="flex-1 flex">
					<view class="flex items-center  p-3 rounded-full mr-4" @click="selectIndex = 0">
						<view style="display: flex;align-items: center;justify-content: center;">
							<view style="position: relative;text-align: center;display: inline;margin: 0 auto;">
								<text
									style="color: #333;font-size:32rpx ;position: relative;z-index: 1;font-family: font-test !important;">背景</text>
								<text v-if="selectIndex==0"
									style="width: 100%;height: 13rpx;background: #FFA000;position: absolute;left: 0;bottom: 0;"></text>
							</view>
						</view>
					</view>
					<view class="flex items-center  p-3 rounded-full mr-4" @click="selectIndex = 1">
						<view style="display: flex;align-items: center;justify-content: center;">
							<view style="position: relative;text-align: center;display: inline;margin: 0 auto;">
								<text
									style="color: #333;font-size:32rpx ;position: relative;z-index: 1;font-family: font-test !important;">图片</text>
								<text v-if="selectIndex==1"
									style="width: 100%;height: 13rpx;background: #FFA000;position: absolute;left: 0;bottom: 0;"></text>
							</view>
						</view>
					</view>
					<view class="flex items-center p-3 rounded-full mr-4" @click="selectIndex = 2">
						<view style="display: flex;align-items: center;justify-content: center;">
							<view style="position: relative;text-align: center;display: inline;margin: 0 auto;">
								<text
									style="color: #333;font-size:32rpx ;position: relative;z-index: 1;font-family: font-test !important;">话题</text>
								<text v-if="selectIndex==2"
									style="width: 100%;height: 13rpx;background: #FFA000;position: absolute;left: 0;bottom: 0;"></text>
							</view>
						</view>
					</view>
					<view class="flex items-center  p-3 rounded-full" @click="$refs.authority.show('recorde')">
						<view style="display: flex;align-items: center;justify-content: center;">
							<view style="position: relative;text-align: center;display: inline;margin: 0 auto;">
								<text
									style="color: #333;font-size:32rpx ;position: relative;z-index: 1;font-family: font-test !important;">语音</text>
								<text v-if="selectIndex==3"
									style="width: 100%;height: 13rpx;background: #FFA000;position: absolute;left: 0;bottom: 0;"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<block v-if="selectIndex==0">
				<view class="bgImgs" style="padding-bottom: 100rpx;">
					<!-- <view style="display: flex;align-items: center;">
						<text style="color: #333;font-size: 35rpx;margin-right: 20rpx;">背景</text>
					</view> -->
					<view style="display: flex;align-items: center;flex-flow: wrap;">
						<block v-for="(item,index) in bgImg" :key="index">
							<view class="bgImgItem" @click="bgIndex = index"
								:style="{border:bgIndex==index?'1px solid #FFA000':'1px solid transparent '}">
								<image style="width: 100% ;height: 100%;" :src="item.image" mode="aspectFill"></image>
							</view>
						</block>
					</view>
				</view>
			</block>
			<!-- 图片 -->
			<block v-if="selectIndex==1">
				<view
					style="padding: 0rpx 85rpx;box-sizing: border-box;display: flex;align-items: center;flex-wrap: wrap;">
					<view class="upLoadImage" @click="handleImage2">
						<i class="iconfont icon-jia" style="font-size: 37rpx;color: #CCCCCC;"></i>
					</view>
					<block v-if="form.images">
						<view v-for="(item,index) in form.images"
							:style="index%3==1?'margin-right: 0rpx;':'margin-right: 50rpx;'"
							style="position: relative;margin-bottom: 25rpx;">
							<image :src="item" style="width: 158rpx;height: 158rpx;border-radius: 10rpx;"
								mode="aspectFill">
							</image>
							<text class="ri-close-line" @click="delImg(index)"
								style="position: absolute;top:-10rpx;right:-10rpx;z-index:5;padding: 0rpx;background: rgba(0,0,0,0.5);margin-left: 30rpx;color: #fff;font-size: 30rpx;border-radius: 50%;box-sizing: border-box;width: 35rpx;height: 35rpx;text-align: center;line-height: 35rpx;">
							</text>
						</view>
					</block>
				</view>

			</block>
			<block v-if="selectIndex==3">
				<!-- 语音 -->
				<view class="flex flex-col items-center  p-4 h-60 overflow-y-scroll">
					<!-- <view class="text-xs leading-none text-gray-500" v-if="Isrecord==false">{{ recordTip }}</view> -->
					<view :style="{opacity:timer==0?'0':'1'}"
						style="font-size:32rpx ;color: #323232;margin-top: 10rpx;">{{timer==0?'0':timer+'s'}}
					</view>
					<view style="display: flex;align-items: center;margin-top: 53rpx;">
						<view v-if="Isrecord" @click="delectRecord"
							style="width: 95rpx;height: 70rpx;background: #ECECEC;border-radius: 35rpx;text-align: center;line-height: 70rpx;margin-right: 60rpx;">
							<text class="ri-delete-bin-5-line" style="font-size: 35rpx;"></text>
						</view>
						<view v-if="Isrecord==false" class="flex justify-center items-center "
							@touchstart="handleRecordStart" @touchmove.stop.prevent="handleRecordDoing"
							@touchend="handleRecordStop">
							<view class="relative flex justify-center items-center rounded-full">
								<view class="flex justify-center items-center rounded-full w-20 h-20  z-10"
									style="background: #FFA000;">
									<i class="ri-mic-fill text-4xl leading-none text-white"></i>
								</view>
								<view v-if="recording" class="animate-ping absolute rounded-full p-2  opacity-50"
									style="background: #FFA000;">
									<view class="rounded-full w-20 h-20 p-2  opacity-50" style="background: #FFA000;">
									</view>
								</view>
							</view>
						</view>
						<view v-if="Isrecord==true" class="flex justify-center items-center">
							<view class="relative flex justify-center items-center rounded-full" @click="openRecord">
								<view class="flex justify-center items-center rounded-full w-20 h-20  z-10"
									style="background: #FFA000;">
									<i class="ri-play-fill text-4xl leading-none text-white" v-if="isPlay==false"></i>
									<image src="../../static/bofang.gif" style="width: 90rpx;height: 25rpx;"
										v-if="isPlay">
									</image>
								</view>
							</view>
						</view>
						<view v-if="Isrecord" @click="okRecord"
							style="width: 95rpx;height: 70rpx;background: #FFA000;border-radius: 35rpx;text-align: center;line-height: 70rpx;margin-left: 60rpx;">
							<text class="ri-check-fill" style="font-size: 35rpx;color: #fff;"></text>
						</view>
					</view>
					<view style="text-align: center;margin-top: 36rpx;font-size: 26rpx;color: #323232;">按住录音</view>
				</view>
			</block>
			<block v-if="selectIndex==2">
				<!-- 推荐话题 -->
				<view>
					<view style="display: flex;padding: 0rpx 30rpx;box-sizing: border-box;">
						<input type="text" v-model="tag"
							style="height: 72rpx;background: #F7F7F7;border-radius: 36rpx;flex: 1;padding-left: 15rpx;font-size: 28rpx;margin-right: 36rpx;"
							placeholder="添加话题" adjust-position="false" @input="searchAdd" ref="ipt" maxlength="20" />
						<view
							style="width: 145rpx;height: 72rpx;line-height: 72rpx;border-radius: 8rpx;text-align: center;line-height: 72rpx;background: #FFA000;color: #fff;"
							@click.stop="addContentTag(tag)">添加</view>
					</view>
					<view
						style="display: flex;flex-wrap: wrap;padding: 0rpx 20rpx;box-sizing: border-box;padding-bottom: 100rpx">
						<block v-if="searchTag.length==0">
							<view class="flex items-center bg-gray-100 rounded-full  mr-2 mt-4"
								style="font-size: 28rpx;padding: 9rpx 15rpx;"
								:style="{color:cateIndex==index?'#FFFFFF':'#333',background:cateIndex==index?'#FFA000':'#F7F7F7'}"
								v-for="(item, index) in cateList" :key="index" :item="item"
								@click="addTag(item);cateIndex=index">
								<view class="text-base">#{{ item.title }}</view>
							</view>
						</block>
						<block v-else>
							<view class="flex items-center bg-gray-100 rounded-full mr-2 mt-4"
								style="font-size: 28rpx;padding: 9rpx 15rpx;"
								:style="{color:cateIndex==index?'#FFFFFF':'#333',background:cateIndex==index?'#FFA000':'#F7F7F7'}"
								v-for="(item, index) in searchTag" :key="index" :item="item"
								@click="addTag(item);cateIndex=index">
								<view class="text-base">#{{ item.title }}</view>
							</view>
						</block>
					</view>
				</view>
			</block>
		</view>
		<topPrompt></topPrompt>
		<feiqslsHit></feiqslsHit>
		<feiauthority ref="authority" @imageEmpower='imageEmpower' @audioEmpower="audioEmpower"></feiauthority>
	</view>
</template>
<script>
	import permision from "@/js_sdk/wa-permission/permission.js"
	import tag from 'uview-ui/libs/config/props/tag'

	import {
		mapState
	} from 'vuex'
	export default {
		name: 'add',
		components: {},
		data() {
			return {
				isoriginal: false,
				bgIndex: 0,
				cateIndex: -1,
				selectIndex: 0,
				form: {
					content: '',
					tags: [],
					images: [],
					audio: '',
					video: '',
					ischat: false,
					privacy: 'all',
					timer: 0,
					story: ""
				},
				tag: '',
				group: {},
				privacyText: '全部可见',
				listHotTag: ['窈窕淑女君子好逑', '唐风范文', '最爱古诗文', '风雨欲来', '不识庐山真面目'], //
				listNewTag: ['红颜知己', '霸道总裁爱上我', '最爱古诗文', '风雨欲来', '不识庐山真面目'], //
				listMineGroup: [{
					id: 1,
					title: '诗词歌赋'
				}, {
					id: 2,
					title: '思想教育'
				}, {
					id: 3,
					title: '政治文学'
				}], //
				listPrivacy: [{
						type: 'all',
						title: '全部可见'
					},
					{
						type: 'mine',
						title: '仅自己可见'
					},
					{
						type: 'follow',
						title: '仅关注可见'
					}
				],
				showTag: false,
				showGroup: false,
				showImage: false,
				showRecord: false,
				showPrivacy: false,
				audio: uni.createInnerAudioContext(),
				audioStatus: false,
				video: null,
				videoStatus: false,
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
				isAddTake: true,
				keyword: '',
				searchTag: [],
				post_cate_id: null,
				itemList: [],
				// ---------
				fei_cate: [],
				cateList: [],
				Isrecord: false,
				recordUrl: "",
				isPlay: false,
				timer: 0,
				inter: null,
				tpsTitle: "已录制",
				isClick: true,
				isBack: false,
				pageHeight: 0,
				showTopic: true,
				bgImg: []
			}
		},
		onLoad(e) {
			let that = this;
			if (e.postData != undefined) {
				var postData = JSON.parse(e.postData);
				that.fei_cate.push({
					id: postData.post_cate_id,
					content: postData.title
				})
				that.isBack = true;
			}
			that.recorder.onStart((e) => {
				that.recordStart(e)
			})
			that.recorder.onStop((e) => {
				that.recordStop(e)
			})
			// ---------
			that.cateInit(1, 5);
			that.watchKeyboard();
			that.getBgImg()
		},

		computed: {
			...mapState({
				userInfo: state => state.user.userInfo,
			})
		},
		onHide() {
			uni.removeStorageSync('post_cate_id')
		},
		methods: {
			openPreview() {
				var that = this;
				if (that.form.content == '' && that.form.story == '') {
					uni.showToast({
						icon: "none",
						title: "正文和故事必填一项"
					})
					return;
				}
				var show_type = '';
				if (that.form.images.length == 0) {
					show_type = 5
				} else {
					if (that.form.images.length >= 2) {
						if (that.form.content != '') {
							show_type = 4
						} else {
							show_type = 3
						}
					} else {
						if (that.form.content != '') {
							show_type = 2
						} else {
							show_type = 5
						}
					}
				}
				var preViewData = {
					story: that.form.story,
					content: that.form.content,
					is_original: that.isoriginal ? 1 : 0,
					bg_img_id: that.bgImg[that.bgIndex],
					post_cate_id: that.fei_cate,
					images: that.form.images,
					duration_time: that.form.timer,
					type: 'preView',
					show_type: show_type,
					audio: that.form.audio,
					duration_time: that.form.timer,
					isPlay: false,
				}
				this.$u.route("/pages/post/preview", {
					data: JSON.stringify(preViewData)
				})
			},
			originalClick() {
				this.isoriginal = !this.isoriginal;
			},
			getBgImg() {
				this.$api('post.getPostBgImgList').then(res => {
					console.log(res)
					if (res.code == 1) {
						this.bgImg = res.data;
					}
				})
			},
			async clickRecord() {
				if (uni.getSystemInfoSync().platform == "ios") {
					var recorder = uni.getRecorderManager();
					var appAuthorizeSetting = uni.getAppAuthorizeSetting();
					if (appAuthorizeSetting.microphoneAuthorized == 'authorized' || appAuthorizeSetting
						.microphoneAuthorized ==
						'not determined') {
						this.showTopic = !this.showTopic;
						this.showRecord = !this.showRecord;
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
				} else {
					var result = await permision.requestAndroidPermission('android.permission.RECORD_AUDIO');
					if (result == 1) {
						this.showTopic = !this.showTopic;
						this.showRecord = !this.showRecord;
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
				}

			},
			//监听键盘
			watchKeyboard() {
				var that = this;
				uni.onKeyboardHeightChange(res => {
					that.pageHeight = res.height
				})
			},
			//打开话题弹窗
			addCate() {
				this.showTag = true;
				this.searchTag = []
				this.tag = ""
			},
			//删除图片
			delImg(index) {
				this.form.images.splice(index, 1)
			},
			//确认录音
			okRecord() {
				if (this.recordUrl == "") {
					this.$u.toast("语音未准备好");
					return;
				}
				this.audio.stop();
				this.form.audio = this.recordUrl;
				this.Isrecord = false;
				this.showRecord = false;
				this.form.timer = this.timer;
				this.timer = 0;
				this.showTopic = true;
			},
			//试听
			openRecord() {
				this.handlePlayAudio(this.recordUrl);
			},
			//取消录音
			delectRecord() {
				this.form.audio = '';
				this.recordUrl = "";
				this.timer = 0;
				this.Isrecord = false;
				if (this.audio != null) {
					this.audio.stop();
				}
				this.isPlay = false;
			},
			//清楚语音
			clearAudio() {
				this.form.audio = '';
				this.recordUrl = "";
				this.audio.stop();
				this.isPlay = false;
			},
			//初始化话题
			cateInit(num, limit) {
				var that = this;
				that.$api('post_cate.hot_list', {
					"page": num,
					"limit": limit
				}).then(res => {
					if (res.code == 1) {
						res.data.forEach((val, index) => {
							that.cateList.push(val)
						})
					} else {
						that.$u.toast(res.msg)
					}

				})
			},
			searchAdd() {
				let that = this
				// console.log("没获取到输入框的值",that.$refs.ipt.value);
				let data = {
					keyword: that.tag
				}
				that.$api('post_cate.search_list', {
					"keyword": that.tag
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.searchTag = [];
						that.searchTag = res.data
					} else {
						that.searchTag = [];
						that.cateIndex = -1;
						that.$u.toast(res.msg)
					}
				})
			},
			addContentTag(item) {
				let that = this
				if (!item) {
					that.$u.toast('话题不能为空')
					return false
				}
				if (that.fei_cate.length >= 3) {
					that.$u.toast('只能添加三个话题')
					return;
				}
				var isAdd = false;
				that.fei_cate.forEach((val, index) => {
					if (val.content == item) {
						isAdd = true;
					} else {
						isAdd = false;
					}
				})
				if (isAdd) {
					that.$u.toast("已添加该话题");
					return;
				}
				if (that.form.tags.indexOf(item) >= 0 || that.form.tags.length >= 3) {
					that.$u.toast("已添加该话题")
					return false
				}
				// 判断标签是否大于等于三个 大于三个则让添加话题隐藏出来
				if (that.form.tags.length >= 3) {
					that.isAddTake = false
					return false
				}
				that.form.tags.push(item)
				that.showTag = false
				that.itemList += that.form.tags
				let data = {
					title: that.itemList
				};
				that.$api('post_cate.add', data).then(res => {
					if (res.code === 1) {
						that.fei_cate.push({
							id: res.data,
							content: item
						})
						that.tag = ''
						// that.$u.toast('添加成功')
						// that.post_cate_id = res.data
						// uni.setStorageSync('post_cate_id', res.data)
					} else {
						that.$u.toast(res.msg)
					}
				})
			},
			addTag(item) {
				let that = this;
				var isAdd = false;
				that.fei_cate.forEach((val, index) => {
					if (val.content == item.title) {
						isAdd = true;
					} else {
						isAdd = false;
					}
				})
				if (isAdd) {
					that.$u.toast("已添加该话题");
					return;
				}
				if (that.fei_cate.length >= 3) {
					that.isAddTake = false;
					that.showTag = false;
					that.$u.toast("只能添加三个话题");
				} else {
					that.fei_cate.push({
						id: item.id,
						content: item.title
					})
				}
				// if (that.form.tags.indexOf(item) >= 0 || that.form.tags.length >= 3) {
				// 	that.isAddTake = false
				// 	return false
				// }
				// that.form.tags.push('#' + item)
				// that.showTag = false
				// // 判断标签是否大于等于三个 大于三个则让添加话题隐藏出来
				// if (that.form.tags.length >= 3) {
				// 	that.isAddTake = false
				// 	return false
				// }
				// that.itemList = that.itemList += that.form.tags
				// let data = {
				// 	title: that.itemList
				// }
				// console.log(data);
				// that.$api('post_cate.add', data).then(res => {
				// 	if (res.code === 1) {
				// 		that.$u.toast('添加成功')
				// 		console.log('hot-list', res.data);
				// 		uni.setStorageSync('post_cate_id', res.data)

				// 	} else {
				// 		that.$u.toast(res.msg)
				// 	}
				// })
			},
			delTag(index) {
				let that = this
				that.fei_cate.splice(index, 1);
				that.form.tags.splice(index, 1)
				// that.form.tags.splice(index, 1)
				// // 判断标签是否小于三个 小于三个则让添加话题显示出来
				// if (that.form.tags.length < 3) {
				// 	that.isAddTake = true
				// 	return false
				// }
			},
			addGroup(item) {
				let that = this
				that.form.groupid = item.id
				that.group = item
				that.showGroup = false
			},
			delGroup() {
				let that = this
				that.form.group_id = 0
				that.group = []
			},
			changeProtocol(e) {
				let that = this
				that.form.ischat = e
			},
			onChangePrivacy(e) {
				let that = this
				that.form.privacy = e
				that.listPrivacy.forEach(item => {
					if (item.type === e) {
						that.privacyText = item.title
						that.showPrivacy = false
					}
				})
			},
			doPublish() {
				let that = this;
				console.log(that.form)
				let careIdArr = []
				that.fei_cate.forEach((item, index) => {
					careIdArr.push(item.id)
				})
				that.$api("post.createPost", {
					story: that.form.story,
					content: that.form.content,
					is_original: that.isoriginal ? 1 : 0,
					bg_img_id: that.bgImg[that.bgIndex].bg_img_id,
					post_cate_id: careIdArr,
					images: that.form.images,
					audio: that.form.audio,
					duration_time: that.form.timer
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.$u.route({
							type: 'navigateBack',
							delta: 1
						})
					}
					uni.showToast({
						icon: "none",
						title: res.msg
					})
				})

				// if (that.isClick == false) {
				// 	return;
				// }
				// that.isClick = false;
				// // let data = {
				// //     content: that.form.content,
				// //     images: that.form.images.toString(),
				// //     tags: that.form.tags.toString(),
				// //     audio: that.form.audio,
				// //     video: that.form.video,
				// //     ischat: that.form.ischat,
				// //     privacy: that.form.privacy,
				// //     group_id: that.group.id > 0 ? that.group.id : 0
				// // }
				// var post_cate_id = ""
				// that.fei_cate.forEach((val, index) => {
				// 	if (index == that.fei_cate.length - 1) {
				// 		post_cate_id += val.id
				// 	} else {
				// 		post_cate_id += val.id + ','
				// 	}
				// })
				// let data = {
				// 	content: that.form.content,
				// 	images: that.form.images.toString(),
				// 	audio: that.form.audio,
				// 	video: that.form.video,
				// 	post_cate_id: post_cate_id,
				// 	duration_time: that.form.timer
				// }
				// that.$api('post.add', data).then(res => {
				// 	if (res.code === 1) {
				// 		that.isClick = true;
				// 		that.form.content = ''
				// 		that.$u.toast('发布成功')
				// 		if (that.isBack == true) {
				// 			that.$u.route({
				// 				type: 'navigateBack',
				// 				delta: 1
				// 			})
				// 		} else {
				// 			uni.reLaunch({
				// 				url: '/pages/index/square',
				// 			});
				// 		}

				// 	} else {
				// 		that.isClick = true;
				// 		that.$u.toast(res.msg)
				// 	}

				// })
			},
			handlePlayAudio(audio) {
				console.log(audio)
				console.log(this.audio)

				let that = this
				if (!audio) {
					that.$u.toast('语音不能为空')
					return false
				}
				that.$nextTick(function() {
					that.isPlay = true;
					that.audio.src = audio;
					that.audio.play();
					that.audio.onEnded((e) => {
						that.audioStatus = false;
						that.audio.stop();
						that.isPlay = false;
						that.audio.src = '';
						clearInterval(that.inter)
					})
				})
			},
			// handlePlayVideo(video) {
			//     let that = this
			//     if (!video) {
			//         that.$u.toast('视频不能为空')
			//         return false
			//     }
			//     if (!that.video) {
			//         that.video = uni.createVideoContext('video')
			//         that.video.src = video
			//     }
			//     that.videoStatus = !that.videoStatus
			//     if(that.videoStatus) {
			//         that.$nextTick(function () {
			//             that.video.play()
			//         })
			//     } else {
			//         that.$nextTick(function () {
			//             that.video.pause()
			//         })
			//     }
			// },
			handleRecordStart(e) {
				let that = this
				console.log('touch start')
				if (e.touches.length > 1) {
					return
				}
				that.recording = true
				that.recordStoping = false
				that.recordTip = '正在录制…'
				this.tpsTitle = "已录制"
				that.recordPoint.Y = e.touches[0].clientY
				that.recordPoint.identifier = e.touches[0].identifier
				that.recorder.start({
					format: "mp3"
				})
				this.timer = 0;
				that.inter = setInterval(() => {
					this.timer++;
				}, 1000)
			},
			handleRecordStop(e) {
				let that = this
				console.log('touch stop')
				clearInterval(that.inter);
				if (!that.recording) {
					return
				}
				that.recording = false
				that.recordTip = '按住说话'
				that.recorder.stop();
				if (that.form.audio != '') {
					uni.showToast({
						icon: "none",
						title: "已经添加过语音"
					})
					that.timer = 0;
					return;
				}
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
				let that = this;
				console.log('recorder start' + JSON.stringify(e));
				that.recordLength = 0
				that.recordTimer = setInterval(() => {
					that.recordLength++
				}, 1000)
			},
			recordStop(e) {
				let that = this;
				if (that.form.audio != '') {
					uni.showToast({
						icon: "none",
						title: "已经添加过语音"
					})
					return;
				}
				that.recording = false
				clearInterval(that.recordTimer)
				var token = uni.getStorageSync("token");
				uni.uploadFile({
					url: uni.getStorageSync("hostData").host + "/api/hey/" + 'index/upload',
					filePath: e.tempFilePath,
					name: 'file',
					formData: {
						"token": token
					},
					success: res => {
						var res = JSON.parse(res.data)
						if (res.code === 1) {
							// that.form.audio = res.data.fullurl;
							that.recordUrl = res.data.fullurl;
							that.Isrecord = true;
						} else {
							that.$u.toast(res.msg)
						}
					},
					complete: e => {}
				})
			},
			handleImage2() {
				// #ifdef H5
				this.handleImage()
				// #endif
				// #ifdef APP
				this.$refs.authority.show('image')
				// #endif
			},
			//录音授权
			audioEmpower() {
				this.selectIndex = 3;
			},
			//图片授权
			imageEmpower() {
				this.handleImage()
			},
			handleImage() {
				let that = this
				var token = uni.getStorageSync("token");
				uni.chooseImage({
					count: 1,
					sizeType: [],
					sourceType: ['album'],
					success: (res) => {
						res.tempFilePaths.forEach(item => {
							if (that.form.images.length >= 6) {
								that.$u.toast('图片不能超过6张')
								return false
							}
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
										that.form.images.push(res.data.fullurl);
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
			// handleVideo() {
			//     let that = this
			//     uni.chooseVideo({
			//         maxDuration: 10,
			//         sourceType: ['album'],
			//         success: (res) => {
			//             console.log(res)
			//             if (res.size > 10 * 1024 * 1024) {
			//                 that.$u.toast('视频不能超过10M')
			//                 return false
			//             }
			//             uni.uploadFile({
			//                 url: that.$API_URL + 'index/upload',
			//                 filePath: res.tempFilePath,
			//                 name: 'file',
			//                 success: res => {
			//                     res = JSON.parse(res.data)
			//                     console.log(res)
			//                     if (res.code === 1) {
			//                         that.form.video = res.data.fullurl
			//                     } else {
			//                         that.$u.toast(res.msg)
			//                     }
			//                 },
			//                 complete: e => {}
			//             })
			//         }
			//     })
			// },
		}
	}
</script>
<style lang="scss" scoped>
	.fabu {
		width: 108rpx;
		height: 55rpx;
		line-height: 55rpx;
		text-align: center;
		border-radius: 5rpx;
		font-size: 25rpx;
		color: #fff;
		background: #FFA000;
		color: #fff;
		font-size: 33rpx;
	}

	.contentOne {
		padding: 25rpx 35rpx;
		box-sizing: border-box;
	}

	.contentTwo {
		padding: 25rpx 35rpx;
		box-sizing: border-box;
	}

	.bgImgs {
		padding: 25rpx 0rpx 25rpx 35rpx;
		box-sizing: border-box;

		.imgOne {
			display: flex;
			align-items: center;
			justify-content: center;
			background: #D9D9D9;
		}

		.bgImgItem {
			width: 138rpx;
			height: 165rpx;
			overflow: hidden;
			border-radius: 6rpx;
			margin-right: 25rpx;
			margin-top: 18rpx;

			&:last-child {
				margin-right: 0rpx;
			}
		}
	}

	.upLoadImage {
		width: 158rpx;
		height: 158rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #ECECEC;
		border-radius: 10rpx;
		margin-right: 50rpx;
		margin-bottom: 25rpx;
	}
</style>