import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Input from './input';

const inputStyle: React.CSSProperties = {
  width: '300px'
}
const defaultInput = () => (
  <Input style={ inputStyle } placeholder="默认的 input" onChange={ action('changed')}/>
)

const inputDisabled = () => (
  <Input style={ inputStyle } disabled placeholder="被禁用的 input"/>
)

const inputWithIcon = () => (
  <Input style={ { width: '300px' } } icon="search" />
)


const inputWithSize = () => (
  <>
    <Input style={ inputStyle } size="lg" value="Large"/>
    <Input style={ inputStyle } size="sm" value="small"/>
  </>
)

const inputWithPand = () => (
  <>
    <Input style={ inputStyle} prepend="http://" value="www.baidu.com"/>
    <Input style={ inputStyle} append=".com" value="https://www.github"/>
  </>
)




storiesOf('Input Component', module)
  .add('Input', defaultInput)
  .add('被禁用的 Input', inputDisabled)
  .add('带图标的 Input', inputWithIcon)
  .add('大小不同的 Input', inputWithSize)
  .add('带前后缀的 Input', inputWithPand)