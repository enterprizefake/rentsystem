// pages/me/collection/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
  all_collections:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },
  jump1() {
    wx.navigateTo({
      url: "/pages/me/myinfo/index"
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
    wx.showLoading(
      {
        title: '加载数据中'
      }
    )
    var app = getApp()
    wx.request({
      // url: 'http://1.15.184.52:8086/index',
      url: 'http://127.0.0.1:8086/tenants/collections',
      method:"POST",
      data: {
      phone:app.globalData.user.phone
      },
      success: (res) => {
        var datas = res.data
        console.log(datas)
        if (datas.sucess == 'no') {
          console.log("???")
        }
        else {
        this.setData({
          all_collections:datas.collections
        })
        console.log(this.data.all_collections[1].h_id)
        }
        wx.hideLoading()
      },
      fail(e) {
        console.log(e)
      }
    })
    // wx.request({
    //   url: 'http://127.0.0.1:8086/index/detail',
    //   method:"POST",
    //   data: {
    //   h_id:this.data.all_collections.h_id
    //   },
    //   success: (res) => {
    //     var datas = res.data
    //     console.log(datas)
    //     if (datas.sucess == 'no') {
    //       console.log("???")
    //     }
    //     else {
    //     }
    //     wx.hideLoading()
    //   },
    // })
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