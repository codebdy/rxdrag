import { FieldContext } from "runner/fieldy/contexts"
import { useContext } from "react"
import { IField } from "../interfaces"

export function useField() {
  const field = useContext<IField | undefined>(FieldContext)
  return field
}