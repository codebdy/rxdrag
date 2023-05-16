import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Form, Input, Modal, Switch } from "antd";
import { ControllerMetaEditor } from "@rxdrag/react-antd-minions-editor";
import { memo, useCallback, useEffect, useState } from "react";
import { useCurrentNode, useToolsTranslate } from "@rxdrag/react-core";
import { createUuid } from "@rxdrag/shared";
import { useControllerMetas } from "./hooks/useControllerMetas";
import { Toolbox } from "./Toolbox";
import { getAllMaterial, activityMaterialLocales } from "@rxdrag/react-minions-materials";
export const ReactionsInput = memo((props) => {
    const { events, title, value, onChange, ...other } = props;
    const [inputValue, setInputValue] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const t = useToolsTranslate();
    const node = useCurrentNode();
    const controllers = useControllerMetas();
    useEffect(() => {
        setInputValue(value);
    }, [value]);
    useEffect(() => {
        const eventMetas = [...(value?.events || [])];
        for (const event of events || []) {
            if (!value?.events?.find(evt => evt.name === event.name)) {
                eventMetas.push({
                    id: createUuid(),
                    name: event.name,
                    label: event.label,
                    nodes: [],
                    lines: [],
                });
            }
        }
        if (value) {
            setInputValue({ ...value, events: eventMetas });
        }
    }, [events, value]);
    const showModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);
    const handleCancel = useCallback(() => {
        setIsModalOpen(false);
    }, []);
    const handleSwitchChange = useCallback((checked) => {
        if (checked) {
            const id = value?.id || createUuid();
            onChange?.({ ...value, id: id, enable: true });
        }
        else {
            if (value) {
                onChange?.({ ...value, enable: false });
            }
        }
    }, [onChange, value]);
    const handleNameChange = useCallback((e) => {
        const { value: inputValue } = e.target;
        if (value) {
            onChange?.({ ...value, name: inputValue });
        }
    }, [onChange, value]);
    const handleChange = useCallback((meta) => {
        if (value) {
            setInputValue({ ...meta, id: value.id, name: value?.name });
        }
    }, [value]);
    const handleOk = useCallback(() => {
        onChange?.(inputValue);
        setIsModalOpen(false);
    }, [inputValue, onChange]);
    return (_jsxs("div", { children: [_jsx(Form.Item, { label: title, children: _jsx(Switch, { checked: value?.enable, onChange: handleSwitchChange }) }), value?.id && value?.enable &&
                _jsxs(_Fragment, { children: [_jsx(Form.Item, { label: t("controllerName"), children: _jsx(Input, { value: value.name, onChange: handleNameChange }) }), _jsx(Form.Item, { label: t("config"), children: _jsx(Button, { ...other, onClick: showModal, children: t("configController") }) }), _jsx(Modal, { title: `${t("configController")} - ${inputValue?.name || node?.title}`, open: isModalOpen, cancelText: t("cancel"), okText: t("confirm"), onCancel: handleCancel, onOk: handleOk, width: "calc(100vw - 40px)", style: {
                                transform: 'scale(1)',
                            }, getContainer: false, centered: true, destroyOnClose: true, children: inputValue &&
                                _jsx(ControllerMetaEditor, { value: inputValue, onChange: handleChange, controllerMetas: controllers, materials: getAllMaterial(), toolbox: _jsx(Toolbox, {}), locales: activityMaterialLocales }) })] })] }));
});
