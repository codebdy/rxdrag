import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Layout } from "antd";
import React, { useMemo } from "react";
import { forwardRef, memo, useState } from "react";
import { LayoutContext } from "./context";
const { Content, Footer } = Layout;
export const TwoColumnLayout = memo(forwardRef((props, ref) => {
    const { sider, header, footer, content } = props;
    const [collapsed, setCollapsed] = useState();
    const params = useMemo(() => {
        return {
            collapsed,
            setCollapsed
        };
    }, [collapsed]);
    return (_jsx(LayoutContext.Provider, { value: params, children: _jsxs(Layout, { ref: ref, children: [sider, _jsxs(Layout, { children: [header, content, footer] })] }) }));
}));
