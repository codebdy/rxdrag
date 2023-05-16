import React from "react";
import "./style.less";
import { INodeSchema } from "@rxdrag/schema";
import { ILocales } from "@rxdrag/locales";
export type Antd5EditorProps = {
    leftNav?: React.ReactNode;
    topBar?: React.ReactNode;
    navPanel?: React.ReactNode;
    themeMode?: "dark" | "light";
    children?: React.ReactNode;
    locales?: ILocales;
    schemas: INodeSchema;
    canvasUrl: string;
    previewUrl: string;
};
export declare const RxEditorAntd: React.MemoExoticComponent<(props: Antd5EditorProps) => JSX.Element>;
