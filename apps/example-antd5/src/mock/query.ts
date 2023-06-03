import Mock from "mockjs";
import { todoList } from "./data";

Mock.mock("/api/todo-list", "get", ()=>{
  return todoList
})

