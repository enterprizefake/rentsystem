// app.ts
App<IAppOption>({
  globalData: {
    user: null
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
            wx.navigateTo({
              url: "/pages/login/index",
              success: (res) => {
                this.globalData.user = temp_user
              }
            })

          }
        })
      }
    })
  },
  onLaunch() {
    const user = wx.getStorageSync('user')
    if (user) {
      this.globalData.user = user
    }
  },
})