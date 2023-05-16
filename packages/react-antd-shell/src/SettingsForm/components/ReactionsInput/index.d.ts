import React from "react";
import { IEventMeta } from "@rxdrag/react-antd-minions-editor";
import { IControllerMeta } from "@rxdrag/schema";
export declare const ReactionsInput: React.MemoExoticComponent<(props: {
    events?: IEventMeta[] | undefined;
    title: string;
    value?: IControllerMeta | undefined;
    onChange?: ((value?: IControllerMeta) => void) | undefined;
}) => JSX.Element>;
