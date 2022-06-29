import Dialog from "../../../miniprogram_npm/@vant/weapp/dialog/dialog"
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    house: null,
    t_id:null,
    iscollect: true,
    all_collections: null,
    markers: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var house1 = JSON.parse(decodeURIComponent(option.house))
    this.setData
      ({
        markers: [
          {
            id: house1.h_id,
            longitude: house1.h_longitude,
            latitude: house1.h_latitude,
            iconPath: '../../image/首页/详情/地图.png'
          }
        ],
        t_id:house1.h_id
      });
    wx.showLoading(
      {
        title: '加载数据中'
      }
    )
    console.log(house1.h_id)
    var app = getApp()
    wx.request({
      // url: 'http://1.15.184.52:8086/index',
      url: 'http://1.15.184.52:8086/index/detail',
      method: "POST",
      data: {
        h_id: house1.h_id
      },
      success: (res) => {
        var datas = res.data
        this.setData
          ({
            markers: [
              {
                id: datas.house.h_id,
                longitude: datas.house.h_longitude,
                latitude: datas.house.h_latitude,
                iconPath: '../../image/首页/详情/地图.png'
              }
            ]
          });
        if (datas.sucess == 'no') {
          console.log("???")
        }
        else {
          this.setData({
            house: datas.house
          })
          console.log(this.data.house)
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
        url: 'http://1.15.184.52:8086/index/detail/collection',
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
        url: 'http://1.15.184.52:8086/index/detail/cancelcollection',
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
    console.log(this.data.t_id)
    wx.request({
      // url: 'http://1.15.184.52:8086/index',
      url: 'http://1.15.184.52:8086/index/detail',
      method: "POST",
      data: {
        h_id: this.data.t_id
      },
      success: (res) => {
        var datas = res.data
        this.setData
          ({
            markers: [
              {
                id: datas.house.h_id,
                longitude: datas.house.h_longitude,
                latitude: datas.house.h_latitude,
                iconPath: '../../image/首页/详情/地图.png'
              }
            ]
          });
        if (datas.sucess == 'no') {
          console.log("???")
        }
        else {
          this.setData({
            house: datas.house
          })
          console.log(this.data.house)
        }
        wx.hideLoading()
      },
    
    })
    wx.request({
      url:"http://127.0.0.1:8086/tenants/collections",
      method:"POST",
      data:{
        
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