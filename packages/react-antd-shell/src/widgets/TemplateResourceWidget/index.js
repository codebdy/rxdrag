import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRegisterResource } from "@rxdrag/react-core";
import { Col } from "antd";
import { useToken } from "antd/es/theme/internal";
import { memo, useEffect, useState } from "react";
import "./style.less";
export const TemplateResourceWidget = memo((props) => {
    const { resource } = props;
    const [resourceNode, setResourceNode] = useState();
    const registerMaterial = useRegisterResource();
    useEffect(() => {
        if (registerMaterial && resource) {
            setResourceNode(registerMaterial(resource));
        }
    }, [resource, registerMaterial]);
    const [, token] = useToken();
    return (_jsx(Col, { span: 8, children: _jsxs("div", { className: "resource-widget", ...resourceNode?.rxProps, children: [_jsx("div", { className: "resource-icon", style: { backgroundColor: token.colorBorderSecondary, color: resource?.color }, children: resource?.icon }), _jsx("div", { className: "resource-text", children: resourceNode?.title })] }) }));
});
