import { jsx as _jsx } from "react/jsx-runtime";
import { Form } from 'antd';
import { EditableContext } from "./EditableContext";
export const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (_jsx(Form, { form: form, component: false, children: _jsx(EditableContext.Provider, { value: form, children: _jsx("tr", { ...props }) }) }));
};
