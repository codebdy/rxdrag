import { ID, IDesignerEngine, INodeSchema, ITreeNode, NodeChunk, RXID_ATTR_NAME } from "core/interfaces";
import { NodesById } from "core/reducers/nodesById";
import { makeRxId } from "core/utils/make-rxId";
import { isArr } from "core/utils/types";

export function parseNodeSchema(engine: IDesignerEngine, documentId: ID, schema: INodeSchema, nodesById: NodesById, isSlot: boolean, parentId?: string): ITreeNode {
  const { children, slots = {}, ...metaData } = schema;
  const rxId = makeRxId()
  const locales = engine.getLoacalesManager()
  const components = engine.getComponentManager()
  const comDesigner = components.getComponentDesigner(metaData.componentName)
  const node: ITreeNode = {
    id: rxId,
    isSlot,
    documentId,
    parentId: parentId,
    title: locales.getComponentMessage(schema.componentName, "title") || schema.componentName,
    description: locales.getComponentMessage(schema.componentName, "description") || undefined,
    children: [],
    meta: metaData,
    rxProps: {
      [RXID_ATTR_NAME]: rxId,
    },
    designerSchema: comDesigner?.designerSchema,
    designerProps: comDesigner?.designerProps,
    //designerParams: comDesigner?.designerParams,
    slots: {},
  };
  for (const child of children || []) {
    const childNode = parseNodeSchema(engine, documentId, child, nodesById, false, node.id);
    node.children.push(childNode.id);
  }
  for (const key of Object.keys(slots)) {
    const slot = slots[key]
    if (slot && node.slots) {
      const slotNode = parseNodeSchema(engine, documentId, slot, nodesById, true, node.id);
      node.slots[key] = slotNode.id
    }
  }
  nodesById[node.id] = node;
  return node;
}

export function paseNodes(engine: IDesignerEngine, documentId: ID, elements: INodeSchema[] | INodeSchema): NodeChunk {
  const nodesById = {}
  const els = isArr(elements) ? elements : [elements]
  const nodes = els.map(element => parseNodeSchema(engine, documentId, element, nodesById, false))

  return {
    rootNodes: nodes,
    nodesById
  }
}