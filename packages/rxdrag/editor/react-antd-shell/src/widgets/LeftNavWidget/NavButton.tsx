import { useTranslate } from "@rxdrag/react-locales";
import { Button, Tooltip, Typography } from "antd";
import { useToken } from "antd/es/theme/internal";
import { memo, useCallback, useMemo } from "react"

const { Text } = Typography;
export type ButtonItem = {
  key: string,
  title?: string,
  icon: React.ReactNode
}

export type NavButtonProps = {
  showTitle?: boolean,
  actived?: boolean,
  item: ButtonItem,
  onSelect?: (key: string) => void,
}

export const NavButton = memo((props: NavButtonProps) => {
  const { showTitle, actived, item, onSelect } = props
  const { key, title, icon } = item;
  const [, token] = useToken();
  const t = useTranslate("setters");
  const handleClick = useCallback(() => {
    onSelect?.(key)
  }, [key, onSelect])

  const buttonContent = useMemo(() => {
    return <Button
      size="large"
      type="text"
      style={{
        borderRadius: 0,
        padding: "8px 0",
        height: showTitle ? 56 : 48,
        borderLeft: `${actived ? token.colorPrimary : "transparent"} solid 2px`,
        borderRight: `transparent solid 2px`,
      }}
      onClick={handleClick}
    >
      <div style={{
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        color: actived ? token.colorPrimary : undefined,
        fontSize: 20
      }}>
        {icon}
        {
          showTitle && <Text style={{ color: actived ? token.colorPrimary : undefined, marginTop: 4 }}>{t(title || "")}</Text>
        }
      </div>
    </Button >
  }, [actived, handleClick, icon, showTitle, t, title, token.colorPrimary])
  return (
    showTitle
      ? buttonContent
      : <Tooltip placement="right" title={t(title || "")}>
        {buttonContent}
      </Tooltip>

  )
})