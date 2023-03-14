import { createSchema, withFormItem } from "react-shells/ant5/shared/createSchema";
import { typographySchema } from "../schema";
const options = {
    propsSchemas: [
        {
            componentName: "Input",
            "x-field": {
                name: "value",
                label: "$content",
            },
        },
        ...typographySchema,
    ],
    logicOptions: {
        canBindField: true,
    }
};
export const schema = createSchema(withFormItem(options));
