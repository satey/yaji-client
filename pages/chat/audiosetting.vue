<template>
    <page-meta :root-font-size="'13px'"></page-meta>
    <view class="">
        <view class=" !border-t border-0 border-solid border-gray-100">
            <view class="py-4 px-4 text-base">基本信息</view>
            <view class="flex justify-between items-center py-4 px-4 bg-white">
                <view class="text-base">频道主图</view>
                <view class="flex-1 text-right"></view>
                <i class="ri-arrow-right-s-line block text-xl leading-none text-gray-500"></i>
            </view>
            <view class="flex justify-between items-center py-4 px-4 bg-white">
                <view class="text-base">频道名称</view>
                <view class="flex-1 text-right">测试直播</view>
                <i class="ri-arrow-right-s-line block text-xl leading-none text-gray-500"></i>
            </view>
            <view class="flex justify-between items-center py-4 px-4 bg-white">
                <view class="text-base">频道类型</view>
                <view class="flex-1 text-right">交友</view>
                <i class="ri-arrow-right-s-line block text-xl leading-none text-gray-500"></i>
            </view>
            <view class="py-4 px-4 text-base">发言模式</view>
            <view class="flex justify-between items-center py-4 px-4 bg-white">
                <view class="flex-1 text-base">
                    自由模式
                    <view class="text-sm mt-1 text-gray-400">所有人自由发言</view>
                </view>
                <u-checkbox-group>
                    <u-checkbox shape="circle" activeColor="rgb(168, 85, 247)"></u-checkbox>
                </u-checkbox-group>
            </view>
            <view class="flex justify-between items-center py-4 px-4 bg-white">
                <view class="flex-1 text-base">
                    主席模式
                    <view class="text-sm mt-1 text-gray-400">仅管理员可以发言</view>
                </view>
                <u-checkbox-group>
                    <u-checkbox shape="circle" activeColor="rgb(168, 85, 247)"></u-checkbox>
                </u-checkbox-group>
            </view>
            <view class="flex justify-between items-center py-4 px-4 bg-white">
                <view class="flex-1 text-base">
                    麦序模式
                    <view class="text-sm mt-1 text-gray-400">麦序第一人以及管理员可以发言</view>
                </view>
                <u-checkbox-group>
                    <u-checkbox shape="circle" activeColor="rgb(168, 85, 247)"></u-checkbox>
                </u-checkbox-group>
            </view>
            <view class="py-4 px-4 text-base">游客设置</view>
            <view class="flex justify-between items-center py-4 px-4 bg-white">
                <view class="flex-1 text-base">
                    游客禁止发言
                </view>
                <u-checkbox-group>
                    <u-checkbox shape="circle" activeColor="rgb(168, 85, 247)"></u-checkbox>
                </u-checkbox-group>
            </view>
            <view class="flex justify-between items-center py-4 px-4 bg-white">
                <view class="flex-1 text-base">
                    用户进场信息
                </view>
                <u-checkbox-group>
                    <u-checkbox shape="circle" activeColor="rgb(168, 85, 247)"></u-checkbox>
                </u-checkbox-group>
            </view>
            <view class="py-4 px-4 text-base">管理员设置</view>
        </view>
        <view class="flex py-4 px-4 mt-2">
            <view class="w-full !border bg-purple-500 text-white p-4 rounded-full text-center">保存</view>
        </view>
    </view>
</template>
<script>
</script>

<style>
page {
    background: #f2f2f2;
}
</style>
