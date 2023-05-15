import { jsx as _jsx } from "react/jsx-runtime";
import { Form, Input, Modal } from "antd";
import { memo, useCallback } from "react";
import { useTrans } from "../../hooks/useTrans";
export const NameDialog = memo((props) => {
    const { title, value, onOk, onCancel, ...other } = props;
    const t = useTrans();
    const [form] = Form.useForm();
    const handleOk = useCallback(() => {
        form.validateFields().then((values) => {
            onOk?.(values?.name);
            form.resetFields();
        });
    }, [form, onOk]);
    const handleCancel = useCallback(() => {
        form.resetFields();
        onCancel?.();
    }, [form, onCancel]);
    return (_jsx(Modal, { ...other, title: t(title), okText: t('$confirm'), cancelText: t('$cancel'), onOk: handleOk, onCancel: handleCancel, width: 380, children: _jsx(Form, { name: "name-input-form", form: form, labelCol: { span: 4 }, labelAlign: "left", autoComplete: "off", initialValues: { name: value }, children: _jsx(Form.Item, { name: "name", required: true, label: t("$name"), rules: [{ required: true, message: t("$pleaseInputName") }], children: _jsx(Input, {}) }) }) }));
});
