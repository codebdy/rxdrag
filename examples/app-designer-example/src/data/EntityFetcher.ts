export interface IListData {
  data?: [],
  total?: number,
}

export class EntityFetcher {
  constructor(private entityId?: string) { }

  public multiFetch(): Promise<IListData | undefined> {
    return new Promise((resolve, reject) => {
      //
    })
  }
}