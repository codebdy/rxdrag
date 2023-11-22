import { NodeType, IPortDefine } from "./dsl";

//端口定义
export interface IPorts {
  //入端口
  inPorts?: IPortDefine[];
  //出端口
  outPorts?: IPortDefine[];
}

/**
 *                     **重要提醒**
 * =======================================================
 *    React时，因为x6的问题，多个path的时候，
 *    icon的path 一定要加key
 * =======================================================
 * 
 */
//元件节点的物料定义
export interface IActivityMaterial<ComponentNode = unknown, NodeSchema = unknown, Config = unknown, MaterialContext = unknown> {
  //标题
  label: string;
  //节点类型，NodeType在DLS中定义，这里根据activityType决定画上的图形样式
  activityType: NodeType;
  //图标代码，react的话，相当于React.ReactNode
  icon?: ComponentNode | ((config?: Config, context?: MaterialContext) => ComponentNode);
  //图标颜色
  color?: string | ((config?: Config, context?: MaterialContext) => string | undefined);
  //属性面板配置，可以适配不同的低代码Schema，使用RxDrag的话，这可以是INodeSchema类型
  schema?: NodeSchema;
  //默认端口，元件节点的端口设置的默认值，大部分节点端口跟默认值是一样的，
  //部分动态配置端口，会根据配置有所变化
  defaultPorts?: IPorts;
  //默认配置
  defaultConfig?: Config;
  //画布中元件节点显示的标题，跟label并存时，该函数优先级高 
  title?: (config?: Config, context?: MaterialContext) => string | undefined;
  //画布中元件节点显示的子标题 
  subTitle?: (config?: Config, context?: MaterialContext) => string | undefined;
  //对应解析引擎里的Activity名称，根据这个名字实例化相应的节点业务逻辑对象
  activityName: string;
}

//物料分类，用于在工具栏上，以手风琴风格分组物料
export interface ActivityMaterialCategory<ComponentNode = unknown, NodeSchema = unknown, Config = unknown, MaterialContext = unknown> {
  name: string;
  materials: IActivityMaterial<ComponentNode, NodeSchema, Config, MaterialContext>[];
}
