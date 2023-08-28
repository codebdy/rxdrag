import { useSetClosed } from "./useSetClosed";

export function useClose(name?: string) {
  return useSetClosed(name, true)
}