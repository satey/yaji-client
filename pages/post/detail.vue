<template>
	<view class="content">
		<view>
			<view class="barHeight"></view>
			<view class="top">
				<view style="display: flex;align-items: center;justify-content: space-between;"
					v-if="swiperList.length !=0">
					<view style="display: flex;align-items: center;">
						<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
							@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
						<view style="display: flex;align-items: center;">
							<image @click="openUser" :src="swiperList[trendsIndex].user_info.avatar"
								style="width: 86rpx;height: 86rpx;border-radius: 50%;" mode="aspectFill"></image>
							<view
								style="height: 86rpx;display: flex;flex-direction: column;justify-content: space-evenly;">
								<view style="display: flex;align-items: center;">
									<view style="color:#333 ;font-size: 28rpx;margin: 0rpx 15rpx;">
										{{swiperList[trendsIndex].user_info.role_realname}}·{{swiperList[trendsIndex].user_info.role_dynasty}}
									</view>
									<block v-if="swiperList[trendsIndex].user_info.gender==1">
										<i class="iconfont icon-nan1" style="font-size: 22rpx;color: #00C2FF;"></i>
									</block>
									<block v-else>
										<i class="iconfont icon-nv" style="font-size: 22rpx;color: #FFA000;"></i>
									</block>
									<image :src="swiperList[trendsIndex].user_info.mw_img"
										style="width:25rpx;height: 25rpx;margin-left: 15rpx;" mode=""></image>
								</view>
								<view
									style="display: flex;align-items: center;margin-left: 15rpx;font-size: 26rpx;color: #666;">
									<block v-for="(item,index) in swiperList[trendsIndex].user_info.achievements">
										<text style="margin-right: 8rpx;">{{item}}</text>
									</block>
								</view>
							</view>
						</view>
					</view>
					<view v-if="swiperList[trendsIndex].is_follow!=1" @click="follow(swiperList[trendsIndex])"
						style=";width: 125rpx;height: 53rpx;background: #FFA800;border-radius: 50rpx;text-align: center;line-height:53rpx;color: #fff;font-size: 28rpx;">
						关注</view>
				</view>
			</view>
		</view>
		<view class="swiperBox">
			<swiper class="mySwiper" :indicator-dots="false" :autoplay="false" :vertical="true" :interval="3000"
				:duration="500" @change="trendsChange" @animationfinish='trendsFinish'>
				<block v-for="(item,index) in swiperList" :key="index">
					<swiper-item style="width: 100%;height: 100%;">
						<view class="swiperContainer">
							<!-- 雅令 -->
							<view v-if="item.yaling_str!=''"
								@click="$u.route('/pages/user/yaling',{yalingId:item.yaling_id})"
								style="background: rgba(255, 255, 255, 0.39);position: absolute;top: 35rpx;left: 35rpx;z-index: 9;border-radius: 50rpx;border: 1px solid #FFDDA4;padding:0 10rpx;box-sizing: border-box;height: 55rpx;line-height: 55rpx;display: flex;align-items: center;">
								<text
									style="color: #FFA000;font-size: 28rpx;font-family: font-test !important;">雅令：</text>
								<text style="color: #333;font-size: 26rpx;">{{item.yaling_str}}</text>
								<i style="color: #333;font-size: 20rpx;margin-left: 5rpx;"
									class="iconfont icon-right"></i>
							</view>
							<!-- 背景图 -->
							<block v-if="item.full_screen_show_type!=6">
								<image v-if="item.image_list.length==0"
									style="width: 100vw;height: 100vh;position: absolute;top: 0;left: 0;z-index: 0;"
									:src="item.bg_img_url"></image>
							</block>

							<!-- 单张图片 -->
							<view v-if="item.full_screen_show_type==1" class="oneImg">
								<!-- <image style="width: 100vw;height: 100vh;position: absolute;top: 0;left: 0;z-index: 0;"
									:src="item.image_list[0]"></image> -->
								<view
									style="position: absolute;top: 0;left: 0;z-index: 0;width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;">
									<image style="width: 100%;height: 100%;" :src="item.image_list[0]" mode="widthFix">
									</image>
								</view>
							</view>
							<!-- 单张图片文字 -->
							<view v-if="item.full_screen_show_type==2" class="oneImg">
								<view
									style="position: absolute;top: 0;left: 0;z-index: 2;width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;">
									<image style="width: 100%;height: 100%;" :src="item.image_list[0]" mode="widthFix">
									</image>
								</view>
							</view>
							<!-- 文字 -->
							<view v-if="item.full_screen_show_type==5" class="textContent"
								style="display: flex;align-items: center;justify-content: center;width: 100%;height: 100%;padding: 0rpx 86rpx;box-sizing: border-box;position: relative;z-index: 2;text-align: center;">
								<view class="textContentBox">
									<view>
										<text style="color: #fff;font-size: 36rpx;">{{item.content.slice(0,192)}}</text>
									</view>
									<view v-if="item.content.length>192"
										style="display: flex;align-items: center;justify-content: center;margin-top: 10rpx;">
										<text style="color: #FFA000;font-size: 32rpx;"
											@click="storyMore(item)">查看更多</text>
										<i style="color: #FFA000;font-size: 32rpx;" class="iconfont icon-right"></i>
									</view>
								</view>
							</view>
							<!-- 多张图片 -->
							<view v-if="item.full_screen_show_type==3" class="manyImg">
								<swiper :current="imagesCurrent" @change="imagesChange" class="imagesSwiper"
									:indicator-dots="false" :autoplay="false" :duration="500" :interval="2000">
									<block v-for="(imgItem,imgIndex) in item.image_list" :key="imgIndex">
										<swiper-item>
											<view class="imagesSwiperItem">
												<image style="width: 100%;" :src="imgItem" mode="widthFix">
												</image>
											</view>
										</swiper-item>
									</block>
								</swiper>
							</view>
							<!-- 多张图片 -->
							<view v-if="item.full_screen_show_type==4" class="manyImg">
								<swiper :current="imagesCurrent" @change="imagesChange" class="imagesSwiper"
									:indicator-dots="false" :autoplay="false" :duration="500" :interval="2000">
									<block v-for="(imgItem,imgIndex) in item.image_list" :key="imgIndex">
										<swiper-item>
											<view class="imagesSwiperItem">
												<image style="width: 100%;" :src="imgItem" mode="widthFix">
												</image>
											</view>
										</swiper-item>
									</block>
								</swiper>
							</view>
							<!-- 纯语音-->
							<view v-if="item.full_screen_show_type==6" class="manyImg">
								<view
									style="position: absolute;top: 50%;left: 50%;z-index: 5;width: 135rpx;height: 135rpx;background: rgba(255, 255, 255, 0.7);border-radius: 50%;transform: translate(-50%,-50%);display: flex;align-items: center;justify-content: center;">
									<image src="@/static/pipa.png" :class="item.isPlay?'imgRotate':''"
										style="width: 106rpx;height: 106rpx;border-radius: 50%;" mode="aspectFill">
									</image>
								</view>
								<view
									style="position: absolute;top: 0;left: 0;z-index: 2;width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;">
									<image style="width: 100vw;height: 100vh;z-index: 9;" :src="item.bg_img_url"
										mode="widthFix">
									</image>
								</view>
							</view>
							<!-- 右边栏 -->
							<view class="operate">
								<view>
									<view class="operateItem" @click="like(item,index)">
										<block v-if="item.is_dig==0">
											<image src="../../static/iconImage/xinxin.png"
												style="width: 52rpx;height: 52rpx;" mode="widthFix"></image>
										</block>
										<block v-else>
											<image src="../../static/iconImage/hongxin.png"
												style="width: 52rpx;height: 52rpx;" mode="widthFix"></image>
										</block>
										<text> {{item.diggnums ==0?'喜欢':item.diggnums}}</text>
									</view>
									<view class="operateItem" @click="getComment(item.post_id)">
										<image src="../../static/iconImage/pinglun.png"
											style="width: 52rpx;height: 52rpx;" mode="widthFix"></image>
										<text>{{item.commentnums}}</text>
									</view>
									<view class="operateItem" @click="openMore(item)">
										<image src="../../static/iconImage/gengduo.png"
											style="width: 52rpx;height: 52rpx;" mode="widthFix"></image>
										<text style="margin-top: 10rpx;">更多</text>
									</view>
									<view class="operateItem" v-if="item.audio">
										<image v-if="item.isPlay==false" style="width: 52rpx;height: 52rpx;"
											src="@/static/iconImage/erji11.png" mode=""
											@click="audioSuspend(item,index)">
										</image>
										<image v-else style="width: 52rpx;height: 52rpx;"
											src="@/static/iconImage/erji22.png" mode=""
											@click="audioSuspend(item,index)">
										</image>
									</view>
								</view>
							</view>
							<!-- 底部栏 -->
							<view class="bottom">
								<!-- 多图文指示点 -->
								<view class="indicate" v-if="item.image_list.length>1">
									<block v-for="(imagesItem,imagesIndex) in item.image_list" :key="imagesIndex">
										<view class="indicateItem" @click="imagesCurrent = imagesIndex"
											:style="{background:imagesIndex==imagesCurrent?'#FFA000':'rgba(153, 153,153, 0.5)'}">
										</view>
									</block>
								</view>
								<view class="original" v-if="item.is_original ==1">原创</view>
								<view class="topic">
									<block v-for="(wordItem,wordIndex) in item.post_cate_list" :key="wordIndex">
										<text @click="openCate(wordItem.cate_id)"
											style="color: #BDFF00;margin-right: 20rpx;">#{{wordItem.title}}</text>
									</block>
								</view>
								<view v-if="item.full_screen_show_type!=5" class="topicTitle" style="">
									<text class="textLine">{{item.content}}</text>
									<block>
										<text style="color: #FFA000;font-size: 32rpx;"
											@click="storyMore(item)">查看更多</text>
										<i @click="storyMore(item)" class="iconfont icon-right"
											style="font-size: 28rpx;color:#FFA000 ;"></i>
									</block>
								</view>
							</view>
						</view>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<view class="bottomBar">
			<!-- 评论弹窗 -->
			<u-popup :show="commentPopup" @close="commentPopup = false;" :closeable="false" :round="30">
				<view class="commentContainer" style="position: relative;">
					<u-icon @click="commentPopup = false" name="close" color="#333" size="25" bold
						style="position: absolute;top: 36rpx;right: 40rpx;"></u-icon>
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
			<!-- 更多弹窗 -->
			<feiMore ref="more" @shield="shield"></feiMore>
			<!-- 故事弹窗 -->
			<u-popup :show="storyPopup" @close="storyPopup = false;" :closeable="false" :round="30">
				<view class="storyContainer" style="position: relative;">
					<u-icon @click="storyPopup = false" name="close" color="#333" size="25" bold
						style="position: absolute;top: 43rpx;right: 38rpx;"></u-icon>
					<view style="display: flex;justify-content: center;">
						<view style="position: relative;margin-top: 32rpx;display: inline;">
							<text style="position: relative;z-index: 2;color:#333 ;font-size:32rpx ;">查看全部</text>
							<text
								style="width: 100%;height: 13rpx;background: #FFA000;position: absolute;left: 0;bottom: 5rpx;"></text>
						</view>
					</view>
					<view
						style="margin-top: 50rpx;color: #333;font-size: 32rpx;padding: 0rpx 29rpx;box-sizing: border-box;height: 100%;width: 100%;">
						<scroll-view scroll-y="true" style="height: 100%;width: 100%;">
							<view>
								<text>{{itemContent}}</text>
							</view>
						</scroll-view>
					</view>
				</view>
			</u-popup>
			<feiqslsHit></feiqslsHit>
			<view class="commentBar" @click="replyComment">
				<view class="commentInput" style="font-size:28rpx;color:#999999;">
					回复作者
				</view>
				<view
					style="width: 150rpx;height: 72rpx;text-align: center;line-height: 72rpx;color: #fff;font-size: 28rpx;border-radius: 50rpx;background: #FFA000;">
					发送</view>
			</view>
		</view>
	</view>
</template>
<script>
	import feiMore from "@/components/fei-more/fei-more.vue"
	import commentTwo from "@/components/fei-commentTwo/fei-commentTwo.vue"
	export default {
		name: 'detail',
		components: {
			feiMore,
			commentTwo
		},
		data() {
			return {
				swiperList: [],
				itemContent: '',
				trendsIndex: 0,
				storyPopup: false,
				commentPopup: false,
				commentList: [],
				commentData: [],
				commentPage: 1,
				imagesCurrent: 0,
				audio: uni.createInnerAudioContext(),
				isPause: false,
				isBottomBarFlag: false,
				post_id: '',
				tag_id: "",
				from: "",
				post_cate_id: "",
				page: 1
			}
		},
		onLoad(option) {
			console.log(option)
			if (option.from == 'follow') {
				this.from = "follow"
				this.post_id = option.post_id
				this.getFollowData('one')
			} else if (option.from == 'trends') {
				this.from = "trends"
				this.post_id = option.post_id
				this.tag_id = option.tag_id;
				this.getTrendsData("one")
			} else if (option.from == 'topic') {
				this.from = "topic"
				this.post_id = option.post_id
				this.post_cate_id = option.post_cate_id;
				this.getTopicData("one")
			}
			this.setFontFamily()
		},
		onUnload() {
			if (this.audio) {
				this.audio.stop();
			}
		},
		onHide() {
			if (this.audio) {
				this.audio.stop();
			}
		},
		methods: {
			//话题
			getTopicData(type) {
				var that = this;
				that.$api("post_cate.getPostByFullScreen", {
					page: this.page,
					post_id: this.post_id,
					post_cate_id: this.post_cate_id
				}).then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						res.data.list.forEach((item, index) => {
							item.isPlay = false;
							item.isObserve = false;
							item.ispause = false;
						})
						if (that.swiperList.length != 0) {
							for (var i = 0; i < that.swiperList.length; i++) {
								for (var j = 0; j < res.data.list.length; j++) {
									if (that.swiperList[i].post_id == res.data.list[j].post_id) {
										res.data.list.splice(j, 1)
									}
								}
							}
						}
						that.swiperList.push(...res.data.list);
						if (type == 'one') {
							if (that.swiperList.length == 0) {
								return;
							}
							if (res.data.list[0].audio) {
								this.playAudio(res.data.list[0], 0)
								if (this.swiperList[0].full_screen_show_type == 6) {
									this.swiperList[0].ispause = true
								}
							}
							this.userBrowseLog(res.data.list[0].post_id)
						}
					}
				})
			},
			//动态
			getTrendsData(type) {
				var that = this;
				that.$api("post_cate.getPostByFullScreen", {
					page: this.page,
					post_id: this.post_id,
					tag_id: this.tag_id
				}).then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						res.data.list.forEach((item, index) => {
							item.isPlay = false;
							item.isObserve = false;
							item.ispause = false;
						})
						if (that.swiperList.length != 0) {
							for (var i = 0; i < that.swiperList.length; i++) {
								for (var j = 0; j < res.data.list.length; j++) {
									if (that.swiperList[i].post_id == res.data.list[j].post_id) {
										res.data.list.splice(j, 1)
									}
								}
							}
						}
						that.swiperList.push(...res.data.list);
						if (type == 'one') {
							if (that.swiperList.length == 0) {
								return;
							}
							if (res.data.list[0].audio) {
								this.playAudio(res.data.list[0], 0)
								if (this.swiperList[0].full_screen_show_type == 6) {
									this.swiperList[0].ispause = true
								}
							}
							this.userBrowseLog(res.data.list[0].post_id)
						}
					}
				})
			},
			//关注
			getFollowData(type) {
				var that = this;
				that.$api("post_cate.getFollowUserPostList", {
					page: this.page,
					post_id: this.post_id
				}).then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						res.data.list.forEach((item, index) => {
							item.isPlay = false;
							item.isObserve = false;
							item.ispause = false;
						})
						if (that.swiperList.length != 0) {
							for (var i = 0; i < that.swiperList.length; i++) {
								for (var j = 0; j < res.data.list.length; j++) {
									if (that.swiperList[i].post_id == res.data.list[j].post_id) {
										res.data.list.splice(j, 1)
									}
								}
							}
						}
						that.swiperList.push(...res.data.list);
						if (type == 'one') {
							if (that.swiperList.length == 0) {
								return;
							}
							if (res.data.list[0].audio) {
								this.playAudio(res.data.list[0], 0)
								if (this.swiperList[0].full_screen_show_type == 6) {
									this.swiperList[0].ispause = true
								}
							}
							this.userBrowseLog(res.data.list[0].post_id)
						}
					}
				})
			},
			//屏幕滚动轮播图
			trendsChange(e) {
				if (e.detail.current == this.swiperList.length - 1) {
					uni.showToast({
						icon: "none",
						title: "没有可推荐的动态"
					})
				}
				this.trendsIndex = e.detail.current;
				this.playAudio(this.swiperList[e.detail.current], e.detail.current);
				if (this.swiperList[e.detail.current].full_screen_show_type == 6) {
					this.swiperList[e.detail.current].ispause = true
				}
				if (this.swiperList.length > 3) {
					if (e.detail.current >= this.swiperList.length - 2) {
						this.page++
						if (this.from == 'follow') {
							this.getFollowData('two')
						} else if (this.from == 'trends') {
							this.getTrendsData("two")
						} else if (this.from == 'topic') {
							this.getTopicData("two")
						}
					}
					this.swiperList[e.detail.current].isObserve = true
				}
				this.userBrowseLog(this.swiperList[e.detail.current].post_id)
			},
			//屏幕滚动轮播图结束
			trendsFinish(e) {

			},
			//进入用户主页页面
			openUser() {
				this.swiperList[this.trendsIndex].isPlay = false
				this.$u.route('/pages/user/home', {
					user_id: this.swiperList[this.trendsIndex].user_info.user_id
				})
			},
			//播放音频
			playAudio(item, index) {
				let that = this;
				if (item.audio != '' && item.audio != null) {
					that.audio.stop();
					that.swiperList.forEach((val, index) => {
						val.isPlay = false;
					})
					that.audio.src = item.audio;
					that.swiperList[index].isPlay = true;
					that.audio.play()
					that.audio.onEnded((e) => {
						that.swiperList[index].isPlay = false;
						that.isPause = false;
						that.audio.stop();
						that.audio.src = '';
						this.swiperList.forEach((item, index) => {
							if (item.full_screen_show_type == 6) {
								item.ispause = false;
							}
						})
					})
					that.audio.onPause(() => {
						that.swiperList.forEach((item, index) => {
							if (item.full_screen_show_type == 6) {
								that.swiperList[index].ispause = false;
								that.$forceUpdate()
							}
						})
					})
				} else {
					that.audio.stop();
					that.audio.src = '';
				}
			},
			//动态已看上报
			userBrowseLog(post_id) {
				this.$api("post.userBrowseLog", {
					post_id: post_id
				}).then(res => {})
			},
			//点赞
			like(item, index) {
				item.is_dig = !item.is_dig
				if (item.is_dig) {
					item.diggnums++;
				} else {
					item.diggnums--;
				}
				this.$api("post.dig", {
					post_id: item.post_id
				}).then(res => {
					if (res.code == 1) {} else {
						item.is_dig = false;
					}
				})
			},
			//获取评论
			getComment(postId) {
				this.isBottomBarFlag = false;
				this.commentPopup = true;
				this.commentPage = 1;
				this.commentList = [];
				this.commentData = [];
				this.getCommentList(postId)
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
						if (this.isBottomBarFlag) {
							this.$refs.commentTwo.showCommentBar()
						}
					}
				})
			},
			//查看更多
			storyMore(item) {
				this.storyPopup = true;
				this.itemContent = item.content
			},
			//打开更多
			openMore(item) {
				this.$refs.more.moreShow(item.post_id, item.user_id, true, item)
			},
			//屏蔽作品
			shield(postId) {
				this.swiperList.forEach((item, index) => {
					if (item.post_id == postId) {
						this.swiperList.splice(index, 1)
					}
				})
			},
			//关注
			follow(item) {
				item.is_follow = !item.is_follow;
				this.$api("user_follow.follow", {
					user_id: item.user_id
				}).then(res => {
					uni.showToast({
						icon: "none",
						title: res.msg
					})
				})
			},
			//打开话题
			openCate(id) {
				this.$u.route('/pages/user/topicspeed', {
					post_cate_id: id,
					type: 'index'
				})
			},
			//audio暂停
			audioSuspend(item, index) {
				this.swiperList[index].isPlay = !this.swiperList[index].isPlay;
				if (this.swiperList[index].isPlay) {
					if (this.isPause) {
						this.audio.play()
					} else {
						this.playAudio(item, index)
					}
				} else {
					this.isPause = true;
					this.audio.pause()
				}
			},
			//评论成功
			commentReply(data, isFlag) {
				if (isFlag) {
					this.getComment(data.post_id)
				}
				this.swiperList.forEach((item, index) => {
					if (item.post_id == data.post_id) {
						item.commentnums++;
					}
				})
			},
			commentInputClick() {
				this.$refs.commentTwo.showCommentBar()
			},
			replyComment() {
				this.commentPopup = true
				this.getComment(this.swiperList[this.trendsIndex].post_id)
				this.$nextTick(() => {
					this.isBottomBarFlag = true;
				})
			},
			commentBottom() {
				if (this.commentList.length != 0) {
					this.commentPage++;
					this.getCommentList(this.commentData.post_id)
				}
			},
			imagesChange(e) {
				this.imagesCurrent = e.detail.current
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
		},
	}
</script>
<style lang="scss" scoped>
	.content {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.barHeight {
		height: var(--status-bar-height);
	}

	.top {
		height: 122rpx;
		padding: 11rpx 20rpx 15rpx 35rpx;
		box-sizing: border-box;
	}

	.swiperBox {
		flex: 1;
		height: 0;
		background: #000;
		overflow: hidden;

		.mySwiper {
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			background: #000;
		}
	}

	.bottomBar {
		background: #fff;
	}

	.commentBar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 29rpx 25rpx 19rpx 25rpx;
		box-sizing: border-box;

		.commentInput {
			flex: 1;
			padding: 20rpx 0rpx 20rpx 20rpx;
			box-sizing: border-box;
			background: #F7F7F7;
			border-radius: 50rpx;
			margin-right: 20rpx;
			margin-right: 15rpx;
		}
	}

	.swiperContainer {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		position: relative;
		box-sizing: border-box;
	}

	// 右边
	.operate {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
		position: absolute;
		right: 25rpx;
		bottom: 60rpx;
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

	// 底部
	.bottom {
		display: flex;
		flex-direction: column;
		position: absolute;
		left: 25rpx;
		bottom: 27rpx;
		z-index: 3;
		width: calc(100% - 100rpx);

		.original {
			font-size: 28rpx;
			color: #FFC564;
			width: 96rpx;
			text-align: center;
			border-radius: 8rpx;
			background: rgba(255, 255, 255, 0.5);
			height: 46rpx;
			line-height: 46rpx;
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
			font-size: 32rpx;
			color: rgba(255, 255, 255, 1);
			margin-top: 13rpx;
		}
	}

	//指示点
	.indicate {
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2;
		margin-bottom: 20rpx;
		margin-left: -25rpx;
		box-sizing: border-box;

		.indicateItem {
			width: 43rpx;
			height: 8rpx;
			border-radius: 17rpx;
			margin: 0rpx 2rpx;
		}
	}

	.storyContainer {
		width: 100vw;
		height: 850rpx;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		background: #fff;
	}

	.manyImg {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		position: relative;

		.imagesSwiper {
			width: 100%;
			height: 100%;

			.imagesSwiperItem {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}

	//评论弹窗
	.commentContainer {
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
			padding: 0rpx 32rpx 15rpx 32rpx;
			box-sizing: border-box;

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

	.imgRotate {
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		animation-delay: 0;
		animation-duration: 3s;
		animation-name: rotate;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.textLine {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 8;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>