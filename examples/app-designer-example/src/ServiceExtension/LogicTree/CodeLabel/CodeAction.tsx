import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { memo, useCallback } from "react"
import { IExtendsionScript } from "../../../interfaces/extension";

export const CodeAction = memo((
  props: {
    code: IExtendsionScript,
  }
) => {
  const { code } = props;


  // const handleDelete = useCallback(() => {
  //   deleteCodes(code.uuid)
  // }, [deleteCodes, code.uuid]);

  return (
    <>
      <Button
        type="text"
        shape='circle'
        size='small'
      //onClick={handleDelete}
      >
        <EditOutlined />
      </Button>
      <Button
        type="text"
        shape='circle'
        size='small'
        //onClick={handleDelete}
        style={{ color: "inherit" }}
      >
        <DeleteOutlined />
      </Button>
    </>
  )
})
