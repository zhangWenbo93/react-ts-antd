import React, { useContext, FC } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
export interface MenuItemProps {
	index?: string;
	/**选项是否被禁用 */
	disabled?: boolean;
	/**选项扩展的 className */
	className?: string;
	/**选项的自定义 style */
	style?: React.CSSProperties;
}

export const MenuItem: FC<MenuItemProps> = props => {
	const { index, className, disabled, style, children } = props;

	const context = useContext(MenuContext);

	const classes = classNames('menu-item', className, {
		'is-disabled': disabled,
		'is-active': context.index === index
	});

	const handleChick = () => {
		if (context.onSelect && !disabled && typeof index === 'string') {
			context.onSelect(index);
		}
	};

	return (
		<li className={classes} style={style} onClick={handleChick}>
			{children}
		</li>
	);
};

//displayName:定义调试时的组件name
MenuItem.displayName = 'MenuItem';
export default MenuItem;
