import { IControllerMeta, IActivityMaterial } from "@rxdrag/schema";
import React, { ReactNode } from "react";
import { ILocales } from "@rxdrag/locales";
export declare const ControllerMetaEditor: React.MemoExoticComponent<(props: {
    value: IControllerMeta;
    onChange?: ((value?: any) => void) | undefined;
    controllerMetas: IControllerMeta[];
    materials: IActivityMaterial<ReactNode>[];
    toolbox?: React.ReactNode;
    lang?: string | undefined;
    locales?: ILocales | undefined;
}) => JSX.Element>;
