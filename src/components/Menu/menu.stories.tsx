import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Menu from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const defaultMenu = () => (
	<Menu onSelect={index => action(`clicked ${index} item`)} defaultIndex="0">
		<MenuItem>cool link</MenuItem>
		<MenuItem>cool link 2</MenuItem>
		<MenuItem disabled>disabled</MenuItem>
		<SubMenu title="下拉选项">
			<MenuItem>下拉选项一</MenuItem>
			<MenuItem>下拉选项二</MenuItem>
		</SubMenu>
	</Menu>
);

const menuWithVertical = () => (
	<Menu onSelect={index => action(`clicked ${index} item`)} defaultIndex="0" mode="vertical">
		<MenuItem>cool link</MenuItem>
		<MenuItem>cool link 2</MenuItem>
		<SubMenu title="点击下拉选项">
			<MenuItem>下拉选项一</MenuItem>
			<MenuItem>下拉选项二</MenuItem>
		</SubMenu>
	</Menu>
);

const buttonWithType = () => (
	<Menu
		onSelect={index => action(`clicked ${index} item`)}
		defaultIndex="0"
		mode="vertical"
		defaultOpenSubMenus={[
			'2'
		]}
	>
		<MenuItem>cool link</MenuItem>
		<MenuItem>cool link 2</MenuItem>
		<SubMenu title="默认展开下拉选项">
			<MenuItem>下拉选项一</MenuItem>
			<MenuItem>下拉选项二</MenuItem>
		</SubMenu>
	</Menu>
);

storiesOf('Menu Component', module)
	.add('Menu', defaultMenu)
	.add('纵向的的 Menu', menuWithVertical)
	.add('默认展开的纵向 Menu', buttonWithType);
