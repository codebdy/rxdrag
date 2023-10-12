import { IForm, IValidateSchema } from "@rxdrag/fieldy";
import { useField } from "@rxdrag/react-fieldy";
import { useCallback } from "react";

export function useCalculateExpr(form?: IForm<IValidateSchema>) {
  const field = useField()
  const calculate = useCallback((expr: string | null) => {
    return undefined
  }, [])

  return calculate
}