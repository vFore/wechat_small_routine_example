var subjectUtil = require('../../utils/subjectUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
    movies: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMovie();
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

  },
  detail: function (e) {
    getApp().detail(e);
  },
  
  loadMovie: function () {
    var page = this;
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/top250',
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        
        // if (res.data.code != 20) {
        //   page.setData({ movies: [], hidden: true });
        // } else {
          var subjects = res.data.subjects;
          subjectUtil.processSubjects(subjects);
          page.setData({ movies: subjects, hidden: true });
        // }
        
      }
    })
  }
})