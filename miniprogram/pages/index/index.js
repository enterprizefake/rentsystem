// pages/index/index.ts
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    all_houses: null,
    list:null
  },
  to_detail(index){

    wx.navigateTo({
      url:"/pages/index/detail/index?house="+JSON.stringify(index.currentTarget.dataset.name)
    })
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
    wx.request({
      // url: 'http://1.15.184.52:8086/index',
      url: 'http://127.0.0.1:8086/index',
      data: {

      },
      
      success: (res) => {
        var datas = res.data
       // console.log(datas)
        if (datas.sucess == 'no') {
          console.log("???")
        }
        else {

          this.setData({
            all_houses: datas.house
          })
          var p=datas.house
          console.log(p);
          p.sort(
            (a,b)=>  (a.price)-(b.price)  
          );
          this.setData({
            list:p.splice(0,3)
          })
          
          console.log(this.data.list);
          //console.log(this.data.all_houses)
        }
        wx.hideLoading()
      },
      fail(e) {
        console.log(e)
      }
    })
  },


})