import { IComponentMaterial, IComponentManager, IDesignerEngine } from "../interfaces";
import { Listener, Subscriber } from "@rxdrag/shared";

//先注册behavior，再注册components，只有components是可以订阅的
export class ComponentManager<ComponentType = unknown> implements IComponentManager<ComponentType> {
  private components = new Subscriber<Record<string, IComponentMaterial<ComponentType, unknown> | undefined>>({})

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private engine: IDesignerEngine<ComponentType, any>) {
  }

  getAllComponentConfigs(): Record<string, IComponentMaterial<ComponentType, unknown> | undefined> | undefined {
    return this.components.getValue()
  }

  subscribeChange = (listener: Listener<Record<string, IComponentMaterial<ComponentType, unknown> | undefined>>) => {
    return this.components.subscribeChange(listener)
  };


  getComponentConfig(componentName: string): IComponentMaterial<ComponentType> | undefined {
    return this.components?.getValue()?.[componentName]
  }

  registerComponents(...componentDesigners: IComponentMaterial<ComponentType>[]): void {
    for (const designer of componentDesigners) {
      if (designer.behaviorRule) {
        this.engine.getBehaviorManager().registerBehaviors({
          name: designer.componentName,
          selector: designer.componentName,
          rule: designer.behaviorRule
        }
        )
      }
      if (designer.designerLocales) {
        this.engine.getLocalesManager().registerComponentLocales(designer.componentName, designer.designerLocales)
      }
      this.components.setValue({ ...this.components.getValue(), [designer.componentName]: designer })
    }
  }

  subscribeComponentsChange = (listener: Listener<Record<string, IComponentMaterial<ComponentType, unknown> | undefined>>) => {
    return this.components.subscribeChange(listener)
  };
}