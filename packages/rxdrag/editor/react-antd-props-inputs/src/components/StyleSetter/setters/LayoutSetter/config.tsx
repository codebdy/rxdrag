import {
  SwapRightOutlined,
  SwapLeftOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined
} from '@ant-design/icons';

import { FoldIcon } from '../../../Fold';
import {
  inlineIcon,
  flexIcon,
  blockIcon,
  inlineBlockIcon,
  flexStartIcon,
  flexEndIcon,
  justifyCenterIcon,
  spaceBetweenIcon,
  spaceEvenlyIcon,
  alignItemsStartIcon,
  alignItemsEnd,
  alignItemsCenterIcon,
  flexWrapIcon,
  noWrapIcon
} from './icons';

export const layoutConfig = {
  display: {
    title: '显示',
    options: [
      {
        value: 'inline',
        tips: '内联布局 inline',
        icon: <FoldIcon icon={inlineIcon} />
      },
      {
        value: 'flex',
        tips: '弹性布局 flex',
        icon: <FoldIcon icon={flexIcon} />
      },
      {
        value: 'block',
        tips: '块级布局 block',
        icon: <FoldIcon icon={blockIcon} />
      },
      {
        value: 'inline-block',
        tips: '内联块布局 inline-block',
        icon: <FoldIcon icon={inlineBlockIcon} />
      }
    ]
  },
  flexDirection: {
    title: '主轴方向',
    options: [
      {
        value: 'row',
        tips: '水平方向，起点在左侧 row',
        icon: <SwapRightOutlined />
      },
      {
        value: 'row-reverse',
        tips: '水平方向，起点在右侧 row-reverse',
        icon: <SwapLeftOutlined />
      },
      {
        value: 'column',
        tips: '垂直方向，起点在上沿 column',
        icon: <VerticalAlignBottomOutlined />
      },
      {
        value: 'column-reverse',
        tips: '垂直方向，起点在下沿 column-reverse',
        icon: <VerticalAlignTopOutlined />
      }
    ]
  },
  justifyContent: {
    title: '主轴对齐',
    options: [
      {
        value: 'flex-start',
        tips: '左对齐 flex-start',
        icon: <FoldIcon icon={flexStartIcon} />
      },
      {
        value: 'flex-end',
        tips: '右对齐 flex-end',
        icon: <FoldIcon icon={flexEndIcon} />
      },
      {
        value: 'center',
        tips: '水平居中 center',
        icon: <FoldIcon icon={justifyCenterIcon} />
      },
      {
        value: 'space-between',
        tips: '两端对齐 space-between',
        icon: <FoldIcon icon={spaceBetweenIcon} />
      },
      {
        value: 'space-around',
        tips: '横向平分 space-around',
        icon: <FoldIcon icon={spaceEvenlyIcon} />
      }
    ]
  },
  alignItems: {
    title: '辅轴对齐',
    options: [
      {
        value: 'start',
        tips: '起点对齐 flex-start',
        icon: <FoldIcon icon={alignItemsStartIcon} />
      },
      {
        value: 'end',
        tips: '终点对齐 flex-end',
        icon: <FoldIcon icon={alignItemsEnd} />
      },
      {
        value: 'center',
        tips: '水平居中 center',
        icon: <FoldIcon icon={alignItemsCenterIcon} />
      }
    ]
  },
  flexWrap: {
    title: '换行',
    options: [
      {
        value: 'nowrap',
        tips: '不换行 nowrap',
        icon: <FoldIcon icon={noWrapIcon} />
      },
      {
        value: 'wrap',
        tips: '第一行在上方 wrap',
        icon: <FoldIcon icon={flexWrapIcon} />
      }
    ]
  }
};
