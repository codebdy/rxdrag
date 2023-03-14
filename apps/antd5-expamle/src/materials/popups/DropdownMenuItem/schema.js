import { createSchema } from "react-shells/ant5/shared/createSchema";
const options = {
    propsSchemas: [
        {
            componentName: "FormItem",
            props: {
                label: "$title",
            },
            children: [
                {
                    componentName: "Input",
                    "x-field": {
                        name: "title",
                        params: {
                            withBind: true,
                        }
                    },
                }
            ]
        },
        {
            componentName: "FormItem",
            props: {
                label: "$disabled",
            },
            children: [
                {
                    componentName: "Switch",
                    "x-field": {
                        name: "disabled",
                        params: {
                            valuePropName: "checked",
                            withBind: true,
                        }
                    },
                }
            ]
        },
        {
            componentName: "FormItem",
            props: {
                label: "$icon",
            },
            children: [
                {
                    componentName: "IconInput",
                    "x-field": {
                        name: "icon",
                        params: {
                            withBind: true,
                        }
                    },
                }
            ]
        },
    ]
};
export const materialSchema = createSchema(options);
