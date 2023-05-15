import React, { ReactNode } from "react";
import { IActivityMaterial } from "@rxdrag/schema";
export type ReactionResourceProps = {
    children?: (onMouseDown: ((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)) => ReactNode;
    material: IActivityMaterial<React.ReactNode>;
};
export declare const ReactionResource: React.MemoExoticComponent<(props: ReactionResourceProps) => JSX.Element>;
