<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="">
		<u-navbar :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left" @click="">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
			<view slot="right">
				<view class="fabu" @click="doPublish()">发布</view>
			</view>
		</u-navbar>

		<view class="rounded-lg p-4 mt-6">
			<textarea v-model="form.content" name="" id="" cols="30" :focus="true" rows="10"
				style="height: 300rpx;font-size: 28rpx;color: #606266;" placeholder="记录此刻想法，分享给有趣的人看…"
				placeholder-style="font-size:28rpx;color:rgb(192, 196, 204);"></textarea>
			<!-- <u-textarea v-model="form.content" :focus="true" maxlength="500" :count="true" height="300"
				placeholder="记录此刻想法，分享给有趣的人看…"></u-textarea> -->
			<!-- <view class="flex flex-wrap">
				<view class="flex items-center bg-gray-100 rounded-full p-3 text-orange-500 mr-2 mt-2"
					v-for="(item, index) in form.tags" :key="index" :item="item" @click="delTag(index)">
					<i class="ri-hashtag mr-1"></i>
					<view class="text-base">{{item}}</view>
					<i class="ri-close-line ml-2"></i>
				</view>
			</view> -->
			<view class="flex flex-wrap" v-if="fei_cate.length">
				<view class="flex items-center rounded-full p-3 text-orange-500 mr-2 mt-2"
					style="background: rgba(254, 67, 115, 0.3);padding: 5rpx 20rpx;color: #FE4373;" @click="delGroup()"
					v-for="(item,index) in fei_cate">
					<i class="ri-hashtag mr-1"></i>
					<view class="text-base">{{item.content}}</view>
					<i class="ri-close-line ml-2" @click="delTag(index)"></i>
				</view>
			</view>
			<view class="mt-4" v-if="form.images" style="display: flex;align-items: center;">
				<view v-for="(item,index) in form.images" style="position: relative;margin-right: 20rpx;">
					<image :src="item" style="width: 150rpx;height: 150rpx;border-radius: 10rpx;" mode="aspectFill">
					</image>
					<text class="ri-close-line" @click="delImg(index)"
						style="position: absolute;top:0;right:0rpx;z-index:5;padding: 0rpx;background: rgba(0,0,0,0.5);margin-left: 30rpx;color: #fff;font-size: 40rpx;border-radius: 50%;box-sizing: border-box;">
					</text>
				</view>
			</view>
			<!--  -->
			<view class="mt-4" v-if="form.audio" style="display: flex;align-items: center;">
				<view @click="handlePlayAudio(form.audio)"
					style="width: 300rpx;background: #FE4373;justify-content: center;"
					class="flex items-center  rounded-full w-32 h-10 bg-gradient-to-r  to-rose-400">
					<image src="../../static/111.jpg" style="width: 180rpx;height: 45rpx;" v-if="audioStatus==false">
					</image>
					<image src="/static/bofang.gif" style="width: 180rpx;height: 45rpx;" v-else mode=""></image>
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
					<video class="z-0" :src="form.video" id="video" direction="0" object-fit="fill" page-gesture="true"
						controls="false"></video>
				</view>
			</view>
			<!-- 话题 -->
			<view class="flex pt-4" v-if='fei_cate.length<3'>
				<view class="flex items-center bg-gray-100 border rounded-full mr-2"
					style="background: rgba(254, 67, 115, 0.3);padding: 10rpx 20rpx;color: #FE4373;" @click="addCate">
					<i class="ri-hashtag mr-1"></i>
					<view class="text-base leading-none">添加话题</view>
				</view>
			</view>
			<!-- <view class="flex pt-4">
                <u-checkbox-group>
                    <u-checkbox label="是否私密话题" size="28" labelSize="24" shape="circle" inactiveColor="#AAAAAA" activeColor="#FF7043" @change="changeProtocol"></u-checkbox>
                </u-checkbox-group>
            </view> -->
		</view>

		<!-- 工具栏 -->
		<view class="">
			<view class="flex flex-row-center p-4 bg-white">
				<view class="flex-1 flex">
					<view class="flex items-center  p-3 rounded-full mr-4" @click="handleImage">
						<i class="ri-image-line text-2xl leading-none text-gray-500"></i>
					</view>
					<view class="flex items-center p-3 rounded-full mr-4" @click="clickRecord">
						<i class="ri-mic-2-line text-2xl leading-none text-gray-500"></i>
					</view>
					<!--  <view class="flex items-center bg-gray-100 p-3 rounded-full" @click="handleVideo">
                        <i class="ri-live-fill text-2xl leading-none text-gray-500"></i>
                    </view> -->
				</view>
				<!-- <view class="flex items-center bg-gray-100 p-3 rounded-full" @click="showPrivacy = true">
                    <i class="ri-eye-fill text-2xl leading-none text-gray-500 mr-2"></i>
                    <view class="text-gray-500">{{ privacyText }}</view>
                </view> -->
			</view>
			<!-- 语音 -->
			<view class="flex flex-col items-center  p-4 h-60 overflow-y-scroll" v-if="showRecord">
				<view class="text-xs leading-none text-gray-500" v-if="Isrecord==false">{{ recordTip }}</view>
				<view class="" style="font-size:32rpx ;color: #323232;margin-top: 10rpx;">{{timer==0?'':timer+'s'}}
				</view>
				<view style="display: flex;align-items: center;" class="mt-16">
					<view v-if="Isrecord" @click="delectRecord"
						style="width: 95rpx;height: 70rpx;background: #ECECEC;border-radius: 35rpx;text-align: center;line-height: 70rpx;margin-right: 60rpx;">
						<text class="ri-delete-bin-5-line" style="font-size: 35rpx;"></text>
					</view>
					<view v-if="Isrecord==false" class="flex justify-center items-center "
						@touchstart="handleRecordStart" @touchmove.stop.prevent="handleRecordDoing"
						@touchend="handleRecordStop">
						<view class="relative flex justify-center items-center rounded-full">
							<view class="flex justify-center items-center rounded-full w-20 h-20  z-10"
								style="background: #FE4373;">
								<i class="ri-mic-fill text-4xl leading-none text-white"></i>
							</view>
							<view v-if="recording"
								class="animate-ping absolute rounded-full p-2 bg-fuchsia-200 opacity-50">
								<view class="rounded-full w-20 h-20 p-2 bg-fuchsia-500 opacity-50"></view>
							</view>
						</view>
					</view>
					<view v-if="Isrecord==true" class="flex justify-center items-center">
						<view class="relative flex justify-center items-center rounded-full" @click="openRecord">
							<view class="flex justify-center items-center rounded-full w-20 h-20  z-10"
								style="background: #FE4373;">
								<i class="ri-play-fill text-4xl leading-none text-white" v-if="isPlay==false"></i>
								<image src="../../static/bofang.gif" style="width: 90rpx;height: 25rpx;" v-if="isPlay">
								</image>
							</view>
						</view>
					</view>
					<view v-if="Isrecord" @click="okRecord"
						style="width: 95rpx;height: 70rpx;background: #FE4373;border-radius: 35rpx;text-align: center;line-height: 70rpx;margin-left: 60rpx;">
						<text class="ri-check-fill" style="font-size: 35rpx;color: #fff;"></text>
					</view>
				</view>
			</view>
		</view>
		<!-- 推荐话题 -->
		<view style="display: flex;flex-wrap: wrap;padding: 0rpx 20rpx;box-sizing: border-box;" v-if="showTopic">
			<view class="flex items-center bg-gray-100 rounded-full p-3 mr-2 mt-4" v-for="(item, index) in cateList"
				:key="index" :item="item" @click="addTag(item)">
				<i class="ri-hashtag mr-1"></i>
				<view class="text-base">{{ item.title }}</view>
			</view>
		</view>

		<!-- 话题 -->
		<u-popup :show="showTag" @close="showTag = false" :closeable="true" :round="30"
			customStyle="min-height: 500rpx;">
			<view class="p-4">
				<view class="text-2xl text-center">添加话题</view>
				<view style="display: flex;margin-top: 50rpx;">
					<input type="text" v-model="tag"
						style="height: 72rpx;background: #F7F7F7;border-radius: 36rpx;flex: 1;padding-left: 15rpx;font-size: 28rpx;"
						placeholder="输入话题" @input="searchAdd" ref="ipt" maxlength="20" />
					<view
						style="height: 72rpx;background: #FE4373;color: #fff;border-radius: 36rpx;font-size: 28rpx;text-align: center;line-height: 72rpx;width: 116rpx;margin-left: 30rpx;"
						@click.stop="addContentTag(tag)">添加</view>
				</view>
				<!-- <view class="text-gray-500 mt-6">热门话题</view> -->
				<view class="flex flex-wrap rounded-full">
					<view class="flex items-center bg-gray-100 rounded-full p-3 mr-2 mt-4"
						v-for="(item, index) in searchTag" :key="index" :item="item" @click="addTag(item)">
						<i class="ri-hashtag mr-1"></i>
						<view class="text-base">{{ item.title }}</view>
					</view>
				</view>
				<!-- <u-empty v-if="!searchTag.length" icon="/static/null.png" text="数据为空" textColor="#a1a1a1"
					marginTop="100"></u-empty> -->
			</view>
			<view class="sdasdas" :style="{height:pageHeight+'px'}"></view>
		</u-popup>
		<!-- 圈子 -->
		<!-- <u-popup :show="showGroup" @close="showGroup = false" :closeable="true" :round="30" customStyle="min-height: 500rpx;">
            <view class="p-4">
                <view class="text-2xl text-center">添加圈子</view>
                <view class="text-gray-500 mt-6">我的圈子</view>
                <view class="flex flex-wrap rounded-full">
                    <view class="flex items-center bg-gray-100 rounded-full p-3 mr-2 mt-4" v-for="(item, index) in listMineGroup" :key="index" :item="item" @click="addGroup(item)">
                        <i class="ri-focus-fill mr-2"></i>
                        <view class="text-base">{{ item.title }}</view>
                    </view>
                </view>
                <u-empty v-if="!listMineGroup.length" icon="/static/empty.png" text="数据为空" textColor="#a1a1a1" marginTop="100"></u-empty>
            </view>
        </u-popup> -->
		<!-- 隐私 -->
		<!--        <u-popup :show="showPrivacy" @close="showPrivacy = false" :closeable="true" :round="30" customStyle="min-height: 500rpx;">
            <view class="p-4">
                <view class="text-2xl text-center">隐私设置</view>
                <view class="text-gray-500 mt-6">可见范围</view>
                <view class="flex flex-wrap rounded-full">
                    <u-radio-group v-model="form.privacy" placement="column" @change="onChangePrivacy">
                        <u-radio v-for="(item, index) in listPrivacy" :key="index" :label="item.title" :name="item.type" size="28" shape="circle" inactiveColor="#AAAAAA" activeColor="#FF7043" customStyle="margin: 20rpx 0 0 0;"></u-radio>
                    </u-radio-group>
                </view>
            </view>
        </u-popup>
 -->
		<uc-auth></uc-auth>
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
				audio: null,
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
			async clickRecord() {
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
			},
			//监听键盘
			watchKeyboard() {
				var that = this;
				uni.onKeyboardHeightChange(res => {
					console.log(res)
					if (res.height != 0) {
						that.pageHeight = res.height - 100
					} else {
						that.pageHeight = res.height
					}
					console.log(that.pageHeight)
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
				this.audio.destroy();
				this.audio = null;
				this.isPlay = false;
			},
			//清楚语音
			clearAudio() {
				this.form.audio = '';
				this.recordUrl = "";
				this.audio.destroy();
				this.audio = null;
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
					if (res.code == 1) {
						that.searchTag = res.data
					} else {
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
				if (that.isClick == false) {
					return;
				}
				that.isClick = false;
				// let data = {
				//     content: that.form.content,
				//     images: that.form.images.toString(),
				//     tags: that.form.tags.toString(),
				//     audio: that.form.audio,
				//     video: that.form.video,
				//     ischat: that.form.ischat,
				//     privacy: that.form.privacy,
				//     group_id: that.group.id > 0 ? that.group.id : 0
				// }
				var post_cate_id = ""
				that.fei_cate.forEach((val, index) => {
					if (index == that.fei_cate.length - 1) {
						post_cate_id += val.id
					} else {
						post_cate_id += val.id + ','
					}
				})
				let data = {
					content: that.form.content,
					images: that.form.images.toString(),
					audio: that.form.audio,
					video: that.form.video,
					post_cate_id: post_cate_id,
					duration_time: that.form.timer
				}
				that.$api('post.add', data).then(res => {
					if (res.code === 1) {
						that.isClick = true;
						that.form.content = ''
						that.$u.toast('发布成功')
						if (that.isBack == true) {
							that.$u.route({
								type: 'navigateBack',
								delta: 1
							})
						} else {
							uni.reLaunch({
								url: '/pages/index/square',
							});
						}

					} else {
						that.isClick = true;
						that.$u.toast(res.msg)
					}

				})
			},
			handlePlayAudio(audio) {
				let that = this
				if (!audio) {
					that.$u.toast('语音不能为空')
					return false
				}
				if (!that.audio) {
					that.audio = uni.createInnerAudioContext()
					that.audio.src = audio;
					that.isPlay = true;
				}
				that.audioStatus = !that.audioStatus;
				if (that.audioStatus) {
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
						that.audio.pause()
					})
				}
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
					url: that.$API_URL + 'index/upload',
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
			handleImage() {
				let that = this
				var token = uni.getStorageSync("token");
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: (res) => {
						res.tempFilePaths.forEach(item => {
							if (that.form.images.length >= 3) {
								that.$u.toast('图片不能超过3张')
								return false
							}
							uni.uploadFile({
								url: that.$API_URL + 'index/upload',
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
		width: 92rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		border-radius: 30rpx;
		font-size: 25rpx;
		color: #fff;
		background: #FE4373;
	}
</style>