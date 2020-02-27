export default (model, node, noEnter = true)=>{
  model.attributes.contentEditable = true
  if(noEnter){
    model.on.onkeydown = (event)=>{
      if (event.keyCode === 13) {
        event.preventDefault()
        return false
      }
    }
  }
  model.on.onfocus = (event)=>{
    rxEditor.miniEditbar.show(node.view.$dom)
    rxEditor.commandManager.startEditText(node)
  }

  model.on.onblur = (event)=>{
    if(node.meta.innerHTML !== node.view.$dom.innerHTML){
      node.meta.innerHTML = node.view.$dom.innerHTML
      if(!node.meta.innerHTML && node.empertyInnerHTML){
        node.meta.innerHTML = node.empertyInnerHTML
        node.view.$dom.innerHTML = node.empertyInnerHTML
      }
      rxEditor.commandManager.finishEditText()
    }
    rxEditor.miniEditbar.hide()
  }

  model.on.onpaste = (event)=>{
    let plainText  =  event.clipboardData.getData('text/plain')
    document.execCommand('insertText', false, plainText)
    return false
  }
}