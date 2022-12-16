import { useDesignComponents } from "./useDesignComponents";

export function useDesignComponent(name?: string) {
  const {components} = useDesignComponents();
  return name ? (components[name] || name): null
}