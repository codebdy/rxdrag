import Mock from "mockjs";
import { customers, todoList } from "./data";
import getQueryVariable from "./getVariable";
import { users1, users2 } from "./data/user";

Mock.mock("/api/todo-list", "get", () => {
  return todoList
})

Mock.mock("/api/customers", "get", () => {
  return customers
})

Mock.mock(RegExp("/api/users?.*"), "get", (request) => {
  const page = getQueryVariable("page", request.url)
  //const pageSize = getQueryVariable("pageSize", request.url)
  if (page) {
    return users2
  }

  return users1
})