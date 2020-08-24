import { configure, addDecorator, addParameters } from '@storybook/react';
import React from 'react'
import { withInfo } from '@storybook/addon-info';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import "../src/styles/index.scss"

library.add(fas)

const options = {
  theme: {
    brandTitle: 'vikingship组件库',
    brandUrl: 'https://github.com'
  },
}

const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px'
}

const storyWrapper = (stroyFn: any) => (
  <div style={ wrapperStyle }>
    <h3>组件演示</h3>
    { stroyFn() }
  </div>
)

addDecorator(storyWrapper)
addDecorator(withInfo)
// addParameters({
//   options: options,

// });
addParameters({ info: { inline: true, header: false } })

const loaderFn = () => {
  const allExports = [require('../src/welcome.stories.tsx')];
  const req = require.context('../src/components', true, /\.stories\.tsx$/);
  req.keys().forEach(fname => allExports.push(req(fname)));
  return allExports;
};


// automatically import all files ending in *.stories.js
configure(loaderFn, module);

