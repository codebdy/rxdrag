import { INodeSchema } from "@rxdrag/schema";
import { ILocales } from "@rxdrag/locales";
import { ID, RxProps } from "./types";

export interface IResource<Icon = unknown> {
  //唯一名称，防止重复注册
  name: string
  elements: INodeSchema[] | INodeSchema,
  icon?: Icon
  color?: string,
  resourceLocales?: ILocales,
  imageUrl?: string,
}

export interface IResourceNode<IconType = unknown> extends IResource<IconType> {
  id: ID
  title?: string
  rxProps?: RxProps
}

export interface IResourceManager<IconType = unknown> {
  getResource(id: ID): IResourceNode<IconType> | null
  getResourceByName(name: string): IResourceNode<IconType> | null
  registerResources(...resources: IResource[]): IResourceNode<IconType>[]
  clear(): void
}