// pages/me/index.ts
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user_type: "tenant",
    user: null,
    user_name: null,
    phone: null
  },
  login() {
    app.login()
  },
  change() {
    if (this.data.user_type == "tenant") {
      this.setData({
        user_type: "landlord"
      })
    }
    else {
      this.setData({
        user_type: "tenant"
      })
    }
  },
  onShow() {
    this.setData({
      user: app.globalData.user
    })
  },
  jump1() {
    wx.navigateTo({
      url: "/pages/me/myinfo/index"
    })
  },
  jump2() {
    wx.navigateTo({
      url: "/pages/me/order/index?user_type=" + this.data.user_type
    })
  },
  jump3() {
    wx.navigateTo({
      url: "/pages/me/collection/index"
    })
  },
  jump4() {
    wx.navigateTo({
      url: "/pages/me/rent/index"
    })
    
  },
  jump5() {
    wx.navigateTo({
      url: "/pages/me/delrent/index"
    })
  },
  jump6() {
    wx.navigateTo({
      url: "/pages/me/bookmanage/index"
    })
  },
  jump7() {
    wx.navigateTo({
      url: "/pages/me/root/index"
    })
  },
  jump8() {
    wx.navigateTo({
      url: "/pages/me/message/index?user_type=" + this.data.user_type
    })
  }
})