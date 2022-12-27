import { useFieldPath } from "fieldy/hooks"
import { IFieldMeta } from "fieldy/interfaces"
import { useMemo } from "react"
import { useSetValue } from "./useSetValue"
import { useValue } from "./useValue"

export function useCreateFieldParams(fieldMeta: IFieldMeta) {
  const basePath = useFieldPath() || ""
  const path = useMemo(() => {
    if (!fieldMeta.name) {
      return basePath
    }
    if (basePath) {
      return basePath + "." + fieldMeta.name
    } else {
      return fieldMeta.name
    }
  }, [basePath, fieldMeta.name])
  const value = useValue(path, fieldMeta)
  const setValue = useSetValue(value, path, fieldMeta)
  const params = useMemo(() => {
    return {
      basePath,
      value,
      fieldMeta,
      path,
      setValue
    }
  }, [basePath, fieldMeta, path, setValue, value])

  return params
}