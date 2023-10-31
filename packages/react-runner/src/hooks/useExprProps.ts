/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFieldMeta, PropExpression } from "@rxdrag/fieldy";
import { useField, useForm } from "@rxdrag/react-fieldy";
import { useCallback, useEffect, useState } from "react";

export function useExprProps(exprMetas: Record<string, string | null>, fieldMeta?: IFieldMeta) {
  const [changedProps, setChangedProps] = useState<Record<string, unknown>>({})
  const [expressions, setExpressions] = useState<PropExpression[]>([])

  const form = useForm()
  const field = useField()

  useEffect(() => {
    //如果本身是字段，则取父节点，否则直接取当前字段
    const parentNode = (fieldMeta?.name ? field?.getParent() : field) || form
    if (parentNode) {
      const exps: PropExpression[] = []
      for (const key of Object.keys(exprMetas || {})) {
        const expstr = exprMetas[key]
        if (expstr) {
          exps.push(new PropExpression(parentNode, key, expstr, form?.getExpContext()))
        }
      }
      setExpressions(exps)
    }

  }, [exprMetas, field, fieldMeta?.name, form])

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
    const unsubContext = form?.onExpContextChange(handleFormValueChange)
    return () => {
      unsub?.()
      unsubContext?.()
    }
  }, [form, handleFormValueChange])

  return changedProps
}