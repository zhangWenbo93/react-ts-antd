import React from 'react'
import { storiesOf } from '@storybook/react'

const titleStyle: React.CSSProperties = {
  padding: "40px 0",
  width: "500px"
}

const welcome = () => {
  return (
    <>
      <div style={ titleStyle }>
        <h2>欢迎来到 vikingship 组件库</h2>
      </div>
      <h3>使用 REACT+TYPESCRIPT 从零到一打造一套你自己的组件库</h3>


      <h3>安装试试</h3>
      <code>
        npm install vikingship --save
        </code>
    </>
  )
}

storiesOf('Welcome page', module)
  .add('welcome', welcome, { info: { disable: true, header:false } })