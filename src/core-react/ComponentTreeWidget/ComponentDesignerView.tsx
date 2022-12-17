import { isHTMLElement } from "core/utils/html-node";
import { memo, useCallback, useMemo } from "react";
import { useDesignComponent } from "core-react/hooks/useDesignComponent";
import { useTreeNode } from "../hooks/useTreeNode";
import { useDesignerEngine } from "core-react/hooks";
import { PlaceHolder } from "core-react/PlaceHolder";
import { NodeContext } from "core-react/contexts";

export const ComponentDesignerView = memo((props: { nodeId: string }) => {
  const { nodeId } = props;
  const node = useTreeNode(nodeId);
  const Component = useDesignComponent(node?.meta?.componentName);
  const engine = useDesignerEngine()
  const behavior = useMemo(() => engine?.getNodeBehavior(node?.id || ""), [engine, node?.id])

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

  const render = useCallback(() => {
    if (Component && node) {
      if (node.children?.length) {
        return <Component ref={handleRef} {...realProps}>
          {
            node.children?.map((childId: string) => {
              return <ComponentDesignerView key={childId} nodeId={childId} />;
            })
          }
        </Component >
      } else if (behavior?.isDroppable() && node.parentId) {
        return <Component ref={handleRef} {...realProps}>
          <PlaceHolder />
        </Component>
      } else {
        return <Component ref={handleRef} {...realProps} />
      }
    }

    return <></>
  }, [Component, behavior, handleRef, node, realProps])

  return (
    <NodeContext.Provider value={node || undefined}>
      {
        render()
      }

    </NodeContext.Provider>
  );
});
