import { createSchema } from "react-shells/ant5/shared/createSchema";
const options = {
    slotsSchemas: [
        {
            componentName: "FormItem",
            props: {
                label: "$actions",
            },
            children: [
                {
                    componentName: "SlotSwitch",
                    props: {
                        name: "actions"
                    }
                }
            ]
        },
        {
            componentName: "FormItem",
            props: {
                label: "$extra",
            },
            children: [
                {
                    componentName: "SlotSwitch",
                    props: {
                        name: "extra"
                    }
                }
            ]
        },
    ]
};
export const materialSchema = createSchema(options);
