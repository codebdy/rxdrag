import { ISort } from "../minions/activities/common/IEntityQueryConfig";
import { EntityInstance, allDatas } from "./runtime-mock";

export interface IListData {
  data?: EntityInstance[],
  total?: number,
}

export type EntitySavedListener = () => void
export type UnListener = () => void

export class EntityFetcher {
  private listeners: EntitySavedListener[] = []
  constructor(private entityId?: string) { }

  public multiFetch(sorts: ISort[] | undefined, pageNumber: number | undefined, pageSize: number | undefined): Promise<IListData | undefined> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const instances = allDatas?.filter(ins => this.entityId && ins.entityId === this.entityId)
        if (pageSize) {
          const data = instances.slice((pageNumber || 0) * pageSize, (((pageNumber || 0) + 1) * pageSize - 1))
          resolve({ total: instances.length, data })
        } else {
          resolve({ total: instances.length, data: instances })
        }
      }, 300)
    })
  }

  subscribeToEntitySaved(listener: EntitySavedListener): UnListener {
    this.listeners.push(listener)
    return () => {
      this.listeners.splice(this.listeners.indexOf(listener), 1)
    }
  }

  unscrbe(listener: EntitySavedListener) {
    this.listeners.splice(this.listeners.indexOf(listener), 1)
  }

  destory=()=>{
    //
  }
}