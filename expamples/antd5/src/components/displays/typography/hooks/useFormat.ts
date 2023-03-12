import dayjs from "dayjs";
import { useMemo } from "react";
import { TypographyType } from "../types";

export function useFormat(value?: string, textType?: TypographyType, formatMask?: string) {

  const text = useMemo(() => {
    const txtValue = value?.toString();
    if (textType === TypographyType.Date) {
      return dayjs(txtValue).format(formatMask || "YYYY-MM-DD HH:mm:ss");
    }
    return txtValue;
  }, [formatMask, textType, value])

  return text
}