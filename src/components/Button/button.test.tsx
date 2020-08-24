import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps } from './button';

const defaultProps = {
	onClick: jest.fn() // 注册测试事件
};

const testProps: ButtonProps = {
	btnType: 'primary',
	size: 'lg',
	className: 'klass'
};

const disabledProps = {
	disabled: true,
	onClick: jest.fn()
};

describe('test Button component', () => {
	// 正常默认的 button
	it('should render the correct default button', () => {
		const wrapper = render(<Button {...defaultProps}>Nick</Button>);
		const element = wrapper.getByText('Nick') as HTMLButtonElement; // 获取含有 Nick 的当前节点
		expect(element).toBeInTheDocument();
		expect(element.tagName).toEqual('BUTTON'); // 判断当前 dom 节点的 tagName 是否为 BUTTON
		expect(element.disabled).toBeFalsy();
		expect(element).toHaveClass('btn btn-default');
		fireEvent.click(element); // 触发用户事件
		expect(defaultProps.onClick).toHaveBeenCalled(); // Ensures that a mock function is called.
	});
	// 不同 props下的 button
	it('should render the correct component base on different props', () => {
		const wrapper = render(<Button {...testProps}>Nick</Button>);
		const element = wrapper.getByText('Nick'); // 获取含有 Nick 的当前节点
		expect(element).toBeInTheDocument();
		expect(element).toHaveClass('btn btn-primary btn-lg klass');
	});
	// btnType 为 link 时的 button
	it('should render a link when btnType equals link and href is provided', () => {
		const wrapper = render(
			<Button btnType="link" href="http://www.baidu.com">
				Link
			</Button>
		);
		const element = wrapper.getByText('Link');
		expect(element).toBeInTheDocument();
		expect(element.tagName).toEqual('A');
		expect(element).toHaveClass('btn btn-link');
	});
	// button 的 disabled 为 true 时
	it('should render disabled button when disabled set to true', () => {
		const wrapper = render(<Button {...disabledProps}>Nick</Button>);
		const element = wrapper.getByText('Nick') as HTMLButtonElement; // 获取含有 Nick 的当前节点
		expect(element).toBeInTheDocument();
		expect(element.disabled).toBeTruthy();
		fireEvent.click(element); // 触发用户事件
		expect(disabledProps.onClick).not.toHaveBeenCalled(); // Ensures that a mock function is called.
	});
});
