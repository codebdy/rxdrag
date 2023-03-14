import { IComponentMaterial } from "core-react";
import { IResource } from "core";
export type MaterialGroup = {
    titleKey: string;
    items: IComponentMaterial[];
};
export declare const materials: MaterialGroup[];
export declare const fields: IResource[];
export declare const slots: IComponentMaterial[];
