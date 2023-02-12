import { useForm } from "./useForm"
import { useField } from "./useField"

export function useFieldNode() {
  const field = useField()
  const form = useForm()
  //console.log("哈哈 useFieldNode", field, form)
  return field || form
}