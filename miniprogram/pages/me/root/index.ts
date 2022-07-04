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
    developers: null,
    roots: null,
    me: null,
    now_index: null,
    show_list: false,
    top: null,
    top_index: 'me'
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
    var query = wx.createSelectorQuery()
    query.select('#top').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec((res) => {
      this.setData({
        top: res[0].top
      })
      console.log(res[0].top)
    });
    wx.request({
      url: "http://1.15.184.52:8086/root/audits",
      method: "POST",
      header: { "content-type": "application/json" },
      success: (res) => {
        this.setData({
          audits: res.data.audits
        })
      }
    });

    wx.request({
      url: "http://1.15.184.52:8086/root/audited",
      method: "POST",
      header: { "content-type": "application/json" },
      data: {
        phone: app.globalData.user.phone
      },
      success: (res) => {
        this.setData({
          audited: res.data.audited
        })
        // console.log("audited:" + res.data)
      }

    });

    wx.request({
      url: "http://1.15.184.52:8086/root/allusers",
      method: "POST",
      header: { "content-type": "application/json" },
      data: {
        phone: app.globalData.user.phone
      },
      success: (res) => {
        // console.log(res.data)
        var list = res.data.user_list;
        var temp = list['#'];
        delete list['#']
        list['#'] = temp
        this.setData({
          user_list: list,
          me: res.data.me,
          roots: res.data.roots,
          developers: res.data.developers
        })
      }

    });
  },
  turn(v) {
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
      user_list: ls
    });
    wx.request({
      url: "http://1.15.184.52:8086/root/alterroots",
      method: 'POST',
      header: { "content-type": "application/json" },
      data:
      {
        roots: temp_roots,
        myphone: this.data.me.phone,
        developers: this.data.developers
      },
      success: (res) => {
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
      url: "http://1.15.184.52:8086/root/alterroots",
      method: 'POST',
      header: { "content-type": "application/json" },
      data:
      {
        roots: this.data.roots,
        myphone: this.data.me.phone,
        developers: this.data.developers
      },
      success: (res) => {
        console.log(res.data)
        this.onShow();
      }
    });
  },
  show_list(v) {
    if (v.detail.index == 2) {
      this.setData({
        show_list: true
      })
    }
    else {
      this.setData({
        show_list: false
      })
    }
  },
  inid(id) {
    var query = wx.createSelectorQuery()
    query.select('#' + id).boundingClientRect()
    query.selectViewport().scrollOffset()
    return new Promise((resolve) => {
      query.exec((res) => {
        console.log(res);
          if ((res[0].top - this.data.top <= 0) && (res[0].bottom - this.data.top >= 0)) {
            resolve(true);
          }
          else {
            resolve(false);
          }
      });
    })
  },
  async scroll() {
    if (await this.inid('me')) {
      this.setData({
        top_index: 'me'
      })
    }
    else if(this.data.roots.length && await this.inid('roots')) 
    {
        this.setData({
          top_index: 'roots'
        })
    }
    else {
      for (var i in this.data.user_list) {
        if(i=='#') i='all';
        if (await this.inid(i)) {
          this.setData({
            top_index: i
          });
        };
      };
    };

  }
})