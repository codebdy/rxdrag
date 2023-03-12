import { IBehavior, IBehaviorRule, IComponentConfig, IComponentManager, IDesignerEngine, Selector } from "interfaces";
export declare class ComponentBehavior implements IBehavior {
    name: string;
    selector: string | Selector;
    rule: IBehaviorRule;
    constructor(name: string, rule: IBehaviorRule);
}
export declare class ComponentManager implements IComponentManager {
    private engine;
    private behaviors;
    private components;
    constructor(engine: IDesignerEngine);
    getComponentDesigner(componentName: string): IComponentConfig | undefined;
    registerComponents(...componentDesigners: IComponentConfig[]): void;
    /**
     * 把多个符合条件的behavior合并成一个Rule
     * @param nodeId
     */
    getNodeBehaviorRules(nodeId: string): IBehaviorRule[];
    registerBehaviors(...behaviors: IBehavior[]): void;
    removeBehaviors(...names: string[]): void;
    setBehaviors(...behaviors: IBehavior[]): void;
    private meetSelector;
}
