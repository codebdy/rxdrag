import { Listener, Subscriber, isFn } from "@rxdrag/shared";
import { IBehavior, IBehaviorManager, IBehaviorRule, IDesignerEngine, ITreeNode, Selector } from "../interfaces";

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

  private meetSelector(node: ITreeNode, selector: string | Selector) {
    if (node.meta.componentName === selector) {
      return true
    } else if (isFn(selector)) {
      return selector(node)
    }

    return false
  }
}