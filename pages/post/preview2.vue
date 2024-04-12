<template>
	<view class="content">
		<view>
			<view class="barHeight"></view>
			<view class="top">
				<view style="display: flex;align-items: center;justify-content: space-between;"
					v-if="myData.length !=0">
					<view style="display: flex;align-items: center;">
						<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
							@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
						<view style="display: flex;align-items: center;">
							<image @click="openUser" :src="myData.user_info.avatar"
								style="width: 86rpx;height: 86rpx;border-radius: 50%;" mode="aspectFill"></image>
							<view
								style="height: 86rpx;display: flex;flex-direction: column;justify-content: space-evenly;">
								<view style="display: flex;align-items: center;">
									<view style="color:#333 ;font-size: 28rpx;margin: 0rpx 15rpx;">
										{{myData.user_info.role_realname}}·{{myData.user_info.role_dynasty}}
									</view>
									<block v-if="myData.user_info.gender==1">
										<i class="iconfont icon-nan1" style="font-size: 22rpx;color: #00C2FF;"></i>
									</block>
									<block v-else>
										<i class="iconfont icon-nv" style="font-size: 22rpx;color: #FFA000;"></i>
									</block>
									<image :src="myData.user_info.mw_img"
										style="width:25rpx;height: 25rpx;margin-left: 15rpx;" mode=""></image>
								</view>
								<view
									style="display: flex;align-items: center;margin-left: 15rpx;font-size: 26rpx;color: #666;">
									<block v-for="(item,index) in myData.user_info.achievements">
										<text style="margin-right: 8rpx;">{{item}}</text>
									</block>
								</view>
							</view>
						</view>
					</view>
					<block v-if="myData.user_info.user_id != userInfo.id">
						<view v-if="myData.is_follow!=1" @click="follow(myData)"
							style=";width: 125rpx;height: 53rpx;background: #FFA800;border-radius: 50rpx;text-align: center;line-height:53rpx;color: #fff;font-size: 28rpx;">
							关注</view>
					</block>
				</view>
			</view>
		</view>
		<view class="swiperBox" style="overflow: hidden;">
			<view class="swiperContainer" v-if="myData.length !=0">
				<!-- 雅令 -->
				<view v-if="myData.yaling_str!=''" @click="$u.route('/pages/user/yaling',{yalingId:myData.yaling_id})"
					style="background: rgba(255, 255, 255, 0.39);position: absolute;top: 35rpx;left: 35rpx;z-index: 9;border-radius: 50rpx;border: 1px solid #FFDDA4;padding:0 10rpx;box-sizing: border-box;height: 55rpx;line-height: 55rpx;display: flex;align-items: center;">
					<text style="color: #FFA000;font-size: 28rpx;font-family: font-test !important;">雅令：</text>
					<text style="color: #333;font-size: 26rpx;">{{myData.yaling_str}}</text>
					<i style="color: #333;font-size: 20rpx;margin-left: 5rpx;" class="iconfont icon-right"></i>
				</view>
				<!-- 背景图 -->
				<block v-if="myData.full_screen_show_type!=6">
					<image v-if="myData.image_list.length==0"
						style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;z-index: 0;"
						:src="myData.bg_img_url"></image>
				</block>
				<!-- 单张图片 -->
				<view v-if="myData.full_screen_show_type==1" class="oneImg" style="width: 100%;height: 100%;">
					<!-- <image style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;z-index: 0;"
						:src="myData.image_list[0]"></image> -->
					<view
						style="position: absolute;top: 0;left: 0;z-index: 0;width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;overflow: hidden;">
						<image style="width: 100%;height: 100%;" :src="myData.image_list[0]" mode="widthFix">
						</image>
					</view>
				</view>
				<!-- 单张图片文字 -->
				<view v-if="myData.full_screen_show_type==2" class="oneImg">
					<view
						style="position: absolute;top: 0;left: 0;z-index: 2;width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;overflow: hidden;">
						<image style="width: 100%;height: 100%;" :src="myData.image_list[0]" mode="widthFix">
						</image>
					</view>
				</view>
				<!-- 文字 -->
				<view v-if="myData.full_screen_show_type==5" class="textContent"
					style="display: flex;align-items: center;justify-content: center;width: 100%;height: 100%;padding: 0rpx 86rpx;box-sizing: border-box;position: relative;z-index: 2;text-align: center;">
					<view class="textContentBox">
						<view>
							<text style="color: #fff;font-size: 36rpx;">{{myData.content.slice(0,192)}}</text>
						</view>
						<view v-if="myData.content.length>192"
							style="display: flex;align-items: center;justify-content: center;margin-top: 10rpx;">
							<text style="color: #FFA000;font-size: 32rpx;" @click="storyMore(myData)">查看更多</text>
							<i style="color: #FFA000;font-size: 32rpx;" class="iconfont icon-right"></i>
						</view>
					</view>
				</view>
				<!-- 多张图片 -->
				<view v-if="myData.full_screen_show_type==3" class="manyImg">
					<swiper :current="imagesCurrent" @change="imagesChange" class="imagesSwiper" :indicator-dots="false"
						:autoplay="false" :duration="500" :interval="2000">
						<block v-for="(imgItem,imgIndex) in myData.image_list" :key="imgIndex">
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
				<view v-if="myData.full_screen_show_type==4" class="manyImg">
					<swiper :current="imagesCurrent" @change="imagesChange" class="imagesSwiper" :indicator-dots="false"
						:autoplay="false" :duration="500" :interval="2000">
						<block v-for="(imgItem,imgIndex) in myData.image_list" :key="imgIndex">
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
				<view v-if="myData.full_screen_show_type==6" class="manyImg">
					<view
						style="position: absolute;top: 50%;left: 50%;z-index: 5;width: 135rpx;height: 135rpx;background: rgba(255, 255, 255, 0.7);border-radius: 50%;transform: translate(-50%,-50%);display: flex;align-items: center;justify-content: center;">
						<image src="@/static/pipa.png" :class="myData.isPlay?'imgRotate':''"
							style="width: 106rpx;height: 106rpx;border-radius: 50%;" mode="aspectFill">
						</image>
					</view>
					<view
						style="position: absolute;top: 0;left: 0;z-index: 2;width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;">
						<image style="width: 100vw;height: 100vh;z-index: 9;" :src="myData.bg_img_url" mode="widthFix">
						</image>
					</view>
				</view>
				<!-- 右边栏 -->
				<view class="operate">
					<view>
						<view class="operateItem" @click="like(myData)">
							<block v-if="myData.is_dig==0">
								<image src="../../static/iconImage/xinxin.png" style="width: 52rpx;height: 52rpx;"
									mode="widthFix"></image>
							</block>
							<block v-else>
								<image src="../../static/iconImage/hongxin.png" style="width: 52rpx;height: 52rpx;"
									mode="widthFix"></image>
							</block>
							<text> {{myData.diggnums ==0?'喜欢':myData.diggnums}}</text>
						</view>
						<view class="operateItem" @click="getComment(myData.post_id)">
							<image src="../../static/iconImage/pinglun.png" style="width: 52rpx;height: 52rpx;"
								mode="widthFix"></image>
							<text>{{myData.commentnums}}</text>
						</view>
						<view class="operateItem" @click="openMore(myData)">
							<image src="../../static/iconImage/gengduo.png" style="width: 52rpx;height: 52rpx;"
								mode="widthFix"></image>
							<text style="margin-top: 10rpx;">更多</text>
						</view>
						<view class="operateItem" v-if="myData.audio">
							<image v-if="myData.isPlay==false" style="width: 52rpx;height: 52rpx;"
								src="@/static/iconImage/erji11.png" mode="" @click="audioSuspend(myData)">
							</image>
							<image v-else style="width: 52rpx;height: 52rpx;" src="@/static/iconImage/erji22.png"
								mode="" @click="audioSuspend(myData)">
							</image>
						</view>
					</view>
				</view>
				<!-- 底部栏 -->
				<view class="bottom">
					<!-- 多图文指示点 -->
					<view class="indicate" v-if="myData.image_list.length>1">
						<block v-for="(imagesItem,imagesIndex) in myData.image_list" :key="imagesIndex">
							<view class="indicateItem" @click="imagesCurrent = imagesIndex"
								:style="{background:imagesIndex==imagesCurrent?'#FFA000':'rgba(153, 153,153, 0.5)'}">
							</view>
						</block>
					</view>
					<view class="original" v-if="myData.is_original ==1">原创</view>
					<view class="topic">
						<block v-for="(wordItem,wordIndex) in myData.post_cate_list" :key="wordIndex">
							<text @click="openCate(wordItem.cate_id)"
								style="color: #BDFF00;margin-right: 20rpx;">#{{wordItem.title}}</text>
						</block>
					</view>
					<block v-if="myData.full_screen_show_type==5">
						<view v-if="myData.content.length>140">
							<text style="color: #FFA000;font-size: 32rpx;" @click="storyMore(myData)">查看更多</text>
						</view>
					</block>
					<view v-if="myData.full_screen_show_type!=5" class="topicTitle" style="">
						{{myData.content.slice(0,140)}}
						<block v-if="myData.content.length>140">
							<text style="color: #FFA000;font-size: 32rpx;" @click="storyMore(myData)">查看更多</text>
							<i @click="storyMore(myData)" class="iconfont icon-right"
								style="font-size: 28rpx;color:#FFA000 ;"></i>
						</block>
					</view>
				</view>
			</view>
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
				page: 1,
				// ---
				data: [],
				post_id: '',
				myData: [],
				userInfo: uni.getStorageSync("userInfo")
			}
		},
		onLoad(option) {
			this.data = JSON.parse(this.$Route.query.data)
			this.post_id = this.data.post_id;
			this.getData()
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
			getData() {
				this.$api("post.newGetPostDetail", {
					post_id: this.data.post_id
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						res.data.isPlay = false;
						this.myData = res.data;
						if (this.myData.audio) {
							this.playAudio(this.myData)
						}
					} else {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				})
			},
			//进入用户主页页面
			openUser() {
				this.myData.isPlay = false
				this.$u.route('/pages/user/home', {
					user_id: this.myData.user_info.user_id
				})
			},
			//播放音频
			playAudio(item) {
				let that = this;
				if (item.audio != '' && item.audio != null) {
					that.audio.stop();
					item.isPlay = false;
					that.audio.src = item.audio;
					that.myData.isPlay = true;
					that.audio.play()
					that.audio.onEnded((e) => {
						that.myData.isPlay = false;
						that.isPause = false;
						that.audio.stop();
						that.audio.src = '';
					})
					that.audio.onPause(() => {

					})
				} else {
					that.audio.stop();
					that.audio.src = '';
				}
			},
			//点赞
			like(item) {
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
			audioSuspend(item) {
				this.myData.isPlay = !this.myData.isPlay;
				if (this.myData.isPlay) {
					if (this.isPause) {
						this.audio.play()
					} else {
						this.playAudio(this.myData)
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
				this.myData.commentnums++
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
		}
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
		box-sizing: border-box;

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
			padding: 10rpx 0rpx 3rpx 0rpx;
			background: rgba(255, 255, 255, 0.5);
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
</style>