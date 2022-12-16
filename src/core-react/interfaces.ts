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
  component: React.FC<any>,
  designer: React.FC<any>,
}
