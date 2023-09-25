// import original module declarations
import 'styled-components';
import { IThemeToken } from './theme';

//@@需要跟其他模块统一
// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    themeMode?: "dark" | "light"
    token?: IThemeToken
  }
}