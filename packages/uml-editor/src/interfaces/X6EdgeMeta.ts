import { Point } from "@antv/x6";

export type LabelPosition = {
  distance: number,
  offset: number,
  angle: number,
}
export interface X6EdgeMeta{
  /** 对应关系 uuid */
  id: string;

  /** 折点数据 */
  vertices?: Point.PointLike[];

  /** 源关系属性位置标签 */
  roleOnSourcePosition?: LabelPosition;

  sourceMultiplicityPosition?: LabelPosition;

  /** 目标关系属性位置标签 */
  roleOnTargetPosition?: LabelPosition;

  targetMultiplicityPosition?: LabelPosition;
  diagramUuid: string;
  sourceAnchor: any;
  targetAnchor: any;
}