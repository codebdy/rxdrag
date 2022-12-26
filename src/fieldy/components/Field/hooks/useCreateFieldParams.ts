import { ValueSetter } from "fieldy/contexts"
import { useFieldPath, useFieldState, useFieldy, useFormName } from "fieldy/hooks"
import { IFieldMeta } from "fieldy/interfaces"
import { isFunction } from "lodash"
import { useCallback, useMemo } from "react"

export function useCreateFieldParams(fieldMeta: IFieldMeta){
  const basePath = useFieldPath() || ""
  const fieldy = useFieldy()
  const formName = useFormName()
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
  const value = useFieldState(path)?.value
  const setValue = useCallback((val?: ValueSetter<any>) => {
    let newValue = val
    if (isFunction(val)) {
      newValue = val(value)
    }
    if (formName) {
      fieldy?.setFieldValue(formName, path, newValue)
    } else {
      console.error("Can not get form name")
    }
  }, [fieldy, formName, path, value])

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