import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, memo } from "react";
export const LoopPanelDesigner = memo(forwardRef((props, ref) => {
    const { children } = props;
    return (_jsx("div", { ref: ref, children: children }));
}));
