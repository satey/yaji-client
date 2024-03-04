<template>
	<view class="chatRoom">
		<image src="@/static/fhlbg.png" v-if="roomType=='fhl'"
			style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;" mode="">
		</image>
		<image src="@/static/jlbg.png" v-if="roomType=='scjl'||roomType=='cyjl'"
			style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;" mode="">
		</image>
		<view class="roomBody">
			<view class="roomHead">
				<view class="headLeft">
					<i class="ri-arrow-left-s-line text-3xl" style="color: #333" @click="backReturn"></i>
					<view class="roomName">练习房</view>
				</view>
			</view>
			<view class="stageContainer">
				<view class="markContainer" v-if="taskBeginFlag">
					<view class="markBox">
						<view class="markStatus">
							<block v-if="stage_list[0].state ==1">
								<i class="iconfontcolor icon-shaloudaojishi" @click="currnetIndex=3"
									style="font-size: 23rpx;"></i>
								<text style="margin-left: 10rpx;">{{taskBeginTime}}s</text>
							</block>
							<block v-else>
								<text>未开始</text>
							</block>
						</view>
						<view class="markStatus">
							<block v-if="stage_list[1].state==1">
								<i class="iconfontcolor icon-shaloudaojishi" @click="currnetIndex=3"
									style="font-size: 23rpx;"></i>
								<text style="margin-left: 10rpx;">{{taskBeginTime}}s</text>
							</block>
							<block v-else>
								<text>未开始</text>
							</block>
						</view>
					</view>
					<view class="okNumsBox" style="display: flex;align-items: center;justify-content: space-between;">
						<view class="okNums" style="background: #FFA000;">
							<view style="width: 6rpx;height: 6rpx;background: #333;border-radius: 50%;"></view>
							<text>{{stage_list[0].count}}</text>
						</view>
						<view class="okNums" style="background: #8FFF00;">
							<view style="width: 6rpx;height: 6rpx;background: #333;border-radius: 50%;"></view>
							<text>{{stage_list[1].count}}</text>
						</view>
					</view>
				</view>
				<!-- 左边 -->
				<view class="stageBox" style="padding-left: 50rpx;">
					<view class="positionBox">
						<block v-if="stage_list[0]!=''">
							<image style="width: 125rpx;height: 170rpx" :src="stage_list[0].profile_url"
								mode="aspectFill">
							</image>
							<view class="userName">
								<text
									style="position: relative;z-index: 2;">{{stage_list[0].realname}}·{{stage_list[0].dynasty}}</text>
								<view class="line" v-if="stage_list[0].is_challenger==1"></view>
							</view>
							<view style="height: 32rpx;">
								<block v-if="taskBeginFlag==false">
									<!-- 	<view class="stageStatus" v-if="stage_list[0].is_ready==0">准备</view>
									<view class="stageStatus1" v-else>已准备</view> -->
								</block>
								<block v-else>
									<view class="stageStatus" v-if="stage_list[0].state ==1">思考中
									</view>
									<view class="stageStatus" v-else>等待中</view>
								</block>
							</view>
						</block>
						<block v-else>
							<image src="@/static/iconImage/zuo.png" style="width: 108rpx;height: 108rpx;" mode="">
							</image>
							<text class="empty">虚位以待</text>
						</block>
					</view>
				</view>
				<!-- 中间 -->
				<view class="stageCenter">
					<block v-if="taskBeginFlag==true">
						<view class="shanziBox">
							<image src="../../static/iconImage/shanzi.png" style="width: 215rpx;height: 215rpx;"
								mode="widthFix">
							</image>
							<text class="stageText">{{wordData.word}}</text>
						</view>
						<view class="stageCenterTextBox">
							<block v-if="taskTextList.direction!=''">
								<view class="stageCenterUserOne" v-if="taskTextList.direction=='left'">
									<view>{{taskTextList.content}}</view>
								</view>
								<view style="display: flex;justify-content: flex-end;" v-else>
									<view class="stageCenterUserTwo">
										<view>{{taskTextList.content}}</view>
									</view>
								</view>
							</block>
						</view>
					</block>
					<block v-else>
						<view class="shanziBox">
							<image src="../../static/iconImage/shanzi.png" style="width: 215rpx;height: 215rpx;"
								mode="widthFix">
							</image>
							<text class="stageText">?</text>
						</view>
					</block>
				</view>
				<!-- 右边 -->
				<view class="stageBox" style="padding-right: 50rpx;">
					<view class="positionBox">
						<block v-if="stage_list[1]!=''">
							<image style="width: 125rpx;height: 170rpx" :src="stage_list[1].profile_url"
								mode="aspectFill">
							</image>
							<view class="userName">
								<text
									style="position: relative;z-index: 2;">{{stage_list[1].realname}}·{{stage_list[1].dynasty}}</text>
								<view class="line" v-if="stage_list[1].is_challenger==1"></view>
							</view>
							<view style="height: 32rpx;">
								<block v-if="taskBeginFlag==false">
									<view class="stageStatus" v-if="stage_list[1].is_ready==0">准备</view>
									<view class="stageStatus2" v-else>已准备</view>
								</block>
								<block v-else>
									<view class="stageStatus" v-if="stage_list[1].state==1">思考中
									</view>
									<view class="stageStatus" v-else>等待中</view>
								</block>
							</view>
						</block>
						<block v-else>
							<image src="@/static/iconImage/zuo.png" style="width: 108rpx;height: 108rpx;" mode="">
							</image>
							<text class="empty">虚位以待</text>
						</block>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="roomFooter" style="display: flex;align-items: center;justify-content: space-between;">
			<view>
				<view @click="clickReady" v-if="taskBeginFlag==false"
					style="width: 446rpx;height: 70rpx;line-height: 70rpx;color: #fff;font-weight: bold;background: #FFA000;border-radius: 93rpx;text-align: center;font-size: 32rpx;">
					准备</view>
				<view v-else style="position: relative;">
					<view class="tishi" v-if="tishiFlag" style="position: absolute;top: -90rpx;">
						<view style="display: flex;align-items: center;">
							<block v-if="roomType=='fhl'">
								<view v-if="wordData.word!=''"
									style="color: #000000;font-size: 28rpx;height: 68rpx;line-height: 60rpx;">
									请发一句含【{{wordData.word}}】字的诗</view>
							</block>
							<block v-if="roomType=='cyjl'">
								<view style="color: #000000;font-size: 28rpx;height: 68rpx;line-height: 60rpx;">
									请先发一个成语</view>
							</block>
							<block v-if="roomType=='scjl'">
								<view style="color: #000000;font-size: 28rpx;height: 68rpx;line-height: 60rpx;">
									请先发任意一句古诗</view>
							</block>
							<i class="iconfontcolor icon-shouzhi" style="font-size: 41rpx;margin-left: 5rpx;"></i>
						</view>
					</view>
					<view class="bottomInput" @click="sendInput">
						<text style="color: #FFA000;white-space: nowrap;font-size: 28rpx;">发言：</text>
					</view>
				</view>
			</view>
			<view @click="clickpeopleShow"
				style="width: 216rpx;height: 70rpx;line-height: 70rpx;color: #FFA000;font-weight: bold;background: rgba(255,255,255,0.9);border-radius: 93rpx;text-align: center;font-size: 32rpx;">
				更换对手</view>
		</view>
		<!-- 选择诗词弹窗 -->
		<u-popup :show="wordShow" @close="wordShow = false" mode="center" :closeable="false" :round="20"
			:customStyle="{background:'transparent'}">
			<view class="tokenContainer">
				<view class="tokenTitle">
					<text class="text">选择令牌</text>
					<view class="replace" @click="changeWord">
						<text>换一批</text>
						<i class="iconfont icon-huanyipi" style="margin-left:10rpx;font-size: 22rpx;"></i>
					</view>
				</view>
				<view class="tokenTextList">
					<block v-for="(item,index) in orderList" :key="index">
						<view class="tokenTextItem" @click="selectWordClick(item,index)"
							:style="{background:selectWordIndex==index?'#FFA000':'',color:selectWordIndex==index?'#FFFFFF':''}">
							{{item.word}}
						</view>
					</block>
				</view>
				<view class="tokenBens">
					<view class="tokenBen" style="margin-right: 15rpx;" @click="wordShow=false;selectWordIndex=0">
						取消</view>
					<view class="tokenBen" style="margin-left: 15rpx;" @click="selectWordOk">确定</view>
				</view>
			</view>
		</u-popup>
		<!-- 结果弹框 -->
		<!-- 令牌 -->
		<u-popup :show="resultShow" @close="resultShow = false;" mode="center" :closeable="false" :round="20"
			:customStyle="{background:'transparent'}">
			<view class="tokenContainer">
				<block v-if="taskResult.length !=0">
					<view class="tokenTitle">
						<text class="text">比赛结束</text>
					</view>
					<view class="resultBox">
						<view class="resultText">胜</view>
						<view class="resultText">败</view>
					</view>
					<view class="PKBox">
						<view class="PKContent">
							{{taskResult.win.realname}}·{{taskResult.win.dynasty}}
						</view>
						<view class="pkText">PK</view>
						<view class="PKContent">
							{{taskResult.fail.realname}}·{{taskResult.fail.realname}}
						</view>
					</view>
					<view class="record">
						<view>
							<view style="display: flex;align-items: center;margin-bottom: 30rpx;">
								<image style="width: 16rpx;height: 16rpx;margin-right: 10rpx;"
									src="../../static/iconImage/dian.png" mode=""></image>
								<view>对答：{{taskResult.win.answer_count}}</view>
							</view>
							<view style="display: flex;align-items: center;margin-bottom: 30rpx;visibility: hidden;">
								<image style="width: 16rpx;height: 16rpx;margin-right: 10rpx;"
									src="../../static/iconImage/dian.png" mode=""></image>
								<view>名望：11</view>
							</view>
							<view style="display: flex;align-items: center;margin-bottom: 30rpx;visibility: hidden;">
								<image style="width: 16rpx;height: 16rpx;margin-right: 10rpx;"
									src="../../static/iconImage/dian.png" mode=""></image>
								<view>风雅度：11</view>
							</view>
						</view>
						<view>
							<view style="display: flex;align-items: center;margin-bottom: 30rpx;">
								<image style="width: 16rpx;height: 16rpx;margin-right: 10rpx;"
									src="../../static/iconImage/dian.png" mode=""></image>
								<view>对答：{{taskResult.fail.answer_count}}</view>
							</view>
							<view style="display: flex;align-items: center;margin-bottom: 30rpx;visibility: hidden;">
								<image style="width: 16rpx;height: 16rpx;margin-right: 10rpx;"
									src="../../static/iconImage/dian.png" mode=""></image>
								<view>名望：11</view>
							</view>
							<view style="display: flex;align-items: center;margin-bottom: 30rpx;visibility: hidden;">
								<image style="width: 16rpx;height: 16rpx;margin-right: 10rpx;"
									src="../../static/iconImage/dian.png" mode=""></image>
								<view>风雅度：11</view>
							</view>
						</view>
					</view>
					<view @click="resultShow = false;"
						style="width: 190rpx;height: 85rpx;text-align: center;line-height: 85rpx;color: #fff;border-radius: 50rpx;margin: 0 auto;margin-top: 60rpx;background: #FFA000;">
						确认</view>
				</block>
			</view>
		</u-popup>
		<!-- 输入框 -->
		<u-popup :show="showInput" @close="showInput = false" mode="bottom" :overlayOpacity="0" :closeable="false"
			:round="20" :customStyle="{background:'transparent'}">
			<view class="inputContainer">
				<view class="inputBox">
					<view class="textAreaBox">
						<textarea type="text" v-model="inputMessage" @blur="showInput=false;" auto-focus="true"
							confirm-type="send" auto-height="true" :adjust-position="false" class="myTextArea" />
					</view>
					<view class="inputBtn" @touchend.prevent="sendTextMessage">发送</view>
				</view>
				<view :style="{height:keyboardHeight+'px'}"></view>
			</view>
		</u-popup>
		<!-- 动画 -->
		<collision ref="collision">
			<template slot="left">
				<view style="display: flex;align-items: center;">
					<image :src="stage_list[0].profile_url" style="width: 125rpx;height: 170rpx;margin-bottom: 4rpx;"
						mode="aspectFill"></image>
					<view style="width: 132rpx;color: #000;font-size: 22rpx;margin-top: 30rpx;">
						{{stage_list[0].realname}}·{{stage_list[0].dynasty}}
					</view>
				</view>
			</template>
			<template slot="right">
				<view style="display: flex;align-items: center;justify-content: flex-end;">
					<text
						style="width: 132rpx;color: #000;font-size: 22rpx;text-align: left;margin-top:30rpx;">{{stage_list[1].realname}}·{{stage_list[1].dynasty}}</text>
					<image :src="stage_list[1].profile_url" style="width: 125rpx;height: 170rpx;margin-bottom: 4rpx;"
						mode="aspectFill"></image>
				</view>
			</template>
		</collision>
		<!-- 机器人 -->
		<u-popup :show="peopleShow" @close="peopleShow = false" mode="bottom" :overlayOpacity="0" :closeable="false"
			:round="20" :customStyle="{background:'transparent'}">
			<view class="peopleContainer">
				<view style="display: flex;align-items: center;width: 100%;justify-content: center;margin-top: 25rpx;">
					<view class="reputation">选择人物
					</view>
				</view>
				<scroll-view scroll-y="true" style="height: 0;flex: 1;box-sizing: border-box;margin-top: 23rpx;">
					<view v-for="(item,index) in partnerList" :key="index"
						style="padding: 0rpx 23rpx;box-sizing: border-box;" @click="clickProfile(item)">
						<view class="peopleItem">
							<image :src="item.profile_url" style="width: 95rpx;height: 95rpx;border-radius: 50%;"
								mode="aspectFill"></image>
							<view
								style="margin-left: 15rpx;flex: 1;display: flex;flex-direction: column;width: calc(100% - 95rpx);">
								<view style="font-size: 30rpx;color: #333;">{{item.realname}}·{{item.dynasty}}</view>
								<view style="font-size: 23rpx;color: #666;margin-top: 5rpx;">
									<block v-for="(item2,index2) in item.achievements" :key="index2">
										<text style="padding-right: 10rpx;">{{item2}}</text>
									</block>
								</view>
								<view
									style="font-size: 20rpx;color: #666;text-overflow: ellipsis;overflow: hidden;flex: 1;width: 100%;">
									<text style="white-space: nowrap;overflow: hidden;">{{item.content}}</text>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<u-empty v-if="!partnerList.length" icon="/static/iconImage/jilu.png" text="暂无" textColor="#a1a1a1"
					marginTop="100"></u-empty>
			</view>
		</u-popup>
		<!-- 上报 -->
		<u-popup :show="showReport" @close="showReport = false" mode="center" :closeable="false" :round="20"
			:customStyle="{background:'transparent'}">
			<view class="report">
				<view class="reportBgBox">
					<text>库中没有检测到对应诗句，请检查是否 有错别字，或一键上报，我们将持续完 善基础库。</text>
				</view>
				<view
					style="display: flex;align-items: center;padding: 0rpx 52rpx;box-sizing: border-box;justify-content: space-between;margin-top: 33rpx;">
					<view class="reportBtn" @click="showReport = false;inputMessage = '';">好吧</view>
					<view class="reportBtn" @click="reportClick">一键上报</view>
				</view>
			</view>
		</u-popup>
		<!-- 认输 -->
		<u-popup :show="showTransport" @close="showTransport = false" mode="center" :closeable="false" :round="20"
			:customStyle="{background:'transparent'}">
			<view class="report">
				<view class="reportBgBox"
					style="text-align: center;display: flex;align-items: center;justify-content: center;">
					<text>您确定要认输吗？</text>
				</view>
				<view
					style="display: flex;align-items: center;padding: 0rpx 52rpx;box-sizing: border-box;justify-content: space-between;margin-top: 33rpx;">
					<view class="reportBtn" @click="transport">确定</view>
					<view class="reportBtn" @click="showTransport = false">继续比赛</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import collision from "@/components/fei-collision/fei-collision.vue"
	export default {
		components: {
			collision,
		},
		data() {
			return {
				roomType: '',
				showInput: false,
				inputMessage: "",
				keyboardHeight: 0,
				stage_list: ["", ""],
				taskBeginFlag: false,
				wordPage: 1,
				wordShow: false,
				orderList: [],
				selectWordIndex: 0,
				userInfo: uni.getStorageSync("userInfo"),
				wordData: {
					id: '',
					word: ''
				},
				taskTextList: {
					direction: "",
					content: ""
				},
				taskBeginTime: 30,
				taskInterval: null,
				taskResult: [],
				resultShow: false,
				peopleShow: false,
				partnerList: [],
				showReport: false,
				showTransport: false,
				tishiFlag: false,
			}
		},
		onLoad(option) {
			var that = this;
			that.roomType = option.roomType;
			that.watchKeyboard();
			that.entryPracticeRoom()
			that.setFontFamily()
			that.getPartner()
		},
		methods: {
			backReturn() {
				if (this.taskBeginFlag == true) {
					this.showTransport = true;
				} else {
					this.$u.route({
						type: 'navigateBack',
						delta: 1
					})
				}
			},
			transport() {
				this.fail()
				this.$u.route({
					type: 'navigateBack',
					delta: 1
				})
			},
			//上报
			reportClick() {
				this.$api("practice.submitTaskContent", {
					content: this.inputMessage
				}).then(res => {
					this.showReport = false;
					uni.showToast({
						icon: "none",
						title: res.msg
					})
				})
			},
			clickpeopleShow() {
				if (this.taskBeginFlag == true) {
					uni.showToast({
						icon: "none",
						title: "练习进行中"
					})
				} else {
					this.peopleShow = true;
				}
			},
			clickProfile(item) {
				console.log(item)
				this.$api("practice.chooseRobot", {
					robot_id: item.robot_id
				}).then(res => {
					if (res.code == 1) {
						this.peopleShow = false;
						res.data.robot_info.user_id = item.robot_id;
						res.data.robot_info.state = 0;
						res.data.robot_info.count = 0;
						console.log(res.data.robot_info)
						this.stage_list[1] = res.data.robot_info;
						this.$forceUpdate()
					}
				})
			},
			//陪练
			getPartner() {
				this.$api("practice.getPartner").then((res) => {
					if (res.code == 1) {
						console.log(res)
						// res.data.robot_info.user_id = res.data.robot_id;
						// res.data.robot_info.state = 0;
						// res.data.robot_info.count = 0;
						// res.data.user_info.count = 0;
						// res.data.user_info.state = 0;
						this.partnerList = res.data;
					}
				})
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
			// 进入房间
			entryPracticeRoom() {
				console.log(this.roomType)
				this.$api("practice.entryPracticeRoom", {
					type: this.roomType
				}).then(res => {
					if (res.code == 1) {
						res.data.robot_info.user_id = res.data.robot_info.robot_id;
						res.data.robot_info.state = 0;
						res.data.robot_info.count = 0;
						res.data.user_info.count = 0;
						res.data.user_info.state = 0;
						this.stage_list[1] = res.data.robot_info;
						this.stage_list[0] = res.data.user_info;
					}
					this.$forceUpdate()
				})
			},
			//提交诗句
			sendTextMessage() {
				this.$api("practice.referee", {
					content: this.inputMessage
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.tishiFlag = false;
						clearInterval(this.taskInterval)
						this.taskBeginTime = 30;
						this.taskTextList = {
							direction: "left",
							content: this.inputMessage
						}
						this.stage_list.forEach((item, index) => {
							if (item.user_id == res.data.user_id) {
								item.state = 0;
								item.count++;
							} else {
								item.state = 1
							}
						})
						if (this.roomType != 'fhl') {
							this.wordData = {
								id: '-1',
								word: res.data.user_suffix
							}
						}
						this.answerTime()
						this.$forceUpdate()
						let timeout = setTimeout(() => {
							clearInterval(this.taskInterval)

							this.taskBeginTime = 30;
							this.taskTextList = {
								direction: "right",
								content: res.data.robot_answer
							}
							this.stage_list.forEach((item, index) => {
								if (item.user_id == Number(res.data.robot_id)) {
									item.state = 0;
									item.count++;
								} else {
									item.state = 1
								}
							})
							if (this.roomType != 'fhl') {
								if (res.data.robot_answer != null) {
									this.wordData = {
										id: '-1',
										word: res.data.robot_suffix
									}
								}
							}
							clearTimeout(timeout)
							clearInterval(this.taskInterval)
							this.taskBeginTime = 30;
							this.$nextTick(() => {
								if (res.data.robot_answer == null) {
									this.fail();
									clearTimeout(timeout)
									this.taskBeginTime = 30;
									return;
								}
								this.answerTime()
							})
						}, 2000)
						this.inputMessage = '';
					} else if (res.code == 2002) {
						this.showReport = true;
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					} else {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
					this.showInput = false;
				})
			},
			//预准备
			clickReady() {
				if (this.roomType != 'fhl') {
					this.ready()
				} else {
					this.getWord()
				}
			},
			sendInput() {
				this.inputMessage = '';
				this.stage_list.forEach((item, index) => {
					if (item.state == 1) {
						if (item.user_id == this.userInfo.id) {
							this.showInput = true;
						} else {
							uni.showToast({
								icon: "none",
								title: "暂时不能作答"
							})
						}
					}
				})
			},
			//准备
			ready() {
				this.$api("practice.ready", {
					key_word: this.roomType == 'fhl' ? this.orderList[this.selectWordIndex].word : ''
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.tishiFlag = true;
						this.selectWordIndex = 0;
						this.taskBeginFlag = true;
						this.$refs.collision.start()
						this.stage_list.forEach((item, index) => {
							if (item.user_id == this.userInfo.id) {
								item.state = 1;
							}
						})
						this.answerTime()
						if (this.roomType != 'fhl') {
							this.wordData = {
								id: '-1',
								word: '?'
							}
						}
					}
				})
			},
			//答题计时
			answerTime() {
				this.taskInterval = setInterval(() => {
					this.taskBeginTime = this.taskBeginTime - 1;
					if (this.taskBeginTime <= 0) {
						clearInterval(this.taskInterval)
						this.taskBeginTime = 30;
						console.log("失败")
						this.fail()
					}
				}, 1000)
			},
			//失败
			fail() {
				this.$api("practice.getResult").then(res => {
					if (res.code == 1) {
						console.log(res)
						this.showInput = false;
						this.taskResult = res.data;
						this.resultShow = true;
						this.taskBeginFlag = false;
						this.showTransport = false;
						this.showReport = false;
						this.taskTextList = {
							direction: "",
							content: ""
						};
						this.stage_list.forEach((item, index) => {
							item.count = 0;
						})
						this.wordData = {
							id: '',
							word: ''
						};
					}
				})
			},
			//确定诗词
			selectWordOk() {
				this.wordData = this.orderList[this.selectWordIndex];
				this.wordShow = false;
				this.ready()
			},
			//选择诗词
			selectWordClick(item, index) {
				this.selectWordIndex = index;
			},
			//获取诗词
			getWord() {
				this.$api("practice.getWordList", {
					page: this.wordPage
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.orderList = res.data.list;
						this.wordShow = true;
						if (this.wordPage >= res.data.page_data.total_page) {
							this.wordPage = 0;
						}
					}
				})
			},
			//诗词换一批
			changeWord() {
				this.wordPage++;
				this.getWord()
			},
			//监听键盘
			watchKeyboard() {
				var that = this;
				uni.onKeyboardHeightChange(res => {
					that.keyboardHeight = res.height;
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.peopleContainer {
		width: 100vw;
		height: 758rpx;
		border-radius: 40rpx 40rpx 0rpx 0rpx;
		background: #fff;
		display: flex;
		flex-direction: column;

		.peopleItem {
			background-image: url(/static/itemBgImg.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-position: 100% 100%;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 20rpx;
			margin-bottom: 25rpx;
		}

		.reputation {
			font-size: 35rpx;
			color: #333333;
			position: relative;
			z-index: 11;
			text-align: center;
			font-family: font-test !important;

			&::after {
				content: " ";
				width: 100%;
				background: #8FFF00;
				height: 16rpx;
				position: absolute;
				left: 0;
				bottom: 0%;
				transform: translateY(-10%);
				z-index: -1;
			}
		}
	}

	.chatRoom {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		background: #000;
		position: relative;
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		overflow: hidden;

		.roomBody {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			padding: var(--status-bar-height) 30rpx 30rpx 30rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
		}
	}

	.roomHead {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 30rpx;

		.headLeft {
			display: flex;
			align-items: center;

			.roomName {
				padding: 0rpx 45rpx;
				height: 62rpx;
				text-align: center;
				line-height: 65rpx;
				border-radius: 50rpx;
				background: rgba(255, 255, 255, 0.7);
				color: #333;
				font-size: 26rpx;
				margin-left: 20rpx;
			}

		}

	}

	.stageContainer {
		height: 360rpx;
		margin-top: 1.3rem;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		opacity: 1;
		border: 1rpx solid;
		border-image: linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)) 1 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0rpx 16rpx 0rpx 16rpx;
		box-sizing: border-box;
		position: relative;
	}

	.stageCenter {
		flex: 1;
		position: relative;

		.shanziBox {
			position: relative;
			text-align: center;
			position: absolute;
			top: -35%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.stageCenterTextBox {
			height: 210rpx;
			display: flex;
			flex-direction: column;
			padding: 0rpx 10rpx;
			box-sizing: border-box;

			.stageCenterUserOne {
				padding: 5rpx 22rpx;
				box-sizing: border-box;
				width: 100%;
				font-size: 32rpx;
				color: #FFA000;
				font-family: font-test !important;
				border-radius: 2rpx 20rpx 20rpx 20rpx;
				border: 1rpx solid #FFA000;
				background: #FFF7E9;
				text-align: left;
				margin-top: 40rpx;
			}

			.stageCenterUserTwo {
				padding: 5rpx 22rpx;
				box-sizing: border-box;
				width: 100%;
				font-size: 32rpx;
				color: #FFA000;
				font-family: font-test !important;
				border-radius: 20rpx 2rpx 20rpx 20rpx;
				border: 1rpx solid #FFA000;
				background: #FFF7E9;
				text-align: left;
				margin-top: 32rpx;
			}
		}
	}

	.stageBox {
		display: flex;
		align-items: center;
		margin-top: 25rpx;

		.positionNumBox {
			width: 36rpx;
			height: 95rpx;
			background: #fff;
			border-radius: 50rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: #333;
			font-size: 28rpx;
		}

		.positionBox {
			width: 125rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.empty {
				padding: 6rpx 8rpx;
				background: #fff;
				box-sizing: border-box;
				font-size: 23rpx;
				color: #666;
				border-radius: 50rpx;
				margin-top: 20rpx;
			}

			.userName {
				height: 50rpx;
				font-size: 22rpx;
				color: #333;
				width: 135rpx;
				text-align: center;
				margin-top: 10rpx;
				position: relative;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				display: flex;
				align-items: center;
				justify-content: center;


				.line {
					height: 21rpx;
					width: 100%;
					background: #FFA000;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
					z-index: 0;
				}
			}
		}
	}

	.stageText {
		font-family: font-test !important;
		font-size: 60rpx;
		color: #fff;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-70%);
		text-align: center;
		z-index: 5;
		width: 100%;
	}

	.roomFooter {
		width: 100vw;
		padding: 0rpx 30rpx 36rpx 30rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
	}

	.bottomInput {
		width: 446rpx;
		margin-right: 20rpx;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 50rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 30rpx;
		box-sizing: border-box;
		height: 70rpx;
	}

	.stageStatus {
		width: 96rpx;
		color: #666;
		font-size: 26rpx;
		border-radius: 50rpx;
		background: #fff;
		text-align: center;
		padding: 6rpx 0rpx;
		margin-top: 15rpx;
	}

	.stageStatus2 {
		width: 96rpx;
		color: #333;
		font-size: 26rpx;
		border-radius: 50rpx;
		background: #FFDDA4;
		text-align: center;
		padding: 3rpx 0rpx;
		margin-top: 15rpx;
		border: 1px solid #FFA000;
	}

	.tokenContainer {
		width: 682rpx;
		height: 1030rpx;
		background-image: url(@/static/iconImage/dunpai.png);
		background-position: 100% 100%;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		box-sizing: border-box;
		padding: 140rpx 40rpx 0rpx 40rpx;

		.tokenTitle {
			width: 316rpx;
			height: 15rpx;
			background-image: url(@/static/iconImage/jiantou.png);
			background-position: 100% 100%;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 auto;
			position: relative;

			.text {
				font-size: 36rpx;
				color: #FFA000;
				font-family: font-test !important;
			}

			.replace {
				padding: 8rpx;
				box-sizing: border-box;
				text-align: center;
				border: 1px solid #FFA000;
				background: #FFDCA1;
				border-radius: 50rpx;
				color: #333333;
				font-size: 22rpx;
				display: flex;
				align-items: center;
				position: absolute;
				right: -40%;
				top: -15rpx;
			}
		}

		.tokenTextList {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			justify-content: center;
			align-self: center;
			margin-top: 70rpx;
			width: 100%;

			.tokenTextItem {
				width: 150rpx;
				height: 85rpx;
				background: #FFDDA4;
				border-radius: 5rpx;
				opacity: 1;
				border: 1rpx solid #FFA000;
				text-align: center;
				line-height: 85rpx;
				font-size: 46rpx;
				color: #FFA000;
				margin: 20rpx;
				font-family: font-test !important;
			}
		}

		.tokenBens {
			margin-top: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0rpx 50rpx;

			.tokenBen {
				width: 190rpx;
				height: 85rpx;
				text-align: center;
				border: 1rpx solid #FFA000;
				text-align: center;
				line-height: 85rpx;
				font-size: 36rpx;
				color: #FFA000;
				border-radius: 50rpx;
				background: #FFDDA4;
			}
		}

		.resultBox {
			padding: 79rpx 150rpx 105rpx 150rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;

			.resultText {
				font-size: 56rpx;
				font-weight: 400;
				color: #FFA000;
				font-family: font-test !important;
			}
		}

		.PKBox {
			display: flex;
			align-items: center;
			justify-content: center;

			.PKContent {
				background-position: 100% 100%;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				width: 239rpx;
				height: 58rpx;
				padding: 0 30rpx;
				line-height: 58rpx;
				box-sizing: border-box;
				text-align: center;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;

				&:nth-child(1) {
					background-image: url(@/static/iconImage/leftBg.png);
				}

				&:last-child {
					background-image: url(@/static/iconImage/rightBg.png);
				}
			}

			.pkText {
				color: #FFA000;
				font-size: 60rpx;
				margin: 0rpx 10rpx;
				font-family: font-test !important;
			}
		}

		.record {
			margin-top: 110rpx;
			display: flex;
			align-items: center;
			padding: 0rpx 30rpx;
			justify-content: space-between;
			font-size: 23rpx;
			color: #333;
			font-weight: bold;
		}
	}

	.inputContainer {
		position: absolute;
		left: 0;
		bottom: 0;
		background: #F2F2F2;
		z-index: 20;
		border-radius: 20rpx 20rpx 0rpx 0rpx;

		.inputBox {
			width: 100vw;
			padding: 21rpx 15rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.textAreaBox {
				background: #fff;
				border-radius: 50rpx;
				min-height: 70rpx;
				max-height: 200rpx;
				padding: 15rpx 30rpx;
				box-sizing: border-box;
				overflow: hidden;
				display: flex;
				margin-right: 20rpx;
			}

			.myTextArea {
				flex: 1;
			}

			.inputBtn {
				background: #FFA000;
				border-radius: 50rpx;
				text-align: center;
				line-height: 62rpx;
				width: 125rpx;
				height: 62rpx;
				color: #fff;
				font-size: 30rpx;
			}
		}
	}

	.markContainer {
		position: absolute;
		top: 10rpx;
		left: 16rpx;
		right: 16rpx;

		.okNums {
			width: 40rpx;
			height: 10rpx;
			margin-top: 19rpx;
			font-size: 22rpx;
			color: #333;
			align-items: center;
			display: flex;
			padding: 0rpx 5rpx;
			box-sizing: border-box;
			justify-content: space-between;
		}

		.markBox {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.markStatus {
			width: 89rpx;
			height: 43rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: rgba(255, 255, 255, 0.2);
			border-radius: 20rpx;
			font-size: 23rpx;
			color: #FF9429;
			font-weight: 500;
		}
	}

	.reportBgBox {
		width: 526rpx;
		height: 315rpx;
		background-image: url(@/static/iconImage/bgimg.png);
		background-position: 100% 100%;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		padding: 95rpx 30rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		color: #FFA000;
		line-height: 40rpx;
	}

	.reportBtn {
		width: 190rpx;
		height: 85rpx;
		background: #FFDDA4;
		border-radius: 48px 48px 48px 48px;
		opacity: 1;
		border: 1px solid #FFA000;
		line-height: 85rpx;
		text-align: center;
		font-size: 36rpx;
		font-weight: bold;
		color: #FFA000;
	}

	.tishi {
		height: 86rpx;
		min-width: 260rpx;
		background-image: url(@/static/iconImage/tishi.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: 100% 100%;
		margin-bottom: 15rpx;
		display: inline-flex;
		padding: 0rpx 10rpx;
	}
</style>