var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: null,
    show: null,
    card_margin: 0
  },
  onLoad(data) {
    if (data.user_type == "tenant") {
      data.user_type = "tenants"
    }
    wx.showLoading({
      title: '加载中'
    });
    wx.request({
      url: "http://127.0.0.1:8086/" + data.user_type + "/orders",
      method: 'POST',
      data: {
        phone: app.globalData.user.phone
      },
      success: (res) => {
        this.setData({
          orders: res.data.orders
        });
        wx.hideLoading()
      }
    })



  },
  to_detail(v) {
    wx.navigateTo({
      url: "/pages/index/detail/index?house=" + encodeURIComponent(JSON.stringify(v.currentTarget.dataset.name))
    })
  },
  showmore(v) {
    console.log(v.detail);
    this.setData({
      show: v.detail,
    });
  }
})