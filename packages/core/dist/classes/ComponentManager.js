import { isFn } from "utils/types";
export class ComponentBehavior {
    constructor(name, rule){
        this.name = name;
        this.selector = name;
        this.rule = rule;
    }
}
export class ComponentManager {
    getComponentDesigner(componentName) {
        return this.components[componentName];
    }
    // getDesignerSchema(componentName: string): INodeSchema | undefined {
    //   return this.components[componentName]?.designerSchema
    // }
    registerComponents(...componentDesigners) {
        for (const designer of componentDesigners){
            this.components[designer.componentName] = designer;
            if (designer.behaviorRule) {
                this.registerBehaviors(new ComponentBehavior(designer.componentName, designer.behaviorRule));
            }
            if (designer.designerLocales) {
                this.engine.getLoacalesManager().registerComponentLocales(designer.componentName, designer.designerLocales);
            }
        }
    }
    /**
   * 把多个符合条件的behavior合并成一个Rule
   * @param nodeId 
   */ getNodeBehaviorRules(nodeId) {
        const rules = [];
        const node = this.engine.getMonitor().getNode(nodeId);
        for (const key of Object.keys(this.behaviors)){
            const behavior = this.behaviors[key];
            if (node && behavior.rule && this.meetSelector(node, behavior.selector)) {
                rules.push(behavior.rule);
            }
        }
        return rules;
    }
    registerBehaviors(...behaviors) {
        for (const behavior of behaviors){
            this.behaviors[behavior.name] = behavior;
        }
    }
    removeBehaviors(...names) {
        for (const name of names){
            if (this.behaviors[name]) {
                delete this.behaviors[name];
            }
        }
    }
    setBehaviors(...behaviors) {
        this.behaviors = {};
        this.registerBehaviors(...behaviors);
    }
    meetSelector(node, selector) {
        if (node.meta.componentName === selector) {
            return true;
        } else if (isFn(selector)) {
            return selector(node);
        }
        return false;
    }
    constructor(engine){
        this.engine = engine;
        this.behaviors = {};
        this.components = {};
    }
}

//# sourceMappingURL=ComponentManager.js.map