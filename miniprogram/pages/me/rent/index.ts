// pages/me/rent/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    new_address:null,
    new_detail:null,
    new_altitude:null,
    new_longitude:null,
    new_name:null,
    new_phone:null,
    new_price:null,
    max_relettime: null,
    max_renttime: null,
    new_picture:[]
  },
getmax_relettime(index)
{
  console.log(index.detail)
  this.setData({
    max_relettime:index.detail
  })
},
getmax_renttime(index)
{
  console.log(index.detail)
  this.setData({
    max_renttime:index.detail
  })
},
  rentnew(index)
  {
  console.log(this.data)
  wx.request({
    url:'http://127.0.0.1:8086/landlord/rentnew',
    method:'POST',
    data:{
    address:this.data.new_address,
    h_detail:this.data.new_detail,
    h_latitude:this.data.new_altitude,
    h_longitude:this.data.new_longitude,
    h_name:this.data.new_name,
    max_relettime: this.data.max_relettime,
    max_renttime: this.data.max_renttime,
    phone: this.data.new_phone,
    price: this.data.new_price,
    pictures:this.data.new_picture
    },
    success: (res) => {
      var datas = res.data
      if (datas.sucess == 'no') {
        wx.showToast({
          title: '提交失败',
          icon: 'none'
        })
        console.log("???")
      }
      else {
      console.log("ok")
      wx.showToast({
        title: '提交成功',
        icon: 'none'
      })
    this.setData({
      new_address:null,
      new_detail:null,
      new_altitude:null,
      new_longitude:null,
      new_name:null,
      new_phone:null,
      new_price:null,
      max_relettime: null,
      max_renttime: null,
      new_picture:[]
    })
     // console.log(this.data.all_collections[1].h_id)
      }
    },
  })
  },
  getphone(index)
  {
  this.setData({
    new_phone:index.detail
  })
  },
  getaddress(index)
  {
this.setData({
  new_address:index.detail
})
  },
  getdetail(index)
  {
this.setData({
  new_detail:index.detail
})
  },
  getlatitude(index)
  {
this.setData({
  new_latitude:index.detail
})
  },
  getlongitude(index)
  {
this.setData({
  new_longitude:index.detail
})
  },
  getname(index)
  {
this.setData({
  new_name:index.detail
})
  },
  getprice(index)
  {
this.setData({
  new_price:index.detail
})
  },
  getpicture(index)
  {
this.setData({
  new_picture:index.detail
})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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