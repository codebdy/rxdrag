import { inputBaseSchemas } from "../schemas";
import { createSchema } from "react-shells/ant5/shared/createSchema";
const options = {
    propsSchemas: [
        ...inputBaseSchemas
    ]
};
export const selectSchema = createSchema(options);
