import { createSchema } from "react-shells/ant5/shared/createSchema";
const options = {
    propsSchemas: [],
    slotsSchemas: [
        {
            componentName: "FormItem",
            props: {
                label: "$footer",
            },
            children: [
                {
                    componentName: "SlotSwitch",
                    props: {
                        name: "footer"
                    }
                }
            ]
        },
    ]
};
export const materialSchema = createSchema(options);
