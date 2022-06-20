// pages/me/index.ts
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user_type:"tenant",
    user:null,
    root:false
  },
  login()
  {
     app.login()
     this.setData({
       user:app.globalData.user
     })

  },
  change() {
    if(this.data.user_type=="tenant")
    {
      this.setData({
        user_type:"landlord"
      })
    }
    else{
      this.setData({
        user_type:"tenant"
      })
    }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      user:app.globalData.user
    })
    // var user=wx.getStorageSync("user")
    // console.log("user"+user.avatarUrl)
    // console.log("user:"+user)
    // if(user)
    // {
    //   this.setData({
    //     user: user
    //   })
    // }
  },

jump1()
{
  wx.navigateTo({
    url:"/pages/me/myinfo/index"
  })
}
})