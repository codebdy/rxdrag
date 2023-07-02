import {
  BorderOutlined,
  ExpandOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  BorderTopOutlined,
  BorderLeftOutlined,
  BorderOuterOutlined,
  BorderRightOutlined,
  BorderBottomOutlined
} from '@ant-design/icons';

export const borderTypes = {
  title: '圆角',
  options: [
    {
      value: 'fixedBorder',
      tips: '固定圆角',
      icon: <BorderOutlined />
    },
    {
      value: 'fragmentBorder',
      tips: '单独定义',
      icon: <ExpandOutlined />
    }
  ]
};

export const borderRadiusFragments = [
  {
    value: 'borderTopLeftRadius',
    tips: '左上角',
    icon: <RadiusUpleftOutlined />
  },
  {
    value: 'borderTopRightRadius',
    tips: '右上角',
    icon: <RadiusUprightOutlined />
  },
  {
    value: 'borderBottomLeftRadius',
    tips: '左下角',
    icon: <RadiusBottomleftOutlined />
  },
  {
    value: 'borderBottomRightRadius',
    tips: '右下角',
    icon: <RadiusBottomrightOutlined />
  }
];

export const borders = [
  {
    value: 'borderTop',
    tips: '上边框',
    icon: <BorderTopOutlined />,
    data: {
      offset: 8,
      span: 16
    }
  },
  {
    value: 'borderLeft',
    tips: '左边框',
    icon: <BorderLeftOutlined />,
    data: {
      span: 8
    }
  },
  {
    value: 'border',
    tips: '边框',
    icon: <BorderOuterOutlined />,
    data: {
      span: 8
    }
  },
  {
    value: 'borderRight',
    tips: '右边框',
    icon: <BorderRightOutlined />,
    data: {
      span: 8
    }
  },
  {
    value: 'borderBottom',
    tips: '下边框',
    icon: <BorderBottomOutlined />,
    data: {
      offset: 8,
      span: 8
    }
  }
];

export const borderStyles = {
  title: '线形',
  options: [
    {
      label: 'none',
      value: 'none'
    },
    {
      label: <div style={{ borderBottom: 'solid 1px', height: 12 }}></div>,
      value: 'solid'
    },
    {
      label: <div style={{ borderBottom: 'dashed 1px', height: 12 }}></div>,
      value: 'dashed'
    },
    {
      label: <div style={{ borderBottom: 'dotted 1px', height: 12 }}></div>,
      value: 'dotted'
    }
  ]
};
