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
    var shellState = this.rxEditorShell.state
    this.undo = ()=>{}
    this.redo = ()=>{}
    this.download = ()=>{}
    this.clearCanvas = ()=>{}
    this.about = ()=>{}

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
    this.barRight.pushChild(
                        new RXComponent()
                        .cssClass('toolbar-button')
                        .cssClass('theme-button')
                        .setInnerHTML(
                          `<svg t="1582368521709" class="icon" viewBox="0 0 1034 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1171" width="32" height="32"><path d="M523.36460472 508.58771302m-1.00877378 0a1.00877378 1.00877378 0 1 0 2.01754757 0 1.00877378 1.00877378 0 1 0-2.01754757 0Z" fill="#75b325" p-id="1172"></path><path d="M503.24614658 501.03945347m-0.5350887 0a0.53508872 0.53508872 0 1 0 1.07017739 0 0.53508872 0.53508872 0 1 0-1.07017739 0Z" fill="#75b325" p-id="1173"></path><path d="M507.15843449 517.06579883m-7.05703055-1e-8a7.05703055 7.05703055 0 1 0 14.11406108 0 7.05703055 7.05703055 0 1 0-14.11406108 0Z" fill="#75b325" p-id="1174"></path><path d="M497.574548 995.287988a28.341534 28.341534 0 0 1-12.781476-3.149059L15.397992 753.736614A28.341534 28.341534 0 0 1 0.023173 728.544139a27.785818 27.785818 0 0 1 15.374819-25.007236l177.829233-90.396527-177.829233-90.396527a28.156295 28.156295 0 0 1 0-50.19971l177.829233-90.396527-177.829233-90.211288a28.341534 28.341534 0 0 1 0-50.384949L484.793072 3.149059a28.341534 28.341534 0 0 1 25.562952 0l469.39508 238.402316a28.341534 28.341534 0 0 1 0 50.384949l-177.829233 90.211288 177.829233 90.396527a28.156295 28.156295 0 0 1 0 50.19971l-177.829233 90.396527 177.829233 90.396527a27.785818 27.785818 0 0 1 15.374819 25.007236 28.341534 28.341534 0 0 1-15.374819 25.192475L510.356024 992.138929a28.341534 28.341534 0 0 1-12.781476 3.149059z m-407.340087-266.743849L497.574548 935.455861l407.340087-206.911722-165.232996-83.913169-229.325615 116.700434a28.341534 28.341534 0 0 1-25.562952 0l-229.325615-116.700434z m178.199711-140.410999l229.140376 116.515196L725.047775 589.059334a19.079595 19.079595 0 0 1 3.890015-2.037626l175.976845-89.285094-165.232996-83.91317-229.325615 116.515196a28.341534 28.341534 0 0 1-25.562952 0l-229.325615-116.515196-165.232996 83.91317 177.643995 90.211288zM90.234461 266.743849l407.340087 206.911723 227.287989-115.589002 4.075253-2.037626 175.976845-89.285095L497.574548 59.832127z" fill="#75b325" p-id="1175"></path></svg>
                          `
                        )
                      )

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


    var undoBtn = this.creatRightButton('fa-undo')
                      .title('Undo')
                      .enable(false)
                      .domOn('click', ()=>{
                        this.undo()
                      })

    var redoBtn = this.creatRightButton('fa-repeat')
                      .title('Redo')
                      .enable(false)
                      .domOn('click', ()=>{
                        this.redo()
                      })
    
    canvasState.watch('preview',(state)=>{
      outlineBtn.enable(!state.preview)
      marginBtn.enable(!state.preview)
      undoBtn.enable(!state.preview && shellState.canUndo)
      redoBtn.enable(!state.preview && shellState.canRedo)
    })
    shellState.watch('changed',(state)=>{
      undoBtn.enable(state.canUndo)
      redoBtn.enable(state.canRedo)
    })
    this.creatRightButton('fa-download').title('Download')
        .domOn('click',()=>{
          this.download()
        })
    this.creatRightButton('fa-trash').title('Clear canvas')
        .domOn('click',()=>{
          this.clearCanvas()
        })
    //this.creatRightButton('fa-cog').title('Settings')
    this.creatRightButton('fa-question-circle').title('About RXEditor')
        .domOn('click', ()=>{
          this.about()
        })

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

