import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { selectedElementState } from "../recoil/atoms";
import { EVENT_ELEMENT_SELECTED_CHANGE, triggerCanvasEvent } from "./events";
import { ID } from "@rxdrag/shared";

// atomFamily的effects没有实验成功，暂时用该钩子代替
export function useTriggerSelectedEvent(metaId: ID) {
  const selectedElement = useRecoilValue(selectedElementState(metaId));

  useEffect(() => {
    triggerCanvasEvent({
      name: EVENT_ELEMENT_SELECTED_CHANGE,
      detail: selectedElement,
    });
  }, [selectedElement]);
}
