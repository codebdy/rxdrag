import { ControllerFactory } from "@rxdrag/minions-runtime-react"
import { ActionType, IShortcutControllerMeta } from "./IShortcutControllerMeta"
import { ListController } from "./ListController"
import { RemoveRecordController } from "./RemoveRecordController"
import { SearchController } from "./SearchController"
import { SubmitController } from "./SubmitController"

export const ShortcutControllerFactory: ControllerFactory = (meta: IShortcutControllerMeta) => {
  if (meta.actionType === ActionType.list) {
    return new ListController(meta)
  } else if (meta.actionType === ActionType.removeRecord) {
    return new RemoveRecordController(meta)
  } else if (meta.actionType === ActionType.submit) {
    return new SubmitController(meta)
  } else if (meta.actionType === ActionType.search) {
    return new SearchController(meta)
  }

  throw new Error("Can not find action controller")
}