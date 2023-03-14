export declare const inputBaseSchemas: ({
    componentName: string;
    props: {
        label: string;
    };
    children: {
        componentName: string;
        "x-field": {
            name: string;
            params: {
                withBind: boolean;
            };
        };
    }[];
} | {
    componentName: string;
    props: {
        label: string;
    };
    children: {
        componentName: string;
        "x-field": {
            name: string;
            params: {
                valuePropName: string;
                withBind: boolean;
            };
        };
    }[];
} | {
    componentName: string;
    props: {
        label: string;
    };
    children: {
        componentName: string;
        "x-field": {
            name: string;
            params: {
                valuePropName: string;
                withBind: boolean;
            };
        };
        props: {
            defaultChecked: boolean;
        };
    }[];
} | {
    componentName: string;
    props: {
        label: string;
    };
    children: {
        componentName: string;
        "x-field": {
            name: string;
            params: {
                withBind: boolean;
            };
        };
        props: {
            optionType: string;
            options: {
                label: string;
                value: string;
            }[];
            defaultValue: string;
        };
    }[];
})[];
