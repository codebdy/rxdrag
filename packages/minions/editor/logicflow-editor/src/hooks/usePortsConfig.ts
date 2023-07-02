import { useMemo } from "react";
import { IThemeToken } from "../interfaces";

export function usePortsConfig(token:IThemeToken) {

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