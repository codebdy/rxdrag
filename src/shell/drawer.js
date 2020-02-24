import {RXComponent} from "../basic/rxcomponent"
import {ObjectState} from "../basic/object-state"
import {Toolbox} from "./toolbox"
import {OptionBox} from "./optionbox"

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
    this.__activeDrawerTab = 'layout'
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
    this.layout.pushChild(
      new RXComponent()
      .cssClass('node-tree-box')
      .setInnerHTML(`
        <div class="tree-header">
          Element Tree
        </div>
        <div class="tree-body">
        </div>
      `)
    )
    this.options.pushChild(this.optionBox)

    this.state.watch('activeDrawerTab', (state)=>{
      this.activeTab(state.activeDrawerTab)
    })
    this.activeTab('layout')
  }

  render(parentElement){
    if(this.$dom){
      parentElement.removeChild(this.$dom)
    }
    super.render(parentElement)
    this.layout.header.domOn('click', ()=>{
      this.state.activeDrawerTab = 'layout'
    })
    this.options.header.domOn('click', ()=>{
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



