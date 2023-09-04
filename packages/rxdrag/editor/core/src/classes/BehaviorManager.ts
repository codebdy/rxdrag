import { ID, Listener, Subscriber, isFn } from "@rxdrag/shared";
import { AbleCallback, IBehavior, IBehaviorManager, IBehaviorRule, IDesignerEngine, IMoveable, INodeBehavior, IResizable, ITreeNode, Selector } from "../interfaces";

export class BehaviorManager implements IBehaviorManager {
  private behaviors = new Subscriber<Record<string, IBehavior | undefined>>({})

  constructor(private engine: IDesignerEngine) { }

  /**
   * 把多个符合条件的behavior合并成一个Rule
   * @param nodeId 
   */
  getNodeBehaviorRules(nodeId: string): IBehaviorRule[] {
    const rules: IBehaviorRule[] = []
    const node = this.engine.getMonitor().getNode(nodeId)
    const behaviors = this.behaviors.getValue()
    for (const key of Object.keys(behaviors)) {
      const behavior = behaviors[key]
      if (node && behavior?.rule && this.meetSelector(node, behavior.selector)) {
        rules.push(behavior.rule)
      }
    }
    return rules
  }

  registerBehaviors(...behaviors: IBehavior[]): void {
    const behaviorsMap: Record<string, IBehavior | undefined> = {}
    for (const behavior of behaviors) {
      behaviorsMap[behavior.name] = behavior
    }
    this.behaviors.setValue({ ...this.behaviors.getValue(), ...behaviorsMap })
  }

  removeBehaviors(...names: string[]): void {
    const behaviors = { ...this.behaviors.getValue() }
    for (const name of names) {
      if (behaviors[name]) {
        delete behaviors[name]
      }
    }
    this.behaviors.setValue({ ...this.behaviors.getValue(), ...behaviors })
  }

  setBehaviors(...behaviors: IBehavior[]): void {
    this.behaviors.reset({})
    this.registerBehaviors(...behaviors)
  }

  subscribeBehaviorsChange = (listener: Listener<Record<string, IBehavior | undefined>>) => {
    return this.behaviors.subscribeChange(listener)
  };

  getNodeBehavior(nodeId: ID): INodeBehavior {
    return {
      isDisabled: () => checkAbility("disabled", false, nodeId, this.engine) as boolean,
      isSelectable: () => checkAbility("selectable", true, nodeId, this.engine) as boolean,
      isDroppable: () => checkAbility("droppable", false, nodeId, this.engine) as boolean,
      isDraggable: () => checkAbility("draggable", true, nodeId, this.engine) as boolean,
      isDeletable: () => checkAbility("deletable", true, nodeId, this.engine) as boolean,
      isCloneable: () => checkAbility("cloneable", true, nodeId, this.engine) as boolean,
      isNoPlaceholder: () => checkAbility("noPlaceholder", false, nodeId, this.engine) as boolean,
      isNoRef: () => checkAbility("noRef", false, nodeId, this.engine) as boolean,
      isLockable: () => checkAbility("lockable", false, nodeId, this.engine) as boolean,
      isEqualRatio: () => checkAbility("equalRatio", false, nodeId, this.engine) as boolean,
      resizable: () => checkAbility("resizable", false, nodeId, this.engine) as IResizable | undefined,
      moveable: () => checkAbility("moveable", false, nodeId, this.engine) as IMoveable | undefined,
      rotatable: () => checkAbility("rotatable", false, nodeId, this.engine) as boolean,
    }
  }

  private meetSelector(node: ITreeNode, selector: string | Selector) {
    if (node.meta.componentName === selector) {
      return true
    } else if (isFn(selector)) {
      return selector(node)
    }

    return false
  }
}



export const checkAbility = (
  name: "disabled" | "selectable" | "droppable" | "draggable" | "deletable" | "cloneable" | "noPlaceholder" | "noRef" | "lockable" | "resizable" | "moveable" | "equalRatio" | "rotatable",
  defaultValue: any,
  nodeId: ID,
  engine: IDesignerEngine
) => {
  const nodeRules = engine.getBehaviorManager().getNodeBehaviorRules(nodeId)
  for (const rule of nodeRules) {
    const able = ableCheck(defaultValue, nodeId, rule[name], engine)
    if (able !== defaultValue) {
      return able
    }
  }

  return defaultValue
}


const ableCheck = (defaultValue: any, nodeId: ID, able: any | AbleCallback, engine: IDesignerEngine): any => {
  if (able === undefined) {
    return defaultValue
  }
  if (isFn(able)) {
    return able(nodeId, engine)
  }
  return able || false
}
