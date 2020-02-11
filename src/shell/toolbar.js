import {RXComponent} from "../basic/rxcomponent"

class ToolButton extends RXComponent{
  constructor(icon){
    super()
    this.classList.add('toolbar-button')
    this.innerHTML =`<i class="fa ${icon}" ></i>`
  }

  active(isActive= true){
    if(isActive){
      this.$dom ? this.$dom.classList.add('active') : this.classList.add('active')
    }
    else{
      this.$dom ? this.$dom.classList.remove('active') : this.classList.remove('active')
    }
    return this
  }

  title(title){
    this.attrs.title = title
    return this
  }
}


export class Toolbar extends RXComponent{
  constructor(rxEditorShell, withScreenSize){
    super()
    this.rxEditorShell = rxEditorShell
    this.classList.add('rx-toolbar')

    this.barLeft = new RXComponent()
    this.barLeft.classList.add('left')
    this.pushChild(this.barLeft)

    if(withScreenSize){
      this.createScreenSizeButtons()
      rxEditorShell.state.watch('screenWidth', (state)=>{
        this.refreshScreenSizeButtonsState()
      })
    }


    this.barCenter = new RXComponent()
    this.barCenter.cssClass('center')//#f92472
                   .innerHTML = `
                      <span style="color:#75b325; font-size:22px;font-weight:900;font-family: 'Handlee', cursive;">
                        RXEditor</span>`
    
    this.pushChild(this.barCenter)

    this.barRight = new RXComponent()
    this.barRight.cssClass('right')
    this.pushChild(this.barRight)
    var canvasState = this.rxEditorShell.canvasState
    var outlineBtn = this.creatRightButton('fa-square-o')
              .active()
              .title('Show/hide outline')
              .domOn('onclick',()=>{
                canvasState.showOutline = !canvasState.showOutline
                outlineBtn.active(canvasState.showOutline)
              })

    var labelBtn = this.creatRightButton('fa-tags')
              .active()
              .title('Show/hide Label')
              .domOn('onclick',()=>{
                canvasState.showLabel = !canvasState.showLabel
                labelBtn.active(canvasState.showLabel)
              })

    var marginBtn = this.creatRightButton('fa-arrows-h')
              .active()
              .title('Show/hide margin')
              .domOn('onclick',()=>{
                canvasState.showEditMargin = !canvasState.showEditMargin
                marginBtn.active(canvasState.showEditMargin)
              })
              
    var previewBtn = this.creatRightButton('fa-eye')
              .title('Preview')
              .domOn('onclick',()=>{
                canvasState.preview = !canvasState.preview
                previewBtn.active(canvasState.preview)
              })

    this.creatRightButton('fa-undo').title('Undo')
    this.creatRightButton('fa-repeat').title('Redo')
    this.creatRightButton('fa-download').title('Download')
    this.creatRightButton('fa-trash').title('Clear canvas')
    //this.creatRightButton('fa-cog').title('Settings')
    this.creatRightButton('fa-question-circle').title('About RXEditor')

    this.creatRightButton('fa-bars').domOn('onclick', ()=>{
      rxEditorShell.state.showDrawer = !rxEditorShell.state.showDrawer
    }).title('Show/hide drawer ')
  }

  creatRightButton(icon){
    let btn = new ToolButton(icon)
    this.barRight.pushChild(btn)

    return btn;
  }

  creatLeftButton(icon){
    let btn = new ToolButton(icon)
    this.barLeft.pushChild(btn)

    return btn;
  }

  createScreenSizeButtons(){
    this.xlBtn = this.creatLeftButton('fa-desktop').title('Extra large: ≥1200px')
    this.xlBtn.style.fontSize = '22px'
    this.xlBtn.style.lineHeight = '34px'

    this.lgBtn = this.creatLeftButton('fa-desktop').title('Large: ≥992px')
    this.mdBtn = this.creatLeftButton('fa-tablet').title('Medium:≥768px')
    this.smBtn = this.creatLeftButton('fa-mobile').title('Small:≥576px')
    this.xsBtn = this.creatLeftButton('fa-mobile').title('Extra small: <576px')
    this.xsBtn.style.fontSize = '14px'


    this.xlBtn.domOns.onclick = (event)=>{
      this.rxEditorShell.state.screenWidth = 'xl'
    }
    this.lgBtn.domOns.onclick = (event)=>{
      this.rxEditorShell.state.screenWidth = 'lg'
    }
    this.mdBtn.domOns.onclick = (event)=>{
      this.rxEditorShell.state.screenWidth = 'md'
    }
    this.smBtn.domOns.onclick = (event)=>{
      this.rxEditorShell.state.screenWidth = 'sm'
    }
    this.xsBtn.domOns.onclick = (event)=>{
      this.rxEditorShell.state.screenWidth = 'xs'
    }
    
    this.refreshScreenSizeButtonsState()
  }

  refreshScreenSizeButtonsState(){
    this.xlBtn.active(false)
    this.lgBtn.active(false)
    this.mdBtn.active(false)
    this.smBtn.active(false)
    this.xsBtn.active(false)
    switch(this.rxEditorShell.state.screenWidth){
      case 'xl': 
        this.xlBtn.active()
        break;
      case 'lg': 
        this.lgBtn.active()
        break;
      case 'md': 
        this.mdBtn.active()
        break;
      case 'sm': 
        this.smBtn.active()
        break;
      case 'xs': 
        this.xsBtn.active()
        break;
    }
  }

}

