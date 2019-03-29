var app = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var o = app.globalData.sys;
        wx.setNavigationBarColor({
            frontColor: o.basic.fontcolor,
            backgroundColor: o.basic.color
        }), wx.setNavigationBarTitle({
            title: "生成海报"
        });
    },
    download: function(a) {
        var o = a.currentTarget.dataset.src, t = [];
        t.push(o), wx.previewImage({
            urls: t,
            current: t[0]
        });
    },
    onShow: function() {
        var a = app.globalData.user_id, o = this;
        app.util.request({
            url: "entry/wxapp/Qrcode",
            method: "post",
            dataType: "json",
            data: {
                uid: a
            },
            success: function(a) {
                wx.showToast({
                    title: "点击预览，长按保存到手机",
                    icon: "none"
                }), o.setData({
                    src: a.data.data
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var a = app.globalData.sys, o = app.globalData.user_id;
        return {
            title: a.forward.title,
            imageUrl: a.forward.img,
            path: "hc_doudou/pages/login/login?pid=" + o
        };
    }
});