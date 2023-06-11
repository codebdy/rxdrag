import Mock from "mockjs";

Mock.mock("/api/post-user", "post", (options) => {
  console.log('===Post mock', options.body);

  return options.body ? JSON.parse(options.body) : undefined;
})
