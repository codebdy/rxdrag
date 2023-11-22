import styled from "styled-components";
import { DEFAULT_MARGIN, floatShadow } from "../../utilities";
import { ResizableColumn } from "../ResizableColumn";

export const FloatableColumn =  styled(ResizableColumn)`
  position: absolute;
  top: ${DEFAULT_MARGIN}px;
  right: ${DEFAULT_MARGIN}px;
  height: calc(100% - ${DEFAULT_MARGIN * 2}px);
  border-radius: 8px;
  background-color: ${props => props.theme.token?.colorBgBase};
  box-shadow: ${floatShadow};
  border: solid 1px ${props => props.theme.token?.colorBorderSecondary};
  box-sizing: border-box;
  z-index: 1;
  .ant-tabs-nav{
    user-select: none;
    &::before{
      border: 0;
    }
  }
`

export const ColumnTitle = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  border-bottom: solid 1px ${props => props.theme.token?.colorBorderSecondary};
  padding: 0 16px;
  box-sizing: border-box;
`