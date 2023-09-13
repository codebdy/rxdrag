import { memo } from "react"
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`

export const ResourceItem = memo((
  props: { name: string }
) => {
  const { name } = props
  return (
    <Container>

    </Container>
  )
})