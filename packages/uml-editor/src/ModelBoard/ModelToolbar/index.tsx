import React, { memo } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 48px;
  background-color: ${props => props.theme.token?.colorBgBase};
  align-items: center;
  border: solid 1px  ${props => props.theme.token?.colorBorderSecondary};
  border-left: 0;
  border-right: 0;
  box-sizing: border-box;
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
