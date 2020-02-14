import {BSElement} from "./bselement"

export class BSCol extends BSElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupGrid'
    this.toolboxInfo.elementId = 'column'
    this.toolboxInfo.elementName = "Column"
    this.className = 'BSCol'
    this.widthDropMargin = 15;
    this.acceptedChildren=['BSRow','BSContainer', 'HTMLDiv']

    //this.$meta.baseClass = ['col'] 
    this.$meta.width = {
      xs:'col',
      sm:'',
      md:'',
      lg:'',
      xl:'',
    }

    this.$schema.groups = {
      'columnOptions':{
        label:'Column Options'
      }
    }

    this.$schema.fields={
      width:{
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
      }//--width
    } 

  }

  make(){
    return new BSCol
  }

  clone(){
    let copy = super.clone()
    copy.$meta.width.xs = this.$meta.width.xs
    copy.$meta.width.sm = this.$meta.width.sm
    copy.$meta.width.md = this.$meta.width.md
    copy.$meta.width.lg = this.$meta.width.lg
    copy.$meta.width.xl = this.$meta.width.xl
    return copy
  }

  toViewModel(){
    let model = super.toViewModel()
    model.label.text = "Column"
    model.classList.add(this.$meta.width.xs)
    model.classList.add(this.$meta.width.sm)
    model.classList.add(this.$meta.width.md)
    model.classList.add(this.$meta.width.lg)
    model.classList.add(this.$meta.width.xl)
    //model.classList.push.apply(model.classList, this.$meta.baseClass)
    //model.attributes.contentEditable = false
    return model
  }
}
