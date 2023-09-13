import { useMaterials } from "./useMaterials";

export function useMaterial(name?: string) {
  const materials = useMaterials()

  return materials[name || ""]
}