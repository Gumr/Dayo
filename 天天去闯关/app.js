var util = require("we7/resource/js/util.js");

App({
    onLaunch: function(e) {
        var s = this;
        wx.getSystemInfo({
            success: function(e) {
                s.globalData.system = e.system.slice(0, 3), s.globalData.screenWidth = e.screenWidth, 
                s.globalData.screenHeight = e.screenHeight;
            }
        }), wx.setStorageSync("closevoice", !0);
    },
    onShow: function(e) {},
    onHide: function() {},
    onError: function(e) {
        console.log(e);
    },
    util: util,
    userInfo: {
        sessionid: null
    },
    globalData: {},
    siteInfo: require("siteinfo.js")
});