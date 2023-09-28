import { ID } from "@rxdrag/shared";
import { useModule } from "./useModule";

export function useModuleFlow(id:ID){
  const module = useModule()

  return module?.flows?.find(flow=>flow.id === id)
} 