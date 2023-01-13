import { INodeSchema } from "core";
import { IFieldMeta, IFieldSchemas } from "runner/fieldy";

export function extractFieldSchemas(node: INodeSchema<IFieldMeta>): IFieldSchemas {
  const schemas: IFieldSchemas = {}
  doExtract(node, "", schemas)
  return schemas
}

function path(basePath: string, name: string) {
  if (basePath) {
    return basePath + "." + name
  }
  return name
}

function attachField(schemas: IFieldSchemas, path: string, fieldMeta: IFieldMeta) {
  if (schemas[path]) {
    schemas[path] = { ...schemas[path], ...fieldMeta }
  } else {
    schemas[path] = fieldMeta
  }
}

function doExtract(node: INodeSchema<IFieldMeta>, parentPath: string, schemas: IFieldSchemas) {
  const fieldMeta = node["x-field"]
  const fieldName = fieldMeta?.name?.trim()
  let currentParentPath = parentPath
  //有名称才会构建节点，其他的只是渲染时的辅助
  if (fieldMeta && fieldName) {
    //如果field名字是path，比如：props.style
    if (fieldName.indexOf(".") > -1) {
      const subFieldArray = fieldName.split('.')
      for (let i = 0; i < subFieldArray.length; i++) {
        const subFieldName = subFieldArray[i].trim()
        currentParentPath = path(currentParentPath, subFieldName)
        if (i < (subFieldArray.length - 1)) {
          attachField(schemas, currentParentPath, { type: "object", name: subFieldName })
        }
      }
    } else {
      currentParentPath = path(currentParentPath, fieldName)
    }
    attachField(schemas, currentParentPath, fieldMeta)
  }
  for (const child of node.children || []) {
    doExtract(child, currentParentPath, schemas)
  }
}
