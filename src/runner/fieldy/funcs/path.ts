import { IFieldMeta, IFieldMetas } from "../interfaces";

export function isChild(path: string, parentPath?: string) {
  if (!parentPath) {
    if (path.indexOf(".") === -1) {
      return true
    }
    return false
  }

  if (path.startsWith(parentPath)) {
    if (path.substring(parentPath.length).indexOf('.') === -1) {
      return true
    }

    return false
  }

  return false
}

export function getChildFields(fieldSchemas: IFieldMetas, parentPath?: string) {
  const fields: IFieldMeta[] = []
  for (const path of Object.keys(fieldSchemas)) {
    if(isChild(path, parentPath)){
      fields.push(fieldSchemas[path])
    }
  }
  return fields
}