import { AbstractController, EventFunc, INIT_EVENT_NAME } from "@rxdrag/minions-runtime-react";
import { IShortcutControllerMeta } from "./IShortcutControllerMeta";
import { LIST_CONTROLLER_NAME } from "./consts";
import { QuerySession } from "httpquery/lib/classes/QuerySession";
import { message } from "antd";

export class ListController extends AbstractController {
  constructor(public meta: IShortcutControllerMeta) {
    super(meta)
    this.name = LIST_CONTROLLER_NAME
  }
  init(/*relatedControllers: Controllers | undefined*/) {
    this.events[INIT_EVENT_NAME] = this.initEvent
    this.destroyEvent = this.destroy
    this.events['onPageChange'] = this.onPageChange as EventFunc
  }

  destroy(): void {
    //throw new Error("Method not implemented.");
  }

  initEvent = () => {
    this.search()
  }

  onPageChange = (currentPage: number, pageSize?: number) => {
    this.setProp("currentPage", currentPage)
    this.setProp("pageSize", pageSize)
    this.search()
  }

  search = () => {
    const dataQuery = new QuerySession({ rootUrl: this.meta.url, entityName: this.meta.entityName })
    let urlParam = ""
    const currentPage = this.getProp("currentPage");
    const pageSize = this.getProp("pageSize")
    if (currentPage || pageSize) {
      urlParam = `?page=${pageSize}&pageSize=${pageSize}`
    }
    dataQuery.query(urlParam, {
      onData: (data) => {
        this.setProp("dataSource", data)
      },
      onError: (err: Error | undefined) => {
        message.error(err?.message)
      },
      onLoading: (loading?: boolean) => {
        this.setProp("loading", loading)
      },
    })
  }
}
