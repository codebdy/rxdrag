import { useForm } from "./useForm"
import { useField } from "./useField"

export function useFieldNode() {
  const field = useField()
  const form = useForm()
  return field || form
}