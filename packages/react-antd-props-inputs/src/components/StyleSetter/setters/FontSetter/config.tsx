import { FoldIcon } from '../../../Fold';
import {
  textAlignLeftIcon,
  textAlignCenterIcon,
  textAlignRightIcon,
  textAlignJustifyIcon,
  normalFontStyleIcon,
  italicFontStyleIcon,
  textUnderlineIcon,
  textLineThroughIcon
} from './icons';

export const defaultOptions = [
  {
    label: '一级标题',
    value: 'h1',
    defaultValue: {
      fontWeight: 'bold',
      fontSize: '20px',
      lineHeight: '30px'
    }
  },
  {
    label: '二级标题',
    value: 'h2',
    defaultValue: {
      fontWeight: 'bold',
      fontSize: '16px',
      lineHeight: '24px'
    }
  },
  {
    label: '三级标题',
    value: 'h3',
    defaultValue: {
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '22px'
    }
  },
  {
    label: '段落',
    value: 'p',
    defaultValue: {
      fontWeight: 'normal'
    }
  },
  {
    label: '默认',
    value: 'default'
  },
  {
    label: '自定义',
    value: 'custom'
  }
];

export const fontWeightOptions = [
  {
    label: 'normal',
    value: 'normal'
  },
  {
    label: 'bold',
    value: 'bold'
  }
];

export const fontFamilyOptions = [
  {
    label: <div style={{ fontFamily: 'Helvetica' }}>Helvetica</div>,
    value: 'Helvetica'
  },
  {
    label: <div style={{ fontFamily: 'Arial' }}>Arial</div>,
    value: 'Arial'
  },
  {
    label: <div style={{ fontFamily: 'serif' }}>serif</div>,
    value: 'serif'
  }
];

export const textAlign = {
  title: '对齐',
  options: [
    {
      value: 'left',
      tips: '左对齐 left',
      icon: <FoldIcon icon={textAlignLeftIcon} />
    },
    {
      value: 'center',
      tips: '居中对齐 left',
      icon: <FoldIcon icon={textAlignCenterIcon} />
    },
    {
      value: 'wrap-reverse',
      tips: '右对齐 right',
      icon: <FoldIcon icon={textAlignRightIcon} />
    },
    {
      value: 'justify',
      tips: '两端对齐 justify',
      icon: <FoldIcon icon={textAlignJustifyIcon} />
    }
  ]
};

export const fontStyle = {
  title: '样式',
  options: [
    {
      value: 'normal',
      tips: '常规 normal',
      icon: <FoldIcon icon={normalFontStyleIcon} />
    },
    {
      value: 'italic',
      tips: '斜体 italic',
      icon: <FoldIcon icon={italicFontStyleIcon} />
    }
  ]
};

export const textDecoration = {
  title: '装饰',
  options: [
    {
      value: 'none',
      tips: '无 none',
      label: '--'
    },
    {
      value: 'underline',
      tips: '下划线 underline',
      icon: <FoldIcon icon={textUnderlineIcon} />
    },
    {
      value: 'ine-through',
      tips: '中划线 ine-through',
      icon: <FoldIcon icon={textLineThroughIcon} />
    }
  ]
};
