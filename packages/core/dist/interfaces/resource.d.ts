import { INodeSchema } from "interfaces/document";
import { ID, RxProps } from "interfaces";
import { ILocales } from "./loacales";
export interface IResource<Icon = any> {
    name: string;
    elements: INodeSchema[] | INodeSchema;
    icon?: Icon;
    color?: string;
    resourceLocales?: ILocales;
    imageUrl?: string;
}
export interface IResourceNode extends IResource {
    id: ID;
    title?: string;
    rxProps?: RxProps;
}
export interface IResourceManager {
    getResource(id: ID): IResourceNode | null;
    getResourceByName(name: string): IResourceNode | null;
    registerResources(...resources: IResource[]): IResourceNode[];
    clear(): void;
}
