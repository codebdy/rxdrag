import { Space, Button, message } from "antd";
import { useCallback } from "react";
import { memo } from "react";
import PublishButton from "./PublishButton";
import { SaveOutlined } from "@ant-design/icons";
import { Operate } from "../Operate";
import { useChangedState, useGetMeta, useValidate } from "@rxdrag/uml-editor";
import { useMetaId } from "@rxdrag/uml-editor/src/hooks/useMetaId";
import { useApp } from "../../hooks/useApp";
import { IMeta } from "../../interfaces/meta";
import { useTranslate } from "@rxdrag/react-locales";
import { useSaveApp } from "../../hooks/useSaveApp";

const SaveActions = memo((props: {
  meta: IMeta | undefined
}) => {
  const { meta } = props;
  const metaId = useMetaId() || "";
  const app = useApp();
  const [changed, setChanged] = useChangedState();
  const getMeta = useGetMeta(metaId);
  const  t  = useTranslate();
  const [saveApp, { loading: appSaving, }] = useSaveApp({
    onComplete() {
      message.success(t("OperateSuccess"));
      setChanged(false);
    }
  })

  // const [save, { loading, error }] = useUpsertMeta({
  //   onCompleted(data: IMeta) {
  //     if (app?.metaId) {
  //       message.success(t("OperateSuccess"));
  //       setChanged(false);
  //     } else {
  //       saveApp({ id: app?.id, metaId: data.id })
  //     }
  //   }
  // })

  const validate = useValidate(metaId);

  //useShowError(error || serviceError);

  const handleSave = useCallback(() => {
    if (!validate()) {
      return;
    }
    const data = getMeta()
    //save({ id: metaId ? metaId : undefined, content: data });
  }, [getMeta, validate]);

  return (
    <Space>
      <Button
        type="primary"
        disabled={!changed}
        icon={<SaveOutlined />}
        loading={appSaving}
        onClick={handleSave}
      >
        {t("Save")}
      </Button>
      <PublishButton />
      <Operate meta ={meta} />
    </Space>
  )
})

export default SaveActions;