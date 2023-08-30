import { memo } from "react";
import { DesignerScope } from "./DesignerScope";
import { EditorScropProps } from "./EditorScropProps";
import { EditorTheme } from "../EditorTheme";
import { ConfigRoot } from "../EditorTheme/ConfigRoot";

export const EditorScope = memo((
  props: EditorScropProps
) => {
  const { children, ...rest } = props;
  return (
    <DesignerScope {...rest}>
      <ConfigRoot>
        <EditorTheme>
          {children}
        </EditorTheme>
      </ConfigRoot>
    </DesignerScope>
  )
})