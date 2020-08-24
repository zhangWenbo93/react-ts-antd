import React from 'react';
import { render, fireEvent, RenderResult, cleanup } from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';

const testProps: MenuProps = {
	defaultIndex: '0',
	onSelect: jest.fn(),
	className: 'test'
};

const testVerProps: MenuProps = {
	defaultIndex: '0',
	mode: 'vertical'
};

const generateMenu = (props: MenuProps) => {
	return (
		<Menu {...props}>
			<MenuItem>active</MenuItem>
			<MenuItem disabled>disabled</MenuItem>
			<MenuItem>xyz</MenuItem>
			<li>hanmeimei</li>
		</Menu>
	);
};

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;

describe('test Menu and MenuItem component', () => {
	beforeEach(() => {
		// 通用函数，每个 it 执行前都会执行
		wrapper = render(generateMenu(testProps));
		menuElement = wrapper.getByTestId('test-menu'); // 为了拿到父级节点  在 menu.tsx 中设置相应的 data-testid
		activeElement = wrapper.getByText('active');
		disabledElement = wrapper.getByText('disabled');
	});
	it('should render correct Menu and MenuItem based on default props', () => {
		expect(menuElement).toBeInTheDocument();
		expect(menuElement).toHaveClass('menu test');
		expect(menuElement.getElementsByTagName('li').length).toEqual(3);
		expect(activeElement).toHaveClass('menu-item is-active');
		expect(disabledElement).toHaveClass('menu-item is-disabled');
	});
	// 测试行为和回调触发
	it('click items should change active and call the right callback', () => {
		const thirdItem = wrapper.getByText('xyz');
		fireEvent.click(thirdItem);
		expect(thirdItem).toHaveClass('is-active');
		expect(activeElement).not.toHaveClass('is-active');
		expect(testProps.onSelect).toHaveBeenCalledWith(2);
		fireEvent.click(disabledElement);
		expect(disabledElement).not.toHaveClass('is-active');
		expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
	});
	// 测试 vertical
	it('should render vertical mode when mode is set to vertical', () => {
		cleanup(); // 清除之前的 dom 获取
		const wrapper = render(generateMenu(testVerProps));
		const menuElement = wrapper.getByTestId('test-menu');
		expect(menuElement).toHaveClass('menu-vertical');
	});
});
