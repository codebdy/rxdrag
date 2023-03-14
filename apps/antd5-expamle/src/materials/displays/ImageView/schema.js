import { createSchema } from "react-shells/ant5/shared/createSchema";
const options = {
    propsSchemas: [
        {
            componentName: "FormItem",
            props: {
                label: "$value",
            },
            children: [
                {
                    componentName: "ImageInput",
                    "x-field": {
                        name: "value",
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
                label: "$height",
            },
            children: [
                {
                    componentName: "SizeInput",
                    "x-field": {
                        name: "height",
                        params: {
                            withBind: true,
                        }
                    },
                    props: {
                        exclude: ["inherit", "auto"]
                    }
                }
            ]
        },
    ]
};
export const maretialSchema = createSchema(options);
