<template>
	<view class="preview">
		<view class="heade">
			<view style="height: var(--status-bar-height );"></view>
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<view
					style="width: 52rpx;height: 52rpx;border-radius: 50%;text-align: center;line-height: 52rpx;background:#F1F1F1;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })">
					<i class="iconfont icon-31fanhui1" style="font-size: 38rpx;color: #999;"></i>
				</view>
				<view class="fabu" v-if="data.type!='work'" @click="doPublish()">发布</view>
			</view>
		</view>
		<!-- 预览进 -->
		<block v-if="data.type=='preView'">
			<!-- 单张图片 -->
			<view v-if="data.show_type==1" class="oneImg">
				<image style="width: 100vw;height: 100vh;position: absolute;top: 0;left: 0;z-index: 0;"
					:src="data.bg_img_id.image"></image>
				<view
					style="position: absolute;top: 0;left: 0;z-index: 0;width: 100vw;height: 100vh;display: flex;align-items: center;justify-content: center;">
					<image style="width: 100%;" :src="data.images[0]" mode="widthFix"></image>
				</view>
			</view>
			<!-- 单张图片文字 -->
			<view v-if="data.show_type==2" class="oneImg">
				<image style="width: 100vw;height: 100vh;position: absolute;top: 0;left: 0;z-index: 0;"
					:src="data.bg_img_id.image"></image>
				<view class="textContent" style="position: relative;z-index: 2;" :style="{paddingTop:statusBarHeight}">
					<view class="textContentBox">
						<text>{{data.content}}</text>
					</view>
				</view>
				<view
					style="position: absolute;top: 0;left: 0;z-index: 0;width: 100vw;height: 100vh;display: flex;align-items: center;justify-content: center;">
					<image style="width: 100%;" :src="data.images[0]" mode="widthFix"></image>
				</view>
			</view>
			<!-- 文字 -->
			<view v-if="data.show_type==5" class="textContent">
				<image style="width: 100vw;height: 100vh;position: absolute;top: 0;left: 0;z-index: 0;"
					:src="data.bg_img_id.image"></image>
				<view class="textContentBox">
					<text>{{data.content}}</text>
				</view>
			</view>
			<!-- 多张图片 -->
			<view v-if="data.show_type==3" class="manyImg">
				<image style="width: 100vw;height: 100vh;position: absolute;top: 0;left: 0;z-index: 0;"
					:src="data.bg_img_id.image"></image>
				<swiper :current="imagesCurrent" @change="imagesChange" class="imagesSwiper" :indicator-dots="false"
					:autoplay="false" :duration="500" :interval="2000">
					<block v-for="(imgItem,imgIndex) in data.images" :key="imgIndex">
						<swiper-item>
							<view class="imagesSwiperItem">
								<image style="width: 100%;" :src="imgItem" mode="widthFix">
								</image>
							</view>
						</swiper-item>
					</block>
				</swiper>
				<!-- 多图文指示点 -->
				<view class="indicate" :style="{paddingBottom:tabBarHeight}">
					<block v-for="(imagesItem,imagesIndex) in data.images" :key="imagesIndex">
						<view class="indicateItem" @click="imagesCurrent = imagesIndex"
							:style="{background:imagesCurrent==imagesIndex?'rgba(255, 255, 255, 1)':'rgba(153, 153, 153, 1)'}">
						</view>
					</block>
				</view>
			</view>


			<!-- 多张图片加文字 -->
			<view v-if="data.show_type==4" class="manyImg">
				<image style="width: 100vw;height: 100vh;position: absolute;top: 0;left: 0;z-index: 0;"
					:src="data.bg_img_id.image"></image>
				<view class="textContent" style="position: relative;z-index: 2;">
					<view class="textContentBox">
						<text>{{data.content}}</text>
					</view>
				</view>
				<swiper :current="imagesTextCurrent" @change="imagesTextChange" class="imagesSwiper"
					:indicator-dots="false" :circular='true' autoplay="true" :interval="2000" :duration="500"
					style="position: absolute;top: 0;left: 0;z-index: 1;">
					<block v-for="(imgItem,imgIndex) in data.images" :key="imgIndex">
						<swiper-item>
							<view class="imagesSwiperItem">
								<image style="width: 100%;" :src="imgItem" mode="widthFix">
								</image>
							</view>
						</swiper-item>
					</block>
				</swiper>
				<view class="indicate" :style="{paddingBottom:tabBarHeight}">
					<block v-for="(imagesItem,imagesIndex) in data.images" :key="imagesIndex">
						<view class="indicateItem" @click="imagesTextCurrent = imagesIndex"
							:style="{background:imagesTextCurrent==imagesIndex?'rgba(255, 255, 255, 1)':'rgba(153, 153, 153, 1)'}">
						</view>
					</block>
				</view>
			</view>
			<!-- 底部 -->
			<view class="bottom" :style="{paddingBottom:tabBarHeight}">
				<view class="original" v-if="data.is_original ==1">原创</view>
				<view class="userBox">
					<image style="width: 36rpx;height: 36rpx;"
						src="https://yaji-1318192409.cos.ap-shanghai.myqcloud.com/app_file/mingWang/4.png"
						mode="aspectFill"></image>
					<view style="margin-right: 8rpx;margin-left: 8rpx;">
						{{userInfo.realname}}·{{userInfo.dynasty}}
					</view>
					<block v-if="userInfo.gender==1">
						<i class="iconfont icon-nan1" style="font-size: 22rpx;color: #00C2FF;"></i>
					</block>
					<block v-else>
						<i class="iconfont icon-nv" style="font-size: 22rpx;color: #FFA000;"></i>
					</block>
				</view>
				<view class="topic">
					<block v-for="(wordItem,wordIndex) in data.post_cate_id" :key="wordIndex">
						<text>#{{wordItem.content}}</text>
					</block>
				</view>
				<!-- <view class="topicTitle">{{data.story}}</view> -->
				<view class="topicTitle" style="">
					{{data.story.slice(0,40)}}
					<block v-if="data.story.length>40">
						<text style="color: #FFA000;font-size: 28rpx;" @click="storyMore1(data.story)">查看更多</text>
						<i @click="storyMore1(data.story)" class="iconfont icon-right"
							style="font-size: 28rpx;color:#FFA000 ;"></i>
					</block>
				</view>
			</view>
			<!-- 右边栏 -->
			<view class="operate" :style="{paddingBottom:tabBarHeight}">
				<view>
					<view style="position: relative;">
						<image class="userImg" :src="userInfo.avatar" mode="aspectFill"></image>
					</view>
					<view class="operateItem">
						<image src="../../static/iconImage/xinxin.png" style="width: 52rpx;height: 52rpx;"
							mode="widthFix"></image>
						<text>喜欢</text>
					</view>
					<view class="operateItem">
						<image src="../../static/iconImage/pinglun.png" style="width: 52rpx;height: 52rpx;"
							mode="widthFix"></image>
						<text>0</text>
					</view>
					<view class="operateItem">
						<image src="../../static/iconImage/gengduo.png" style="width: 52rpx;height: 52rpx;"
							mode="widthFix"></image>
					</view>
					<view class="operateItem" v-if="data.audio!=''" @click="audioSuspend">
						<image v-if="data.isPlay==false" style="width: 52rpx;height: 52rpx;"
							src="@/static/iconImage/erji11.png" mode="">
						</image>
						<image v-else style="width: 52rpx;height: 52rpx;" src="@/static/iconImage/erji22.png" mode="">
						</image>
					</view>
				</view>
			</view>
		</block>
		<!-- 我的房间进 -->
		<block v-if="data.type =='work'">
			<!-- 单张图片 -->
			<view v-if="myData.show_type==1" class="oneImg">
				<image style="width: 100vw;height: 100vh;position: absolute;top: 0;left: 0;z-index: 0;"
					:src="myData.bg_img_url"></image>
				<view
					style="position: absolute;top: 0;left: 0;z-index: 0;width: 100vw;height: 100vh;display: flex;align-items: center;justify-content: center;">
					<image style="width: 100%;" :src="myData.image_list[0]" mode="widthFix"></image>
				</view>
			</view>
			<!-- 单张图片文字 -->
			<view v-if="myData.show_type==2" class="oneImg">
				<image style="width: 100vw;height: 100vh;position: absolute;top: 0;left: 0;z-index: 0;"
					:src="myData.bg_img_url"></image>
				<view class="textContent" style="position: relative;z-index: 2;" :style="{paddingTop:statusBarHeight}">
					<view class="textContentBox">
						<text>{{myData.content}}</text>
					</view>
				</view>
				<view
					style="position: absolute;top: 0;left: 0;z-index: 0;width: 100vw;height: 100vh;display: flex;align-items: center;justify-content: center;">
					<image style="width: 100%;" :src="myData.image_list[0]" mode="widthFix"></image>
				</view>
			</view>
			<!-- 文字 -->
			<view v-if="myData.show_type==5" class="textContent">
				<image style="width: 100vw;height: 100vh;position: absolute;top: 0;left: 0;z-index: 0;"
					:src="myData.bg_img_url"></image>
				<view class="textContentBox">
					<text>{{myData.content}}</text>
				</view>
			</view>
			<!-- 多张图片 -->
			<view v-if="myData.show_type==3" class="manyImg">
				<image style="width: 100vw;height: 100vh;position: absolute;top: 0;left: 0;z-index: 0;"
					:src="myData.bg_img_url"></image>
				<swiper :current="imagesCurrent" @change="imagesChange" class="imagesSwiper" :indicator-dots="false"
					:autoplay="false" :duration="500" :interval="2000">
					<block v-for="(imgItem,imgIndex) in myData.images" :key="imgIndex">
						<swiper-item>
							<view class="imagesSwiperItem">
								<image style="width: 100%;" :src="imgItem" mode="widthFix">
								</image>
							</view>
						</swiper-item>
					</block>
				</swiper>
				<!-- 多图文指示点 -->
				<view class="indicate" :style="{paddingBottom:tabBarHeight}">
					<block v-for="(imagesItem,imagesIndex) in myData.images" :key="imagesIndex">
						<view class="indicateItem" @click="imagesCurrent = imagesIndex"
							:style="{background:imagesCurrent==imagesIndex?'rgba(255, 255, 255, 1)':'rgba(153, 153, 153, 1)'}">
						</view>
					</block>
				</view>
			</view>
			<!-- 多张图片加文字 -->
			<view v-if="myData.show_type==4" class="manyImg">
				<image style="width: 100vw;height: 100vh;position: absolute;top: 0;left: 0;z-index: 0;"
					:src="myData.bg_img_url"></image>
				<view class="textContent" style="position: relative;z-index: 2;">
					<view class="textContentBox">
						<text>{{myData.content}}</text>
					</view>
				</view>
				<swiper :current="imagesTextCurrent" @change="imagesTextChange" class="imagesSwiper"
					:indicator-dots="false" :circular='true' autoplay="true" :interval="2000" :duration="500"
					style="position: absolute;top: 0;left: 0;z-index: 1;">
					<block v-for="(imgItem,imgIndex) in myData.image_list" :key="imgIndex">
						<swiper-item>
							<view class="imagesSwiperItem">
								<image style="width: 100%;" :src="imgItem" mode="widthFix">
								</image>
							</view>
						</swiper-item>
					</block>
				</swiper>
				<view class="indicate" :style="{paddingBottom:tabBarHeight}">
					<block v-for="(imagesItem,imagesIndex) in myData.image_list" :key="imagesIndex">
						<view class="indicateItem" @click="imagesTextCurrent = imagesIndex"
							:style="{background:imagesTextCurrent==imagesIndex?'rgba(255, 255, 255, 1)':'rgba(153, 153, 153, 1)'}">
						</view>
					</block>
				</view>
			</view>
			<!-- 右边栏 -->
			<view class="operate" :style="{paddingBottom:tabBarHeight}">
				<view v-if="myData.length !=0">
					<view style="position: relative;">
						<image class="userImg" :src="myData.user_info.avatar" mode="aspectFill"></image>
						<block v-if="userInfo.id!=myData.user_id">
							<view class="follow" @click="follow" v-if="myData.is_follow!=1">
								<i class="iconfont  icon-jia" style="color: #FFFFFF;font-size: 20rpx;"></i>
							</view>
						</block>
					</view>
					<view class="operateItem" @click="like">
						<block v-if="myData.is_dig==0">
							<image src="../../static/iconImage/xinxin.png" style="width: 52rpx;height: 52rpx;"
								mode="widthFix"></image>
						</block>
						<block v-else>
							<image src="../../static/iconImage/hongxin.png" style="width: 52rpx;height: 52rpx;"
								mode="widthFix"></image>
						</block>
						<text>{{myData.diggnums ==0?'喜欢':myData.diggnums}}</text>
					</view>
					<view class="operateItem" @click="getComment()">
						<image src="../../static/iconImage/pinglun.png" style="width: 52rpx;height: 52rpx;"
							mode="widthFix"></image>
						<text>{{myData.commentnums}}</text>
					</view>
					<view class="operateItem" @click="openMore">
						<image src="../../static/iconImage/gengduo.png" style="width: 52rpx;height: 52rpx;"
							mode="widthFix"></image>
						<text style="margin-top: 10rpx;">更多</text>
					</view>
					<view class="operateItem" v-if="myData.audio!=''" @click="audioSuspendTwo">
						<image v-if="myData.isPlay==false" style="width: 52rpx;height: 52rpx;"
							src="@/static/iconImage/erji11.png" mode="">
						</image>
						<image v-else style="width: 52rpx;height: 52rpx;" src="@/static/iconImage/erji22.png" mode="">
						</image>
						<image v-else style="width: 52rpx;height: 52rpx;" src="@/static/iconImage/erji2.png" mode="">
						</image>
					</view>
				</view>
			</view>

			<!-- 底部 -->
			<view class="bottom" :style="{paddingBottom:tabBarHeight}" v-if="myData.length !=0">
				<view class="original" v-if="myData.is_original ==1">原创</view>
				<view class="userBox">
					<image style="width: 36rpx;height: 36rpx;"
						src="https://yaji-1318192409.cos.ap-shanghai.myqcloud.com/app_file/mingWang/4.png"
						mode="aspectFill"></image>
					<view style="margin-right: 8rpx;margin-left: 8rpx;">
						{{myData.user_info.role_realname}}·{{myData.user_info.role_dynasty}}
					</view>
					<block v-if="myData.user_info.gender==1">
						<i class="iconfont icon-nan1" style="font-size: 22rpx;color: #00C2FF;"></i>
					</block>
					<block v-else>
						<i class="iconfont icon-nv" style="font-size: 22rpx;color: #FFA000;"></i>
					</block>
				</view>
				<view class="topic">
					<block v-for="(wordItem,wordIndex) in myData.post_cate_list" :key="wordIndex">
						<text @click="openCate(wordItem.cate_id)">#{{wordItem.title}}</text>
					</block>
				</view>
				<view class="topicTitle">
					{{myData.story.slice(0,40)}}
					<block v-if="myData.story.length>40">
						<text style="color: #FFA000;font-size: 28rpx;" @click="storyMore1(myData.story)">查看更多</text>
						<i @click="storyMore1(myData.story)" class="iconfont icon-right"
							style="font-size: 28rpx;color:#FFA000 ;"></i>
					</block>
				</view>
			</view>
			<feiMore ref="more"></feiMore>
			<!-- 评论弹窗 -->
			<u-popup :show="commentPopup" @close="commentPopup = false;" :closeable="true" :round="30">
				<view class="commentContainer">
					<view style="text-align: center;margin-top: 23rpx;"><text
							style="color:#323232;font-size: 32rpx;">全部评论（{{commentData.total_comment_count}}）</text>
					</view>
					<scroll-view class="commentList" scroll-y="true" :show-scrollba="false" lower-threshold="0"
						@scrolltolower="commentBottom">
						<commentTwo @commentReply="commentReply" ref="commentTwo" :commentList="commentList">
						</commentTwo>
					</scroll-view>
					<view class="commentBar" @click="commentInputClick">
						<view class="commentInput" style="font-size:28rpx;color:#999999;">
							回复作者
						</view>
						<view
							style="width: 116rpx;height: 72rpx;text-align: center;line-height: 72rpx;color: #fff;font-size: 28rpx;border-radius: 50rpx;background: #FFA000;">
							发送</view>
					</view>
				</view>
			</u-popup>
		</block>
		<!-- 故事弹窗 -->
		<u-popup :show="storyPopup" @close="storyPopup = false;" :closeable="true" :round="30">
			<view class="storyContainer">
				<view style="display: flex;justify-content: center;">
					<view style="position: relative;margin-top: 32rpx;display: inline;">
						<text style="position: relative;z-index: 2;color:#333 ;font-size:32rpx ;">查看全部</text>
						<text
							style="width: 100%;height: 13rpx;background: #FFA000;position: absolute;left: 0;bottom: 5rpx;"></text>
					</view>
				</view>
				<view
					style="margin-top: 50rpx;color: #333;font-size: 28rpx;padding: 0rpx 29rpx;box-sizing: border-box;">
					<text>{{itemStory}}</text>
				</view>
			</view>
		</u-popup>
		<feiqslsHit></feiqslsHit>
	</view>
</template>

<script>
	import feiMore from "@/components/fei-more/fei-more.vue"
	import commentTwo from "@/components/fei-commentTwo/fei-commentTwo.vue"
	export default {
		components: {
			commentTwo,
			feiMore
		},
		data() {
			return {
				storyPopup: false,
				itemStory: '',
				windowHeight: uni.getSystemInfoSync().screenHeight + 'px;',
				tabBarHeight: uni.getSystemInfoSync().screenHeight - uni.getSystemInfoSync().windowHeight + 'px',
				tabBarHeight: '50px',
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight + 'px',
				data: [],
				imagesTextCurrent: 0,
				imagesCurrent: 0,
				userInfo: uni.getStorageSync("userInfo"),
				audio: uni.createInnerAudioContext(),
				myData: [],
				commentPopup: false,
				commentData: [],
				commentList: [],
			}
		},
		onLoad(e) {
			this.setFontFamily()
			this.data = JSON.parse(this.$Route.query.data)
			if (this.data.type != 'work') {
				if (this.data.audio) {
					this.playAudio(this.data.audio)
				}
			} else {
				this.$api("post.getPostDetail", {
					post_id: this.data.post_id
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						res.data.isPlay = false;
						this.myData = res.data;
						if (this.myData.audio != '') {
							this.playAudioTwo(res.data.audio)
						}
					}
				})
			}
		},
		onUnload() {
			this.audio.stop()
			this.audio.destroy()
		},
		methods: {
			storyMore1(story) {
				this.storyPopup = true;
				this.itemStory = story;
			},
			//播放音频
			playAudio(audioSrc) {
				let that = this;
				if (audioSrc != "") {
					that.audio.src = audioSrc;
					that.audio.play()
					that.data.isPlay = true;
					that.audio.onEnded((e) => {
						that.data.isPlay = false;
					})
				}
			},
			//点赞
			like() {
				this.myData.is_dig = !this.myData.is_dig
				if (this.myData.is_dig) {
					this.myData.diggnums++;
				} else {
					this.myData.diggnums--;
				}
				this.$api("post.dig", {
					post_id: this.myData.post_id
				}).then(res => {
					if (res.code == 1) {} else {
						this.myData.is_dig = false;
					}
				})
			},
			//打开话题
			openCate(id) {
				this.$u.route('/pages/user/topicspeed', {
					post_cate_id: id,
					type: 'index'
				})
			},
			//播放音频
			playAudioTwo(audioSrc) {
				let that = this;
				if (audioSrc) {
					that.audio.src = audioSrc;
					that.audio.play()
					that.myData.isPlay = true;
					that.audio.onEnded((e) => {
						that.myData.isPlay = false;
					})
				}
			},
			follow() {
				this.myData.is_follow = !this.myData.is_follow;
				this.$api("user_follow.follow", {
					user_id: this.myData.user_id
				}).then(res => {
					uni.showToast({
						icon: "none",
						title: res.msg
					})
				})
			},
			openMore() {
				this.$refs.more.moreShow(this.myData.post_id, this.myData.user_id, false)
			},
			getComment() {
				this.commentPopup = true;
				this.commentPage = 1;
				this.commentList = [];
				this.commentData = [];
				this.getCommentList(this.myData.post_id)
			},
			commentInputClick() {
				this.$refs.commentTwo.showCommentBar()
			},
			//评论成功
			commentReply(data) {
				this.getComment(data.post_id)
				this.myData.commentnums++;
			},
			getCommentList(post_id) {
				this.$api("comment.newList", {
					post_id: post_id,
					page: this.commentPage,
				}).then(res => {
					if (res.code == 1) {
						res.data.list.forEach((item, index) => {
							item.newCommentArr = [];
							item.oldCommentArr = [];
							item.page = 0;
						})
						this.commentList.push(...res.data.list);
						this.commentData = res.data;
						this.$refs.commentTwo.getCommentData(res.data)
					}
				})
			},
			commentBottom() {
				if (this.commentList.length != 0) {
					this.commentPage++;
					this.getCommentList(this.commentData.post_id)
				}
			},
			//audio暂停
			audioSuspendTwo() {
				this.myData.isPlay = !this.myData.isPlay;
				if (this.myData.isPlay) {
					this.audio.play()
				} else {
					this.audio.pause()
				}
			},
			//audio暂停
			audioSuspend() {
				this.data.isPlay = !this.data.isPlay;
				if (this.data.isPlay) {
					this.audio.play()
				} else {
					this.audio.pause()
				}
			},
			//多图轮播
			imagesTextChange(e) {
				this.imagesTextCurrent = e.detail.current;
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
			doPublish() {
				let that = this;
				console.log(that.data)
				let careIdArr = []
				that.data.post_cate_id.forEach((item, index) => {
					careIdArr.push(item.id)
				})
				that.data.post_cate_id = careIdArr
				that.data.bg_img_id = that.data.bg_img_id.bg_img_id;
				delete that.data.type;
				delete that.data.isPlay;
				delete that.data.show_type;
				that.$api("post.createPost", this.data).then(res => {
					console.log(res)
					that.audio.stop()
					if (res.code == 1) {
						uni.switchTab({
							url: '/pages/index/square'
						});
					}
					uni.showToast({
						icon: "none",
						title: res.msg
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.storyContainer {
		width: 100vw;
		height: 850rpx;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		background: #fff;
	}

	.preview {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
	}

	.heade {
		width: 100vw;
		padding: 0rpx 35rpx;
		box-sizing: border-box;
		position: absolute;
		top: 19rpx;
		left: 0;
		z-index: 10;

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
	}

	.oneImg {
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.textContent {
		width: 100vw;
		height: calc(100vh - 88rpx);
		box-sizing: border-box;
		display: flex;
		// align-items: center;
		justify-content: center;
		// background-image: url(../../static/qq.png);
		background-position: center center;
		background-size: cover;
		background-repeat: no-repeat;
		position: relative;

		.textContentBox {
			margin-top: 88rpx;
			width: 576rpx;
			height: 820rpx;
			text-align: center;
			font-size: 36rpx;
			font-weight: 500;
			color: #333333;
			line-height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;
			position: relative;
			z-index: 5;
			color: #FFFFFF;
			text-shadow: rgab(0, 0, 0, 0.13) 5px 1px 0rpx;
			// -webkit-text-stroke: 1px #FFFFFF;
			// text-stroke: 1px #BABABA;
			// -webkit-background-clip: text;
			// -webkit-text-fill-color: #FFFFFF;
		}
	}

	.manyImg {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		position: relative;

		.imagesSwiper {
			width: 100vw;
			height: 100vh;
			position: relative;
			z-index: 3;

			.imagesSwiperItem {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}

	.manyImg {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		position: relative;

		.imagesSwiper {
			width: 100vw;
			height: 100vh;

			.imagesSwiperItem {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}

	// 底部
	.bottom {
		display: flex;
		flex-direction: column;
		position: absolute;
		left: 25rpx;
		bottom: 20rpx;
		z-index: 3;

		.original {
			font-size: 28rpx;
			color: #FFC564;
			width: 96rpx;
			text-align: center;
			border-radius: 8rpx;
			padding: 10rpx 0rpx 3rpx 0rpx;
			background: rgba(255, 255, 255, 0.5);
			font-family: font-test !important;
		}

		.userBox {
			display: flex;
			align-items: center;
			font-size: 30rpx;
			font-weight: bold;
			color: rgba(255, 255, 255, 1);
			margin-top: 18rpx;
		}

		.topic {
			font-size: 28rpx;
			color: rgba(255, 255, 255, 1);
			margin-top: 22rpx;
			padding-right: 150rpx;
			box-sizing: border-box;
		}

		.topicTitle {
			margin-right: 25rpx;
			font-size: 28rpx;
			color: rgba(255, 255, 255, 1);
			margin-top: 13rpx;
			height: 77rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}

	// 右边
	.operate {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
		position: absolute;
		right: 25rpx;
		bottom: 135rpx;
		z-index: 99;

		.follow {
			width: 33rpx;
			height: 33rpx;
			border-radius: 50%;
			background: #FF3D00;
			text-align: center;
			position: absolute;
			bottom: -5rpx;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.operateItem {
			display: flex;
			align-items: center;
			flex-direction: column;
			font-size: 28rpx;
			color: #fff;
			margin-top: 50rpx;

			.iconfont {
				margin-bottom: 5rpx;
			}
		}

		.userImg {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
		}
	}

	//指示点
	.indicate {
		position: absolute;
		left: 0;
		bottom: 235rpx;
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 5;

		.indicateItem {
			width: 43rpx;
			height: 8rpx;
			border-radius: 17rpx;
			margin: 0rpx 2rpx;
		}
	}

	//评论弹窗
	.commentContainer {
		padding: 0rpx 32rpx 15rpx 32rpx;
		box-sizing: border-box;
		height: 850rpx;
		background: #fff;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
		display: flex;
		flex-direction: column;

		.commentList {
			flex: 1;
			height: 0;
			margin-top: 20rpx;
			margin-bottom: 30rpx;

			.commentItem {
				margin-top: 25rpx;
				display: flex;
				width: 100%;
				box-sizing: border-box;
			}

			.commentUserImg {
				width: 78rpx;
				height: 78rpx;
				border-radius: 50%;
				margin-right: 15rpx;
			}

			.commentUserName {
				font-size: 23rpx;
				color: #666666;
			}

			.commentContent {
				color: #323232;
				font-size: 28rpx;
				margin-top: 15rpx;
			}
		}

		.commentBar {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.commentInput {
				flex: 1;
				padding: 16rpx 0rpx 16rpx 20rpx;
				box-sizing: border-box;
				background: #F7F7F7;
				border-radius: 50rpx;
				margin-right: 20rpx;
				height: 72rpx;
			}
		}
	}
</style>