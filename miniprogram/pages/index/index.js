// pages/index/index.ts
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    all_houses: null,
    list: null,
    user:null
  },
  onChange(v) {
    var index = v.detail.index
    if (index == 0) {
      var l=this.data.all_houses.slice(0)
      l.sort(
        (a, b) => (a.price) - (b.price)
      );
      this.setData({
        all_houses:l
      });
    }
    else if (index == 1) {
      var l=this.data.all_houses.slice(0)
      l.sort(
        (a, b) => { 
          if(a.public_time<b.public_time) return -1;
          if(a.public_time>b.public_time) return 1;
          return 0;
         }
      );
      this.setData({
        all_houses:l
      });
    }
    else {
      wx.request({
        url: 'http://127.0.0.1:8086/index/distance',
        method:'POST',
        data:
        {
          longitude:this.data.user.longitude,
          latitude:this.data.user.latitude
        },
        success:
        {

        }
      });
      var l=this.data.all_houses.slice(0)
      l.sort(
        (a, b) => { 

          if(a.public_time<b.public_time) return -1;
          if(a.public_time>b.public_time) return 1;
          return 0;
         }
      );
      this.setData({
        all_houses:l
      });
    }
  },
  to_detail(index) {
    wx.navigateTo({
      url: "/pages/index/detail/index?house=" + JSON.stringify(index.currentTarget.dataset.name)
    })
  },

  onShow() {
    wx.showLoading(
      {
        title: '加载数据中'
      }
    )
    this.setData({
      user:app.globalData.user
    })
    wx.request({
      url: 'http://127.0.0.1:8086/index',
      method: 'GET',
      success: (res) => {
        if (res.data.sucess == 'no') {
          console.log("???")
        }
        else {
          this.setData({
            all_houses: res.data.house
          })

          var p = res.data.house.slice(0)

          p.sort(
            (a, b) => (a.price) - (b.price)
          );

          this.setData({
            list: p.splice(0, 3)
          })

        }
        wx.hideLoading()
      },
      fail(e) {
        console.log(e)
      }
    })
  },


})