export default function getQueryVariable(name: string, oldUrl: string) {
  const url = decodeURI(oldUrl); // 获取url中"?"符后的字串(包括问号)
  //let query = {};
  if (url.indexOf("?") !== -1) {
    const str = url.substr(url.indexOf("?") + 1);
    const pairs = str.split("&");
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split("=");
      if (pair[0] === name) return pair[1]; // 返回 参数值
    }
  }
  return (false);
}