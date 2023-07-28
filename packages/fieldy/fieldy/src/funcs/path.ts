import { FieldsState, FieldState } from "../interfaces/fieldy";

export function makePath(basePath: string, name?: string) {
  if (!name) {
    return basePath
  }
  if (basePath) {
    return basePath + "." + name
  }
  return name
}


export function isChild(path: string, parentPath?: string) {
  if (!parentPath) {
    if (path.indexOf(".") === -1) {
      return true
    }
    return false
  }

  if(parentPath === path){
    return false
  }

  if (path.startsWith(parentPath)) {
    if (path.substring(parentPath.length + 1).indexOf('.') === -1) {
      return true
    }

    return false
  }

  return false
}

export function getChildFields(allFields: FieldsState, parentPath?: string) {
  const fields: FieldState[] = []
  for (const path of Object.keys(allFields)) {
    if(isChild(path, parentPath)){
      const field = allFields[path]
      if(field){
        fields.push(field)
      }
    }
  }
  return fields
}