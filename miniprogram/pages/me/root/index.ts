var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    audits: null,
    audited: null,
    card: 'card',
    user_list: null,
    roots: null,
    me: null,
    now_index: null
  },
  check(index) {
    wx.navigateTo({
      url: "/pages/me/root/check/index?type=audits&data=" + encodeURIComponent(JSON.stringify(index.currentTarget.dataset.name))
    })
  },
  check1(index) {
    wx.navigateTo({
      url: "/pages/me/root/check/index?type=audited&data=" + encodeURIComponent(JSON.stringify(index.currentTarget.dataset.name))
    })

  },
  onShow() {
    wx.request({
      url: "http://1.15.184.52:8086/root/audits",
      method: "POST",
      success: (res) => {
        this.setData({
          audits: res.data.audits
        })
        console.log(res.data.audits)
      }
    });

    wx.request({
      url: "http://1.15.184.52:8086/root/audited",
      method: "POST",
      data: {
        phone: app.globalData.user.phone
      },
      success: (res) => {
        this.setData({
          audited: res.data.audited
        })
        console.log("audited:" + res.data)
      }

    });

    wx.request({
      url: "http://1.15.184.52:8086/root/allusers",
      method: "POST",
      data: {
        phone: app.globalData.user.phone
      },
      success: (res) => {
        console.log(res.data)
        var list = res.data.user_list;
        var temp = list['#'];
        delete list['#']
        list['#'] = temp
        this.setData({
          user_list: list,
          me: res.data.me,
          roots: res.data.roots
        })
      }

    });
  },
  turn(v) {
    console.log(v.currentTarget.dataset.name)
    this.setData({
      now_index: v.currentTarget.dataset.name
    })
  },
  add(v) {
    console.log(v.currentTarget.dataset)
    var index1 = v.currentTarget.dataset.index1;
    var index2 = v.currentTarget.dataset.index2;
    var ls = this.data.user_list;
    var root = ls[index1][index2];
    var temp_roots = this.data.roots;
    temp_roots.push(root);
    ls[index1].splice(index2, 1);
    this.setData({
      user_list:ls
    });
    wx.request({
      url:"http://1.15.184.52:8086/root/alterroots",
      method:'POST',
      data:
      {
        roots:temp_roots
      },
      success:(res)=>
      {
        console.log(res.data)
        this.onShow()
      }
    });

  },
  minus(v) {
    var i = v.currentTarget.dataset.name;
    var ls = this.data.roots;
    ls.splice(i, 1);
    this.setData({
      roots: ls
    })
    wx.request({
      url:"http://1.15.184.52:8086/root/alterroots",
      method:'POST',
      data:
      {
        roots:this.data.roots
      },
      success:(res)=>
      {
        console.log(res.data)
        this.onShow();
      }
    });
  }
})