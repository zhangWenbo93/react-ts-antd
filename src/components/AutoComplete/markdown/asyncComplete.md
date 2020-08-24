#### 示例代码

```js
const handleFetch = (query: string) => {
  return fetch(`https://api.github.com/search/users?q=${query}`).then(res => res.json()).then(({items}) => {
    return items.slice(0, 10).map((item: any) => ({
      value: item.login,
      ...item
    }));
  });
};

const renderOption = (item: DataSourceType) => {
  const itemWithList = item as DataSourceType<GithubProps>;
  return (
    <div>
      <b> Name: {itemWithList.value}</b>
    </div>
  );
};

return (
  <AutoComplete
    fetchSuggestions={handleFetch}
    style={{width: '300px'}}
    onSelect={action('selected')}
    renderOption={renderOption}
    placeholder="输入 Github 用户名试试"
  />
);
```
