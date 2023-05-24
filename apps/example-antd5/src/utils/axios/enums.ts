// 返回状态枚举值
export const ResultEnum = {
  SUCCESS: 0,
  ERROR: -1
};

/**
 * @description:  常用的contentTyp类型
 */
export const ContentTypeEnum = {
  // json
  JSON: 'application/json;charset=UTF-8',
  // json
  TEXT: 'text/plain;charset=UTF-8',
  // form-data 一般配合qs
  FORM_URLENCODED: 'application/x-www-form-urlencoded',
  // form-data  上传
  FORM_DATA: 'multipart/form-data'
};
