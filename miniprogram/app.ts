App<IAppOption>({
  globalData: {
    user: null,
    temp_user: null
  },
  login() {
    var temp_user = null
    wx.getUserProfile({
      desc: '用于登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        temp_user = res.userInfo
        wx.getLocation({
          type: 'wgs84',
          success: (res) => {
            temp_user = { ...temp_user, ...res }
            this.globalData.temp_user = temp_user
            wx.navigateTo({
              url: "/pages/login/index"
            })

          }
        })
      }
    })
  },
  onLaunch() {
    var user = wx.getStorageSync("user")
    this.globalData.user = user
    console.log("app user:" + user)
    if (user) {
      wx.request({
        url: "http://1.15.184.52:8086/login",
        method: 'POST',
        data: user,
        success: (res) => {
          if (res.data.sucess == "yes") {
            console.log("二次登录成功")
            user.type = res.data.type
            wx.setStorageSync("user", user)
            this.globalData.user = user
            console.log("this.globalData.user:" + this.globalData.user.type)
          }
          else {
            console.log("登录失败")
          }
        }
      })
    }
  }


})