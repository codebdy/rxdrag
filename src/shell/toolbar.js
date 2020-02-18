import {RXComponent} from "../basic/rxcomponent"
import {RXButton} from "./controls/buttons"

class ToolButton extends RXButton{
  constructor(icon){
    super()
    this.classList.add('toolbar-button')
    this.innerHTML =`<i class="fa ${icon}" ></i>`
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
    var canvasState = this.rxEditorShell.canvasState

    if(withScreenSize){
      this.createScreenSizeButtons()
      rxEditorShell.state.watch('screenWidth', (state)=>{
        this.refreshScreenSizeButtonsState()
        canvasState.screenWidth = rxEditorShell.state.screenWidth
      })
    }


    this.barCenter = new RXComponent()
    this.barCenter.cssClass('center')//#f92472
                   .innerHTML = `
                      <span style="color:#75b325; font-size:22px;font-weight:900;font-family: 'Handlee', cursive;">
                        RXEditor</span>

                      <div>
                      </div>

                  `
    
    this.pushChild(this.barCenter)

    this.barRight = new RXComponent()
    this.barRight.cssClass('right')
    this.pushChild(this.barRight)
    var outlineBtn = this.creatRightButton('fa-square-o')
              .active()
              .title('Show/hide outline')
              .domOn('click',()=>{
                canvasState.showOutline = !canvasState.showOutline
                outlineBtn.active(canvasState.showOutline)
              })

    var marginBtn = this.creatRightButton('fa-arrows-h')
              .active()
              .title('Show/hide margin')
              .domOn('click',()=>{
                canvasState.showEditMargin = !canvasState.showEditMargin
                marginBtn.active(canvasState.showEditMargin)
              })

    var previewBtn = this.creatRightButton('fa-eye')
              .title('Preview')
              .domOn('click',()=>{
                canvasState.preview = !canvasState.preview
                previewBtn.active(canvasState.preview)
              })

    canvasState.watch('preview',(state)=>{
      outlineBtn.enable(!state.preview)
      marginBtn.enable(!state.preview)
      this.rxEditorShell.state.showDrawer = !state.preview
    })

    this.creatRightButton('fa-undo').title('Undo')
    this.creatRightButton('fa-repeat').title('Redo')
    this.creatRightButton('fa-download').title('Download')
    this.creatRightButton('fa-trash').title('Clear canvas')
    //this.creatRightButton('fa-cog').title('Settings')
    this.creatRightButton('fa-question-circle').title('About RXEditor')

    this.creatRightButton('fa-bars').domOn('click', ()=>{
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
    this.xlBtn = this.creatLeftButton('fa-tv').title('Extra large: ≥1200px')
    this.xlBtn.style.fontSize = '22px'
    this.xlBtn.style.lineHeight = '30px'

    this.lgBtn = this.creatLeftButton('fa-desktop').title('Large: ≥992px')
    this.mdBtn = this.creatLeftButton('fa-laptop').title('Medium:≥768px')
    this.smBtn = this.creatLeftButton('fa-tablet').title('Small:≥576px')
    this.xsBtn = this.creatLeftButton('fa-mobile').title('Extra small: <576px')
    //this.xsBtn.style.fontSize = '14px'


    this.xlBtn.domOns.click = (event)=>{
      this.rxEditorShell.state.screenWidth = 'xl'
    }
    this.lgBtn.domOns.click = (event)=>{
      this.rxEditorShell.state.screenWidth = 'lg'
    }
    this.mdBtn.domOns.click = (event)=>{
      this.rxEditorShell.state.screenWidth = 'md'
    }
    this.smBtn.domOns.click = (event)=>{
      this.rxEditorShell.state.screenWidth = 'sm'
    }
    this.xsBtn.domOns.click = (event)=>{
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

