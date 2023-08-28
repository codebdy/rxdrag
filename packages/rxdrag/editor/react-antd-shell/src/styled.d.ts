// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    mode?: "dark" | "light",
    token?: GlobalToken
  }
}