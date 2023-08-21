import { ID, NodeType, RXID_ATTR_NAME, RX_NODE_TYPE_ATTR_NAME } from "../interfaces";
import { IRxDragLocalesManager } from "@rxdrag/locales";
import { Listener, Subscriber, makeRxId } from "@rxdrag/shared";
import { IResource, IResourceManager, IResourceNode } from "../interfaces/resource";

export class ResourceManager<IconType = unknown> implements IResourceManager<IconType> {
  private resources = new Subscriber<Record<string, IResourceNode<IconType> | undefined>>({})
  constructor(private locales: IRxDragLocalesManager) {
  }

  subscribeChange = (listener: Listener<Record<string, IResourceNode<IconType> | undefined>>) => {
    return this.resources.subscribeChange(listener)
  };

  getResource(id: ID): IResourceNode<IconType> | undefined {
    const record = this.resources.getValue()
    //判断id
    for (const key of Object.keys(record)) {
      if (record[key]?.id === id) {
        return record[key]
      }
    }

  }

  getResourceByName(name: string): IResourceNode<IconType> | undefined {
    const record = this.resources.getValue()
    return record[name]
  }

  registerResources(...resources: IResource[]) {
    const news: Record<string, IResourceNode<IconType> | undefined> = { ...this.resources.getValue() }
    for (const resource of resources) {

      const rxId = makeRxId()
      const node = {
        ...resource,
        id: rxId,
        title: resource.title || resource.name,
        rxProps: {
          [RXID_ATTR_NAME]: rxId,
          [RX_NODE_TYPE_ATTR_NAME]: NodeType.Resource
        },
      } as IResourceNode<IconType>
      news[resource.name] = node

    }
    this.resources.setValue(news)
  }
  clear(): void {
    this.resources.reset({})
  }

}