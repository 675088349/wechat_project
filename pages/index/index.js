// index.js
// 获取应用实例
const WXAPI = require('apifm-wxapi')

const app = getApp()

Page({
  data: {
    show: true,
    curPage: 1,
    pageSize: 20,
  },
 
  onLoad() {
    this.initBanners();
    this.goodsDynamic();
    this.categories();
    this.getNotice();
  },

  getNotice () {
    var that = this
    WXAPI.noticeList({pageSize:5}).then(function (res) {
      if (res.code == 0) {
        that.setData({
          noticeList: res.data
        });
        console.log ('noticeList', res.data)
      }
    })
  },

  async categories() {
    const res = await WXAPI.goodsCategory()
    let categories = [];

    if (res.code == 0) {
      categories = res.data.filter(ele => {
        return ele.level == 1
      })
    }
    console.log('categories',categories)

    this.setData ({
      categories: categories,
      activeCategoryId: 0,
      curPage: 1
    })

    this.getGoodsList(0);
  },

  async getGoodsList (categoryId, append) {
    if (categoryId == 0) {
      categoryId = "";
    }

    wx.showLoading({
      "mask": true
    })

    const res = await WXAPI.goods({
      categoryId: categoryId,
      page: this.data.curPage,
      pageSize: this.data.pageSize
    })

    wx.hideLoading()
    if (res.code == 404 || res.code == 700) {
      let newData = {
        loadingMoreHidden: false
      }

      if (!append) {
        newData.goods = []
      }

      this.setData(newData);
      return
    }

    var goods = [];
    if (append) {
      goods = this.data.goods;
    }

    for (var i = 0; i < res.data.length; i++) {
      goods.push(res.data[i]);
    }
    console.log ('goods', goods)

    this.setData ({
      loadingMoreHidden: true,
      goods: goods,
    })
  },

  async goodsDynamic () {
    const res = await WXAPI.goodsDynamic(0)
    if (res.code == 0) {
      this.setData ({
        goodsDynamic: res.data
      })
    }
  },

  async initBanners() {
    const res = await WXAPI.banners({
      type: 'index'
    })
    console.log("banner",res);
    if (res.code == 700 || res.code == 400) {
      wx.showModal({
        title: "提升",
        content: res.msg,
        showCancel: false,
        cancelColor: 'cancelColor',
      })
    } else {
      this.setData ({
        banners: res.data
      })
    }
  },

  onShow() {

    this.setData ({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      windowHeight: app.globalData.windowHeight,
    })

  }

})
