import {ObjectState} from "../basic/object-state"

export class EditorState extends ObjectState{
  constructor(){
    super()
    this.__screenWidth = 'xl'
    this.__preView = false
    this.__fullscreen = false
    this.__canUndo = false
    this.__canRedo = false
    this.__showDrawer = true
    //layout attributes
    this.__activeDrawerTab = 'layout'

    this.__activedToolboxGroup = "bootstrap"
  }

  get screenWidth(){
    return this.__screenWidth
  }

  set screenWidth(screenWidth){
    if(this.__screenWidth == screenWidth){return} 
    this.__screenWidth = screenWidth
    this.distributeEvent('screenWidth')
  }


  get preView(){
    return this.__preView
  }

  set preView(preView){
    if(this.__preView == preView){return} 
    this.__preView = preView
    this.distributeEvent('preView')
  }

  get fullscreen(){
    return this.__fullscreen
  }

  set fullscreen(fullscreen){
    if(this.__fullscreen == fullscreen){return} 
    this.__fullscreen = fullscreen
    this.distributeEvent('fullscreen')
  }

  get canUndo(){
    return this.__canUndo
  }

  set canUndo(canUndo){
    if(this.__canUndo == canUndo){return} 
    this.__canUndo = canUndo
    this.distributeEvent('canUndo')
  }

  get canRedo(){
    return this.__canRedo
  }

  set canRedo(canRedo){
    if(this.__canRedo == canRedo){return} 
    this.__canRedo = canRedo
    this.distributeEvent('canRedo')
  }

  get showDrawer(){
    return this.__showDrawer
  }

  set showDrawer(showDrawer){
    if(this.__showDrawer == showDrawer){return} 
    this.__showDrawer = showDrawer
    this.distributeEvent('showDrawer')
  }

  get activeDrawerTab(){
    return this.__activeDrawerTab
  }

  set activeDrawerTab(activeDrawerTab){
    if(this.__activeDrawerTab == activeDrawerTab){return} 
    this.__activeDrawerTab = activeDrawerTab
    this.distributeEvent('activeDrawerTab')
  }

  get activedToolboxGroup(){
    return this.__activedToolboxGroup
  }

  set activedToolboxGroup(activedToolboxGroup){
    if(this.__activedToolboxGroup == activedToolboxGroup){return} 
    this.__activedToolboxGroup = activedToolboxGroup
    this.distributeEvent('activedToolboxGroup')
  }

}