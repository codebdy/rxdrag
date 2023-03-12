export declare const typographySchema: ({
    componentName: string;
    "x-field": {
        name: string;
        label: string;
        params?: undefined;
    };
    props: {
        options: {
            label: string;
            value: string;
        }[];
    };
} | {
    componentName: string;
    "x-field": {
        name: string;
        label: string;
        params: {
            valuePropName: string;
        };
    };
    props?: undefined;
})[];
