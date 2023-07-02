import Mock from "mockjs";
import { customers, todoList } from "./data";
import { users1, users2 } from "./data/user";

Mock.mock("/api/todo-list", "get", () => {
  return todoList
})

Mock.mock("/api/customers", "get", () => {
  return customers
})

let userSeed = 1;

Mock.mock(RegExp("/api/users?.*"), "get", () => {
  //const page = getQueryVariable("page", request.url)
  
  //const pageSize = getQueryVariable("pageSize", request.url)
  if(userSeed == 1){
    userSeed = 2

    return users1
  }
  if(userSeed == 2){
    userSeed = 1
    return users2
  }
  return users1
})