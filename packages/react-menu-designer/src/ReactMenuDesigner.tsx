import { memo } from 'react';
import { ReactMenuDesignerInner, ReactMenuDesignerInnerProps } from './ReactMenuDesignerInner';
import { DesignerRoot } from './DesignerRoot';
import { IMenuItem } from './interfaces';
import { ILocales } from '@rxdrag/locales';

export type ReactMenuDesignerProps = ReactMenuDesignerInnerProps & {
  //当前语言
  lang?: string,
  //多语言资源
  locales?: ILocales,
  defaultValue?: IMenuItem[],
  value?: IMenuItem[],
}

export const ReactMenuDesigner = memo((
  props: ReactMenuDesignerProps
) => {
  const { lang, locales, ...rest } = props
  return (
    <DesignerRoot lang={lang} locales={locales}>
      <ReactMenuDesignerInner {...rest} />
    </DesignerRoot>
  )
})

