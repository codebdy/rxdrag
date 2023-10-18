import React, { memo } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 48px;
  background-color: ${props => props.theme.token?.colorBgBase};
  align-items: center;
  border-bottom: solid 1px ${props => props.theme.token?.colorBorder};
  .toolbarInner {
    flex: 1;
    display: flex;
    height: 100%;
    margin-right: 16px;
    margin-left: 16px;
    align-items: center;
  };
  .saveButtonShell {
    display: flex;
    align-items: center;
    margin-left: 32px;
  };
`

export const ModelToolbar = memo((
  props: {
    children?: React.ReactNode,
  }
) => {
  const { children } = props;
  return (
    <Container className={"model-toolbar"}>
      <div className={"toolbarInner"}>
        {children}
      </div>
    </Container >
  );
});
