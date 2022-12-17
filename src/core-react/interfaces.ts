import { IComponentConfig, IResource } from "core/interfaces";
import { ILocales } from "core/interfaces/loacales";
import React from "react";

export interface IComponents {
  [key: string]: React.FC<any>
}

export interface ITemplateMaterial {
  icon?: React.ReactElement,
  color?: string,
  resource?: IResource,
  resourceLocales?: ILocales,
  imageUrl?: string,
}

export interface IComponentMaterial extends IComponentConfig, ITemplateMaterial {
  packageName?: string //npm包名 生成代码用
  component: React.FC<any>,
  designer: React.FC<any>,
  //不需要resource，但是需要注册的，并且依附于该物料的子物料
  subMaterials?: IComponentMaterial[]
}
