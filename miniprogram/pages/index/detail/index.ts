import Dialog from "../../../miniprogram_npm/@vant/weapp/dialog/dialog"
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    house: null,
    iscollect:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var house = JSON.parse(option.house)
    console.log(house)
    // console.log(option)
    this.setData({
      house: house
    })
    // wx.request({

    // })
    //   console.log(option.house_id)
  },
  jump1(){
    var app = getApp()
    console.log(app.globalData.user.phone)
  if(this.data.iscollect)
  {
    wx.showToast({
      title: '取消收藏',
      icon:'none'
    })
    
    this.setData({
      iscollect:false
    });
  }
  else
  {
    wx.showToast({
      title: '收藏成功',
      icon:'none'
    })
    this.setData({
      iscollect:true
    })
  }
  // if(this.data.iscollect)
  // {
  //   wx.request({
  //     url: 'http://127.0.0.1:8086/index/detail/collection',
  //     method: 'POST',
  //     data:{
  //     h_id:this.data.house.h_id
  //     }
  //   })   
  // }
  },
  jump2(index) {
    if (app.globalData.user) {
      var house = index.currentTarget.dataset.name
      var house = JSON.stringify(index.currentTarget.dataset.name)
      wx.navigateTo({
        url: "/pages/index/detail/reserve/index?house=" + house
      })
    }
    else {
      Dialog.alert({
        title: '登录提醒',
        message: '您好，请先登录',
        theme: 'round-button',
      }).then(() => {
        app.login()
        // on close
      });

    }
  },
  jump3(index) {
    if (app.globalData.user) {
      var house = index.currentTarget.dataset.name1
      var house = JSON.stringify(index.currentTarget.dataset.name1)
      wx.navigateTo({
        url: "/pages/index/detail/rent/index?house=" + house
      })
    }
    else {

      Dialog.alert({
        title: '登录提醒',
        message: '您好，请先登录',
        theme: 'round-button',
      }).then(() => {
        app.login()
        // on close
      });

    }
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