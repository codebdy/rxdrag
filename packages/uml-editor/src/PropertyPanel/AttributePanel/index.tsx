import { useMemo } from "react";
import { Tabs, TabsProps } from "antd";
import { useTranslate } from "@rxdrag/react-locales";
import { AttributeMeta, ClassMeta, CONST_ID } from "@rxdrag/uml-schema";
import { AttributeContent } from "./AttributeContent";
import { AttributeValidation } from "./AttributeValidation";
import styled from "styled-components";

const Shell = styled.div`
  flex:1;
  display: flex;
  flex-flow: column;
  height: 0;
  overflow: auto;
  width: 100%;
  .ant-tabs{
    height: 100%;
    .ant-tabs-content-holder{
      overflow: auto;
    }
    .ant-tabs-content{
      height: 100%;
    }
    .ant-tabs-tabpane{
      height: 100%;
    }
  }
`

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
        children: <AttributeValidation attribute={attribute} cls={cls} />,
      },)
    }
    return tabs
  }, [attribute, cls, isId, t]);

  return (
    <Shell>
      <Tabs
        size="small"
        defaultActiveKey="attributes"
        tabBarStyle={{
          paddingLeft: 16,
        }}
        items={items}
      />
    </Shell>
  );
};
