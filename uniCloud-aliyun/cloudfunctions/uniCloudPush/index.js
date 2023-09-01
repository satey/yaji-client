'use strict';
const uniPush = uniCloud.getPushManager({
	appId: "__UNI__5018490"
}) //注意这里需要传入你的应用appId
exports.main = async (event, context) => {
	var data = JSON.parse(event.body)
	return await uniPush.sendMessage({
		"channel": {
			"VV": "1",
			"HW": "NORMAL"
		},
		"push_clientid": data.push_clientid, //填写上一步在uni-app客户端获取到的客户端推送标识push_clientid
		"title": data.title,
		"content": data.content,
		"force_notification": data.force_notification,
		"payload": data.payload
	})
};