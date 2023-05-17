<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="flex mt-8">
        <view class="mr-4" @click="$u.route('/pages/user/home', { user_id: item.user_id })">
            <image class="block w-14 h-14 rounded-full" :src="item.user.avatar || '/static/avatar.png'"></image>
        </view>
        <view class="flex-1 mr-4">
            <view class="text-base leading-none mt-2" @click="$u.route(' /pages/user/home', { user_id: item.user_id })">
                {{ item.user.role_realname + ' · ' + item.user.role_dynasty || '无名氏' }}
				<!-- {{item.user}} -->
		 <!-- {{item.user.score }} -->
		 <text style=" display: inline-block; width: 40rpx; text-align: center; margin-right: 20rpx; height: 40rpx; border-radius: 50%;margin-left: 30rpx; line-height: 40rpx; background-color: #D0E17D; color: green;" @click="$u.route('/pages/user/home', { user_id: item.id })">望</text>
		 <text style="color: green;">{{item.user.score }}</text>
		
			<!-- {{item}} -->
            </view>
            <view class="text-base leading-none text-gray-400 mt-3">{{ $u.timeFrom(item.createtime, 'mm月dd日 hh:MM') }}</view>
            <view class="mt-4" @click="$u.route('/pages/post/detail', { post_id: item.id })">{{ item.content }}</view>
            <view v-if="item.images" class="mt-4">
                <u-album :urls="item.images.split(',')" multipleSize="150" rowCount="3"></u-album>
            </view>
            <view v-if="item.audio"  @click="handlePlayAudio(item.audio)" class="mt-4 flex items-center justify-center rounded-full overflow-hidden w-32 h-12 bg-gradient-to-r from-pink-500 to-rose-400">
                <i class="ri-voiceprint-line text-2xl text-white" :class="audioStatus ? 'animate-pulse' : ''"></i>
            </view>
            <view v-if="item.video" @click="handlePlayVideo(item.video)" class="mt-4 flex items-center justify-center rounded overflow-hidden w-60 bg-gray-200">
                <video class="z-0" :src="item.video" id="video" direction="0" object-fit="fill" page-gesture="true" controls="false"></video>
            </view>
            <view class="flex mt-4">
                <view class="flex items-center border border-solid border-gray-200 p-2 rounded-full mr-2" v-for="(tag, index) in item.tags" :key="index" :item="tag">
                    <i class="ri-hashtag text-base leading-none text-gray-500"></i>
                    <view class="text-base leading-none text-gray-500">{{ tag }}</view>
                </view>
            </view>
            <view class="flex mt-4">
                <!-- <view class="flex-1 flex items-center">
                    <i class="ri-eye-fill text-xl leading-none bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
                    <text class="text-base leading-none text-gray-500 ml-1">{{ item.viewnums }}</text>
                </view> -->
             <view class="flex items-center"  @click="handlePostDig()">
                 <!-- <i class="ri-heart-3-fill text-xl bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i> -->
                 <i v-show='is_zan==0' class="ri-heart-3-fill text-xl bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
                 <i v-show='is_zan==1' class="ri-heart-3-fill text-xl bg-gradient-to-b from-red-400 to-red-400 bg-clip-text text-transparent"></i>
             	<text class="text-gray-500 ml-2">{{ item.diggnums }}</text>
             </view>
			 <!-- 点踩 -->
			 <view style="margin-left: 30rpx;" class="flex items-center"  @click="handleConcleDig()">
			     <!-- <i class="ri-heart-3-fill text-xl bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i> -->
			     <i v-show='is_cai==0' class="ri-hail-line text-xl bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
			     <i v-show='is_cai==1' class="ri-hail-line text-xl bg-gradient-to-b from-red-400 to-red-400 bg-clip-text text-transparent"></i>
			 	<text class="text-gray-500 ml-2">{{ item.cainums }}</text>
			 </view>
                <view class="flex items-center ml-4">
                    <i  @click="$u.route('/pages/post/detail', { post_id: item.id })" class="ri-message-3-fill text-xl leading-none bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
                    <text class="text-base leading-none text-gray-500 ml-1">{{ item.commentnums }}</text>
                </view>
            </view>
        </view>
        <view class="">
			
			<!-- <view v-if="item.ischat" class="border border-solid border-orange-500 p-2 rounded-full text-base leading-none text-orange-500" @click="$u.route('/pages/user/home', { user_id: item.id })">私聊他</view>
			<view v-else>
                <i class="ri-more-2-fill text-xl bg-gradient-to-b from-gray-500 to-gray-400 bg-clip-text text-transparent"></i>
            </view> -->
		<!-- 举报功能 -->
		<view class="" @click="showAction = true">
		    <i class="ri-more-2-fill text-xl bg-gradient-to-b from-gray-500 to-gray-400 bg-clip-text text-transparent"></i>
		</view>
			<u-popup :show="showAction" @close="showAction = false" :closeable="true" :round="30">
			    <view class="p-4">
			        <view class="text-2xl text-center">操作</view>
			        <view class="grid grid-cols-5 gap-4 mt-6">
			            <view class="text-center" @click="showFeedback = true, showAction = false">
			                <i class="ri-alarm-warning-fill block text-3xl leading-none text-gray-500"></i>
			                <view class="text-base mt-2">举报</view>
			            </view>
			        </view>
			    </view>
			</u-popup>
			
			<u-popup :show="showFeedback" @close="showFeedback = false" :closeable="true" :round="30" customStyle="min-height: 500rpx;">
			    <view class="p-4">
			        <view class="text-2xl text-center">举报反馈</view>
			        <view class="text-gray-500 mt-6">选择分类：</view>
			        <view class="flex flex-wrap rounded-full">
			            <view class="flex items-center bg-gray-100 rounded-full p-3 mr-2 mt-4" v-for="(item, index) in ListFeedbackType" :key="index" :item="item" @click="feedbackType = item" :class="feedbackType === item ? 'bg-rose-200' : ''">
			                <text class="text-base">{{ item }}</text>
			            </view>
			        </view>
			        <view class="text-gray-500 mt-6">补充说明：</view>
			        <view class="flex p-4 rounded bg-gray-100 mt-4">
			            <u-textarea v-model="feedback" type="text" maxlength="200" :clearable="true" :count="true" customStyle="border: none; background: none; padding: 0;"></u-textarea>
			        </view>
			        <view class="grid gap-4 mt-10 text-center">
			            <view class="rounded-full p-6 text-base leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500" @click="handleFeedback()">提交</view>
			        </view>
			    </view>
			</u-popup>
			
        </view>
    </view>
</template>

<script>
import loginVue from '../../pages/auth/login.vue'
export default {
    components: {},
    data() {
        return {
            audio: null,
            audioStatus: false,
            video: null,
            videoStatus: false,
			post_id:null,
			showAction: false,
			showFeedback: false,
			feedback: '',
			feedbackType: '',
			ListFeedbackType: ['色情低俗','政治敏感','造谣传谣','广告欺诈','侵犯权益','其他'],
			post_id:"",
			is_zan:'',
			is_cai:''
        }
    },
    props: {
        item: {}
    },
    computed: {},
	onShow() {
	},
	mounted() {
		this.isZan()
		this.isCai()
	},
    methods: {
		isZan(){
			let that=this
			that.$api('post.detail', {
			 post_id:that.item.id
			}).then(res => {
			    if (res.code === 1) {
					that.is_zan=res.data.is_zan
					console.log(that.is_zan);
			    } else {
			        that.$u.toast(res.msg)
			    }
			})
		},
		isCai(){
			let that=this
			that.$api('post.detail', {
			 post_id:that.item.id
			}).then(res => {
			    if (res.code === 1) {
					that.is_cai=res.data.is_cai
					console.log(that.is_cai);
			    } else {
			        that.$u.toast(res.msg)
			    }
			})
		},
	// 提交举报 
	handleFeedback() {
	    let that = this
	    that.$api('feedback.add', {
	        type: 'report',
	        content: that.feedback,
	        remark: `类型：${that.feedbackType}，ID：${that.item.id}`
	    }).then(res => {
	        if (res.code === 1) {
	            that.message = ''
	            that.$u.toast('举报成功')
	            that.showFeedback = false
	            that.feedbackType = ''
	            that.feedback = ''
	        } else {
	            that.$u.toast(res.msg)
	        }
	    })
	},
		// 点踩
		handleConcleDig(){
		console.log('111');	
		let that = this
		that.$api('post.cai', {
		    post_id:that.item.id,
		}).then(res => {
		    if (res.code === 1) {
				console.log('点踩');
				that.is_cai=1
		        // that.$u.toast('点踩成功')
		        that.getPostDetailCancle()
				// that.isZan()
		    } else {
				that.is_cai=0
		        that.$u.toast(res.msg)
			
		    }
		})
		},
		 getPostDetail() {
            let that = this
            that.$api('post.detail', { post_id:that.item.id }).then(res => {
                if (res.code === 1) {
                    that.item.diggnums = res.data.diggnums
                }
            })
        },
		// 点踩详情
		getPostDetailCancle() {
		    let that = this
		    that.$api('post.detail', { post_id:that.item.id }).then(res => {
		        if (res.code === 1) {
		            that.item.cainums= res.data.cainums
		        }
		    })
		},
		// 点赞红心
			handlePostDig() {
			    let that = this
			    that.$api('post.dig', {
			        post_id:that.item.id,
			    }).then(res => {
			        if (res.code === 1) {
						console.log('点赞');
						that.isRed=!that.isRed
						that.isNoRed=!that.isRed
			            that.$u.toast('点赞成功')
			            that.getPostDetail()
						that.isZan()
			        } else {
						// console.log('no点赞');
						that.isNoRed=!that.isNoRed
						that.isRed=!that.isRed
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
                that.audio.src = audio
            }
            that.audioStatus = !that.audioStatus
            if(that.audioStatus) {
                that.$nextTick(function () {
                    that.audio.play()
                    that.audio.onEnded((e) => {
                        that.audioStatus = false
                    })
                })
            } else {
                that.$nextTick(function () {
                    that.audio.pause()
                })
            }
        },
        handlePlayVideo(video) {
            let that = this
            if (!video) {
                that.$u.toast('视频不能为空')
                return false
            }
            if (!that.video) {
                that.video = uni.createVideoContext('video')
                that.video.src = video
            }
            that.videoStatus = !that.videoStatus
            if(that.videoStatus) {
                that.$nextTick(function () {
                    that.video.play()
                })
            } else {
                that.$nextTick(function () {
                    that.video.pause()
                })
            }
        },
    }
}
</script>

<style lang="scss">

</style>
