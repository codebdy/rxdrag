import { MoreOutlined, EditOutlined, DeleteOutlined, FileAddOutlined, PlusSquareOutlined, LockOutlined } from "@ant-design/icons";
import { Dropdown, Button } from "antd";
import { memo, useCallback, useState } from "react"
import { useSetRecoilState } from 'recoil';
import { useDeletePackage } from '../../hooks/useDeletePackage';
import { useCreateNewClass } from "../../hooks/useCreateNewClass";
import { useCreateNewDiagram } from "../../hooks/useCreateNewDiagram";
import { useBackupSnapshot } from "../../hooks/useBackupSnapshot";
import { useMetaId } from "../../hooks/useMetaId";
import { DiagramDialog } from "../DiagramLabel/DiagramDialog";
import { PackageMeta, StereoType } from "@rxdrag/uml-schema";
import { DiagramMeta } from "../../interfaces";
import { classesState, diagramsState, selectedUmlDiagramState } from "../../recoil/atoms";
import { useTranslate } from "@rxdrag/react-locales";

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
  const t = useTranslate();
  const setSelectedDiagram = useSetRecoilState(
    selectedUmlDiagramState(metaId)
  );

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
    setNewDiagram(undefined);
  }, [backupSnapshot, setDiagrams, setSelectedDiagram]);


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
                label: t("AddDiagram"),
                key: '0',
                onClick: e => {
                  e.domEvent.stopPropagation();
                  handleAddDiagram();
                }
              },
              {
                icon: <PlusSquareOutlined />,
                label: t("AddClass"),
                key: '1',
                onClick: e => e.domEvent.stopPropagation(),
                children: [
                  {
                    label: t("AddEntity"),
                    key: '1-1',
                    onClick: e => {
                      e.domEvent.stopPropagation();
                      addClass(StereoType.Entity);
                    },
                  },
                  {
                    label: t("AddAbstract"),
                    key: '1-2',
                    onClick: e => {
                      e.domEvent.stopPropagation();
                      addClass(StereoType.Abstract);
                    },
                  },
                  {
                    label: t("AddEnum"),
                    key: '3',
                    onClick: e => {
                      e.domEvent.stopPropagation();
                      addClass(StereoType.Enum);
                    },
                  },
                  {
                    label: t("AddValueObject"),
                    key: '4',
                    onClick: e => {
                      e.domEvent.stopPropagation();
                      addClass(StereoType.ValueObject);
                    },
                  },
                  // {
                  //   label: t("AddThirdParty"),
                  //   key: '5',
                  //   onClick: e => {
                  //     e.domEvent.stopPropagation();
                  //     addClass(StereoType.ThirdParty);
                  //   },
                  // },
                  // {
                  //   label: t("AddService"),
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