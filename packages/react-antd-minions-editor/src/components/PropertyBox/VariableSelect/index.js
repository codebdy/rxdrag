import { jsx as _jsx } from "react/jsx-runtime";
import { Select } from "antd";
import { memo, useMemo } from "react";
import { useController, useSelectedNode, useAllControllers } from "../../../hooks/";
export const VariableSelect = memo((props) => {
    const { value, onChange } = props;
    const controllers = useAllControllers();
    const currentController = useController();
    const selectedReactionNode = useSelectedNode();
    const targetController = useMemo(() => {
        const ctrl = controllers.find(ctrl => ctrl.id === selectedReactionNode?.config?.controllerId);
        const controller = currentController?.id === ctrl?.id ? currentController : ctrl;
        return controller;
    }, [controllers, currentController, selectedReactionNode?.config?.controllerId]);
    return (_jsx(Select, { value: value, options: targetController?.variables?.map(variable => {
            return {
                value: variable.name,
                label: variable.name
            };
        }), onChange: onChange }));
});
