import { IField } from "@rxdrag/fieldy"
import { useContext } from "react"
import { FieldContext } from "../contexts"

export function useField() {
  const field = useContext<IField | undefined>(FieldContext)
  return field
}