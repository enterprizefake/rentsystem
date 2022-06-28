import Dialog from "../../../miniprogram_npm/@vant/weapp/dialog/dialog"
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    house: null,
    iscollect: false,
    all_collections: null,
    markers: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var house = JSON.parse(decodeURIComponent(option.house))
    this.setData({
      house: JSON.parse(decodeURIComponent(option.house))
    });
    console.log(house)
    this.setData
      ({
        markers: [
          {
            id: house.h_id,
            longitude: house.h_longitude,
            latitude: house.h_latitude,
            iconPath: 'https://ts1.cn.mm.bing.net/th/id/R-C.f9b24466e257955c69641e405c007fcb?rik=RnZgv1%2b5i44cGg&riu=http%3a%2f%2fimg.51miz.com%2fElement%2f00%2f18%2f66%2f56%2f165b1c5f_E186656_0d203fad.png!%2fquality%2f90%2funsharp%2ftrue%2fcompress%2ftrue%2fformat%2fpng%2ffh%2f630&ehk=DjMb1DZX2AE704F%2b%2fpy60kCRy08DX4o30aXm3MUh5Dc%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1'
          }
        ]
      });
    wx.showLoading(
      {
        title: '加载数据中'
      }
    )
    var app = getApp()
    wx.request({
      // url: 'http://1.15.184.52:8086/index',
      url: 'http://127.0.0.1:8086/tenants/collections',
      method: "POST",
      data: {
        phone: app.globalData.user.phone
      },
      success: (res) => {
        var datas = res.data
        if (datas.sucess == 'no') {
          console.log("???")
        }
        else {
          this.setData({
            all_collections: datas.collections
          })
          for (var i = 0; i < this.data.all_collections.length; i++) {
            if (this.data.all_collections[i].h_id == this.data.house.h_id) {
              this.setData({
                iscollect: true
              })
            }
          }
        }
        wx.hideLoading()
      },
      fail(e) {
        console.log(e)
      }
    })
    // wx.request({

    // })
    //   console.log(option.house_id)
  },
  jump1() {
    var app = getApp()
    console.log(app.globalData.user.phone)
    if (this.data.iscollect) {
      wx.showToast({
        title: '取消收藏',
        icon: 'none'
      })

      this.setData({
        iscollect: false
      });
    }
    else {
      wx.showToast({
        title: '收藏成功',
        icon: 'none'
      })
      this.setData({
        iscollect: true
      })
    }
    if (this.data.iscollect) {
      wx.request({
        url: 'http://127.0.0.1:8086/index/detail/collection',
        method: 'POST',
        data: {
          h_id: this.data.house.h_id,
          phone: app.globalData.user.phone
        },
        success: (res) => {
          var datas = res.data
          console.log(res)
          // console.log(datas)
          if (datas.sucess == 'no') {
            console.log("h_id:" + this.data.house.h_id)
            console.log("???")
          }
        },
      })
    }
    else {
      wx.request({
        url: 'http://127.0.0.1:8086/index/detail/cancelcollection',
        method: 'POST',
        data: {
          h_id: this.data.house.h_id,
          phone: app.globalData.user.phone
        },
        success: (res) => {
          var datas = res.data
          console.log(res)
          // console.log(datas)
          if (datas.sucess == 'no') {
            console.log("h_id:" + this.data.house.h_id)
            console.log("???")
          }
        },
      })
    }
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
      wx.navigateTo({
        url: "/pages/index/detail/rent/index?house=" + JSON.stringify(index.currentTarget.dataset.name1)
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