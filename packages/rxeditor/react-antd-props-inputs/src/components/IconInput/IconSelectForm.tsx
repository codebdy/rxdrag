import { useSettersTranslate } from '@rxdrag/react-core';
import { Button, Input, Radio, RadioChangeEvent, Space, Tabs } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { findIcons, iconCategories } from '@rxdrag/react-antd-icons';

export enum IconType {
  Normal = "normal",
  Customized = "Customized"
}

const IconSelectForm = memo((
  props: {
    iconType?: IconType,
    selectedIcon?: string,
    onSelected: (icon: string | undefined) => void,
    customizedIcon?: string,
    onChangeCustomizedIcon: (svgIcon: string | undefined) => void,
    onTypeChange: (iconType: IconType) => void,
  }
) => {
  const { iconType, selectedIcon, onSelected, customizedIcon, onChangeCustomizedIcon, onTypeChange } = props;
  const [keyword, setKeyWord] = useState("");
  const [categoryName, setCategoryName] = useState(iconCategories[0].name);
  const t = useSettersTranslate();

  const getCategory = useCallback((name: string) => {
    for (const category of iconCategories) {
      if (category.name === name) {
        return category;
      }
    }
  }, [])

  const categoryButtons = useMemo(() => iconCategories.map((category) => {
    return {
      label: <>{category.icon} {t("IconInput." + category.name)}</>,
      value: category.name,
      icon: category.icon,
    }
  }), [t])

  const handleChange = useCallback((key: any) => {
    onTypeChange(key)
  }, [onTypeChange]);

  const onCategoryChange = useCallback(({ target: { value } }: RadioChangeEvent) => {
    setCategoryName(value);
  }, []);

  const handleKeywordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(event.target.value)
  }, [])

  const handleCustomizedChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeCustomizedIcon(event.target.value)
  }, [onChangeCustomizedIcon])

  const items = useMemo(() => {
    return [
      {
        key: IconType.Normal,
        label: t("IconInput.IconLib"),
        children: <>
          <div className='icon-lib-actions'>
            <Radio.Group
              options={categoryButtons}
              onChange={onCategoryChange}
              value={categoryName}
              optionType="button"
              buttonStyle="solid"
            />
            <Input.Search allowClear style={{ flex: 1, marginLeft: 8 }} onChange={handleKeywordChange} />
          </div>
          {
            keyword &&
            <Space style={{ marginTop: 16 }} wrap>
              {
                findIcons(keyword, categoryName).map((icon, index) => {
                  return (
                    <Button
                      key={icon.iconKey + index}
                      size='large'
                      icon={<icon.icon />}
                      type={icon.iconKey === selectedIcon ? "primary" : undefined}
                      onClick={() => onSelected(icon.iconKey)}
                    />

                  )
                })
              }
            </Space>
          }
          {
            !keyword && getCategory(categoryName)?.iconGroups.map((group) => {
              return (
                <div key={group.name}>
                  <h3 style={{ padding: "16px 0" }}>
                    {t("IconInput." + group.name)}
                  </h3>
                  <div>
                    <Space wrap>
                      {
                        group.icons.map((icon, index) => {
                          return (
                            <Button
                              key={icon.iconKey + index}
                              size='large'
                              icon={<icon.icon />}
                              type={icon.iconKey === selectedIcon ? "primary" : undefined}
                              onClick={() => onSelected(icon.iconKey)}
                            />
                          )
                        })
                      }
                    </Space>
                  </div>
                </div>
              )
            })
          }
        </>
      },
      {
        key: IconType.Customized,
        label: t("IconInput.Customized"),
        children: <Input.TextArea
          rows={16}
          value={customizedIcon}
          onChange={handleCustomizedChange}
        />
      }

    ]
  }, [categoryButtons, categoryName, customizedIcon, getCategory, handleCustomizedChange, handleKeywordChange, keyword, onCategoryChange, onSelected, selectedIcon, t])

  return (
    <Tabs
      defaultActiveKey={iconType || IconType.Normal}
      items={items}
      onChange={handleChange}>
    </Tabs>
  )
});

export default IconSelectForm;