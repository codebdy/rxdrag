import { createSchema } from "react-shells/ant5/shared/createSchema";
const options = {
    propsSchemas: [
        {
            componentName: "FormItem",
            props: {
                label: "$gutter",
            },
            children: [
                {
                    componentName: "GutterInput",
                    "x-field": {
                        name: "gutter",
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
