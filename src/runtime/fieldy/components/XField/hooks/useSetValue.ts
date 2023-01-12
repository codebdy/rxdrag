import { ValueSetter } from "runtime/fieldy/contexts"
import { useFieldy, useFormName } from "runtime/fieldy/hooks"
import { IFieldMeta } from "runtime/fieldy/interfaces"
import { isFunction } from "lodash"
import { useCallback } from "react"

export function useSetValue(value: any, path: string, fieldMeta: IFieldMeta) {
  const fieldy = useFieldy()
  const formName = useFormName()
  const setValue = useCallback((val?: ValueSetter<any>) => {
    let newValue = val
    if (isFunction(val)) {
      newValue = val(value)
    }
    if (formName) {
      if(fieldMeta.type === "fragment"){
        fieldy?.setFieldFragmentValue(formName, path, newValue)
      }else{
        fieldy?.setFieldValue(formName, path, newValue)
      }
    } else {
      console.error("Can not get form name")
    }
  }, [fieldMeta.type, fieldy, formName, path, value])

  return setValue
}