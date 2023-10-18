import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "shared";
import { selectedElementState } from "../recoil/atoms";
import { EVENT_ELEMENT_SELECTED_CHANGE, triggerCanvasEvent } from "./events";

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
