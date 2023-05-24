import axios from 'axios';
import qs from 'qs';
import { ContentTypeEnum, ResultEnum } from './enums';
import paramsUtil from './params';

interface HttpError extends Error {
  code: number;
}

function HttpError(message: string, code?: number): HttpError {
  const error = new Error(message) as HttpError;
  error.name = 'HttpError';
  if (code) {
    error.code = code;
  }

  return error;
}
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'x-requested-with': 'XMLHttpRequest',
    'Content-Type': ContentTypeEnum.JSON
  },
  paramsSerializer: {
    serialize(params) {
      params = paramsUtil.parseParams(params, { skipEmpty: true });
      return qs.stringify(params, {
        skipNulls: true,
        arrayFormat: 'repeat',
        encoder: function (str) {
          return encodeURIComponent(str);
        }
      });
    }
  },
  transformRequest(data, header) {
    // 文件上传
    const isMultiPart = header['Content-Type'] === ContentTypeEnum.FORM_DATA;
    if (isMultiPart) {
      return data;
    }

    data = paramsUtil.parseParams(data);
    if (data == null || typeof data === 'string') {
      return data;
    }

    // 是否为表单模式
    const isForm = header['Content-Type'] === ContentTypeEnum.FORM_URLENCODED;

    return isForm ? qs.stringify(data) : JSON.stringify(data);
  }
});

instance.interceptors.request.use(
  config => {
    config.headers['Content-Type'] =
      config.headers['Content-Type'] || 'application/json';
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    const result = response.data;
    let error = null;
    if (!result) {
      throw Promise.reject(HttpError('请求异常！'));
    }

    if (typeof result !== 'object') {
      throw Promise.reject(HttpError('返回数据格式异常！'));
    }

    // 后端协议不一致，临时兼容
    if (result.code !== ResultEnum.SUCCESS) {
      // 兼容服务端和 node 接口返回。服务端：msg，koa：message
      error = HttpError(
        result.msg || result.message || '请求异常！',
        result.code
      );
      // TODO：Promise.reject 不会被 unhandlePromiese 捕获
      // displayError(error);
      throw error;
    }

    return result.data;
  },
  function (error) {
    let err = null;
    if (error.response) {
      const data = error.response.data;
      if (data && data.error) {
        err = HttpError(data.error?.message || data.error);
        throw err;
      }
      err = HttpError('请求异常：' + error.response.statusText);
      throw err;
    }

    if (error.request) {
      err = HttpError('请求异常：无返回结果');
      throw err;
    }

    throw error;
  }
);

export default instance;
