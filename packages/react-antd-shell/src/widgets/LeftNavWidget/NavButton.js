import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslate } from "@rxdrag/react-locales";
import { Button, Tooltip, Typography } from "antd";
import { useToken } from "antd/es/theme/internal";
import { memo, useCallback, useMemo } from "react";
const { Text } = Typography;
export const NavButton = memo((props) => {
    const { showTitle, actived, item, onSelect } = props;
    const { key, title, icon } = item;
    const [, token] = useToken();
    const t = useTranslate("tools");
    const handleClick = useCallback(() => {
        onSelect?.(key);
    }, [key, onSelect]);
    const buttonContent = useMemo(() => {
        return _jsx(Button, { size: "large", type: "text", style: {
                borderRadius: 0,
                padding: "8px 0",
                height: showTitle ? 56 : 48,
                borderLeft: `${actived ? token.colorPrimary : "transparent"} solid 2px`,
                borderRight: `transparent solid 2px`,
            }, onClick: handleClick, children: _jsxs("div", { style: {
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "center",
                    color: actived ? token.colorPrimary : undefined,
                    fontSize: 20
                }, children: [icon, showTitle && _jsx(Text, { style: { color: actived ? token.colorPrimary : undefined, marginTop: 4 }, children: t(title || "") })] }) });
    }, [actived, handleClick, icon, showTitle, t, title, token.colorPrimary]);
    return (showTitle
        ? buttonContent
        : _jsx(Tooltip, { placement: "right", title: t(title || ""), children: buttonContent }));
});
