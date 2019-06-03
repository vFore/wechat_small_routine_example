// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionSheetItems: [],
    actionSheetIds: [],
    title: '',
    desc: '',
    leftAnimationData: {},
    rightAnimationData: {},
    leftMove: 0,
    rightMove: 0,
    leftTime: 0,
    rightTime: 0,
    src: '/assets/sound/countdown.mp3',
    voice: 0,
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
    var configs = wx.getStorageSync('configs');
    var actionSheetItems = [];
    var actionSheetIds = [];
    var first = true;
    for (var i in configs) {
      var config = configs[i];
      if (config.state) {
        if (first) {
          var desc = config.desc.replace(/@/g, config.time + ' 秒');
          this.setData({title:config.name,desc: desc, leftTime: config.time, rightTime: config.time, voice: config.voice});
          first = false;
        }
        // actionSheetItems.push({name: config.name, id: config.id});
        actionSheetItems.push(config.name);
        actionSheetIds.push(config.id);
      }
    }

    this.setData({actionSheetItems: actionSheetItems, actionSheetIds: actionSheetIds});
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
  action_sheet: function () {
    var that = this;
    // 显示操作菜单
    wx.showActionSheet({
      itemList: this.data.actionSheetItems,
      success(res) {
        that.leftStop();
        that.rightStop();
        var configs = wx.getStorageSync('configs');
        var id = that.data.actionSheetIds[res.tapIndex]
        var config = configs[id];
        var desc = config.desc.replace(/@/g, config.time + ' 秒');
        that.setData({title: config.name, desc: desc, leftTime: config.time, rightTime: config.time, voice: config.voice});
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  leftStop: function () {
    if (this.leftInterval && this.leftInterval != 0) {
      clearInterval(this.leftInterval);
    }
    this.leftInterval = 0;
    this.audioPause();
  },
  rightStop: function () {
    if (this.rightInterval && this.rightInterval != 0) {
      clearInterval(this.rightInterval);
    }
    this.rightInterval = 0;
    this.audioPause();
  },
  leftStart: function () {
    this.rightStop();
    if (this.leftInterval && this.leftInterval != 0) {
      this.leftStop();
      return false;
    }
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    animation.rotate(this.data.leftMove+=100).step()
    this.setData({leftAnimationData: animation.export()});
    var that = this;
    var leftInterval = setInterval(function () {
      animation.rotate(that.data.leftMove += 100).step()
      that.setData({leftAnimationData: animation.export()});
      if (that.data.leftTime <= that.data.voice) {
        that.audioPlay();
      }
      if (that.data.leftTime == 0) {
        that.leftStop();
        return false;
      } else {
        that.setData({ leftTime: that.data.leftTime - 1 });
      }
    }, 1000);
    this.leftInterval = leftInterval;
  },
  rightStart: function () {
    this.leftStop();
    if (this.rightInterval && this.rightInterval != 0) {
      this.rightStop();
      return false;
    }
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    animation.rotate(this.data.rightMove += 100).step()
    this.setData({
      rightAnimationData: animation.export()
    });

    var that = this;
    var rightInterval = setInterval(function () {
      animation.rotate(that.data.rightMove += 100).step()
      that.setData({
        rightAnimationData: animation.export()
      });
      if (that.data.rightTime <= that.data.voice) {
        that.audioPlay();
      }
      if (that.data.rightTime == 0) {
        that.rightStop();
        return false;
      } else {
        that.setData({ rightTime: that.data.rightTime-1});
      }
    }, 1000);
    this.rightInterval = rightInterval;
  },
  audioPlay: function () {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.src = this.data.src;
    innerAudioContext.play();
  },
  audioPause: function () {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.pause();
  }
})