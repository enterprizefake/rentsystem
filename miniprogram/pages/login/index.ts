// pages/login/index.ts
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name: null,
    phone: null,
    e1: null,
    e2: null
  },
  check1() {
    if (!this.data.user_name) {
      this.setData({
        e1: "用户名不能为空"
      })
      return false
    }
    else {
      this.setData({
        e1: null
      })
      return true
    }
  },
  check2() {
    var n = this.data.phone
    if (!n) {
      this.setData({
        e2: "手机号不能为空"
      })
      return false
    }
    else if (n.length < 11) {
      this.setData({
        e2: "手机号错误"
      })
      return false
    }
    else {
      this.setData({
        e2: null
      })
      return true
    }
  },
  commit() {
    if (this.check1() && this.check2()) {
      app.globalData.user = {
        ...app.globalData.user,
        "user_name": this.data.user_name,
        "phone": this.data.phone
      }

      wx.setStorageSync("user", app.globalData.user)
      wx.navigateBack({
        delta: 1
      })

    }

  }

})