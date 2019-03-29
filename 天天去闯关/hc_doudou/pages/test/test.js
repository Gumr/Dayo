Page({
    data: {
        text: "①这是一条会滚①这是一",
        marqueePace: 1,
        marqueeDistance: 0,
        marqueeDistance2: 0,
        marquee2copy_status: !1,
        marquee2_margin: 60,
        size: 14,
        orientation: "left",
        interval: 20
    },
    onShow: function() {
        var a = this;
        console.log(a.data.text.length);
        var e = a.data.text.length * a.data.size, t = wx.getSystemInfoSync().windowWidth;
        a.setData({
            length: e,
            windowWidth: t,
            marquee2_margin: e < t ? t - e : a.data.marquee2_margin
        }), a.run1();
    },
    run1: function() {
        var a = this, e = setInterval(function() {
            -a.data.marqueeDistance < a.data.length ? a.setData({
                marqueeDistance: a.data.marqueeDistance - a.data.marqueePace
            }) : (clearInterval(e), a.setData({
                marqueeDistance: a.data.windowWidth
            }), a.run1());
        }, a.data.interval);
    },
    run2: function() {
        var a = this, e = setInterval(function() {
            -a.data.marqueeDistance2 < a.data.length ? a.setData({
                marqueeDistance2: a.data.marqueeDistance2 - a.data.marqueePace,
                marquee2copy_status: a.data.length + a.data.marqueeDistance2 <= a.data.windowWidth + a.data.marquee2_margin
            }) : (-a.data.marqueeDistance2 >= a.data.marquee2_margin ? (a.setData({
                marqueeDistance2: a.data.marquee2_margin
            }), clearInterval(e)) : (clearInterval(e), a.setData({
                marqueeDistance2: -a.data.windowWidth
            })), a.run2());
        }, a.data.interval);
    }
});