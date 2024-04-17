<template>
	<view
		style="display: flex;flex-direction: column;background: #F7F7F7;height: 100vh;box-sizing: border-box;overflow: hidden;">
		<view class="hedaBar">
			<view style="display: flex;justify-content: space-between;width: 100%;align-items: center;">
				<u-tabs :list="tablist" :current="1" lineColor="#FFA000" lineWidth="36rpx" lineHeight="6rpx"
					itemStyle="height: 80rpx;" inactiveStyle="color: #666; fontSize:36rpx;"
					activeStyle="color: #FFA000;fontSize:36rpx;" @change="changeTab">
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
			<view style="margin-top: 30rpx;" v-if="currentType == 'trends'">
				<scroll-view scroll-x="true" style="white-space: nowrap;">
					<block v-for="(item,index) in topTab" :key="index">
						<view @click="topTabClick(item,index)"
							:style="{background:index==topTabIndex?'#FFA000':'#E4E4E4',color:index==topTabIndex?'#FFF':'#999999'}"
							style="padding: 0rpx 20rpx;height: 46rpx;color: #999;font-size: 28rpx;border-radius: 50rpx;line-height: 46rpx;text-align: center;margin-right: 30rpx;display: inline-block;">
							{{item.title}}
						</view>
					</block>
				</scroll-view>
			</view>
		</view>
		<view style="flex: 1;height: 0;box-sizing: border-box;">
			<!-- 关注 -->
			<view v-if="currentType == 'follow'" style="height: 100%;">
				<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="followBottom">
					<feiWaterfall :lists="followList" :from="'follow'" @waterfallClick="waterfallClick"></feiWaterfall>
					<view style="padding:20rpx 0rpx;font-size: 23rpx;color: #666;text-align: center;" v-if="isMoreFlag">
						没有更多了</view>
					<view v-if="!followList.length" style="text-align: center;margin-top: 50rpx;">
						<u-empty icon="/static/xingqiu.png" text="暂无动态" textColor="#a1a1a1" marginTop="100"></u-empty>
						<!-- <view style="text-align: center;color: #333;font-size: 30rpx;">当前分类还没有动态，</view>
						<view style="text-align: center;color: #333;font-size: 30rpx;">抢先发布可获得更多曝光哦</view>
						<view style="text-align: center;margin-top: 40rpx;">
							<image @click="$u.route('pages/post/add')" src="../../static/fabu3.png"
								style="width: 298rpx;height: 85rpx;" mode=""></image>
						</view> -->
					</view>
				</scroll-view>
			</view>
			<!-- 动态 -->
			<view v-if="currentType == 'trends'" style="height: 100%;">
				<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="trendsBottom">
					<feiWaterfall :lists="trendsLists" :from="'trends'" @waterfallClick="waterfallClick"></feiWaterfall>
					<view style="padding:20rpx 0rpx;font-size: 23rpx;color: #666;text-align: center;" v-if="isMoreFlag">
						没有更多了</view>
					<view v-if="!trendsLists.length" style="text-align: center;margin-top: 50rpx;">
						<u-empty icon="/static/xingqiu.png" text=" " textColor="#a1a1a1" marginTop="100"></u-empty>
						<view style="text-align: center;color: #333;font-size: 30rpx;">当前分类还没有动态，</view>
						<view style="text-align: center;color: #333;font-size: 30rpx;">抢先发布可获得更多曝光哦</view>
						<view style="text-align: center;margin-top: 40rpx;">
							<image @click="$u.route('pages/post/add')" src="../../static/fabu3.png"
								style="width: 298rpx;height: 85rpx;" mode=""></image>
						</view>
						<!-- <view @click="$u.route('pages/post/add')"
							style="margin-top:20rpx;text-align: center;font-size: 28rpx;color: #666;">去发布</view> -->
					</view>
				</scroll-view>
			</view>
			<!-- 话题 -->
			<view v-if="currentType == 'topic'" style="height: 100%;">
				<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="topicBottom">
					<view class="hotTopic">
						<image src="@/static/hothuati.png" style="width: 91rpx;height: 300rpx;" mode=""></image>
						<view class="hotTopicBox">
							<swiper style="height: 300rpx;width: 100%;" :indicator-dots="false" :autoplay="false"
								:interval="500" :duration="500" @change="hotTipicChange" :current="hotTopCurrentIndex">
								<block v-for="(item,index) in hotTopicLists" :key="index">
									<swiper-item style="height: 300rpx;width: 100%;">
										<view class="swiper-item"
											style="height: 300rpx;padding: 36rpx 20rpx 0rpx 20rpx;box-sizing: border-box;">
											<block v-for="(subItem,subIndex) in item" :key="subIndex">
												<view
													@click="$u.route('pages/user/topicspeed',{post_cate_id:subItem.id})"
													style="display: flex;align-items: center; justify-content: space-between;margin-bottom: 20rpx;">
													<view style="display: flex;align-items: center;">
														<image src="../../static/jing.png"
															style="width: 23rpx;height: 39rpx;margin-right: 5rpx;"
															mode="">
														</image>
														<view style="color: #333;font-size: 30rpx;">
															{{subItem.title}}
														</view>
													</view>
													<view style="display: flex;align-items: center;">
														<image src="@/static/hotIcon.png"
															style="width: 30rpx;height: 30rpx;margin-right: 5rpx;"
															mode="">
														</image>
														<view style="color: #666;font-size: 30rpx;">
															{{subItem.hot_num}}
														</view>
													</view>
												</view>
											</block>
										</view>
									</swiper-item>
								</block>
							</swiper>
						</view>
					</view>
					<view
						style="display: flex;align-items: center;justify-content: center;padding-bottom: 25rpx;background: #fff;">
						<view style="display: flex;align-items: center;">
							<block v-for="(item,index) in hotTopicLists" :key="index">
								<view @click="hotTopCurrentIndex = index" class="swiperLine"
									:style="{background:hotTopCurrentIndex == index?'#FFA000':''}">
								</view>
							</block>
						</view>
					</view>
					<view class="twoList">
						<view style="margin-top: 25rpx;background: #fff;padding: 25rpx 25rpx;box-sizing: border-box;"
							v-for="(item,index) in topicLists" :key="index"
							@click="$u.route('pages/user/topicspeed',{post_cate_id:item.post_cate_id})">
							<view style="display: flex;align-items: center;">
								<view
									style="height: 58rpx;padding: 0rpx 10rpx;box-sizing: border-box;border-radius: 50rpx;border: 1px solid #FFA000;background: #FFE6BD;color: #FE7000;font-size: 28rpx;display: inline-block;line-height: 58rpx;">
									<view style="display: flex;align-items: center;">
										<text>#{{item.title}}</text>
										<i class="iconfont icon-right"></i>
									</view>
								</view>
								<text style="margin-left: 35rpx;color:#FFBE52 ;font-size: 28rpx;"
									v-if="item.is_topping ==1">[置顶]</text>
							</view>
							<view style="padding-left: 50rpx;">
								<view style="display: flex;align-items: center;margin-top: 30rpx;">
									<image
										@click.stop="$u.route('/pages/user/home',{user_id:item.post.user_info.user_id})"
										:src="item.post.user_info.avatar"
										style="width: 66rpx;height: 66rpx;border-radius: 50%;" mode="aspectFill">
									</image>
									<view style="color: #333;font-size:30rpx;margin: 0rpx 15rpx;">
										{{item.post.user_info.name_str}}
									</view>
									<block v-if="item.post.user_info.gender==1">
										<i class="iconfont icon-nan1" style="font-size: 22rpx;color: #00C2FF;"></i>
									</block>
									<block v-else>
										<i class="iconfont icon-nv" style="font-size: 22rpx;color: #FFA000;"></i>
									</block>
									<image :src="item.post.user_info.mw_img"
										style="width:25rpx;height: 25rpx;margin-left: 15rpx;" mode="aspectFill">
									</image>
								</view>
								<view style="color: #333;font-size: 28rpx;margin-top: 25rpx;">
									<text>
										{{item.post.content}}
									</text>
									<image v-if="item.post.audio" src="@/static/erji.png" class="erji" mode=""></image>
								</view>
								<block v-if="item.post.image_list.length !=0">
									<view v-if="item.post.image_list.length==1"
										style="position: relative;margin-top: 20rpx;">
										<image class="archeryImg"
											style="width: 335rpx;border-radius:8rpx ;height: 328rpx;" mode="aspectFill"
											:src="item.post.image_list[0]"></image>
									</view>
									<view v-if="item.post.image_list.length>1"
										style="display: flex;align-items: center;">
										<view style="position: relative;margin-top: 20rpx;margin-right: 15rpx;">
											<image v-if="item.post.image_list.length>=3" src="../../static/imgMore.png"
												style="width: 52rpx;height: 40rpx;position: absolute;top: 16rpx;left: 16rpx;z-index: 5;"
												mode=""></image>
											<image class="archeryImg"
												style="width: 335rpx;height: 328rpx;border-radius:8rpx ;"
												mode="aspectFill" :src="item.post.image_list[0]"></image>
										</view>
										<view style="position: relative;margin-top: 20rpx;">
											<image class="archeryImg"
												style="width: 335rpx;height: 328rpx;border-radius:8rpx ;"
												mode="aspectFill" :src="item.post.image_list[1]"></image>
										</view>
									</view>
								</block>
							</view>
						</view>
						<view v-if="!topicLists.length" style="text-align: center;margin-top: 50rpx;">
							<u-empty icon="/static/xingqiu.png" text="暂无动态" textColor="#a1a1a1"
								marginTop="100"></u-empty>
							<!-- <view style="text-align: center;color: #333;font-size: 30rpx;">当前分类还没有动态，</view>
							<view style="text-align: center;color: #333;font-size: 30rpx;">抢先发布可获得更多曝光哦</view>
							<view style="text-align: center;margin-top: 40rpx;">
								<image @click="$u.route('pages/post/add')" src="../../static/fabu3.png"
									style="width: 298rpx;height: 85rpx;" mode=""></image>
							</view> -->
						</view>
						<view style="padding:20rpx 0rpx;font-size: 23rpx;color: #666;text-align: center;"
							v-if="isMoreFlag">没有更多了</view>
					</view>
				</scroll-view>
			</view>
			<!-- 更多 -->
			<view v-if="currentType == 'more'" style="height: 100%;">
				<scroll-view scroll-y="true" style="height: 100%;">
					<view class="moreBox">
						<view class="moreItem" @click="$u.route('pages/user/famousRole')">名人堂</view>
						<view class="moreItem" @click="$u.route('pages/talent/talent')">才华测试</view>
						<view class="moreItem" @click="$u.route('/pages/joy/poem')">诗词结缘</view>
						<view class="moreItem" @click="$u.route('pages/joy/archeryStart')">射覆</view>
						<view class="moreItem" @click="$u.route('pages/song/songStart')">桑田对歌</view>
					</view>
				</scroll-view>
			</view>
			<feiqslsHit></feiqslsHit>
			<pushAuthority></pushAuthority>
		</view>
	</view>
</template>
<script>
	import feiWaterfall from "@/components/fei-waterfall/fei-waterfall"
	import pushAuthority from "@/components/fei-pushAuthority/fei-pushAuthority"
	export default {
		name: 'square',
		components: {
			feiWaterfall,
			pushAuthority
		},
		data() {
			return {
				no_read_count: 0,
				currentType: "trends",
				tablist: [{
						name: '关注',
						type: 'follow',
						count: 0
					}, {
						name: '动态',
						type: 'trends',
						count: 0
					},
					{
						name: '话题',
						type: 'topic',
						count: 0
					},
				],
				topTab: [],
				topTabIndex: 0,
				topicLists: [],
				hotTopicLists: [],
				hotTopCurrentIndex: 0,
				page: 1,
				trendsLists: [],
				followList: [],
				tag_id: '',
				isMoreFlag: false,
			}
		},
		onLoad(option) {
			this.setFontFamily();
			this.getPostTag()
			this.getTrends()
		},
		onShow() {
			this.trendsMsg()
		},
		onHide() {

		},
		methods: {
			waterfallClick(e) {
				console.log(e)
				if (e.from == 'follow') {
					this.$u.route('/pages/post/detail', {
						post_id: e.item.post_id,
						from: 'follow'
					})
				} else if (e.from == 'trends') {
					this.$u.route('/pages/post/detail', {
						post_id: e.item.post_id,
						from: 'trends',
						tag_id: this.topTab[this.topTabIndex].tag_id
					})
				}
			},
			getPostTag() {
				this.$api("post.getPostTag").then(res => {
					if (res.code == 1) {
						this.topTab = res.data
					}
				})
			},
			//消息
			trendsMsg() {
				var that = this;
				that.$api('message.trendsMsg').then(res => {
					if (res.code === 1) {
						that.no_read_count = res.data.no_read_count;
					}
				})
			},
			// 热门话题滚动
			hotTipicChange(e) {
				this.hotTopCurrentIndex = e.detail.current
			},
			openTab(path) {
				uni.switchTab({
					url: path
				});
			},
			//Tab切换
			changeTab(e) {
				this.tabListType = e.type;
				this.page = 1;
				switch (e.type) {
					case 'follow':
						this.getFollow()
						this.followList = []
						break
					case 'trends':
						this.getTrends()
						this.trendsLists = [];
						break
					case 'topic':
						this.getHotTopIc()
						this.getTopIcList()
						this.topicLists = []
						break
					case 'more':
						break
					default:
						break
				}
				this.currentType = e.type;
			},
			//分类点击
			topTabClick(item, index) {
				this.topTabIndex = index;
				this.page = 1;
				this.trendsLists = [];
				this.tag_id = item.tag_id
				console.log(item)
				this.getTrends()
			},
			//关注
			getFollow() {
				this.$api("post_cate.getFollowUserPostList", {
					page: this.page,
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.followList = [...this.followList, ...res.data.list]
						if (this.page > 1) {
							if (res.data.list.length < 10) {
								this.isMoreFlag = true;
							} else {
								this.isMoreFlag = false;
							}
						}
					}
				})
			},
			//动态
			getTrends() {
				this.$api("post_cate.getPostByFall", {
					page: this.page,
					yaling_id: '',
					post_cate_id: '',
					tag_id: this.tag_id,
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.trendsLists = [...this.trendsLists, ...res.data.list]
						if (this.page > 1) {
							if (res.data.list.length < 0) {
								this.isMoreFlag = true;
							} else {
								this.isMoreFlag = false;
							}
						}
					}
				})
			},
			//热门话题
			getHotTopIc() {
				this.$api("post_cate.hot_list").then(res => {
					if (res.code == 1) {
						this.hotTopicLists = this.toSplit(res.data, 4)
					}
				})
			},
			toSplit(arrlist, size) {
				let index = 0;
				let setArr = [];
				while (index < arrlist.length) {
					setArr.push(arrlist.slice(index, index += size))
				}
				return setArr
			},
			//话题列表
			getTopIcList() {
				this.$api("post_cate.getTopicList", {
					page: this.page
				}).then(res => {
					if (res.code == 1) {
						this.topicLists = [...this.topicLists, ...res.data.list];
						if (this.page > 1) {
							if (res.data.list.length < 10) {
								this.isMoreFlag = true;
							} else {
								this.isMoreFlag = false;
							}
						}
					}
				})
			},
			followBottom() {
				this.page++;
				this.getFollow()
			},
			//动态滚动到底部
			trendsBottom() {
				this.page++;
				this.getTrends()
			},
			//话题滚动到底部
			topicBottom() {
				this.page++;
				this.getTopIcList()
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
	page {
		background: #F7F7F7;
		min-height: 100vh;
	}

	.swiperLine {
		width: 43rpx;
		height: 5rpx;
		border-radius: 36rpx;
		background: rgba(0, 0, 0, 0.3);
		margin-right: 6rpx;
	}

	.hotTopic {
		background: #fff;
		display: flex;
		align-items: center;
		padding: 25rpx;
		box-sizing: border-box;

		.hotTopicBox {
			background-image: url(/static/hothuatibg.png);
			background-position: 100% 100%;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			height: 300rpx;
			flex: 1;
			margin-left: 9rpx;
			box-sizing: border-box;
		}
	}


	// ---------
	.list {
		flex-direction: row;
		justify-content: space-between;
		box-sizing: border-box;
		display: flex;
		padding-top: 25rpx;
		padding: 25rpx 10rpx 10rpx 10rpx;
		box-sizing: border-box;

		.itemBox {
			flex: 1;
			flex-basis: 49%;
			box-sizing: border-box;
			overflow: hidden;


			.container {
				background: #fff;
				border-radius: 8rpx;
				padding: 12rpx;
				box-sizing: border-box;
				margin-bottom: 10rpx;
			}
		}
	}

	.erji {
		width: 35rpx;
		height: 35rpx;
	}

	// ------------
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
		box-sizing: border-box;
		background: rgba(255, 255, 255, 1);
		padding-top: var(--status-bar-height);
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-bottom: 30rpx;
		backdrop-filter: blur(20px);
	}

	.mySwiper {
		width: 100vw;
		box-sizing: border-box;
		overflow: hidden;
		background: #000;
		position: relative;
		height: 100vh;

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

	.moreBox {
		padding-top: 20rpx;
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
		width: 18rpx;
		height: 18rpx;
		text-align: center;
		line-height: 28rpx;
		font-size: 20rpx;
		color: #fff;
	}
</style>