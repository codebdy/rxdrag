import { useFieldy, useFormName } from "fieldy/hooks"
import { useField } from "fieldy/hooks/useField"
import { useCallback } from "react"
import { PREFIX_SELF, Self } from "../self"
import { PREFIX_SIBLINGS, Siblings } from "../siblilings"

export function useNewFunction() {
  const fieldy = useFieldy()
  const fieldParams = useField()
  const formName = useFormName()

  const newFunc = useCallback((jsCode: string) => {
    if (fieldy && formName) {
      // eslint-disable-next-line no-new-func
      const func = new Function(PREFIX_SIBLINGS, PREFIX_SELF, jsCode)
      func(
        new Siblings(fieldParams, fieldy, formName),
        new Self(fieldParams, fieldy, formName),
      )
    }
  }, [fieldParams, fieldy, formName])

  return newFunc
}