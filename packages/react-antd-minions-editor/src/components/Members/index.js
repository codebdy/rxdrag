import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { PlusOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { memo, useCallback, useState } from "react";
import styled from "styled-components";
import { ListItemReaction } from "./ListItemReaction";
import { ListItemVariable } from "./ListItemVariable";
import { NameDialog } from "./NameDialog";
import { VariableDialog } from "./VariableDialog";
import { methodIcon, variableIcon } from "@rxdrag/react-shared";
import { createUuid } from "@rxdrag/shared";
import { useTranslate } from "@rxdrag/react-locales";
const { Text } = Typography;
const Title = styled.div `
  display: flex;
  justify-content: space-between;
  padding: 8px;
  align-items: center;
  user-select: none;
`;
const List = styled.div `
  display: flex;
  flex-flow: column;
  padding: 0 8px;
`;
const ListItem = styled((props) => _jsx(Button, { type: "text", ...props })) `
  display: flex;
  align-items: center;
  margin: 2px 0;
  flex:1;
`;
export const Members = memo((props) => {
    const { value, selected, onSelect, onChange } = props;
    const [addReactionOpen, setAddReactionOpen] = useState(false);
    const [addVariableOpen, setAddVariableOpen] = useState(false);
    const t = useTranslate();
    const handleMemberClick = useCallback((id) => {
        if (id) {
            onSelect?.(id);
        }
    }, [onSelect]);
    const handleAddReaction = useCallback(() => {
        setAddReactionOpen(true);
    }, []);
    const handleAddVariable = useCallback(() => {
        setAddVariableOpen(true);
    }, []);
    const handleAddVariableCancel = useCallback(() => {
        setAddVariableOpen(false);
    }, []);
    const handleAddReactionOk = useCallback((name) => {
        if (name) {
            const newReaction = {
                id: createUuid(),
                label: name,
            };
            onChange?.({ ...value, reactions: [...value?.reactions || [], newReaction] });
        }
        setAddReactionOpen(false);
    }, [onChange, value]);
    const handleAddReactionCancel = useCallback(() => {
        setAddReactionOpen(false);
    }, []);
    const handleAddVariableOk = useCallback((meta) => {
        if (meta) {
            const newVariable = {
                ...meta,
                id: createUuid(),
            };
            onChange?.({ ...value, variables: [...value?.variables || [], newVariable] });
        }
        setAddVariableOpen(false);
    }, [onChange, value]);
    const handleRemoveReaction = useCallback((id) => {
        onChange?.({ ...value, reactions: value?.reactions?.filter(reaction => reaction.id !== id) });
    }, [onChange, value]);
    const handleRemoveVariable = useCallback((id) => {
        onChange?.({ ...value, variables: value?.variables?.filter(va => va.id !== id) });
    }, [onChange, value]);
    const handleChangeReaction = useCallback((id, label) => {
        onChange?.({ ...value, reactions: value?.reactions?.map(reaction => reaction.id !== id ? reaction : { ...reaction, label }) });
    }, [onChange, value]);
    const handleChangeVariable = useCallback((meta) => {
        onChange?.({ ...value, variables: value?.variables?.map(va => va.id !== meta.id ? va : { ...va, ...meta }) });
    }, [onChange, value]);
    return (_jsxs(_Fragment, { children: [_jsx(Title, { children: _jsx(Text, { type: "secondary", children: t("events") }) }), _jsx(List, { children: value?.events?.map((event) => {
                    return (_jsx(ListItem, { icon: _jsx(ThunderboltOutlined, {}), onClick: () => handleMemberClick(event.id), type: selected === event.id ? "default" : "text", children: event.label || event.name }, event.name));
                }) }), _jsxs(Title, { children: [_jsx(Text, { type: "secondary", children: t("reactions") }), _jsx(Button, { size: "small", type: "text", icon: _jsx(PlusOutlined, {}), onClick: handleAddReaction })] }), _jsx(List, { children: value?.reactions?.map((reaction) => {
                    return (_jsx(ListItemReaction, { id: reaction.id, name: reaction.label || "", editTitle: t("$editReaction"), onRemove: handleRemoveReaction, onChange: handleChangeReaction, children: _jsx(ListItem, { icon: methodIcon, onClick: () => handleMemberClick(reaction.id), type: selected === reaction.id ? "default" : "text", children: reaction.label || reaction.name }) }, reaction.id));
                }) }), _jsxs(Title, { children: [_jsx(Text, { type: "secondary", children: t("variables") }), _jsx(Button, { size: "small", type: "text", icon: _jsx(PlusOutlined, {}), onClick: handleAddVariable })] }), _jsx(List, { children: value?.variables?.map((variable) => {
                    return (_jsx(ListItemVariable, { value: variable, editTitle: t("$editVariable"), onRemove: handleRemoveVariable, onChange: handleChangeVariable, children: _jsx(ListItem, { icon: variableIcon, children: variable.name }) }, variable.id));
                }) }), _jsx(NameDialog, { title: '$addReaction', open: addReactionOpen, onCancel: handleAddReactionCancel, onOk: handleAddReactionOk }), _jsx(VariableDialog, { title: '$addVariable', open: addVariableOpen, onCancel: handleAddVariableCancel, onOk: handleAddVariableOk })] }));
});
