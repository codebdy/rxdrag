import React from "react";
import { Sider } from "./Sider";
import { Header } from "./Header";
declare const Content: any, Footer: any;
export interface ProLayoutProps {
    sider?: React.ReactElement<typeof Sider>;
    header?: React.ReactElement<typeof Header>;
    footer?: React.ReactElement<typeof Footer>;
    content?: React.ReactElement<typeof Content>;
}
export declare const TwoColumnLayout: any;
export {};
