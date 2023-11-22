import { ID, Listener, Subscriber, isArr, isFn } from "@rxdrag/shared";
import { IBehaviorSchema, IBehaviorManager, IDesignerEngine, IResource, Selector, IBehavior, SelectorSource, ITreeNode } from "../interfaces";
import { Behavior } from "./Behavior";

export class BehaviorManager implements IBehaviorManager {
  private behaviors = new Subscriber<Record<string, IBehaviorSchema | undefined>>({})

  constructor(private engine: IDesignerEngine) { }

  /**
   * 把多个符合条件的behavior合并成一个Rule
   * @param nodeId 
   */
  getNodeBehaviorSchemas(node?: ITreeNode): IBehaviorSchema[] {
    const behaviorMetas: IBehaviorSchema[] = []
    const behaviors = this.behaviors.getValue()
    for (const key of Object.keys(behaviors)) {
      const behavior = behaviors[key]
      if (node && behavior?.rule && this.meetSelector({ node }, behavior.selector)) {
        behaviorMetas.push(behavior)
      }
    }
    return behaviorMetas
  }

  getResourceBehaviorSchemas(resource: IResource): IBehaviorSchema[] {
    const behaviorMetas: IBehaviorSchema[] = []
    const behaviors = this.behaviors.getValue()
    for (const key of Object.keys(behaviors)) {
      const behavior = behaviors[key]
      if (behavior?.rule && this.meetSelector({ resource }, behavior.selector)) {
        behaviorMetas.push(behavior)
      }
    }
    return behaviorMetas
  }

  getComponentBehaviorSchemas(componentName: string): IBehaviorSchema[] {
    const behaviorMetas: IBehaviorSchema[] = []
    const behaviors = this.behaviors.getValue()
    for (const key of Object.keys(behaviors)) {
      const behavior = behaviors[key]
      if (behavior?.rule && this.meetSelector({ componentName }, behavior.selector)) {
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
    const node = this.engine.getMonitor().getNode(nodeId)
    return new Behavior(this.getNodeBehaviorSchemas(node || undefined), this.engine)
  }

  getComponentBehavior(componentName: string): IBehavior {
    return new Behavior(this.getComponentBehaviorSchemas(componentName), this.engine)
  }
  getResourceBehavior(reource: IResource<unknown>): IBehavior {
    return new Behavior(this.getResourceBehaviorSchemas(reource), this.engine)
  }

  // isMoveable(nodeIds: string[]): boolean {
  //   let canMove = false
  //   for (const nodeId of nodeIds) {
  //     const behavior = this.engine.getBehaviorManager().getNodeBehavior(nodeId)
  //     const moveable = behavior.moveable()
  //     if (moveable?.left || moveable?.top) {
  //       canMove = true
  //     }
  //   }

  //   return canMove
  // }

  // isResizable(nodeIds: string[]): boolean {
  //   let canResize = false
  //   for (const nodeId of nodeIds) {
  //     const behavior = this.engine.getBehaviorManager().getNodeBehavior(nodeId)
  //     const resizable = behavior.resizable()
  //     if (resizable?.height || resizable?.width) {
  //       canResize = true
  //     }
  //   }

  //   return canResize
  // }

  private meetSelector(selectorSource: SelectorSource, selector: string | Selector) {
    if (!selector) {
      return false
    }

    if (selectorSource.node?.meta.componentName === selector || selectorSource.componentName === selector) {
      return true
    }

    if (isArr(selectorSource.resource?.elements)) {
      for (const element of selectorSource.resource?.elements || []) {
        if (element.componentName === selector) {
          return true
        }
      }
    } else if (selectorSource.resource?.elements.componentName === selector) {
      return true
    }

    if (selectorSource.componentName === selector) {
      return true
    }

    if (isFn(selector)) {
      return selector(selectorSource, this.engine)
    }

    return false
  }
}
