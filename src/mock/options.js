export default[
  {
    label:'Row选项',
    rows:[
      {
        label:'标题',
        value:'h2',
        defaultValue:'h2',
        inputName:'RxButtonSelect',
        props:{
          canClear:false,
          list:{
            h1:'H1',
            h2:'H2',
            h3:'H3',
            h4:'H4',
            h5:'H5',
            h6:'H6',
          },
        },
      },
      {
        label:'Add Border',
        value:['border-right'],
        defaultValue:['border-top', 'border-left'],
        inputName:'RxBorderInput',
        props:{
          addBorder:true,
          list:{
            all : 'border',
            top : 'border-top',
            right : 'border-right',
            bottom : 'border-bottom',
            left : 'border-left',
          },
        },
      },

      {
        label:'Remove Border',
        value:['border-right'],
        defaultValue:['border-top', 'border-left'],
        inputName:'RxBorderInput',
        props:{
          addBorder:false,
          list:{
            all : 'border',
            top : 'border-top',
            right : 'border-right',
            bottom : 'border-bottom',
            left : 'border-left',
          },
        },
      },
      {
        label:'Border2',
        value:'left',
        defaultValue:'left',
        inputName:'RxButtonSelect',
        props:{
          canClear:true,
          list:{
            top:'上',
            right:'右',
            bottom:'下',
            left:"<i class='fas fa-file'></i>",
          },
        },
      },
      {
        label:'Gutters',
        value:'no-gutters',
        defaultValue:'no-gutters',
        inputName:'RxSwitch',
        props:{
          onValue:'no-gutters',
          offValue:'',
        },
      },
      {
        label:'颜色',
        value:'white',
        defaultValue:'black',
        inputName:'RxSelect',
        props:{
          list:{
            white:'白色',
            black:'黑色',
            red:'红色',
            green:'绿色',
            dntknow:'不知道什么色',
          },
        },
      },
      {//==>RxInputRowGroup
        label:'边框',
        isRowGroup:true,
        rows:[//rows
          {
            label:'显示边框',
            value:'no-gutters',
            defaultValue:'no-gutters',
            inputName:'RxSwitch',
            props:{
              onValue:'no-gutters',
              offValue:'',
            },
          },
          {
            label:'位置',
            value:'right',
            defaultValue:'right',
            inputName:'RxSelect',
            props:{
              list:{
                left:'左',
                right:'右',
                top:'上',
                bottom:'下',
              },
            }
          }
        ]
      },//<====
    ],
  },

  {
    label:'文本选项',
    rows:[
      {
        label:'测试3',
        value:'no-gutters',
        defaultValue:'no-gutters',
        inputName:'RxSwitch',
        props:{
          onValue:'no-gutters',
          offValue:'',
        },
      },
      {
        label:'测试4',
        value:'off',
        defaultValue:'off',
        inputName:'RxSwitch',
        props:{
          onValue:'on',
          offValue:'off',
        },
      },
    ],
  },
  {
    label:'Bootstrap工具',
  },
]