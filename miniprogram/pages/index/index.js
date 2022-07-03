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
    user: null,
    price_list1: null,
    new_list1: null,
    near_list1: null,
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
        header:{  
          'content-type':'application/json'
        },
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
  search(v) {
    var price_list = this.data.price_list.slice();
    var near_list = this.data.near_list.slice();
    var new_list = this.data.new_list.slice();
    var c = v.detail;
    var pattern =RegExp(c,'i')
    if (c!='') {
      for (var i = 0; i < price_list.length; i++) {
        if ( !pattern.test(price_list[i].h_name) ) {
          price_list.splice(i, 1);
          i--;
        }
      };

      for (var i = 0; i < near_list.length; i++) {
        if (!pattern.test(near_list[i].h_name)) {
          near_list.splice(i, 1);
          i--;
        }
      };
      for (var i = 0; i < new_list.length; i++) {
        if (!pattern.test(new_list[i].h_name)) {
          new_list.splice(i, 1);
          i--;
        }
      };
      this.setData({
        price_list1: price_list,
        near_list1: near_list,
        new_list1: new_list
      })
    }
    else
    {
      this.setData({
        price_list1: price_list,
        near_list1: near_list,
        new_list1: new_list
      })
      console.log(this.data.price_list1+"45645")
    }
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
      header:{  
        'content-type':'application/json'
      },
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
            header:{  
              'content-type':'application/json'
            },
            data:
            {
              longitude: this.data.user.longitude,
              latitude: this.data.user.latitude
            },
            success: (res) => {
              this.setData({
                near_list: res.data.house
              })
              
              // 搜索结果数组
              this.setData({
                price_list1:this.data.price_list,
                near_list1:this.data.near_list,
                new_list1:this.data.new_list
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