import { forwardRef, memo } from "react"
import cls from "classnames"
import { IconView, IIcon } from "@rxdrag/react-antd-icons";

export type DropdownMenuItemProps = {
  className?: string,
  icon?: IIcon,
  title?: string,
  onClick: (e: React.MouseEvent) => void,
}
export const DropdownMenuItemDesigner = memo(forwardRef<HTMLDivElement, DropdownMenuItemProps>((props, ref) => {
  const { className, icon, title, onClick, ...other } = props;
  return (
    <div ref={ref} className={cls('menu-item', className)} {...other}>
      {
        icon &&
        <div className='dropdown-menu-item-icon'>
          <IconView icon={icon} />
        </div>
      }
      <div className='menu-item-text'>
        {title}
      </div>
    </div>
  )
}))