/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactComponent } from "@rxdrag/react-shared";
import React from "react";
import { forwardRef, memo, useMemo } from "react";

export function mapComponent(WrappedComponent: ReactComponent, maps: { [key: string]: string }): ReactComponent {

  return memo(forwardRef<HTMLElement>((props: any, ref) => {
    const mapedProps = useMemo(() => {
      const newProps = {} as any;
      for (const key of Object.keys(props || {})) {
        if (maps[key]) {
          newProps[maps[key]] = props?.[key]
        } else {
          newProps[key] = props?.[key]
        }
      }
      return newProps
    }, [props])

    return (
      <WrappedComponent ref={ref} {...mapedProps} />
    )
  }))
}