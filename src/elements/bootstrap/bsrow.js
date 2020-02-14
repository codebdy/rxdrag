import {RXElement} from "../rxelement"

export class BSRow extends RXElement{
  constructor(parent) {
    super()
    this.toolboxInfo.groupId = 'groupGrid'
    this.toolboxInfo.elementId = 'row'
    this.toolboxInfo.elementName = "Row"
    this.className = 'BSRow'
    this.heightDropMargin = 15;
    this.acceptedChildren=['BSCol','BSW100']

    this.$meta.baseClass = 'row' 
    this.editMarginStyle.margin = "0"


    this.$schema.groups = {
      'rowOptions':{
        label:'Row Options'
      }
    }
    this.$meta.gutters = ''
    this.$meta.hAlign = {
      xs:'',
      sm:'',
      md:'',
      lg:'',
      xl:'',
    }
    this.$meta.vAlign = {
      xs:'',
      sm:'',
      md:'',
      lg:'',
      xl:'',
    }

    this.$schema.fields.gutters = {
        label:'Gutters',
        widget:'OpSwitch',
        required:true,
        group:'rowOptions',
        onValue:'',
        offValue:'no-gutters',
      }//<----gutters

    this.$schema.fields.hAlign = {
      widget:'OptionRowGroup',
      group:'rowOptions',
      xs:{
        label:'Align Cols(H)',
        isFirst:true,
        widget:'OpSelect',
        list:{
          'justify-content-start':'Start',
          'justify-content-end':'End',
          'justify-content-center':'Center',
          'justify-content-between':'Between',
          'justify-content-around':'Around',
        },
      },
      //---------------------
      sm:{
        label:'SM',
        widget:'OpSelect',
        list:{
          'justify-content-sm-start':'Start',
          'justify-content-sm-end':'End',
          'justify-content-sm-center':'Center',
          'justify-content-sm-between':'Between',
          'justify-content-sm-around':'Around',
        },
      },
      //---------------------
      md:{
        label:'MD',
        widget:'OpSelect',
        list:{
          'justify-content-md-start':'Start',
          'justify-content-md-end':'End',
          'justify-content-md-center':'Center',
          'justify-content-md-between':'Between',
          'justify-content-md-around':'Around',
        },
      },
      //---------------------
      lg:{
        label:'LG',
        widget:'OpSelect',
        list:{
          'justify-content-lg-start':'Start',
          'justify-content-lg-end':'End',
          'justify-content-lg-center':'Center',
          'justify-content-lg-between':'Between',
          'justify-content-lg-around':'Around',
        },
      },
      //---------------------
      xl:{
        label:'XL',
        widget:'OpSelect',
        list:{
          'justify-content-xl-start':'Start',
          'justify-content-xl-end':'End',
          'justify-content-xl-center':'Center',
          'justify-content-xl-between':'Between',
          'justify-content-xl-around':'Around',
        },
      },
      //---------------------
    }//<--hAlign

    this.$schema.fields.vAlign = {
      widget:'OptionRowGroup',
      group:'rowOptions',
      xs:{
        label:'Align Cols(V)',
        isFirst:true,
        widget:'OpSelect',
        list:{
          'align-items-start':'Start',
          'align-items-end':'End',
          'align-items-center':'Center',
          'align-items-baseline':'Between',
          'align-items-stretch':'Around',
        },
      },
      //---------------------
      sm:{
        label:'SM',
        widget:'OpSelect',
        list:{
          'align-items-sm-start':'Start',
          'align-items-sm-end':'End',
          'align-items-sm-center':'Center',
          'align-items-sm-baseline':'Between',
          'align-items-sm-stretch':'Around',
        },
      },
      //---------------------
      md:{
        label:'MD',
        widget:'OpSelect',
        list:{
          'align-items-md-start':'Start',
          'align-items-md-end':'End',
          'align-items-md-center':'Center',
          'align-items-md-baseline':'Between',
          'align-items-md-stretch':'Around',
        },
      },
      //---------------------
      lg:{
        label:'LG',
        widget:'OpSelect',
        list:{
          'align-items-lg-start':'Start',
          'align-items-lg-end':'End',
          'align-items-lg-center':'Center',
          'align-items-lg-baseline':'Between',
          'align-items-lg-stretch':'Around',
        },
      },
      //---------------------
      xl:{
        label:'XL',
        widget:'OpSelect',
        list:{
          'align-items-xl-start':'Start',
          'align-items-xl-end':'End',
          'align-items-xl-center':'Center',
          'align-items-xl-baseline':'Between',
          'align-items-xl-stretch':'Around',
        },
      },
      //---------------------
    }//<--vAlign
  }
 
  make(){
    return new BSRow
  }

  clone(){
    let copy = super.clone()
    copy.$meta.gutters = this.$meta.gutters

    super.copyMetaTo(this.$meta.hAlign, copy.$meta.hAlign)
    super.copyMetaTo(this.$meta.vAlign, copy.$meta.vAlign)

    return copy
  }
 
  toViewModel(){
    let model = super.toViewModel()
    model.label.text = "Row"
    model.classList.push(this.$meta.baseClass)
    model.classList.push(this.$meta.gutters)

    super.metaFieldToViewModel(model, 'hAlign')
    super.metaFieldToViewModel(model, 'vAlign')

    return model
  }
}
