import { useChangeAttribute } from "../../hooks/useChangeAttribute";
import { useMetaId } from "../../hooks/useMetaId";
import { AttributeMeta, ClassMeta } from "@rxdrag/uml-schema";
import { Container } from "./Container";
import { YupRulesInput } from "./YupRulesInput";
import { IYupValidateSchema } from "@rxdrag/fieldy-yup-validation";
import { useCallback } from "react";
import { Form } from "antd";

export const AttributeValidation = (props: {
  attribute: AttributeMeta;
  cls: ClassMeta;
}) => {
  const { attribute, cls } = props;

  const metaId = useMetaId();
  const changeAttribute = useChangeAttribute(metaId);

  const handleChange = useCallback((valitateSchema?: IYupValidateSchema) => {
    changeAttribute({ ...attribute, valitateSchema }, cls)
  }, [attribute, changeAttribute, cls])

  return (
    <Container className="property-pannel">
      <Form
        colon={false}
        labelAlign="left"
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 15 }}
      >
        <YupRulesInput
          value={attribute.valitateSchema as IYupValidateSchema | undefined}
          onChange={handleChange}
        />
      </Form>
    </Container>
  );
};
