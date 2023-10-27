import { ISort } from "../minions/activities/common/IEntityQueryConfig";

export interface IListData {
  data?: [],
  total?: number,
}

export type EntitySavedListener = () => void
export type UnListener = () => void

export class EntityFetcher {
  constructor(private entityId?: string) { }

  public multiFetch(sorts: ISort[] | undefined, pageNumber: number | undefined, pageSize: number | undefined): Promise<IListData | undefined> {
    return new Promise((resolve, reject) => {
      //
    })
  }


  subscribeToEntitySaved(listener: EntitySavedListener): UnListener {
    return () => {
      //
    }
  }

  unscrbe(listener: EntitySavedListener){
    //
  }

  destory(){
    //
  }
}