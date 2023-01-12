import { useFieldy, useFormName } from "fieldy/hooks"
import { useCallback, useEffect } from "react"
import { IReactionsMeta } from "reaction/interfaces"
import { useGetFieldPaths } from "./useGetFieldPaths"
import { useNewFunction } from "./useNewFunction"

export function useOnMultiFieldValueChange(reaction?: IReactionsMeta) {
  const fieldy = useFieldy()
  const formName = useFormName()
  const reactionParams = reaction?.onMultiFieldValueChange

  const getFieldPaths = useGetFieldPaths()
  const newFunc = useNewFunction()

  const handleFieldsValueChange = useCallback((newValues: any[], prevousValues: any[]) => {
    if (reactionParams?.jsCode && fieldy && formName) {
      newFunc(reactionParams.jsCode)
    }
  }, [fieldy, formName, newFunc, reactionParams?.jsCode])

  useEffect(() => {
    if (reactionParams?.fields && formName) {
      const unsub = fieldy?.subscribeToMultiFieldValueChange(formName, getFieldPaths(reactionParams.fields), handleFieldsValueChange)
      return unsub
    }

  }, [fieldy, formName, getFieldPaths, handleFieldsValueChange, reactionParams?.fields])
}