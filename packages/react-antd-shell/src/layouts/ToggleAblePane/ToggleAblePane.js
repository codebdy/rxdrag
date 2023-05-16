import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useCallback, useMemo, useState } from "react";
import { useStyles } from "../../hooks";
import { ToggleAblePaneContext } from "./context";
import "./style.less";
import { ToggleButton, ToggleType } from "./ToggleButton";
export const ToggleAblePane = memo((props) => {
    const { toggleType = ToggleType.left, width = 260, children, style, ...other } = props;
    const [toggled, setToggled] = useState(false);
    const styles = useStyles((token) => ({
        borderRight: toggleType === ToggleType.left ? `solid 1px ${token.colorBorder}` : undefined,
        borderLeft: toggleType === ToggleType.right ? `solid 1px ${token.colorBorder}` : undefined,
    }));
    const handleToggle = useCallback(() => {
        setToggled((toggled) => !toggled);
    }, []);
    const params = useMemo(() => {
        return { toggled, setToggled };
    }, [toggled]);
    return (_jsx(ToggleAblePaneContext.Provider, { value: params, children: _jsxs("div", { className: "rx-editor-left-pane", style: { ...styles, ...style, width: toggled ? 0 : width }, ...other, children: [_jsx("div", { className: "pane-content", children: _jsx("div", { className: "pane-placeholder", style: { width: width }, children: children }) }), _jsx(ToggleButton, { toggleType: toggleType, toggled: toggled, onClick: handleToggle })] }) }));
});
