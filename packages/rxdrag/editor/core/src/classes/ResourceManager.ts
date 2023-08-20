import { ID, NodeType, RXID_ATTR_NAME, RX_NODE_TYPE_ATTR_NAME } from "../interfaces";
import { ILocalesManager } from "@rxdrag/locales";
import { makeRxId } from "@rxdrag/shared";
import { IResource, IResourceManager, IResourceNode } from "../interfaces/resource";

export class ResourceManager<IconType = unknown> implements IResourceManager<IconType> {

  private resources: {
    [name: string]: IResourceNode<IconType>
  } = {}
  constructor(private locales: ILocalesManager) {

  }

  getResource(id: ID): IResourceNode<IconType> | null {
    //判断id
    for (const key of Object.keys(this.resources)) {
      if (this.resources[key].id === id) {
        return this.resources[key]
      }
    }

    return null
  }

  getResourceByName(name: string): IResourceNode<IconType> | null {
    return this.resources[name]
  }

  registerResources(...resources: IResource[]): IResourceNode<IconType>[] {
    const convertedResources: IResourceNode<IconType>[] = []
    for (const resource of resources) {

      const rxId = makeRxId()
      const node = {
        ...resource,
        id: rxId,
        title: this.locales.getResourceMessage(resource.name || resource.name) || undefined,
        rxProps: {
          [RXID_ATTR_NAME]: rxId,
          [RX_NODE_TYPE_ATTR_NAME]: NodeType.Resource
        },
      } as IResourceNode<IconType>
      this.resources[resource.name] = node
      convertedResources.push(node)
    }
    return convertedResources
  }
  clear(): void {
    this.resources = {}
  }

}