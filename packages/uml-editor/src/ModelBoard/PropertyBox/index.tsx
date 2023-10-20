import { Empty } from "antd";
import React, { memo } from "react";
import ToolbarArea from "./ToolbarArea";
import ToolbarTitle from "./ToolbarTitle";
import styled from "styled-components";

const Container = styled.div`
  flex:1;
  display: flex;
  flex-flow: column;
  height: 0;
  overflow: auto;
  width: 100%;
  .property-pannel{
    padding: 8px 16px;
  }
  color: ${props => props.theme.token?.colorText};
  border-left: solid 1px ${props => props.theme.token?.colorBorderSecondary};
  box-sizing: border-box;
`
export const PropertyBox = memo((
  props: {
    title?: string,
    children?: React.ReactNode,
  }
) => {
  const { title, children } = props;
  return (
    <Container
      className="property-box"
    >
      <ToolbarArea>
        <ToolbarTitle>{title}</ToolbarTitle>
      </ToolbarArea>
      <div
        style={{
          flex: 1,
          overflow: "auto",
        }}
      >
        {
          children || <div style={{ padding: "16px" }}>
            <Empty />
          </div>
        }
      </div>
    </Container>
  );
});
