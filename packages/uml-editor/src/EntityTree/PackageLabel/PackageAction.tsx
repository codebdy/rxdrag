import { MoreOutlined, EditOutlined, DeleteOutlined, FileAddOutlined, PlusSquareOutlined, LockOutlined } from "@ant-design/icons";
import { Dropdown, Button } from "antd";
import { memo, useCallback, useState } from "react"
import { useSetRecoilState } from 'recoil';
import { classesState, diagramsState, selectedApiIdState, selectedGraphLogicIdState, selectedScriptLogicIdState, selectedUmlDiagramState } from "../../recoil/atoms";
import { PackageMeta } from "../../meta/PackageMeta";
import { useDeletePackage } from '../../hooks/useDeletePackage';
import { useCreateNewClass } from "../../hooks/useCreateNewClass";
import { useCreateNewDiagram } from "../../hooks/useCreateNewDiagram";
import { StereoType } from "../../meta/ClassMeta";
import { useBackupSnapshot } from "../../hooks/useBackupSnapshot";
import { useTranslation } from "react-i18next";
import { useMetaId } from "../../hooks/useMetaId";
import { DiagramMeta } from "../../meta/DiagramMeta";
import { DiagramDialog } from "../DiagramLabel/DiagramDialog";

const PackageAction = memo((
  props: {
    pkg: PackageMeta,
    onEdit: () => void,
    onVisibleChange: (visible: boolean) => void,
  }
) => {
  const { pkg, onEdit, onVisibleChange } = props;
  const metaId = useMetaId();
  const [newDiagram, setNewDiagram] = useState<DiagramMeta>();
  const deletePackage = useDeletePackage(metaId)
  const createNewClass = useCreateNewClass(metaId);
  const createNewDiagram = useCreateNewDiagram(metaId);
  const setClasses = useSetRecoilState(classesState(metaId));
  const backupSnapshot = useBackupSnapshot(metaId);
  const setDiagrams = useSetRecoilState(diagramsState(metaId));
  const { t } = useTranslation();
  const setSelectedDiagram = useSetRecoilState(
    selectedUmlDiagramState(metaId)
  );
  const setSelectedScriptId = useSetRecoilState(selectedScriptLogicIdState(metaId));
  const setSelectGraphLogicId = useSetRecoilState(selectedGraphLogicIdState(metaId));
  const setSelectApiId = useSetRecoilState(selectedApiIdState(metaId));

  const handleDelete = useCallback(() => {
    deletePackage(pkg.uuid)
    onVisibleChange(false);
  }, [deletePackage, onVisibleChange, pkg.uuid]);

  const addClass = useCallback(
    (stereoType: StereoType) => {
      backupSnapshot();
      const newClass = createNewClass(stereoType, pkg.uuid);
      setClasses((classes) => [...classes, newClass]);
      onVisibleChange(false);
    },
    [backupSnapshot, createNewClass, onVisibleChange, pkg.uuid, setClasses]
  );

  const handleAddDiagram = useCallback(
    () => {
      setNewDiagram(createNewDiagram(pkg.uuid));
    },
    [createNewDiagram, pkg.uuid]
  );


  const handleClose = useCallback(() => {
    setNewDiagram(undefined)
  }, []);

  const handleConfirm = useCallback((diagram: DiagramMeta) => {
    backupSnapshot();
    setDiagrams((diams) => [...diams, diagram]);
    setSelectedDiagram(diagram.uuid);
    setSelectedScriptId(undefined);
    setSelectGraphLogicId(undefined);
    setNewDiagram(undefined);
    setSelectApiId(undefined);
  }, [backupSnapshot, setDiagrams, setSelectApiId, setSelectGraphLogicId, setSelectedDiagram, setSelectedScriptId]);


  return (
    pkg.system ?
      <Button type="text" shape='circle' size='small'>
        <LockOutlined />
      </Button>
      :
      <>
        <Dropdown
          menu={{
            items: [
              {
                icon: <FileAddOutlined />,
                label: t("UmlEditor.AddDiagram"),
                key: '0',
                onClick: e => {
                  e.domEvent.stopPropagation();
                  handleAddDiagram();
                }
              },
              {
                icon: <PlusSquareOutlined />,
                label: t("UmlEditor.AddClass"),
                key: '1',
                onClick: e => e.domEvent.stopPropagation(),
                children: [
                  {
                    label: t("UmlEditor.AddEntity"),
                    key: '1-1',
                    onClick: e => {
                      e.domEvent.stopPropagation();
                      addClass(StereoType.Entity);
                    },
                  },
                  {
                    label: t("UmlEditor.AddAbstract"),
                    key: '1-2',
                    onClick: e => {
                      e.domEvent.stopPropagation();
                      addClass(StereoType.Abstract);
                    },
                  },
                  {
                    label: t("UmlEditor.AddEnum"),
                    key: '3',
                    onClick: e => {
                      e.domEvent.stopPropagation();
                      addClass(StereoType.Enum);
                    },
                  },
                  {
                    label: t("UmlEditor.AddValueObject"),
                    key: '4',
                    onClick: e => {
                      e.domEvent.stopPropagation();
                      addClass(StereoType.ValueObject);
                    },
                  },
                  // {
                  //   label: t("UmlEditor.AddThirdParty"),
                  //   key: '5',
                  //   onClick: e => {
                  //     e.domEvent.stopPropagation();
                  //     addClass(StereoType.ThirdParty);
                  //   },
                  // },
                  // {
                  //   label: t("UmlEditor.AddService"),
                  //   key: '6',
                  //   onClick: e => {
                  //     e.domEvent.stopPropagation();
                  //     addClass(StereoType.Service);
                  //   },
                  // },
                ]
              },
              {
                icon: <EditOutlined />,
                label: t("Edit"),
                key: '6',
                onClick: e => {
                  e.domEvent.stopPropagation();
                  onEdit();
                  onVisibleChange(false);
                }
              },
              {
                icon: <DeleteOutlined />,
                label: t("Delete"),
                key: '7',
                onClick: e => {
                  e.domEvent.stopPropagation();
                  handleDelete();
                  onVisibleChange(false);
                }
              },
            ]
          }}
          onOpenChange={onVisibleChange}
          trigger={['click']}
        >
          <Button type="text" shape='circle' size='small' onClick={e => e.stopPropagation()}>
            <MoreOutlined />
          </Button>
        </Dropdown>
        {
          newDiagram &&
          <DiagramDialog
            diagram={newDiagram}
            open={!!newDiagram}
            onClose={handleClose}
            onConfirm={handleConfirm}
          />
        }

      </>
  )
})

export default PackageAction;