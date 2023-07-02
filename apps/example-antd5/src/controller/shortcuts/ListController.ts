import { AbstractController, INIT_EVENT_NAME } from "@rxdrag/minions-runtime-react";
import { IShortcutControllerMeta } from ".";
import { LIST_CONTROLLER_NAME } from "./consts";

export class ListController extends AbstractController {
  constructor(public meta: IShortcutControllerMeta) {
    super(meta)
    this.name = LIST_CONTROLLER_NAME
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
