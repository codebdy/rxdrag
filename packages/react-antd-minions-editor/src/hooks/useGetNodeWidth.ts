import { IActivityDefine, IConfigMeta } from "@rxdrag/schema";
import { useCallback } from "react";

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
  const getNodeWidth = useCallback((nodeMeta: IActivityDefine<IConfigMeta>, subLabel?: string) => {
    const labeWidth = (lengthOf(nodeMeta.label || "")) * 7
    const subLabelWidth = Math.round(lengthOf(subLabel || "") * 5.5)
    return Math.max(labeWidth, subLabelWidth) + 60
  }, [])

  return getNodeWidth
}