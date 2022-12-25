import { useFieldy, useFormName } from "fieldy/hooks"
import { useField } from "fieldy/hooks/useField"
import { useCallback, useEffect } from "react"
import { useGetFieldPaths } from "./useGetFieldPaths"
import { useNewFunction } from "./useNewFunction"

export function useOnFieldsValueChange() {
  const fieldy = useFieldy()
  const fieldParams = useField()
  const { fieldMeta } = fieldParams
  const formName = useFormName()
  const reactionParams = fieldMeta?.effects?.onFieldsValueChange

  const getFieldPaths = useGetFieldPaths()
  const newFunc = useNewFunction()

  const handleFieldsValueChange = useCallback((newValues: any[], prevousValues: any[]) => {
    if (reactionParams?.jsCode && fieldy && formName) {
      newFunc(reactionParams.jsCode)
    }
  }, [fieldy, formName, newFunc, reactionParams?.jsCode])

  useEffect(() => {
    if (reactionParams?.fields && formName) {
      const unsub = fieldy?.subscribeToFieldsValueChange(formName, getFieldPaths(reactionParams.fields), handleFieldsValueChange)
      return unsub
    }

  }, [fieldy, formName, getFieldPaths, handleFieldsValueChange, reactionParams?.fields])
}