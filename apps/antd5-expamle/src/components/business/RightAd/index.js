import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
export const RightAd = forwardRef((props, ref) => {
    return (_jsx("img", { ref: ref, width: "100%", style: { marginTop: 16, borderRadius: 5 }, alt: "ad", src: "/imgs/ad.jpg" }));
});
