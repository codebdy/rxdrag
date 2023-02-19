import { IComponentConfig } from "core/interfaces";
import { ReactComponent } from "runner/ComponentRender/types";

//export type ReactComponent = React.FC<any> | React.ComponentClass<any>

export interface IComponents {
  [key: string]: ReactComponent | undefined
}


export interface IComponentMaterial extends IComponentConfig<ReactComponent> {
  //packageName?: string //npm包名 生成代码用
  //resource?: IMaterialResource,
  //slots用到的组件，值为true时，用缺省组件DefaultSlot, string时，存的是已经注册过的component resource名字
  // slots?: {
  //   [name: string]: IComponentMaterial | true | string | undefined
  // },
}

