import React, { useState } from 'react';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import Transition from './components/Transition/transition';
import Input from './components/Input/input';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);
function App() {
	const menuList = [
		'菜单一',
		'菜单二',
		'菜单三'
	];

	const [
		show,
		setShow
	] = useState(false);

	return (
		<div className="App" style={{ padding: '30px' }}>
			<header className="App-header">
				<Icon icon="coffee" theme="danger" size="1x" />
				<Icon icon="arrow-down" theme="primary" size="1x" />
			</header>
			<Transition in={show} timeout={300} animation="zoom-in-left" wrapper>
				<p>22222222222222222</p>
				<p>22222222222222222</p>
				<p>22222222222222222</p>
				<p>22222222222222222</p>
				<p>22222222222222222</p>
			</Transition>
			<Transition in={show} timeout={300} animation="zoom-in-top" wrapper>
				<Button disabled> Disabled Button </Button>
			</Transition>
			<nav>
				<hr />
				<Button
					onClick={() => {
						setShow(!show);
					}}
				>
					Hello
				</Button>
				<Button disabled> Disabled Button </Button>
				<Button size="lg" btnType="primary">
					Large Primary
				</Button>
				<Button size="sm" btnType="danger">
					Small Danger
				</Button>
				<Button btnType="link" href="http://www.baidu.com" target="_blank">
					Baidu Link
				</Button>
				<Button btnType="link" href="http://www.baidu.com" disabled>
					Disabled Link
				</Button>
				<hr />
				<Menu
					defaultIndex="0"
					onSelect={index => {
						alert(index);
					}}
				>
					{menuList.map((item, index) => {
						return (
							<MenuItem key={item} disabled={index === 1 ? true : false}>
								{item}
							</MenuItem>
						);
					})}
					<SubMenu title="菜单四">
						<MenuItem>菜单4-1</MenuItem>
						<MenuItem disabled>菜单4-2</MenuItem>
						<MenuItem>菜单4-3</MenuItem>
					</SubMenu>
				</Menu>
				<hr />
				<Menu
					mode="vertical"
					defaultOpenSubMenus={[
						'3'
					]}
				>
					{menuList.map((item, index) => {
						return (
							<MenuItem key={item} disabled={index === 1 ? true : false}>
								{item}
							</MenuItem>
						);
					})}
					<SubMenu title="菜单四">
						<MenuItem>菜单4-1</MenuItem>
						<MenuItem disabled>菜单4-2</MenuItem>
						<MenuItem>菜单4-3</MenuItem>
					</SubMenu>
				</Menu>
				<hr />
				<Input style={{ width: '300px' }} disabled value="222" />
				<Input style={{ width: '300px' }} icon="search" />
				<Input style={{ width: '300px' }} prepend="http://" />
				<Input style={{ width: '300px' }} append=".com" />
			</nav>
		</div>
	);
}

export default App;
