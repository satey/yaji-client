<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="">
        <u-navbar title="动态" :safeAreaInsetTop="true" :placeholder="true">
            <view slot="left">
                <i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
            </view>
            <view slot="right">
                <!-- <i class="ri-question-fill text-3xl bg-gradient-to-b from-red-400 to-red-200 bg-clip-text text-transparent"></i> -->
            </view>
        </u-navbar>
        <view class="px-4">
            <view class="flex mt-6">
                <view class="mr-4" @click="$u.route('/pages/user/home', { user_id: post.user_id })">
                    <image class="block w-14 h-14 rounded-full" :src="post.user.avatar || '/static/avatar.png'"></image>
                </view>
                <view class="flex-1">
                    <view class="text-base leading-none mt-2">{{ post.user.role_realname + ' · ' + post.user.role_dynasty || '无名氏' }}</view>
                    <view class="flex mt-4">
                        <view class="text-xs leading-none text-gray-500 mr-2" v-for="(tag, index) in post.user.tags" :key="index" :item="tag">{{ tag }}</view>
                    </view>
                </view>
                <view class="" @click="showAction = true">
                    <i class="ri-more-2-fill text-xl bg-gradient-to-b from-gray-500 to-gray-400 bg-clip-text text-transparent"></i>
                </view>
            </view>
            <view class="mt-4" @click="addComment(post)">{{ post.content }}</view>
            <view v-if="post.images" class="mt-4">
                <u-album :urls="post.images.split(',')" multipleSize="150" rowCount="3"></u-album>
            </view>
            <view class="flex mt-4">
                <view class="flex items-center rounded-full mr-2" v-for="(tag, index) in post.tags" :key="index" :post="tag">
                    <i class="ri-hashtag text-gray-500"></i>
                    <view class="text-gray-500">{{ tag }}</view>
                </view>
            </view>
            <view class="flex mt-4">
                <view class="flex-1 flex items-center">
                    <text class="text-xs leading-none text-gray-400">{{ $u.timeFrom(post.createtime, 'mm月dd日') }}</text>
                </view>
                <view class="flex items-center" @click="handlePostDig()">
                    <i class="ri-heart-3-fill text-xl bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
                    <text class="text-gray-500 ml-2">{{ post.diggnums }}</text>
                </view>
                <view class="flex items-center ml-4">
                    <i class="ri-message-3-fill text-xl bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
                    <text class="text-gray-500 ml-2">{{ post.commentnums }}</text>
                </view>
            </view>

            <view class=" text-gray-500 mt-6">所有评论 ({{ paginator.total }})</view>
            <view v-for="(item, index) in listPostComment" :key="index" :item="item" class="flex mt-6">
                <view class="mr-4">
                    <u-avatar size="72" :src="item.user.avatar || '/static/avatar.png'" @click="$u.route('/pages/user/home', { user_id: item.user_id })"></u-avatar>
                </view>
                <view class="flex-1">
                    <view class="text-base leading-none mt-1">{{ item.user.role_realname + ' · ' + item.user.role_dynasty || '无名氏' }}</view>
                    <view class="mt-4">{{ item.content }}</view>
                    <view class="mt-2">
                        <text class="text-xs leading-none text-gray-400">{{ $u.timeFrom(item.createtime, 'mm月dd日') }}</text>
                        <text class="text-xs text-gray-400 ml-4" @click="addComment(item)">回复</text>
                    </view>
                </view>
                <view class="ml-4 flex items-center">
                    <i class="ri-heart-3-fill text-xl bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
                    <text class="text-gray-500 ml-2">{{ item.diggnums }}</text>
                </view>
            </view>
            <u-loadmore v-if="listPostComment.length" :status="loadmore" nomoreText="" color="#a1a1a1" marginTop="20" />
            <u-empty v-if="!listPostComment.length" icon="/static/empty.png" text="暂无评论" textColor="#a1a1a1" marginTop="100"></u-empty>
            <view style="height: 220rpx;"></view>
        </view>

		<view class="fixed bottom-0 left-0 right-0 !border-t border-0 border-solid border-gray-100 bg-white">
            <view class="flex p-4">
                <view class="flex items-center" @click="showEmoji = !showEmoji">
                    <i class="ri-emotion-fill text-4xl text-gray-500"></i>
                </view>
                <view class="flex-1 flex">
                    <u-textarea v-model="message" :focus="inputFocus" :autoHeight="true" :placeholder="placeholder" type="text" maxlength="50"></u-textarea>
                </view>
                <view class="flex items-center">
                    <view class="p-3 rounded-full text-sm leading-none text-white bg-gradient-to-r from-rose-400 to-rose-500" @click="doComment()">发送</view>
                </view>
            </view>
            <!-- 表情 -->
            <view class="grid grid-cols-12 gap-2 bg-gray-100 p-4 h-60 overflow-y-scroll" v-if="showEmoji">
                <view class="flex" v-for="(item, index) in emojiList" :key="index" :item="item" @click="handleEmojiSend(item)">
                    <text class="text-xl leading-none">{{ item }}</text>
                </view>
            </view>
        </view>
        
        <u-popup :show="showAction" @close="showAction = false" :closeable="true" :round="30">
            <view class="p-4">
                <view class="text-2xl text-center">操作</view>
                <view class="grid grid-cols-5 gap-4 mt-6">
                    <view class="text-center" @click="showFeedback = true, showAction = false">
                        <i class="ri-alarm-warning-fill block text-3xl leading-none text-gray-500"></i>
                        <view class="text-sm mt-2">举报</view>
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
                        <text class="text-sm">{{ item }}</text>
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

        <uc-auth></uc-auth>
    </view>
</template>
<script>
export default {
    name: 'detail',
    components: {
    },
    data() {
        return {
            post: {
                user: {}
            },
            listPostComment: [],
            params: {
                type: 'all',
                page: 1,
            },
            paginator: {
                total: 0,
                last_page: 0,
            },
            loadmore: false,
            inputFocus: false,
            placeholder: '发表评论',
            showEmoji: false,
            emojiList: [],
            message: '',
            post_id: null,
            post_comment_id: null,
            showAction: false,
            showFeedback: false,
            feedback: '',
            feedbackType: '',
            ListFeedbackType: ['色情低俗','政治敏感','造谣传谣','广告欺诈','侵犯权益','其他'],
        }
    },
	created() {
        let that = this
        that.getEmojiList()
	},
    onLoad(option) {
        let that = this
        that.getPostDetail()
        that.getPostComment()
    },
    methods: {
        getPostDetail() {
            let that = this
            that.$api('post.detail', { post_id: that.$Route.query.post_id }).then(res => {
                if (res.code === 1) {
                    that.post = res.data
                }
            })
        },
        async getPostComment() {
            let that = this
            that.loadmore = 'loading'
            that.$api('comment.lists', { post_id: that.$Route.query.post_id }).then(res => {
                if (res.code === 1) {
                    that.paginator.total = res.data.total
                    that.paginator.last_page = res.data.last_page
                    that.listPostComment = [...that.listPostComment, ...res.data.data]
                    if (that.params.page < res.data.last_page) {
                        that.loadmore = 'loadmore'
                    } else
                        that.loadmore = 'nomore'
                }
            })
        },
        async getEmojiList() {
            let that = this
            if (uni.getStorageSync('EMOJILIST')) {
                that.emojiList = uni.getStorageSync('EMOJILIST')
            } else {
                that.emojiList = ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','🥰','😗','😙','🥲','😚','🙂','🤗','🤩','🤔','🫡','🤨','😐','😑','😶','🫥','😶‍🌫️','🙄','😏','😣','😥','😮','🤐','😯','😪','😫','🥱','😴','😌','😛','😜','😝','🤤','😒','😓','😔','😕','🫤','🙃','🫠','🤑','😲','☹️','🙁','😖','😞','😟','😤','😢','😭','😦','😧','😨','😩','🤯','😬','😮‍💨','😰','😱','🥵','🥶','😳','🤪','😵','😵‍💫','🥴','😠','😡','🤬','😷','🤒','🤕','🤢','🤮','🤧','😇','🥳','🥸','🥺','🥹','🤠','🤡','🤥','🤫','🤭','🫢','🫣','🧐','🤓','😈','👿','👹','👺','💀','☠️','👻','👽','👾','🤖','💩','😺','😸','😹','😻','😼','😽','🙀','😿','😾','🙈','🙉','🙊','🐵','🐶','🐺','🐱','🦁','🐯','🦒','🦊','🦝','🐮','🐷','🐗','🐭','🐹','🐰','🐻','🐻‍❄️','🐨','🐼','🐸','🦓','🐴','🦄','🐔','🐲','🐽','🐾','🐒','🦍','🦧','🦮','🐕‍🦺','🐩','🐕','🐈','🐈‍⬛','🐅','🐆','🐎','🦌','🦬','🦏','🦛','🐂','🐃','🐄','🐖','🐏','🐑','🐐','🐪','🐫','🦙','🦘','🦥','🦨','🦡','🐘','🦣','🐁','🐀','🦔','🐇','🐿️','🦫','🦎','🐊','🐢','🐍','🐉','🦕','🦖','🦦','🦈','🐬','🦭','🐳','🐋','🐟','🐠','🐡','🦐','🦑','🐙','🦞','🦀','🐚','🪸','🦆','🐓','🦃','🦅','🕊️','🦢','🦜','🦩','🦚','🦉','🦤','🪶','🐦','🐧','🐥','🐤','🐣','🦇','🦋','🐌','🐛','🦟','🪰','🪱','🦗','🐜','🪳','🐝','🪲','🐞','🦂','🕷️','🕸️','🦠','🧞‍♀️','🧞‍♂️','🧞','🧟‍♀️','🧟‍♂️','🧟','🧌','🗣️','👤','👥','🫂','👁️','👀','🦴','🦷','👅','👄','🫦','🧠','🫀','🫁','🦾','🦿','👣','🤺','⛷️']
                uni.setStorageSync('EMOJILIST', that.emojiList)

            }
        },
        addComment(item) {
            let that = this
            that.placeholder = `回复${item.user.role_realname}`
            that.post_comment_id = item.id
            that.inputFocus = true
        },
        handlePostDig() {
            let that = this
            that.$api('post.dig', {
                post_id: that.post.id
            }).then(res => {
                if (res.code === 1) {
                    that.$u.toast('点赞成功')
                    that.getPostDetail()
                } else {
                    that.$u.toast(res.msg)
                }
            })
        },
        handleCommentDig(item) {
            let that = this
            that.$api('comment.dig', {
                post_comment_id: item.id
            }).then(res => {
                if (res.code === 1) {
                    that.$u.toast('点赞成功')
                    that.getPostDetail()
                    that.params.page = 1
                    that.listPostComment = []
                    that.getPostComment()
                } else {
                    that.$u.toast(res.msg)
                }
            })
        },
        doComment() {
            let that = this
            if (!that.message) {
                that.$u.toast('内容不能为空')
                return false
            }
            that.$api('comment.add', {
                content: that.message,
                post_comment_id: that.post_comment_id,
                post_id: that.post.id
            }).then(res => {
                if (res.code === 1) {
                    that.message = ''
                    that.$u.toast('评论成功')
                    that.showEmoji = false
                    that.getPostDetail()
                    that.params.page = 1
                    that.listPostComment = []
                    that.getPostComment()
                } else {
                    that.$u.toast(res.msg)
                }
            })
        },
        handleEmojiSend(item) {
            let that = this
            that.message += item
        },
        handleFeedback() {
            let that = this
            that.$api('feedback.add', {
                type: 'report',
                content: that.feedback,
                remark: `类型：${that.feedbackType}，ID：${that.post.id}`
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
    }
}
</script>
<style lang="scss" scoped>

</style>