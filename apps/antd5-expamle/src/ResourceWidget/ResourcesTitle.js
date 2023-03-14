import { jsx as _jsx } from "react/jsx-runtime";
import { SettingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { memo } from "react";
import { PaneTitle } from "react-shells/ant5/layouts/ToggleAblePane/PaneTitle";
export const ResourcesTitle = memo(() => {
    return (_jsx(PaneTitle, { title: "components", button: _jsx(Button, { icon: _jsx(SettingOutlined, {}), shape: "circle", type: "text" }) }));
});
