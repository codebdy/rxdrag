import { useCallback, useEffect } from "react"
import { useFieldy, useForm } from "runner/fieldy"
import { IControllerMeta } from "../interfaces/metas"
import { useGetFieldPaths } from "./useGetFieldPaths"
import { useNewFunction } from "./useNewFunction"

export function useOnFieldValueChange(reaction?: IControllerMeta) {
  const fieldy = useFieldy()
  const formName = useForm()
  //const reactionParams = (reaction?.effects as any)?.onFieldValueChange

  const getFieldPaths = useGetFieldPaths()
  const newFunc = useNewFunction()

  // const handleFieldValueChange = useCallback((newValue: any, prevousValue: any) => {
  //   if (reactionParams?.func.jsCode && fieldy && formName) {
  //     newFunc(reactionParams.func.jsCode)
  //   }
  // }, [fieldy, formName, newFunc, reactionParams?.func.jsCode])

  // useEffect(() => {
  //   if (reactionParams?.field && formName) {
  //     const unsub = fieldy?.subscribeToFieldValueChange(formName, getFieldPaths([reactionParams.field])?.[0], handleFieldValueChange)
  //     return unsub
  //   }

  // }, [fieldy, formName, getFieldPaths, handleFieldValueChange, reactionParams?.field])
}