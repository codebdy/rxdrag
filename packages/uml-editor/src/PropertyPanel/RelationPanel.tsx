import React, { useCallback, useEffect, useMemo } from "react";
import {
  RelationMeta,
  RelationMultiplicity,
  RelationType,
} from "../meta/RelationMeta";
import { useClass } from "../hooks/useClass";
import { useChangeRelation } from "../hooks/useChangeRelation";
import { Collapse, Form, Input, Select } from "antd";
import { useTranslation } from "react-i18next";
import { MultiLangInput } from "components/MultiLangInput";
import { useMetaId } from "../hooks/useMetaId";
import { PannelContainer } from "./PannelContainer";

const { Option } = Select;

export const RelationPanel = (props: { relation: RelationMeta }) => {
  const { relation } = props;
  const metaId = useMetaId();
  const source = useClass(relation.sourceId, metaId);
  const target = useClass(relation.targetId, metaId);
  const changeRelation = useChangeRelation(metaId);
  const { t } = useTranslation();

  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields();
  }, [form, relation.uuid])

  useEffect(() => {
    form.setFieldsValue(relation);
  }, [form, relation])

  const isInherit = useMemo(
    () => RelationType.INHERIT === relation.relationType,
    [relation.relationType]
  );

  const handleChange = useCallback((values: any) => {
    changeRelation({
      ...relation,
      ...values,
    });
  }, [relation, changeRelation])

  return (
    <PannelContainer className="property-pannel no-border" style={{ padding: 0 }}>
      {
        isInherit ?
          <div style={{
            width: "100%",
            padding: "8px",
          }}>{t("UmlEditor.Inherit")}</div>
          : <Form
            name="relationForm"
            form={form}
            colon={false}
            labelAlign="left"
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 15 }}
            initialValues={relation}
            autoComplete="off"
            onValuesChange={handleChange}
          >
            <Collapse className="no-border" defaultActiveKey={['1', '2']}
              items={[
                {
                  key: "1",
                  label: source?.name + t("UmlEditor.Side"),
                  children: <>
                    <Form.Item
                      label={t("UmlEditor.Multiplicity")}
                      name="sourceMutiplicity"
                    >
                      <Select>
                        <Option value={RelationMultiplicity.ZERO_ONE}> {RelationMultiplicity.ZERO_ONE}</Option>
                        {relation.relationType !==
                          RelationType.ONE_WAY_COMBINATION &&
                          relation.relationType !==
                          RelationType.TWO_WAY_COMBINATION && (
                            <Option value={RelationMultiplicity.ZERO_MANY}> {RelationMultiplicity.ZERO_MANY}</Option>
                          )}
                      </Select>

                    </Form.Item>
                    {
                      relation.relationType !== RelationType.ONE_WAY_AGGREGATION &&
                      relation.relationType !== RelationType.ONE_WAY_ASSOCIATION &&
                      relation.relationType !== RelationType.ONE_WAY_COMBINATION &&
                      <>
                        <Form.Item
                          label={t("UmlEditor.RoleName")}
                          name="roleOfSource"
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label={t("Label")}
                          name="labelOfSource"
                        >
                          <MultiLangInput inline title={t("Label")} />
                        </Form.Item>
                        <Form.Item
                          label={t("UmlEditor.Description")}
                          name="descriptionOnSource"
                        >
                          <Input.TextArea />
                        </Form.Item>
                      </>
                    }
                  </>
                },
                {
                  key: "2",
                  label: target?.name + t("UmlEditor.Side"),
                  children: <>
                    <Form.Item
                      label={t("UmlEditor.Multiplicity")}
                      name="targetMultiplicity"
                    >
                      <Select>
                        <Option value={RelationMultiplicity.ZERO_ONE}> {RelationMultiplicity.ZERO_ONE}</Option>
                        <Option value={RelationMultiplicity.ZERO_MANY}> {RelationMultiplicity.ZERO_MANY}</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label={t("UmlEditor.RoleName")}
                      name="roleOfTarget"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={t("Label")}
                      name="labelOfTarget"
                    >
                      <MultiLangInput inline title={t("Label")} />
                    </Form.Item>
                    <Form.Item
                      label={t("UmlEditor.Description")}
                      name="descriptionOnTarget"
                    >
                      <Input.TextArea />
                    </Form.Item>
                  </>
                },
                {
                  key: "3",
                  label: t("UmlEditor.Other"),
                  children: <>
                    <Form.Item
                      label={t("UmlEditor.Type")}
                      name="relationType"
                    >
                      <Select>
                        <Option value={RelationType.TWO_WAY_ASSOCIATION}> {t("UmlEditor.Association")}</Option>
                        <Option value={RelationType.TWO_WAY_AGGREGATION}> {t("UmlEditor.Aggregation")}</Option>
                        <Option value={RelationType.TWO_WAY_COMBINATION}> {t("UmlEditor.Combination")}</Option>
                        <Option value={RelationType.ONE_WAY_ASSOCIATION}> {t("UmlEditor.OneWanAssociation")}</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label={"InnerId"}
                      name="innerId"
                    >
                      <Input disabled />
                    </Form.Item>
                  </>
                }
              ]}
            >
            </Collapse>

          </Form>
      }
    </PannelContainer>
  );
};
