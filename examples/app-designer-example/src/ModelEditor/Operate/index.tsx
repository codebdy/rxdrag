import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import { memo, useCallback } from 'react';
import { useImportAppJson } from '../hooks/useImportAppJson';
import { useExportAppJson } from '../hooks/useExportAppJson';
import { useTranslate } from '@rxdrag/react-locales';
import { useApp } from '../../hooks/useApp';
import { useGetMeta, useMetaId } from '@rxdrag/uml-editor';
import { IMeta } from '../../interfaces/meta';

enum OperateEnum {
  exportJson = "exportJson",
  importJson = "importJson",
}

export const Operate = memo((
  props: {
    meta?: IMeta,
  }
) => {
  const { meta } = props;
  const  t  = useTranslate();
  const metaId = useMetaId();
  const app = useApp();
  const getMeta = useGetMeta(metaId)
  const importJson = useImportAppJson(metaId);
  const exportJson = useExportAppJson();

  const handleMenuClick = useCallback(({ key }: any) => {

    if (key === OperateEnum.exportJson) {
      exportJson({
        app,
        meta: meta ? { ...meta, content: getMeta() } : undefined,
      })
    } else if (key === OperateEnum.importJson) {
      importJson()
    }

  }, [app, exportJson, getMeta, importJson, meta])


  return (
    <>
      <Dropdown menu={{
        onClick: handleMenuClick,
        items: [
          {
            key: OperateEnum.exportJson,
            label: t("ExportJson"),
          },
          {
            key: OperateEnum.importJson,
            label: t("ImportJson"),
          },
        ]
      }} trigger={["click"]}>
        <Button onClick={e => e.preventDefault()} loading={false} icon={<EllipsisOutlined />}>
        </Button>
      </Dropdown>

    </>
  )
});
