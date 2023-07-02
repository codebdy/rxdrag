import { AbstractController, INIT_EVENT_NAME } from "@rxdrag/minions-runtime-react";
import { IShortcutControllerMeta } from "./IShortcutControllerMeta";
import { SEARCH_CONTROLLER_NAME } from "./consts";

export class SearchController extends AbstractController {
  constructor(public meta: IShortcutControllerMeta) {
    super(meta)
    this.name = SEARCH_CONTROLLER_NAME
  }
  init(/*relatedControllers: Controllers | undefined*/) {
    this.events[INIT_EVENT_NAME] = this.initEvent
    this.destoryEvent = this.destory
  }

  destory(): void {
    throw new Error("Method not implemented.");
  }

  initEvent = () => {
    console.log("not implement")
  }

  search = () => {
    console.log("not implement")
  }
}
