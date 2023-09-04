import { ID, Listener, Subscriber, isFn } from "@rxdrag/shared";
import { AbleType, IBehaviorSchema, IBehaviorManager, IDesignerEngine, IResource, ITreeNode, Selector, IBehavior } from "../interfaces";
import { Behavior } from "./Behavior";

export class BehaviorManager implements IBehaviorManager {
  private behaviors = new Subscriber<Record<string, IBehaviorSchema | undefined>>({})

  constructor(private engine: IDesignerEngine) { }

  /**
   * 把多个符合条件的behavior合并成一个Rule
   * @param nodeId 
   */
  getNodeBehaviorSchemas(nodeId: string): IBehaviorSchema[] {
    const behaviorMetas: IBehaviorSchema[] = []
    const node = this.engine.getMonitor().getNode(nodeId)
    const behaviors = this.behaviors.getValue()
    for (const key of Object.keys(behaviors)) {
      const behavior = behaviors[key]
      if (node && behavior?.rule && this.meetSelector(node, behavior.selector)) {
        behaviorMetas.push(behavior)
      }
    }
    return behaviorMetas
  }

  registerBehaviors(...behaviors: IBehaviorSchema[]): void {
    const behaviorsMap: Record<string, IBehaviorSchema | undefined> = {}
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

  setBehaviors(...behaviors: IBehaviorSchema[]): void {
    this.behaviors.reset({})
    this.registerBehaviors(...behaviors)
  }

  subscribeBehaviorsChange = (listener: Listener<Record<string, IBehaviorSchema | undefined>>) => {
    return this.behaviors.subscribeChange(listener)
  };

  getNodeBehavior(nodeId: ID): IBehavior {
    return new Behavior(this.getNodeBehaviorSchemas(nodeId), this.engine)
  }
  getComponentBehavior(componentName: string): IBehavior {
    throw new Error("Method not implemented.");
  }
  getResourceBehavior(reource: IResource<unknown>): IBehavior {
    throw new Error("Method not implemented.");
  }

  private meetSelector(node: ITreeNode, selector: string | Selector) {
    if (node.meta.componentName === selector) {
      return true
    } else if (isFn(selector)) {
      return selector({ node }, this.engine)
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


const ableCheck = (defaultValue: any, nodeId: ID, able: any | AbleType, engine: IDesignerEngine): any => {
  if (able === undefined) {
    return defaultValue
  }
  if (isFn(able)) {
    return able(nodeId, engine)
  }
  return able || false
}
