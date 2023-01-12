import { useCallback, useEffect } from "react"
import { useFieldy, useFormName } from "runtime/fieldy"
import { IReactionsMeta } from "../interfaces"
import { useGetFieldPaths } from "./useGetFieldPaths"
import { useNewFunction } from "./useNewFunction"

export function useOnFieldValueChange(reaction?: IReactionsMeta) {
  const fieldy = useFieldy()
  const formName = useFormName()
  const reactionParams = reaction?.onFieldValueChange

  const getFieldPaths = useGetFieldPaths()
  const newFunc = useNewFunction()

  const handleFieldValueChange = useCallback((newValue: any, prevousValue: any) => {
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