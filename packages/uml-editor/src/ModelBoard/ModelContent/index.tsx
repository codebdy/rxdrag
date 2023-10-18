import React from "react"
import { memo } from "react"
import styled from "styled-components";

const Container = styled.div`
  flex:1;
  display: flex;
`

const PropertyArea = styled.div`
  display: flex;
  height: 100%;
  flex-flow: column;
  width: 300px;
  background-color:${props => props.theme.token?.colorBgBase};
  box-sizing: border-box;
`

export const ModelContent = memo((
  props: {
    toolbox?: React.ReactNode,
    toolbar?: React.ReactNode,
    children?: React.ReactNode,
    propertyBox?: React.ReactNode,
  }
) => {
  const { toolbox, toolbar, children, propertyBox } = props;
  return (<Container className="model-content" >
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
          <PropertyArea className="property-box-area">
            {propertyBox}
          </PropertyArea>
        }
      </div>
    </div>
  </Container>)
})