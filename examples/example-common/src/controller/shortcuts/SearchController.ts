import { AbstractController, Controllers, INIT_EVENT_NAME } from "@rxdrag/minions-runtime-react";
import { IShortcutControllerMeta } from "./IShortcutControllerMeta";
import { LIST_CONTROLLER_NAME, SEARCH_CONTROLLER_NAME } from "./consts";
import { LogicFlowContext } from "@rxdrag/react-runner";
import { ListController } from "./ListController";

export class SearchController extends AbstractController {
  context?: LogicFlowContext
  controllers?: Controllers
  constructor(public meta: IShortcutControllerMeta) {
    super(meta)
    this.name = SEARCH_CONTROLLER_NAME
  }
  init(relatedControllers: Controllers | undefined, context?: LogicFlowContext) {
    this.context = context
    this.controllers = relatedControllers
    this.events[INIT_EVENT_NAME] = this.initEvent
    this.events["onClick"] = this.onClickEvent
    this.destroyEvent = this.destroy
  }

  destroy(): void {
    //throw new Error("Method not implemented.");
  }

  initEvent = () => {
    //console.log("not implement")
  }

  onClickEvent = () => {
    //关键词的获取只是示例，可以使用内联表单提高扩展性
    for (const ctrlId of Object.keys(this.controllers || {})) {
      const ctrl = this.controllers?.[ctrlId] as ListController | undefined
      //找到列表控制器
      if (ctrl?.name === LIST_CONTROLLER_NAME) {
        const keyWords = this.context?.form?.getField("keywords")?.getValue()
        ctrl.setVariable("keyWords", keyWords)
        ctrl.search()
      }
    }
  }
}
