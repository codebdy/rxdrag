export interface IReactionScripts {
  //属性表达式
  expressions?: {
    [prop: string]: string | undefined,
  },
  //其它脚本
  reactions?: string[],
}