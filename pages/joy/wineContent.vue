<template>
	<view class="wineContent">
		<u-navbar title="诗词结缘" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
			<view slot="right">
				<i class="ri-menu-line" style="color: #333 !important;font-size: 30rpx;"
					@click="$u.route('pages/joy/wineList')"></i>
			</view>
		</u-navbar>
		<!-- 关注弹窗 -->
		<view v-if="followModule">
			<u-modal :show="followModule" :showConfirmButton="true" :showCancelButton="true" confirmColor="#FE4373"
				confirmText="确定" cancelText="取消" @cancel="followModule=false" @confirm='unfollow'>
				<view style="display: flex;flex-direction: column;">
					<view style="text-align: center;font-size: 32rpx;color: #323232;font-weight: bold;">提示</view>
					<view style="color:#999;font-size: 26rpx;margin-top: 30rpx;">
						<text>是否取消关注？</text>
					</view>
				</view>
			</u-modal>
		</view>

		<view class="content">
			<view class="headTop">
				<view class="contentTop">
					<view style="font-size: 32rpx;color: #323232;">今日诗情：</view>
					<view style="font-size: 24rpx;color: #3D3D3D;opacity: 0.7;">
						<view>{{ $u.timeFormat(detailsData.createtime, 'yyyy年mm月dd日')}}</view>
						<view>{{lunar.gzYear}} {{lunar.Animal}}</view>
						<view>{{lunar.gzMonth}}月 {{lunar.gzDay}}日</view>
					</view>
				</view>
				<view class="contentCenter">
					<view class="centerText">{{detailsData.word}}</view>
					<view class="centerSubText">{{detailsData.poetry}}</view>
				</view>
				<!-- <view style="display: flex;align-items: flex-end;flex-wrap: wrap;margin-top: 30rpx;"
					v-if="zanCount != 0">
					<view style="display: flex;align-items: center;margin-top: 10rpx;" v-for="(item,index) in zanArr"
						:key="index">
						<image :src="item.avatar" style="width: 45rpx;height: 45rpx;border-radius: 50%;" mode="">
						</image>
						<view style="font-size: 28rpx;color: #323232;margin:0rpx 5rpx;">{{item.role_realname}}</view>
					</view>
					<text style="font-size: 28rpx;color: #323232;height: 45rpx;line-height: 45rpx;">等<text
							style="color: #fe4373;">{{zanCount}}</text>人点赞</text>
				</view> -->
			</view>
			<view class="footerBottom">
				<view style="display: flex;align-items: center;justify-content: space-between;width: 100%;">
					<view style="margin: 30rpx 0rpx 30rpx 30rpx;font-size: 32rpx;color: #323232;">今日诗缘：</view>
					<view class="okBtn1" @click="openball">再发一次</view>
				</view>
				<view class="userList">
					<view class="userItem" v-for="(item,index) in datailLists">
						<image class="block rounded-full" :src="item.avatar" mode="aspectFill"
							style="width: 85rpx;height: 85rpx;">
						</image>
						<view class="flex-1" style="margin-left: 20rpx;padding-bottom: 20rpx;">
							<view style="display: flex;align-items: center; justify-content: space-between;">
								<view>
									<view class="leading-none mt-2">
										<text
											style="color: #323232;font-size: 28rpx;">{{item.realname}}·{{item.dynasty}}</text>
										<text
											style=" display: inline-block; width: 40rpx; text-align: center; margin-right: 20rpx; height: 40rpx; border-radius: 50%;margin-left: 30rpx; line-height: 40rpx; background-color: cornsilk; color: rgb(255, 180, 31);">望</text>
										<text style="color: rgb(255, 180, 31);">{{item.total_mw}}</text>
									</view>
									<view style="font-size: 24rpx;color: #999999;margin-top: 5rpx;">
										{{item.achievements}}
									</view>
								</view>
								<view style="display: flex;align-items: center;">
									<view v-show="item.is_follow == 0" class="follow" @click="interest(item,1,index)">关注
									</view>
									<view class="followActive" v-show="item.is_follow == 1"
										@click="interest(item,2,index)">
										已关注</view>
									<view class="ri-alert-line"
										style="font-size: 35rpx;margin-left: 20rpx;color: #999;opacity: 0.8;"
										@click="$u.route('/pages/public/report',{user_id:item.user_id,type:'诗词',selectId:item.id})">
									</view>
								</view>
							</view>
							<view class="mt-4" style="color: #323232;font-size: 26rpx;">
								<text>{{item.poetry}}</text>
							</view>
							<view
								style="display: flex;flex-direction: row;align-items: center;justify-content: flex-end;width: 100%;margin-right: -50rpx;">
								<!-- 点赞 -->
								<view style="display: flex;flex-direction: row;align-items: center;"
									@click="handlePostDig(item,index)">
									<text v-if="item.is_zan == 1" class="ri-heart-fill"
										style="font-size: 40rpx;margin-right: 10rpx;color: #fe4373;"></text>
									<text v-show='item.is_zan==0' class="ri-heart-line"
										style="font-size: 40rpx;margin-right: 10rpx;color: #999999;"></text>
									<text
										style="font-size: 24rpx;color: #999999;white-space: nowrap;width: 100rpx;">{{item.is_zan==0?'出彩':item.is_zan}}</text>
								</view>
								<!-- 聊天 -->
								<view style="color: #999999;display: flex;flex-direction: row;align-items: center;"
									@click="openSingle(item)">
									<text class="ri-chat-smile-2-line"
										style="font-size: 40rpx;margin-right: 10rpx;"></text>
								</view>
							</view>
						</view>
					</view>
					<u-empty v-if="!datailLists.length" text=" " icon="/static/empty2.png" textColor="#a1a1a1"
						marginTop="50"></u-empty>
					<view v-if="!datailLists.length"
						style="font-size: 25rpx;color:  #3D3D3D;opacity: 0.7;text-align: center;">
						<text v-html="loadmoreText"></text>
					</view>
				</view>
			</view>
		</view>
		<topPrompt></topPrompt>
	</view>
</template>

<script>
	import Calendar from '@/common/utils/util.js';
	export default {
		name: "wineContent",
		data() {
			return {
				detailsData: [],
				lunar: [],
				parentData: [],
				datailLists: [],
				followModule: false,
				user_id: "",
				page: 1,
				guanzhuIndex: "",
				loadmoreText: "加载更多",
				zanArr: [],
				zanCount: 0,
				data: [],
				isBtn: true,
			}
		},
		onLoad(e) {
			if (e.data == undefined) {
				this.getDetails("");
			} else {
				var data = JSON.parse(e.data);
				this.getDetails(data.id);
			}
			this.setFontFamily();
		},
		onReachBottom() {
			var that = this;
			that.page++;
			that.getLists(that.data);
		},
		methods: {
			//设置字体
			setFontFamily() {
				// #ifdef APP-PLUS
				uni.loadFontFace({
					family: 'font-test',
					// 本地字体路径需转换为平台绝对路径
					source: `url(${plus.io.convertLocalFileSystemURL('_www/static/fzz.ttf')})`,
					success() {
						console.log('success')
					},
					fail(e) {
						console.log('fail')
					}
				})
				// #endif
			},
			//返回泡泡页面
			openball() {
				var that = this;
				uni.redirectTo({
					url: '/pages/joy/wine'
				});
			},
			//取消关注
			unfollow() {
				var that = this;
				that.$api('user_follow.follow', {
					user_id: that.user_id
				}).then(res => {
					if (res.code === 1) {
						that.datailLists[parseInt(that.guanzhuIndex)].is_follow = 0;
						that.followModule = false;
						that.user_id = "";
						that.guanzhuIndex = "";
					} else {
						console.log('25');
					}
				})
			},
			//关注
			interest(item, type, index) {
				var that = this;
				that.guanzhuIndex = index;
				if (type == 1) {
					that.$api("user_follow.follow", {
						user_id: item.user_id
					}).then(res => {
						that.datailLists[index].is_follow = 1;
					})
				} else {
					that.user_id = item.user_id
					that.followModule = true;
				}
			},
			//点赞
			handlePostDig(item, index) {
				let that = this;
				that.$api('poetry.zan', {
					id: item.id,
				}).then(res => {
					if (res.code == 1) {
						if (res.msg == '点赞成功') {
							that.datailLists[index].is_zan = 1
						} else {
							that.datailLists[index].is_zan = 0
						}
					}
				})
			},
			//打开聊天框
			openSingle(item) {
				var that = this;
				uni.setStorageSync("poetryItem", item);
				that.$u.route(`/pages/chat/single?user_id=${item.user_id}`);
			},
			//详情
			getDetails(id) {
				var that = this;
				that.$api("poetry.details", {
					id: id
				}).then((res) => {
					console.log(res)
					if (res.code == 1) {
						that.data = res.data;
						that.detailsData = res.data.poetry_data;
						that.zanArr = res.data.zan_user_data;
						that.zanCount = res.data.zan_user_count;
						var date = new Date(res.data.poetry_data.createtime * 1000);
						var calendar = new Calendar();
						calendar.setDate(date)
						that.lunar = calendar.getInfo(date).lunar;
						that.getLists(res.data);
						if (id != "") {
							that.data.my_poetry_count = 5;
						}
					}
				})
			},
			//列表
			getLists(data) {
				var that = this;
				that.$api("poetry.lists", {
					poetry_word_id: data.poetry_data.poetry_word_id,
					page: that.page,
					limit: 10,
					createtime: data.poetry_data.createtime
				}).then((res) => {
					if (res.code == 1) {
						that.datailLists.push(...res.data);
					} else {
						that.loadmoreText = res.msg
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.follow {
		width: 100rpx;
		height: 42rpx;
		background: #FE4373;
		font-size: 24rpx;
		color: #fff;
		border-radius: 30rpx;
		text-align: center;
		line-height: 42rpx;
	}

	.followActive {
		width: 100rpx;
		height: 42rpx;
		background: #999;
		font-size: 24rpx;
		color: #fff;
		border-radius: 30rpx;
		text-align: center;
		line-height: 42rpx;
	}

	.userList {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.scrollView {
		flex: 1;
		height: 0 !important;
		box-sizing: border-box;
		padding: 0rpx 30rpx 30rpx 30rpx;
	}

	.userItem {
		display: flex;
		padding: 30rpx;
		box-sizing: border-box;
	}

	page {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}

	.wineContent {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.contentTop {
		display: flex;
		justify-content: space-between;
	}

	.contentCenter {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}

	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.headTop {
		padding: 30rpx;
		box-sizing: border-box;
	}

	.footerBottom {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.centerText {
		font-size: 180rpx;
		color: #323232;
		font-family: font-test;
	}

	.centerSubText {
		padding-top: 50rpx;
		font-size: 44rpx;
		color: #3D3D3D;
		font-family: font-test;
		text-align: center;
	}

	.okBtn {
		background: #FE4373;
		border-radius: 43px;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		color: #fff;
		width: 300rpx;
		margin: 45rpx auto;
	}

	.okBtn1 {
		background: #FE4373;
		border-radius: 43px;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		color: #fff;
		width: 200rpx;
		margin-right: 30rpx;
		font-size: 25rpx;
	}
</style>