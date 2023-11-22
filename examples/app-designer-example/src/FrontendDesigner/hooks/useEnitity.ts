import { useEntities } from "./useEntities";

export function useEnitity(id?: string) {
  const entities = useEntities()

  return entities?.find(ent => ent.uuid === id)
}