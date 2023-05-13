<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="flex mt-8">
		<!-- <text class="" style='position: absolute; left: 650rpx;font-size: 40rpx;' >...</text> -->
        <view class="px-4 mr-4 flex flex-col items-center">
            <view class="text-3xl font-sans">{{ $u.date(item.createtime, 'd') }}</view>
            <view class="text-base">{{ $u.date(item.createtime, 'mm月') }}</view>
        </view>
		      <view class="flex-1">
            <view class="text-gray-500">{{ $u.date(item.createtime, 'hh:MM') }}</view>
			<!-- 删除 -->
			<view class="" style="float: right; margin-top: -30rpx;"  @click="showAction = true">
			    <i class="ri-more-2-fill text-xl bg-gradient-to-b from-gray-500 to-gray-400 bg-clip-text text-transparent"></i>
			</view>
				
				<u-popup :show="showAction" @close="showAction = false" :closeable="true" :round="0">
				    <view class="p-3">
				        <!-- <view class="text-2xl text-center">操作</view> -->
				        <view class="grid grid-cols-5 gap-4 mt-6">
				            <view class="text-center" @click="showFeedback = true, showAction = false">
				                <view class="text-base mt-2" style="font-size: 30rpx;" @click="detail">删除</view>
				            </view>
				        </view>
				    </view>
				</u-popup>
			
			
            <view class="mt-4" @click="$u.route('/pages/post/detail', { post_id: item.id })">{{ item.content }}</view>
            <view v-if="item.images" class="mt-4">
                <u-album :urls="item.images.split(',')" multipleSize="150" rowCount="3"></u-album>
            </view>
			
            <view v-if="item.audio" @click="handlePlayAudio(item.audio)" class="mt-4 flex items-center justify-center rounded-full overflow-hidden w-32 h-12 bg-gradient-to-r from-pink-500 to-rose-400">
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
             <!--  <view class="flex-1 flex items-center">
                    <i class="ri-eye-fill text-xl bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
                    <text class="text-gray-500 ml-2">{{ item.viewnums }}</text>
                </view> -->
               <view class="flex items-center"  @click="handlePostDig()">
                   <!-- <i class="ri-heart-3-fill text-xl bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i> -->
                   <i v-show='is_zan==0' class="ri-heart-3-fill text-xl bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
                   <i v-show='is_zan==1' class="ri-heart-3-fill text-xl bg-gradient-to-b from-red-400 to-red-400 bg-clip-text text-transparent"></i>
               	<text class="text-gray-500 ml-2">{{ item.diggnums }}</text>
               </view>
                <view class="flex items-center ml-4">
                    <i class="ri-message-3-fill text-xl bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
                    <text class="text-gray-500 ml-2">{{ item.commentnums }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            audio: null,
            audioStatus: false,
            video: null,
            videoStatus: false,
			isRed:false,
			isNoRed:true,
			post_id:null,
			showAction: false,
			showFeedback: false,
			post_id:"",
			is_zan:''
        }
    },
    props: {
        item: {}
    },
    computed: {},
	onLoad(option) {
	    let that = this

	},
	mounted() {
		this.isZan()
		
	},
    methods: {
		async getPostMine() {
		    let that = this
		    that.loadmore = 'loading'
		    that.$api('post.mine', that.params).then(res => {
		        if (res.code === 1) {
		            that.listPostMine =res.data.data
		            that.listPostMine.forEach(item => {
		                item.user = that.userInfo
		            })
		        }
		    })
		},
		// 删除//
		detail(){
			let that=this
			// console.log('删除');
			that.$api('post.del', { post_id:that.item.id }).then(res => {
			    if (res.code === 1) {
				console.log('删除成功');
				
				that.getPostMine()
				setTimeout(() => {
					this.$router.go(0)
				}, 500)
			    }
			})
		},
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
		getPostDetail() {
		    let that = this
		    that.$api('post.detail', { post_id:that.item.id }).then(res => {
		        if (res.code === 1) {
		            that.item.diggnums = res.data.diggnums
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
