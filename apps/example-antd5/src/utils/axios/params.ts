import dayjs, { Dayjs } from 'dayjs';
import _ from 'lodash';

type Options = {
  skipEmpty?: boolean;
};

export default {
  /**
   * 转换参数
   *
   * @param {Object} [params] - 参数对象
   * @param {Object} [options] - 选项
   * @param {Boolean} [options.skipEmpty] - 是否跳过空值
   * @returns {Object}
   */
  parseParams(
    params: Record<string, any>,
    options: Options = {}
  ): Record<string, any> {
    const { skipEmpty } = options;
    const filterFunc = skipEmpty
      ? (result: unknown) => result != null && result !== ''
      : () => true;

    if (Array.isArray(params)) {
      return params
        .map(value => this.parseParams(value, options))
        .filter(filterFunc);
    }

    if (_.isPlainObject(params)) {
      const result: Record<string, any> = {};

      Object.keys(params)
        .filter((key: string) => filterFunc(params[key]))
        .forEach((key: string) => {
          result[key] = this.parseParams(params[key], options);
        });

      return result;
    }

    return this.parseValue(params);
  },
  /**
   * 处理参数
   * 目前只处理 字符串前后空格和日期格式
   *
   * @param {any} value
   * @returns
   */
  parseValue(value: string | Dayjs | any) {
    let result = value;

    if (typeof value === 'string') {
      result = value.trim();
    } else if (value instanceof dayjs) {
      result = (value as Dayjs).format('YYYY-MM-DD');
    }

    return result;
  }
};
