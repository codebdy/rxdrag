import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Input, Modal } from "antd";
import { memo, useCallback, useEffect } from "react";
import { useTrans } from "../../hooks/useTrans";
import { ValueInput } from "@rxdrag/react-antd-props-inputs";
export const VariableDialog = memo((props) => {
    const { title, value, onOk, onCancel, ...other } = props;
    const t = useTrans();
    const [form] = Form.useForm();
    const handleOk = useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        form.validateFields().then((values) => {
            onOk?.({ ...value, ...values });
            form.resetFields();
        });
    }, [form, onOk, value]);
    useEffect(() => {
        form.setFieldsValue(value);
    }, [form, value]);
    const handleCancel = useCallback(() => {
        form.resetFields();
        onCancel?.();
    }, [form, onCancel]);
    return (_jsx(Modal, { ...other, forceRender: true, title: t(title), okText: t('$confirm'), cancelText: t('$cancel'), onOk: handleOk, onCancel: handleCancel, width: 380, children: _jsxs(Form, { name: "name-input-form", form: form, labelCol: { span: 4 }, labelAlign: "left", autoComplete: "off", initialValues: value, children: [_jsx(Form.Item, { name: "name", required: true, label: t("$name"), rules: [{ required: true, message: t("$pleaseInputName") }], children: _jsx(Input, {}) }), _jsx(Form.Item, { name: "defaultValue", label: t("$defaultValue"), children: _jsx(ValueInput, {}) })] }) }));
});
