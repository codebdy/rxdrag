import { IDesignerProps, INodeSchema, ITreeNode } from "./document";
import { IDesignerEngine } from "./engine";
import { ILocales } from "./loacales";
import { IResource } from "./resource";
import { ID } from "./types";
export type Selector = (node: ITreeNode, engine?: IDesignerEngine) => boolean;
export type IResizable = {
    width?: boolean;
    height?: boolean;
};
export type IMoveable = {
    x?: boolean;
    y?: boolean;
};
export type AbleCheckFunction = ((nodeId: ID, engine?: IDesignerEngine) => boolean);
export interface IBehaviorRule {
    disabled?: boolean | AbleCheckFunction;
    selectable?: boolean | AbleCheckFunction;
    droppable?: boolean | AbleCheckFunction;
    draggable?: boolean | AbleCheckFunction;
    deletable?: boolean | AbleCheckFunction;
    cloneable?: boolean | AbleCheckFunction;
    resizable?: IResizable | ((engine?: IDesignerEngine) => IResizable);
    moveable?: IMoveable | ((engine?: IDesignerEngine) => IMoveable);
    allowChild?: (target: ITreeNode, engine?: IDesignerEngine) => boolean;
    allowAppendTo?: (target: ITreeNode, engine?: IDesignerEngine) => boolean;
    allowSiblingsTo?: (target: ITreeNode, engine?: IDesignerEngine) => boolean;
    noPlaceholder?: boolean;
    noRef?: boolean;
    lockable?: boolean;
}
export interface IComponentConfig<ComponentType = any> {
    packageName?: string;
    componentName: string;
    component: ComponentType;
    designer: ComponentType;
    behaviorRule?: IBehaviorRule;
    designerSchema?: INodeSchema;
    designerLocales?: ILocales;
    designerProps?: IDesignerProps;
    resource?: IResource;
    slots?: {
        [name: string]: IComponentConfig | true | string | undefined;
    };
    toolsLocales?: ILocales;
    tools?: {
        [name: string]: ComponentType | undefined;
    };
}
export interface IBehavior {
    name: string;
    selector: string | Selector;
    rule: IBehaviorRule;
}
export interface IComponentManager {
    getNodeBehaviorRules(nodeId: ID): IBehaviorRule[];
    getComponentDesigner(componentName: string): IComponentConfig | undefined;
    registerComponents(...componentDesigners: IComponentConfig[]): void;
    registerBehaviors(...behaviors: IBehavior[]): void;
    removeBehaviors(...names: string[]): void;
    setBehaviors(...behaviors: IBehavior[]): void;
}
