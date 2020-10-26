import React, {FC, Children, FunctionComponentElement, cloneElement, useState, createContext} from 'react';
import classNames from 'classnames';
import {MenuItemProps} from './menuItem';

type MenuMode = 'horizontal' | 'vertical';
type SelectCall = (selectedIndex: string) => void;

export interface MenuProps {
    /**默认 active 的菜单项的索引值 */
    defaultIndex?: string;
    className?: string;
    /**菜单类型 横向或者纵向 */
    mode?: MenuMode;
    style?: React.CSSProperties; // React.CSSProperties react基于typescript 定义的css的属性类，这里其实就是规定了 divStyle这个函数 返回的类型 是 CSSProperties
    /**点击菜单项触发的回掉函数 */
    onSelect?: SelectCall; // 子元素的事件，传入 index
    /**设置子菜单的默认打开 只在纵向模式下生效 */
    defaultOpenSubMenus?: string[]; // SubMenus 默认展开
}

interface IMenuContext {
    index: string;
    mode?: MenuMode;
    onSelect?: SelectCall;
    defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({index: '0'});
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * ~~~js
 * import { Menu } from 'vikingship'
 * // 然后可以使用 Menu.Item 和 Menu.Submenu 访问选项和子下拉菜单组件
 * ~~~
 */
export const Menu: FC<MenuProps> = props => {
    const {className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus} = props;

    const [currentIndex, setActive] = useState(defaultIndex);

    const classes = classNames('menu', className, `menu-${mode}`);

    const handleClick = (index: string) => {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };

    const passedContext: IMenuContext = {
        index: currentIndex ? currentIndex : '0',
        mode,
        onSelect: handleClick,
        defaultOpenSubMenus
    };

    const renderChildren = () => {
        return Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>;
            const {displayName} = childElement.type;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return cloneElement(childElement, {index: index.toString()});
            } else {
                console.warn('Warning: Menu has a child which is not a MenuItem component');
            }
        });
    };

    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
        </ul>
    );
};

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
};

export default Menu;
