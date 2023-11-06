// 每次变更 border 需要清空已有 配置
export const borderStyleProps = [
  'borderStyle',
  'borderWidth',
  'borderColor',
  'borderLeftStyle',
  'borderLeftWidth',
  'borderLeftColor',
  'borderRightStyle',
  'borderRightWidth',
  'borderRightColor',
  'borderTopStyle',
  'borderTopWidth',
  'borderTopColor',
  'borderBottomStyle',
  'borderBottomWidth',
  'borderBottomColor'
];

export const borderRadiusStyleProps = [
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius'
];

// 选中非 flex 布局，直接忽略 flex 属性
export const flexStyleProps = [
  'flexWrap',
  'justifyContent',
  'alignItems',
  'flexDirection'
];

// 配置公共font 样式时，用 默认值替换已有字体属性
export const fontStyleProps = [
  'fontSize',
  'lineHeight',
  'fontFamily',
  'fontWeight',
  'color',
  'textAlign',
  'fontStyle',
  'textDecoration'
];

// 选择图片填充时，仅保留背景字段，忽略其他属性
export const backgroundStyleProps = [
  'backgroundPositionX',
  'backgroundPositionY',
  'backgroundSize',
  'backgroundRepeat',
  'backgroundImage'
];
