// import original module declarations
import 'styled-components';
import { GlobalToken } from "antd"

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    mode?: "dark" | "light",
    token?: GlobalToken
  }
}