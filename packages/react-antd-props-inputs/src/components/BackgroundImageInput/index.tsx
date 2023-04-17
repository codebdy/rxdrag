import { memo, useCallback } from "react"
import { FoldExtraItem } from "../Fold/FoldExtraItem"
import { Input, Select } from "antd"
import { createSpecialSizeOption, createUnitType, PolyInput } from "../PolyInput"
import { ImageInput } from "../ImageInput"
import React from "react"

export const imageIcon = <svg viewBox="0 0 1024 1024" height="1em" width="1em" fill="currentColor" focusable="false" aria-hidden="true"><path d="M872,32 C938.27417,32 992,85.72583 992,152 L992,872 C992,938.27417 938.27417,992 872,992 L152,992 C85.72583,992 32,938.27417 32,872 L32,152 C32,85.72583 85.72583,32 152,32 L872,32 Z M832,112 L192,112 C148.259048,112 112.717181,147.104457 112.010718,190.677054 L112,192 L112,832 C112,875.740952 147.104457,911.282819 190.677054,911.989282 L192,912 L832,912 C875.740952,912 911.282819,876.895543 911.989282,833.322946 L912,832 L912,192 C912,147.81722 876.18278,112 832,112 Z M378.52279,415.050326 C387.989019,409.358413 400.277122,412.418101 405.969035,421.884331 L405.969035,421.884331 L560.846571,679.46141 C561.920687,681.247773 563.267454,682.855244 564.838099,684.225605 C573.161205,691.487375 585.795242,690.626992 593.057011,682.303887 L593.057011,682.303887 L686.973056,574.661651 C688.336422,573.099024 689.934526,571.757945 691.710072,570.686495 C701.167259,564.979571 713.460201,568.019761 719.167124,577.476949 L719.167124,577.476949 L852.543134,798.500051 C855.365729,803.177494 856.857504,808.536895 856.857504,814 C856.857504,830.568542 843.426047,844 826.857504,844 L826.857504,844 L191.580891,844 C186.553452,844 181.606628,842.736548 177.194928,840.32573 C162.655629,832.380582 157.310013,814.153336 165.255161,799.614037 L165.255161,799.614037 L371.278423,422.599809 C372.980511,419.485057 375.480866,416.879393 378.52279,415.050326 Z M699,213 C756.989899,213 804,260.010101 804,318 C804,375.989899 756.989899,423 699,423 C641.010101,423 594,375.989899 594,318 C594,260.010101 641.010101,213 699,213 Z"></path></svg>

export const imageSizeIcon = <svg viewBox="0 0 1024 1024" height="1em" width="1em" fill="currentColor" focusable="false" aria-hidden="true"><path d="M872,32 C938.27417,32 992,85.72583 992,152 L992,872 C992,938.27417 938.27417,992 872,992 L152,992 C85.72583,992 32,938.27417 32,872 L32,152 C32,85.72583 85.72583,32 152,32 L872,32 Z M832,112 L192,112 C148.259048,112 112.717181,147.104457 112.010718,190.677054 L112,192 L112,832 C112,875.740952 147.104457,911.282819 190.677054,911.989282 L192,912 L832,912 C875.740952,912 911.282819,876.895543 911.989282,833.322946 L912,832 L912,192 C912,147.81722 876.18278,112 832,112 Z M784,200 C806.09139,200 824,217.90861 824,240 L824,440 C824,462.09139 806.09139,480 784,480 C761.90861,480 744,462.09139 744,440 L744,321.86 L350.348,744.001 L440,744 C462.09139,744 480,761.90861 480,784 C480,806.09139 462.09139,824 440,824 L240,824 C217.90861,824 200,806.09139 200,784 L200,584 C200,561.90861 217.90861,544 240,544 C262.09139,544 280,561.90861 280,584 L280,702.137 L673.65,279.999 L584,280 C561.90861,280 544,262.09139 544,240 C544,217.90861 561.90861,200 584,200 L784,200 Z"></path></svg>

export const repeatIcon = <svg viewBox="0 0 1024 1024" height="1em" width="1em" fill="currentColor" focusable="false" aria-hidden="true"><path d="M120,244 C142.09139,244 160,261.90861 160,284 L160,284 L160,784 C160,827.8 195.1,863.3 238.7,864 L238.7,864 L740,864 C762.09139,864 780,881.90861 780,904 C780,926.09139 762.09139,944 740,944 L740,944 L200,944 C133.7,944 80,890.3 80,824 L80,824 L80,284 L80.0053589,283.338527 C80.3585905,261.552229 98.1295239,244 120,244 Z M804,100 C870.27417,100 924,153.72583 924,220 L924,660 C924,726.27417 870.27417,780 804,780 L364,780 C297.72583,780 244,726.27417 244,660 L244,220 C244,153.72583 297.72583,100 364,100 L804,100 Z M764,180 L404,180 C360.259048,180 324.717181,215.104457 324.010718,258.677054 L324,260 L324,620 C324,663.740952 359.104457,699.282819 402.677054,699.989282 L404,700 L764,700 C807.740952,700 843.282819,664.895543 843.989282,621.322946 L844,620 L844,260 C844,215.81722 808.18278,180 764,180 Z"></path></svg>

export const positionIcon = <svg viewBox="0 0 1024 1024" height="1em" width="1em" fill="currentColor" focusable="false" aria-hidden="true"><path d="M872,885 C893.879,885 911.64158,902.54379 911.994644,924.338274 L912,925 C912,947.1 894.1,965 872,965 L152,965 C130.121,965 112.35842,947.45621 112.005356,925.661726 L112,925 C112,902.9 129.9,885 152,885 L872,885 Z M512,60 C555.2,60 597.2,68.5 636.7,85.2 C674.8,101.3 709.1,124.4 738.5,153.8 C767.9,183.2 791,217.5 807.1,255.6 C823.8,295.1 832.3,337.1 832.3,380.3 C832.3,496.1 739.4,640.1 539.8,833.4 L512,860.3 L484.2,833.3 C284.6,640.1 191.7,496.1 191.7,380.3 C191.7,337.1 200.2,295.1 216.9,255.6 C233,217.5 256.1,183.2 285.5,153.8 C314.9,124.4 349.2,101.3 387.3,85.2 C426.8,68.5 468.8,60 512,60 Z M512,140 C447.8,140 387.5,165 342.1,210.4 C296.7,255.8 271.7,316.1 271.7,380.3 C271.7,424.4 293.5,479.4 336.5,543.8 C376.8,604 434.3,671.2 512,748.6 C589.6,671.2 647.2,604 687.5,543.8 C730.5,479.5 752.3,424.5 752.3,380.3 C752.3,316.1 727.3,255.8 681.9,210.4 C636.5,165 576.2,140 512,140 Z M512,228 C600.2,228 672,299.8 672,388 C672,476.2 600.2,548 512,548 C423.8,548 352,476.2 352,388 C352,299.8 423.8,228 512,228 Z M512,308 C467.9,308 432,343.9 432,388 C432,432.1 467.9,468 512,468 C556.1,468 592,432.1 592,388 C592,343.9 556.1,308 512,308 Z"></path></svg>


const sizeOptions = [
  createSpecialSizeOption('cover'),
  createSpecialSizeOption('contain'),
  createUnitType('px'),
  createUnitType('%'),
  createUnitType('vh'),
  createUnitType('em'),
]

export const BackgroundImageInput = memo((
  props: {
    title?: string,
    value?: string,
    onChange?: (value?: string) => void,
    marginTop?: number,
    span?: number,
  }
) => {
  const { title, value, onChange, marginTop, span = 24 } = props
  const handleSelectChange = useCallback((imageUrl?: string | null) => {
    if (imageUrl) {
      onChange?.(`url(${imageUrl})`)
    } else {
      onChange?.(undefined)
    }
  }, [onChange])

  return (
    <FoldExtraItem icon={imageIcon} span={span} title={title} marginTop={marginTop}>
      <ImageInput value={value} onChange={handleSelectChange} />
    </FoldExtraItem>
  )
})

export const BackgroundSizeInput = memo((
  props: {
    title?: string,
    value?: string,
    onChange?: (value?: string | null) => void
    marginTop?: number,
    span?: number,
  }
) => {
  const { title, value, onChange, marginTop = 8, span = 12 } = props
  const handleSelectChange = useCallback((backgroundSize?: string | null) => {
    if (backgroundSize) {
      onChange?.(backgroundSize)
    } else {
      onChange?.(undefined)
    }
  }, [onChange])
  return (
    <FoldExtraItem icon={imageSizeIcon} span={span} title={title} marginTop={marginTop}>
      <PolyInput polyTypes={sizeOptions} value={value} onChange={handleSelectChange} />
    </FoldExtraItem>
  )
})

export const BackgroundRepeatInput = memo((
  props: {
    title?: string,
    value?: string,
    onChange?: (value?: string | null) => void
    marginTop?: number,
    span?: number,
  }
) => {
  const { title, value, onChange, marginTop = 8, span = 12 } = props
  return (
    <FoldExtraItem icon={repeatIcon} span={span} title={title} marginTop={marginTop}>
      <Select
        style={{ width: '100%' }}
        options={[
          { value: "no-repeat", label: "No Repeat" },
          { value: "repeat", label: "Repeat" },
          { value: "repeat-x", label: "Repeat X" },
          { value: "repeat-y", label: "Repeat Y" },
          { value: "space", label: "Space" },
          { value: "round", label: "Round" },
        ]}
        placeholder="repeat"
        value={value}
        onChange={onChange}
      />
    </FoldExtraItem>
  )
})

export const BackgroundPositionInput = memo((
  props: {
    title?: string,
    value?: string,
    onChange?: (value?: string | null) => void
    marginTop?: number,
    span?: number,
  }
) => {
  const { title, value, onChange, marginTop = 8, span = 24 } = props
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }
  return (
    <FoldExtraItem icon={positionIcon} span={span} title={title} marginTop={marginTop}>
      <Input placeholder="center center" value={value} onChange={handleChange} />
    </FoldExtraItem>
  )
})
