import { useToken } from "antd/es/theme/internal";
import { useMemo } from "react";
export function useStyles(styleFn) {
    const [, token] = useToken();
    const styles = useMemo(() => {
        return styleFn(token);
    }, [styleFn, token]);
    return styles;
}
