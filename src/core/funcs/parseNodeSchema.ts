import { ID, IDesignerEngine, INodeSchema, ITreeNode, NodeChunk, RXID_ATTR_NAME } from "core/interfaces";
import { NodesById } from "core/reducers/nodesById";
import { makeRxId } from "core/utils/make-rxId";

export function parseNodeSchema(engine: IDesignerEngine, documentId: ID, schema: INodeSchema, nodesById: NodesById, parentId?: string): ITreeNode {
  const { children, ...metaData } = schema;
  const rxId = makeRxId()
  const locales = engine.getLoacalesManager()
  const components = engine.getComponentManager()
  const comDesigner = components.getComponentDesigner(metaData.componentName)
  const node: ITreeNode = {
    id: rxId,
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
    designerParams: comDesigner?.designerParams,
  };
  for (const child of children || []) {
    const childNode = parseNodeSchema(engine, documentId, child, nodesById, node.id);
    node.children.push(childNode.id);
  }
  nodesById[node.id] = node;
  return node;
}

export function paseNodes(engine: IDesignerEngine, documentId: ID, elements: INodeSchema[]): NodeChunk {
  const nodesById = {}
  const nodes = elements.map(element => parseNodeSchema(engine, documentId, element, nodesById))

  return {
    rootNodes: nodes,
    nodesById
  }
}