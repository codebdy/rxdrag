import { INodeSchema } from "@rxdrag/schema";
import { ILocales } from "@rxdrag/locales";
import { ID, RxProps } from "./types";

export interface IResource<Icon = any> {
  //唯一名称，防止重复注册
  name: string
  elements: INodeSchema[] | INodeSchema,
  icon?: Icon
  color?: string,
  resourceLocales?: ILocales,
  imageUrl?: string,
}

export interface IResourceNode extends IResource {
  id: ID
  title?: string
  rxProps?: RxProps
}

export interface IResourceManager {
  getResource(id: ID): IResourceNode | null
  getResourceByName(name: string): IResourceNode | null
  registerResources(...resources: IResource[]): IResourceNode[]
  clear(): void
}