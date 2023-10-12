/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropExpression } from "@rxdrag/fieldy/src/classes/PropExpression";
import { useField, useForm } from "@rxdrag/react-fieldy";
import { useCallback, useEffect, useState } from "react";

export function useExprProps(exprMetas: Record<string, string | null>) {
  const [changedProps, setChangedProps] = useState<Record<string, unknown>>({})
  const [expressions, setExpressions] = useState<PropExpression[]>([])

  const form = useForm()
  const field = useField()

  useEffect(() => {
    const fieldyNode = field || form
    if (fieldyNode) {
      const exps: PropExpression[] = []
      for (const key of Object.keys(exprMetas || {})) {
        const expstr = exprMetas[key]
        if (expstr) {
          exps.push(new PropExpression(fieldyNode, key, expstr, form?.getExpContext()))
        }
      }
      setExpressions(exps)
    }

  }, [exprMetas, field, form])

  const handleFormValueChange = useCallback(() => {
    const props: Record<string, unknown> = {}
    for (const exp of expressions) {
      const { value } = exp.changedValue() || {}
      props[exp.propName] = value
    }
    setChangedProps(props)
  }, [expressions])

  useEffect(() => {
    const unsub = form?.onValueChange(handleFormValueChange)
    return () => {
      unsub?.()
    }
  }, [form, handleFormValueChange])

  return changedProps
}