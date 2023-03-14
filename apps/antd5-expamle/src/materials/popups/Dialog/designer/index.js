import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal } from "antd";
import { RXID_ATTR_NAME } from "core";
import { useDesignerEngine } from "core-react/hooks";
import { useCurrentNode } from "core-react/hooks/useCurrentNode";
import { useDocument } from "core-react/hooks/useDocument";
import { useNode } from "core-react/hooks/useNode";
import { forwardRef, memo, useCallback, useRef, useState } from "react";
import { CloseButton } from "../../CloseButton";
import { PopupButton } from "../../PopupButton";
export const DialogDesigner = memo(forwardRef((props, ref) => {
    const { title, content, footer, actionComponent, style, closable, [RXID_ATTR_NAME]: rxId, ...other } = props;
    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(false);
    const node = useNode();
    const currentNode = useCurrentNode();
    const realRef = useRef(null);
    const engine = useDesignerEngine();
    const doc = useDocument();
    const popupRef = useRef(null);
    const handleMouseEnter = useCallback(() => {
        setHover(true);
    }, []);
    const handleMouseLeave = useCallback(() => {
        setHover(false);
    }, []);
    const refreshSelect = useCallback((time = 20) => {
        if (doc && node) {
            setTimeout(() => {
                engine?.getActions().selectNodes([node.id], doc.id);
            }, time);
        }
    }, [doc, engine, node]);
    const getModalEl = useCallback(() => {
        return realRef.current?.getElementsByClassName("ant-modal-content")?.[0];
    }, []);
    const addRxdToPop = useCallback(() => {
        popupRef.current?.setAttribute(RXID_ATTR_NAME, rxId || "");
    }, [rxId]);
    const handleShow = useCallback(() => {
        setOpen(true);
        addRxdToPop();
        refreshSelect(300);
    }, [addRxdToPop, refreshSelect]);
    const handleClose = useCallback(() => {
        setOpen(false);
        popupRef.current?.removeAttribute(RXID_ATTR_NAME);
    }, []);
    const handleAfterClose = useCallback(() => {
        refreshSelect();
    }, [refreshSelect]);
    const handlePopRefChange = useCallback((popEl) => {
        popupRef.current = getModalEl();
        addRxdToPop();
    }, [addRxdToPop, getModalEl]);
    return (_jsxs("div", { ref: realRef, style: { display: "inline-block", position: "relative", ...style }, ...open ? {} : { [RXID_ATTR_NAME]: rxId }, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: [actionComponent, (hover || currentNode?.id === node?.id) && !open && _jsx(PopupButton, { onClick: handleShow }), _jsxs(Modal, { title: title, open: open, footer: footer, closable: closable, onCancel: handleClose, afterClose: handleAfterClose, getContainer: realRef.current ? () => realRef.current : undefined, ...other, children: [content, closable === false &&
                        _jsx(CloseButton, { onClick: handleClose }), _jsx("div", { ref: handlePopRefChange })] })] }));
}));
