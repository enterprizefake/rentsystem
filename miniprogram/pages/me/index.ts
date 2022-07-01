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
    phone: null,
    tenent_messages: null,
    landlord_messages: null,
    inter: null
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
  createconnect() {
    this.setData({
      inter: setInterval(
        () => {
          if (this.data.user) {
            wx.request({
              url: "http://1.15.184.52:8086/messages/unread",
              method: 'POST',
              data:
              {
                phone: this.data.user.phone
              },
              success: (res) => {
                if (res.data.sucess == 'yes') {
                  if(res.data.landlord_messages==0)
                  {
                    res.data.landlord_messages=null
                  }
                  if(res.data.tenent_messages==0)
                  {
                    res.data.tenent_messages=null
                  }
                  this.setData({
                    landlord_messages: res.data.landlord_messages,
                    tenent_messages: res.data.tenent_messages
                  })
                }
              }
            })
          }
        }, 300)
    })
  },
  destoryconnect()
  {
    clearInterval(this.data.inter)
    this.setData({
      inter:null
    })
  },
  onShow() {
    this.setData({
      user: app.globalData.user
    })
    if (this.data.user) {
      this.createconnect()
    }
  },
  onHide() {
    this.destoryconnect()
  },
  jump1() {
    // this.destoryconnect()
    wx.navigateTo({
      url: "/pages/me/myinfo/index"
    })

  },
  jump2() {
    // this.destoryconnect()
    wx.navigateTo({
      url: "/pages/me/order/index?user_type=" + this.data.user_type
    })
  },
  jump3() {
    // this.destoryconnect()
    wx.navigateTo({
      url: "/pages/me/collection/index"
    })
  },
  jump4() {
    // this.destoryconnect()
    wx.navigateTo({
      url: "/pages/me/rent/index"
    })

  },
  jump5() {
    // this.destoryconnect()
    wx.navigateTo({
      url: "/pages/me/delrent/index"
    })
  },
  jump6() {
    // this.destoryconnect()
    wx.navigateTo({
      url: "/pages/me/bookmanage/index"
    })
  },
  jump7(v) {
    wx.navigateTo({
      url: "/pages/me/root/index?root_type="+v.currentTarget.dataset.name
    })
  },
  jump8() {
    // this.destoryconnect()
    wx.navigateTo({
      url: "/pages/me/message/index?user_type=" + this.data.user_type
    })
  }
})