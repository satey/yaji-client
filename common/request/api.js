export default {
	index: {
		init: { url: 'index/init', auth: false, method: 'GET', desc: '初始化数据', },
		upload: { url: 'index/upload', auth: false, method: 'POST', desc: '上传', },
		asyncLink: { url: 'index/asyncLink', auth: false, method: 'POST', desc: '路由表', },
		debug: { url: 'index/debug', auth: false, method: 'POST', }
	},
	post: {
		recommend: { url: 'post/recommend', auth: false, method: 'GET', desc: '推荐话题', },
		follow: { url: 'post/follow', auth: true, method: 'GET', desc: '推荐话题', },
		user: { url: 'post/user', auth: false, method: 'GET', desc: '话题列表', },
		mine: { url: 'post/mine', auth: true, method: 'GET', desc: '话题列表', },
		detail: { url: 'post/detail', auth: false, method: 'GET', desc: '话题详情', },
		del: { url: 'post/del', auth: false, method: 'GET', desc: '删除动态', },
		add: { url: 'post/add', auth: true, method: 'POST', desc: '发布话题', },
		dig: { url: 'post/dig', auth: true, method: 'POST', desc: '点赞', },
		cai: { url: 'post/cai', auth: true, method: 'POST', desc: '点踩', },
		is_add: { url: 'post/is_add', auth: true, method: 'POST', desc: '能否显示动态', },
	},
	post_cate:{
		add: { url: 'post_cate/add', auth: true, method: 'POST', desc: '添加话题', },
		search_list: { url: 'post_cate/search_list', auth: true, method: 'GET', desc: '搜索话题', },
	},
	group: {
		recommend: { url: 'group/recommend', auth: false, method: 'GET', desc: '推荐圈子', },
		mine: { url: 'group/mine', auth: true, method: 'GET', desc: '圈子列表', },
		detail: { url: 'group/detail', auth: true, method: 'GET', desc: '圈子详情', },
		add: { url: 'group/add', auth: true, method: 'POST', desc: '发布圈子', },
	},
	comment: {
		lists: { url: 'post_comment/lists', auth: false, method: 'GET', desc: '评论列表', },
		add: { url: 'post_comment/add', auth: true, method: 'POST', desc: '发布评论', },
		dig: { url: 'post_comment/dig', auth: true, method: 'POST', desc: '点赞', },
	},
	gift: {
		lists: { url: 'gift/lists', auth: true, method: 'GET', desc: '礼物列表', },
	},
	chat: {
		single: { url: 'chat/single', auth: true, method: 'GET', desc: '单聊详情', },
		group: { url: 'chat/group', auth: true, method: 'GET', desc: '群聊详情', },
		voice: { url: 'chat/voice', auth: true, method: 'GET', desc: '语音详情', },
		live: { url: 'chat/live', auth: true, method: 'GET', desc: '视频详情', },
		lists: { url: 'chat/lists', auth: true, method: 'GET', desc: '会话列表', },
	},
	message: {
		lists: { url: 'message/lists', auth: true, method: 'GET', desc: '消息列表', },
		readall: { url: 'message/readall', auth: true, method: 'GET', desc: '标记已读', },
	},
	help: {
		lists: { url: 'help/lists', auth: false, method: 'GET', desc: '帮助列表', },
		detail: { url: 'help/detail', auth: false, method: 'GET', desc: '帮助列表', },
	},
	adv: {
		lists: { url: 'adv/lists', auth: false, method: 'GET', desc: '广告列表', },
	},
	role: {
		recommend: { url: 'role/recommend', auth: false, method: 'GET', desc: '推荐角色', },
		lists: { url: 'role/lists', auth: false, method: 'GET', desc: '角色列表', },

		match: { url: 'role/match', auth: true, method: 'GET', desc: '角色匹配', },
	},
	richtext: {
		lists: { url: 'richtext/lists', auth: false, method: 'GET', desc: '文本列表', },
		detail: { url: 'richtext/detail', auth: false, method: 'GET', desc: '文本详情', },
	},
	feedback: {
		lists: { url: 'feedback/lists', auth: false, method: 'GET', desc: '反馈列表', },
		add: { url: 'feedback/add', auth: false, method: 'POST', desc: '提交反馈', },
	},
	wechat: {
		jssdk: { url: 'wechat/jssdk', auth: false, method: 'POST', desc: '微信Jssdk', },
	},
	user: {
		recommend: { url: 'user/recommend', auth: false, method: 'GET', desc: '推荐用户', },
		recommend_user: { url: 'user/recommend_user', auth: false, method: 'GET', desc: '推荐用户1', },
		profile: { url: 'user/profile', auth: false, method: 'GET', desc: '用户信息', },
		role: { url: 'user/role', auth: false, method: 'GET', desc: '用户角色', },
		data: { url: 'user/data', auth: true, method: 'GET', desc: '关注数据', },

		smslogin: { url: 'user/smslogin', auth: false, method: 'POST', desc: '手机登录', },
		register: { url: 'user/register', auth: false, method: 'POST', desc: '会员注册', },

		info: { url: 'user/info', auth: true, method: 'GET', desc: '会员信息', },
		update: { url: 'user/update', auth: true, method: 'POST', desc: '修改信息', },
		bindrole: { url: 'user/bindrole', auth: true, method: 'POST', desc: '绑定角色', },
		changemobile: { url: 'user/changemobile', auth: true, method: 'POST', desc: '修改手机号', },
		search_log: { url: 'user/search_log', auth: true, method: 'POST', desc: '搜索记录', },
	},
	user_gift: {
		lists: { url: 'user_gift/lists', auth: true, method: 'GET', desc: '礼物列表', },
	},
	user_recharge: {
		apply: { url: 'user_recharge/apply', auth: true, method: 'PUT', desc: '充值', },
		lists: { url: 'user_recharge/lists', auth: true, method: 'PUT', desc: '充值记录', },
	},
	user_wallet_log: {
		lists: { url: 'user_wallet_log/lists', auth: true, method: 'GET', desc: '明细记录', },
	},
	user_view: {
		lists: { url: 'user_view/lists', auth: true, method: 'GET', desc: '收藏记录', },
	},
	user_follow: {
		lists: { url: 'user_follow/lists', auth: true, method: 'GET', desc: '关注列表', },
		follow: { url: 'user_follow/follow', auth: true, method: 'POST', desc: '取消关注', },
	},
	role_dynasty: {
		lists: { url: 'role_dynasty/lists', auth: false, method: 'GET', desc: '朝代列表', },
	},
	role_achievement: {
		lists: { url: 'role_achievement/lists', auth: false, method: 'GET', desc: '成就列表', },
	},
	role_title: {
		lists: { url: 'role_title/lists', auth: false, method: 'GET', desc: '称号列表', },
	},
	sms: {
		send: { url: 'sms/send', auth: false, method: 'POST', desc: '发送短信', },
	},
	pay: {
		prepay: { url: 'pay/prepay', auth: true, method: 'POST', desc: '发起支付', },
	},
	share: {
		add: { url: 'share/add', auth: false, method: 'POST', desc: '添加分享记录', }
	}
};
