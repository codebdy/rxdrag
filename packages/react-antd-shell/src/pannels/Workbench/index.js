import { jsx as _jsx } from "react/jsx-runtime";
import { ContainerImpl, DragDropDriver, CanvasResizeDriver, MouseMoveDriver, KeyboardDriver } from "@rxdrag/core";
import { useDesignerEngine, useShell } from "@rxdrag/react-core";
import { memo, useCallback, useEffect } from "react";
import "./style.less";
export const Workbench = memo((props) => {
    const engine = useDesignerEngine();
    const shell = useShell();
    const handleRefChange = useCallback((el) => {
        if (engine) {
            const container = new ContainerImpl(engine, el, "$$container$$", [
                DragDropDriver,
                CanvasResizeDriver,
                MouseMoveDriver,
                KeyboardDriver
            ]);
            shell?.setContainer(container);
        }
    }, [engine, shell]);
    useEffect(() => {
        return () => {
            shell?.destory();
        };
    }, [shell]);
    return (_jsx("div", { ref: handleRefChange, className: "rx-workbench", ...props }));
});
