/* eslint-disable @typescript-eslint/no-explicit-any */
import { Graph } from "@antv/x6";
import { useCallback, useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { useChangeClass } from "../hooks/useChangeClass";
import { useCreateClassAttribute } from "../hooks/useCreateClassAttribute";
import { useDeleteClass } from "../hooks/useDeleteClass";
import { useGetClass } from "../hooks/useGetClass";
import { useHideClassFromDiagram } from "../hooks/useHideClassFromDiagram";
import { selectedElementState } from "../recoil/atoms";
import { ClassEvent, IClassEventData } from "./ClassView";
import { ID } from "@rxdrag/shared";

export function useClassAction(graph: Graph | undefined, metaId: ID) {
  const getClass = useGetClass(metaId);
  const setSelectedElement = useSetRecoilState(
    selectedElementState(metaId)
  );
  const changeClass = useChangeClass(metaId);
  const createAttribute = useCreateClassAttribute(metaId);

  const getClassRef = useRef(getClass);
  getClassRef.current = getClass;
  const hideClass = useHideClassFromDiagram(metaId);
  const hideClassRef = useRef(hideClass);
  hideClassRef.current = hideClass;

  const deleteClass = useDeleteClass(metaId);
  const deleteClassRef = useRef(deleteClass);
  deleteClassRef.current = deleteClass;

  const changeClassRef = useRef(changeClass);
  changeClassRef.current = changeClass;

  const createAttributeRef = useRef(createAttribute);
  createAttributeRef.current = createAttribute;


  const handleAttributeSelect = useCallback(
    (e: CustomEvent<IClassEventData>) => {
      setSelectedElement(e.detail?.attrId);
    },
    [setSelectedElement]
  );

  const handleAttributeDelete = useCallback(
    (e: CustomEvent<IClassEventData>) => {
      const cls = getClassRef.current(e.detail.classId);
      if (!cls) {
        console.error("Class not exist: " + e.detail.classId);
        return;
      }
      changeClassRef.current({
        ...cls,
        attributes: cls.attributes.filter((ent) => ent.uuid !== e.detail.attrId),
      });
    },
    []
  );

  const handleMethodSelect = useCallback(
    (e: CustomEvent<IClassEventData>) => {
      setSelectedElement(e.detail.methodId);
    },
    [setSelectedElement]
  );


  const handleAttributeCreate = useCallback((e: CustomEvent<IClassEventData>) => {
    const cls = getClassRef.current(e.detail.classId);
    if (!cls) {
      console.error("Class not exist: " + e.detail.classId);
      return;
    }
    const attr = createAttributeRef.current(cls);
    setSelectedElement(attr?.uuid)
  }, [setSelectedElement]);

  const handleHideClass = useCallback(
    (e: CustomEvent<IClassEventData>) => {
      hideClassRef.current && hideClassRef.current(e.detail.classId)
    },
    []
  );

  const handelDeleteClass = useCallback(
    (e: CustomEvent<IClassEventData>) => {
      deleteClassRef.current && deleteClassRef.current(e.detail.classId);
    },
    []
  );

  useEffect(() => {
    document.addEventListener(ClassEvent.attributeSelect, handleAttributeSelect as any)
    document.addEventListener(ClassEvent.attributeDelete, handleAttributeDelete as any);
    document.addEventListener(ClassEvent.attributeCreate, handleAttributeCreate as any);
    document.addEventListener(ClassEvent.delete, handelDeleteClass as any);
    document.addEventListener(ClassEvent.hide, handleHideClass as any);
    return () => {
      document.removeEventListener(ClassEvent.attributeSelect, handleAttributeSelect as any)
      document.removeEventListener(ClassEvent.attributeDelete, handleAttributeDelete as any);
      document.removeEventListener(ClassEvent.attributeCreate, handleAttributeCreate as any);
      document.removeEventListener(ClassEvent.delete, handelDeleteClass as any);
      document.removeEventListener(ClassEvent.hide, handleHideClass as any);
    };
  }, [graph, handelDeleteClass, handleAttributeCreate, handleAttributeDelete, handleAttributeSelect, handleHideClass, handleMethodSelect]);
}