import { useSetClosed } from "./useSetClosed";

export function useOpen(name?: string) {
  return useSetClosed(name, false)
}