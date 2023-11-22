/**
 * 关系类型
 */
export enum RelationType {
  INHERIT = "inherit",
  TWO_WAY_ASSOCIATION = "twoWayAssociation",
  TWO_WAY_AGGREGATION = "twoWayAggregation",
  TWO_WAY_COMBINATION = "twoWayCombination",

  ONE_WAY_ASSOCIATION = "oneWayAssociation",
  ONE_WAY_AGGREGATION = "oneWayAggregation",
  ONE_WAY_COMBINATION = "oneWayCombination",

  //LINK_LINE = "linkLine",
}

export enum RelationMultiplicity {
  ZERO_ONE = "0..1",
  ZERO_MANY = "0..*",
}

/**
 * 关系元数据
 */
export interface RelationMeta {
  /**
   * 唯一标识
   */
  uuid: string;

  innerId: number;

  /**
   * 关系类型
   */
  relationType: RelationType;

  /**
   * 关系的源实体标识
   */
  sourceId: string;

  /**
   * 关系目标源实体标识
   */
  targetId: string;

  /**
   * 源实体上的关系属性
   */
  roleOfTarget?: string;

  /**
   * 目标实体上的关系属性
   */
  roleOfSource?: string;

  labelOfTarget?:string;
  labelOfSource?:string;

  descriptionOnSource?: string;

  descriptionOnTarget?: string;

  sourceMutiplicity: RelationMultiplicity;

  targetMultiplicity: RelationMultiplicity;

  system?: boolean;
}
