import { IBehavior, IBehaviorRule, IComponentConfig, IComponentManager, IDesignerEngine, ITreeNode, Selector } from "../interfaces";
import { Listener, Subscriber, isFn } from "@rxdrag/shared";

export class ComponentBehavior implements IBehavior {
  selector: string | Selector;
  rule: IBehaviorRule;
  constructor(public name: string, rule: IBehaviorRule) {
    this.selector = name
    this.rule = rule
  }
}

//先注册behavior，再注册components，只有components是可以订阅的
export class ComponentManager<ComponentType = unknown> implements IComponentManager<ComponentType> {
  private components = new Subscriber<Record<string, IComponentConfig<ComponentType, unknown> | undefined>>({})
  private behaviors = new Subscriber<Record<string, IBehavior | undefined>>({})

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private engine: IDesignerEngine<ComponentType, any>) {
  }

  getAllComponentConfigs(): Record<string, IComponentConfig<ComponentType, unknown> | undefined> | undefined {
    return this.components.getValue()
  }

  subscribeChange = (listener: Listener<Record<string, IComponentConfig<ComponentType, unknown> | undefined>>) => {
    return this.components.subscribeChange(listener)
  };


  getComponentConfig(componentName: string): IComponentConfig<ComponentType> | undefined {
    return this.components?.getValue()?.[componentName]
  }

  registerComponents(...componentDesigners: IComponentConfig<ComponentType>[]): void {
    for (const designer of componentDesigners) {
      if (designer.behaviorRule) {
        this.registerBehaviors(new ComponentBehavior(designer.componentName, designer.behaviorRule))
      }
      if (designer.designerLocales) {
        this.engine.getLocalesManager().registerComponentLocales(designer.componentName, designer.designerLocales)
      }
      this.components.setValue({ ...this.components.getValue(), [designer.componentName]: designer })
    }
  }

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

  subscribeComponentsChange = (listener: Listener<Record<string, IComponentConfig<ComponentType, unknown> | undefined>>) => {
    return this.components.subscribeChange(listener)
  };

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