import { formItemIcon } from "./icon";
import { formItemLocales, formItemResourceLocales } from "./locales";
import { formItemSchema } from "./schema";
import { Form } from "antd";
const name = "FormItem";
export const FormItemMaterial = {
    componentName: name,
    component: Form.Item,
    designer: Form.Item,
    designerLocales: formItemLocales,
    designerSchema: formItemSchema,
    resource: {
        name: name,
        icon: formItemIcon,
        color: "#dfa324",
        resourceLocales: formItemResourceLocales,
        elements: [
            {
                componentName: name,
                props: {
                    label: "FormItem"
                },
                locked: true,
            }
        ]
    },
    behaviorRule: {
        droppable: true,
        noRef: true,
        lockable: true,
    }
};
