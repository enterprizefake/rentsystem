var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    audits: null,
    audited: null,
    card: 'card'
  },
  check(index) {
    wx.navigateTo({
      url: "/pages/me/root/check/index?type=audits&data=" + encodeURIComponent(JSON.stringify(index.currentTarget.dataset.name))
    })
  },
  check1(index) {
    wx.navigateTo({
      url: "/pages/me/root/check/index?type=audited&data=" + encodeURIComponent(JSON.stringify(index.currentTarget.dataset.name))
    })

  },
  onLoad() {
    wx.request({
      url: "http://127.0.0.1:8086/root/audits",
      method: "POST",
      success: (res) => {
        this.setData({
          audits: res.data.audits
        })
        console.log(res.data.audits)
      }
    });

    wx.request({
      url: "http://127.0.0.1:8086/root/audited",
      method: "POST",
      data: {
        phone: app.globalData.user.phone
      },
      success: (res) => {
        this.setData({
          audited: res.data.audited
        })
        console.log("audited:" + res.data)
      }

    })
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