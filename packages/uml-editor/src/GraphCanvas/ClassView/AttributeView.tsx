import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";

import {
  EVENT_ELEMENT_SELECTED_CHANGE,
  offCanvasEvent,
  onCanvasEvent,
} from "../events";
import { useMountRef } from "./useMountRef";
import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { AttributeMeta, StereoType, CONST_ID } from "@rxdrag/uml-schema";

export default function AttributeView(props: {
  attr: AttributeMeta;
  stereoType: StereoType;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
  readOnly?: boolean;
}) {
  const { attr, stereoType, onClick, onDelete, readOnly = false } = props;
  const [hover, setHover] = useState(false);
  const [isSelected, setIsSelected] = React.useState(false);
  const mountRef = useMountRef();

  const isId = attr.name === CONST_ID;

  const handleChangeSelected = useCallback(
    (event: Event) => {
      const selectedId = (event as CustomEvent).detail;
      if (mountRef.current) {
        setIsSelected(selectedId === attr.uuid);
      }
    },
    [attr.uuid, mountRef]
  );

  useEffect(() => {
    onCanvasEvent(EVENT_ELEMENT_SELECTED_CHANGE, handleChangeSelected);
    return () => {
      offCanvasEvent(EVENT_ELEMENT_SELECTED_CHANGE, handleChangeSelected);
    };
  }, [handleChangeSelected]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(attr.uuid);
  }, [attr.uuid, onClick]);

  const handleDeleteClick = useCallback(() => {
    onDelete(attr.uuid);
  }, [attr.uuid, onDelete]);

  return (
    <div
      className={classNames('property', {
        'hover': !readOnly && hover,
        'selected': isSelected,
      })}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          opacity: isId ? 0.8 : undefined,
        }}
      >
        <div
          style={{
            marginLeft: "3px",
          }}
        >
          {attr.name}
          {attr.nullable ? "?" : ""}
        </div>
        {stereoType !== StereoType.Enum && (
          <>
            :
            <div
              style={{
                fontSize: "0.8rem",
                marginLeft: "5px",
              }}
            >
              {attr.typeLabel||attr.type}
            </div>
          </>
        )}
      </div>
      {hover && !readOnly && !isId && (
        <div className="property-action">
          <Button
            type="text"
            shape="circle"
            size="small"
            onClick={handleDeleteClick}
          >
            <DeleteOutlined size={10} />
          </Button>
        </div>
      )}
    </div>
  );
}
