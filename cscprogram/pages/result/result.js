// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareImage:'',
    startx:35,
    starty:250
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
    this.drawShareImage()
  },

  /**
   * 预览图片
   */
  lookAt:function(){
    let url = this.data.shareImage
    wx.previewImage({
      urls: [url]
    })
  },

  /**
   * 渲染
   */
  drawShareImage:function(){
    wx.showLoading({
      title: '加载中...',
    })

    //背景图
    let back = '/images/back.jpg'

    // 小程序码,待处理
    let minicode = '/images/minicode.jpg'

    // 发生的大事
    let dsq = wx.getStorageSync('dsq')

    // 年份
    let year = wx.getStorageSync('year') + '年'

    // 昵称
    let nickname = wx.getStorageSync('nickname')
    if(nickname == ''){
      nickname = '后米米米米'
    }

    // 用于在回调函数中设置
    let that = this

    // 渲染背景图
    let ctx = wx.createCanvasContext('share', this)
    ctx.drawImage(back,0,0,750,1334)

    // 渲染年份
    ctx.setFillStyle('white')
    ctx.setFontSize(55)
    ctx.fillText(year,50,100)

    // 如果还没有相关年份的大事，则渲染另外一句话（优化体验）
    ctx.setFontSize(40)
    ctx.setTextAlign('left')

    if(dsq.length == 0){
      // 开始渲染的位置
      let mystartx = this.data.startx
      let mystarty = this.data.starty
      ctx.fillText('这一年除了你出生，没再有大事发生！', mystartx, mystarty)
    }

    // 随机抽出来3个大事件（小于等于3）
    let newArr = []
    if (dsq.length > 3){
      // 随机抽出3个大事件组成newArr
      newArr = that.getRandArr(dsq,3)
      
    }else{
      newArr = dsq
    }

    // 渲染字
    for (let i = 0; i < newArr.length;i++){
      
      let currentText = ''
      let text = newArr[i]
      let rows = Math.ceil(text.length / 17.0)
      console.log('rows=' + rows)
      for (let k = 0; k < rows; k++) {

        // 开始渲染的位置
        let startx = this.data.startx
        let starty = this.data.starty
        
        currentText = text.substr((k * 17), 17)
        ctx.fillText(currentText, startx, starty)
        console.log('k=' + k + ',currentText=' + currentText)

        if (k != rows-1) {
          that.setData({
            starty: starty + 50
          })
        } else {
          that.setData({
            starty: starty + 100
          })
        }
      }
    }

    /**
     * 渲染底部的信息
     */
    let color = 'rgba(255, 255, 255, 0.15)'
    ctx.setFillStyle(color)
    ctx.fillRect(0,1194,750,140)

    // 渲染小程序码
    ctx.drawImage(minicode,612,1205,118,118)

    // 渲染昵称
    ctx.setFillStyle('white')
    ctx.setFontSize(40)
    ctx.setTextAlign('left')
    ctx.setTextBaseline('top')
    ctx.fillText(nickname, 30, 1205)

    // 渲染昵称下的那行字
    ctx.setFontSize(30)
    if (dsq.length == 0) {
      ctx.fillText('出生这一年，并没有什么大事发生！ > 。<', 30, 1265)
    }else{
      ctx.fillText('出生这一年，发生了这些大事。', 30, 1265)
    }
    
    // 导出为图片
    ctx.draw(false,function(res){
      wx.canvasToTempFilePath({
        canvasId: 'share',
        x:0,
        y:0,
        width:750,
        height:1334,
        destWidth:750,
        destHeight:1334,
        success:e=>{
          // console.log(e)
          that.setData({
            shareImage:e.tempFilePath
          })
          wx.hideLoading()
        }
      }, this)
    })
  },

  /**
   * 随机返回数组的n个元素
   */
  getRandArr: function (infodata, len = 3) {

    // let infodata = this.data.tagsInfo
    let newsrr = []
    for (let i = 0; i < len; i++) {

      var ran = Math.floor(Math.random() * infodata.length);

      newsrr.push(infodata[ran]);

      var center = infodata[ran];

      infodata[ran] = infodata[infodata.length - 1];

      infodata[infodata.length - 1] = center;

      infodata = infodata.slice(0, infodata.length - 1);
      // infodata = infodata.pop()
    }

    return newsrr
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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