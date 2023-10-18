import { ID } from "@rxdrag/shared"
import { MetaContent } from "@rxdrag/uml-editor"

export interface IMeta {
  id: ID
  name?: string
  content?: MetaContent
  publishedContent?: MetaContent
  publishedAt?: Date
  updatedAt?: Date
  createdAt?: Date
}

export interface IMetaInput {
  id?: ID
  name?: string
  content?: MetaContent
  publishedContent?: MetaContent
  publishedAt?: Date
}