import {RXComponent} from "../basic/rxcomponent"
import {ObjectState} from "../basic/object-state"
import {OptionRow, OptionRowLabel, OptionRowGroup} from "./controls/option-row"
import {ButtonGroup, OpButton} from "./controls/buttons"
import {OpSelect} from "./controls/select"
import {OpLabelsInput} from "./controls/label"

class Tab{
  constructor(){
    this.header = new RXComponent().cssClass('item')
    this.body = new RXComponent().cssClass('tab-body')
  }

  pushChild(child){
    this.body.pushChild(child)
  }

  active(isActive = true){
    if(isActive){
      this.header.$dom ? this.header.$dom.classList.add('active') : this.header.classList.add('active')
      this.body.$dom ? this.body.$dom.classList.add('active') : this.body.classList.add('active')
    }
    else{
      this.header.$dom ? this.header.$dom.classList.remove('active') : this.header.classList.remove('active')
      this.body.$dom ? this.body.$dom.classList.remove('active') : this.body.classList.remove('active')
    }
    return this
  }
}

class DrawerState extends ObjectState{
  constructor(){
    super()
    this.__activeDrawerTab = 'options'
  }

  get activeDrawerTab(){
    return this.__activeDrawerTab
  }

  set activeDrawerTab(activeDrawerTab){
    if(this.__activeDrawerTab == activeDrawerTab){return} 
    this.__activeDrawerTab = activeDrawerTab
    this.distributeEvent('activeDrawerTab')
  }
}


export class Drawer extends RXComponent{
  constructor(){
    super()
    this.state = new DrawerState
    this.cssClass('rx-right-area')
    this.layout = new Tab
    this.layout.header.domAttr('title', 'Layout').innerHTML = '<i class="fa fa-th-large"></i>'
    this.options = new Tab
    this.options.header.domAttr('title', 'Options').innerHTML = '<i class="fa fa-paint-brush"></i>'

    this.pushChild(new RXComponent()
                    .cssClass('rx-drawer')
                    .pushChild(new RXComponent()
                      .cssClass('top-header')
                      .pushChild(this.layout.header)
                      .pushChild(this.options.header)
                    )
                    .pushChild(new RXComponent()
                      .cssClass('tab-contents')
                      .pushChild(this.layout.body)
                      .pushChild(this.options.body)
                    )
                  )
    this.toolbox = new Toolbox()
    this.optionBox = new OptionBox
    this.layout.pushChild(this.toolbox)
    this.options.pushChild(this.optionBox)

    this.state.watch('activeDrawerTab', (state)=>{
      this.activeTab(state.activeDrawerTab)
    })
    this.activeTab('options')
  }

  render(parentElement){
    super.render(parentElement)
    this.layout.header.domOn('onclick', ()=>{
      this.state.activeDrawerTab = 'layout'
    })
    this.options.header.domOn('onclick', ()=>{
      this.state.activeDrawerTab = 'options'
    })
    return this
  }

  activeTab(tabId){
    this.layout.active(false)
    this.options.active(false)
    this[tabId].active()
  }

  editNode(node){
    this.optionBox.editNode(node)
  }

  cancelEditNode(id){
    this.optionBox.cancelEdit()
  }

}

class ToolboxState extends ObjectState{
  constructor(){
    super()
    this.__activedGroup = 'groupContainer'
  }

  get activedGroup(){
    return this.__activedGroup
  }

  set activedGroup(activedGroup){
    if(this.__activedGroup == activedGroup){return} 
    this.__activedGroup = activedGroup
    this.distributeEvent('activedGroup')
  }
}

class ToolGroup extends RXComponent{
  constructor(title, id, groupsState){
    super()
    this.id = id
    this.state = groupsState
    this.cssClass('tool-group')
    this.cssClass('group-collapse')
    this.title = new RXComponent()
    this.title.cssClass('group-title')
    this.title.innerHTML = title
    this.pushChild(this.title)
    this.groupBody = new RXComponent()
    this.groupBody.cssClass('group-body')
    this.pushChild(this.groupBody)

    this.domOn('onclick',()=>{
      this.state.activedGroup = this.id
    })
    this.state.watch('activedGroup', (state)=>{
      this.active(state.activedGroup === this.id)
    })
  }

  active(isActive = true){
    if(!isActive){
      this.$dom ? this.$dom.classList.add('group-collapse') : this.classList.add('group-collapse')
    }
    else{
      this.$dom ? this.$dom.classList.remove('group-collapse') : this.classList.remove('group-collapse')
    }
    return this
  }
}

export class OptionBoxGroup extends ToolGroup{
  constructor(title, id, groupsState){
    super(title, id, groupsState)
  }

  add(optionRow){
    this.groupBody.pushChild(optionRow)
    return this
  }
}

export class OptionBox extends RXComponent{
  constructor(){
    super()
    this.state = new ToolboxState
    this.cssClass('toolbox')
    this.noFocusInnerHtml = `<div style="padding:20px;">No elements selected</div>`
    this.innerHTML = this.noFocusInnerHtml
    //this.initGroups()
  }

  editNode(node){
    this.node = node
    this.setInnerHTML('')
    this.showContent(node)
    this.children.forEach((child)=>{
      child.render(this.$dom)
    })
  }

  cancelEdit(){
    this.node = ''
    this.children.clear()
    this.setInnerHTML(this.noFocusInnerHtml)
  }

  showContent(node){
//------heading
    let row = new OptionRow()
    row.pushChild(new OptionRowLabel('Heading'))
    row.pushChild(new ButtonGroup()
                      .pushChild(new OpButton('H1', 'h1'))
                      .pushChild(new OpButton('H2', 'h2'))
                      .pushChild(new OpButton('H3', 'h3'))
                      .pushChild(new OpButton('H4', 'h4'))
                      .pushChild(new OpButton('H5', 'h5'))
                      .pushChild(new OpButton('H6', 'h6'))
                      .active('h2')
      )
//-------classes
    let classesRow = new OptionRow()
    classesRow.addRowLabel(new OptionRowLabel('Classes'))
    classesRow.pushChild(new OpSelect({
                          container:'container',
                          'container-fluid':'container-fluid'
                        },'', true))

//----------Size
    let sizeGroup = new OptionRowGroup()
    let fistRow = new OptionRow()
    fistRow.addRowLabel(new OptionRowLabel('Size'))
    fistRow.pushChild(new OpSelect({
                          'col-1':'col-1',
                          'col-2':'col-2',
                          'col-3':'col-3',
                          'col-4':'col-4',
                          'col-5':'col-5',
                          'col-6':'col-6',
                          'col-7':'col-7',
                          'col-8':'col-8',
                          'col-9':'col-9',
                          'col-10':'col-10',
                          'col-11':'col-11',
                          'col-12':'col-12',
                          col:'col',
                        },'', false).cssClass('two-column')
                      )
    let smRow = new OptionRow()
    smRow.addRowLabel(new OptionRowLabel('SM'))
    smRow.pushChild(new OpSelect({
                          'col-sm-1':'col-sm-1',
                          'col-sm-2':'col-sm-2',
                          'col-sm-3':'col-sm-3',
                          'col-sm-4':'col-sm-4',
                          'col-sm-5':'col-sm-5',
                          'col-sm-6':'col-sm-6',
                          'col-sm-7':'col-sm-7',
                          'col-sm-8':'col-sm-8',
                          'col-sm-9':'col-sm-9',
                          'col-sm-10':'col-sm-10',
                          'col-sm-11':'col-sm-11',
                          'col-sm-12':'col-sm-12',
                          col:'col-sm',
                        },'', false).cssClass('two-column')
                      )

    let mdRow = new OptionRow()
    mdRow.addRowLabel(new OptionRowLabel('MD'))
    mdRow.pushChild(new OpSelect({
                          'col-md-1':'col-md-1',
                          'col-md-2':'col-md-2',
                          'col-md-3':'col-md-3',
                          'col-md-4':'col-md-4',
                          'col-md-5':'col-md-5',
                          'col-md-6':'col-md-6',
                          'col-md-7':'col-md-7',
                          'col-md-8':'col-md-8',
                          'col-md-9':'col-md-9',
                          'col-md-10':'col-md-10',
                          'col-md-11':'col-md-11',
                          'col-md-12':'col-md-12',
                          col:'col-md',
                        },'', false).cssClass('two-column')
                      )

    let lgRow = new OptionRow()
    lgRow.addRowLabel(new OptionRowLabel('LG'))
    lgRow.pushChild(new OpSelect({
                          'col-lg-1':'col-lg-1',
                          'col-lg-2':'col-lg-2',
                          'col-lg-3':'col-lg-3',
                          'col-lg-4':'col-lg-4',
                          'col-lg-5':'col-lg-5',
                          'col-lg-6':'col-lg-6',
                          'col-lg-7':'col-lg-7',
                          'col-lg-8':'col-lg-8',
                          'col-lg-9':'col-lg-9',
                          'col-lg-10':'col-lg-10',
                          'col-lg-11':'col-lg-11',
                          'col-lg-12':'col-lg-12',
                          col:'col-lg',
                        },'', false).cssClass('two-column')
                      )

    let xlRow = new OptionRow()
    xlRow.addRowLabel(new OptionRowLabel('XL'))
    xlRow.pushChild(new OpSelect({
                          'col-xl-1':'col-xl-1',
                          'col-xl-2':'col-xl-2',
                          'col-xl-3':'col-xl-3',
                          'col-xl-4':'col-xl-4',
                          'col-xl-5':'col-xl-5',
                          'col-xl-6':'col-xl-6',
                          'col-xl-7':'col-xl-7',
                          'col-xl-8':'col-xl-8',
                          'col-xl-9':'col-xl-9',
                          'col-xl-10':'col-xl-10',
                          'col-xl-11':'col-xl-11',
                          'col-xl-12':'col-xl-12',
                          col:'col-lg',
                        },'', false).cssClass('two-column')
                      )


    sizeGroup.addFirstRow(fistRow)
             .addRow(smRow)
             .addRow(mdRow)
             .addRow(lgRow)
             .addRow(xlRow)



    this.pushChild(new OptionBoxGroup('Basic','groupBasic', this.state)
                        .cssClass('no-title-top-border')
                        .active()
                        .add(row)
                        .add(classesRow)
                        .add(sizeGroup)
                        //.add(labelRow)
                  )
    this.pushChild(new OptionBoxGroup('Layout', 'groupLayout', this.state))

    let classRow = new OptionRow().addRowLabel(new OptionRowLabel('Class'))
    classRow.pushChild(new OpLabelsInput())

    let styleRow = new OptionRow().addRowLabel(new OptionRowLabel('Style'))

    let attrRow = new OptionRow().addRowLabel(new OptionRowLabel('Attribute'))
    //styleRow.pushChild(new OpLabelsInput())
    
    this.pushChild(new OptionBoxGroup('Customize','groupCustomize', this.state)
                        .add(classRow)
                        .add(styleRow)
                        .add(attrRow)
      )
                          

  }

}


export class Toolbox extends RXComponent{
  constructor(){
    super()
    this.state = new ToolboxState
    this.cssClass('toolbox')
    this.assembleToolboxItem = (toolboxInfo)=>{
      this.initGroups()
      //let rxModuleNameId = toolboxInfo.groupId
      //if(!this[rxModuleNameId]){
      //  this[rxModuleNameId] = new ToolboxGroup(toolboxInfo.moduleName).render(this.$dom)
      //}

      let toolboxItem = this[toolboxInfo.groupId].add(toolboxInfo)

      toolboxItem.domOn('onmousedown',(event)=>{
        this.draggingFromToolbox(toolboxItem.toolboxInfo.rxNameId)
        toolboxItem.mouseFollower.offsetX = event.offsetX
        toolboxItem.mouseFollower.offsetY = event.offsetY
        this.beginFollowMouse(toolboxItem.mouseFollower, event)
      })
    }

    document.addEventListener('mousemove', (event)=>{
      this.followMouse(event)
    })
    document.addEventListener('mouseup', (event)=>{
      console.log('toolbox mouseup')
      this.endFollowMouse()
      this.endDragFromToolbox()
    })


  }

  initGroups(){
    if(!this['groupContainer']){
      this.groupContainer =  new ToolboxGroup('Container','groupContainer', this.state)
                            .cssClass('no-title-top-border')
                            .render(this.$dom)
      this.groupContainer.active()
    }

    if(!this['groupGrid']){
      this.groupGrid =  new ToolboxGroup('Grid', 'groupGrid', this.state).render(this.$dom)
    }

    if(!this['groupText']){
      this.groupText =  new ToolboxGroup('Text','groupText', this.state).render(this.$dom)
    }
  }

  followMouse(event){
    let mouseFollower = this.mouseFollower
    if(mouseFollower){
      mouseFollower.$dom.style.left =  this.followX(event)
      mouseFollower.$dom.style.top = this.followY(event)
    }
  }

  followX(event){
    return (event.clientX - this.mouseFollower.offsetX - 4) + 'px'
  }

  followY(event){
    return (event.clientY - this.mouseFollower.offsetY - 3) + 'px'
  }

  beginFollowMouse(mouseFollower,event){
    mouseFollower.show()
    this.mouseFollower = mouseFollower
    this.followMouse(event)
  }

  endFollowMouse(){
    if(this.mouseFollower){
      this.mouseFollower.hiden()
    }

    this.mouseFollower = ''
  }

}


export class ToolboxGroup extends ToolGroup{
  constructor(title, id, groupsState){
    super(title, id, groupsState)
  }

  add(toolboxInfo){
    let toolboxItem = new ToolboxItem(toolboxInfo).render(this.groupBody.$dom)
    this.groupBody.pushChild(toolboxItem)
    return toolboxItem
  }
}

class MouseFollower extends RXComponent{
  constructor(){
    super()
    this.cssClass('shell-mousefollower')
    this.cssStyle('display', 'none')
    this.show = ()=>{
      this.$dom.style.display = 'block'
    }
    this.hiden = ()=>{
      this.$dom.style.display = 'none'
    }
  }

}

class ToolboxItem extends RXComponent{
  constructor(toolboxInfo){
    super()
    this.toolboxInfo = toolboxInfo
    this.cssClass('element')
    this.innerHTML = '<i class="fa fa-arrows"></i> ' + toolboxInfo.elementName
    this.mouseFollower = new MouseFollower
    this.mouseFollower.cssClass('element')
    this.mouseFollower.innerHTML = this.innerHTML
    this.pushChild(this.mouseFollower)
  }

}


