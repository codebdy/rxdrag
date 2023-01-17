import { useCallback, useEffect } from "react"
import { useFieldy, useFormName } from "runner/fieldy"
import { IControllerMeta } from "../metas"
import { useGetFieldPaths } from "./useGetFieldPaths"
import { useNewFunction } from "./useNewFunction"

export function useOnMultiFieldValueChange(reaction?: IControllerMeta) {
  const fieldy = useFieldy()
  const formName = useFormName()
  //const reactionParams = (reaction?.effects as any)?.onMultiFieldValueChange

  const getFieldPaths = useGetFieldPaths()
  const newFunc = useNewFunction()

  // const handleFieldsValueChange = useCallback((newValues: any[], prevousValues: any[]) => {
  //   if (reactionParams?.func.jsCode && fieldy && formName) {
  //     newFunc(reactionParams?.func.jsCode)
  //   }
  // }, [fieldy, formName, newFunc, reactionParams?.func.jsCode])

  // useEffect(() => {
  //   if (reactionParams?.fields && formName) {
  //     const unsub = fieldy?.subscribeToMultiFieldValueChange(formName, getFieldPaths(reactionParams.fields), handleFieldsValueChange)
  //     return unsub
  //   }

  // }, [fieldy, formName, getFieldPaths, handleFieldsValueChange, reactionParams?.fields])
}