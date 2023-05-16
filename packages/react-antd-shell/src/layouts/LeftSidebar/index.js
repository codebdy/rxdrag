import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from "react";
import { useStyles } from "../../hooks/useStyles";
import "./style.less";
const sidebarStyles = (token) => {
    return {
        borderRight: `solid 1px ${token.colorBorder}`,
    };
};
export const LeftSidebar = memo((props) => {
    const { style, children, ...other } = props;
    const styles = useStyles(sidebarStyles);
    return (_jsx("div", { className: "rx-left-sidebar", style: { ...styles, ...style }, ...other, children: children }));
});
