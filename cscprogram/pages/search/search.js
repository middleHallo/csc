// pages/search/search.js

const AV = require('../../utils/leancloud.js');
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year:'',
    nickname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 年份
   */
  addYaer:function(e){
    this.setData({
      year:e.detail.value
    })
  },

  /**
   * 昵称
   */
  addNickName:function(e){
    this.setData({
      nickname: e.detail.value
    })
  },

  /**
   * 搜索
   */
  search:function(){

    let year = this.data.year
    let intyear = parseInt(year)

    let nickname = this.data.nickname
    let nicknamelen = utils.gk_isempty(nickname)
    let newstr = utils.gk_noEmptyStr(nickname)

    if ((intyear < 1970) || isNaN(intyear) || (year.length > 4)){
      wx.showModal({
        title: '格式错误！',
        content: '请输入有效的年份格式,并且不小于1970！',
        showCancel:false
      })
      return 0
    }

    if (nicknamelen == 0){
      wx.showModal({
        title: '格式错误',
        content: '请输入昵称！',
        showCancel: false
      })
      return 0
    }

    let dsq = []
    var query = new AV.Query('Dsj');
    query.equalTo('year', year)
    query.find().then(function (results) {
      
      for(let i=0;i<results.length;i++){
        let sq = results[i].attributes.sq
        dsq.push(sq)
      }

      wx.setStorageSync('year', year)
      wx.setStorageSync('dsq', dsq)
      wx.setStorageSync('nickname', newstr)
      wx.hideLoading()
      wx.navigateTo({
        url: '/pages/result/result',
      })

    }, function (error) {

      console.log(error)
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})