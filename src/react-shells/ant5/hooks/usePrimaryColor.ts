import { useToken } from "antd/es/theme/internal";

export function usePrimaryColor(){
  const [, token] = useToken()

  return token.colorPrimary
}