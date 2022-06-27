var app=getApp()
Page({
  data: {
    active: 0,
    new_address: null,
    new_detail: null,
    new_latitude: null,
    new_longitude: null,
    new_name: null,
    new_phone: null,
    new_price: null,
    max_relettime: null,
    max_renttime: null,
    new_picture: []
  },
  map() {
    wx.chooseLocation({
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
  rentnew(index) {
    var temp_pictures = this.data.new_picture
    for (var i = 0; i < temp_pictures.length; i++) {
      var url = temp_pictures[i].url
      console.log(url)
      temp_pictures[i] = wx.getFileSystemManager().readFileSync(url, 'base64', 0)
    }

    wx.request({
      url: 'http://127.0.0.1:8086/landlord/rentnew',
      method: 'POST',
      data: {
        address: this.data.new_address,
        h_detail: this.data.new_detail,
        h_latitude: this.data.new_latitude,
        h_longitude: this.data.new_longitude,
        h_name: this.data.new_name,
        max_relettime: this.data.max_relettime,
        max_renttime: this.data.max_renttime,
        phone: this.data.new_phone,
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
          this.setData({
            new_address: null,
            new_detail: null,
            new_altitude: null,
            new_longitude: null,
            new_name: null,
            new_phone: null,
            new_price: null,
            max_relettime: null,
            max_renttime: null,
            new_picture: []
          })
          // console.log(this.data.all_collections[1].h_id)
        }
      },
    })
  },
  getphone(index) {
    this.setData({
      new_phone: index.detail
    })
  },
  getaddress(index) {
    this.setData({
      new_address: index.detail
    })
  },
  getdetail(index) {
    this.setData({
      new_detail: index.detail
    })
  },
  getname(index) {
    this.setData({
      new_name: index.detail
    })
  },
  getprice(index) {
    this.setData({
      new_price: index.detail
    })
  },
  afterRead(file) {
    console.log("file:"+JSON.stringify(file))
    var pl=file.detail.file;
    var temp_picture = this.data.new_picture;
    for(var i=0;i<pl.length;i++)
    {
      var img = pl[i].url
      temp_picture.push({ url: img })
      console.log(temp_picture)
    }
    this.setData({
      new_picture: temp_picture
    })
  },
  delete(file) {
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
  onLoad() {
    this.setData({
      new_phone:app.globalData.user.phone
    })
  }
})