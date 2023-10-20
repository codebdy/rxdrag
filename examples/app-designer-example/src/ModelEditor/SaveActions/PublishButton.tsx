import { SyncOutlined } from '@ant-design/icons';
import { useTranslate } from '@rxdrag/react-locales';
import { useChanged, useMetaId } from '@rxdrag/uml-editor';
import { Button, message } from 'antd';
import React, { memo, useCallback } from 'react';


const PublishButton = memo(() => {
  const metaId = useMetaId();
  const changed = useChanged()
  // const published = usePublished()
  const t = useTranslate();

  // const [publish, { loading, error }] = usePublishMeta(metaId, {
  //   onCompleted() {
  //     trigger(EVENT_DATA_POSTED, { entity: "Meta" })
  //     message.success(t("OperateSuccess"));
  //   },
  // });


  // const handlePublish = useCallback(() => {
  //   publish()
  // }, [publish])

  return (
    <Button
      disabled={changed}
      type='primary'
      //loading={loading}
      icon={<SyncOutlined />}
    //onClick={handlePublish}
    >
      {t("Publish")}
    </Button>
  )
});

export default PublishButton;