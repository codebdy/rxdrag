import { Type } from "./Type";

export interface AttributeMeta<ValidateSchema = unknown> {
  /**
   * 唯一标识
   */
  uuid: string;

  /**
   * 字段名
   */
  name: string;

  label?: string;

  /**
   * 字段类型
   */
  type: Type;

  /**
   * 是否主键
   */
  primary?: boolean;

  /**
   * 是否可空
   */
  nullable?: boolean;

  /**
   * 字段默认值
   */
  default?: unknown;

  /**
   * 是否唯一
   */
  unique?: boolean;

  index?: boolean;

  /**
   * 是否是创建日期
   */
  createDate?: boolean;

  /**
   * 是否是更新日期
   */
  updateDate?: boolean;

  /**
   * 是否是删除日期，软删除功能使用
   */
  deleteDate?: boolean;

  /**
   * 是否可以在查询时被选择，如果这是为false，则查询时隐藏。
   * 密码字段会使用它
   */
  hidden?: boolean;

  /**
   * 长度
   */
  length?: number;

  floatM?: number;

  floatD?: number;

  unsigned?: boolean;

  typeUuid?: string;

  readonly?: boolean;

  description?: string;

  /**
   * 渲染图形元素用的label，其他地方毫无用处
   */
  typeLabel: string;

  system?: boolean;

  autoIncrement?: boolean;

  autoGenerate?: boolean;

  //字段校验规则
  valitateSchema?: ValidateSchema;
}
