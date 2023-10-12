/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "@rxdrag/react-fieldy";
import { useCallback, useEffect, useState } from "react";
import { useCalculateExpr } from "./useCalculateExpr";

export function useExprProps(exprs: Record<string, string | null>) {
  const [changedProps, setChangedProps] = useState<Record<string, unknown>>({})
  const form = useForm()
  const calculate = useCalculateExpr(form)

  const handleFormValueChange = useCallback(() => {
    const props: Record<string, unknown> = {}
    for (const key of Object.keys(exprs)) {
      const expr = exprs[key]
      props[key] = calculate(expr)
    }
    setChangedProps(props)
  }, [calculate, exprs])

  useEffect(() => {
    const unsub = form?.onValueChange(handleFormValueChange)
    return () => {
      unsub?.()
    }
  }, [form, handleFormValueChange])

  return changedProps
}