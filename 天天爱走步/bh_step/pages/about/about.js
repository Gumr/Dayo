var that, _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}
var $this;
Page({
    data: {
      qrcoeSrc:'./images/qrcode.jpg',
      wxid:'19925489025'
    },
    onLoad: function(t) {
      $this = this
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    saveImg(){
      wx.authorize({
        scope:'scope.writePhotosAlbum',
        success(){
          wx.saveImageToPhotosAlbum({
            filePath: `bh_step/pages/about/images/qrcode.jpg`,
            success: function (e) {
              console.log(e);
              wx.showToast({
                title: '图片保存成功',  
                icon: 'success'
              })
            },
            fail: function (e) {
              console.log(e);
            }
          });
        },
        fail: function (e) {
          wx.showModal({
            title:'授权',
            content: '请授权小程序将图片保存至相册',
            success(res) {
              if (res.confirm) {
                wx.openSetting()
              }
            }
          })
        }
      })
    },
    copyText(){
      wx.setClipboardData({
        data: $this.data.wxid,
        complete(data){
          console.log(data)
        }
      })
    }
});