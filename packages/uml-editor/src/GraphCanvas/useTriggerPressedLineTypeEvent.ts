import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { pressedLineTypeState } from "../recoil/atoms";
import { EVENT_PRESSED_LINE_TYPE, triggerCanvasEvent } from "./events";
import { ID } from "@rxdrag/shared";

// atomFamily的effects没有实验成功，暂时用该钩子代替
export function useTriggerPressedLineTypeEvent(metaId: ID) {
  const pressedLineType = useRecoilValue(pressedLineTypeState(metaId));

  useEffect(() => {
    triggerCanvasEvent({
      name: EVENT_PRESSED_LINE_TYPE,
      detail: pressedLineType,
    });
  }, [pressedLineType]);
}
