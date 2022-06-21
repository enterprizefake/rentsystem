// app.ts
App<IAppOption>({
  globalData: {
    user:null
  },
  login()
  {
      wx.getUserProfile({
        desc: '用于登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
<<<<<<< HEAD
          
            this.globalData.user=res.userInfo
          
=======
          this.globalData.user=res.userInfo           
>>>>>>> bac46cb5b8badac8dd69eec136c9b5dfba025fe5
          wx.setStorageSync("user",res.userInfo)
        }
      })
  },
  onLaunch() {
    // // 展示本地存储能力
    const user = wx.getStorageSync('user')
    if(user)
    {
      this.globalData.user=user
    }

    // // 登录
    // wx.login({
    //   success: res => {
    //     console.log(res.code)
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   },
    // })
  },
})