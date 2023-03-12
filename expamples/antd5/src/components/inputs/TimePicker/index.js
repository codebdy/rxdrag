import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, memo } from "react";
import { TimePicker as AntdTimePicker } from "antd";
export const TimePicker = memo(forwardRef((props, ref) => {
    return (_jsx("div", { ref: ref, children: _jsx(AntdTimePicker, { ...props }) }));
}));
