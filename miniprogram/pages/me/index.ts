// pages/me/index.ts
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user_type: "tenant",
    user: null,
    root: true,
    user_name:null,
    phone:null
  },
  login() {

    wx.getUserProfile({
      desc: '用于登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          user:res.userInfo
        })
        wx.getLocation({
          type: 'wgs84',
          success: (res)=> {
            this.setData({
              user:{...this.data.user,...res}
            })
            console.log(this.data.user)

            wx.navigateTo({
              url:"pages/login/index"
            })
            
            wx.setStorageSync("user",this.data.user)
          }
         })
        console.log(this.data.user)
      }
    })


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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    console.log(app.globalData.user)
    var user = wx.getStorageSync("user")
    if (user) {
      this.setData({
        user: user
      })
    }

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
      url: "/pages/me/audited/index"
    })
  },
  jump8() {
    wx.navigateTo({
      url: "/pages/me/audit/index"
    })
  },
  jump9() {
    wx.navigateTo({
      url: "/pages/me/message/index?user_type=" + this.data.user_type
    })
  }
})