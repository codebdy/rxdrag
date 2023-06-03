import Mock from "mockjs";
import { customers, todoList } from "./data";

Mock.mock("/api/todo-list", "get", ()=>{
  return todoList
})

Mock.mock("/api/customers", "get", ()=>{
  return customers
})
