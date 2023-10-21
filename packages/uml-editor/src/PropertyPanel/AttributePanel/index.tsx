import { useMemo } from "react";
import { Tabs, TabsProps } from "antd";
import { useTranslate } from "@rxdrag/react-locales";
import { AttributeMeta, ClassMeta, CONST_ID } from "@rxdrag/uml-schema";
import { AttributeContent } from "./AttributeContent";


export const AttributePanel = (props: {
  attribute: AttributeMeta;
  cls: ClassMeta;
}) => {
  const { attribute, cls } = props;
  const t = useTranslate();

  const isId = useMemo(() => attribute.name === CONST_ID, [attribute.name]);

  const items = useMemo(() => {
    const tabs: TabsProps['items'] = [
      {
        key: 'attributes',
        label: t("Properties"),
        children: <AttributeContent attribute={attribute} cls={cls} />
      },
    ]

    if (!isId) {
      tabs.push({
        key: 'validation',
        label: t('Validation'),
        children: 'Content of Tab Pane 2',
      },)
    }
    return tabs
  }, [attribute, cls, isId, t]);

  return (
    <Tabs
      size="small"
      defaultActiveKey="attributes"
      items={items}
    />
  );
};
