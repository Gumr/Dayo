var _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var $this, app = getApp();

function load(e) {
    _tools2.default.request({
        method: "get",
        url: "entry/wxapp/cash",
        data: {
            token: wx.getStorageSync("token")
        },
        success: function(t) {
            e.setData(t.info), e.setData({
                cash_money: 0,
                pwd: ""
            });
        }
    });
}

Page({
    data: {
        cash_money: 0,
        share_text: "",
        share_image: "",
        income_banner: "",
        is_cash: 1,
        isTipPop: !1,
        author_show: !1,
        pwd: "",
        follow_cash_show: !1
    },
    onLoad: function(t) {
        this.setData({
            img_url: app.siteInfo.siteroot.replace(/app\/index.php/, "") + app.img_url
        }), this.setData({
            income_banner: this.data.img_url + "/income/income-banner-bg.png",
            mydialog: this.data.img_url + "/wechat/mydialog.png"
        }), $this = this;
    },
    onReady: function() {
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/config",
            data: {
                token: wx.getStorageSync("token"),
                key: "xcx_title,share_text,share_image"
            },
            success: function(t) {
                wx.setNavigationBarTitle({
                    title: t.info.xcx_title
                }), $this.setData(t.info);
            }
        });
    },
    onShow: function() {
        load(this);
    },
    closecash: function() {
        this.setData({
            follow_cash_show: !1
        });
    },
    show_pwd: function() {
        this.setData({
            follow_cash_show: !0
        });
    },
    bindWithdrawAllClick: function() {
        $this.setData({
            cash_money: this.data.moeny
        });
    },
    bindWithdrawBtnClick: function() {
        var t = parseFloat(this.data.moeny), e = parseFloat(this.data.cash_money);
        if (t < e) return wx.showToast({
            icon: "none",
            title: "余额不足"
        }), !1;
        if (Number.isNaN(e) || e < $this.data.least_money) return wx.showToast({
            icon: "none",
            title: "最低提现门槛" + $this.data.least_money + "元"
        }), !1;
        if (1 != this.data.is_cash) return !1;
        this.data.is_cash;
        var a = {
            token: wx.getStorageSync("token"),
            money: e
        };
        if (this.data.follow_cash.type && !this.data.follow_cash.is_pwd && (a.pwd = this.data.pwd, 
        !this.data.pwd)) return wx.showToast({
            icon: "none",
            title: "请填写提现口令"
        }), !1;
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/withdrawals",
            data: a,
            success: function(t) {
                $this.data.is_cash = 1, 2 == t.status ? wx.showModal({
                    title: "提示",
                    mask: !0,
                    content: t.info,
                    showCancel: !1
                }) : 3 == t.status ? $this.setData({
                    author_show: !0
                }) : 4 == t.status ? ($this.setData(t.info), $this.setData({
                    isTipPop: !0
                })) : (wx.showToast({
                    title: "提现成功"
                }), load($this));
            }
        });
    },
    bindKeyInput: function(t) {
        this.data.cash_money = t.detail.value;
    },
    closedialog: function() {
        this.setData({
            author_show: !1
        });
    },
    bindpwdInput: function(t) {
        this.data.pwd = t.detail.value;
    },
    getUserInfo: function(t) {
        if ("getUserInfo:ok" == t.detail.errMsg) {
            t.detail.userInfo;
            _tools2.default.request({
                method: "get",
                url: "entry/wxapp/register",
                data: {
                    token: wx.getStorageSync("token"),
                    encryptedData: t.detail.encryptedData,
                    iv: t.detail.iv
                },
                success: function(t) {
                    load($this);
                }
            });
        } else console.log("用户拒绝了");
    },
    bindRecordBtn: function() {
        wx.navigateTo({
            url: "/bh_step/pages/moneyRecord/moneyRecord"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return console.log("bh_step/pages/index/index?share_tpye=1&parent_id=" + $this.data.member_id), 
        {
            title: $this.data.share_text,
            imageUrl: $this.data.share_image,
            path: "bh_step/pages/index/index?share_tpye=1&parent_id=" + $this.data.member_id
        };
    }
});