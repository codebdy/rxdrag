import { createSchema, withFormItem } from "react-shells/ant5/shared/createSchema";
const options = {
    propsSchemas: [],
    logicOptions: {
        canBindField: true,
    }
};
export const materialSchema = createSchema(withFormItem(options));
