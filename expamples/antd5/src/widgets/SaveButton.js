import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Button, Space } from "antd";
import { useTranslate } from "core-react/hooks/useTranslate";
import { memo } from "react";
import { useSaveJson } from "../hooks/useSaveJson";
export const SaveButton = memo(() => {
    const t = useTranslate("tools");
    const save = useSaveJson();
    return (_jsx(Space, { children: _jsxs(Button, { type: "primary", onClick: save, children: [" ", t("save")] }) }));
});
