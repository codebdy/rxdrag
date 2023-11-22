import { isFn } from "@rxdrag/shared";
import { CompareSource, IBehavior, IBehaviorRule, IBehaviorSchema, IDesignerEngine, ITreeNode } from "../interfaces";

export class Behavior implements IBehavior {
  private rule: IBehaviorRule = {}
  constructor(behaviorSchemas: IBehaviorSchema[], private engine: IDesignerEngine, private node?: ITreeNode) {
    behaviorSchemas.sort((a, b) => {
      return ((b.priority || 0) - (a.priority || 0))
    })

    //合并规则
    for (const schema of behaviorSchemas) {
      this.rule = { ...this.rule, ...schema.rule }
    }
  }

  freedomContainer() {
    if (isFn(this.rule.freedomContainer)) {
      return this.rule.freedomContainer(this.node, this.engine)
    }
    if (this.rule.freedomContainer !== undefined) {
      return this.rule.freedomContainer
    }
    return false
  }

  disabled() {
    if (isFn(this.rule.disabled)) {
      return this.rule.disabled(this.node, this.engine)
    }
    if (this.rule.disabled !== undefined) {
      return this.rule.disabled
    }
    return false
  }

  selectable() {
    if (isFn(this.rule.selectable)) {
      return this.rule.selectable(this.node, this.engine)
    }
    if (this.rule.selectable !== undefined) {
      return this.rule.selectable
    }
    return true
  }

  droppable() {
    if (isFn(this.rule.droppable)) {
      return this.rule.droppable(this.node, this.engine)
    }
    if (this.rule.droppable !== undefined) {
      return this.rule.droppable
    }
    return false
  }

  draggable() {
    if (isFn(this.rule.draggable)) {
      return this.rule.draggable(this.node, this.engine)
    }
    if (this.rule.draggable !== undefined) {
      return this.rule.draggable
    }
    return true
  }

  deletable() {
    if (isFn(this.rule.deletable)) {
      return this.rule.deletable(this.node, this.engine)
    }

    if (this.rule.deletable !== undefined) {
      return this.rule.deletable
    }
    return true
  }

  cloneable() {
    if (isFn(this.rule.cloneable)) {
      return this.rule.cloneable(this.node, this.engine)
    }

    if (this.rule.cloneable !== undefined) {
      return this.rule.cloneable
    }
    return true
  }

  // resizable() {
  //   if (isFn(this.rule.resizable)) {
  //     return this.rule.resizable(this.node, this.engine)
  //   }
  //   return this.rule.resizable
  // }

  // moveable() {
  //   if (isFn(this.rule.moveable)) {
  //     return this.rule.moveable(this.node, this.engine)
  //   }
  //   return this.rule.moveable
  // }

  equalRatio() {
    if (isFn(this.rule.equalRatio)) {
      return this.rule.equalRatio(this.node, this.engine)
    }
    return false
  }

  rotatable() {
    if (isFn(this.rule.rotatable)) {
      return this.rule.rotatable(this.node, this.engine)
    }

    if (this.rule.rotatable !== undefined) {
      return this.rule.rotatable
    }
    return false
  }

  allowChild(options?: CompareSource) {
    if (isFn(this.rule.allowChild)) {
      return this.rule.allowChild(options, this.engine)
    }

    if (this.rule.allowChild !== undefined) {
      return this.rule.allowChild
    }
    return true
  };

  allowAppendTo(options?: CompareSource) {
    if (isFn(this.rule.allowAppendTo)) {
      return this.rule.allowAppendTo(options, this.engine)
    }

    if (this.rule.allowAppendTo !== undefined) {
      return this.rule.allowAppendTo
    }
    return true
  };

  allowSiblingsTo(options?: CompareSource) {
    if (isFn(this.rule.allowSiblingsTo)) {
      return this.rule.allowSiblingsTo(options, this.engine)
    }
    if (this.rule.allowSiblingsTo !== undefined) {
      return this.rule.allowSiblingsTo
    }
    return true
  };

  noPlaceholder() {
    if (isFn(this.rule.noPlaceholder)) {
      return this.rule.noPlaceholder(this.node, this.engine)
    }
    if (this.rule.noPlaceholder !== undefined) {
      return this.rule.noPlaceholder
    }
    return false
  }

  noRef() {
    if (isFn(this.rule.noRef)) {
      return this.rule.noRef(this.node, this.engine)
    }
    if (this.rule.noRef !== undefined) {
      return this.rule.noRef
    }
    return false
  }

  lockable() {
    if (isFn(this.rule.lockable)) {
      return this.rule.lockable(this.node, this.engine)
    }
    if (this.rule.lockable !== undefined) {
      return this.rule.lockable
    }
    return false
  }
}