import {
  BgColorsOutlined,
  PictureOutlined,
  HolderOutlined,
  EllipsisOutlined,
  MoreOutlined,
  CloseOutlined,
  BorderLeftOutlined,
  BorderTopOutlined,
  BorderRightOutlined,
  BorderVerticleOutlined,
  BorderBottomOutlined
} from '@ant-design/icons';

export const backgroundTypes = {
  title: '填充',
  options: [
    {
      value: 'color',
      tips: '颜色填充',
      icon: <BgColorsOutlined />
    },
    {
      value: 'image',
      tips: '图像填充',
      icon: <PictureOutlined />
    }
  ]
};

export const backgroundSizes = {
  title: '尺寸',
  options: [
    {
      value: 'auto',
      tips: 'auto',
      label: '默认'
    },
    {
      value: 'contain',
      tips: 'contain',
      label: '等比填充'
    },
    {
      value: 'cover',
      tips: 'cover',
      label: '等比覆盖'
    }
  ]
};

export const backgroundRepeats = {
  title: '平铺',
  options: [
    {
      value: 'repeat',
      tips: '平铺 repeat',
      icon: <HolderOutlined />
    },
    {
      value: 'repeat-x',
      tips: '水平平铺 repeat-x',
      icon: <EllipsisOutlined />
    },
    {
      value: 'repeat-y',
      tips: '垂直平铺 repeat-x',
      icon: <MoreOutlined />
    },
    {
      value: 'no-repeat',
      tips: '不平铺',
      icon: <CloseOutlined />
    }
  ]
};

export const backgroundPositions = {
  title: '定位',
  options: [
    {
      value: 'left top',
      tips: 'left top',
      icon: <BorderLeftOutlined />,
      data: {
        left: '0',
        top: '0'
      }
    },
    {
      value: 'top',
      tips: 'top',
      icon: <BorderTopOutlined />,
      data: {
        left: '50%',
        top: '0'
      }
    },
    {
      value: 'right top',
      tips: 'right top',
      icon: <BorderRightOutlined />,
      data: {
        left: '100%',
        top: '0'
      }
    },
    {
      value: 'left',
      tips: 'left',
      icon: <BorderLeftOutlined />,
      data: {
        left: '0',
        top: '50%'
      }
    },
    {
      value: 'center',
      tips: 'center',
      icon: <BorderVerticleOutlined />,
      data: {
        left: '50%',
        top: '50%'
      }
    },
    {
      value: 'right',
      tips: 'right',
      icon: <BorderRightOutlined />,
      data: {
        left: '100%',
        top: '50%'
      }
    },
    {
      value: 'left bottom',
      tips: 'left bottom',
      icon: <BorderLeftOutlined />,
      data: {
        left: '0',
        top: '100%'
      }
    },
    {
      value: 'bottom',
      tips: 'bottom',
      icon: <BorderBottomOutlined />,
      data: {
        left: '50%',
        top: '100%'
      }
    },
    {
      value: 'right bottom',
      tips: 'right bottom',
      icon: <BorderRightOutlined />,
      data: {
        left: '100%',
        top: '100%'
      }
    }
  ]
};
