import { jsx as _jsx } from "react/jsx-runtime";
import { Button, Popover } from "antd";
import { memo, useCallback, useState } from "react";
import { PortsTable } from "./PortsTable";
export const PortsInput = memo((props) => {
    const { title, popoverTitle, value, onChange, type } = props;
    const [open, setOpen] = useState(false);
    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);
    const handleOpenChange = useCallback((newOpen) => {
        setOpen(newOpen);
    }, []);
    return (_jsx(Popover, { content: _jsx(PortsTable, { type: type, onClose: handleClose, value: value, onChange: onChange }), title: popoverTitle, open: open, placement: "bottomRight", trigger: "click", onOpenChange: handleOpenChange, children: _jsx(Button, { children: title }) }));
});
