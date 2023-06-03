import Mock from "mockjs";
import { todoList } from "./data";
Mock.setup({
  timeout: 500
})

Mock.mock("/api/todo-list", "get", todoList)