import { Empty } from "antd";
import React, { memo } from "react";
import ToolbarArea from "./ToolbarArea";
import ToolbarTitle from "./ToolbarTitle";
import styled from "styled-components";

const Container = styled.div`
  color: ${props => props.theme.token?.colorText};
  border-left: solid 1px ${props => props.theme.token?.colorBorder};
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
