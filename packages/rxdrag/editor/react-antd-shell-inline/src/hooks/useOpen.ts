import { useSetDisplay } from "./useSetDisplay";

export function useOpen(name?: string) {
  return useSetDisplay(name, true)
}