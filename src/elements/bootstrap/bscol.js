import {RXElement} from "../rxelement"
import responsiveMeta from "../schemas/responsive-meta"

export class BSCol extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupGrid'
    this.toolboxInfo.elementId = 'column'
    this.toolboxInfo.elementName = "Column"
    this.className = 'BSCol'
    this.widthDropMargin = 15;
    this.acceptedChildren=['BSRow','BSContainer', 'HTMLDiv']

    //this.$meta.baseClass = ['col'] 
    this.$meta.width = responsiveMeta
    this.$meta.width.md = 'col-md'

    this.$meta.offset = responsiveMeta

    this.$meta.alignSelf = responsiveMeta

    this.$meta.order = responsiveMeta


    this.$schema.groups = {
      'columnOptions':{
        label:'Column Options'
      }
    }

    this.$schema.fields.width = {
      widget:'OptionRowGroup',
      group:'columnOptions',
      xs:{
        label:'Width',
        isFirst:true,
        widget:'OpSelect',
        columns:2,
        list:{
          'col-1':'1',
          'col-2':'2',
          'col-3':'3',
          'col-4':'4',
          'col-5':'5',
          'col-6':'6',
          'col-7':'7',
          'col-8':'8',
          'col-9':'9',
          'col-10':'10',
          'col-11':'11',
          'col-12':'12',
          'col-auto':'Auto',
          'col':'Col',
        },
      },
      //---------------------
      sm:{
        label:'SM',
        widget:'OpSelect',
        columns:2,
        list:{
          'col-sm-1':'1',
          'col-sm-2':'2',
          'col-sm-3':'3',
          'col-sm-4':'4',
          'col-sm-5':'5',
          'col-sm-6':'6',
          'col-sm-7':'7',
          'col-sm-8':'8',
          'col-sm-9':'9',
          'col-sm-10':'10',
          'col-sm-11':'11',
          'col-sm-12':'12',
          'col-sm-auto':'Auto',
          'col-sm':'Col',
        },
      },
      //---------------------
      md:{
        label:'MD',
        widget:'OpSelect',
        columns:2,
        list:{
          'col-md-1':'1',
          'col-md-2':'2',
          'col-md-3':'3',
          'col-md-4':'4',
          'col-md-5':'5',
          'col-md-6':'6',
          'col-md-7':'7',
          'col-md-8':'8',
          'col-md-9':'9',
          'col-md-10':'10',
          'col-md-11':'11',
          'col-md-12':'12',
          'col-md-auto':'Auto',
          'col-md':'Col',
        },
      },
      //---------------------
      lg:{
        label:'LG',
        widget:'OpSelect',
        columns:2,
        list:{
          'col-lg-1':'1',
          'col-lg-2':'2',
          'col-lg-3':'3',
          'col-lg-4':'4',
          'col-lg-5':'5',
          'col-lg-6':'6',
          'col-lg-7':'7',
          'col-lg-8':'8',
          'col-lg-9':'9',
          'col-lg-10':'10',
          'col-lg-11':'11',
          'col-lg-12':'12',
          'col-lg-auto':'Auto',
          'col-lg':'Col',
        },
      },
      //---------------------
      xl:{
        label:'XL',
        widget:'OpSelect',
        columns:2,
        list:{
          'col-xl-1':'1',
          'col-xl-2':'2',
          'col-xl-3':'3',
          'col-xl-4':'4',
          'col-xl-5':'5',
          'col-xl-6':'6',
          'col-xl-7':'7',
          'col-xl-8':'8',
          'col-xl-9':'9',
          'col-xl-10':'10',
          'col-xl-11':'11',
          'col-xl-12':'12',
          'col-xl-auto':'Auto',
          'col-xl':'Col',
        },
      },
      //---------------------
    }//<--width

    this.$schema.fields.offset = {
      widget:'OptionRowGroup',
      group:'columnOptions',
      xs:{
        label:'Offset',
        isFirst:true,
        widget:'OpSelect',
        columns:2,
        list:{
          'offset-1':'1',
          'offset-2':'2',
          'offset-3':'3',
          'offset-4':'4',
          'offset-5':'5',
          'offset-6':'6',
          'offset-7':'7',
          'offset-8':'8',
          'offset-9':'9',
          'offset-10':'10',
          'offset-11':'11',
        },
      },
      //---------------------
      sm:{
        label:'SM',
        widget:'OpSelect',
        columns:2,
        list:{
          'offset-sm-1':'1',
          'offset-sm-2':'2',
          'offset-sm-3':'3',
          'offset-sm-4':'4',
          'offset-sm-5':'5',
          'offset-sm-6':'6',
          'offset-sm-7':'7',
          'offset-sm-8':'8',
          'offset-sm-9':'9',
          'offset-sm-10':'10',
          'offset-sm-11':'11',
        },
      },
      //---------------------
      md:{
        label:'MD',
        widget:'OpSelect',
        columns:2,
        list:{
          'offset-md-1':'1',
          'offset-md-2':'2',
          'offset-md-3':'3',
          'offset-md-4':'4',
          'offset-md-5':'5',
          'offset-md-6':'6',
          'offset-md-7':'7',
          'offset-md-8':'8',
          'offset-md-9':'9',
          'offset-md-10':'10',
          'offset-md-11':'11',
        },
      },
      //---------------------
      lg:{
        label:'LG',
        widget:'OpSelect',
        columns:2,
        list:{
          'offset-lg-1':'1',
          'offset-lg-2':'2',
          'offset-lg-3':'3',
          'offset-lg-4':'4',
          'offset-lg-5':'5',
          'offset-lg-6':'6',
          'offset-lg-7':'7',
          'offset-lg-8':'8',
          'offset-lg-9':'9',
          'offset-lg-10':'10',
          'offset-lg-11':'11',
        },
      },
      //---------------------
      xl:{
        label:'XL',
        widget:'OpSelect',
        columns:2,
        list:{
          'offset-xl-1':'1',
          'offset-xl-2':'2',
          'offset-xl-3':'3',
          'offset-xl-4':'4',
          'offset-xl-5':'5',
          'offset-xl-6':'6',
          'offset-xl-7':'7',
          'offset-xl-8':'8',
          'offset-xl-9':'9',
          'offset-xl-10':'10',
          'offset-xl-11':'11',
        },
      },
      //---------------------
    }//<--offset

    this.$schema.fields.alignSelf = {
      widget:'OptionRowGroup',
      group:'columnOptions',
      xs:{
        label:'Align Self',
        isFirst:true,
        widget:'OpSelect',
        list:{
          'align-self-auto':'Auto',
          'align-self-start':'Start',
          'align-self-end':'End',
          'align-self-center':'Center',
          'align-self-baseline':'Baseline',
          'align-self-stretch':'Stretch',
        },
      },
      //---------------------
      sm:{
        label:'SM',
        widget:'OpSelect',
        list:{
          'align-self-sm-auto':'Auto',
          'align-self-sm-start':'Start',
          'align-self-sm-end':'End',
          'align-self-sm-center':'Center',
          'align-self-sm-baseline':'Baseline',
          'align-self-sm-stretch':'Stretch',
        },
      },
      //---------------------
      md:{
        label:'MD',
        widget:'OpSelect',
        list:{
          'align-self-md-auto':'Auto',
          'align-self-md-start':'Start',
          'align-self-md-end':'End',
          'align-self-md-center':'Center',
          'align-self-md-baseline':'Baseline',
          'align-self-md-stretch':'Stretch',
        },
      },
      //---------------------
      lg:{
        label:'LG',
        widget:'OpSelect',
        list:{
          'align-self-lg-auto':'Auto',
          'align-self-lg-start':'Start',
          'align-self-lg-end':'End',
          'align-self-lg-center':'Center',
          'align-self-lg-baseline':'Baseline',
          'align-self-lg-stretch':'Stretch',
        },
      },
      //---------------------
      xl:{
        label:'XL',
        widget:'OpSelect',
        list:{
          'align-self-xl-auto':'Auto',
          'align-self-xl-start':'Start',
          'align-self-xl-end':'End',
          'align-self-xl-center':'Center',
          'align-self-xl-baseline':'Baseline',
          'align-self-xl-stretch':'Stretch',
        },
      },
      //---------------------
    }//<--alignSelf

    this.$schema.fields.order = {
      widget:'OptionRowGroup',
      group:'columnOptions',
      xs:{
        label:'Order',
        isFirst:true,
        widget:'OpSelect',
        columns:2,
        list:{
          'order-first':'First',
          'order-last':'Last',
          'order-1':'1',
          'order-2':'2',
          'order-3':'3',
          'order-4':'4',
          'order-5':'5',
          'order-6':'6',
          'order-7':'7',
          'order-8':'8',
          'order-9':'9',
          'order-10':'10',
          'order-11':'11',
          'order-12':'11',
        },
      },
      //---------------------
      sm:{
        label:'SM',
        widget:'OpSelect',
        columns:2,
        list:{
          'order-sm-first':'First',
          'order-sm-last':'Last',
          'order-sm-1':'1',
          'order-sm-2':'2',
          'order-sm-3':'3',
          'order-sm-4':'4',
          'order-sm-5':'5',
          'order-sm-6':'6',
          'order-sm-7':'7',
          'order-sm-8':'8',
          'order-sm-9':'9',
          'order-sm-10':'10',
          'order-sm-11':'11',
          'order-sm-12':'11',
        },
      },
      //---------------------
      md:{
        label:'MD',
        widget:'OpSelect',
        columns:2,
        list:{
          'order-md-first':'First',
          'order-md-last':'Last',
          'order-md-1':'1',
          'order-md-2':'2',
          'order-md-3':'3',
          'order-md-4':'4',
          'order-md-5':'5',
          'order-md-6':'6',
          'order-md-7':'7',
          'order-md-8':'8',
          'order-md-9':'9',
          'order-md-10':'10',
          'order-md-11':'11',
          'order-md-12':'11',
        },
      },
      //---------------------
      lg:{
        label:'LG',
        widget:'OpSelect',
        columns:2,
        list:{
          'order-lg-first':'First',
          'order-lg-last':'Last',
          'order-lg-1':'1',
          'order-lg-2':'2',
          'order-lg-3':'3',
          'order-lg-4':'4',
          'order-lg-5':'5',
          'order-lg-6':'6',
          'order-lg-7':'7',
          'order-lg-8':'8',
          'order-lg-9':'9',
          'order-lg-10':'10',
          'order-lg-11':'11',
          'order-lg-12':'11',
        },
      },
      //---------------------
      xl:{
        label:'XL',
        widget:'OpSelect',
        columns:2,
        list:{
          'order-xl-first':'First',
          'order-xl-last':'Last',
          'order-xl-1':'1',
          'order-xl-2':'2',
          'order-xl-3':'3',
          'order-xl-4':'4',
          'order-xl-5':'5',
          'order-xl-6':'6',
          'order-xl-7':'7',
          'order-xl-8':'8',
          'order-xl-9':'9',
          'order-xl-10':'10',
          'order-xl-11':'11',
          'order-xl-12':'11',
        },
      },
      //---------------------
    }//<--order

    super.addMarginAuto()
    super.addMarginAll()
    super.addMarginH()
    super.addMarginV()
  }

  make(){
    return new BSCol
  }

  clone(){
    let copy = super.clone()
    super.copyMetaTo(this.$meta.width, copy.$meta.width)
    super.copyMetaTo(this.$meta.offset, copy.$meta.offset)
    super.copyMetaTo(this.$meta.alignSelf, copy.$meta.alignSelf)
    super.copyMetaTo(this.$meta.order, copy.$meta.order)

    return copy
  }

  toViewModel(){
    let model = super.toViewModel()
    model.label.text = "Column"

    super.metaFieldToViewModel(model, 'width')
    super.metaFieldToViewModel(model, 'offset')
    super.metaFieldToViewModel(model, 'alignSelf')
    super.metaFieldToViewModel(model, 'order')

    return model
  }
}
