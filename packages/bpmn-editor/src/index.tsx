import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ModelToolbar } from "common/ModelBoard/ModelToolbar";
import { ModelBoard } from "common/ModelBoard";
import { Button, Divider, Space, Spin } from "antd";
import { useTranslation } from "react-i18next";
import BpmnModeler from 'bpmn-js/lib/Modeler';
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "./style.less"
import minimapModule from 'diagram-js-minimap';
import "diagram-js-minimap/assets/diagram-js-minimap.css";
import { PropertyBox } from "common/ModelBoard/PropertyBox";
import { useSelection } from "./hooks/useSelection";
import { PropertyPanel } from "./PropertyPanel";
import { useQueryOneProcess } from "./hooks/useQueryOneProcess";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, minMapState, processesState, selectedBpmnProcessIdState } from "./recoil/atoms";
import { useDesignerParams } from "plugin-sdk";
import { useShowError } from "hooks/useShowError";
import { ToolbarActions } from "./ToolbarActions";
import { PRIMARY_COLOR } from "consts";
import { useUpsertProcess } from "./hooks/useUpsertProcess";
import CustomPaletteModule from "./plugins/palette";
import CustomReplaceMenuModule from "./plugins/replace";
import CustomContextPadModule from "./plugins/context-pad";
import { useCustomTranslate } from "./hooks/useCustomTranslate";
import zeebeExtension from './resources/zeebe.json';
import { DeplayButton } from "./ToolbarActions/DeplayButton";
import { XmlEditor } from "./XmlEditor";
import { useQueryProcesses } from "./hooks/useQueryProcesses";
import ProcessList from "./ProcessList";
import { useQueryCagegories } from "./hooks/useQueryCagegories";

export const AppBpmn = memo((props) => {
  const { app } = useDesignerParams();
  const { t } = useTranslation();
  const [changed, setChanged] = useState(false);
  const containerRef = useRef<HTMLDivElement>();
  const canvasrRef = useRef<HTMLDivElement>();
  const [bpmnModeler, setBpmnModeler] = useState<any>()
  const { element } = useSelection(bpmnModeler);
  const setProcesses = useSetRecoilState(processesState(app?.id))
  const setCategories = useSetRecoilState(categoriesState(app?.id))
  const selectedProcessId = useRecoilValue(selectedBpmnProcessIdState(app?.id));
  const { process, loading, error } = useQueryOneProcess(selectedProcessId)
  const { processes, error: listError, loading: listLoading } = useQueryProcesses();
  const { categories, loading: categoriesLoading, error: categoryierError } = useQueryCagegories();
  const [minMap, setMinMap] = useRecoilState(minMapState(app?.id));
  const [xml, setXml] = useState<string>();
  const [showXml, setShowXml] = useState<boolean>();
  const minMapRef = useRef(minMap);
  minMapRef.current = minMap;
  const translate = useCustomTranslate();
  const customTranslateModule = useMemo(() => ({
    translate: ['value', translate]
  }), [translate]);

  useEffect(() => {
    setProcesses(processes || [])
  }, [processes, setProcesses])

  useEffect(() => {
    setCategories(categories || [])
  }, [categories, setCategories])

  const [upsert, { error: saveError, loading: saving }] = useUpsertProcess({
    onCompleted: () => {
      setChanged(false);
    }
  });

  useShowError(error || saveError || listError || categoryierError);

  const handleCommandStackChanged = useCallback((e: any) => {
    setChanged(true);
  }, [])

  useEffect(() => {
    setChanged(false);
    bpmnModeler?.on('commandStack.changed', handleCommandStackChanged);
    return () => {
      bpmnModeler?.off('commandStack.changed', handleCommandStackChanged);
    }
  }, [bpmnModeler, handleCommandStackChanged])

  useEffect(() => {
    if (bpmnModeler) {
      if (minMap) {
        bpmnModeler.get('minimap').open();
      } else {
        bpmnModeler.get('minimap').close();
      }
    }
  }, [minMap, bpmnModeler])

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasrRef?.current;
    if (canvas && selectedProcessId) {
      const bpmnModeler = new BpmnModeler({
        container: canvas,
        propertiesPanel: {
          parent: '#js-properties-panel'
        },
        additionalModules: [
          minimapModule,
          CustomPaletteModule,
          CustomReplaceMenuModule,
          customTranslateModule,
          CustomContextPadModule
        ],
        moddleExtensions: {
          zeebe: zeebeExtension
        }
      });
      setBpmnModeler(bpmnModeler)
      bpmnModeler.on('import.done', (event: any) => {
        const { error } = event;

        if (error) {
          console.error(error)
          container?.classList.remove('with-diagram')
          container?.classList.add('with-error');

        } else {
          bpmnModeler.get('canvas').zoom('fit-viewport');
          minMapRef.current && bpmnModeler.get('minimap').open();
          container?.classList.remove('with-error')
          container?.classList.add('with-diagram');
        }
      });

      if (process?.xml) {
        bpmnModeler.importXML(process?.xml, "");
      }
      return () => {
        bpmnModeler?.destroy();
      }
    }
  }, [process, customTranslateModule, selectedProcessId])

  const toggleMinMap = useCallback(() => {
    setMinMap(minMap => !minMap)
  }, [setMinMap])

  const handleSave = useCallback(() => {
    bpmnModeler.saveXML({ format: true })
      .then((xml: any) => {
        upsert({ id: process?.id, xml: xml?.xml })
      })
      .catch((err: any) => {
        console.error(err)
      })
  }, [bpmnModeler, process?.id, upsert])

  const handleToggleCode = useCallback(() => {
    if (showXml) {
      bpmnModeler.importXML(xml);
    } else {
      bpmnModeler.saveXML({ format: true })
        .then((xml: any) => {
          setXml(xml?.xml)
        })
        .catch((err: any) => {
          console.error(err)
        })
    }
    setShowXml(showXml => !showXml);

  }, [bpmnModeler, showXml, xml]);

  const handleXMLChange = useCallback((value?: string) => {
    setXml(value);
  }, []);

  return (
    <ModelBoard
      listWidth={280}
      toolbar={<ModelToolbar>
        <Button
          type="text"
          shape="circle"
          size="large"
          disabled={!selectedProcessId}
          onClick={handleToggleCode}
        >
          <svg style={{ width: '18px', height: '18px', marginTop: "4px" }} viewBox="0 0 24 24">
            <path
              fill={showXml && selectedProcessId ? PRIMARY_COLOR : "currentColor"}
              d="M12.89,3L14.85,3.4L11.11,21L9.15,20.6L12.89,3M19.59,12L16,8.41V5.58L22.42,12L16,18.41V15.58L19.59,12M1.58,12L8,5.58V8.41L4.41,12L8,15.58V18.41L1.58,12Z" />
          </svg>
        </Button>
        <Divider type="vertical" />
        <Button
          type="text"
          shape="circle"
          size="large"
          disabled={!selectedProcessId}
          onClick={toggleMinMap}
        >
          <svg style={{ width: '18px', height: '18px', marginTop: "4px" }} viewBox="0 0 24 24">
            <path
              fill={minMap && selectedProcessId ? PRIMARY_COLOR : "currentColor"}
              d="M12 4C14.2 4 16 5.8 16 8C16 10.1 13.9 13.5 12 15.9C10.1 13.4 8 10.1 8 8C8 5.8 9.8 4 12 4M12 2C8.7 2 6 4.7 6 8C6 12.5 12 19 12 19S18 12.4 18 8C18 4.7 15.3 2 12 2M12 6C10.9 6 10 6.9 10 8S10.9 10 12 10 14 9.1 14 8 13.1 6 12 6M20 19C20 21.2 16.4 23 12 23S4 21.2 4 19C4 17.7 5.2 16.6 7.1 15.8L7.7 16.7C6.7 17.2 6 17.8 6 18.5C6 19.9 8.7 21 12 21S18 19.9 18 18.5C18 17.8 17.3 17.2 16.2 16.7L16.8 15.8C18.8 16.6 20 17.7 20 19Z"
            />
          </svg>
        </Button>
        <ToolbarActions
          bpmnModeler={bpmnModeler}
          selectedProcessId={selectedProcessId}
        />
        <div style={{ flex: 1 }}></div>
        <Space>
          <Button
            type="primary"
            disabled={!selectedProcessId || !changed}
            loading={saving}
            onClick={handleSave}
          >
            {t("Save")}
          </Button>
          <DeplayButton selectedProcessId={selectedProcessId} changed={changed} />
        </Space>

      </ModelToolbar>
      }
      modelList={
        <ProcessList />
      }
      propertyBox={<PropertyBox title={t("Properties")} >
        <PropertyPanel element={element} modeler={bpmnModeler} />
      </PropertyBox>}
    >
      <Spin spinning={loading || listLoading || categoriesLoading}>
        <div
          className="bmpm-content react-bpmn-diagram-container"
          ref={containerRef as any}
          id="js-drop-zone"
          style={{
            display: showXml ? "none" : undefined
          }}
        >
          <div className="message error">
            <div className="note">
              <p>Ooops, we could not display the BPMN 2.0 diagram.</p>

              <div className="details">
                <span>cause of the problem</span>
                <pre></pre>
              </div>
            </div>
          </div>
          <div className="canvas" ref={canvasrRef as any} id="js-canvas"></div>
        </div>
        {
          showXml &&
          <div className="bpmn-xml-editor">
            <XmlEditor value={xml} onChange={handleXMLChange} />
          </div>
        }

      </Spin>
    </ModelBoard>
  );
})