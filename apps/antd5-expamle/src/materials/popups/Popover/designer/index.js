import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { RXID_ATTR_NAME } from "core";
import { useDesignerEngine } from "core-react/hooks";
import { useCurrentNode } from "core-react/hooks/useCurrentNode";
import { useDocument } from "core-react/hooks/useDocument";
import { useNode } from "core-react/hooks/useNode";
import { forwardRef, memo, useCallback, useRef, useState } from "react";
import { PopupButton } from "../../PopupButton";
import { Popover } from "antd";
import { CloseButton } from "../../CloseButton";
export const PopoverDesigner = memo(forwardRef((props, ref) => {
    const { title, content, children, [RXID_ATTR_NAME]: rxId, ...other } = props;
    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(false);
    const node = useNode();
    const currentNode = useCurrentNode();
    const realRef = useRef(null);
    const popupRef = useRef(null);
    const engine = useDesignerEngine();
    const doc = useDocument();
    const refreshSelect = useCallback((time = 20) => {
        if (doc && node) {
            setTimeout(() => {
                engine?.getActions().selectNodes([node.id], doc.id);
            }, time);
        }
    }, [doc, engine, node]);
    const addRxdToPop = useCallback(() => {
        popupRef.current?.setAttribute(RXID_ATTR_NAME, rxId || "");
    }, [rxId]);
    const handleMouseEnter = useCallback(() => {
        setHover(true);
    }, []);
    const handleMouseLeave = useCallback(() => {
        setHover(false);
    }, []);
    const handleShow = useCallback(() => {
        setOpen(true);
        setHover(false);
        addRxdToPop();
        //有动画，需要长延时
        refreshSelect(300);
    }, [addRxdToPop, refreshSelect]);
    const handleClose = useCallback(() => {
        setOpen(false);
        popupRef.current?.removeAttribute(RXID_ATTR_NAME);
        refreshSelect();
    }, [refreshSelect]);
    const handlePopRefChange = useCallback((popEl) => {
        const els = realRef.current?.ownerDocument.getElementsByClassName("ant-popover-content");
        for (let i = 0; i < (els?.length || 0); i++) {
            const el = els?.[i];
            if (el && el.contains(popEl)) {
                popupRef.current = el;
            }
        }
        addRxdToPop();
    }, [addRxdToPop]);
    return (_jsx("div", { ref: realRef, style: { display: "inline-block", position: "relative" }, ...open ? {} : { [RXID_ATTR_NAME]: rxId }, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: _jsxs(Popover, { open: open, title: _jsxs(_Fragment, { children: [title, _jsx(CloseButton, { style: {
                            top: -16,
                            right: -16
                        }, onClick: handleClose }), _jsx("div", { ref: handlePopRefChange })] }), content: content, ...other, children: [children, (hover || currentNode?.id === node?.id) && !open && _jsx(PopupButton, { onClick: handleShow })] }) }));
}));
