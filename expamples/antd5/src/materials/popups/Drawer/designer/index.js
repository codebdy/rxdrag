import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RXID_ATTR_NAME } from "core";
import { useDesignerEngine } from "core-react/hooks";
import { useCurrentNode } from "core-react/hooks/useCurrentNode";
import { useDocument } from "core-react/hooks/useDocument";
import { useNode } from "core-react/hooks/useNode";
import { forwardRef, memo, useCallback, useRef, useState } from "react";
import { PopupButton } from "../../PopupButton";
import { Drawer as AntdDrawer } from "antd";
export const DrawerDesigner = memo(forwardRef((props, ref) => {
    const { title, content, footer, actionComponent, extra, [RXID_ATTR_NAME]: rxId, ...other } = props;
    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(false);
    const node = useNode();
    const currentNode = useCurrentNode();
    const realRef = useRef(null);
    const engine = useDesignerEngine();
    const doc = useDocument();
    const refreshSelect = useCallback((time = 20) => {
        if (doc && node) {
            setTimeout(() => {
                engine?.getActions().selectNodes([node.id], doc.id);
            }, time);
        }
    }, [doc, engine, node]);
    const handleMouseEnter = useCallback(() => {
        setHover(true);
    }, []);
    const handleMouseLeave = useCallback(() => {
        setHover(false);
    }, []);
    const handleShow = useCallback(() => {
        setOpen(true);
        setHover(false);
        refreshSelect(300);
    }, [refreshSelect]);
    const taggleRxid = useCallback(() => {
        const el = realRef.current?.getElementsByClassName("ant-drawer-content-wrapper")?.[0];
        if (open) {
            el?.setAttribute(RXID_ATTR_NAME, rxId || "");
        }
        else {
            el?.removeAttribute(RXID_ATTR_NAME);
        }
    }, [open, rxId]);
    const handleAfterOpenChange = useCallback(() => {
        taggleRxid();
        refreshSelect();
    }, [refreshSelect, taggleRxid]);
    const handleRefChange = useCallback((node) => {
        realRef.current = node;
    }, []);
    const handleClose = useCallback(() => {
        setOpen(false);
        setHover(false);
        const el = realRef.current?.getElementsByClassName("ant-drawer-content-wrapper")?.[0];
        el?.removeAttribute(RXID_ATTR_NAME);
    }, []);
    return (_jsxs("div", { ref: handleRefChange, style: { display: "inline-block", position: "relative" }, ...open ? {} : { [RXID_ATTR_NAME]: rxId }, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: [actionComponent, (hover || currentNode?.id === node?.id) && !open && _jsx(PopupButton, { onClick: handleShow }), _jsx(AntdDrawer, { open: open, getContainer: realRef.current ? () => realRef.current : undefined, ...!open ? {} : { [RXID_ATTR_NAME]: rxId }, title: title, extra: extra, footer: footer, afterOpenChange: handleAfterOpenChange, onClose: handleClose, ...other, children: content })] }));
}));
