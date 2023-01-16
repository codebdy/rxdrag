export interface IX6PortMeta {
  id: string;
  group: "in" | "out";
}

export interface IX6NodeMeta {
  id: string;
  /** 节点x坐标 */
  x?: number;
  /** 节点y坐标  */
  y?: number;
  /** 节点宽度 */
  width?: number;
  /** 节点高度 */
  height?: number;
  ports?: IX6PortMeta[];
}

export interface IX6EdgeMeta {
  id: string;
  sourceAnchor: any;
  targetAnchor: any;
}

export interface IPipesMeta {
  x6Nodes: IX6NodeMeta[]
  x6Edges: IX6EdgeMeta[]
}

export interface IFunctionMeta {
  title?: string,
  name?: string,
  metas?: IPipesMeta,
}