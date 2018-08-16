const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 请求数据,需传入完整的url
function gk_get(url, dosomething) {
  wx.request({
    url: url,
    data: [],
    success: function (res) {
      dosomething(res)
    }
  })
}

/**
 * POST请求，用于获取数据或提交数据
 */
// application/json默认值
function gk_post(posturl, params, dosomething, complete) {

  wx.request({
    url: posturl,
    data: params,
    header: {
      'content-type': 'application/json'
    },
    method: 'POST',
    success: function (res) {
      dosomething(res)
    },
    fail: function (err) {
      gk_showModal('请求失败', err.errMsg)
      return 0
    },
    complete: function () {
      complete()
    }
  })
}

// 加载成功提示
function gk_success(str) {
  wx.showToast({
    title: str,
    icon: 'success',
    duration: 1500
  })
}

// 加载提示
function gk_loading() {
  wx.showLoading({
    title: '玩命加载中...',
  })
}

// 隐藏加载提示
function gk_hideLoading() {
  wx.hideLoading()
}

// 提示框
function gk_showModal(title, content, showCancle) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: showCancle,
  })
}

// 判断字符串是否为空，用于在POST请求前对输入框输入的内容就行检查
function gk_isempty(str) {
  var newstr = str.replace("/(^\s*)|(\s*$)/g", "")

  return newstr.length
}

function gk_noEmptyStr(str) {
  var newstr = str.replace("/(^\s*)|(\s*$)/g", "")

  return newstr
}

module.exports = {
  formatTime: formatTime,
  gk_get: gk_get,
  gk_post: gk_post,
  gk_success: gk_success,
  gk_loading: gk_loading,
  gk_showModal: gk_showModal,
  gk_isempty: gk_isempty,
  gk_noEmptyStr: gk_noEmptyStr
}
