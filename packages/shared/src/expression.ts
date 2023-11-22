import { isStr } from "./types";

export function isExp(value?: unknown) {
  return isStr(value) && value.trim().startsWith("{{") && value.trim().endsWith("}}")
}

export function getExpBody(value?: string | null) {
  if (isExp(value)) {
    const newValue = value?.trim()
    return newValue?.substring(0, newValue?.length - 2).substring(2)
  }

  return null
} 