import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CloseOutlined } from "@ant-design/icons";
import { useToolsTranslate } from "@rxdrag/react-core";
import { Button } from "antd";
import { memo, useCallback } from "react";
import { useStyles } from "../../../hooks";
import { useToggleState } from "../hooks/useToggleState";
import "./style.less";
export const PaneTitle = memo((props) => {
    const { title, button } = props;
    const { setToggled } = useToggleState();
    const styles = useStyles((token) => ({
        borderColor: token.colorBorder,
        color: token.colorText,
    }));
    const t = useToolsTranslate();
    const handleCloseClick = useCallback(() => {
        setToggled(true);
    }, [setToggled]);
    return (_jsxs("div", { className: "rx-toggle-pane-title", style: styles, children: [_jsx("div", { children: t(title || "") }), button || _jsx(Button, { icon: _jsx(CloseOutlined, {}), shape: "circle", type: "text", onClick: handleCloseClick })] }));
});
