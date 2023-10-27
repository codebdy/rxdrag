export interface EntityInstance {
  entityId: string,
  id: string,
  [key: string]: unknown,
}

export const allDatas: EntityInstance[] = []