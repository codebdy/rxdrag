import { ValueSetter } from "fieldy/contexts"
import { useFieldy, useFormName } from "fieldy/hooks"
import { isFunction } from "lodash"
import { useCallback } from "react"

export function useSetValue(value: any, path: string) {
  const fieldy = useFieldy()
  const formName = useFormName()
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

  return setValue
}