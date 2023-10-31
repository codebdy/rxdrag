import styled from 'styled-components';

export const StyledBackgroundContainer = styled.div`
  .positon-style-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .positon-style-container-left {
    width: 60px;
    height: 72px;
    margin-right: 30px;
    .position-icon {
      cursor: pointer;
      &.actived {
        color: ${props => props.theme.token?.colorPrimary};
      }
    }
  }
  .positon-style-container-right {
    .rx-field:not(:last-child) {
      margin-bottom: 4px;
    }
  }
`;
