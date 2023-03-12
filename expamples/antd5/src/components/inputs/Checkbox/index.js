import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, memo } from "react";
import { Checkbox as AntdCheckbox } from "antd";
import { forwardRefById } from "core-react/hocs/forwardRefById";
const ForwardCheckbox = forwardRefById(AntdCheckbox, element => element?.parentElement?.parentElement);
export const Checkbox = memo(forwardRef((props, ref) => {
    const { label, ...other } = props;
    return (_jsx(ForwardCheckbox, { ref: ref, ...other, children: label }));
}));
