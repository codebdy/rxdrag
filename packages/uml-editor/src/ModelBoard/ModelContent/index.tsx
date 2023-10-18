import React from "react"
import { memo } from "react"

export const ModelContent = memo((
  props: {
    toolbox?: React.ReactNode,
    toolbar?: React.ReactNode,
    children?: React.ReactNode,
    propertyBox?: React.ReactNode,
  }
) => {
  const { toolbox, toolbar, children, propertyBox } = props;
  return (<div
    style={{
      flex: 1,
      display: "flex",
      flexFlow: "column",
    }}
  >
    <div style={{ width: "100%", flex: 1, display: "flex", height: "0" }}>
      {toolbox}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexFlow: "column",
        }}
      >
        {toolbar}
        <div
          style={{
            flex: 1,
            display: "flex",
            height: 0,
          }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexFlow: "column",
              overflow: "auto",
              position: "relative",
            }}
          >
            {children}
          </div>

          {
            propertyBox &&
            <div className="property-box-area">
              {propertyBox}
            </div>
          }
        </div>
      </div>
    </div>
  </div>)
})