import { jsx as _jsx } from "react/jsx-runtime";
import { useContext, useEffect, useRef, useState } from 'react';
import { Form, Input } from 'antd';
import { EditableContext } from "./EditableContext";
export const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        }
        catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (_jsx(Form.Item, { style: { margin: 0 }, name: dataIndex, rules: [
                {
                    required: true,
                    message: `${title} is required.`,
                },
            ], children: _jsx(Input, { ref: inputRef, onPressEnter: save, onBlur: save }) })) : (_jsx("div", { className: "editable-cell-value-wrap", style: { paddingRight: 24 }, onClick: toggleEdit, children: children }));
    }
    return _jsx("td", { ...restProps, children: childNode });
};
