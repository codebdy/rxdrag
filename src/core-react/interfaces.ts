import { IComponentConfig, IResource } from "core/interfaces";
import { ILocales } from "core/interfaces/loacales";
import React from "react";

export interface IComponents {
  [key: string]: React.FC<any>| React.ComponentClass<any>
}

export interface IMaterialResource extends IResource {
  icon?: React.ReactElement,
  color?: string,
  resourceLocales?: ILocales,
  imageUrl?: string,
}

export interface IComponentMaterial extends IComponentConfig {
  packageName?: string //npm包名 生成代码用
  component: React.FC<any> | React.ComponentClass<any>,
  designer: React.FC<any> | React.ComponentClass<any>,
  resource?: IMaterialResource,
  //slots用到的组件，值为true时，用缺省组件DefaultSlot, string时，存的是已经注册过的component resource名字
  slots?: {
    [name: string]: IComponentMaterial | true | string | undefined
  }
}

