import { useFieldy, useFormName } from "fieldy/hooks"
import { useField } from "fieldy/hooks/useField"
import { useCallback, useEffect } from "react"
import { useGetFieldPaths } from "./useGetFieldPaths"
import { useNewFunction } from "./useNewFunction"

export function useOnFieldValueChange() {
  const fieldy = useFieldy()
  const fieldParams = useField()
  const { fieldMeta } = fieldParams
  const formName = useFormName()
  const reactionParams = fieldMeta?.effects?.onFieldValueChange

  const getFieldPaths = useGetFieldPaths()
  const newFunc = useNewFunction()

  const handleFieldValueChange = useCallback((newValue: any, prevousValue: any) => {
    console.log("哈哈哈** handleFieldValueChange", newValue)
    if (reactionParams?.jsCode && fieldy && formName) {
      newFunc(reactionParams.jsCode)
    }
  }, [fieldy, formName, newFunc, reactionParams?.jsCode])

  useEffect(() => {
    if (reactionParams?.field && formName) {
      const unsub = fieldy?.subscribeToFieldValueChange(formName, getFieldPaths([reactionParams.field])?.[0], handleFieldValueChange)
      return unsub
    }

  }, [fieldy, formName, getFieldPaths, handleFieldValueChange, reactionParams?.field])
}