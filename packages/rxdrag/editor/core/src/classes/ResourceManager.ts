import { ID, NodeType, RXID_ATTR_NAME, RX_NODE_TYPE_ATTR_NAME } from "../interfaces";
import { ILocalesManager } from "@rxdrag/locales";
import { SubscribableRecord, makeRxId } from "@rxdrag/shared";
import { IResource, IResourceManager, IResourceNode } from "../interfaces/resource";

export class ResourceManager<IconType = unknown> extends SubscribableRecord<IResourceNode<IconType>> implements IResourceManager<IconType> {

  constructor(private locales: ILocalesManager) {
    super()
  }

  getResource(id: ID): IResourceNode<IconType> | undefined {
    //判断id
    for (const key of Object.keys(this.record)) {
      if (this.record[key]?.id === id) {
        return this.record[key]
      }
    }

  }

  getResourceByName(name: string): IResourceNode<IconType> | undefined {
    return this.record[name]
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
      this.record[resource.name] = node
      convertedResources.push(node)
    }
    this.emitChange()
    return convertedResources
  }
  clear(): void {
    this.record = {}
  }

}