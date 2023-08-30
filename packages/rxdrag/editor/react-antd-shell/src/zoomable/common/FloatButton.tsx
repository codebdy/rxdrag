import { Button } from "antd";
import styled from "styled-components";
import { floatShadow } from "../utils";

export const CanvasFloatLargeButton = styled(Button).attrs({ size: "large" })`
  box-shadow: ${floatShadow};
  border: 0;
`;

export const CanvasFloatButton = styled(Button)`
  box-shadow: ${floatShadow};
  border: 0;
`;

export const CanvasFloatSmallButton = styled(Button).attrs({ size: "small" })`
  box-shadow: ${floatShadow};
  border: 0;
`;
