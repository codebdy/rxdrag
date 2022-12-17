import { isHTMLElement } from "core/utils/html-node";
import React, { memo, useCallback, useMemo } from "react";
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
  const slots = useMemo(() => {
    const slts: { [key: string]: React.ReactElement } = {}
    for (const name of Object.keys(node?.slots || {})) {
      const slotId = node?.slots?.[name]
      if (slotId) {
        slts[name] = <ComponentDesignerView nodeId={slotId} />
      }
    }

    return slts
  }, [node?.slots])

  const realProps = useMemo(() => {
    return {
      style: { ...style, ...dStyle },
      ...other,
      ...node?.rxProps,
      ...dOther,
      ...slots
    }
  }, [dOther, dStyle, node?.rxProps, other, slots, style])

  const hasChildren = useMemo(() => !!node?.children?.length, [node?.children?.length])


  const render = useCallback(() => {
    if (Component && node) {
      if (hasChildren) {
        return <Component ref={handleRef} {...realProps} >
          {
            node.children?.map((childId: string) => {
              return <ComponentDesignerView key={childId} nodeId={childId} />;
            })
          }
        </Component >
      } else if (behavior?.isDroppable() && node.parentId) {
        return <Component ref={handleRef} {...realProps}>
          {!behavior.isNoPlaceholder() && <PlaceHolder />}
        </Component>
      } else {
        return <Component ref={handleRef} {...realProps} />
      }
    }

    return <></>
  }, [Component, behavior, handleRef, hasChildren, node, realProps])

  return (
    <NodeContext.Provider value={node || undefined}>
      {
        render()
      }

    </NodeContext.Provider>
  );
});
