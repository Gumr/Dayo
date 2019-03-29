var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, siteinfo = require("../../../siteinfo.js"), app = getApp();

Page({
    data: {},
    onLoad: function(o) {
      console.log('o======', o, app.globalData.user_id);
        var t = app.globalData.sys;
        wx.setNavigationBarColor({
            frontColor: t.basic.fontcolor,
            backgroundColor: t.basic.color
        }), wx.setNavigationBarTitle({
            title: t.basic.title
        });
        var e = siteinfo.siteroot + "?i=" + siteinfo.acid + "&c=entry&m=hc_doudou&do=games&game=2&orderId=" + o.orderId + "&userId=" + app.globalData.user_id + "#wechat_redirect";
        this.setData({
            url: e
        });
    },
    Test: function(o) {
        console.log("获取结果为解析", _typeof(o.detail.data), o.detail);
        var t = JSON.parse(o.detail.data[0]);
        console.log("获取结果", t), this.order(t);
    },
    order: function(o) {
        app.util.request({
            url: "entry/wxapp/Result",
            method: "POST",
            data: {
                uid: o.openid,
                orderid: o.orderId,
                result: o.results,
                level: o.level
            },
            success: function(o) {
                console.log("order", o);
            },
            fail: function(o) {
                console.log("fail", o);
            }
        });
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