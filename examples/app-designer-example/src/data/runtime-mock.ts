export interface EntityInstance {
  entityName: string,
  id: string,
  [key: string]: unknown,
}

export const allDatas: EntityInstance[] = []