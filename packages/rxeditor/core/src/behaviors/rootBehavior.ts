import { IBehaviorSchema, IDesignerEngine, SelectorSource } from "../interfaces";

export const rootBehavior: IBehaviorSchema = {
  name: "default.root",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selector: function (source: SelectorSource, _?: IDesignerEngine): boolean {
    return !source?.node?.parentId
  },
  priority: 10,
  rule: {
    draggable: false,
    droppable: true,
    cloneable: false,
    deletable: false,
  }
}