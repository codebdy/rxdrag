import styled from 'styled-components';

export const StyledContainer = styled.div`
  .border-layout-container {
    margin-top: 10px;
    display: flex;
    flex: 1;
  }
  .border-layout {
    margin-right: 16px;
    .border-icon {
      cursor: pointer;
      font-size: 16px;
      &.active {
        color: ${props => props.theme.token?.colorPrimary};
      }
    }
  }
  .border-layout-content {
    flex: 1;
  }
  .rx-border-field {
    .rx-field-title {
      width: auto;
      margin-right: 2em;
    }
    .border-layout {
      margin-top: 8px;
    }
  }
`;
