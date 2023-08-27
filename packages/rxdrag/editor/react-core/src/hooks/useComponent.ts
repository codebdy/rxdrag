import { useComponents } from "./useComponents";

export function useComponent(name?: string) {
  const components = useComponents();
  return name ? (components[name] || name) : null
}