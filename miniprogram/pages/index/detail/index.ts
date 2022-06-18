// pages/index/detail/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    house: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) { 
    var house=JSON.parse(option.house)
    console.log(house)
    // console.log(option)
    this.setData({
      house: house
    })
    // wx.request({

    // })
    //   console.log(option.house_id)
  },
jump2(index){
  var house=index.currentTarget.dataset.name
  var house=JSON.stringify(index.currentTarget.dataset.name)
  wx.navigateTo({
    url:"/pages/index/detail/reserve/index?house="+house
  })
},
jump3(){
  wx.navigateTo({
    url:"/pages/index/detail/rent/index"
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