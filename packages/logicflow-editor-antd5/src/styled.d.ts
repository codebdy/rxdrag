// import original module declarations
import 'styled-components';
import { GlobalToken } from "antd"

//@@需要跟其他模块统一
// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    themeMode?: "dark" | "light"
    token?: GlobalToken
  }
}