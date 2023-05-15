export declare function useTransformPorts(): (meta: IActivityDefine) => {
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
