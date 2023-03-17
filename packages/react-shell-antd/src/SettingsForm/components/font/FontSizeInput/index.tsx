import React from "react"
import { memo } from "react"
import { FoldExtraItem } from "../../Fold/FoldExtraItem"
import { SizeInput } from "../../SizeInput"

export const fontSizeIcon = `<svg viewBox="0 0 1024 1024" height="1em" width="1em" fill="currentColor" focusable="false" aria-hidden="true"><path d="M100,189.5 C102.155215,189.5 104.27062,189.67045 106.333468,189.998605 L580,190 L580,190 C602.09139,190 620,207.90861 620,230 L620,280 C620,302.09139 602.09139,320 580,320 C557.90861,320 540,302.09139 540,280 L540,270 L380,270 L380,753 L500,753 C522.09139,753 540,770.90861 540,793 C540,815.09139 522.09139,833 500,833 L180,833 C157.90861,833 140,815.09139 140,793 C140,770.90861 157.90861,753 180,753 L300,753 L300,269.999 L140,269.999 L140,279.5 C140,301.59139 122.09139,319.5 100,319.5 C77.90861,319.5 60,301.59139 60,279.5 L60,229.5 C60,207.40861 77.90861,189.5 100,189.5 Z M652,833 C629.90861,833 612,815.09139 612,793 C612,770.90861 629.90861,753 652,753 L712,753 L712,541 L620,541 L620,551 C620,573.09139 602.09139,591 580,591 C557.90861,591 540,573.09139 540,551 L540,501 C540,478.90861 557.90861,461 580,461 L924,461 L924,461 C946.09139,461 964,478.90861 964,501 L964,551 C964,573.09139 946.09139,591 924,591 C901.90861,591 884,573.09139 884,551 L884,541 L792,541 L792,753 L852,753 C874.09139,753 892,770.90861 892,793 C892,815.09139 874.09139,833 852,833 L652,833 Z"></path></svg>`


export const FontSizeInput = memo((props: {
  title?: string,
  span?: number,
  value?: string,
  onChange?: (value?: string | null) => void
}) => {
  const { title, span = 12, value, onChange } = props
  return (
    <FoldExtraItem span={span}
      title={title}
      icon={fontSizeIcon}
      marginTop = {8}
    >
      <SizeInput exclude={"auto"} value = {value} onChange = {onChange}/>
    </FoldExtraItem>
  )
})