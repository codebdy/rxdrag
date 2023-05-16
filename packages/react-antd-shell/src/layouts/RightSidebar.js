import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from "react";
export const RightSidebar = memo((props) => {
    const { children, ...other } = props;
    return (_jsx("div", { ...other, children: children }));
});
