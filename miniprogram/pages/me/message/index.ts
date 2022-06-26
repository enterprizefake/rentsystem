var app=getApp()
Page({
  data: {
    user_type:null,
    messages:null
  },

  onLoad(v) {
    this.setData({
      user_type:v.user_type
    })
    wx.request({
      url:"http://127.0.0.1:8086/messages",
      method:'POST',
      data:{
        phone:app.globalData.user.phone,
        user_type:this.data.user_type=='tenant'?'租客':'房东'
      },
      success:(res)=>
      {
        if(res.data.sucess=='yes')
        {
          this.setData({
            messages:res.data.messages
          })
        }
      }
    })
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