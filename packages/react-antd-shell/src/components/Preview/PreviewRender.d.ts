import { IDocument } from "@rxdrag/core";
import { IComponents } from "@rxdrag/react-shared";
import { IActivityMaterial } from "@rxdrag/schema";
import { ReactNode } from "react";
export declare const PreviewRender: import("react").MemoExoticComponent<(props: {
    components?: IComponents;
    doc?: IDocument;
    activityMaterials: IActivityMaterial<ReactNode>[];
}) => JSX.Element>;
