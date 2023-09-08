import { modules } from "../data/mudules";

export function useQueryModules() {
  return { modules: modules, loading: false }
}