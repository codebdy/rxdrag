import { useFieldState } from "./useFieldState";

export function useFieldErrors() {
  const fieldState = useFieldState()

  return fieldState?.errors
}