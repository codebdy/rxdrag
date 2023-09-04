import { CompareSource, IBehavior, IBehaviorSchema, IDesignerEngine } from "../interfaces";

export class Behavior implements IBehavior {
  constructor(private behaviorSchemas: IBehaviorSchema[], private engine: IDesignerEngine) {
    behaviorSchemas.sort((a, b) => {
      return ((b.priority || 0) - (a.priority || 0))
    })
  }

  disabled() {
    return false
  }
  selectable() {
    return true
  }
  droppable() {
    return false
  }
  draggable() {
    return true
  }
  deletable() {
    return true
  }
  cloneable() {
    return true
  }
  resizable() {
    return undefined
  }
  moveable() {
    return undefined
  }
  equalRatio() {
    return false
  }
  rotatable() {
    return false
  }
  allowChild(options?: CompareSource) {
    return true
  };
  allowAppendTo(options?: CompareSource) {
    return true
  };
  allowSiblingsTo(options?: CompareSource) {
    return true
  };

  noPlaceholder() {
    return false
  }
  noRef() {
    return false
  }
  lockable() {
    return false
  }

}