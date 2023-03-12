import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, memo } from "react";
import { Slider as AntdSlider } from "antd";
export const Slider = memo(forwardRef((props, ref) => {
    const { ...other } = props;
    return (_jsx("div", { ref: ref, children: _jsx(AntdSlider, { ...other }) }));
}));
