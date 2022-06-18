// pages/index/index.ts
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    all_houses: null,
    list:null
  },
  to_detail(index){
    var house=index.currentTarget.dataset.name
    var house=JSON.stringify(index.currentTarget.dataset.name)
    wx.navigateTo({
      url:"/pages/index/detail/index?house="+house
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(option) {
    var house=JSON.parse(option.house)
    console.log(house)
    // console.log(option)
    this.setData({
      house: house
    })


    // wx.getStorageInfoSync
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