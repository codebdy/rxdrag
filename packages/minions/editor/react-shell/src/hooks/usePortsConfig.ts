import { useToken } from "antd/es/theme/internal";
import { useMemo } from "react";

export function usePortsConfig() {
  const [, token] = useToken()

  const group = useMemo(() => ({
    in: {
      position: 'left',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: token.colorTextSecondary,//#5e76c3
          strokeWidth: 1,
          fill: token.colorBgContainer,
        },
      },

    },
    out: {
      position: 'right',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: token.colorTextSecondary,
          strokeWidth: 1,
          fill: token.colorBgContainer,
        },
      },
    },
  }), [token.colorBgContainer, token.colorTextSecondary])
  return group;
}