// pages/me/bookmanage/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
  all_booking:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var app = getApp()
    wx.showLoading(
      {
        title: '加载数据中'
      }
    )
    wx.request({
      // url: 'http://1.15.184.52:8086/index',
      url: 'http://127.0.0.1:8086/landlord/book',
      method:"POST",
      data: {
        phone:1
      },
      success: (res) => {
        var datas = res.data
        console.log(datas)
        if (datas.sucess == 'no') {
          console.log("???")
        }
        else {
          this.setData({
            all_booking:datas.bookings
          })
          //console.log(this.data.all_booking)
        }
        wx.hideLoading()
      },
      fail(e) {
        console.log(e)
      }
    })
  },
 book_agree(index){
  var app = getApp()
  var booking = index.currentTarget.dataset.name
  //var house = JSON.stringify(index.currentTarget.dataset.name)
  console.log(booking.booking_id)
  wx.request({
    // url: 'http://1.15.184.52:8086/index',
    url: 'http://127.0.0.1:8086/landlord/bookcheck',
    method: 'POST',
    data: {
      phone:booking.phone,
      booking_id:booking.booking_id,
      booking_state:'预约成功',
      reply:'无',
    },
    success: (res) => {
      var datas = res.data
      console.log(res)
     // console.log(datas)
      if (datas.sucess == 'no') {
        console.log("h_id:"+this.data.house.h_id)
        console.log("???")
      }
    },
  })
  this.onLoad();  
 },
 book_refuse(index){
  var app = getApp()
  var booking = index.currentTarget.dataset.name
  //var house = JSON.stringify(index.currentTarget.dataset.name)
  console.log(booking.booking_id)
  wx.request({
    // url: 'http://1.15.184.52:8086/index',
    url: 'http://127.0.0.1:8086/landlord/bookcheck',
    method: 'POST',
    data: {
      phone:booking.phone,
      booking_id:booking.booking_id,
      booking_state:'预约失败',
      reply:'无',
    },
    success: (res) => {
      var datas = res.data
      console.log(res)
     // console.log(datas)
      if (datas.sucess == 'no') {
        console.log("h_id:"+this.data.house.h_id)
        console.log("???")
      }
    },
  }) 
  this.onLoad(); 
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