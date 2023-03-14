import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, memo } from "react";
import { Transfer as AntdTransfer } from "antd";
export const Transfer = memo(forwardRef((props, ref) => {
    const { ...other } = props;
    return (_jsx("div", { ref: ref, children: _jsx(AntdTransfer, { ...other }) }));
}));
