import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-left: 8px;
  font-size: 0.95rem;
`

export default function ToolbarTitle(props: {
  children?: any,
}) {
  return (
    <Container>
      {props.children}
    </Container>
  )
}
