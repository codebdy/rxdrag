import { usePreviewComponents } from "@rxdrag/react-shared";

export function usePreviewComponent(name?: string) {
  const {components} = usePreviewComponents();
  return name ? (components[name] || name): null
}