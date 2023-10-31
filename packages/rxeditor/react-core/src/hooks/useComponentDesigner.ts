import { useComponentDesigners } from "./useComponentDesigners";

export function useComponentDesigner(name?: string) {
  const components = useComponentDesigners();
  return name ? (components[name] || name) : null
}