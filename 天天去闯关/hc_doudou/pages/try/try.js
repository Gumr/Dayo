var siteinfo = require("../../../siteinfo.js"), app = getApp();

Page({
    data: {},
    onShow: function() {
        var o = siteinfo.siteroot + "?i=" + siteinfo.acid + "&c=entry&m=hc_doudou&do=games&game=1#wechat_redirect";
        this.setData({
            url: o
        });
    },
    onLoad: function(o) {
        var a = app.globalData.sys;
        wx.setNavigationBarColor({
            frontColor: a.basic.fontcolor,
            backgroundColor: a.basic.color
        }), wx.setNavigationBarTitle({
            title: a.basic.title
        });
    },
    Test: function(o) {
        o.detail.data;
        console.log(o);
    },
    onShareAppMessage: function() {
        var o = app.globalData.sys;
        return {
            title: o.forward.title,
            imageUrl: o.forward.img,
            path: "hc_doudou/pages/login/login"
        };
    }
});