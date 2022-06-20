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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})