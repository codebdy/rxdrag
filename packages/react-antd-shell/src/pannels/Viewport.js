import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, memo } from "react";
const viewportStyle = {
    flex: 1,
    padding: '0px 16px',
    height: 0,
    width: "100%",
    display: "flex",
    flexFlow: "column",
    boxSizing: "border-box",
    alignItems: "center",
};
export const Viewport = memo(forwardRef((props, ref) => {
    return (_jsx("div", { ref: ref, style: viewportStyle, ...props }));
}));
