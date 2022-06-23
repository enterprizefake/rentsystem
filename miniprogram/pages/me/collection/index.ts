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
  jump1(index) {
    var house=index.currentTarget.dataset.name
    
    console.log(house)
    var house1={address:null}
    house1.address=house.address
    house1.audit_id=house.audit_id
    house1.h_detail=house.h_detail
    house1.h_id=house.h_id
    house1.h_latitude=house.h_latitude
    house1.h_longitude=house.h_longitude
    house1.h_name=house.h_name
    house1.h_state=house.h_state
    house1.max_relettime=house.max_relettime
    house1.max_renttime=house.max_renttime
    house1.phone=house.phone
    house1.picture_number=house.picture_number
    house1.price=house.price
    console.log(house1)
    var house2=JSON.stringify(house1)
    console.log(house2)
    //const newhouse = JSON.stringify(house);
    wx.navigateTo({
      url: "/pages/index/detail/index?house"+house2
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
       // console.log(this.data.all_collections[1].h_id)
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