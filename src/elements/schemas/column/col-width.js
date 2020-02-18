import {OptionFragment} from "../option-fragment"
import responsiveMeta from "../responsive"

let colWidthSchema = {
  group:'columnOptions',
  isResponsive:true,
  xs:{
    label:'Width',
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
    label:'Width',
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
    label:'Width',
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
    label:'Width',
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
    label:'Width',
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

class ColWidth extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, colWidthSchema)

    this.metaFragment = Object.assign({}, responsiveMeta) 

    this.fieldName = 'colWidth'
  }

  copyMeta(from, to){
    super.copyResponsiveMetaTo(from, to)
  }

  toViewModel(model, meta){
    let metaFragment = meta[this.fieldName]
    super.responsiveMetaFieldToViewModel(model, metaFragment)
  }
}

var addonWidth = (node, groupName)=>{
  let colWidth = new ColWidth
  colWidth.addon(node, groupName)
  return colWidth
}

export {addonWidth}
