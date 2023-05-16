import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from "react";
export const Logo = memo(() => {
    return (_jsx("div", { style: {
            display: "flex",
            alignItems: "center",
            fontWeight: "bold"
        }, children: _jsx("img", { alt: "rxeditor", height: 32, width: 32, src: "logo.png" }) }));
});
