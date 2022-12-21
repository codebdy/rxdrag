import { FieldContext, IFieldParams } from "fieldy/contexts"
import { useContext } from "react"

export function useField(){
  const field = useContext<IFieldParams>(FieldContext)
  return field
}