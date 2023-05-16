import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useTranslate } from "@rxdrag/react-locales";
import { Button, Space } from "antd";
import { memo } from "react";
export const SaveActions = memo(() => {
    const t = useTranslate("tools");
    return (_jsx(Space, { children: _jsxs(Button, { type: "primary", children: [" ", t("save")] }) }));
});
