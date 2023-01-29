import 'styled-components';
import { GlobalToken } from "antd/es/theme/interface";

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    token?: GlobalToken;
  }
}