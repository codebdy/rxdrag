import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"
import { DataSouceFactory } from "httpquery/lib/classes/factory"
import { IQueryConfig } from "httpquery/lib/interfaces"

@Activity(RestfulQuery.NAME)
export class RestfulQuery extends AbstractActivity<IQueryConfig> {
  public static NAME = "example.DataQuery"
  public static OUTPUT_NAME_DATA = "dataOut"
  public static OUTPUT_NAME_QUERYING = "querying"
  public static OUTPUT_NAME_ERROR = "error"

  constructor(meta: IActivityDefine<IQueryConfig>) {
    super(meta)
  }

  @Input()
  inputHandler(params: unknown): void {
    if(!this.meta.config){
      this.next(undefined);
      return
    }
    const dataSouce = DataSouceFactory(this.meta.config)
    //this.next(this.context?.form?.value)
  }
}