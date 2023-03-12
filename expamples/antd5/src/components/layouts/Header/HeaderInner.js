import { jsx as _jsx } from "react/jsx-runtime";
import { Layout, theme } from "antd";
import { forwardRef, memo } from "react";
import "./style.less";
const { Header: AntdHeader, } = Layout;
export const HeaderInner = memo(forwardRef((props, ref) => {
    const { style, children, ...other } = props;
    const { token: { colorBgContainer }, } = theme.useToken();
    return (_jsx(AntdHeader, { ref: ref, className: "rx-top-bar", style: { background: colorBgContainer, ...style }, ...other, children: children }));
}));
