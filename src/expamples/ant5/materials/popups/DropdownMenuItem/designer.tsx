import { forwardRef, memo } from "react"
import { IIcon } from "react-shells/ant5/components/IconView/model"
import cls from "classnames"
import { IconView } from "react-shells/ant5/components/IconView"

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