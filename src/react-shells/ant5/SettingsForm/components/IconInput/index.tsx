import { BorderOutlined, CloseCircleFilled } from "@ant-design/icons";
import { Badge, Button, Modal } from "antd";
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate";
import React, { CSSProperties, useCallback, useEffect, useState } from "react";
import { memo } from "react"
import { IconView } from "react-shells/ant5/components/IconView";
import { IIcon } from "react-shells/ant5/components/IconView/model";
import IconSelectForm, { IconType } from "./IconSelectForm";
import "./style.less"

export const isEmpertyIcon = (icon?: IIcon) => {
  return !icon || (!icon.iconKey && !icon.svgString)
}

export const EmpertyIcon = (
  props: {
    style?: CSSProperties
  }
) => {
  const { style, ...other } = props;
  return <BorderOutlined style={{ ...style, color: "transparent", }} {...other} />
};

const IconInput = memo((
  props: {
    value?: IIcon,
    onChange?: (event: { target: { value?: IIcon } }) => void,
  }
) => {
  const { value, onChange } = props;
  const [iconType, setIconType] = useState<IconType>();
  const [inputValue, setInputValue] = useState(value);
  const [visible, setVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string>();
  const [customizedIcon, setCustomizedIcon] = useState<string>();
  const t = useToolsTranslate()

  const reset = useCallback(() => {
    setSelectedIcon(value?.iconKey)
    setCustomizedIcon(value?.svgString);
    setInputValue(value);
    setIconType(!value?.iconKey && value?.svgString ? IconType.Customized : IconType.Normal)
  }, [value])

  useEffect(() => {
    reset();
  }, [reset]);

  const handelRemove = useCallback(() => {
    setInputValue(undefined);
    onChange?.({ target: { value: undefined } });
  }, [onChange]);

  const handleShow = useCallback(() => {
    setVisible(true);
  }, [])

  const hancleClose = useCallback(() => {
    setVisible(false);
    reset()
  }, [reset])

  const handleConfirm = useCallback(() => {
    let newValue: IIcon | undefined = {
      iconKey: iconType === IconType.Normal ? selectedIcon : undefined,
      svgString: iconType === IconType.Customized ? customizedIcon : undefined,
    }
    newValue = isEmpertyIcon(newValue) ? undefined : newValue;
    setInputValue(newValue);
    onChange?.({ target: { value: newValue } });
    setVisible(false);
  }, [customizedIcon, iconType, onChange, selectedIcon])

  return (
    <div
      className="icon-input"
      style={{
        display: "flex",
        alignItems: "center"
      }}>
      <Badge
        count={
          <Button
            style={{
              display: isEmpertyIcon(inputValue) ? "none" : undefined
            }}
            icon={<CloseCircleFilled className="icon-remove-button-icon" />}
            type="text"
            size="small"
            onClick={handelRemove}
          />
        }
      >
        <Button
          icon={
            <IconView icon={inputValue} />
          }
          onClick={handleShow}
        />
      </Badge>
      <Modal
        className="icon-select-model"
        title={t("IconInput.DialogTitle")}
        centered
        open={visible}
        okText={t("confirm")}
        cancelText={t("cancel")}
        onOk={handleConfirm}
        onCancel={hancleClose}
        width={800}
      >
        <IconSelectForm
          iconType={iconType}
          onTypeChange={setIconType}
          selectedIcon={selectedIcon}
          onSelected={setSelectedIcon}
          customizedIcon={customizedIcon}
          onChangeCustomizedIcon={setCustomizedIcon}
        />
      </Modal>
    </div>
  )
})

export default IconInput;