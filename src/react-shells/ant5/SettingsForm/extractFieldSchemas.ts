import { INodeSchema } from "core";
import { IFieldSchema } from "fieldy";

export function extractFieldSchemas(node: INodeSchema) {
  const fieldSchema: IFieldSchema = { name: "$root$", fields: [] }
  doExtract(node, fieldSchema)
  return fieldSchema.fields
}

function doExtract(node: INodeSchema, parentField: IFieldSchema) {
  let currentParent = parentField
  if (node["x-field"]) {
    currentParent = { ...node["x-field"], fields: [] }
    parentField.fields.push(currentParent)
  }
  for (const child of node.children || []) {
    doExtract(child, currentParent)
  }
}