import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, memo } from "react";
import { Breadcrumb as AntdBreadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
export const Breadcrumb = memo(forwardRef((props, ref) => {
    return (_jsxs(AntdBreadcrumb, { ...props, children: [_jsx(AntdBreadcrumb.Item, { children: _jsx(HomeOutlined, {}) }), _jsx(AntdBreadcrumb.Item, { children: _jsx("span", { children: "Application List" }) }), _jsx(AntdBreadcrumb.Item, { children: "Application" })] }));
}));
