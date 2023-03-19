import { memo } from "react"
import { TetradInput } from "../Fold/TetradInput"
import { marginTopIcon, marginRightIcon, marginLeftIcon, marginBottomIcon } from "../margin";

export interface IPadding {
  paddingTop?: string,
  paddingRight?: string,
  paddingBottom?: string,
  paddingLeft?: string,
}

export const PaddingStyleSetter = memo((props: {
  title?: string,
  topTitle?: string,
  rightTitle?: string,
  leftTitle?: string,
  bottomTitle?: string,
  value?: IPadding,
  onChange?: (value?: IPadding) => void
}) => {
  const { title, topTitle, rightTitle, leftTitle, bottomTitle, ...other } = props;


  return (
    <TetradInput
      keys={[
        'paddingTop',
        'paddingRight',
        'paddingLeft',
        'paddingBottom',
      ]}
      title={title}
      title1={topTitle}
      title2={rightTitle}
      title3={leftTitle}
      title4={bottomTitle}
      icon1={marginTopIcon}
      icon2={marginRightIcon}
      icon3={marginLeftIcon}
      icon4={marginBottomIcon}
      {...other}
    />
  )
})
