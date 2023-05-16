import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRegisterComponentMaterial } from "@rxdrag/react-core";
import { Col } from "antd";
import { useToken } from "antd/es/theme/internal";
import { memo, useEffect, useState } from "react";
import "./style.less";
export const ComponentResourceWidget = memo((props) => {
    const { meterial } = props;
    const [resourceNode, setResourceNode] = useState();
    const registerMaterial = useRegisterComponentMaterial();
    useEffect(() => {
        if (registerMaterial && meterial) {
            setResourceNode(registerMaterial(meterial));
        }
    }, [meterial, registerMaterial]);
    const [, token] = useToken();
    return (_jsx(Col, { span: 8, children: _jsxs("div", { className: "resource-widget", ...resourceNode?.rxProps, children: [_jsx("div", { className: "resource-icon", style: { backgroundColor: token.colorBorderSecondary, color: meterial?.resource?.color }, children: meterial.resource?.icon }), _jsx("div", { className: "resource-text", children: resourceNode?.title })] }) }));
});
