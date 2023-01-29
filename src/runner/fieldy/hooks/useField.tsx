import { FieldContext, IFieldParams } from "runner/fieldy/contexts"
import { useContext } from "react"

export function useField(){
  const field = useContext<IFieldParams>(FieldContext)
  return field
}