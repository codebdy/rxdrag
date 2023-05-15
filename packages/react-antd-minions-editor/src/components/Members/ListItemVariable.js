import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { useTranslate } from "@rxdrag/react-locales";
import { memo, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { VariableDialog } from "./VariableDialog";
const ListItem = styled.div `
  display: flex;
  align-items: center;
`;
export const ListItemVariable = memo((props) => {
    const { value, editTitle, children, onChange, onRemove, ...other } = props;
    const [hover, setHover] = useState(false);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const t = useTranslate();
    const handleMouseEnter = useCallback(() => {
        setHover(true);
    }, []);
    const handleMouseLeave = useCallback(() => {
        setHover(false);
    }, []);
    const handleItemClick = useCallback(({ key }) => {
        setOpen(false);
        if (key === 'edit') {
            setEditOpen(true);
        }
        else if (key === "delete") {
            onRemove(value.id);
        }
    }, [onRemove, value.id]);
    const items = useMemo(() => [
        {
            key: 'edit',
            label: t("edit"),
            icon: _jsx(EditOutlined, {}),
        },
        {
            key: 'delete',
            label: t("delete"),
            icon: _jsx(DeleteOutlined, {}),
        },
    ], [t]);
    const handleCancel = useCallback(() => {
        setEditOpen(false);
    }, []);
    const handleOk = useCallback((newValue) => {
        setEditOpen(false);
        onChange({ ...value, ...newValue });
    }, [onChange, value]);
    return (_jsxs(_Fragment, { children: [_jsxs(ListItem, { ...other, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: [children, (hover || open)
                        ? _jsx(Dropdown, { menu: { items, onClick: handleItemClick }, trigger: ['click'], onOpenChange: setOpen, children: _jsx(Button, { size: "small", type: "text", icon: _jsx(MoreOutlined, {}), style: { marginLeft: 8 } }) })
                        : _jsx("div", { style: { width: 32 } })] }), _jsx(VariableDialog, { title: editTitle, open: editOpen, value: value, onCancel: handleCancel, onOk: handleOk })] }));
});
