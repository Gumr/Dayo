var _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var $this, app = getApp();

function suspension(e) {
    _tools2.default.request({
        method: "get",
        url: "entry/wxapp/suspension",
        data: {
            token: wx.getStorageSync("token")
        },
        success: function(t) {
            e.setData({
                suspension: t.info,
                my_currency: t.info.my_currency,
                today: t.info.toady
            });
        }
    });
}


function bag_share(e) {
    _tools2.default.request({
        method: "get",
        url: "entry/wxapp/shareBag",
        data: {
            token: wx.getStorageSync("token")
        },
        success: function(t) {
            e.setData({
                bag_share: t.info,
                bag_unlock: !0
            });
        }
    });
}

function load(e) {
    var t = wx.getStorageSync("task");
    t ? (2e4 < Date.parse(new Date()) - t.time ? _tools2.default.request({
        method: "get",
        url: "entry/wxapp/taskComplete",
        data: {
            token: wx.getStorageSync("token"),
            task_id: t.id
        },
        success: function(t) {
            e.setData({
                activated: !0,
                isTask: !1
            }), suspension(e);
        }
    }) : wx.showModal({
        title: "温馨提示",
        content: "需要超过20秒才能获得奖励哦",
        showCancel: !1,
        success: function(t) {}
    }), wx.removeStorageSync("task")) : suspension(e);
    wx.getWeRunData({
        success: function(t) {
            setTimeout(function() {
                _tools2.default.request({
                    method: "get",
                    url: "entry/wxapp/updateStep",
                    data: {
                        token: wx.getStorageSync("token"),
                        encryptedData: t.encryptedData,
                        iv: t.iv
                    },
                    success: function(t) {
                        suspension(e);
                    }
                });
            }, 1e3);
        }
    });
}

Page({
    data: {
        init_auth_dialog: !1,
        share_dialog: !1,
        poster_dialog: !1,
        sigin: "",
        remind: 0,
        bgShow: !1,
        isBag: !1,
        suspension: "",
        share_text: "",
        share_image: "",
        share_tpye: 1,
        parent_id: 0,
        goods_id: 0,
        dialogState: 1,
        giveShow: !1,
        give_status: 1,
        cut_step: 0,
        activated: !1,
        author_show: 2,
        mydialog: "",
        ad_pop: 0,
        receive_bg: 1,
        is_receive: 1,
        activation: "",
        vipinfo:{},
    },
    onLoad: function(t) {
        var e = app.siteInfo.siteroot.replace(/app\/index.php/, "") + app.img_url;
        console.log(e)
        this.setData({
            img_url: e,
            mydialog: e + "/wechat/mydialog.png"
        }), $this = this, t.share_tpye && (wx.setStorageSync("share_tpye", t.share_tpye), 
        $this.data.share_tpye = t.share_tpye), t.scene && ($this.data.parent_id = decodeURIComponent(t.scene), 
        wx.setStorageSync("parent_id", $this.data.parent_id)), t.parent_id && (wx.setStorageSync("parent_id", t.parent_id), 
        $this.data.parent_id = t.parent_id), t.goods_id && (wx.setStorageSync("goods_id", t.goods_id), 
        $this.data.goods_id = t.goods_id), t.activation && (this.data.activation = t.activation);
        wx.getSetting({
          success(res) {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: function(t) {
                  console.log(t)
                  _tools2.default.request({
                    method: "post",
                    url: "entry/wxapp/getuserinfo",
                    data: {
                      encryptedData: t.encryptedData,
                      iv: t.iv,
                      session_key: wx.getStorageSync("token"),
                    },
                    success: function (t) {
                      console.log('send success.')
                    }
                  });
                }
              })
            }else {
              $this.setData({
                init_auth_dialog: !0
              })
            }
          }
        })
    },
    onShow: function() {
        var t = {
            token: wx.getStorageSync("token"),
            activation: this.data.activation
        };
        0 < $this.data.goods_id && $this.data.parent_id && 3 == $this.data.share_tpye && (t.goods_id = $this.data.goods_id, 
        t.parent_id = $this.data.parent_id), _tools2.default.request({
            method: "get",
            url: "entry/wxapp/index",
            data: t,
            success: function(t) {
              // console
                $this.setData(t.info), $this.setData({
                    remind: t.info.bag.is_remind
                }), wx.setNavigationBarTitle({
                    title: t.info.xcx_title
                }), $this.setData({
                    invitation: t.info.invitation
                }), $this.setData({
                    my_currency: t.info.member.currency
                }), $this.setData({
                    share: t.info.share
                }), $this.setData({
                    member_id: t.info.member.id
                }), $this.setData({
                    give_step: t.info.give_step,
                    giveShow: !0
                }), 1 != t.info.bag.bag_remind_switch || wx.getStorageSync("remind_switch" + t.info.time) || (wx.setStorageSync("remind_switch" + t.info.time, 1), 
                _tools2.default.request({
                    method: "get",
                    url: "entry/wxapp/bgRemind",
                    data: {
                        token: wx.getStorageSync("token")
                    },
                    success: function(t) {
                        $this.setData({
                            remind: 1
                        });
                    }
                })), !wx.getStorageSync("ad_pop" + t.info.time) && 1 != $this.data.author_show && t.info.advertisement.ad_pop && ($this.setData({
                    ad_pop: 1
                }), wx.setStorageSync("ad_pop" + t.info.time, 1)), 
                load($this);
            }
          }), _tools2.default.request({
            method: "get",
            url: "entry/wxapp/vipgoods",
            data: {
              type: '3'
            },
            success: function (res) {
              $this.setData({
                vipinfo: res.info,
              });
            }
          });
    },
    web_jump: function(t) {
        wx.navigateTo({
            url: "../web/web?path=" + t.currentTarget.dataset.path
        });
    },
    _getuserinfo: function(t) {
      console.log('tttt====', t)
      this.setData({
        init_auth_dialog: !1
      }, () => {
        if ("getUserInfo:ok" == t.detail.errMsg) {
          _tools2.default.request({
            method: "post",
            url: "entry/wxapp/getuserinfo",
            data: {
              encryptedData: t.detail.encryptedData,
              iv: t.detail.iv,
              session_key: wx.getStorageSync("token"),
            },
            success: function (t) {
              console.log('send success.')
            }
          });
        } else {
          console.log("用户拒绝了");
        }
      })
      
    },
    getUserInfo: function(t) {
        if ("getUserInfo:ok" == t.detail.errMsg) {
          console.log('t.detail=', t.detail)
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
                    suspension($this);
                }
            });

        } else console.log("用户拒绝了");
    },
    receive: function(t) {
        if (1 == this.data.is_receive) {
            this.data.is_receive = 2;
            var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.source, s = wx.createInnerAudioContext();
            s.autoplay = !0, s.src = this.data.img_url + "/coin.mp3", console.log(s.src), s.onPlay(function() {
                console.log("开始播放");
            }), s.onError(function(t) {
                console.log(t.errMsg), console.log(t.errCode);
            }), _tools2.default.request({
                method: "get",
                url: "entry/wxapp/receive",
                data: {
                    token: wx.getStorageSync("token"),
                    id: e,
                    formid: t.detail.formId
                },
                success: function(t) {
                    $this.data.is_receive = 1, 2 != t.status ? (3 == a && wx.navigateTo({
                        url: "../sigin/sigin"
                    }), suspension($this)) : wx.showModal({
                        title: "提示",
                        mask: !0,
                        content: t.info,
                        showCancel: !1
                    });
                }
            });
        }
    },
    showBg: function() {
        console.log($this.data.is_bag), 0 != $this.data.bag.is_bag || $this.data.bgShow ? bag_share($this) : $this.setData({
            bgShow: !0
        });
    },
    gotoClosePop: function() {
        $this.setData({
            bag_unlock: !1
        });
    },
    receive_bg: function(t) {
        if (1 != this.data.receive_bg) return !1;
        this.data.receive_bg = 2;
        var e = {
            frequency: t.currentTarget.dataset.index,
            token: wx.getStorageSync("token")
        };
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/bag",
            data: e,
            success: function(t) {
                $this.data.receive_bg = 1, 2 == t.status ? wx.showModal({
                    title: "提示",
                    mask: !0,
                    content: t.info,
                    showCancel: !1
                }) : ($this.data.bag.is_bag = 1, $this.setData({
                    bag: $this.data.bag
                }), 1 < e.frequency ? bag_share($this) : $this.setData({
                    isBag: !0,
                    bgShow: !1,
                    bag_cash: t.info
                }));
            }
        });
    },
    showBagShare: function() {
        $this.setData({
            bgShow: !1,
            isBag: !1
        }), bag_share($this);
    },
    onCloseClick: function() {
        this.setData({
            bgShow: !1,
            isBag: !1,
            giveShow: !1
        });
    },
    hide: function() {
        $this.setData({
            bgShow: !1,
            isBag: !1
        });
    },
  onReady: function () {},
    onHide: function() {},
    bgRemind: function() {
        var e = $this.data.remind ? 1 : 2;
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/bgRemind",
            data: {
                token: wx.getStorageSync("token"),
                type: e
            },
            success: function(t) {
                $this.setData({
                    remind: 1 == e ? 0 : 1
                });
            }
        });
    },
    tapcut: function() {
        var t = {
            token: wx.getStorageSync("token"),
            goods_id: this.data.goods_id,
            parent_id: this.data.parent_id
        };
        console.log(141515), _tools2.default.request({
            method: "get",
            url: "entry/wxapp/give",
            data: t,
            success: function(t) {
                $this.setData({
                    give_status: 2
                }), $this.setData({
                    cut_step: t.info
                });
            }
        });
    },
    onShareAppMessage: function(t) {
        if (console.log(t), null != t.target && "bag" == t.target.dataset.type) var e = $this.data.share.bag.share_text, a = $this.data.share.bag.share_image, s = "bh_step/pages/index/index?share_tpye=2&parent_id=" + $this.data.member_id; else e = $this.data.share.ordinary.share_text, 
        a = $this.data.share.ordinary.share_image, s = "bh_step/pages/index/index?share_tpye=1&parent_id=" + $this.data.member_id;
        return {
            title: e,
            path: s,
            imageUrl: a,
            success: function(t) {
              console.log('t.success;=', t)
            },
            fail: function(t) {
              console.log('t.fail;=', t)
            }
        };
    },
    bindsuccess: function() {
        var t = {
            id: this.data.suspension.task.id,
            time: Date.parse(new Date())
        };
        wx.setStorageSync("task", t);
    },
    bindfail: function() {
        console.log(45454545);
    },
    clickAD: function() {
        var t = {
            id: this.data.suspension.task.id,
            time: Date.parse(new Date())
        };
        wx.setStorageSync("task", t), console.log($this.data.suspension.task), wx.navigateToMiniProgram({
            appId: $this.data.suspension.task.appid,
            path: $this.data.suspension.task.path,
            extraData: {},
            envVersion: "release",
            success: function(t) {},
            fail: function(t) {
                wx.removeStorageSync("task"), wx.showModal({
                    title: "",
                    content: t.errMsg,
                    showCancel: !1
                });
            }
        });
    },
    showdialog: function() {
        this.setData({
            isTask: !0
        });
    },
    closedialog: function() {
        this.setData({
            isTask: !1
        }), this.setData({
            isshow_sigin: !1
        }), this.setData({
            author_show: !1
        }), this.setData({
            ad_pop: 0
        });
    },
    showauthdialog: function() {
      this.setData({
        init_auth_dialog: !0
      })
    },
    closeauthdialog: function () {
      this.setData({
        init_auth_dialog: !1
      })
    },
    showsharedialog: function () {
      this.setData({
        share_dialog: !0
      })
    },
    closesharedialog: function () {
      this.setData({
        share_dialog: !1
      })
    },
    showposterdialog: function () {
      this.setData({
        share_dialog: !1,
        poster_dialog: !0
      })
    },
    closeposterdialog: function() {
      this.setData({
        poster_dialog: !1
      })
    },
    saveposter: function() {
      var $this = this
      wx.getImageInfo({
        src: '../../images/poster_img.png',
        success: function (res) {
          console.log(res, res.path)
          var path = res.path
          wx.getSetting({
            success(res) {
              if (!res.authSetting['scope.writePhotosAlbum']) {
                wx.authorize({
                  scope: 'scope.writePhotosAlbum',
                  success() {
                    wx.saveImageToPhotosAlbum({
                      filePath: path,
                      success(result) {
                        console.log(result)
                        wx.showModal({
                          title: '保存成功',
                          content: '保存成功',
                          showCancel: false
                        })
                      }
                    })
                  },
                  fail: function(res) {
                    console.log('fail res=', res)
                    wx.showToast({
                      title: '你拒绝了授权,请重新授权.',
                      icon: 'none'
                    })
                  }
                })
              }
              else {
                wx.saveImageToPhotosAlbum({
                  filePath: path,
                  success(result) {
                    console.log(result)
                    wx.showModal({
                      title: '保存成功',
                      content: '保存成功',
                      showCancel: false
                    })
                  }
                })
              }
            }
          })
        }
      })
    },
    showSigin: function() {
        wx.navigateTo({
            url: "../sigin/sigin"
        });
    },
    sendPushTime: function() {
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/signinRemind",
            data: {
                token: wx.getStorageSync("token")
            },
            success: function(t) {
                $this.data.sigin.is_remind = 1, $this.setData({
                    sigin: $this.data.sigin
                });
            }
        });
    },
    advjump: function(t) {
        var e = t.currentTarget.dataset.type;
        if ("upper" == e) var a = t.currentTarget.dataset.index, s = this.data.advertisement.upper[a]; else if ("ad_pop" == e) s = this.data.advertisement.ad_pop; else s = this.data.advertisement.home_middle;
        2 == s.type && wx.navigateTo({
            url: s.path,
            fail: function(t) {
                wx.switchTab({
                    url: s.path
                });
            }
        });
    },
    goodsDetails: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.etype, s = 2 == a || 3 == a ? "../goods/goods?id=" : "../currencyGoods/currencyGoods?id=";
      console.log('=======================商品跳转链接========================')
      console.warn(s + e)
      console.log('=======================商品跳转链接========================')
        wx.navigateTo({
            url: s + e
        });
    },
    shareGoods: function() {
        var t = this.data.give_step.goods.id;
        wx.navigateTo({
            url: "../goods/goods?id=" + t
        });
    },
    gotoproblem: function() {
        wx.navigateTo({
            url: "../question/question?a=currency"
        });
    }
});