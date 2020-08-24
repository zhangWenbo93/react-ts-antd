module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("babel-preset-react-app")]
        }
      },
      {
        loader: require.resolve("react-docgen-typescript-loader"),
        options: {
          shouldExtractLiteralValuesFromEnum: true, // 将枚举和联合类型转换
          propFilter: (prop) => {
            // 通过propFilter 过滤内置的属性
            if (prop.parent) {
              return !prop.parent.fileName.includes('node_modules')
            }
            return true
          }
        }
      }
    ]
  });

  config.resolve.extensions.push(".ts", ".tsx");

  return config;
}