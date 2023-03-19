import { INodeSchema } from "core/interfaces/document";
import { ID, RxProps } from "core/interfaces";
import { ILocales } from "./loacales";

export interface IResource {
  //唯一名称，防止重复注册
  name: string
  elements: INodeSchema[] | INodeSchema,
  icon?: React.ReactElement,
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