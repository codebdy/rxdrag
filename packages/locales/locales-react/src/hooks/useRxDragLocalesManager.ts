import { RxDragLocalesManager } from "@rxdrag/locales/src";
import { useLocalesManager } from "./useLocalesManager";

export function useRxDragLocalesManager(){
  return useLocalesManager() as RxDragLocalesManager
}