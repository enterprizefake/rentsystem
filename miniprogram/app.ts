// app.ts
App<IAppOption>({
  globalData: {
    user:null
  },
  login()
  {
    wx.navigateTo({
      url:"/pages/login/index"
    })
      // wx.getUserProfile({
      //   desc: '用于登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      //   success: (res) => {
      //     this.globalData.user=res.userInfo           
      //     wx.setStorageSync("user",res.userInfo)
      //   }
      // })
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