import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, memo } from "react";
import { Typography } from "antd";
export const Link = memo(forwardRef((props, ref) => {
    const { value, ...other } = props;
    return (_jsx(Typography.Link, { ref: ref, ...other, children: value || "no data" }));
}));
