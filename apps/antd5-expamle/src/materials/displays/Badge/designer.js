import { jsx as _jsx } from "react/jsx-runtime";
import { Badge } from "antd";
import { forwardRef, memo } from "react";
export const BadgeDesigner = memo(forwardRef((props, ref) => {
    return (_jsx("div", { ref: ref, style: { display: "inline-block", position: "relative" }, children: _jsx(Badge, { ...props }) }));
}));
