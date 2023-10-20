import { X6EdgeMeta } from "./X6EdgeMeta";
import { X6NodeMeta } from "./X6NodeMeta";

/**
 * ER图元数据
 */
export interface DiagramMeta {
  /**
   * 唯一标识
   */
  uuid: string;

  /**
   * ER图名称
   */
  name: string;

  packageUuid: string;

  /**
   * 节点
   */
  nodes: X6NodeMeta[];

  /**
   * 关系的连线
   */
  edges: X6EdgeMeta[];
}
