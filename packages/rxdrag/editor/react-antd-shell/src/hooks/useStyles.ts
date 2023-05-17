import { GlobalToken } from "antd/es/theme/interface";
import { useToken } from "antd/es/theme/internal";
import { CSSProperties, useMemo } from "react";

export function useStyles(styleFn: (token: GlobalToken) => CSSProperties) {
  const [, token] = useToken();
  const styles: CSSProperties = useMemo(() => {
    return styleFn(token)
  }, [styleFn, token])
  return styles
}
