// pages/me/delrent/index.ts
Page({
  data: {
    all_renthouse: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    wx.showLoading(
      {
        title: '加载数据中'
      }
    )
    var app = getApp()
    wx.request({
      // url: 'http://1.15.184.52:8086/index',
      url: 'http://127.0.0.1:8086/landlord/allold',
      method: "POST",
      data: {
        phone: app.globalData.user.phone
      },
      success: (res) => {
        var datas = res.data
        // console.log(datas)
        if (datas.sucess == 'no') {
          console.log("???")
        }
        else {
          this.setData({
            all_renthouse: datas.oldhouses
          });
        }
        wx.hideLoading()
      },
      fail(e) {
        console.log(e)
      }
    })
  },
  cancelrent(index) {
    var kkk = index.currentTarget.dataset.name
    //var kkk = JSON.stringify(index.currentTarget.dataset.name)
    console.log(kkk.h_id)
    wx.request({
      url: 'http://127.0.0.1:8086/landlord/deleteold',
      method: 'POST',
      data: {
        h_id: kkk.h_id
      },
      success: (res) => {
        var datas = res.data
        // console.log(datas)
        if (datas.sucess == 'no') {
          console.log("???")
        }
        else {
          this.onShow()
        }
      }
    })
  },
  reviserent(index) {
    /// console.log(index.currentTarget.dataset.name)
    var rentde = index.currentTarget.dataset.name
    var rentde = JSON.stringify(index.currentTarget.dataset.name)
    wx.navigateTo({
      url: "/pages/me/delrent/rentdetail/index?rentde=" + rentde
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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