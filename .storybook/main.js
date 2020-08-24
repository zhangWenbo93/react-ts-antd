module.exports = {
  // 加载src目录下的所有的以stories.js|jsx|ts|tsx结尾的文件，stories文件路径
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-info",
    "@storybook/addon-notes"
  ]
}
