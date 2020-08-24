import React, {FC, ReactElement, InputHTMLAttributes, ChangeEvent} from 'react';
import classNames from 'classnames';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon/icon';

type InputSize = 'lg' | 'sm';

// Omit 忽略接口中的某个值
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
	/**	是否禁用 Input */
	disabled?: boolean;
	/**	是否禁用 Input */
	size?: InputSize;
	/**添加图标，在右侧悬浮添加一个图标，用于提示 */
	icon?: IconProp;
	/**	添加前缀 用于配置一些固定组合 */
	prepend?: string | ReactElement;
	/**添加后缀 用于配置一些固定组合 */
	append?: string | ReactElement;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void; // 重新定义 onChange 的类型
}
/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 * ### 引用方法
 *
 * ~~~js
 * import { Input } from 'vikingship'
 * ~~~
 *
 * 支持 HTMLInput 的所有基本属性
 */
export const Input: FC<InputProps> = props => {
	const {disabled, size, icon, prepend, append, style, ...restProps} = props;

	const classes = classNames('input-wrapper', {
		[`input-${size}`]: size,
		'input-group': prepend || append,
		'input-group-prepend': !!prepend,
		'input-group-append': !!append
	});

	const inputClasses = classNames('input-inner', {
		'is-disabled': disabled
	});

	const fixControlledValue = (value: any) => {
		if (typeof value === 'undefined' || value === null) {
			return '';
		}
		return value;
	};

	if ('value' in props) {
		delete props.defaultValue; // 避免 defaultValue 和  value 同时存在报错 --->受控组件和非受控组件
		restProps.value = fixControlledValue(props.value); // input 组件在使用时，一开始的 state 是 undefined，输入值之后，变为了有意义的值，此时程序会抛出错误， 解决方法 1. useState 中赋值为空字符串 2. 在组件中规避掉
	}

	return (
		<div className={classes} style={style}>
			{prepend && <div className="vk-input-group-prepend">{prepend}</div>}
			{icon && (
				<div className="icon-wrapper">
					<Icon icon={icon} title={`title-${icon}`} />
				</div>
			)}
			<input className={inputClasses} disabled={disabled} {...restProps} />
			{append && <div className="vk-input-group-append">{append}</div>}
		</div>
	);
};

export default Input;
