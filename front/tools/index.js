/**
 * fetch封装
 * @method myFetch
 * @param {string} url 路由地址
 * @param {object} fetchObj fetch请求对象
 * @param {object} outputObj 输出给reducers的对象
 * @param {function} dispatch redux dispatch
 */
export function myFetch(url, fetchObj, outputObj, dispatch) {
  fetchObj.credentials = 'include';  // fetch cookie
  fetch(url, fetchObj).then((response) => {
    return response.json();
  }).then((response) => {
    outputObj.payload = response;
    dispatch(outputObj);
    return response;
  });
}


/**
 * 时间格式化
 * @method dateForMoment
 * @param {int} date 时间戳
 */
export function dateFormat(date) {
  var data = date;
  var distanceMillis = new Date().getTime() - data;
  var seconds = Math.abs(distanceMillis) / 1000;
  var minutes = seconds / 60;
  var hours = minutes / 60;
  var days = hours / 24;
  var years = days / 365;
  var month = days/30;
  if (seconds < 60) {
      return '刚刚';
  } else if (minutes >1 && minutes < 60) {
      return Math.round(minutes)+'分钟前';
  } else if (1 < hours && hours < 24) {
      return Math.round(hours)+'小时前';
  } else if (24 <= hours && hours < 48) {
      return '昨天';
  } else if (48 <= hours && days < 30) {
      return Math.floor(days)+'天前';
  } else if (30 <= days && month < 12) {
      return Math.round(month)+'个月前';
  } else if (month >= 12) {
      return Math.round(years)+'年前';
  }
  return;
}
