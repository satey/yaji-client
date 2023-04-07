# lime-svga
> uniapp svga动画组件  
>  Q 群：806744170
## 平台兼容

| H5  | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ 小程序 | App  |
| --- | ---------- | ------------ | ---------- | ---------- | --------- | ---- |
| √   | √          |    √      |       |        |       | √ |

**注意** 
* 🔔 纯Nvue 需要 HBX 3.4.11.20220520-alpha 及以上
* 🔔 暂不支持vue3

## 安装
- 1、在 uniapp 插件市场 找到 [svga](https://ext.dcloud.net.cn/plugin?id=8134) 导入

## 使用

### 方式一
```html
<view class="content" style="height: 750rpx">
	<l-svga src="https://static-6d65bd90-8508-4d6c-abbc-a4ef5c8e49e7.bspapp.com/static/angel.svga"></l-svga>
</view>
```

### 方式二

```html
<view class="content" style="height: 750rpx">
	<l-svga ref="svga"></l-svga>
</view>
```
```js
this.$refs.svga.render(async (parser, player) => {
	const videoItem = await parser.load("https://static-6d65bd90-8508-4d6c-abbc-a4ef5c8e49e7.bspapp.com/static/angel.svga");
	await player.setVideoItem(videoItem);
	// 设置当前动画的循环次数，0代表无限循环 默认 0
	player.loops = 1
	// 开始播放动画，reverse = true 时则反向播放。
	player.startAnimation()
	// 监听动画完成
	player.onFinished(() => {
		console.log('动画结束')
	})
})
```



## Props

| 参数             | 说明                                                            | 类型           | 默认值        | 版本 	|
| ---------------  | --------                                                        | -------        | ------------ | ----- 	|
| type             | canvas 类型 2d                               |    `string`    | `2d`         | 0.0.1  	|
| src              | svga地址，网络或本地                          |    `string`    | ``         | 0.0.2  	|

## Player
- ◼ `loops = 0`
属性，设置当前动画的循环次数，0代表无限循环。

- ◼ `clearsAfterStop = true`
属性，为 true 时，表示动画停止播放后默认清空画布。

- ◼ `fillMode = "Forward"`
属性，为 Forward 时，表示动画播放结束后保留在最后一帧。为 Backward 时，表示保留在第一帧。

- ◼ `async setVideoItem(videoItem?: VideoEntity): Promise<any>`
设置需要播放的 `VideoEntity` 动画实体。

- ◼ `setContentMode(contentMode: string)`
设置动画缩放模式，可选值为 Fill / AspectFill / AspectFit。

- ◼ `startAnimation(reverse: boolean = false)`
开始播放动画，reverse = true 时则反向播放。

- ◼ `startAnimationWithRange(range: Range, reverse: boolean = false)`
开始播放动画，在指定 `Range` 内播放。

- ◼ `pauseAnimation()`
暂停播放动画。

- ◼ `stopAnimation(clear?: boolean)`
停止播放动画，当 clear 为 true 时，清空画布。

- ◼ `clear()`
清空画布

- ◻ `stepToFrame(frame: number, andPlay: boolean = false)`
跳转动画的指定帧，andPlay 为 true 时，从该帧开始播放动画。

- ◻ `stepToPercentage(percentage: number, andPlay: boolean = false)`
跳转动画的指定进度百分比，andPlay 为 true 时，从该帧开始播放动画。

- ◻ `async setImage(src: Uint8Array | string, forKey: string): Promise<any>`
使用图片替换指定元素

- ◼ `setText(dynamicText: DynamicText, forKey: string)`
添加文本到指定元素上

- ◻ `clearDynamicObjects()`
清空所有替换元素。

- ◼ `onFinished(callback: () => void)`
监听动画完成

- ◼ `onFrame(callback: (frame: number) => void)`
监听动画播放过程中，当前帧的变化。

- ◼ `onPercentage(callback: (percentage: number) => void)`
监听动画播放过程中，当前进度的变化。

## 打赏
如果你觉得本插件，解决了你的问题，赠人玫瑰，手留余香。  

![输入图片说明](https://static-6d65bd90-8508-4d6c-abbc-a4ef5c8e49e7.bspapp.com/image/222521_bb543f96_518581.jpeg "微信图片编辑_20201122220352.jpg")
![输入图片说明](https://static-6d65bd90-8508-4d6c-abbc-a4ef5c8e49e7.bspapp.com/image/wxplay.jpg "wxplay.jpg")