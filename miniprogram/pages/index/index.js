// pages/index/index.ts
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: null,
    price_list: null,
    new_list: null,
    near_list: null,
    user: null
  },
  onChange(v) {
    var index = v.detail.index
    if (index == 2) {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: 'http://1.15.184.52:8086/index',
        method: 'POST',
        data:
        {
          longitude: this.data.user.longitude,
          latitude: this.data.user.latitude
        },
        success: (res) => {
          this.setData({
            near_list: res.data.house
          })
          console.log(res.data.house)
          wx.hideLoading()
        }
      });
    }
  },
  to_detail(index) {
    wx.navigateTo({
      url: "/pages/index/detail/index?house=" + encodeURIComponent(JSON.stringify(index.currentTarget.dataset.name))
    })
  },
  onShow() {
    wx.showLoading(
      {
        title: '加载数据中'
      }
    )
    this.setData({
      user: app.globalData.user
    })
    wx.request({
      url: 'http://1.15.184.52:8086/index',
      method: 'GET',
      success: (res) => {
        if (res.data.sucess == 'no') {
          console.log("???")
        }
        else {
          var p = res.data.house.slice(0)
          p.sort(
            (a, b) => (a.price) - (b.price)
          );
          var n = res.data.house.slice(0)
          n.sort(
            (a, b) => {
              if (a.public_time > b.public_time) return -1;
              if (a.public_time < b.public_time) return 1;
              return 0;
            }
          )

          this.setData({
            list: p.slice(0).splice(0, 3),
            price_list: p,
            new_list: n
          });
          wx.request({
            url: 'http://1.15.184.52:8086/index',
            method: 'POST',
            data:
            {
              longitude: this.data.user.longitude,
              latitude: this.data.user.latitude
            },
            success: (res) => {
              this.setData({
                near_list: res.data.house
              })
            }
          });

        }
        wx.hideLoading()
      },
      fail(e) {
        console.log(e)
      }
    })
  },


})