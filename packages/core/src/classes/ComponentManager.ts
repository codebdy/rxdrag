import { IBehavior, IBehaviorRule, IComponentConfig, IComponentManager, IDesignerEngine, ITreeNode, Selector } from "core/interfaces";
import { isFn } from "core/utils/types";

export class ComponentBehavior implements IBehavior {
  selector: string | Selector;
  rule: IBehaviorRule;
  constructor(public name: string, rule: IBehaviorRule) {
    this.selector = name
    this.rule = rule
  }
}

export class ComponentManager implements IComponentManager {
  private behaviors: {
    [name: string]: IBehavior
  } = {}
  private components: {
    [name: string]: IComponentConfig
  } = {}

  constructor(private engine: IDesignerEngine) { }
  getComponentDesigner(componentName: string): IComponentConfig | undefined {
    return this.components[componentName]
  }
  // getDesignerSchema(componentName: string): INodeSchema | undefined {
  //   return this.components[componentName]?.designerSchema
  // }

  registerComponents(...componentDesigners: IComponentConfig[]): void {
    for (const designer of componentDesigners) {
      this.components[designer.componentName] = designer
      if (designer.behaviorRule) {
        this.registerBehaviors(new ComponentBehavior(designer.componentName, designer.behaviorRule))
      }
      if (designer.designerLocales) {
        this.engine.getLoacalesManager().registerComponentLocales(designer.componentName, designer.designerLocales)
      }
    }
  }

  /**
   * 把多个符合条件的behavior合并成一个Rule
   * @param nodeId 
   */
  getNodeBehaviorRules(nodeId: string): IBehaviorRule[] {
    const rules: IBehaviorRule[] = []

    const node = this.engine.getMonitor().getNode(nodeId)
    for (const key of Object.keys(this.behaviors)) {
      const behavior = this.behaviors[key]
      if (node && behavior.rule && this.meetSelector(node, behavior.selector)) {
        rules.push(behavior.rule)
      }
    }
    return rules
  }

  registerBehaviors(...behaviors: IBehavior[]): void {
    for (const behavior of behaviors) {
      this.behaviors[behavior.name] = behavior
    }
  }

  removeBehaviors(...names: string[]): void {
    for (const name of names) {
      if (this.behaviors[name]) {
        delete this.behaviors[name]
      }
    }
  }
  setBehaviors(...behaviors: IBehavior[]): void {
    this.behaviors = {}
    this.registerBehaviors(...behaviors)
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