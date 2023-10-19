import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  color: ${props => props.theme.token?.colorText};
  border-bottom: solid 1px ${props => props.theme.token?.colorBorderSecondary};
`

export default function ToolbarArea(props: {
  children?: any
}) {
  return (
    <Container style={{
      display: 'flex',
      width: '100%',
      height: '40px',
      alignItems: 'center',
    }}>
      {props.children}
    </Container>
  )
}
