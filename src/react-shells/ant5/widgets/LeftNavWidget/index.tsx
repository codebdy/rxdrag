import { memo, useCallback, useEffect, useState } from "react"
import { ButtonItem, NavButton } from "./NavButton"

export type LeftNavProps = {
  showTitle?: boolean,
  activedKey?: string,
  defaultActivedKey?: string,
  items?: ButtonItem[]
  onActive?: (activedKey: string) => void
}

export const LeftNavWidget = memo((
  props: LeftNavProps
) => {
  const { showTitle, activedKey, defaultActivedKey, items, onActive } = props
  const [actived, setActived] = useState<string | undefined>(defaultActivedKey)
  useEffect(() => {
    setActived(defaultActivedKey)
  }, [defaultActivedKey])

  useEffect(() => {
    if (activedKey !== undefined) {
      setActived(activedKey)
    }
  }, [activedKey])

  const handleSelect = useCallback((key: string) => {
    setActived(key)
    onActive?.(key)
  }, [onActive])

  return (
    <>
      {
        items?.map(item => {
          return <NavButton
            actived={actived === item.key}
            key={item.key}
            item={item}
            showTitle={showTitle}
            onSelect={handleSelect}
          />
        })
      }
    </>
  )
})