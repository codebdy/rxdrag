
export class Project{
  constructor(data){
    this.title = data.title
    this.pages = data.pages
    this.styles = data.styles
    this.javascript = data.javascript
    this.theme = data.theme

    this.id = data.id ? data.id : this.seedId()
  }

  seedId(){
    if(!Project.idSeed) Project.idSeed = 1
    Project.idSeed ++
    return Project.idSeed
  }

  getCssFilesString(){
    let filesStr = ""
    this.styles.forEach(file=>{
      if(file.locked){
        filesStr = filesStr + `<link href="${file.path}" rel="stylesheet"> `
      }
    })

    return filesStr
  }

  getJsFilesString(){
    let filesStr = ""
    this.javascript.forEach(file=>{
      if(file.locked){
        filesStr = filesStr + `<script type="text/javascript" src="${file.path}"/><\/script> `
      }
    })

    return filesStr
  }

  getCanvasHtml(store, pageId){
    return `<html style="width:100%;height:100%;">
            <head>
              <title>RXEditor Workspace</title>
              <link href="${store.state.bootstrapCss}" rel="stylesheet">
              <link href="${store.state.fontAwesome}" rel="stylesheet">
              ${this.getCssFilesString()}
              <link href="style/rxeditor.css" rel="stylesheet">
            </head>
            <body id="page-top" style="background-color:#FFF;padding:0;width:100%; height:100%;">
              <div id="canvas"></div>
              <script type="text/javascript" src="${store.state.jquery}"/><\/script>
              <script type="text/javascript" src="${store.state.bootstrapJs}"/><\/script>
              ${this.getJsFilesString()}
              <script type="text/javascript" src="dist/core.js"/><\/script>
              <script>
                creatEditorCore(${pageId})
                rxEditor.hangOn('canvas');
              <\/script>
            </body>
          </html>
        `
  }

  getPreviewHtml(store, code){
    let cssBlocks = ""
    this.styles.forEach(file=>{
      if(!file.locked){
        cssBlocks = cssBlocks + `<style type="text/css">${file.code}<\/style>`
      }
    })

    let jsBlocks = ""
    this.javascript.forEach(file=>{
      if(!file.locked){
        jsBlocks = jsBlocks + `<script type="text/javascript">${file.code}<\/script>`
      }
    })

    return this.getCommonHtml(store, code, cssBlocks, jsBlocks)
  }

  getRealHtml(store, code){
    let cssBlocks = ""
    this.styles.forEach(file=>{
      if(!file.locked){
        cssBlocks = cssBlocks + ` <link href="css/${file.name}" rel="stylesheet">`
      }
    })

    let jsBlocks = ""
    this.javascript.forEach(file=>{
      if(!file.locked){
        jsBlocks = jsBlocks + `<script src="js/${file.name}"><\/script>`
      }
    })
    return this.getCommonHtml(store, code, cssBlocks, jsBlocks, '')
  }

  getCommonHtml(store, code, cssBlocks, jsBlocks, previewCode ='<link href="style/preview.css" rel="stylesheet">'){
    return `<html>
            <head>
              <title>RXEditor Workspace</title>
              <link href="${store.state.bootstrapCss}" rel="stylesheet">
              <link href="${store.state.fontAwesome}" rel="stylesheet">
              ${previewCode}
              ${this.getCssFilesString()}
              ${cssBlocks}
            </head>
            <body>
              ${code}
              <script type="text/javascript" src="${store.state.jquery}"/><\/script>
              <script type="text/javascript" src="${store.state.bootstrapJs}"/><\/script>
              ${this.getJsFilesString()}
              ${jsBlocks}
            </body>
          </html>
        `
  }


}