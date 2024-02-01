<template>
	<view>
		<view class="hedaBar">
			<u-tabs :list="tablist" lineColor="#FFA000" lineWidth="36rpx" lineHeight="6rpx" itemStyle="height: 80rpx;"
				inactiveStyle="color: #333; transform: scale(1);"
				activeStyle="color: #FFA000; font-weight: bold; transform: scale(1.2);" @change="changeTab">
			</u-tabs>
			<view class="pt-2" style="display: flex;align-items: center;">
				<i class="iconfontcolor  icon-biaoqing" @click="$u.route('/pages/post/add')"
					style="font-size: 46rpx;margin-right: 50rpx;"></i>
				<view style="position: relative;">
					<view v-if="no_read_count!=0" class="tips2">
					</view>
					<i class="iconfontcolor  icon-yy" @click="$u.route('/pages/post/postMessage')"
						style="font-size: 46rpx;"></i>
				</view>
				<!-- <image src="../../static/iconImage/lingdang.png" style="width: 46rpx;height:46rpx ;" mode=""></image> -->
			</view>
		</view>
		<!-- 动态 -->
		<template v-if="currentType == 'trends'">
			<swiper v-if="swiperList.length!=0" class="mySwiper" :style="'height:'+windowHeight" vertical="true"
				:indicator-dots="false" :autoplay="false" :duration="500" @change="trendsChange"
				@animationfinish='trendsFinish'>
				<block v-for="(item,index) in swiperList" :key="index">
					<swiper-item class="swiperBox">
						<!-- 单张图片 -->
						<view v-if="item.show_type==1" class="oneImg">
							<image style="width: 100vw;height: 100vh;position: absolute;top: 0;left: 0;z-index: 0;"
								:src="item.bg_img_url"></image>
							<view
								style="position: absolute;top: 0;left: 0;z-index: 0;width: 100vw;height: 100vh;display: flex;align-items: center;justify-content: center;">
								<image style="width: 100%;" :src="item.image_list[0]" mode="widthFix"></image>
							</view>
						</view>
						<!-- 单张图片文字 -->
						<view v-if="item.show_type==2" class="oneImg">
							<image style="width: 100vw;height: 100vh;position: absolute;top: 0;left: 0;z-index: 0;"
								:src="item.bg_img_url"></image>
							<view class="textContent" style="position: relative;z-index: 2;"
								:style="{paddingTop:statusBarHeight}">
								<view class="textContentBox">
									<text>{{item.content}}</text>
								</view>
							</view>
							<view
								style="position: absolute;top: 0;left: 0;z-index: 0;width: 100vw;height: 100vh;display: flex;align-items: center;justify-content: center;">
								<image style="width: 100%;" :src="item.image_list[0]" mode="widthFix"></image>
							</view>

						</view>
						<!-- 文字 -->
						<view v-if="item.show_type==5" class="textContent" :style="{paddingTop:statusBarHeight}">
							<image style="width: 100vw;height: 100vh;position: absolute;top: 0;left: 0;z-index: 0;"
								:src="item.bg_img_url"></image>
							<view class="textContentBox">
								<text>{{item.content}}</text>
							</view>
						</view>
						<!-- 多张图片 -->
						<view v-if="item.show_type==3" class="manyImg">
							<image style="width: 100vw;height: 100vh;position: absolute;top: 0;left: 0;z-index: 0;"
								:src="item.bg_img_url"></image>
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
							<!-- 多图文指示点 -->
							<view class="indicate" :style="{paddingBottom:tabBarHeight}">
								<block v-for="(imagesItem,imagesIndex) in item.image_list" :key="imagesIndex">
									<view class="indicateItem" @click="imagesCurrent = imagesIndex"
										:style="{background:imagesCurrent==imagesIndex?'rgba(255, 255, 255, 1)':'rgba(153, 153, 153, 1)'}">
									</view>
								</block>
							</view>
						</view>
						<!-- 多张图片加文字 -->
						<view v-if="item.show_type==4" class="manyImg">
							<image style="width: 100vw;height: 100vh;position: absolute;top: 0;left: 0;z-index: 0;"
								:src="item.bg_img_url"></image>
							<view class="textContent" style="position: relative;z-index: 2;"
								:style="{paddingTop:statusBarHeight}">
								<view class="textContentBox">
									<text>{{item.content}}</text>
								</view>
							</view>
							<swiper :current="imagesTextCurrent" @change="imagesTextChange" class="imagesSwiper"
								:indicator-dots="false" :circular='true' :autoplay="trendsIndex==index?true:false"
								:duration="500" :interval="2000" style="position: absolute;top: 0;left: 0;z-index: 1;">
								<block v-for="(imgItem,imgIndex) in item.image_list" :key="imgIndex">
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
								<block v-for="(imagesItem,imagesIndex) in item.image_list" :key="imagesIndex">
									<view class="indicateItem" @click="imagesTextCurrent = imagesIndex"
										:style="{background:imagesTextCurrent==imagesIndex?'rgba(255, 255, 255, 1)':'rgba(153, 153, 153, 1)'}">
									</view>
								</block>
							</view>
						</view>
						<!-- 右边栏 -->
						<view class="operate" :style="{paddingBottom:tabBarHeight}">
							<view>
								<view style="position: relative;">
									<image class="userImg" @click="$u.route('/pages/user/home',{user_id:item.user_id})"
										:src="item.user_info.avatar" mode="aspectFill"></image>
									<view class="follow" @click="follow(item)" v-if="item.is_follow!=1">
										<i class="iconfont  icon-jia" style="color: #FFFFFF;font-size: 20rpx;"></i>
									</view>
								</view>
								<view class="operateItem" @click="like(item,index)">
									<block v-if="item.is_dig==0">
										<image src="../../static/iconImage/xinxin.png"
											style="width: 52rpx;height: 52rpx;" mode="widthFix"></image>
										<!-- <i class="iconfont  icon-aixin1"
											style="color: #FFFFFF;font-size: 60rpx;margin-right: 5rpx;"></i> -->
									</block>
									<block v-else>
										<image src="../../static/iconImage/hongxin.png"
											style="width: 52rpx;height: 52rpx;" mode="widthFix"></image>
										<!-- <i class="iconfont  icon-aixin1"
											style="color: red;font-size: 60rpx;margin-right: 5rpx;"></i> -->
									</block>
									<text> {{item.diggnums ==0?'喜欢':item.diggnums}}</text>
								</view>
								<view class="operateItem" @click="getComment(item.post_id)">
									<image src="../../static/iconImage/pinglun.png" style="width: 52rpx;height: 52rpx;"
										mode="widthFix"></image>
									<!-- <i class="iconfont  icon-pinglun"
										style="color: #FFFFFF !important;font-size: 60rpx;margin-right: 5rpx;"></i> -->
									<text>{{item.commentnums}}</text>
								</view>
								<view class="operateItem" @click="openMore(item)">
									<image src="../../static/iconImage/gengduo.png" style="width: 52rpx;height: 52rpx;"
										mode="widthFix"></image>
									<!-- <i class="iconfontcolor  icon-gengduo"
										style="font-size: 60rpx;margin-right: 5rpx;"></i> -->
									<text style="margin-top: 10rpx;">更多</text>
								</view>
								<view class="operateItem" v-if="item.audio">
									<image v-if="item.isPlay==false" style="width: 52rpx;height: 52rpx;"
										src="@/static/iconImage/erji11.png" mode="" @click="audioSuspend(item,index)">
									</image>
									<image v-else style="width: 52rpx;height: 52rpx;"
										src="@/static/iconImage/erji22.png" mode="" @click="audioSuspend(item,index)">
									</image>
								</view>
							</view>
						</view>

						<!-- 底部栏 -->
						<view class="bottom" :style="{paddingBottom:tabBarHeight}">
							<view class="original" v-if="item.is_original ==1">原创</view>
							<view class="userBox">
								<image style="width: 36rpx;height: 36rpx;" :src="item.user_info.mw_img"
									mode="aspectFill"></image>
								<view style="margin-right: 8rpx;margin-left: 8rpx;">
									{{item.user_info.role_realname}}·{{item.user_info.role_dynasty}}
								</view>
								<block v-if="item.user_info.gender==1">
									<i class="iconfont icon-nan1" style="font-size: 22rpx;color: #00C2FF;"></i>
								</block>
								<block v-else>
									<i class="iconfont icon-nv" style="font-size: 22rpx;color: #FFA000;"></i>
								</block>
							</view>
							<view class="topic">
								<block v-for="(wordItem,wordIndex) in item.post_cate_list" :key="wordIndex">
									<text @click="openCate(wordItem.cate_id)">#{{wordItem.title}}</text>
								</block>
							</view>
							<view class="topicTitle" style="">
								{{item.story.slice(0,40)}}
								<block v-if="item.story.length>40">
									<text style="color: #FFA000;font-size: 28rpx;" @click="storyMore(item)">查看更多</text>
									<i @click="storyMore(item)" class="iconfont icon-right"
										style="font-size: 28rpx;color:#FFA000 ;"></i>
								</block>
							</view>
						</view>
					</swiper-item>
				</block>
			</swiper>
			<u-empty v-if="!swiperList.length" icon="/static/iconImage/jilu.png" text="" textColor="#a1a1a1"
				marginTop="100"></u-empty>
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
					<view v-html="itemStory"
						style="margin-top: 50rpx;color: #333;font-size: 28rpx;padding: 0rpx 29rpx;box-sizing: border-box;">
					</view>
				</view>
			</u-popup>
			<feiMore ref="more" @shield="shield"></feiMore>
		</template>
		<!-- 话题 -->
		<template v-if="currentType == 'topic'">
			<view style="height: var(--status-bar-height );"></view>
			<view style="padding: 100rpx 30rpx 100rpx 30rpx;box-sizing: border-box;">
				<takequestion v-for="(item, index) in listPostRecommend" :key="index" :index="index" :item="item">
				</takequestion>
			</view>
			<u-empty v-if="!listPostRecommend.length" icon="/static/empty2.png" text="数据为空" textColor="#a1a1a1"
				marginTop="100"></u-empty>
		</template>
		<!-- 更多 -->
		<template v-if="currentType == 'more'">
			<view style="height: var(--status-bar-height );"></view>
			<view class="moreBox">
				<view class="moreItem" @click="$u.route('pages/user/famousRole')">名人堂</view>
				<view class="moreItem" @click="$u.route('pages/talent/talent')">才华测试</view>
				<view class="moreItem" @click="$u.route('/pages/joy/poem')">诗词结缘</view>
				<view class="moreItem" @click="$u.route('pages/joy/archeryStart')">射覆</view>
				<view class="moreItem" @click="$u.route('pages/song/songStart')">桑田对歌</view>
			</view>
		</template>
		<view class="tabBar" :style="{height:tabBarHeight}">
			<view class="tabBarItem" @click="openTab('/pages/index/index')">
				<image class="tabIcon" src="@/static/tabbar/index.png" mode=""></image>
				<text class="tabText"></text>
			</view>
			<view class="tabBarItem">
				<image class="tabIcon" src="@/static/tabbar/square_active.png" mode="aspectFill"></image>
				<text class="tabText">广场</text>
			</view>
			<view class="tabBarItem" @click="openTab('/pages/index/message')" style="position: relative;">
				<view v-if="$store.state.message.messageCount!=0"
					style="font-size: 23rpx;width: 16px;height: 16px;border-radius: 50%;background: #f43530;color: #fff;text-align: center;line-height: 16px;position: absolute;top: -10rpx;right: 30.5%;z-index: 1;">
					{{$store.state.message.messageCount}}
				</view>
				<image class="tabIcon" src="@/static/tabbar/message.png" mode="aspectFill"></image>
				<text class="tabText">消息</text>
			</view>
			<view class="tabBarItem" @click="openTab('/pages/index/mine')">
				<image class="tabIcon" src="@/static/tabbar/mine.png" mode="aspectFill"></image>
				<text class="tabText">我的</text>
			</view>
		</view>
		<feiqslsHit></feiqslsHit>
	</view>
</template>
<script>
	import feiMore from "@/components/fei-more/fei-more.vue"
	import commentTwo from "@/components/fei-commentTwo/fei-commentTwo.vue"
	export default {
		name: 'square',
		components: {
			commentTwo,
			feiMore
		},
		data() {
			return {
				storyPopup: false,
				itemStory: '',
				audio: uni.createInnerAudioContext(),
				windowHeight: uni.getSystemInfoSync().screenHeight + 'px;',
				// tabBarHeight: uni.getSystemInfoSync().screenHeight - uni.getSystemInfoSync().windowHeight + 'px',
				tabBarHeight: '50px',
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight + 'px',
				morePopup: false,
				commentPopup: false,
				imagesCurrent: 0,
				imagesTextCurrent: 0,
				trendsIndex: 0,
				currentType: "trends",
				topicList: [],
				tablist: [{
						name: '动态',
						type: 'trends',
						count: 0
					},
					{
						name: '话题',
						type: 'topic',
						count: 0
					},
					{
						name: '更多',
						type: 'more',
						count: 0
					},
				],
				swiperList: [],
				listPostRecommend: [],
				commentList: [],
				commentData: [],
				commentPage: 1,
				no_read_count: 0,
			}
		},
		onLoad(option) {
			this.setFontFamily();
			this.getData('one')
		},
		onShow() {
			uni.hideTabBar()
			this.trendsMsg()
			if (this.swiperList.length != 0) {
				if (this.swiperList[this.trendsIndex].audio) {
					this.playAudio(this.swiperList[this.trendsIndex], this.trendsIndex)
				}
			}
		},
		onHide() {
			if (this.audio) {
				this.audio.stop();
			}
		},
		methods: {
			trendsMsg() {
				var that = this;
				that.$api('message.trendsMsg').then(res => {
					if (res.code === 1) {
						that.no_read_count = res.data.no_read_count;
					}
				})
			},
			storyMore(item) {
				this.storyPopup = true;
				this.itemStory = item.story
			},
			getData(type) {
				var that = this;
				that.$api("post.newRecommend").then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						res.data.forEach((item, index) => {
							item.isPlay = false;
							item.isObserve = false;
						})
						if (that.swiperList.length != 0) {
							for (var i = 0; i < that.swiperList.length; i++) {
								for (var j = 0; j < res.data.length; j++) {
									if (that.swiperList[i].post_id == res.data[j].post_id) {
										res.data.splice(j, 1)
									}
								}
							}
						}
						that.swiperList.push(...res.data);
						if (type == 'one') {
							if (that.swiperList.length == 0) {
								return;
							}
							if (res.data[0].audio) {
								this.playAudio(res.data[0], 0)
							}
							this.userBrowseLog(res.data[0].post_id)
						}
					}
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
					that.$nextTick(() => {
						that.audio.src = item.audio;
						that.swiperList[index].isPlay = true;
						that.audio.play()
						that.audio.onEnded((e) => {
							that.swiperList[index].isPlay = false;
							that.audio.stop();
							that.audio.src = '';
						})
					})
				} else {
					that.audio.stop();
					that.audio.src = '';
				}
			},
			//屏蔽作品
			shield(postId) {
				this.swiperList.forEach((item, index) => {
					if (item.post_id == postId) {
						this.swiperList.splice(index, 1)
					}
				})
			},
			//屏幕滚动轮播图
			trendsChange(e) {
				this.trendsIndex = e.detail.current;
				this.playAudio(this.swiperList[e.detail.current], e.detail.current);
			},
			//屏幕滚动轮播图结束
			trendsFinish(e) {
				if (this.swiperList.length > 3) {
					if (e.detail.current >= this.swiperList.length - 2) {
						if (this.swiperList[e.detail.current].isObserve == false) {
							this.getData("two")
						}
					}
					this.userBrowseLog(this.swiperList[e.detail.current].post_id)
					this.swiperList[e.detail.current].isObserve = true
				}
			},
			commentInputClick() {
				this.$refs.commentTwo.showCommentBar()
			},
			openTab(path) {
				uni.switchTab({
					url: path
				});
			},
			//打开更多
			openMore(item) {
				this.$refs.more.moreShow(item.post_id, item.user_id, true, item)
			},
			//动态已看上报
			userBrowseLog(post_id) {
				this.$api("post.userBrowseLog", {
					post_id: post_id
				}).then(res => {})
			},
			//打开话题
			openCate(id) {
				this.$u.route('/pages/user/topicspeed', {
					post_cate_id: id,
					type: 'index'
				})
			},
			//多图轮播
			imagesChange(e) {
				this.imagesCurrent = e.detail.current;
			},
			//多图轮播
			imagesTextChange(e) {
				this.imagesTextCurrent = e.detail.current;
			},
			//Tab切换
			changeTab(e) {
				this.audio.stop();
				switch (e.type) {
					case 'trends':
						uni.showLoading()
						this.swiperList = [];
						this.getData('one')
						break
					case 'topic':
						this.getPort()
						break
					case 'more':
						break
					default:
						break
				}
				this.currentType = e.type;
			},
			//更多评论
			moreComment(item) {
				console.log(item)
				this.$api("comment.listsMore", {
					page: 1,
					limit: 10,
					post_id: item.post_id,
					top_post_comment_id: item.id
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						item.oldCommentArr.push(...res.data)
					}
				})
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
			//获取评论
			getComment(postId) {
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
					}
				})
			},
			//获取话题
			async getPort() {
				let that = this
				that.$api('post_cate.lst', {
					page: 1,
					limit: 10
				}).then(res => {
					if (res.code === 1) {
						that.listPostRecommend = [...res.data];
						if (res.data.length != 0) {
							that.loadmore = 'loadmore'
						} else {
							that.loadmore = 'nomore'
						}
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
			commentBottom() {
				if (this.commentList.length != 0) {
					this.commentPage++;
					this.getCommentList(this.commentData.post_id)
				}
			},
			//audio暂停
			audioSuspend(item, index) {
				this.swiperList[index].isPlay = !this.swiperList[index].isPlay;
				if (this.swiperList[index].isPlay) {
					this.audio.play()
				} else {
					this.audio.pause()
				}
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
	.storyContainer {
		width: 100vw;
		height: 850rpx;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		background: #fff;
	}

	.tabBar {
		width: 100%;
		display: flex;
		align-items: center;
		background: rgba(255, 255, 255, 0.4);
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 10;
		backdrop-filter: blur(20px);

		.tabBarItem {
			flex: 1;
			display: flex;
			flex-direction: column;
			text-align: center;
			justify-content: center;
			align-items: center;

			.tabIcon {
				width: 23px;
				height: 23px;
			}

			.tabText {
				font-size: 20rpx;
				color: #333;
				margin-top: 6rpx;
			}
		}
	}


	.hedaBar {
		width: 100vw;
		height: calc(--status-bar-height + 88rpx);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		background: rgba(255, 254, 254, 0.4);
		padding-top: var(--status-bar-height);
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-bottom: 5rpx;
		backdrop-filter: blur(20px);
	}

	.mySwiper {
		width: 100vw;
		box-sizing: border-box;
		overflow: hidden;
		background: #000;
		position: relative;

		.swiperBox {
			width: 100vw;
			height: 100vh;
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
			margin-top: 88rpx;

			.textContentBox {
				width: 576rpx;
				height: 820rpx;
				text-align: center;
				font-size: 36rpx;
				font-weight: 500;
				line-height: 80rpx;
				margin-top: 111rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				overflow: hidden;
				color: #FFFFFF;
				text-shadow: rgab(0, 0, 0, 0.13) 5px 1px 0rpx;
				// -webkit-text-stroke: 1px #FFFFFF;
				// text-stroke: 1px #BABABA;
				// -webkit-background-clip: text;
				// -webkit-text-fill-color: #FFFFFF;
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

	//指示点
	.indicate {
		position: absolute;
		left: 0;
		bottom: 235rpx;
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2;

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

	.moreBox {
		padding-top: 100rpx;
		padding-left: 35rpx;
		padding-right: 35rpx;
		box-sizing: border-box;

		.moreItem {
			height: 162rpx;
			margin-bottom: 45rpx;
			padding-left: 35rpx;
			line-height: 162rpx;
			font-size: 36rpx;
			font-family: font-test !important;
			position: relative;
			background-position: 100% 100%;
			background-size: 100% 100%;
			background-repeat: no-repeat;

			&:nth-child(1) {
				color: #492615;
				background-image: url(https://yaji-1318192409.cos.ap-shanghai.myqcloud.com/yajiApp/mingrentang.png);
			}

			&:nth-child(2) {
				color: #524023;
				background-image: url(https://yaji-1318192409.cos.ap-shanghai.myqcloud.com/yajiApp/caihua.png);
			}

			&:nth-child(3) {
				color: #123329;
				background-image: url(https://yaji-1318192409.cos.ap-shanghai.myqcloud.com/yajiApp/jieyuan.png);
			}

			&:nth-child(4) {
				color: #524023;
				background-image: url(https://yaji-1318192409.cos.ap-shanghai.myqcloud.com/yajiApp/shefu.png);
			}

			&:nth-child(5) {
				color: #123329;
				background-image: url(https://yaji-1318192409.cos.ap-shanghai.myqcloud.com/yajiApp/duige.png);
			}
		}
	}

	.tips2 {
		background: linear-gradient(#FF9898, #FF0000);
		text-align: center;
		border-radius: 50rpx;
		position: absolute;
		top: 5rpx;
		right: 5rpx;
		width: 12rpx;
		height: 12rpx;
		text-align: center;
		line-height: 28rpx;
		font-size: 20rpx;
		color: #fff;
	}
</style>