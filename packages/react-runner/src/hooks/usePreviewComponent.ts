import { usePreviewComponents } from "./usePreviewComponents";

export function usePreviewComponent(name?: string) {
  const components = usePreviewComponents();
  return name ? (components[name] || name) : null
}