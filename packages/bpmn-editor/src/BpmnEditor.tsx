import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import BpmnModeler from 'bpmn-js/lib/Modeler';
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "./style.less"
import minimapModule from 'diagram-js-minimap';
import "diagram-js-minimap/assets/diagram-js-minimap.css";
import { useSelection } from "./hooks/useSelection";
import { PropertyPanel } from "./PropertyPanel";

import CustomPaletteModule from "./plugins/palette";
import CustomReplaceMenuModule from "./plugins/replace";
import CustomContextPadModule from "./plugins/context-pad";
import { useCustomTranslate } from "./hooks/useCustomTranslate";
import zeebeExtension from './resources/zeebe.json';
import { XmlEditor } from "./XmlEditor";
import { useTranslate } from "@rxdrag/react-locales";
import { PropertyBox } from "./PropertyBox";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`

export const BpmnEditor = memo((props: {
  minMap?: boolean,
}) => {
  const { minMap } = props;
  const t = useTranslate();
  const [changed, setChanged] = useState(false);
  const containerRef = useRef<HTMLDivElement>();
  const canvasrRef = useRef<HTMLDivElement>();
  const [bpmnModeler, setBpmnModeler] = useState<any>()
  const { element } = useSelection(bpmnModeler);
  const [xml, setXml] = useState<string>();
  const [showXml, setShowXml] = useState<boolean>();
  const minMapRef = useRef(minMap);
  minMapRef.current = minMap;
  const translate = useCustomTranslate();
  const customTranslateModule = useMemo(() => ({
    translate: ['value', translate]
  }), [translate]);

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
    if (canvas) {
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

      // if (process?.xml) {
      //   bpmnModeler.importXML(process?.xml, "");
      // }
      return () => {
        bpmnModeler?.destroy();
      }
    }
  }, [customTranslateModule])

  // const toggleMinMap = useCallback(() => {
  //   setMinMap(minMap => !minMap)
  // }, [setMinMap])

  // const handleSave = useCallback(() => {
  //   bpmnModeler.saveXML({ format: true })
  //     .then((xml: any) => {
  //       upsert({ id: process?.id, xml: xml?.xml })
  //     })
  //     .catch((err: any) => {
  //       console.error(err)
  //     })
  // }, [bpmnModeler, process?.id, upsert])

  // const handleToggleCode = useCallback(() => {
  //   if (showXml) {
  //     bpmnModeler.importXML(xml);
  //   } else {
  //     bpmnModeler.saveXML({ format: true })
  //       .then((xml: any) => {
  //         setXml(xml?.xml)
  //       })
  //       .catch((err: any) => {
  //         console.error(err)
  //       })
  //   }
  //   setShowXml(showXml => !showXml);

  // }, [bpmnModeler, showXml, xml]);

  const handleXMLChange = useCallback((value?: string) => {
    setXml(value);
  }, []);

  return (
    <Container className="bpmn-editor">
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

      <PropertyBox title={t("Properties")} >
        <PropertyPanel element={element} modeler={bpmnModeler} />
      </PropertyBox>
    </Container>
  );
})