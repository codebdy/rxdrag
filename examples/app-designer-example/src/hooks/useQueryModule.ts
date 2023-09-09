import { modules } from "../data/mudules";

export function useQueryModule(moduleId: string) {
  return {
    module: modules.find(mod => mod.id === moduleId),
    loading: false,
  }
}