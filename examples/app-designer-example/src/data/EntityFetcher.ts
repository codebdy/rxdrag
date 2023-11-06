/* eslint-disable @typescript-eslint/no-explicit-any */
import { createId } from "@rxdrag/shared";
import { ISort } from "../minions/activities/common/IEntityQueryConfig";
import { EntityInstance, allDatas } from "./runtime-mock";
import { EVENT_DATA_CHANGED, off, on, trigger } from "../hooks/events";
import { isObject, isString } from "lodash";

export interface IListData {
  data?: EntityInstance[],
  total?: number,
}

export type EntitySavedListener = () => void
export type UnListener = () => void

export class EntityFetcher {
  private listeners: EntitySavedListener[] = []
  constructor(private entityId?: string) {
    on(EVENT_DATA_CHANGED, this.handleEnvent as any);
  }


  public multiFetch(conditionParams: any | undefined, sorts: ISort[] | undefined, pageNumber: number | undefined, pageSize: number | undefined): Promise<IListData | undefined> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const instances = allDatas?.filter(ins => this.entityId && ins.entityId === this.entityId).filter(ins => {
          if (!conditionParams) {
            return true
          }
          for (const key of Object.keys(conditionParams)) {
            const keyword = conditionParams[key]
            if (ins?.[key]) {
              if (isObject(ins?.[key])) {
                if ((ins?.[key] as any)?.id && (ins?.[key] as any)?.id !== conditionParams[key]?.id) {
                  return false
                }
              } else if (isString(ins?.[key]) && (ins?.[key] as string)?.indexOf(keyword) < 0) {
                return false
              }
            }
          }
          return true
        })
        if (pageSize) {
          const data = instances.slice(((pageNumber || 1) - 1) * pageSize, ((pageNumber || 1) * pageSize - 1))
          resolve({ total: instances.length, data })
        } else {
          resolve({ total: instances.length, data: instances })
        }
      }, 300)
    })
  }

  public saveOne(obj: any): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      const entityId = this.entityId
      if (entityId) {
        setTimeout(() => {
          const newObj = { ...obj, entityId: entityId, id: obj?.["id"] ?? createId() }
          if (obj?.["id"]) {
            allDatas.splice(allDatas.findIndex(value => value.id === obj?.["id"]), 1, newObj)
          } else {
            allDatas.push(newObj)
          }
          resolve(newObj)
          trigger(EVENT_DATA_CHANGED, entityId)
        }, 300)
      }
    })
  }

  public remove(obj: any): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      const entityId = this.entityId
      if (entityId) {
        setTimeout(() => {
          allDatas.splice(allDatas.findIndex(value => value.id === obj?.["id"]), 1)
          resolve(obj)
          trigger(EVENT_DATA_CHANGED, entityId)
        }, 300)
      }
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

  private handleEnvent = (event: CustomEvent) => {
    if (event.detail === this.entityId) {
      for (const listener of this.listeners) {
        listener()
      }
    }
  }

  destory = () => {
    off(EVENT_DATA_CHANGED, this.handleEnvent as any);
  }
}