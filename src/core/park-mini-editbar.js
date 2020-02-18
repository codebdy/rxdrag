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
  }

  model.on.onblur = (event)=>{
    node.$meta.innerHTML = node.view.$dom.innerHTML
    rxEditor.miniEditbar.hide()
  }

  model.on.onpaste = (event)=>{
    let plainText  =  event.clipboardData.getData('text/plain'); 
    document.execCommand('insertText', false, plainText);
  }
}