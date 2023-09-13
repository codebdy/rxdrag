import { INodeSchema } from "@rxdrag/schema";
import { ILocales } from "@rxdrag/locales";
import { ID, RxProps } from "./types";
import { ISubscribable } from "@rxdrag/shared";

export interface IResource<Icon = unknown> {
  //唯一名称，防止重复注册
  name: string
  title?: string
  elements: INodeSchema[] | INodeSchema,
  icon?: Icon
  color?: string,
  resourceLocales?: ILocales,
  imageUrl?: string,
}

export interface IResourceNode<IconType = unknown> extends IResource<IconType> {
  id: ID
  title: string,
  rxProps?: RxProps
}

export interface IResourceManager<IconType = unknown> extends ISubscribable<Record<string, IResourceNode<IconType> | undefined>> {
  getResource(id: ID): IResourceNode<IconType> | undefined
  getResourceByName(name: string): IResourceNode<IconType> | undefined
  registerResources(...resources: IResource[]): void
  clear(): void
}