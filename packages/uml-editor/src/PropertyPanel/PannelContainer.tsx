import styled from "styled-components";

export const PannelContainer = styled.div`
  color:${props=>props.theme.token?.colorText};
  .ant-collapse {
    border: 0;
    //border-radius: 0;

    .ant-collapse-item {
      border-radius: 0px !important;

      .ant-collapse-header {
        border-radius: 0px !important;
      }
      .ant-collapse-content{
        border-radius: 0px !important;
      }
    }
  }
`