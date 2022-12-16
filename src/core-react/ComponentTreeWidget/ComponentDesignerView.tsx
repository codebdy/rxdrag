import { isHTMLElement } from "core/utils/html-node";
import { memo, useCallback, useMemo } from "react";
import { useDesignComponent } from "core-react/hooks/useDesignComponent";
import { useTreeNode } from "../hooks/useTreeNode";

export const ComponentDesignerView = memo((props: { nodeId: string }) => {
  const { nodeId } = props;
  const node = useTreeNode(nodeId);
  const Component = useDesignComponent(node?.meta?.componentName);

  const handleRef = useCallback((element: HTMLElement | undefined) => {
    for (const key of Object.keys(node?.rxProps || {})) {
      if (isHTMLElement(element)) {
        element?.setAttribute(key, (node?.rxProps as any)[key])
      }
    }

  }, [node?.rxProps])

  const { style, ...other } = node?.meta.props || {}
  const { dStyle, ...dOther } = node?.designerProps || {}

  const realProps = useMemo(() => {
    return {
      style: { ...style, ...dStyle },
      ...other,
      ...node?.rxProps,
      ...dOther,
    }
  }, [dOther, dStyle, node?.rxProps, other, style])
  return (
    Component && node ?
      (
        !!node.children?.length ?
          <Component ref={handleRef} {...realProps}>
            {
              node.children?.map((childId: string) => {
                return <ComponentDesignerView key={childId} nodeId={childId} />;
              })
            }
          </Component >
          : <Component ref={handleRef} {...realProps} />
      )

      : <></>
  );
});
