import { ReactComponent } from "@rxdrag/react-shared"
import { useMemo } from "react"
import { useExprProps } from "../hooks/useExprProps"
import { IComponentRenderSchema } from "../ComponentView"

//获取有效的表达式
const getEffectiveExprs = (exprs: Record<string, string | null>) => {
  const efExprs: Record<string, string | null> = {}

  for (const key of Object.keys(exprs)) {
    if (exprs[key]) {
      efExprs[key] = exprs[key]
    }
  }

  if (Object.keys(efExprs)) {
    return efExprs
  }
}

export function withExprs(WrappedComponent: ReactComponent, node: IComponentRenderSchema): ReactComponent {
  const exprs = node.exprs
  //数组跟对象类型不需要绑定
  if (!exprs) {
    return WrappedComponent
  }

  //有效的表达式
  const effectiveExprs = getEffectiveExprs(exprs)
  if (!effectiveExprs) {
    return WrappedComponent
  }

  return (props: { value?: unknown }) => {
    const exprProps = useExprProps(effectiveExprs, node["x-data"])

    const newProps = useMemo(() => {
      return { ...props, ...exprProps }
    }, [exprProps, props]);

    return <WrappedComponent {...newProps} />
  }
}
