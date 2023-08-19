import { useSetDisplay } from "./useSetDisplay";

export function useClose(name?: string) {
  return useSetDisplay(name, false)
}