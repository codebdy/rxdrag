import { useDesignComponentsParams } from "./useDesignComponentsParams";

export function useDesignComponent(name?: string) {
  const {components} = useDesignComponentsParams();
  return name ? (components[name] || name): null
}