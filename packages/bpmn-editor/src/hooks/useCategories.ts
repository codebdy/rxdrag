import { useRecoilValue } from "recoil";
import { useDesignerParams } from "plugin-sdk/contexts/desinger";
import { categoriesState } from "../recoil/atoms";

export function useCategories() {
  const { app } = useDesignerParams()
  return useRecoilValue(categoriesState(app?.id))
}