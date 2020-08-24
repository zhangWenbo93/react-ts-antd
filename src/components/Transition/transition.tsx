import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';

type TransitionProps = CSSTransitionProps & {
	animation?: AnimationName;
	wrapper?: boolean; // 通过 wrapper 确认是否需要加父级dom
};

const Transition: React.FC<TransitionProps> = props => {
	const { children, classNames, animation, wrapper, ...restProps } = props;

	return (
		<CSSTransition classNames={classNames ? classNames : animation} {...restProps}>
			{wrapper ? <div>{children}</div> : children}
		</CSSTransition>
	);
};

Transition.defaultProps = {
	unmountOnExit: true, //可选,当动画出场后在页面上移除包裹的dom节点
	appear: true
};

export default Transition;
