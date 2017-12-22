/**
 * fetch封装
 * @method myFetch
 * @param {string} url 路由地址
 * @param {object} fetchObj fetch请求对象
 * @param {object} outputObj 输出给reducers的对象
 * @param {function} dispatch redux dispatch
 */
export function myFetch(url, fetchObj, outputObj, dispatch) {
  fetch(url, fetchObj).then((response) => {
    return response.json();
  }).then((response) => {
    outputObj.payload = response;
    dispatch(outputObj);
    return response;
  });
}
