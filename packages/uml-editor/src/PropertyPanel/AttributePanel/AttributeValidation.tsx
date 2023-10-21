import { useChangeAttribute } from "../../hooks/useChangeAttribute";
import { useMetaId } from "../../hooks/useMetaId";
import { AttributeMeta, ClassMeta } from "@rxdrag/uml-schema";
import { Container } from "./Container";
import { YupRulesInput } from "./YupRulesInput";
import { IYupValidateSchema } from "@rxdrag/fieldy-yup-validation";
import { useCallback } from "react";

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
      <YupRulesInput
        value={attribute.valitateSchema as IYupValidateSchema | undefined}
        onChange={handleChange}
      />
    </Container>
  );
};
