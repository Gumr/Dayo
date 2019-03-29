var videoPlay, videoPause, videoContext, closevoice, closeV, video, WxParse = require("../../../wxParse/wxParse.js"), app = getApp();

Page({
    data: {
        cost: {
          dialog: !1,
          price: 0,
          id: null
        },
        login: !1,
        shadow: !0,
        pay: !0,
        shadows: !0,
        notice: !0,
        nomoney: !0,
        balance: !0,
        level: !0,
        videoPlay: !0,
        videoPause: !0,
        indicatorDots: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        vertical: !0,
        finger: !0,
        circular: !0
    },
    onLoad: function(a) {
        var t = app.globalData.screenHeight, e = app.globalData.screenWidth;
        this.setData({
            system: app.globalData.system,
            screenWidth: e,
            screenHeight: t
        });
    },
    Jine: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Jine",
            method: "POST",
            success: function(a) {
                t.setData({
                    sysmoney: a.data.data
                });
            }
        });
    },
    finger: function() {
        this.setData({
            shadows: !1,
            finger: !1
        });
    },
    closeFinger: function() {
        this.setData({
            shadows: !0,
            finger: !0
        });
    },
    Notice: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Notice",
            method: "POST",
            success: function(a) {
                console.log("Notice", a), t.setData({
                    Notice: a.data.data
                });
            }
        });
    },
    jumptostep: function(e) {
      wx.navigateToMiniProgram({
        appId: 'wx7133b52f4c55af53',
        path: '',
        extraData: {
          from_id: 'wx6a240bae5ec27a21'
        },
        envVersion: 'develop',
        success(res) {
          // 打开成功
        }
      })
    },
    goods: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/goods",
            method: "POST",
            success: function(a) {
                t.setData({
                    goods: a.data.data
                });
            }
        });
    },
    onShow: function() {
        Promise.all([ this.check(), this.Jine(), this.Notice(), this.goods() ]).then(function(a) {});
        var a = app.globalData.sys, t = a.basic.explain;
        WxParse.wxParse("article", "html", t, this, 5), wx.setNavigationBarColor({
            frontColor: a.basic.fontcolor,
            backgroundColor: a.basic.color
        }), wx.setNavigationBarTitle({
            title: a.basic.title
        }), (closeV = wx.getStorageSync("closevoice")) && (this.back = wx.getBackgroundAudioManager(), 
        this.back.src = a.basic.bgm, this.back.title = a.basic.title, this.back.play()), 
        this.setData({
            sys: a,
            closeV: closeV
        });
    },
    closevoice: function(a) {
        var t = app.globalData.sys;
        a.currentTarget.dataset.voice;
        closeV ? (closeV = !1, this.back.stop(), wx.setStorageSync("closevoice", !1)) : (this.back = wx.getBackgroundAudioManager(), 
        this.back.src = t.basic.bgm, this.back.title = t.basic.title, this.back.play(), 
        closeV = !0, wx.setStorageSync("closevoice", !0)), this.setData({
            closeV: closeV
        });
    },
    goplay: function(a) {
        app.util.request({
            url: "entry/wxapp/Play",
            method: "POST",
            data: {
                uid: app.globalData.user_id,
                gid: a
            },
            success: function(a) {
                console.log("asdas", a), wx.navigateTo({
                    url: "../play/play?orderId=" + a.data.data.trade_no
                });
            }
        });
    },
    detail: function(a) {
      var _self = this;
      var t = this.data.system;
      if (1 == app.globalData.sys.pay.ios && "And" != t) return wx.showToast({
        title: "IOS暂不能体验，请耐心等待",
        icon: "none"
      }), !1;
      var e, o, s = a.currentTarget.dataset.need, i = a.currentTarget.dataset.id;
      s <= parseInt(this.data.Allmoney)
        ? (this.setData({
          cost: {
            price: s,
            id: i,
            dialog: !0
          }
          // cost_price: s,
          // cost_dialog: !0
        }),
          // this.goplay(i),
          o = e = !0)
        : (o = e = !1,
          wx.showModal({
            title: '温馨提示',
            content: '当前能量币不足，无法参与',
            cancelText: '回到首页',
            confirmText: '去赚取',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                _self.jumptostep()
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          }))
        // this.setData({
        //     shadow: o,
        //     balance: e
        // });
    },
    transgoplay: function() {
      var i = this.data.cost.id
      this.goplay(i)
    },
    showcostdialog: function (cb) {
      this.setData({
        'cost.dialog': !0
        // cost_dialog: !0
      }, cb || function() {})
    },
    closecostdialog: function() {
      this.setData({
        'cost.dialog': !1
        // cost_dialog: !1
      })
    },
    goMoney: function() {
        this.setData({
            balance: !0,
            pay: !1
        });
    },
    level: function() {
        this.setData({
            shadow: !1,
            level: !1,
            balance: !0
        });
    },
    closeLevel: function() {
        this.setData({
            shadow: !0,
            level: !0
        });
    },
    notice: function(a) {
        var o = this, t = a.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/Noticedetail",
            method: "POST",
            data: {
                id: t
            },
            success: function(a) {
                console.log("Noticedetail", a);
                var t = a.data.data, e = t.content;
                WxParse.wxParse("article1", "html", e, o, 5), o.setData({
                    noticeTitle: t.title,
                    shadow: !1,
                    notice: !1,
                    pay: !0,
                    balance: !0
                });
            }
        });
    },
    closePay: function() {
        this.setData({
            shadow: !0,
            pay: !0,
            notice: !0
        });
    },
    closeNotice: function() {
        this.setData({
            shadow: !0,
            pay: !0,
            notice: !0
        });
    },
    onUnload: function() {
        console.log("暂停"), this.back.stop();
    },
    onHide: function() {
        this.back.stop();
    },
    check: function() {
        var t = this;
        wx.checkSession({
            success: function(a) {
                if (!wx.getStorageSync("user")) return console.log("go"), !1;
                console.log("未过期"), t.register();
            },
            fail: function(a) {
                console.log("已过期"), t.setData({
                    login: !1
                });
            }
        });
    },
    buy: function(a) {
        var t = this, e = a.currentTarget.dataset.money;
        app.util.request({
            url: "entry/wxapp/Recharge",
            method: "POST",
            data: {
                money: e,
                uid: app.globalData.user_id
            },
            success: function(a) {
                t.pay(a.data.data);
            }
        });
    },
    pay: function(a) {
        var t = this;
        wx.requestPayment({
            timeStamp: "" + a.timeStamp,
            nonceStr: a.nonceStr,
            package: a.package,
            signType: "MD5",
            paySign: a.sign,
            success: function(a) {
                console.log("支付成功", a), t.setData({
                    shadow: !0,
                    pay: !0
                });
            },
            fail: function(a) {}
        });
    },
    getUserInfo: function(t) {
        this.setData({
            disabled: !0
        });
        var e = this;
        wx.getSetting({
            success: function(a) {
                a.authSetting["scope.userInfo"] && e.login(t);
            }
        }), setTimeout(function() {
            e.setData({
                disabled: !1
            });
        }, 2e3);
    },
    play: function() {
        wx.navigateTo({
            url: "../try/try"
        });
    },
    my: function() {
        wx.reLaunch({
            url: "../my/my"
        });
    },
    login: function(e) {
      console.log('e====', e)
        var o = this;
        wx.login({
            success: function(a) {
                var t = e.detail;
                app.globalData.userInfo = t, app.util.request({
                    url: "entry/wxapp/Getopenid",
                    method: "post",
                    dataType: "json",
                    data: {
                        code: a.code
                    },
                    success: function(a) {
                        console.log("login", a), 0 == a.data.errno && (t.session_key = a.data.data.session_key, 
                        t.openid = a.data.data.openid, app.globalData.userInfo = t, wx.setStorageSync("user", e), 
                        "function" == typeof cb && cb(app.globalData.userInfo), o.register());
                    }
                });
            },
            fail: function(a) {}
        });
    },
    register: function(a) {
      console.log('this.data', this.data)
        var t = this, e = (t.data.selfuid, t.data.selflevel, t.data.wechat, t.data.getreward, 
        wx.getStorageSync("user").detail), o = e.session_key, s = e.openid, i = e.iv, n = e.encryptedData;
        app.util.request({
            url: "entry/wxapp/Getuserinfo",
            method: "post",
            dataType: "json",
            data: {
                session_key: o,
                encryptedData: n,
                iv: i,
                openid: s
            },
            success: function(a) {
                app.globalData.user_id = a.data.data, Promise.all([ t.Mymoney(a.data.data), t.Bindnexus(a.data.data) ]).then(function(a) {}), 
                t.setData({
                    login: !0
                });
            }
        });
    },
    Bindnexus: function(a) {
        var t = wx.getStorageSync("pid");
        console.log("hahapid", t);
        t && app.util.request({
            url: "entry/wxapp/Bindnexus",
            method: "POST",
            data: {
                uid: a,
                pid: t
            },
            success: function(a) {}
        });
    },
    Mymoney: function(a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Mymoney",
            method: "POST",
            data: {
                uid: app.globalData.user_id
            },
            success: function(a) {
                t.setData({
                    Allmoney: a.data.data
                });
            }
        });
    },
    onShareAppMessage: function() {
        var a = app.globalData.sys, t = app.globalData.user_id;
        return {
            title: a.forward.title,
            imageUrl: a.forward.img,
            path: "hc_doudou/pages/login/login?pid=" + t
        };
    }
});