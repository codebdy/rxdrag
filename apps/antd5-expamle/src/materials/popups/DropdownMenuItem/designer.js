import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, memo } from "react";
import cls from "classnames";
import { IconView } from "react-shells/ant5/components/IconView";
export const DropdownMenuItemDesigner = memo(forwardRef((props, ref) => {
    const { className, icon, title, onClick, ...other } = props;
    return (_jsxs("div", { ref: ref, className: cls('menu-item', className), ...other, children: [icon &&
                _jsx("div", { className: 'dropdown-menu-item-icon', children: _jsx(IconView, { icon: icon }) }), _jsx("div", { className: 'menu-item-text', children: title })] }));
}));
