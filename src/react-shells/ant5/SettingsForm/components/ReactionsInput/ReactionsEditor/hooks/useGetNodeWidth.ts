import { useCallback } from "react";
import { IReactionNodeMeta } from "runner/reaction/interfaces/metas";

function lengthOf(str: string) {
  var length = 0;
  Array.from(str).forEach((char) => {
    if (char.charCodeAt(0) > 255) {//字符编码大于255，说明是双字节字符
      length += 2;
    } else {
      length++;
    }
  });

  return length;
}

export function useGetNodeWidth() {
  const getNodeWidth = useCallback((nodeMeta: IReactionNodeMeta) => {
    return (lengthOf(nodeMeta.label || "")) * 7 + 60
  }, [])

  return getNodeWidth
}