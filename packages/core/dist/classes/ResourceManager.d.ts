import { ID } from "interfaces";
import { ILocalesManager } from "interfaces/loacales";
import { IResource, IResourceManager, IResourceNode } from "../interfaces/resource";
export declare class ResourceManager implements IResourceManager {
    private locales;
    private resources;
    constructor(locales: ILocalesManager);
    getResource(id: ID): IResourceNode | null;
    getResourceByName(name: string): IResourceNode | null;
    registerResources(...resources: IResource[]): IResourceNode[];
    clear(): void;
}
