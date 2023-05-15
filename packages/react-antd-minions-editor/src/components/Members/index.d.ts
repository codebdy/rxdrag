import React from "react";
import { IControllerMeta } from "@rxdrag/schema";
export declare const Members: React.MemoExoticComponent<(props: {
    value: IControllerMeta;
    selected?: string | undefined;
    onSelect?: ((id: string) => void) | undefined;
    onChange?: ((value?: any) => void) | undefined;
}) => JSX.Element>;
