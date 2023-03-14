import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, memo } from "react";
import { Radio as AntdRadio } from "antd";
import { forwardRefById } from "core-react/hocs/forwardRefById";
const ForwardRadio = forwardRefById(AntdRadio, element => element?.parentElement?.parentElement);
export const Radio = memo(forwardRef((props, ref) => {
    const { label, ...other } = props;
    return (_jsx(ForwardRadio, { ref: ref, ...other, children: label }));
}));
