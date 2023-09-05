import { Button } from "antd";
import styled from "styled-components";
import { floatShadow, floatSmallShadow } from "../../utils";

export const CanvasFloatLargeButton = styled(Button).attrs({ size: "large" })`
  box-shadow: ${floatShadow};
  border: 0;
`;

export const CanvasFloatButton = styled(Button)`
  box-shadow: ${floatShadow};
  border: solid 1px ${props => props.theme.token?.colorBorderSecondary};
`;

export const CanvasFloatSmallButton = styled(Button).attrs({ size: "small" })`
  box-shadow: ${floatSmallShadow};
  border: 0;
`;
