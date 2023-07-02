import { ReactNode } from "react";
import { ILogicMetas } from "@rxdrag/minions-logicflow-editor";
import { ActivityMaterialCategory, ILogicFlowDefinition } from "@rxdrag/minions-schema";
import { IComponents } from "@rxdrag/react-shared";
export type LogicFlowEditorAntd5InnerProps = {
    value: ILogicMetas;
    onChange?: (value: ILogicMetas) => void;
    materialCategories: ActivityMaterialCategory<ReactNode>[];
    setters?: IComponents;
    logicFlowContext?: unknown;
    canBeReferencedLogflowMetas?: ILogicFlowDefinition[];
};
export declare const LogicMetaEditorAntd5Inner: import("react").MemoExoticComponent<(props: LogicFlowEditorAntd5InnerProps) => JSX.Element>;
