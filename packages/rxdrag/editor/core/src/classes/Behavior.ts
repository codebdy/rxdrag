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

  disabled() {
    if (isFn(this.rule.disabled)) {
      return this.rule.disabled(this.node, this.engine)
    }
    return false
  }

  selectable() {
    if (isFn(this.rule.selectable)) {
      return this.rule.selectable(this.node, this.engine)
    }
    return true
  }

  droppable() {
    if (isFn(this.rule.droppable)) {
      return this.rule.droppable(this.node, this.engine)
    }
    return false
  }

  draggable() {
    if (isFn(this.rule.disabled)) {
      return this.rule.disabled(this.node, this.engine)
    }
    return true
  }

  deletable() {
    if (isFn(this.rule.deletable)) {
      return this.rule.deletable(this.node, this.engine)
    }
    return true
  }

  cloneable() {
    if (isFn(this.rule.cloneable)) {
      return this.rule.cloneable(this.node, this.engine)
    }
    return true
  }

  resizable() {
    if (isFn(this.rule.resizable)) {
      return this.rule.resizable(this.node, this.engine)
    }
    return undefined
  }

  moveable() {
    if (isFn(this.rule.moveable)) {
      return this.rule.moveable(this.node, this.engine)
    }
    return undefined
  }

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
    return false
  }

  allowChild(options?: CompareSource) {
    if (isFn(this.rule.allowChild)) {
      return this.rule.allowChild(options, this.engine)
    }
    return true
  };

  allowAppendTo(options?: CompareSource) {
    if (isFn(this.rule.allowAppendTo)) {
      return this.rule.allowAppendTo(options, this.engine)
    }
    return true
  };

  allowSiblingsTo(options?: CompareSource) {
    if (isFn(this.rule.allowSiblingsTo)) {
      return this.rule.allowSiblingsTo(options, this.engine)
    }
    return true
  };

  noPlaceholder() {
    if (isFn(this.rule.noPlaceholder)) {
      return this.rule.noPlaceholder(this.node, this.engine)
    }
    return false
  }

  noRef() {
    if (isFn(this.rule.noRef)) {
      return this.rule.noRef(this.node, this.engine)
    }
    return false
  }

  lockable() {
    if (isFn(this.rule.lockable)) {
      return this.rule.lockable(this.node, this.engine)
    }
    return false
  }

}