// pages/me/delrent/rentdetail/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    touxiang: 'https://manager.diandianxc.com/diandianxc/mrtx.png',
    icon_r: 'https://manager.diandianxc.com/mine/enter.png',
    rentde: null,
    active: 0,
    h_id: null,
    phone:null,
    new_address: null,
    new_detail: null,
    new_latitude: null,
    new_longitude: null,
    new_name: null,
    new_price: null,
    max_relettime: null,
    max_renttime: null,
    // old_picture:[],
    new_picture: []
  },
  map() {
    console.log(this.data.new_longitude)
    wx.chooseLocation({
      longitude:this.data.new_longitude,
      latitude:this.data.new_latitude,
      success: (res) => {
        this.setData({
          new_address: res.address,
          new_longitude: res.longitude,
          new_latitude: res.latitude
        })
        console.log(res)
      }
    })

  },
  get_id(index) {
    console.log(index.detail)
    this.setData({
      new_id: index.detail
    })
  },
  getmax_relettime(index) {
    console.log(index.detail)
    this.setData({
      max_relettime: index.detail
    })
  },
  getmax_renttime(index) {
    console.log(index.detail)
    this.setData({
      max_renttime: index.detail
    })
  },
  getphone(index) {
    console.log(index.detail)
    this.setData({
      new_phone: index.detail
    })
  },
  getaddress(index) {
    console.log(index.detail)
    this.setData({
      new_address: index.detail
    })
  },
  getdetail(index) {
    console.log(index.detail)
    this.setData({
      new_detail: index.detail
    })
  },
  getname(index) {
    console.log(index.detail)
    this.setData({
      new_name: index.detail
    })
  },
  getprice(index) {
    console.log(index.detail)
    this.setData({
      new_price: index.detail
    })
  },
  afterRead(file) {
    var pl = file.detail.file;
    var temp_picture = this.data.new_picture;
    for (var i = 0; i < pl.length; i++) {
      var img = pl[i].url
      temp_picture.push({ url: img })
      console.log(temp_picture)
    }
    this.setData({
      new_picture: temp_picture
    })
  },
  delete(file) {
    console.log(file);
    var index = file.detail.index
    var temp_picture = this.data.new_picture
    temp_picture.splice(index, 1)
    console.log(temp_picture)
    this.setData({
      new_picture: temp_picture
    })
  },
  getpicture(index) {
    wx.chooseMedia({
      count: 9,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      camera: 'back',
      success(res) {
        console.log(res.tempFiles.tempFilePath)
        console.log(res.tempFiles.size)
      }
    })

    this.setData({
      new_picture: index.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var house = JSON.parse(option.rentde)
    this.setData({
      h_id: house.h_id,
      new_name:house.h_name,
      new_address:house.address,
      new_longitude:house.h_longitude,
      new_latitude:house.h_latitude,
      new_detail:house.h_detail,
      max_renttime:house.max_renttime,
      new_price:house.price,
      phone:house.phone,
      rentde: house
    })
    console.log(this.data.rentde)
    var picture_number = this.data.rentde.picture_number
    var h_id = this.data.rentde.h_id
    var temp_picture = []
    for (var i = 1; i <= picture_number; i++) {
      temp_picture.push({ url: "http://127.0.0.1:8086/static/image/" + h_id + "/" + i + ".jpg" })
    }
    this.setData({
      new_picture: temp_picture
    })


  },
  rentnew(index) {
    var temp_pictures = this.data.new_picture
    console.log("temp_pictures:" + JSON.stringify(temp_pictures))
    for (var i = 0; i < temp_pictures.length; i++) {
      try {
        var url = temp_pictures[i].url
        console.log(url)
        temp_pictures[i] = wx.getFileSystemManager().readFileSync(url, 'base64', 0)
      }
      catch (e) {

      }
    }
    console.log(temp_pictures)
    wx.request({
      url: 'http://127.0.0.1:8086/landlord/rentold',
      method: 'POST',
      data: {
        h_id: this.data.rentde.h_id,
        address: this.data.new_address,
        h_detail: this.data.new_detail,
        h_latitude: this.data.new_latitude,
        h_longitude: this.data.new_longitude,
        h_name: this.data.new_name,
        max_relettime: this.data.max_relettime,
        max_renttime: this.data.max_renttime,
        price: this.data.new_price,
        pictures: temp_pictures
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
          // console.log(this.data.all_collections[1].h_id)
        }
      },
    })
  },
  //模态框取消
  modalCancel() {
    wx.showToast({
      title: '取消提交',
      icon: 'none'
    })
    this.setData({
      modalHidden: true,
    })
  },
  //模态框确定
  modalConfirm: function (e) {
    this.setData({
    })
    wx.showToast({
      title: '提交成功',
      icon: 'success'
    })
    this.setData({
      modalHidden: true
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
    //console.log(this.data.rentde)
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