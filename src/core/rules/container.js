export default {
  dropInMargin : 10,
  editable: false,
  editMarginStyle : {
    paddingX:'30px',
    paddingY:'30px',
  },
  //没有子元素，显示空白
  empertyMargin:true,

  rejectChildren : ['col','thead', 'tbody', 
                           'th', 'tr', 'td']
}