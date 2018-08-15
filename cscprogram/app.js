//app.js
const AV = require('/utils/leancloud.js');
AV.init({
  appId: 'M7OC5g7fIHkC3ER20Oq8PvNU-gzGzoHsz',
  appKey: 'RP5hQVw0GFgpNTJxldU9DzLs',
})
// LeanCloud 应用的 ID 和 Key
App({
  
  onLaunch: function () {
    
  },
  globalData: {
    userInfo: null
  }
})