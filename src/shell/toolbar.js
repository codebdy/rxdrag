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
    this.barCenter.cssClass('center')
                   .innerHTML = `
                      <span style="color:#f92472; font-size:22px;font-weight:900;font-family: 'Handlee', cursive;">
                        RXEditor</span>`
    
    this.pushChild(this.barCenter)

    this.barRight = new RXComponent()
    this.barRight.cssClass('right')
    this.pushChild(this.barRight)

    this.creatRightButton('fa-arrows-h').active()
    this.creatRightButton('fa-eye').title('Preview')
    this.creatRightButton('fa-undo')
    this.creatRightButton('fa-repeat')
    this.creatRightButton('fa-download')
    this.creatRightButton('fa-trash')
    this.creatRightButton('fa-cog')
    this.creatRightButton('fa-question-circle')

    this.creatRightButton('fa-bars').domOn('onclick', ()=>{
      rxEditorShell.state.showDrawer = !rxEditorShell.state.showDrawer
    })
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

