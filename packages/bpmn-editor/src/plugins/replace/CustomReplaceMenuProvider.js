export default class CustomReplaceMenuProvider {
  constructor(popupMenu, bpmnReplace) {
    popupMenu.registerProvider("bpmn-replace", this);
    this.replaceElement = bpmnReplace.replaceElement;
  }

  getPopupMenuHeaderEntries(element) {
    return function (entries) {
      return entries;
    };
  }

  getPopupMenuEntries(element) {
    return function (entries) {
      console.log("Replace 菜单", entries)

      //开始事件
      delete entries["replace-with-conditional-start"]
      delete entries["replace-with-signal-start"]

      //中间抛出事件
      delete entries["replace-with-compensation-intermediate-throw"]
      delete entries["replace-with-conditional-intermediate-catch"]
      delete entries["replace-with-escalation-intermediate-throw"]
      delete entries["replace-with-escalation-intermediate-catch"]
      delete entries["replace-with-link-intermediate-catch"]
      delete entries["replace-with-link-intermediate-throw"]
      delete entries["replace-with-signal-intermediate-catch"]
      delete entries["replace-with-signal-intermediate-throw"]

      //结束事件
      delete entries["replace-with-compensation-end"]
      delete entries["replace-with-escalation-end"]
      delete entries["replace-with-signal-end"]
      delete entries["replace-with-terminate-end"]

      //网关
      delete entries["replace-with-complex-gateway"]

      //子流程
      delete entries["replace-with-collapsed-subprocess"]
      delete entries["replace-with-transaction"]

      //序列流
      delete entries["replace-with-conditional-flow"]
      delete entries["replace-with-default-flow"]
      return entries;
    };
  }
}

CustomReplaceMenuProvider.$inject = ["popupMenu", "bpmnReplace"];
