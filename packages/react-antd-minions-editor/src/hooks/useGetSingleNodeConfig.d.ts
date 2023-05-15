import { IActivityMaterial } from "@rxdrag/schema";
export declare function useGetSingleNodeConfig(): (nodeMeta: IReactionMeta<IConfigMeta>, material: IActivityMaterial | undefined) => {
    id: any;
    shape: string;
    x: any;
    y: any;
    width: number;
    height: number;
    data: {
        meta: IReactionMeta<IConfigMeta>;
        backgroundColor: string;
        color: string;
        material: any;
        token: import("antd/es/theme/interface").GlobalToken;
        width: number;
        height: number;
        subLabel: any;
        inputCounts: any;
        outputCounts: any;
    };
    ports: {
        groups: {
            in: {
                position: string;
                attrs: {
                    circle: {
                        r: number;
                        magnet: boolean;
                        stroke: string;
                        strokeWidth: number;
                        fill: string;
                    };
                };
            };
            out: {
                position: string;
                attrs: {
                    circle: {
                        r: number;
                        magnet: boolean;
                        stroke: string;
                        strokeWidth: number;
                        fill: string;
                    };
                };
            };
        };
        items: {
            id: any;
            markup: {
                tagName: string;
                selector: string;
            }[];
            group: "in" | "out";
            attrs: {
                text: {
                    text: string | undefined;
                    fill: string;
                    fontSize: number;
                };
                bg: {
                    ref: string;
                    refWidth: string;
                    refHeight: string;
                    refX: number;
                    refY: number;
                    fill: string;
                };
            };
            label: {
                position: {
                    name: string;
                };
            };
        }[];
    };
};
