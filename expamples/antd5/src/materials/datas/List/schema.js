import { createSchema, withFormItem } from "react-shells/ant5/shared/createSchema";
const options = {
    propsSchemas: [
        {
            componentName: "Switch",
            "x-field": {
                name: "bordered",
                label: "$bordered",
                params: {
                    valuePropName: "checked",
                }
            },
        },
        {
            componentName: "Radio.Group",
            "x-field": {
                name: "size",
                label: "$size",
            },
            props: {
                optionType: "button",
                options: [
                    {
                        label: "$large",
                        value: "large"
                    },
                    {
                        label: "$middle",
                        value: "middle"
                    },
                    {
                        label: "$small",
                        value: "small"
                    },
                ],
                defaultValue: "middle",
            }
        },
    ],
    slotsSchemas: [
        {
            componentName: "SlotSwitch",
            props: {
                name: "header"
            },
            "x-field": {
                label: "$header",
            }
        },
        {
            componentName: "SlotSwitch",
            props: {
                name: "footer"
            },
            "x-field": {
                label: "$footer",
            }
        },
    ],
    logicOptions: {
        canBindField: true,
    }
};
export const materialSchema = createSchema(withFormItem(options));
