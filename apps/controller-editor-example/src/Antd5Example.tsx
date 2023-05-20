import { ShellContainer } from "components/ShellContainer"
import { memo, useCallback, useState } from "react"
import { ControllerMetaEditorAntd5 } from "@rxdrag/controller-editor-antd5"
import { IControllerMeta } from "@rxdrag/minions-runtime-react"
import { activityMaterialCategories, activityMaterialLocales } from "@rxdrag/minions-react-materials"

export const Antd5Example = memo(() => {
  const [inputValue, setInputValue] = useState<IControllerMeta>({
    id: "test",
    enable: true,
    name: "测试",
    events: [],
    reactions: [],
    variables: [],
  })

  const handleChange = useCallback((meta?: IControllerMeta) => {
    setInputValue(meta || inputValue)
  }, [inputValue]);


  return (
    <ShellContainer>
      <ControllerMetaEditorAntd5
        value={inputValue}
        onChange={handleChange}
        controllerMetas={[]}
        materialCategories={activityMaterialCategories}
        locales={activityMaterialLocales}
        eventMetas={[
          {
            name: "event1",
            label: "事件1"
          },
          {
            name: "event2",
            label: "事件2"
          },
          {
            name: "event3",
            label: "事件3"
          },
        ]}
      />
    </ShellContainer>
  )
})