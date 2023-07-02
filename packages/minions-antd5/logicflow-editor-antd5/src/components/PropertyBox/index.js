import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Form, Input, InputNumber, Radio, Select, Slider, Switch } from "antd";
import { Fragment, memo, useCallback, useMemo } from "react";
import styled from "styled-components";
import { PortsInput } from "./PortsInput";
import { VirtualForm } from "@rxdrag/react-fieldy";
import { useLocalesManager } from "@rxdrag/react-locales";
import { JSONInput, ValueInput } from "@rxdrag/react-antd-props-inputs";
import { useSelectedNode, useGetMaterial, useDispatch, useBackup, useMarkChange, ActionType } from "@rxdrag/minions-logicflow-editor";
import { ComponentRender } from "@rxdrag/react-runner";
const EmptyContainer = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
export const PropertyBox = memo((props) => {
    const { setters } = props;
    const node = useSelectedNode();
    const getMaterial = useGetMaterial();
    const localesManager = useLocalesManager();
    const dispatch = useDispatch();
    const material = useMemo(() => getMaterial(node?.activityName || ""), [getMaterial, node?.activityName]);
    const backup = useBackup();
    const markeChange = useMarkChange();
    const propsSchema = useMemo(() => {
        if (material?.schema) {
            //翻译
            return (localesManager?.translateDesignerSchema('', JSON.parse(JSON.stringify(material?.schema))) || material?.schema);
        }
        else {
            return undefined;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localesManager, material?.schema]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleNodeChange = useCallback((nodeData) => {
        backup();
        const newData = { ...node, ...nodeData };
        dispatch?.({ type: ActionType.CHANGE_NODE, payload: newData });
        markeChange();
    }, [backup, dispatch, markeChange, node]);
    return (_jsx(_Fragment, { children: node
            ?
                _jsx(VirtualForm, { initialValue: node, onValueChange: handleNodeChange, children: propsSchema &&
                        _jsx(ComponentRender, { components: {
                                Fragment: Fragment,
                                FormItem: Form.Item,
                                Input,
                                Select,
                                Switch,
                                Radio,
                                Slider,
                                InputNumber,
                                TextArea: Input.TextArea,
                                PortsInput,
                                ValueInput,
                                JSONInput,
                                ...setters || {}
                            }, root: propsSchema }) }, node.id)
            : _jsx(EmptyContainer, {}) }));
});
