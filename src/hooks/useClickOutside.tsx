import {useEffect, RefObject} from 'react';

function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
	useEffect(
		() => {
			const listener = (e: MouseEvent) => {
				// contains 方法用来查看 dom 元素的包含关系，以 HTMLElement 为参数，且返回布尔值
				if (!ref.current || ref.current.contains(e.target as HTMLElement)) {
					return;
				}
				handler(e);
			};
			document.addEventListener('click', listener);
			return () => {
				document.removeEventListener('click', listener);
			};
		},
		[ref, handler]
	);
}

export default useClickOutside;
