import { formatTime } from "../../../utils/util"
var app = getApp()
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
    show: false,
    new_square: null,
    new_hasparking: '否',
    new_haslift: '否',
    new_haswc: '否',
    new_shared_housing: '否',
    new_room: null,
    room_options: [
      {
        values: ['一室', '两室', '三室', '四室', '五室']
      },
      {
        values: ['一厅', '两厅', '三厅']
      },
    ],
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
        square:this.data.new_square,
        room:this.data.new_room,
        haslift:this.data.new_haslift,
        hasparking:this.data.new_hasparking,
        haswc:this.data.new_haswc,
        shared_housing:this.data.new_shared_housing,
        public_time:formatTime(new Date()),
        pictures: temp_pictures
      },
      success: (res) => {
        var datas = res.data
        if (datas.sucess == 'no') {
          console.log(formatTime(new Date()))
          wx.showToast({
            title: '提交失败',
            icon: 'none'
          })
          console.log("???")
        }
        else {
          console.log(formatTime(new Date()))
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
            new_price: null,
            max_relettime: null,
            max_renttime: null,
            new_square: null,
            new_hasparking: null,
            new_haslift: null,
            new_haswc: null,
            new_shared_housing: null,
            new_room: null,
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
  getsquare(index) {
    this.setData({
      new_square: index.detail
    });
  },
  getroom(index) {
    this.setData({
      show: true
    });
  },
  room_confirm(index) {
    var v = index.detail.value
    var s = v[0] + v[1]
    console.log(s)
    this.setData({
      new_room: s,
      show: false
    })

  },
  room_cancel(index) {
    this.setData({
      show: false
    });
  },
  onChange(event) {
    this.setData({
      result: event.detail,
    });
  },
  haslift() {
    if (this.data.new_haslift == '是') {
      this.setData({
        new_haslift: '否'
      })
    }
    else
    {
      this.setData({
        new_haslift: '是'
      })

    }
  },
  haswc() {
    if (this.data.new_haswc == '是') {
      this.setData({
        new_haswc: '否'
      })
    }
    else
    {
      this.setData({
        new_haswc: '是'
      })

    }
  },
  hasparking() {
    if (this.data.new_hasparking == '是') {
      this.setData({
        new_hasparking: '否'
      })
    }
    else
    {
      this.setData({
        new_hasparking: '是'
      })

    }
  },
  shared_housing() {
    if (this.data.new_shared_housing == '是') {
      this.setData({
        new_shared_housing: '否'
      })
    }
    else
    {
      this.setData({
        new_shared_housing: '是'
      })

    }
  },
  afterRead(file) {
    console.log("file:" + JSON.stringify(file))
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
      new_phone: app.globalData.user.phone
    })
  }
})