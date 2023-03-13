import { INodeSchema } from "core";
import { IFieldMeta, IFieldSchema } from "runner/fieldy";
import { makePath } from "runner/fieldy/funcs/path";

export function extractFieldSchemas(node: INodeSchema<IFieldMeta>): IFieldSchema[] {
  const schemas: IFieldSchema[] = []
  doExtract(node, "", schemas)
  return schemas
}

function doExtract(node: INodeSchema<IFieldMeta>, parentPath: string, schemas: IFieldSchema[]) {
  const fieldMeta = node["x-field"]
  const fieldName = fieldMeta?.name?.trim()
  let currentParentPath = parentPath
  if (fieldMeta) {
    //如果field名字是path，比如：props.style
    if (fieldName && fieldName.indexOf(".") > -1) {
      const subFieldArray = fieldName.split('.')
      for (let i = 0; i < subFieldArray.length; i++) {
        const subFieldName = subFieldArray[i].trim()
        currentParentPath = makePath(currentParentPath, subFieldName)
        if (i < (subFieldArray.length - 1)) {
          schemas.push(
            { type: "object", name: subFieldName, path: currentParentPath }
          )
        } else {
          schemas.push(
            { ...fieldMeta, name: subFieldName, path: currentParentPath }
          )
        }
      }
    } else {
      currentParentPath = makePath(currentParentPath, fieldName)
      schemas.push(
        { ...fieldMeta, path: currentParentPath }
      )
    }
  }
  for (const child of node.children || []) {
    doExtract(child, currentParentPath, schemas)
  }
}
