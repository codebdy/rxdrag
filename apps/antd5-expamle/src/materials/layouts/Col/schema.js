import { createSchema } from "react-shells/ant5/shared/createSchema";
const options = {
    propsSchemas: [
        {
            componentName: "FormItem",
            props: {
                label: "$span",
            },
            children: [
                {
                    componentName: "InputNumber",
                    "x-field": {
                        name: "span",
                        params: {
                            withBind: true,
                        }
                    },
                }
            ]
        },
    ]
};
export const rowSchema = createSchema(options);
