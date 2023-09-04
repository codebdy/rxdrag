import { IBehaviorSchema, ITreeNode } from "../interfaces";

export const rootBehavior: IBehaviorSchema = {
  name: "default.root",
  selector: function (node?: ITreeNode): boolean {
    return !node?.parentId
  },
  rule: {
    draggable: false,
    droppable: true,
    cloneable: false,
    deletable: false,
  }
}