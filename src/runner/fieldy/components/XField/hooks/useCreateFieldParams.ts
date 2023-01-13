import { useFieldPath } from "runner/fieldy/hooks"
import { IFieldMeta } from "runner/fieldy/interfaces"
import { useMemo } from "react"
import { useSetValue } from "./useSetValue"
import { useValue } from "./useValue"

export function useCreateFieldParams(fieldMeta: IFieldMeta) {
  const parentPath = useFieldPath() || ""
  const path = useMemo(() => {
    if (!fieldMeta.name) {
      return parentPath
    }
    if (parentPath) {
      return parentPath + "." + fieldMeta.name.trim()
    } else {
      return fieldMeta.name.trim()
    }
  }, [parentPath, fieldMeta.name])

  const { relativePath, feildName } = useMemo(() => {
    if (fieldMeta.name && fieldMeta.name?.indexOf('.') > -1) {
      const arr = fieldMeta.name.split('.')
      const name = arr[arr.length - 1].trim()
      const rPath = (parentPath ? "." : "") + arr.slice(0, arr.length - 1).join('.')
      return {
        relativePath: rPath,
        feildName: name
      }
    }

    return {
      relativePath: "",
      feildName: fieldMeta.name?.trim()
    }
  }, [fieldMeta.name, parentPath])

  const value = useValue(path, fieldMeta)
  const setValue = useSetValue(value, path, fieldMeta)
  const params = useMemo(() => {
    return {
      basePath: parentPath + relativePath,
      value,
      fieldMeta: { ...fieldMeta, name: feildName },
      path,
      setValue
    }
  }, [parentPath, relativePath, value, fieldMeta, feildName, path, setValue])
  fieldMeta.name && fieldMeta.name?.indexOf('.') > -1 && console.log("哈哈", params, value, path, fieldMeta)
  return params
}