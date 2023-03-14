import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Space as AntdSpace } from "antd";
import { ComponentDesignerView } from "core-react/ComponentTreeWidget/ComponentDesignerView";
import { useNode } from "core-react/hooks/useNode";
import { forwardRef, memo } from "react";
export const SpaceDesigner = memo(forwardRef((props, ref) => {
    const { children, ...other } = props;
    const node = useNode();
    return (_jsxs(AntdSpace, { ...other, children: [node?.children?.map(childId => {
                return (_jsx(ComponentDesignerView, { nodeId: childId }, childId));
            }), children] }));
}));
