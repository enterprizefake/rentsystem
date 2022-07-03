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
      app.globalData.temp_user = {
        ...app.globalData.temp_user,
        "user_name": this.data.user_name,
        "phone": this.data.phone
      }

      wx.request({
        url: "http://1.15.184.52:8086/login",
        method: 'POST',
        header:{  
          'content-type':'application/json'
        },
        data: app.globalData.temp_user,
        success: (res) => {
          if (res.data.sucess == "yes") {
            console.log("(清除缓存后)初次登录成功")
            app.globalData.user=app.globalData.temp_user
            app.globalData.user.type=res.data.type
            wx.setStorageSync("user", app.globalData.user)

            wx.navigateBack({
              delta: 1
            })
          }
          else
          {
            console.log("(清除缓存后)初次登录失败")
          }
        }

      })

      

    }

  }

})