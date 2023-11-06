import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"
import { IEntityListQueryConfig, ISort } from "../common/IEntityQueryConfig"
import { EntityFetcher } from "../../../data/EntityFetcher"

@Activity(QueryEntities.NAME)
export class QueryEntities extends AbstractActivity<IEntityListQueryConfig> {
  public static NAME = "qurey-entities"
  public static INPUT_QUERY = "query"
  public static INPUT_CONDITION_PARAMS = "condition_params"
  public static INPUT_SORT = "sort"
  public static OUTPUT_LIST = "list"
  public static OUTPUT_PAGINATION = "pagination"
  public static OUTPUT_FILTERS = "filters"
  public static OUTPUT_SORTER = "sorter"
  public static OUTPUT_SUCCESS = "success"
  public static OUTPUT_FAILURE = "failure"
  public static OUTPUT_LOADING = "loading"

  private current = 1;
  private pageSize?: number;
  private waitingToFetch?: boolean;
  private started?: boolean;

  private conditionParams?: Record<string, unknown>;
  private sortParams?: ISort[];
  private runContext: Record<string, unknown> = {};
  private fetcher: EntityFetcher
  constructor(meta: INodeDefine<IEntityListQueryConfig>,) {
    super(meta)
    this.fetcher = new EntityFetcher(this.config?.entityId)
    this.pageSize = this.config?.pageSize
    this.fetcher.subscribeToEntitySaved(this.revalidate)
  }

  @Input(QueryEntities.INPUT_QUERY)
  queryHandler = (inputValue?: unknown, runContext?: object) => {
    console.log("====>entity list query")
    this.runContext = { ...this.runContext, ...runContext }
    this.triggerFetch()
    this.started = true;
  }

  @Input(QueryEntities.INPUT_CONDITION_PARAMS)
  conditionParamsHandler = (inputValue?: unknown, runContext?: object) => {
    console.log("====>entity list condition", inputValue)
    this.runContext = { ...this.runContext, ...runContext }
    if (this.conditionParams !== inputValue) {
      this.conditionParams = inputValue as Record<string, unknown> | undefined
      if (this.started) {
        this.triggerFetch(true)
      }
    }
  }

  @Input(QueryEntities.INPUT_SORT)
  sortParamsHandler = (inputValue?: unknown, runContext?: object) => {
    console.log("====>entity list sort")
    this.runContext = { ...this.runContext, ...runContext }
    this.sortParams = inputValue as ISort[] | undefined
  }

  handlePaginationChange = (currentPage: number, pageSize?: number) => {
    console.log("====>entity list pagination")
    if (currentPage !== this.current || this.pageSize !== pageSize) {
      this.current = currentPage;
      this.pageSize = pageSize;
      //只有查询过以后，页码变化才会重拉数据
      if (this.started) {
        this.triggerFetch(true)
      }
    }
  }

  triggerFetch = (isReFetch?: boolean) => {
    if (!this.waitingToFetch) {
      this.waitingToFetch = true
      setTimeout(() => {
        this.waitingToFetch = false;
        this.doFetch(isReFetch)
      }, 10)
    }
  }

  revalidate = () => {
    if (this.started) {
      this.doFetch(true, true)
    }
  }

  doFetch = (isRefetch?: boolean, revalidating?: boolean) => {
    if (!revalidating) {
      this.next(true, this.runContext, QueryEntities.OUTPUT_LOADING)
    }

    this.fetcher.multiFetch(this.conditionParams, this.sortParams, this.current, this.pageSize).then(data => {
      this.next(data?.data, this.runContext, QueryEntities.OUTPUT_LIST)
      if (!isRefetch) {
        this.next("success", this.runContext, QueryEntities.OUTPUT_SUCCESS)
      }

      this.next(
        {
          current: this.current,
          pageSize: this.pageSize,
          onPageChange: this.handlePaginationChange,
          total: data?.total,
        },
        this.runContext,
        QueryEntities.OUTPUT_PAGINATION
      )
    }).catch((err) => {
      this.next(err, this.runContext, QueryEntities.OUTPUT_FAILURE)
    }).finally(() => {
      if (!revalidating) {
        this.next(false, this.runContext, QueryEntities.OUTPUT_LOADING)
      }
    })
  }

  destroy = () => {
    super.destroy()
    this.fetcher.unscrbe(this.revalidate)
    this.fetcher.destory()
  }
}
